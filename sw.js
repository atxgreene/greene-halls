const CACHE = 'greene-halls-v1';
const STATIC = [
  '/',
  '/index.html',
  '/halls.json',
  '/ancient-basilica-sanctuary.html',
  '/hall-of-archangels.html',
  '/hall-of-the-nephilim.html',
  '/hall-of-the-watchers.html',
  '/human-psi-operations-room.html',
  '/the-greene-virtual-library.html',
  '/the-lyceum.html',
  '/the-revelation.html',
  '/the-temple-of-solomon.html'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Don't intercept cross-origin requests (CDN imports, etc.)
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const net = fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => null);
      return cached || net;
    })
  );
});
