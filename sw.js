const CACHE_NAME = 'lne-cache-v2';

// Archivos clave para precargar durante la instalación
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/asistente.js',
    '/assets/imagenes/logo.png',
    '/assets/imagenes/logo4.png',
    '/assets/imagenes/logo5.png'
];

// Instalar: precargar archivos esenciales
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(PRECACHE_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Activar: limpiar cachés antiguas
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Interceptar peticiones (Estrategia: Stale-While-Revalidate para estáticos y assets)
self.addEventListener('fetch', event => {
    // Ignorar peticiones de API (como /api/chat) y esquemas externos no admitidos
    if (!event.request.url.startsWith(self.location.origin) || event.request.url.includes('/api/')) {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => {
                    // Silenciar fallos de red en modo offline
                });

                return cachedResponse || fetchPromise;
            });
        })
    );
});
