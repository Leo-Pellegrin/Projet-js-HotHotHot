if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/TestServiceworke.js');
};

self.addEventListener("install", (event) => {
    console.log("service worker installed");
});

self.addEventListener("activate", (event) => {
    console.log("service worker activated");
     self.clients.claim() ;
});

self.addEventListener("fetch", (event) => {
    console.log("request to : " + event.request.url);
    if (navigator.onLine)
          event.respondWith(fetch(event.request));
    else
          event.respondWith(new Response("Vous n'êtes pas connecté à internet"));
});

caches.open("mon-cache").then(cache => {   
    cache.add("/main.html"); //Ajoute dans le cache la reponse à la requete vers index.hmtl
    let response = cache.match(request); //récupère dans le cache la réponse associé à une requête
 
 });


self.addEventListener("fetch", (event) => {
    event.respondWith(caches.open("mon-cache").then(cache =>
        cache.match(event.request).then(cResponse => {
            if (cResponse) {
                event.waitUntil(fetch(event.request).then(fResponse =>
                    cache.put(event.request, fResponse)
                ));
                return cResponse;
            } else {
                return fetch(event.request).then(fResponse =>
                    cache.put(event.request, fResponse.clone())
                        .then(() => fResponse)
                );
            }
        })
    ));
 });