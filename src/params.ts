export interface ParamParseError {
  line: number;
  message: string;
}

export interface ParsedParams {
  params: Record<string, string>;
  errors: ParamParseError[];
}

const NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*$/;

/**
 * Parses the params panel text: one `name = value` per line. Blank lines and
 * lines starting with `#` or `--` are ignored. The value is kept verbatim (it is
 * spliced into the SQL as a literal fragment), minus surrounding whitespace.
 */
export function parseParams(text: string): ParsedParams {
  const params: Record<string, string> = {};
  const errors: ParamParseError[] = [];
  const lines = (text ?? "").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("--")) continue;
    const eq = raw.indexOf("=");
    if (eq === -1) {
      errors.push({ line: i + 1, message: `expected "name = value", got: ${trimmed}` });
      continue;
    }
    const name = raw.slice(0, eq).trim().replace(/^:/, "");
    if (!NAME_RE.test(name)) {
      errors.push({ line: i + 1, message: `invalid parameter name: ${name || "(empty)"}` });
      continue;
    }
    params[name] = raw.slice(eq + 1).trim();
  }
  return { params, errors };
}

export interface ParamRef {
  name: string;
  start: number;
  end: number;
}

/**
 * Finds every `:name` reference that sits in a code position: not inside a string
 * literal, dollar-quoted block, or comment, and not part of a `::type` cast.
 */
export function findParamRefs(sql: string): ParamRef[] {
  const refs: ParamRef[] = [];
  const n = sql.length;
  let i = 0;
  let dollarTag: string | null = null;
  let blockDepth = 0;
  let escapeString = false;
  let state: "NORMAL" | "SINGLE" | "DOUBLE" | "LINE" | "BLOCK" | "DOLLAR" = "NORMAL";

  // E'...' (and the U&'...' / e'...' spellings) take backslash escapes, so a \' in
  // one of those is not the end of the literal.
  const opensEscapeString = (idx: number) => {
    const prev = sql[idx - 1];
    if (prev !== "E" && prev !== "e") return false;
    const before = sql[idx - 2];
    return before === undefined || !/[A-Za-z0-9_$]/.test(before);
  };

  while (i < n) {
    const c = sql[i];
    if (state === "NORMAL") {
      if (c === "'") { state = "SINGLE"; escapeString = opensEscapeString(i); i++; continue; }
      if (c === '"') { state = "DOUBLE"; i++; continue; }
      if (c === "-" && sql[i + 1] === "-") { state = "LINE"; i += 2; continue; }
      if (c === "/" && sql[i + 1] === "*") { state = "BLOCK"; blockDepth = 1; i += 2; continue; }
      if (c === "$") {
        const m = /^\$(?:[A-Za-z_][A-Za-z0-9_]*)?\$/.exec(sql.slice(i));
        if (m) { dollarTag = m[0]; state = "DOLLAR"; i += m[0].length; continue; }
        i++;
        continue;
      }
      if (c === ":") {
        // `::` is a cast, never a parameter — skip both colons.
        if (sql[i + 1] === ":") { i += 2; continue; }
        const m = /^:([A-Za-z_][A-Za-z0-9_]*)/.exec(sql.slice(i));
        if (m) {
          refs.push({ name: m[1], start: i, end: i + m[0].length });
          i += m[0].length;
          continue;
        }
        i++;
        continue;
      }
      i++;
      continue;
    }
    if (state === "SINGLE" || state === "DOUBLE") {
      const q = state === "SINGLE" ? "'" : '"';
      if (state === "SINGLE" && escapeString && c === "\\") { i += 2; continue; }
      if (c === q) {
        if (sql[i + 1] === q) { i += 2; continue; }
        state = "NORMAL";
      }
      i++;
      continue;
    }
    if (state === "LINE") {
      if (c === "\n") state = "NORMAL";
      i++;
      continue;
    }
    if (state === "BLOCK") {
      if (c === "/" && sql[i + 1] === "*") { blockDepth++; i += 2; continue; }
      if (c === "*" && sql[i + 1] === "/") {
        blockDepth--;
        i += 2;
        if (blockDepth === 0) state = "NORMAL";
        continue;
      }
      i++;
      continue;
    }
    if (state === "DOLLAR") {
      if (dollarTag && sql.startsWith(dollarTag, i)) {
        i += dollarTag.length;
        dollarTag = null;
        state = "NORMAL";
        continue;
      }
      i++;
      continue;
    }
    i++;
  }
  return refs;
}

export interface InterpolateResult {
  sql: string;
  /** Referenced but never declared. */
  missing: string[];
  /** Declared on an empty line (`ids =`), so there is nothing to substitute. */
  unset: string[];
  used: string[];
  changed: boolean;
}

/** Substitutes every `:name` in a code position with its value, verbatim. */
export function interpolate(sql: string, params: Record<string, string>): InterpolateResult {
  const refs = findParamRefs(sql);
  const missing: string[] = [];
  const unset: string[] = [];
  const used: string[] = [];
  let out = "";
  let last = 0;
  for (const ref of refs) {
    if (!Object.prototype.hasOwnProperty.call(params, ref.name)) {
      if (!missing.includes(ref.name)) missing.push(ref.name);
      continue;
    }
    if (params[ref.name] === "") {
      if (!unset.includes(ref.name)) unset.push(ref.name);
      continue;
    }
    if (!used.includes(ref.name)) used.push(ref.name);
    out += sql.slice(last, ref.start) + params[ref.name];
    last = ref.end;
  }
  out += sql.slice(last);
  return { sql: out, missing, unset, used, changed: last !== 0 };
}

export function missingParamsError(missing: string[], unset: string[] = []): string {
  const parts: string[] = [];
  if (missing.length) {
    parts.push(`undefined parameter${missing.length > 1 ? "s" : ""}: ${missing.map((m) => ":" + m).join(", ")}`);
  }
  if (unset.length) {
    parts.push(`parameter${unset.length > 1 ? "s" : ""} with no value: ${unset.map((m) => ":" + m).join(", ")}`);
  }
  return parts.join("; ");
}
