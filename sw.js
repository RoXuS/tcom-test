if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const c={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return c;default:return e(r)}})).then(e=>{const r=n(...e);return s.default||(s.default=r),s})}))}}define("./sw.js",["./workbox-80efdfd1"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"474b5079.js",revision:"ff278f66973b7aaa682daf2b1bc04584"},{url:"6079ff76.js",revision:"480d02484c671d76d361eb4de54bc247"},{url:"ad71fd6d.js",revision:"922cd7b6fff4bacbae8f02845104dd9d"},{url:"d64817af.js",revision:"8f743ce996f551e84b782de45c753710"},{url:"f4eb92a5.js",revision:"cc4dfc8b418f99bd88cc99676808cbf6"},{url:"index.html",revision:"ca42ccf536fe2bd1d7713663a5e25674"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"))),e.registerRoute("polyfills/*.js",new e.CacheFirst,"GET")}));
//# sourceMappingURL=sw.js.map
