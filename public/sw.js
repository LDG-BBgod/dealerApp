const self = this

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url)

  if (requestUrl.pathname === '/manifest.json') {
    alert('test')
    const params = requestUrl.search
    const modifiedManifest = JSON.parse(
      event.request.headers.get('Manifest-Modified'),
    )
    modifiedManifest.start_url = `/mo${params}` // Change the start_url as needed
    const modifiedResponse = new Response(JSON.stringify(modifiedManifest), {
      headers: { 'Content-Type': 'application/json' },
    })
    event.respondWith(modifiedResponse)
  }
  // Handle other requests
})
