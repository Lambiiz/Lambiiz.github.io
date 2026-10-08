// node tools/zoom.mjs out.png "script" x y w h [scale] [width] [height]
import { chromium } from 'playwright';
const [out, script, x, y, w, h, scale = '2', vw = '1280', vh = '720', wait = '1500'] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: +vw, height: +vh }, deviceScaleFactor: +scale });
const logs = [];
p.on('console', (m) => { if (m.type() !== 'debug') logs.push(`[${m.type()}] ${m.text()}`); });
p.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await p.goto('http://127.0.0.1:5173/');
await p.waitForFunction(() => !!window.__PALIMPSEST__, null, { timeout: 60000 });
const r = await p.evaluate(script);
if (r !== undefined) console.log('result:', typeof r === 'string' ? r : JSON.stringify(r));
await p.waitForTimeout(+wait);
await p.screenshot({ path: out, clip: { x: +x, y: +y, width: +w, height: +h }, timeout: 180000 });
console.log(logs.join('\n'));
await b.close();
