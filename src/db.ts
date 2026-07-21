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
