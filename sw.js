/*
 * @LastEditTime: 2021-11-20 22:50:05
 * @LastEditors: jinxiaojian
 */
var cacheStorageKey = 'wendanduibiqi-1.1.1'

var cacheList = [
  '/',
  "index.html",
  "main.js",
  "diff.js",
  "cssChange.js",
  "style.css",
  "icon.png",
  "manifest.json",
  "sw.js"
]

// 借助 Service Worker, 可以在注册完成安装 Service Worker 时, 抓取资源写入缓存
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheStorageKey)
      .then(cache => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
  )
})

// 网页抓取资源的过程中, 在 Service Worker 可以捕获到 fetch 事件, 可以编写代码决定如何响应资源的请求
self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      if (response != null) {
        return response
      }
      return fetch(e.request.url)
    })
  )
})
// 缓存的资源随着版本的更新会过期, 所以会根据缓存的字符串名称(这里变量为 cacheStorageKey, 值用了 "minimal-pwa-1")清除旧缓存, 可以遍历所有的缓存名称逐一判断决决定是否清除(备注: 简化的写法, Promise.all 中 return undefined 可能出错, 见评论)
self.addEventListener('activate', function (e) {
  e.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
        })
      })
    ).then(() => {
      return self.clients.claim()
    })
  )
})