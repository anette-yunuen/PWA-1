const APP_CACHE = 'as-app-v1';
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest', '/icons/icon-192.svg', '/icons/icon-512.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(APP_CACHE);
    await cache.addAll(APP_SHELL);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // SPA fallback para navigations, pero sirviendo siempe el index 
  if (e.request.mode === 'navigate') {
    e.respondWith((async () => {
      const cache = await caches.open(APP_CACHE);
      const cached = await cache.match('/index.html');
      return cached || fetch('/index.html');
    })());
    return;
  }
  // Cache-first para shell
  e.respondWith((async () => {
    const cache = await caches.open(APP_CACHE);
    const cached = await cache.match(e.request);
    return cached || fetch(e.request);
  })());
});

self.addEventListener('notificationclick', (evt) => {
  evt.notification.close();
  if (evt.action === 'open') {
    evt.waitUntil(clients.openWindow('/'));
  }
});
