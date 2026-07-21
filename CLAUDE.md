# bdbc

Lightweight Postgres web client. Single Bun binary, zero npm dependencies (uses Bun's built-in `Bun.SQL` Postgres driver).

## Layout

- `src/server.ts` — Bun.serve, all HTTP routes
- `src/store.ts` — connections persisted to `~/.bdbc/connections.json` (0600/0700 perms), migrates from legacy `~/.dbclient/`
- `src/db.ts` — query execution, table listing, destructive-statement detection
- `src/csv.ts` — CSV export with headers
- `src/ui.ts` — the entire frontend (HTML/CSS/JS) as one template literal string, served inline. No build step, no framework.

## Commands

- `bun run dev` — dev server on :4560 with `--hot` reload
- `bun run build` — produces `./bdbc`, a standalone ~60MB native executable

## Release pipeline

`.github/workflows/release.yml`, manual `workflow_dispatch` trigger only, no auto-versioning. Reads `version` from `package.json` (bump it and commit before triggering), fails fast if that version's tag already exists. Cross-compiles all four targets (`bun-darwin-arm64`, `bun-darwin-x64`, `bun-linux-arm64`, `bun-linux-x64`) from one `ubuntu-latest` job, no per-OS runner matrix needed since `bun build --compile --target=...` cross-compiles fine from any host. Publishes `@baz-scm/bdbc` to npm via Trusted Publishing (OIDC, no stored token, configured on the package's npmjs.com settings against `baz-scm/bdbc`'s `release.yml`), then tags the commit and creates a GitHub Release with the binaries and `--generate-notes`. Trusted Publishing needs npm CLI >=11.5.1, hence the explicit `npm install -g npm@latest` step, since the npm bundled with `actions/setup-node`'s Node version is typically older.

The npm package (`bin/bdbc.js`) is a thin Node wrapper, not the app itself: on first run it detects OS/arch, downloads the matching binary from the GitHub Release matching the npm package's own version into `~/.cache/bdbc/<version>/`, then execs it. `package.json`'s `files` field keeps the published tarball to just `bin/`, `README.md`, `LICENSE` (~3.4kB), `src/` is never published.

## Working in `src/ui.ts`

The whole frontend is a JS template literal (backtick string) inside a `.ts` file. **Any regex or string containing `\/` or other non-standard escape sequences (`\w`, `\d`, `\s`, `\b`, etc.) inside that outer template literal needs the backslash doubled** (`\\/`, `\\w`, ...). A single backslash before a character that isn't a recognized JS string escape gets silently dropped when the outer template literal is evaluated, producing broken regex in the generated HTML/JS and throwing at runtime, killing the entire inline `<script>` block. This has caused real bugs here twice. After editing this file, verify by extracting and bundle-checking the script:

```sh
bun -e "
import { html } from './src/ui.ts';
const m = html.match(/<script>([\s\S]*)<\/script>/);
require('fs').writeFileSync('/tmp/extracted.js', m[1]);
"
bun build /tmp/extracted.js --outfile /tmp/extracted.out.js
```

A clean bundle doesn't guarantee correct behavior, but a bundle error means the page is definitely broken.

## Testing against Postgres

There's no bundled test suite. Verify changes against a throwaway Docker Postgres container, not a real connection:

```sh
docker run -d --name bdbc-test-pg -e POSTGRES_PASSWORD=testpass -e POSTGRES_DB=testdb -p <some-free-port>:5432 postgres:16-alpine
```

Always use a port other than **4560** for test runs. That's the default dev port, and the user is very likely to have their own `bun run dev` already running there. Never `kill` whatever is bound to 4560 to free it, and never SIGKILL (`kill -9`) anything, ever, even processes started for testing, use plain `kill` or ask.

Never point manual test scripts (`curl`, one-off `bun -e` connection tests) at a real connection. Real connections created by the user live in `~/.bdbc/connections.json` (JSON, plaintext passwords). If you spin up a real server for manual testing (e.g. on a non-4560 port), check that file's contents before and after, and never leave test data in it.
