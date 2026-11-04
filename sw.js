// Service worker do Explorador UESC v1.8: guarda o app no aparelho para abrir sem internet.
// Ao publicar uma nova versão, troque o número em CACHE para os aparelhos atualizarem.
var CACHE='uesc-v1.8';
var ARQUIVOS=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ARQUIVOS)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request).then(function(res){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp)});return res}).catch(function(){return caches.match('index.html')})}))});
