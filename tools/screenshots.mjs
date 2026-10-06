// Headless screenshots of the running dev server: `node tools/screenshots.mjs <url-path> <out.png> [waitMs] [w] [h]`.
// Needs `npm run dev` running. Uses the preinstalled Chromium (PLAYWRIGHT_BROWSERS_PATH) when present.
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const [, , path = '/', out = 'shots/shot.png', wait = '4000', w = '1280', h = '720', actions = ''] = process.argv;
const exe = ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', process.env.CHROME_PATH].find((p) => p && fs.existsSync(p));
const browser = await chromium.launch({
  executablePath: exe,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
await page.goto(`${process.env.BASE ?? 'http://127.0.0.1:5173'}${path}`);
await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 }).catch(() => logs.push('[timeout] __ready'));
// optional scripted actions, |-separated: "key:KeyW:1500|wait:500|eval:window.__game.x()"
for (const a of actions.split('|').filter(Boolean)) {
  const [kind, arg, ms] = a.split(':');
  if (kind === 'key') { await page.keyboard.down(arg); await page.waitForTimeout(Number(ms ?? 300)); await page.keyboard.up(arg); }
  else if (kind === 'press') await page.keyboard.press(arg);
  else if (kind === 'wait') await page.waitForTimeout(Number(arg));
  else if (kind === 'eval') await page.evaluate(a.slice(5));
}
await page.waitForTimeout(Number(wait));
fs.mkdirSync(out.split('/').slice(0, -1).join('/') || '.', { recursive: true });
await page.screenshot({ path: out });
console.log(logs.slice(-30).join('\n'));
await browser.close();
