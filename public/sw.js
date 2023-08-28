const self = this

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  if (url.pathname === '/mo') {
    const savedDtype = getSavedQueryParamValue()

    if (savedDtype) {
      url.searchParams.set('dtype', savedDtype)

      const modifiedRequest = new Request(url, {
        method: event.request.method,
        headers: event.request.headers,
        body: event.request.body,
        mode: event.request.mode,
        credentials: event.request.credentials,
        redirect: event.request.redirect,
        referrer: event.request.referrer,
        integrity: event.request.integrity,
      })

      event.respondWith(fetch(modifiedRequest))
      return
    }
  }

  event.respondWith(fetch(event.request))
})

function getSavedQueryParamValue() {
  const savedDtype = localStorage.getItem('savedDtype')
  return savedDtype || null
}
