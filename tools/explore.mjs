// Drives the game through exploration and dialogue, capturing screenshots.
import { chromium } from 'playwright';
const OUT = process.argv[2] || '/tmp/claude-0/shots';
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log('[console]', m.type(), m.text()); });
page.on('pageerror', (e) => { errors.push(e.message); console.log('[pageerror]', e.message); });
await page.goto('http://localhost:5173/');
await page.waitForFunction(() => window.__ready === true, null, { timeout: 240000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/e01-title.png` });
await page.keyboard.press('Enter');
await page.waitForFunction(() => window.__game.state === 'explore', null, { timeout: 30000 });
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/e02-explore-start.png` });
const pos = () => page.evaluate(() => { const p = window.__game.player.root.position; return [p.x.toFixed(2), p.z.toFixed(2), window.__game.fpsAvg.toFixed(1)]; });
console.log('start', await pos());
await page.keyboard.down('KeyW');
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/e03-running.png` });
await page.keyboard.up('KeyW');
console.log('after run', await pos());
// collision test: push into the door wall
await page.keyboard.down('KeyA');
await page.waitForTimeout(2500);
await page.keyboard.up('KeyA');
console.log('after left push (x should be >= -2.4)', await pos());
await page.screenshot({ path: `${OUT}/e04-wall.png` });
// teleport near student for interaction test
await page.evaluate(() => { const g = window.__game; g.player.root.position.set(1.0, 0, 17.3); g.follow.snap(g.player); });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/e05-near.png` });
const promptVisible = await page.evaluate(() => !document.querySelector('.prompt').classList.contains('hidden'));
console.log('prompt visible', promptVisible);
await page.keyboard.press('KeyE');
await page.waitForFunction(() => window.__game.state === 'dialogue', null, { timeout: 10000 });
for (let i = 0; i < 11; i++) {
  await page.waitForTimeout(i === 0 ? 2500 : 1200);
  await page.keyboard.press('Enter'); // finish typing
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/e1${String(i).padStart(2, '0')}-dlg.png` });
  await page.keyboard.press('Enter'); // next line
}
await page.waitForTimeout(1500);
console.log('state', await page.evaluate(() => window.__game.state));
console.log('errors', errors.length);
await browser.close();
