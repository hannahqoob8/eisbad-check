/* Eisklar Service Worker
   Abhaengigkeitsfreies Runtime-Caching fuer eine Offline-Shell.

   - HTML / Navigationen: Network-first. So bekommen wiederkehrende Nutzer
     nach einem Deploy sofort die neue Version (die alte HTML verwies auf
     alte, nicht mehr existierende _next-Chunks -> "haengt auf alter Version").
   - Statische Assets (_next/static, Bilder, Fonts): Cache-first, da die
     Dateinamen gehasht und damit unveraenderlich sind.

   Bei jedem inhaltlichen Update von sw.js CACHE-Namen erhoehen. */

const CACHE = "eisklar-v3";
const CORE = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

function isHtmlRequest(req) {
  if (req.mode === "navigate") return true;
  const accept = req.headers.get("accept") || "";
  return accept.includes("text/html");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  // HTML / Navigationen: Netzwerk zuerst, Cache nur als Offline-Fallback.
  if (isHtmlRequest(req)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => {
              cache.put(req, copy);
              cache.put("./index.html", copy.clone());
            });
          }
          return res;
        })
        .catch(
          () =>
            caches.match(req).then((c) => c || caches.match("./index.html"))
        )
    );
    return;
  }

  // Statische, gehashte Assets: Cache zuerst.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
