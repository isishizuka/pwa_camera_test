var CACHE_NAME = 'pwa-camera-test-caches';
var urlsToCache = ['/index.html', '/js/camera.js'];

self.addEventListener('install', function (event) {
    // Cache Storage にリソースをキャッシュし直す
    event.waitUntil(PopulateResourcesInCacheStorage());
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListern('activate', e => {
    // 不要なリソースを Cache Storage から削除する
    e.waitUntil(DeleteOutdatedResourcesInCacheStorage());
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function (response) {
                return response ? response : fetch(event.request);
            })
    );
});
