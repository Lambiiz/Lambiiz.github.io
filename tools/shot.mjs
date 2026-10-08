// Screenshot helper: node tools/shot.mjs <url-path> <out.png> [w] [h] [waitMs]
import { chromium } from 'playwright';
const [,, p, out, w = 1600, h = 900, wait = 500] = process.argv;
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
page.on('console', (m) => console.log('[console]', m.type(), m.text()));
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto('http://localhost:5173/' + p);
await page.waitForFunction(() => window.__ready === true, null, { timeout: 180000 });
await page.waitForTimeout(+wait);
await page.screenshot({ path: out });
await browser.close();
