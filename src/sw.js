const self = this
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icon.png',
        // Add other resources you want to cache
      ])
    }),
  )
})

self.addEventListener('beforeinstallprompt', (event) => {
  // Handle the beforeinstallprompt event and show a custom "Add to Home Screen" UI
  event.preventDefault()
  // You can show a custom UI here to prompt the user to add the app to the home screen
})
