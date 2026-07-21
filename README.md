# dbclient

A super lightweight Postgres client for the browser. Single Bun binary, zero external dependencies — connect, browse tables, run queries, export CSV.

## Features

- Manage multiple Postgres connections (saved locally in `~/.dbclient/connections.json`)
- Paste a full connection string (`postgres://user:pass@host:5432/db?sslmode=require`) and have it parsed into fields
- Browse schemas and tables in a collapsible tree, per connection
- SQL editor with table-name autocomplete, `Cmd`/`Ctrl`+`Enter` to run
- `Explain` button to see the query plan without executing
- Confirmation prompt before running destructive statements (`DELETE`, `UPDATE`, `DROP`, `TRUNCATE`, `ALTER`, `GRANT`, `REVOKE`, `INSERT`)
- Export query results to CSV with headers
- Light/dark theme follows your OS setting

## Requirements

- [Bun](https://bun.sh) — uses Bun's built-in Postgres driver (`Bun.SQL`), no npm dependencies at all

## Run

```sh
bun install    # no-op, no dependencies — kept for convention
bun run dev    # starts on http://localhost:4560 with hot reload
```

## Build a standalone binary

```sh
bun run build   # produces ./dbclient, a single native executable
./dbclient
```

## License

MIT
