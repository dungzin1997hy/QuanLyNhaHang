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

function readtheDatafromIndexedDb(dbName, storeName, key) {
    return new Promise((resolve, reject) => {
        var openRequest = indexedDB.open(dbName, 1);

        openRequest.onsuccess = function (e) {
            console.log("Success!");
            db = e.target.result;
            var transaction = db.transaction([storeName], "readwrite");
            var store = transaction.objectStore(storeName);
            var request = store.get(key);
            request.onerror = function () {
                console.log("Error");
                reject("unexpected error happened");
            }
            request.onsuccess = function (e) {
                console.log("return the respose from db");
                console.log(request.result);
                resolve(new Response(request.result, {"status": 200, "statusText": "MyCustomResponse!"}));
            }
        }
        openRequest.onerror = function (e) {
            console.log("Error");
            console.dir(e);
        }
    });

}

self.addEventListener('fetch', function (event) {
    let response;


    if (event.request.method == 'POST') {
        if (event.request.url.includes('/getAllDish')) {
            event.respondWith(
                fetch(event.request).catch(function (result) {
                    return readtheDatafromIndexedDb('mydatabase', 'responseDB', event.request.url).then(function (response) {
                        return response;
                    });
                })
            );
        }
        // event.waitUntil((async () => {
        //
        //     let request = indexedDB.open('mydatabase', 1);
        //     request.onsuccess = function (event1) {
        //         var db = event1.target.result;
        //         var tx = db.transaction(['responseDB'], 'readwrite');
        //         var store = tx.objectStore('responseDB');
        //         //store.add(items,event.request.url);
        //
        //         let resulttemp = (store.get(event.request.url));
        //         resulttemp.onsuccess = function (evt) {
        //             if (evt.target.result != null) {
        //                 response = evt.target.result;
        //                 console.log(response);
        //                // console.log(evt.target.result);
        //             }
        //         }
        //     }
        //     // Your IDB cleanup logic here.
        //     // Basically, anything that can execute separately
        //     // from response generation.
        // })());

        //
        // event.respondWith((async () => {
        //     let request = indexedDB.open('mydatabase', 1);
        //     request.onsuccess = function (event1) {
        //         var db = event1.target.result;
        //         var tx = db.transaction(['responseDB'], 'readwrite');
        //         var store = tx.objectStore('responseDB');
        //         //store.add(items,event.request.url);
        //
        //         let resulttemp = (store.get(event.request.url));
        //         resulttemp.onsuccess = function (evt) {
        //             if (evt.target.result != null) {
        //
        //                 console.log(JSON.stringify(evt.target.result));
        //             }
        //         }
        //     }
        //    })());
        // let request = indexedDB.open('mydatabase', 1);
        // request.onsuccess = function (event1) {
        //     var db = event1.target.result;
        //     var tx = db.transaction(['responseDB'], 'readwrite');
        //     var store = tx.objectStore('responseDB');
        //     //store.add(items,event.request.url);
        //
        //     let resulttemp = (store.get(url));
        //     resulttemp.onsuccess = function (evt) {
        //         if (evt.target.result != null) {
        //             console.log(evt.target.result);
        //             return new Response(evt.target.result, { "status" : 200 , "statusText" : "MyCustomResponse!" });
        //         }
        //     }
        // }


        // fetch(event.request).then(function (response) {
        //     return response.json();
        // })
        //     .then(function (data) {
        //         const items = data;
        //         let request = indexedDB.open('mydatabase', 1);
        //         request.onsuccess = function (event1) {
        //             var db = event1.target.result;
        //             var tx = db.transaction(['responseDB'], 'readwrite');
        //             var store = tx.objectStore('responseDB');
        //             store.add(JSON.stringify(items),event.request.url);
        //
        //             let resulttemp = (store.get(event.request.url));
        //             resulttemp.onsuccess = function (evt) {
        //                 if (evt.target.result == null) {
        //                     store.add(items, event.request.url);
        //                 }
        //                 else console.log(evt.target);
        //             }
        //         }
        //         request.onupgradeneeded = function (event) {
        //             var db = event.target.result;
        //             var objectStore = db.createObjectStore('responseDB');
        //         };
        //
        //     })
    } else {
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
    }
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
                if (key !== staticCacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
});



