import { homedir } from "node:os";
import { join } from "node:path";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

const CONFIG_DIR = join(homedir(), ".dbclient");
const CONFIG_FILE = join(CONFIG_DIR, "connections.json");

export interface Connection {
  id: string;
  name: string;
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
}

export type PublicConnection = Omit<Connection, "password"> & { hasPassword: boolean };

function ensureConfig(): void {
  if (!existsSync(CONFIG_DIR)) mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
  if (!existsSync(CONFIG_FILE)) writeFileSync(CONFIG_FILE, "[]\n", { mode: 0o600 });
}

function readAll(): Connection[] {
  ensureConfig();
  try {
    return JSON.parse(readFileSync(CONFIG_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeAll(conns: Connection[]): void {
  ensureConfig();
  writeFileSync(CONFIG_FILE, JSON.stringify(conns, null, 2) + "\n", { mode: 0o600 });
}

export function toPublic(c: Connection): PublicConnection {
  const { password, ...rest } = c;
  return { ...rest, hasPassword: password.length > 0 };
}

export function listConnections(): PublicConnection[] {
  return readAll().map(toPublic);
}

export function getConnection(id: string): Connection | undefined {
  return readAll().find((c) => c.id === id);
}

export function createConnection(input: Omit<Connection, "id">): PublicConnection {
  const conns = readAll();
  const conn: Connection = { ...input, id: randomUUID() };
  conns.push(conn);
  writeAll(conns);
  return toPublic(conn);
}

export function updateConnection(id: string, input: Partial<Omit<Connection, "id">>): PublicConnection | undefined {
  const conns = readAll();
  const idx = conns.findIndex((c) => c.id === id);
  if (idx === -1) return undefined;
  const existing = conns[idx];
  const merged: Connection = {
    ...existing,
    ...input,
    password: input.password && input.password.length > 0 ? input.password : existing.password,
  };
  conns[idx] = merged;
  writeAll(conns);
  return toPublic(merged);
}

export function deleteConnection(id: string): boolean {
  const conns = readAll();
  const next = conns.filter((c) => c.id !== id);
  writeAll(next);
  return next.length !== conns.length;
}
