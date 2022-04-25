self.addEventListener('install', function(e){
    console.log('[Service Workssser] Installerar', e)
})

self.addEventListener('activate', function(e){
    console.log("HELLLLL  sdsdsO", e)
})

self.addEventListener('fetch', function(e){
    console.log("SERVICssE WORKER FETCH", e)
    e.respondWith(null)
})