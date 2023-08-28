const self = this

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url)
  if (requestUrl.pathname === '/mo') {
    const params = requestUrl.search
    const newStartUrl = `/mo?${params}`
    const modifiedManifest = JSON.parse(
      event.request.headers.get('Manifest-Modified'),
    )
    modifiedManifest.start_url = newStartUrl
    const modifiedResponse = new Response(JSON.stringify(modifiedManifest), {
      headers: { 'Content-Type': 'application/json' },
    })
    event.respondWith(modifiedResponse)
  }
})
