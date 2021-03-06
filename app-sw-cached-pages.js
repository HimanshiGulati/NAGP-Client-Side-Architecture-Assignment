const cacheName = 'v4';

const cacheAssets = [
    'index.html',
    '/css/style.css',
    '/css/font-awesome.css',
    'app.js',
    '/components/main.component.js',
    '/components/add-to-do-form.component.js',
    '/components/list.component.js'
]

//Call Install Event

self.addEventListener('install', e => {
    console.log('Service Worker : Installed');

    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );

});

//Call Activated Event
self.addEventListener('activate', e => {
    console.log('Service Worker : Activated');

    //remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                       console.log('Service Worker: Clearing Old Cache');
                       return caches.delete(cache);
                    }
                })
            )
        })
    );

});

// call fetch event
// self.addEventListener('fetch', e => {
//     console.log('Service Worker : Fetching');

//     e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));

// });

self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request).catch(function() {
        return caches.match(event.request);
      })
    );
  });