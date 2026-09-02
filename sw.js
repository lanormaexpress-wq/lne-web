const CACHE_NAME = 'lne-cache-v6';

// Archivos clave para precargar durante la instalación
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/style.css?v=2.7',
    '/asistente.js?v=2.2',
    '/normas.js?v=1',
    '/formacion.js?v=2',
    '/legislacion.js?v=1',
    '/formacion-ui.js?v=2',
    '/router.js?v=7',
    '/manifest.json',
    '/pages/home.html',
    '/pages/codigo.html',
    '/pages/formacion.html',
    '/pages/curso.html',
    '/assets/iconos/formacion.svg',
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
                    if (key.startsWith('lne-cache-') && key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Interceptar peticiones. Los fragmentos y scripts legales usan Network-First
// para impedir que una versión antigua deje vacío el listado de artículos.
self.addEventListener('fetch', event => {
    // Ignorar peticiones de API (como /api/chat) y esquemas externos no admitidos
    if (!event.request.url.startsWith(self.location.origin) || event.request.url.includes('/api/')) {
        return;
    }

    const requestUrl = new URL(event.request.url);
    const isCriticalRequest = event.request.mode === 'navigate'
        || requestUrl.pathname.startsWith('/pages/')
        || requestUrl.pathname.startsWith('/data/')
        || (requestUrl.pathname.endsWith('.js') && requestUrl.pathname !== '/sw.js');

    if (isCriticalRequest) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request)
                    .then(networkResponse => {
                        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    })
                    .catch(async () => {
                        const cachedResponse = await cache.match(event.request);
                        if (cachedResponse) return cachedResponse;
                        if (event.request.mode === 'navigate') return cache.match('/index.html');
                        return Response.error();
                    });
            })
        );
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
