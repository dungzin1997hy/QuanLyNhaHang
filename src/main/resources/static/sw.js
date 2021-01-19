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

            db = e.target.result;
            var transaction = db.transaction([storeName], "readwrite");
            var store = transaction.objectStore(storeName);
            var request = store.get(key);
            request.onerror = function () {
                reject("unexpected error happened");
            }
            request.onsuccess = function (e) {
                resolve(new Response(request.result, {"status": 200, "statusText": "MyCustomResponse!"}));
            }
        }
        openRequest.onerror = function (e) {
            console.log("Error");
            console.dir(e);
        }
    });
}

var callsToCache = new Array(0);
self.addEventListener('fetch', function (event) {
    let response;
    if (event.request.method == 'POST') {
        if (event.request.url.includes("/callDish")) {
           // console.log(event.request);
            var request = event.request;
            var headers = {};
            for (var entry of request.headers.entries()) {
                headers[entry[0]] = entry[1];
            }
            var serialized = {
                url: request.url,
                headers: headers,
                method: request.method,
                mode: request.mode,
                credentials: request.credentials,
                cache: request.cache,
                redirect: request.redirect,
                referrer: request.referrer
            };
            request.clone().text().then(function (body) {
                serialized.body = body;
                console.log(serialized.body);
                callsToCache.push(serialized);
                console.log(callsToCache);
                let saveDB = indexedDB.open('fetchEvent', 1);
                saveDB.onsuccess = function (event1) {
                    var db = event1.target.result;
                    var tx = db.transaction(['fetchEvent'], 'readwrite');
                    var store = tx.objectStore('fetchEvent');
                    store.add(serialized, Math.floor(Math.random() * 10));

                }
            });

            request.onupgradeneeded = function (event) {
                var db = event.target.result;
                var objectStore = db.createObjectStore('responseDB');
            };
        }
        if (event.request.url.includes('/api/getAll')) {
            fetch(event.request).then(function (response) {
                return response.json();
            })
                .then(function (data) {
                    const items = data;
                    let request = indexedDB.open('mydatabase', 1);
                    request.onsuccess = function (event1) {
                        var db = event1.target.result;
                        var tx = db.transaction(['responseDB'], 'readwrite');
                        var store = tx.objectStore('responseDB');
                        console.log()
                        store.delete(event.request.url);
                        store.add(JSON.stringify(items), event.request.url);
                    }
                    request.onupgradeneeded = function (event) {
                        var db = event.target.result;
                        var objectStore = db.createObjectStore('responseDB');
                    };

                })
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
    let request = indexedDB.open('fetchEvent', 1);
    request.onsuccess = function (event1) {

    }
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore('fetchEvent');
    };
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

self.addEventListener('sync', function (event) {
    if (event.tag == 'myFirstSync') {
        event.waitUntil(doSomeStuff('fetchEvent', 'fetchEvent'));
    }
});

function doSomeStuff(dbName, storeName) {
    console.log("dfsadf");
    // callsToCache.forEach(function (signatureRequest) {
    //     fetch(signatureRequest.url, {
    //         method: signatureRequest.method,
    //         body: signatureRequest.body
    //     })
    // });
    // callsToCache = [];

    var openRequest = indexedDB.open(dbName, 1);
    openRequest.onsuccess = function (e) {
        db = e.target.result;
        var transaction = db.transaction([storeName], "readwrite");
        var store = transaction.objectStore(storeName);
        var request = store.getAll();
        request.onsuccess = function() {
            console.log(request.result);
            for(var i=0;i<request.result.length;i++){
                signatureRequest = request.result[i];
                console.log('body: '+signatureRequest.body);
                fetch(signatureRequest.url, {
                    method: signatureRequest.method,
                    body: signatureRequest.body,
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    }
                })
            }
        };
    }
    openRequest.onerror = function (e) {
        console.log("Error");
        console.dir(e);
    }

    // fetch('/api/getAllDish',{
    //     method: 'post',
    //     headers: {
    //         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    //     },
    //     body: 'foo=bar&lorem=ipsum'})
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(function(data) {
    //         console.log(data);
    //     });
}

