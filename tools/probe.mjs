import { chromium } from 'playwright';
const b = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
for (const [w,h] of [[1280,720],[960,540]]) {
const p = await b.newPage({ viewport: { width: w, height: h } });
await p.goto('http://127.0.0.1:5173/');
await p.waitForFunction(() => !!window.__PALIMPSEST__, null, { timeout: 60000 });
await p.evaluate(() => { __PALIMPSEST__.setQuality('low'); __PALIMPSEST__.start(3); });
await p.waitForTimeout(20000);
console.log(w, h, JSON.stringify(await p.evaluate(() => __PALIMPSEST__.perf())));
await p.close();
}
await b.close();
