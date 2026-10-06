// Headless screenshots of the dev server: `node tools/screenshot.mjs <url-path> <out.png> [waitMs] [w] [h] [actions]`.
// Needs `npm run dev` running. actions: |-separated "key:KeyW:800", "press:Space", "click:#id", "wait:500", "eval:js".
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const [, , path = '/', out = 'shots/shot.png', wait = '500', w = '1280', h = '800', actions = ''] = process.argv;
const exe = ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', process.env.CHROME_PATH].find((p) => p && fs.existsSync(p));
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await page.goto(`${process.env.BASE ?? 'http://127.0.0.1:5174'}${path}`);
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 }).catch(() => logs.push('[timeout] __ready'));
for (const a of actions.split('|').filter(Boolean)) {
  const [kind, arg, ms] = a.split(':');
  if (kind === 'key') { await page.keyboard.down(arg); await page.waitForTimeout(Number(ms ?? 300)); await page.keyboard.up(arg); }
  else if (kind === 'press') await page.keyboard.press(arg);
  else if (kind === 'click') await page.click(arg);
  else if (kind === 'wait') await page.waitForTimeout(Number(arg));
  else if (kind === 'eval') await page.evaluate(a.slice(5));
}
await page.waitForTimeout(Number(wait));
fs.mkdirSync(out.split('/').slice(0, -1).join('/') || '.', { recursive: true });
await page.screenshot({ path: out, fullPage: process.env.FULL === '1' });
console.log(logs.slice(-30).join('\n'));
await browser.close();
