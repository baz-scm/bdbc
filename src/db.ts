import { SQL } from "bun";
import type { Connection } from "./store";

const clients = new Map<string, SQL>();

function connectionUrl(conn: Connection): string {
  const user = encodeURIComponent(conn.user);
  const password = encodeURIComponent(conn.password);
  const database = encodeURIComponent(conn.database);
  const sslmode = conn.ssl ? "require" : "disable";
  return `postgres://${user}:${password}@${conn.host}:${conn.port}/${database}?sslmode=${sslmode}`;
}

function clientFor(conn: Connection): SQL {
  let client = clients.get(conn.id);
  if (!client) {
    client = new SQL(connectionUrl(conn), { max: 5 });
    clients.set(conn.id, client);
  }
  return client;
}

export function dropClient(id: string): void {
  const client = clients.get(id);
  if (client) {
    client.close().catch(() => {});
    clients.delete(id);
  }
}

const RECONNECTABLE_CODES = new Set(["ERR_POSTGRES_CONNECTION_CLOSED", "ERR_POSTGRES_CONNECTION_TIMEOUT"]);
const RECONNECTABLE_MESSAGE = /closed|terminat|timed? ?out|reset|broken pipe|ECONNRESET|EPIPE|ETIMEDOUT/i;

function isReconnectable(err: any): boolean {
  return RECONNECTABLE_CODES.has(err?.code) || RECONNECTABLE_MESSAGE.test(err?.message ?? "");
}

export interface QueryErrorInfo {
  message: string;
  code?: string;
  sqlState?: string;
  detail?: string;
  hint?: string;
  severity?: string;
  position?: number;
}

export function toQueryError(err: any): QueryErrorInfo {
  const posRaw = err?.position;
  const position = posRaw != null && posRaw !== "" && !Number.isNaN(Number(posRaw)) ? Number(posRaw) : undefined;
  return {
    message: err?.message ?? String(err),
    code: err?.code,
    sqlState: err?.errno,
    detail: err?.detail,
    hint: err?.hint,
    severity: err?.severity,
    position,
  };
}

async function withReconnect<T>(conn: Connection, fn: (client: SQL) => Promise<T>): Promise<T> {
  const client = clientFor(conn);
  try {
    return await fn(client);
  } catch (err: any) {
    if (isReconnectable(err)) {
      dropClient(conn.id);
      return await fn(clientFor(conn));
    }
    throw err;
  }
}

export async function testConnection(conn: Connection): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const client = clientFor(conn);
    await client`select 1`;
    return { ok: true };
  } catch (err: any) {
    dropClient(conn.id);
    return { ok: false, error: err?.message ?? String(err) };
  }
}

export interface QueryResult {
  columns: string[];
  rows: unknown[][];
  rowCount: number;
  command: string;
}

function toResult(res: any): QueryResult {
  const rows: unknown[][] = Array.isArray(res) ? res : [];
  const columns =
    rows.length > 0
      ? Object.keys(rows[0] as object)
      : ((res?.columns as any[] | undefined)?.map((c: any) => c.name) ?? []);
  const plainRows = rows.map((r) => columns.map((c) => (r as any)[c]));
  return {
    columns,
    rows: plainRows,
    rowCount: res?.count ?? rows.length,
    command: res?.command ?? "SELECT",
  };
}

export async function runQuery(conn: Connection, text: string): Promise<QueryResult> {
  const res = await withReconnect(conn, (client) => client.unsafe(text));
  return toResult(res);
}

export interface TableInfo {
  schema: string;
  name: string;
  columns: { name: string; type: string; nullable: boolean }[];
}

export async function listTables(conn: Connection): Promise<TableInfo[]> {
  const [tables, columns] = await withReconnect(conn, (client) =>
    Promise.all([
      client`
        select table_schema as schema, table_name as name
        from information_schema.tables
        where table_schema not in ('pg_catalog', 'information_schema')
        order by table_schema, table_name
      `,
      client`
        select table_schema as schema, table_name as name, column_name as col, data_type as type, is_nullable = 'YES' as nullable
        from information_schema.columns
        where table_schema not in ('pg_catalog', 'information_schema')
        order by table_schema, table_name, ordinal_position
      `,
    ]),
  );
  return (tables as any[]).map((t) => ({
    schema: t.schema,
    name: t.name,
    columns: (columns as any[])
      .filter((c) => c.schema === t.schema && c.name === t.name)
      .map((c) => ({ name: c.col, type: c.type, nullable: c.nullable })),
  }));
}

function quoteIdent(ident: string): string {
  return '"' + ident.replace(/"/g, '""') + '"';
}

const SINGLE_TABLE_SELECT = /^\s*select\b[\s\S]+?\bfrom\s+("[^"]+"|[\w]+)(?:\s*\.\s*("[^"]+"|[\w]+))?/i;
const DISQUALIFYING = /\bjoin\b|\bunion\b/i;

