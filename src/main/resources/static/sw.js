 var staticCacheName = 'site-static-v2';
// const dynamicCacheName = 'site-dynamic-v2';
// const assets = [
//     '/clientcall',
//     '/js_templates/clientcall.js',
//     '/global_assets/js/main/jquery.min.js',
//     'https://fonts.gstatic.com/s/materialicons/v70/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
//     '/css_customize/materialize.min.css',
//     '/css_customize/styleclient.css',
//     '/global_assets/css/icons/icomoon/styles.min.css',
//     '/assets/css/layout.min.css',
//     '/assets/css/components.min.css',
//     '/assets/css/colors.min.css',
//     '/global_assets/js/plugins/loaders/blockui.min.js',
//     '/js_templates/materialize.min.js',
//     '/app.js',
//     '/sw.js',
//     '/global_assets/js/main/bootstrap.bundle.min.js',
//     '/manifest.json'
//
// ];
//dfsa
//
var url;

self.addEventListener('fetch', function (event) {
    if(event.request.method == 'POST'){
        url = event.request.url;
        console.log(url);
        fetch(event.request).then(function(response){ return response.json(); })
            .then(function(data) {
                const items = data;
                let request = indexedDB.open('mydatabase', 1);
                request.onsuccess = function(event1){
                    var db = event1.target.result;
                    var tx = db.transaction(['responseDB'], 'readwrite');
                    var store = tx.objectStore('responseDB');
                    //store.add(items,event.request.url);

                    let resulttemp = (store.get(url));


                    resulttemp.onsuccess = function (evt) {
                        if(evt.target.result == null){
                            store.add(items,event.request.url);

                        }
                        else {
                            console.log(evt.target.result);
                        }
                    }
                }
                request.onupgradeneeded = function(event) {
                    var db = event.target.result;

                    // the ObjectStore is just like a table in SQL type database
                    // we can data as the object store property
                    var objectStore = db.createObjectStore('responseDB');
                  //  objectStore.add(items, url);
                };s

            })
    }
    else
    event.respondWith(
        caches.open('mysite-dynamic').then(function (cache) {
            return cache.match(event.request, {ignoreSearch: true}).then(function (response) {

                var fetchPromise = fetch(event.request).then(function (networkResponse) {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
                return response || fetchPromise;
            });
        }),
    );
});

self.addEventListener('install', evt => {
    console.log('serviceworker has been installed');
    // evt.waitUntil(
    //     caches.open(staticCacheName).then(cache=>{
    //         console.log('caching shell assets');
    //         cache.addAll(assets);
    //     })
    // )

});


self.addEventListener('activate', evt => {
    // console.log('service active');
    console.log('service active');
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if(key !== staticCacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

