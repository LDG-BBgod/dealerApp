const self = this

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url)
  if (requestUrl.pathname === '/mo') {
    const params = requestUrl.search
    const newStartUrl = `/mo${params}`

    if (event.request.url.endsWith('/manifest.json')) {
      event.respondWith(
        fetch(event.request).then((response) => {
          return response.text().then((text) => {
            const modifiedManifest = JSON.parse(text)
            modifiedManifest.start_url = newStartUrl
            const modifiedBlob = new Blob([JSON.stringify(modifiedManifest)], {
              type: 'application/json',
            })
            const modifiedResponse = new Response(modifiedBlob, {
              headers: { 'Content-Type': 'application/json' },
            })
            return modifiedResponse
          })
        }),
      )
    }
  }
})
