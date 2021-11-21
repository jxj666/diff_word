/*
 * @LastEditTime: 2021-11-21 16:03:49
 * @LastEditors: jinxiaojian
 */
let cacheName = 'wendanduibiqi-1.1.5'
let preUrl = ''
if (location.protocol === "https:") { preUrl = '/diff_word' }
let appShellFiles = [
  preUrl + "/index.html",
  preUrl + "/main.js",
  preUrl + "/diff.js",
  preUrl + "/cssChange.js",
  preUrl + "/style.css",
  preUrl + "/icon.png",
  preUrl + "/manifest.json",
  preUrl + "/sw.js"
]
let contentToCache = appShellFiles

// 配置 Service Worker，缓存上述列表的工作就发生在这里：
self.addEventListener('install', function (e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});


// 如果条件允许，Service Worker 将从缓存中请求内容所需的数据，从而提供离线应用功能：
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      console.log('[Service Worker] Fetching resource: ' + e.request.url);
      return r || fetch(e.request).then(function (response) {
        return caches.open(cacheName).then(function (cache) {
          console.log('[Service Worker] Caching new resource: ' + e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

// 用来清理那些我们不再需要的缓存
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        console.log('keyList',keyList)
        if (cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});