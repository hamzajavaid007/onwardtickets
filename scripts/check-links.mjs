#!/usr/bin/env node
/**
 * Lightweight internal link checker for the running Next.js app.
 *
 * Usage:
 *   node scripts/check-links.mjs          # checks http://localhost:4000
 *   BASE_URL=http://127.0.0.1:4000 node scripts/check-links.mjs
 */

const BASE_URL = (process.env.BASE_URL || "http://localhost:4000").replace(/\/+$/, "");
const MAX_PAGES = Number.parseInt(process.env.MAX_PAGES || "500", 10);

const SKIP_PREFIXES = ["/_next", "/favicon", "/robots.txt", "/sitemap"];
const SKIP_EXT_RE = /\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff2?|ttf|eot|pdf|zip)$/i;

function normalizePath(raw) {
  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    try {
      const url = new URL(raw);
      if (url.origin !== new URL(BASE_URL).origin) return null;
      raw = url.pathname + url.search + url.hash;
    } catch {
      return null;
    }
  }

  // Ignore non-HTTP navigation.
  if (raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) return null;

  if (!raw.startsWith("/")) return null;

  // Strip query/hash; we care about route existence.
  const noHash = raw.split("#", 1)[0];
  const noQuery = noHash.split("?", 1)[0];

  if (noQuery.length > 1) return noQuery.replace(/\/+$/, "");
  return "/";
}

function shouldSkip(pathname) {
  if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  if (SKIP_EXT_RE.test(pathname)) return true;
  return false;
}

function extractInternalPaths(html) {
  const out = new Set();
  // Capture href/action values. This intentionally stays simple and fast.
  const re = /\b(?:href|action)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;
  let match;
  while ((match = re.exec(html)) !== null) {
    const raw = match[1] || match[2] || match[3] || "";
    const p = normalizePath(raw);
    if (!p) continue;
    if (shouldSkip(p)) continue;
    out.add(p);
  }
  return out;
}

async function fetchHtml(pathname) {
  const url = `${BASE_URL}${pathname}`;
  const res = await fetch(url, {
    redirect: "follow",
    headers: { Accept: "text/html,*/*" },
  });

  const contentType = res.headers.get("content-type") || "";
  const isHtml = contentType.includes("text/html");
  const body = isHtml ? await res.text() : "";
  return { status: res.status, url: res.url, isHtml, body };
}

async function main() {
  const visited = new Map(); // pathname -> {status, url}
  const queue = ["/"];

  if (process.env.SEED_ALL_ROUTES === "1") {
    for (const r of await discoverStaticAppRoutes()) queue.push(r);
  }

  while (queue.length && visited.size < MAX_PAGES) {
    const pathname = queue.shift();
    if (!pathname || visited.has(pathname)) continue;
    if (shouldSkip(pathname)) continue;

    let result;
    try {
      result = await fetchHtml(pathname);
    } catch (err) {
      visited.set(pathname, { status: 0, url: `${BASE_URL}${pathname}`, error: String(err) });
      continue;
    }

    visited.set(pathname, { status: result.status, url: result.url });

    if (result.status >= 200 && result.status < 400 && result.isHtml) {
      for (const p of extractInternalPaths(result.body)) {
        if (!visited.has(p)) queue.push(p);
      }
    }
  }

  const broken = [];
  for (const [pathname, meta] of visited.entries()) {
    if (meta.status === 0 || meta.status >= 400) broken.push([pathname, meta]);
  }

  broken.sort((a, b) => a[0].localeCompare(b[0]));

  if (broken.length === 0) {
    console.log(`OK: no broken internal links found (checked ${visited.size} pages)`);
    return;
  }

  console.log(`Broken internal links (checked ${visited.size} pages):`);
  for (const [pathname, meta] of broken) {
    console.log(`- ${meta.status} ${pathname} -> ${meta.url}${meta.error ? ` (${meta.error})` : ""}`);
  }

  process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function discoverStaticAppRoutes() {
  const appDir = new URL("../app/", import.meta.url);
  const routes = new Set();

  async function walk(dirUrl, relParts) {
    const entries = await import("node:fs/promises").then((fs) => fs.readdir(dirUrl, { withFileTypes: true }));
    for (const ent of entries) {
      if (ent.name.startsWith(".")) continue;
      if (ent.isDirectory()) {
        // Skip route groups like (marketing)
        if (ent.name.startsWith("(") && ent.name.endsWith(")")) {
          await walk(new URL(`${ent.name}/`, dirUrl), relParts);
        } else {
          await walk(new URL(`${ent.name}/`, dirUrl), [...relParts, ent.name]);
        }
      } else if (ent.isFile() && /^page\.(?:tsx|ts|jsx|js)$/.test(ent.name)) {
        // Skip dynamic segments; we can't reliably generate valid params.
        if (relParts.some((p) => p.startsWith("[") && p.endsWith("]"))) continue;
        const pathname = relParts.length ? `/${relParts.join("/")}` : "/";
        if (!shouldSkip(pathname)) routes.add(pathname);
      }
    }
  }

  await walk(appDir, []);
  return [...routes].sort();
}
