const CACHE = 'cubes-v12';
const THREE = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const LOCAL = ['./', 'index.html', 'splash-1170.png', 'splash-1290.png', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.all(LOCAL.map((u) => c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
    try { await c.put(THREE, await fetch(new Request(THREE, { mode: 'no-cors' }))); } catch (err) {}
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

// Our own files: network first (so updates arrive), cache as the offline fallback.
// Other hosts (three.js, fonts): cache first.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    if (url.origin === self.location.origin) {
      try {
        const res = await fetch(url.href, { cache: 'no-cache' });
        if (res && res.ok) c.put(e.request, res.clone());
        return res;
      } catch (err) {
        const hit = await c.match(e.request, { ignoreSearch: true });
        return hit || (await c.match('index.html')) || Response.error();
      }
    }
    const hit = await c.match(e.request);
    if (hit) return hit;
    try {
      const res = await fetch(e.request);
      if (res && (res.ok || res.type === 'opaque')) c.put(e.request, res.clone());
      return res;
    } catch (err) {
      return Response.error();
    }
  })());
});
