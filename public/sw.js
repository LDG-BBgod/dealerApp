const self = this

self.addEventListener('fetch', (event) => {
  // Intercept the request and modify start_url if it's a navigation request
  if (event.request.mode === 'navigate') {
    const url = new URL(event.request.url);
    const params = url.searchParams.toString(); // Get the query parameters

    // Modify the start_url based on the current URL and its query parameters
    const newStartUrl = `/mo?${params}`;
    const manifestUrl = new URL('/manifest.json', self.location).toString();
    
    // Update the manifest's start_url
    if (event.request.url === manifestUrl) {
      const modifiedManifest = JSON.parse(event.request.headers.get('Manifest-Modified'));
      modifiedManifest.start_url = newStartUrl;
      const modifiedResponse = new Response(JSON.stringify(modifiedManifest), {
        headers: { 'Content-Type': 'application/json' },
      });
      event.respondWith(modifiedResponse);
    }
  }
});
