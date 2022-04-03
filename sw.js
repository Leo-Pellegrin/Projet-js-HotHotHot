self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache =>{
            return cache.addAll(["./", "./style/style.css", "./assets/images/android-chrome-192x192.png", "./assets/images/android-chrome-512x512.png", "./sw.js"])
        })
    );
});

self.addEventListener("fetch", e =>{
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});

