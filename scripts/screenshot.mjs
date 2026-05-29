#!/usr/bin/env node
import { chromium, firefox, webkit } from "playwright";
import crypto from "node:crypto";

function usage() {
  console.log(`
Usage:
  npm run screenshot -- <url> [out]

Options:
  --browser=chromium|firefox|webkit   (default: chromium)
  --width=<n>                         (default: 1440)
  --height=<n>                        (default: 900)
  --full                              Full page screenshot
  --dark                              Emulate prefers-color-scheme: dark
  --wait=load|domcontentloaded|networkidle  (default: networkidle)
  --timeout=<ms>                      (default: 30000)
  --scale=css|device                  (default: device)
  --clip                              Screenshot viewport only (ignores --full)

Examples:
  npm run screenshot -- https://example.com
  npm run screenshot -- https://example.com out.png --dark --full
  npm run screenshot -- https://example.com --browser=firefox --width=1200 --height=800
`);
}

function parseArgs(argv) {
  const out = {
    url: null,
    outPath: null,
    browser: "chromium",
    width: 1440,
    height: 900,
    fullPage: false,
    dark: true,
    waitUntil: "networkidle",
    timeout: 30_000,
    scale: "device",
    clip: false,
  };

  const positional = [];
  for (const a of argv) {
    if (!a.startsWith("--")) positional.push(a);
  }
  out.url = positional[0] ?? null;
  out.outPath = positional[1] ?? null;

  for (const a of argv) {
    if (!a.startsWith("--")) continue;

    if (a === "--full") out.fullPage = true;
    else if (a === "--dark") out.dark = true;
    else if (a === "--clip") out.clip = true;
    else if (a.startsWith("--browser=")) out.browser = a.split("=", 2)[1];
    else if (a.startsWith("--width=")) out.width = Number(a.split("=", 2)[1]);
    else if (a.startsWith("--height=")) out.height = Number(a.split("=", 2)[1]);
    else if (a.startsWith("--wait=")) out.waitUntil = a.split("=", 2)[1];
    else if (a.startsWith("--timeout="))
      out.timeout = Number(a.split("=", 2)[1]);
    else if (a.startsWith("--scale=")) out.scale = a.split("=", 2)[1];
  }

  return out;
}

function slugFromUrl(u) {
  // host + path, sanitized; include a short hash of query to avoid collisions.
  const host = (u.hostname || "site").replace(/^www\./, "");
  const path = (u.pathname || "/")
    .replace(/\/+$/, "")
    .replace(/^\//, "")
    .replace(/\//g, "-");

  const base = [host, path].filter(Boolean).join("-");
  const safeBase = (base || host)
    .replace(/[^a-z0-9._-]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const q = u.search ? u.search : "";
  const hash = q
    ? crypto.createHash("sha1").update(q).digest("hex").slice(0, 8)
    : null;

  return (hash ? `${safeBase}__${hash}` : safeBase) + ".png";
}

function pickBrowser(name) {
  switch (name) {
    case "chromium":
      return chromium;
    case "firefox":
      return firefox;
    case "webkit":
      return webkit;
    default:
      throw new Error(
        `Unknown --browser=${name} (use chromium|firefox|webkit)`,
      );
  }
}

const opts = parseArgs(process.argv.slice(2));

if (!opts.url) {
  usage();
  process.exit(1);
}

let urlObj;
try {
  urlObj = new URL(opts.url);
} catch {
  console.error(`Invalid URL: ${opts.url}`);
  process.exit(1);
}

if (!Number.isFinite(opts.width) || !Number.isFinite(opts.height)) {
  console.error("--width and --height must be numbers");
  process.exit(1);
}

const outPath = `src/images/${opts.outPath ?? slugFromUrl(urlObj)}`;
const engine = pickBrowser(opts.browser);

const browser = await engine.launch();
const context = await browser.newContext({
  viewport: { width: opts.width, height: opts.height },
  colorScheme: opts.dark ? "dark" : "light",
  deviceScaleFactor: opts.scale === "css" ? 1 : undefined, // "device" = default
});

const page = await context.newPage();

try {
  await page.goto(urlObj.toString(), {
    waitUntil: opts.waitUntil,
    timeout: opts.timeout,
  });

  // If the site uses JS to toggle dark mode based on prefers-color-scheme,
  // setting colorScheme in the context usually covers it. This is a belt+suspenders.
  if (opts.dark) {
    await page.emulateMedia({ colorScheme: "dark" });
  }

  const fullPage = opts.clip ? false : opts.fullPage;

  await page.screenshot({
    path: outPath,
    fullPage,
    scale: opts.scale,
  });

  console.log(`Saved: ${outPath}`);
} catch (err) {
  console.error(err?.message ?? err);
  process.exitCode = 1;
} finally {
  await context.close();
  await browser.close();
}
