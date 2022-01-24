self.addEventListener("install", function (e) {
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cacheName) => {
                caches.delete(cacheName);
            })
        );
    });
    self.registration
        .unregister()
        .then(function () {
            return self.clients.matchAll();
        })
        .then(function (clients) {
            clients.forEach((client) => client.navigate(client.url));
        });
});
