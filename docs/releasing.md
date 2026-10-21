<!-- Split out of AGENTS.md: the working rules belong there, the release mechanics here. -->

# Releasing

`.github/workflows/release.yml`, manual `workflow_dispatch` trigger only, no auto-versioning. Reads `version` from `package.json` (bump it and commit before triggering), fails fast if that version's tag already exists. Cross-compiles all four targets (`bun-darwin-arm64`, `bun-darwin-x64`, `bun-linux-arm64`, `bun-linux-x64`) from one `ubuntu-latest` job, no per-OS runner matrix needed since `bun build --compile --target=...` cross-compiles fine from any host. Publishes `@baz-scm/bdbc` to npm via Trusted Publishing (OIDC, no stored token, configured on the package's npmjs.com settings against `baz-scm/bdbc`'s `release.yml`), then tags the commit and creates a GitHub Release with the binaries and `--generate-notes`. Trusted Publishing needs npm CLI >=11.5.1, hence the explicit `npm install -g npm@latest` step, since the npm bundled with `actions/setup-node`'s Node version is typically older.

The npm package (`bin/bdbc.js`) is a thin Node wrapper, not the app itself: on first run it detects OS/arch, downloads the matching binary from the GitHub Release matching the npm package's own version into `~/.cache/bdbc/<version>/`, then execs it. `package.json`'s `files` field keeps the published tarball to just `bin/`, `README.md`, `LICENSE` (~3.4kB), `src/` is never published.
