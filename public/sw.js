const self = this

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('dynamic-manifest-cache').then((cache) => {
      return cache.addAll(['/danamicManifest.json'])
    }),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})
