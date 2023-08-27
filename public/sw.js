const self = this

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url)

  if (requestUrl.pathname.startsWith('/dynamic')) {
    event.respondWith(handleDynamicRequest(event.request))
  }
})

async function handleDynamicRequest(request) {
  const startUrl = getDynamicStartUrl(request)
  const response = await fetch(startUrl)
  return response
}

function getDynamicStartUrl(request) {
  const params = new URLSearchParams(request.url.split('?')[1])
  const url = params.get('url')
  return url
}
