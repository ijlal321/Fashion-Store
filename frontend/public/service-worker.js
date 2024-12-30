const CACHE_NAME = "mern-app-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/static/js/bundle.js", // Adjust this based on your build output
    "/static/css/main.css", // Adjust this based on your build output
];

window.addEventListener("offline", () => {
    alert("You are offline. Please connect to the internet.");
});

window.addEventListener("online", () => {
    alert("You are back online.");
});

self.addEventListener("install", (event) => {
    self.skipWaiting(); // Skip waiting to immediately activate the new service worker
});

self.addEventListener("activate", (event) => {
    // Ensure the service worker doesn't cache anything
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    // No caching or serving from cache, just allow network requests
    event.respondWith(fetch(event.request));
});
