// Custom service worker additions for HTTPS enforcement
// This file is imported by next-pwa in production builds

// Only cache HTTPS requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Block non-HTTPS requests (except localhost for development)
  if (url.protocol !== 'https:' && !url.hostname.includes('localhost') && !url.hostname.includes('127.0.0.1')) {
    console.warn(`Blocked non-HTTPS request: ${url.href}`);
    event.respondWith(
      new Response('HTTPS required', {
        status: 403,
        statusText: 'Forbidden',
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    );
    return;
  }
});

// Add Content Security Policy to all responses
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      // Clone the response to modify headers
      const modifiedResponse = new Response(response.body, response);
      
      // Add security headers
      modifiedResponse.headers.set('Content-Security-Policy', "upgrade-insecure-requests");
      modifiedResponse.headers.set('X-Content-Type-Options', 'nosniff');
      modifiedResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      
      return modifiedResponse;
    }).catch((error) => {
      console.error('Fetch failed:', error);
      throw error;
    })
  );
});