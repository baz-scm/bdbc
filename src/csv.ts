function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let str: string;
  if (value instanceof Date) str = value.toISOString();
  else if (typeof value === "object") str = JSON.stringify(value);
  else str = String(value);
  if (/[",\n\r]/.test(str)) return '"' + str.replace(/"/g, '""') + '"';
  return str;
}

export function toCsv(columns: string[], rows: unknown[][]): string {
  const lines = [columns.map(escapeCsvCell).join(",")];
  for (const row of rows) lines.push(row.map(escapeCsvCell).join(","));
  return lines.join("\r\n") + "\r\n";
}
