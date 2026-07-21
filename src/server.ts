import {
  listConnections,
  getConnection,
  createConnection,
  updateConnection,
  deleteConnection,
  type Connection,
} from "./store";
import { testConnection, runQuery, listTables, isDestructive, dropClient } from "./db";
import { toCsv } from "./csv";
import { html } from "./ui";

const PORT = Number(process.env.PORT ?? 4560);

function json(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
  });
}

function error(message: string, status = 400): Response {
  return json({ error: message }, { status });
}

async function readJson(req: Request): Promise<any> {
  try {
    return await req.json();
  } catch {
    return {};
  }
}

function draftToConnection(body: any, existing?: Connection): Connection {
  return {
    id: existing?.id ?? "draft",
    name: body.name ?? existing?.name ?? "",
    host: body.host ?? existing?.host ?? "",
    port: Number(body.port ?? existing?.port ?? 5432),
    database: body.database ?? existing?.database ?? "",
    user: body.user ?? existing?.user ?? "",
    password: body.password && body.password.length > 0 ? body.password : (existing?.password ?? ""),
    ssl: Boolean(body.ssl ?? existing?.ssl ?? false),
  };
}

Bun.serve({
  port: PORT,
  idleTimeout: 0,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    if (path === "/" && method === "GET") {
      return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
    }

    if (path === "/api/connections" && method === "GET") {
      return json(listConnections());
    }

    if (path === "/api/connections" && method === "POST") {
      const body = await readJson(req);
      if (!body.name || !body.host || !body.database || !body.user) return error("Missing required fields");
      return json(
        createConnection({
          name: body.name,
          host: body.host,
          port: Number(body.port) || 5432,
          database: body.database,
          user: body.user,
          password: body.password ?? "",
          ssl: Boolean(body.ssl),
        }),
      );
    }

    if (path === "/api/test-draft" && method === "POST") {
      const body = await readJson(req);
      const existing = body.id ? getConnection(body.id) : undefined;
      const conn = draftToConnection(body, existing);
      const result = await testConnection(conn);
      dropClient("draft");
      return json(result);
    }

    const connMatch = path.match(/^\/api\/connections\/([^/]+)(\/.*)?$/);
    if (connMatch) {
      const id = connMatch[1];
      const sub = connMatch[2] ?? "";
      const conn = getConnection(id);

      if (sub === "" && method === "PUT") {
        const body = await readJson(req);
        const updated = updateConnection(id, {
          name: body.name,
          host: body.host,
          port: body.port ? Number(body.port) : undefined,
          database: body.database,
          user: body.user,
          password: body.password,
          ssl: body.ssl,
        });
        if (!updated) return error("Connection not found", 404);
        dropClient(id);
        return json(updated);
      }

      if (sub === "" && method === "DELETE") {
        const ok = deleteConnection(id);
        dropClient(id);
        return ok ? json({ ok: true }) : error("Connection not found", 404);
      }

      if (!conn) return error("Connection not found", 404);

      if (sub === "/tables" && method === "GET") {
        try {
          return json(await listTables(conn));
        } catch (err: any) {
          return error(err?.message ?? String(err), 502);
        }
      }

      if (sub === "/query" && method === "POST") {
        const body = await readJson(req);
        const sql = String(body.sql ?? "").trim();
        if (!sql) return error("Missing sql");
        if (isDestructive(sql) && !body.confirm) {
          return json(
            { needsConfirm: true, reason: `This looks like a destructive statement:\n\n${sql}` },
            { status: 409 },
          );
        }
        try {
          const result = await runQuery(conn, sql);
          return json(result);
        } catch (err: any) {
          return error(err?.message ?? String(err), 400);
        }
      }

      if (sub === "/export" && method === "POST") {
        const body = await readJson(req);
        const sql = String(body.sql ?? "").trim();
        if (!sql) return error("Missing sql");
        try {
          const result = await runQuery(conn, sql);
          const csv = toCsv(result.columns, result.rows);
          return new Response(csv, {
            headers: {
              "content-type": "text/csv; charset=utf-8",
              "content-disposition": 'attachment; filename="export.csv"',
            },
          });
        } catch (err: any) {
          return error(err?.message ?? String(err), 400);
        }
      }
    }

    return error("Not found", 404);
  },
});

console.log(`dbclient listening on http://localhost:${PORT}`);
