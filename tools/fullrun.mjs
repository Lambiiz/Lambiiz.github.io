// Plays one entire run with ordinary inputs only: real button clicks and real canvas drags/clicks,
// no fast-forward, no fixtures. Reading the snapshot is used only to decide what a player would
// choose and to log evidence. Usage: node tools/fullrun.mjs [baseUrl] [quality] [seed]
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:5173/';
const QUALITY = process.argv[3] ?? 'low';
const SEED = process.argv[4] && process.argv[4] !== '-' ? Number(process.argv[4]) : null;
const [VW, VH] = (process.argv[5] ?? '1280x720').split('x').map(Number);
fs.mkdirSync('docs/screenshots', { recursive: true });
const log = { startedAt: new Date().toISOString(), quality: QUALITY, viewport: process.argv[5] ?? '1280x720', trials: [], console: [] };

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: VW, height: VH } });
page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && log.console.push(m.text()));
page.on('pageerror', (e) => log.console.push(`pageerror ${e.message}`));
await page.goto(`${BASE}?dev`);
await page.waitForFunction(() => !!window.__PALIMPSEST__, null, { timeout: 60000 });
if (QUALITY === 'low') await page.keyboard.press('q'); // quality hotkey (HUD is hidden on the title screen)
if (SEED !== null) await page.evaluate((s) => __PALIMPSEST__.restart(s), SEED); // optional replayable seed (still normal pacing)
else await page.click('#btn-start');

const snap = () => page.evaluate(() => __PALIMPSEST__.snapshot());
const WEAPONS = ['needle', 'light', 'thread', 'bell'];
const t0 = Date.now();
log.seed = (await snap()).seed;
console.log(JSON.stringify({ seed: log.seed }));
async function bail(e) {
  console.log('ERROR', String(e));
  log.error = String(e);
  log.errorSnapshot = await snap().catch(() => null);
  await page.screenshot({ path: 'tools/out/fullrun-error.png' }).catch(() => {});
  fs.writeFileSync('tools/out/fullrun-report.json', JSON.stringify(log, null, 2));
  process.exit(1);
}
process.on('unhandledRejection', bail);
process.on('uncaughtException', bail);

async function drag(from, to) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) await page.mouse.move(from.x + ((to.x - from.x) * i) / 12, from.y + ((to.y - from.y) * i) / 12);
  await page.mouse.up();
}

let draftNo = 0;
for (;;) {
  await page.waitForFunction(() => ['DRAFT', 'DEFEAT', 'VICTORY'].includes(__PALIMPSEST__.snapshot().phase), null, { timeout: 3_600_000, polling: 500 });
  const s = await snap();
  if (s.phase !== 'DRAFT') break;
  draftNo++;
  // let the cards rise naturally (presentation time, no settle helper): wait until they stop moving
  await page.waitForFunction(() => __PALIMPSEST__.offersSettled(), null, { timeout: 120000, polling: 500 });
  const owned = new Set(s.slots.filter(Boolean).map((w) => w.defId));
  const offer = s.draft.offer;
  let pick = offer.findIndex((id) => WEAPONS.includes(id) && !owned.has(id));
  if (pick < 0 && s.hp < 70) pick = offer.indexOf('mend');
  if (pick < 0) pick = offer.indexOf('polish');
  if (pick < 0) pick = offer.findIndex((id) => id === 'light' || id === 'thread');
  if (pick < 0) pick = offer.findIndex((id) => WEAPONS.includes(id));
  const id = offer[pick];
  const from = await page.evaluate((i) => __PALIMPSEST__.offerScreen(i), pick);
  let action = '';
  if (!WEAPONS.includes(id)) {
    await page.mouse.click(from.x, from.y);
    await page.waitForSelector('#btn-use:not(.hidden)', { timeout: 30000 });
    await page.click('#btn-use');
    action = `used ${id}`;
  } else {
    const empty = s.slots.findIndex((w) => !w);
    if (empty >= 0) {
      const to = await page.evaluate((k) => __PALIMPSEST__.socketScreen(k), empty);
      if (draftNo % 2 === 0) {
        await page.mouse.click(from.x, from.y); // click-select …
        await page.waitForTimeout(400);
        await page.mouse.click(to.x, to.y); // … then click the socket
        action = `click-placed ${id} in socket ${empty + 1}`;
      } else {
        await drag(from, to);
        action = `dragged ${id} into socket ${empty + 1}`;
      }
    } else {
      // replace the most redundant weapon
      const counts = {};
      for (const w of s.slots) counts[w.defId] = (counts[w.defId] ?? 0) + 1;
      let victim = 0;
      let best = -1;
      s.slots.forEach((w, k) => {
        const score = counts[w.defId] * 10 + (w.defId === 'needle' ? 5 : 0);
        if (score > best) {
          best = score;
          victim = k;
        }
      });
      await drag(from, await page.evaluate((k) => __PALIMPSEST__.socketScreen(k), victim));
      await page.waitForSelector('#btn-replace:not(.hidden)', { timeout: 30000 });
      await page.click('#btn-replace');
      action = `replaced socket ${victim + 1} (${s.slots[victim].defId}) with ${id}`;
    }
  }
  await page.waitForFunction(() => !document.getElementById('btn-continue').disabled, null, { timeout: 60000 });
  await page.click('#btn-continue');
  await page.waitForFunction(() => __PALIMPSEST__.snapshot().phase === 'COMBAT', null, { timeout: 60000 });
  const after = await snap();
  const perf = await page.evaluate(() => __PALIMPSEST__.perf());
  const entry = { trial: s.trialIndex + 1, hpAtBoundary: s.hp, simRate: perf.simSecondsPerWallSecond, kills: s.kills, survivorsCarried: s.enemies.length, offer, action, build: after.slots.map((w) => w && w.defId), wallSeconds: Math.round((Date.now() - t0) / 1000) };
  log.trials.push(entry);
  console.log(JSON.stringify(entry));
  if (draftNo === 2) await page.screenshot({ path: 'docs/screenshots/16-fullrun-after-two-drafts.png' });
}
const end = await snap();
log.outcome = end.phase;
log.final = { trial: end.trialIndex + 1, hp: end.hp, kills: end.kills, arrivals: end.arrivals, simTime: end.simTime, build: end.slots.map((w) => w && w.defId) };
log.wallSeconds = Math.round((Date.now() - t0) / 1000);
log.perf = await page.evaluate(() => __PALIMPSEST__.perf());
await page.waitForTimeout(4000);
await page.screenshot({ path: `docs/screenshots/17-fullrun-${end.phase.toLowerCase()}.png` });
// restart from the ending through the real button
await page.click('#btn-end-restart');
await page.waitForFunction(() => __PALIMPSEST__.snapshot().phase === 'COMBAT', null, { timeout: 60000 });
const fresh = await snap();
log.restartOk = fresh.trialIndex === 0 && fresh.hp === 100 && fresh.slots.filter(Boolean).length === 1;
log.finishedAt = new Date().toISOString();
fs.writeFileSync('tools/out/fullrun-report.json', JSON.stringify(log, null, 2));
console.log(JSON.stringify({ outcome: log.outcome, final: log.final, wallSeconds: log.wallSeconds, restartOk: log.restartOk, consoleErrors: log.console.length }));
await browser.close();
