/*
 * @LastEditTime: 2021-11-20 22:16:14
 * @LastEditors: jinxiaojian
 */
var cacheStorageKey = 'wendanduibiqi'

var cacheList = [
  '/',
  "index.html",
  "main.js",
  "diff.js",
  "cssChange.js",
  "style.css",
  "icon.png"
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheStorageKey)
      .then(cache => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
  )
})