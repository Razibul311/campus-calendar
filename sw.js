/* =========================================================
   SERVICE WORKER — Campus Calendar PWA
   Offline caching & auto update
========================================================= */

const CACHE_NAME = 'campus-calendar-v1.0.0';


const PRECACHE_URLS = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './css/study-task.css',
    './js/app.js',
    './js/study-task.js',
    './js/cgpa-calculator.js',
    './js/study-analytics.js',
    './icon-512.png'
];

// =========================================================
// INSTALL 
// =========================================================
self.addEventListener('install', event => {
    console.log('🔧 SW: Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 SW: Caching files...');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => {
                console.log('✅ SW: Cached all files');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ SW: Cache failed:', error);
            })
    );
});

// =========================================================
// ACTIVATE
// =========================================================
self.addEventListener('activate', event => {
    console.log('🔧 SW: Activating...');

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🗑️ SW: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ SW: Activated');
                return self.clients.claim();
            })
    );
});

// =========================================================
// FETCH — Network first, cache fallback
// =========================================================
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseClone);
                        });
                }
                return response;
            })
            .catch(() => {
                return caches.match(event.request)
                    .then(cachedResponse => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// =========================================================
// MESSAGE — Update handle
// =========================================================
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('✅ SW: Service Worker loaded');
