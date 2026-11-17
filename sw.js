/* Raphaels Kochbuch – Offline-Speicher. Bei jedem Update die Versionsnummer erhöhen. */
const VERSION='kochbuch-2026-11-17-1';
const ASSETS=['./','./index.html','./funktionen.js','./rezepte.enc.json','./jspdf.umd.min.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('message',e=>{if(e.data==='skip') self.skipWaiting();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):Response.error())));
});
