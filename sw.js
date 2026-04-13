self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});

self.addEventListener("message", event => {
  if (event.data.type === "SHOW_NOTIFICATION") {
    self.registration.showNotification("📚 Study Reminder", {
      body: event.data.message,
      vibrate: [300, 100, 300],
      requireInteraction: true
    });
  }
});