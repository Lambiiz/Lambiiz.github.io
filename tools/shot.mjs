// Ad-hoc screenshot helper: node tools/shot.mjs <url> <out.png> [width] [height] [script]
// `script` is a JS snippet evaluated in the page (with __PALIMPSEST__ available) before capture.
import { chromium } from 'playwright';

const [url = 'http://127.0.0.1:5173/', out = 'tools/out/shot.png', w = '1280', h = '720', script = '', wait = '1500'] = process.argv.slice(2);
const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await page.goto(url);
await page.waitForFunction(() => !!window.__PALIMPSEST__, null, { timeout: 30000 });
if (script) {
  const r = await page.evaluate(script);
  if (r !== undefined) console.log('result:', JSON.stringify(r));
}
await page.waitForTimeout(+wait);
await page.screenshot({ path: out, timeout: 180000 });
console.log(logs.slice(0, 40).join('\n'));
await browser.close();
