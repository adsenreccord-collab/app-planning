const C='agenda-v1',A=['./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;
const keep=n=>{if(n.ok&&(new URL(r.url).origin==location.origin||r.url.includes('cdnjs.cloudflare.com'))){const c=n.clone();caches.open(C).then(x=>x.put(r,c))}return n};
if(r.mode=='navigate'){e.respondWith(fetch(r).then(keep).catch(()=>caches.match('./index.html')));return}
e.respondWith(caches.match(r).then(m=>m||fetch(r).then(keep)))});
