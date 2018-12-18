self.addEventListener('install', (event) => {
  console.log('SW Installed');
  

  //caches these file
  event.waitUntil(
    caches.open('static')
      .then( (cache) => {
        cache.addAll([
          '/',
          '/index.html',
          '/client/dist/bundle.js',
          '/style.css',
          '/server.js'
        ]);
      })
  );
});


self.addEventListener('activate', () => {
  console.log('SW Activated');
});


self.addEventListener('fetch', (event) =>{

  //fetch the files from the cache, if not found it fetches them from server
  event.respondWith(
    caches.match(event.request)
      .then((res) =>{
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});