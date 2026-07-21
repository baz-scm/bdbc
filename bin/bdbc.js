#!/usr/bin/env node
"use strict";

const { existsSync, mkdirSync, chmodSync, createWriteStream, renameSync } = require("node:fs");
const { join } = require("node:path");
const { homedir, platform, arch } = require("node:os");
const { spawnSync } = require("node:child_process");
const https = require("node:https");

const pkg = require("../package.json");
const VERSION = pkg.version;
const REPO = "baz-scm/bdbc";

const PLATFORMS = new Set(["darwin", "linux"]);
const ARCHS = new Set(["arm64", "x64"]);

function targetName() {
  const plat = platform();
  const a = arch();
  if (!PLATFORMS.has(plat) || !ARCHS.has(a)) {
    console.error(`bdbc: unsupported platform ${plat}/${a}. Prebuilt binaries exist for macOS and Linux, x64/arm64 only.`);
    process.exit(1);
  }
  return `${plat}-${a}`;
}

function cacheDir() {
  return join(homedir(), ".cache", "bdbc", VERSION);
}

function binaryPath() {
  return join(cacheDir(), "bdbc");
}

function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error("Too many redirects"));
    https
      .get(url, { headers: { "User-Agent": "bdbc-npm-installer" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(download(res.headers.location, dest, redirects + 1));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`download failed: HTTP ${res.statusCode} for ${url}`));
        }
        const file = createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
        file.on("error", reject);
      })
      .on("error", reject);
  });
}

async function ensureBinary() {
  const dest = binaryPath();
  if (existsSync(dest)) return dest;

  mkdirSync(cacheDir(), { recursive: true });
  const asset = `bdbc-${targetName()}`;
  const url = `https://github.com/${REPO}/releases/download/v${VERSION}/${asset}`;
  console.error(`bdbc: downloading ${asset} for v${VERSION}...`);

  const tmp = dest + ".tmp";
  await download(url, tmp);
  chmodSync(tmp, 0o755);
  renameSync(tmp, dest);
  return dest;
}

ensureBinary()
  .then((bin) => {
    const result = spawnSync(bin, process.argv.slice(2), { stdio: "inherit" });
    process.exit(result.status ?? 1);
  })
  .catch((err) => {
    console.error("bdbc:", err.message);
    process.exit(1);
  });