function unquoteIdent(s: string): string {
  return s.replace(/^"|"$/g, "");
}

export function detectSourceTable(sql: string): { schemaRef?: string; table: string } | null {
  if (DISQUALIFYING.test(sql)) return null;
  const m = SINGLE_TABLE_SELECT.exec(sql);
  if (!m) return null;
  if (m[2]) return { schemaRef: unquoteIdent(m[1]), table: unquoteIdent(m[2]) };
  return { table: unquoteIdent(m[1]) };
}

export async function resolveTable(
  conn: Connection,
  ref: { schemaRef?: string; table: string },
): Promise<{ schema: string; table: string } | null> {
  return withReconnect(conn, async (client) => {
    if (ref.schemaRef) {
      const rows = await client`
        select 1 from information_schema.tables
        where table_schema = ${ref.schemaRef} and table_name = ${ref.table}
      `;
      return rows.length ? { schema: ref.schemaRef, table: ref.table } : null;
    }
    const rows = (await client`
      select table_schema from information_schema.tables
      where table_name = ${ref.table} and table_schema not in ('pg_catalog', 'information_schema')
    `) as any[];
    return rows.length === 1 ? { schema: rows[0].table_schema, table: ref.table } : null;
  });
}

export async function getPrimaryKeyColumns(conn: Connection, schema: string, table: string): Promise<string[]> {
  const rows = await withReconnect(
    conn,
    (client) => client`
      select kcu.column_name as col
      from information_schema.table_constraints tc
      join information_schema.key_column_usage kcu
        on tc.constraint_name = kcu.constraint_name and tc.table_schema = kcu.table_schema
      where tc.constraint_type = 'PRIMARY KEY' and tc.table_schema = ${schema} and tc.table_name = ${table}
      order by kcu.ordinal_position
    `,
  );
  return (rows as any[]).map((r) => r.col);
}

export interface EditInfo {
  schema: string;
  table: string;
  pkColumns: string[];
}

export async function detectEditInfo(conn: Connection, sql: string, columns: string[]): Promise<EditInfo | null> {
  const ref = detectSourceTable(sql);
  if (!ref) return null;
  const resolved = await resolveTable(conn, ref);
  if (!resolved) return null;
  const pkColumns = await getPrimaryKeyColumns(conn, resolved.schema, resolved.table);
  if (!pkColumns.length || !pkColumns.every((pk) => columns.includes(pk))) return null;
  return { schema: resolved.schema, table: resolved.table, pkColumns };
}

export async function updateCell(
  conn: Connection,
  schema: string,
  table: string,
  pk: { column: string; value: unknown }[],
  column: string,
  value: unknown,
): Promise<number> {
  const setClause = `${quoteIdent(column)} = $1`;
  const whereClause = pk.map((p, i) => `${quoteIdent(p.column)} = $${i + 2}`).join(" and ");
  const text = `update ${quoteIdent(schema)}.${quoteIdent(table)} set ${setClause} where ${whereClause}`;
  const params = [value, ...pk.map((p) => p.value)];
  const res = await withReconnect(conn, (client) => client.unsafe(text, params));
  return (res as any)?.count ?? 0;
}

export async function insertRow(
  conn: Connection,
  schema: string,
  table: string,
  values: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const cols = Object.keys(values);
  if (!cols.length) throw new Error("No values provided");
  const colList = cols.map(quoteIdent).join(", ");
  const placeholders = cols.map((_, i) => `$${i + 1}`).join(", ");
  const text = `insert into ${quoteIdent(schema)}.${quoteIdent(table)} (${colList}) values (${placeholders}) returning *`;
  const params = cols.map((c) => values[c]);
  const res = await withReconnect(conn, (client) => client.unsafe(text, params));
  const rows = Array.isArray(res) ? (res as any[]) : [];
  return (rows[0] as Record<string, unknown>) ?? {};
}

export async function deleteRow(
  conn: Connection,
  schema: string,
  table: string,
  pk: { column: string; value: unknown }[],
): Promise<number> {
  const whereClause = pk.map((p, i) => `${quoteIdent(p.column)} = $${i + 1}`).join(" and ");
  const text = `delete from ${quoteIdent(schema)}.${quoteIdent(table)} where ${whereClause}`;
  const params = pk.map((p) => p.value);
  const res = await withReconnect(conn, (client) => client.unsafe(text, params));
  return (res as any)?.count ?? 0;
}

export async function previewTable(
  conn: Connection,
  schema: string,
  table: string,
  limit: number,
  offset: number,
): Promise<QueryResult> {
  const text = `select * from ${quoteIdent(schema)}.${quoteIdent(table)} limit ${limit} offset ${offset}`;
  return runQuery(conn, text);
}

const DESTRUCTIVE = /^\s*(delete|update|drop|truncate|alter|grant|revoke|insert)\b/i;

export function isDestructive(sql: string): boolean {
  return DESTRUCTIVE.test(sql);
}
