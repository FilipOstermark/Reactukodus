if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(i[f])return;let t={};const o=e=>s(e,f),d={module:{uri:f},exports:t,require:o};i[f]=Promise.all(n.map((e=>d[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"37449.png",revision:"12573d094e48134a8fee031d22c679be"},{url:"assets/index-050b0b0b.js",revision:null},{url:"assets/index-26346945.css",revision:null},{url:"index.html",revision:"269d918ba6942590e3bebc970adee2f6"},{url:"manifest.webmanifest",revision:"a5b94dcf84222b38fffb096fe47ac79f"},{url:"registerSW.js",revision:"d813e6aaaa37aefc883f1def4195cd32"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"37449.png",revision:"12573d094e48134a8fee031d22c679be"},{url:"manifest.webmanifest",revision:"a5b94dcf84222b38fffb096fe47ac79f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
