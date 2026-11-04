/* Politica India service worker.
 * Strategy:
 *  - Hashed Next.js assets (/_next/static): cache-first, immutable.
 *  - Optimised images (/_next/image) and icons: stale-while-revalidate.
 *  - Page navigations: network-first with a 4s timeout, falling back to the
 *    cached copy of that page, then to the offline page.
 * Nothing user-specific is cached; the site has no accounts yet.
 */
const VERSION = "v4";
const STATIC = `politica-static-${VERSION}`;
const PAGES = `politica-pages-${VERSION}`;
const IMAGES = `politica-images-${VERSION}`;
const OFFLINE_URL = "/offline";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGES).then((c) => c.addAll([OFFLINE_URL])).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => ![STATIC, PAGES, IMAGES].includes(k)).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
      // Cache the pages that are already open, so the profile a visitor was
      // reading when the worker first installed is available offline too.
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((clients) =>
        caches.open(PAGES).then((cache) =>
          Promise.all(
            clients.map((c) =>
              fetch(c.url)
                .then((res) => (res.ok ? cache.put(c.url, res) : null))
                .catch(() => null)
            )
          )
        )
      )
  );
});

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
}

async function networkFirstPage(request) {
  const cache = await caches.open(PAGES);
  try {
    const res = await Promise.race([fetch(request), timeout(4000)]);
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    const offline = await cache.match(OFFLINE_URL);
    if (!offline) return Response.error();
    // Rebuild the response so each offline navigation gets a fresh body stream
    // and a 503 status, which stops browsers from treating it as the real page.
    const body = await offline.arrayBuffer();
    return new Response(body, {
      status: 503,
      statusText: "Offline",
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Politica-SW": "offline" },
    });
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const res = await fetch(request);
  if (res && res.ok) cache.put(request, res.clone());
  return res;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((res) => {
      if (res && res.ok) cache.put(request, res.clone());
      return res;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, STATIC));
    return;
  }
  if (url.pathname.startsWith("/_next/image") || url.pathname.startsWith("/icons/") || url.pathname.endsWith(".svg")) {
    event.respondWith(staleWhileRevalidate(request, IMAGES));
    return;
  }
});
