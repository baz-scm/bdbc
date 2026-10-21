# bdbc

A super lightweight Postgres client for the browser. Single Bun binary, zero external dependencies: connect, browse tables, run queries, export CSV.

## Features

- Manage multiple Postgres connections, browsable as a collapsible tree per connection → schema → table
- Paste a full connection string (`postgres://user:pass@host:5432/db?sslmode=require`) and have it parsed into fields
- SQL editor with table-name autocomplete, `Cmd`/`Ctrl`+`Enter` to run, resizable by dragging its lower border (double-click the border to reset)
- `Explain` button to see the query plan without executing
- Confirmation prompt before running destructive statements (`DELETE`, `UPDATE`, `DROP`, `TRUNCATE`, `ALTER`, `GRANT`, `REVOKE`, `INSERT`)
- Query parameters: write `:name` in a query and bind it once in the Parameters panel, which appears on its own
- Export query results to CSV with headers
- Light/dark theme follows your OS setting

## Query parameters

Write `:name` anywhere in a query:

```sql
select * from orders where id in (:ids) and created_at > :since;
```

The Parameters panel opens by itself as soon as the query mentions one, with a line
waiting for each name:

```
# comments and blank lines are ignored
ids = 1, 2, 3
since = '2026-01-01'
```

The editor marks a reference that is bound, and underlines in red one that is still
waiting for a value. A parameter the current query never mentions is underlined in the
panel, so stale definitions are easy to spot and drop. Running a query with an unbound
`:name` fails locally, before anything reaches Postgres.

Values are spliced in verbatim, like psql's `\set`, so a parameter can hold a list, an
expression or an identifier — not only a single scalar. References inside string literals,
dollar-quoted blocks and comments are left alone, and `::type` casts are never mistaken for
a parameter.

Parameters belong to the connection they were defined on, are saved with it in
`~/.bdbc/connections.json`, and come back when you reopen that connection's tab. The
**Preview** button shows the SQL that will actually run, after substitution.

> One sharp edge: an array slice written with named bounds (`arr[lo:hi]`) looks exactly like
> a parameter reference. Write such slices with literal bounds, or avoid parameter names that
> collide with them.

## Install

```sh
npx @baz-scm/bdbc
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

Bump `version` in `package.json`, commit, then trigger the `Release` workflow manually from the Actions tab (or `gh workflow run release.yml`). It builds binaries for macOS/Linux x64/arm64, publishes the `@baz-scm/bdbc` npm package (the `npx` wrapper) with [provenance](https://docs.npmjs.com/generating-provenance-statements), then tags the commit and creates a GitHub Release with the binaries attached and auto-generated notes.

npm publishing uses [Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC), authenticated as `baz-scm/bdbc`'s `release.yml` workflow specifically. No `NPM_TOKEN` secret is needed or used.

### Checking provenance

After a publish with provenance, the package page on npmjs.com (`npmjs.com/package/@baz-scm/bdbc`) shows a "Provenance" section linking to the exact GitHub Actions run, commit, and workflow file that produced it. You can also verify from the command line:

```sh
npm audit signatures   # run from a project that depends on @baz-scm/bdbc
npm view @baz-scm/bdbc dist.attestations.url
```

## Credentials and where things are stored

`bdbc` is a local, single-user tool, not a hosted service. Everything it stores lives on the machine you run it on:

- Connections (host, port, database, user, **password in plaintext**, SSL mode) are saved to `~/.bdbc/connections.json`.
- That directory is created with `0700` permissions and the file with `0600`, readable only by your own user account, but the password itself is **not encrypted**. Treat that file like an SSH private key: don't commit it, don't sync it to a shared machine, don't back it up somewhere less trusted than your home directory.
- No credentials are ever sent anywhere except directly to the Postgres server you configure. `bdbc` has no telemetry, no external calls, no server component beyond the one running on your own machine.
- Queries run directly from the machine running `bdbc` to the target Postgres instance, the same as running `psql` locally.

If you previously used a build of this tool under the name `dbclient`, its config directory (`~/.dbclient/`) is migrated automatically to `~/.bdbc/` the first time you run the renamed binary.

## License

MIT
