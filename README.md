# bdbc

A super lightweight Postgres client for the browser. Single Bun binary, zero external dependencies: connect, browse tables, run queries, export CSV.

## Features

- Manage multiple Postgres connections, browsable as a collapsible tree per connection → schema → table
- Paste a full connection string (`postgres://user:pass@host:5432/db?sslmode=require`) and have it parsed into fields
- SQL editor with table-name autocomplete, `Cmd`/`Ctrl`+`Enter` to run
- `Explain` button to see the query plan without executing
- Confirmation prompt before running destructive statements (`DELETE`, `UPDATE`, `DROP`, `TRUNCATE`, `ALTER`, `GRANT`, `REVOKE`, `INSERT`)
- Export query results to CSV with headers
- Light/dark theme follows your OS setting

## Install

```sh
npx bdbc
```

No install step, no Bun required on your machine. The `npx` wrapper detects your OS/arch, downloads the matching prebuilt binary from the [latest GitHub release](https://github.com/baz-scm/bdbc/releases) into `~/.cache/bdbc/`, and runs it. Prebuilt binaries cover macOS and Linux, x64 and arm64.

Alternatively, download a binary directly from [GitHub Releases](https://github.com/baz-scm/bdbc/releases) and run it, no npm/npx involved.

## Requirements (building from source)

[Bun](https://bun.sh). `bdbc` uses Bun's built-in Postgres driver (`Bun.SQL`), so there are no npm dependencies at all, in source or in the built binary.

## Run from source

```sh
bun run dev    # starts on http://localhost:4560 with hot reload
```

## The executable

```sh
bun run build   # produces ./bdbc, a single native executable (~60MB, bundles the Bun runtime)
./bdbc          # starts the server on http://localhost:4560; open that URL in a browser
```

`PORT=4561 ./bdbc` to run on a different port. The binary is self-contained: no Bun install, no runtime, no dependencies needed on the machine that runs it. Copy it anywhere and execute.

## Releasing

Bump `version` in `package.json`, commit, then trigger the `Release` workflow manually from the Actions tab (or `gh workflow run release.yml`). It builds binaries for macOS/Linux x64/arm64, tags the commit, creates a GitHub Release with the binaries attached and auto-generated notes, and publishes the `bdbc` npm package (the `npx` wrapper) if an `NPM_TOKEN` secret is configured on the repo.

## Credentials and where things are stored

`bdbc` is a local, single-user tool, not a hosted service. Everything it stores lives on the machine you run it on:

- Connections (host, port, database, user, **password in plaintext**, SSL mode) are saved to `~/.bdbc/connections.json`.
- That directory is created with `0700` permissions and the file with `0600`, readable only by your own user account, but the password itself is **not encrypted**. Treat that file like an SSH private key: don't commit it, don't sync it to a shared machine, don't back it up somewhere less trusted than your home directory.
- No credentials are ever sent anywhere except directly to the Postgres server you configure. `bdbc` has no telemetry, no external calls, no server component beyond the one running on your own machine.
- Queries run directly from the machine running `bdbc` to the target Postgres instance, the same as running `psql` locally.

If you previously used a build of this tool under the name `dbclient`, its config directory (`~/.dbclient/`) is migrated automatically to `~/.bdbc/` the first time you run the renamed binary.

## License

MIT
