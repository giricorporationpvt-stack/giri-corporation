/**
 * Giri — Sovereign Edge Service Worker (v1.0.0)
 * Engineered for 1,000,000+ users/sec scalability via client-side caching.
 * Network-First for Navigation, HTML, CSS, and JS to guarantee instant updates.
 */

const CACHE_NAME = 'giri-edge-v12';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/apps.html',
  '/founder.html',
  '/css/styles.css?v=20260918_v12_audio',
  '/js/app.js',
  '/js/nav.js',
  '/js/modules/features.js',
  '/js/modules/studio.js',
  '/assets/logo.png?v=2',
  '/assets/logo.svg'
];

// Install: Pre-cache critical core application shell and skip waiting immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Pre-cache non-fatal warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up ALL legacy caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => {
          console.log('[ServiceWorker] Evicting old cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Strategy:
// Network-First for HTML navigations, CSS stylesheets, and JS scripts
// Cache-First with Network fallback for static media (images, fonts, svg)
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Ignore cross-origin external API requests
  if (url.origin !== self.location.origin) return;

  // Range requests (e.g. byte-range seeking in audio/video) must bypass service worker cache
  // to avoid HTTP 206 Partial Content caching bugs in Safari and Chromium
  if (request.headers.has('range')) return;

  const isHtml = request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html') || url.pathname.endsWith('.html');
  const isCode = url.pathname.endsWith('.css') || url.pathname.endsWith('.js');

  if (isHtml || isCode) {
    // Network-First: Always fetch fresh updates from edge, fall back to cache only when offline
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Media assets (images, icons): Cache-First
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      });
    })
  );
});
