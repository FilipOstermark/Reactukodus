if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let l={};const c=e=>i(e,r),d={module:{uri:r},exports:l,require:c};s[r]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(o(...e),l)))}}define(["./workbox-27b29e6f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/edit-box-icon-eee3eada.svg",revision:null},{url:"assets/highscore-icon-50ab580d.svg",revision:null},{url:"assets/index-96171252.js",revision:null},{url:"assets/index-a23644d2.css",revision:null},{url:"assets/undo-icon-a3946b2f.svg",revision:null},{url:"index.html",revision:"4455a235c9807cf8661afc5621a7934e"},{url:"logo128.png",revision:"01e57cabcf29efb651d0e2523d0bfca2"},{url:"logo256.png",revision:"d21bb6c980df52cd22796e07487f89a1"},{url:"logo512.png",revision:"171dc18bf7cb371b9ba18c81d29b338e"},{url:"manifest.webmanifest",revision:"18d2fd1c9e444b0fdc28c0277ff028ed"},{url:"registerSW.js",revision:"972aeb64f319be96dfa35ce76dae8957"},{url:"logo128.png",revision:"01e57cabcf29efb651d0e2523d0bfca2"},{url:"logo256.png",revision:"d21bb6c980df52cd22796e07487f89a1"},{url:"logo512.png",revision:"171dc18bf7cb371b9ba18c81d29b338e"},{url:"manifest.webmanifest",revision:"18d2fd1c9e444b0fdc28c0277ff028ed"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
