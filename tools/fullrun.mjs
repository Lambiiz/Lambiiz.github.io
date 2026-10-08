// Plays one entire run with ordinary inputs only: real canvas drags/clicks/right-clicks and DOM
// buttons, no fast-forward, no fixtures. The logical snapshot is read only to decide what a player
// would do and to log evidence. Usage: node tools/fullrun.mjs [baseUrl] [quality] [seed|-] [WxH]
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:5173/';
const QUALITY = process.argv[3] ?? 'low';
const SEED = process.argv[4] && process.argv[4] !== '-' ? Number(process.argv[4]) : null;
const [VW, VH] = (process.argv[5] ?? '1280x720').split('x').map(Number);
fs.mkdirSync('docs/screenshots', { recursive: true });
const log = { startedAt: new Date().toISOString(), quality: QUALITY, viewport: `${VW}x${VH}`, turns: [], console: [] };

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: VW, height: VH } });
page.setDefaultTimeout(120000);
page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && log.console.push(m.text()));
page.on('pageerror', (e) => log.console.push(`pageerror ${e.message}`));
await page.goto(`${BASE}?dev${SEED !== null ? `&seed=${SEED}` : ''}`);
await page.waitForFunction(() => !!window.__PALIMPSEST__, null, { timeout: 60000 });
if (QUALITY === 'low') await page.keyboard.press('q');
await page.click('#btn-start');

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

async function raise() {
  await page.mouse.move(VW / 2, VH - 10);
  await page.waitForFunction(() => __PALIMPSEST__.handSettled(), null, { timeout: 120000, polling: 400 });
}
async function cardAt(uid) {
  await raise();
  return page.evaluate((u) => __PALIMPSEST__.handCardScreen(u), uid);
}
async function settleTo(slot) {
  await page.waitForFunction((k) => !!__PALIMPSEST__.snapshot().slots[k], slot, { timeout: 5000, polling: 200 }).catch(() => {});
}
async function drag(from, to) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) await page.mouse.move(from.x + ((to.x - from.x) * i) / 12, from.y + ((to.y - from.y) * i) / 12);
  await page.mouse.up();
}

for (;;) {
  await page.waitForFunction(() => ['TURN', 'DEFEAT', 'VICTORY'].includes(__PALIMPSEST__.snapshot().phase), null, { timeout: 7_200_000, polling: 500 });
  let s = await snap();
  if (s.phase !== 'TURN') break;
  const actions = [];
  const open = () => s.locked.map((l, i) => (!l && !s.slots[i] ? i : -1)).filter((i) => i >= 0);
  // 1. towers into open sockets (drag)
  for (const c of s.hand.filter((x) => WEAPONS.includes(x.defId))) {
    s = await snap();
    const free = open();
    if (!free.length || s.turn.energy < 3) break;
    await drag(await cardAt(c.uid), await page.evaluate((k) => __PALIMPSEST__.socketScreen(k), free[0]));
    await settleTo(free[0]);
    actions.push(`${(await snap()).slots[free[0]] ? 'placed' : 'FAILED to place'} ${c.defId} in socket ${free[0] + 1}`);
  }
  // 2. hunting a second tower: sacrifice two spare spells while a socket is still open
  s = await snap();
  const spare = s.hand.filter((x) => !WEAPONS.includes(x.defId));
  if (open().length && spare.length >= 2) {
    for (const c of spare.slice(0, 2)) {
      const p = await cardAt(c.uid);
      await page.mouse.click(p.x, p.y, { button: 'right' });
    }
    await page.waitForSelector('#btn-sacrifice:not(.hidden)', { timeout: 60000 });
    await page.click('#btn-sacrifice');
    await page.waitForFunction(() => __PALIMPSEST__.snapshot().turn?.stage === 'sacrificeChoice', null, { timeout: 60000 });
    await page.waitForFunction(() => __PALIMPSEST__.handSettled(), null, { timeout: 120000, polling: 400 });
    const offers = (await snap()).turn.offers;
    const pick = Math.max(0, offers.findIndex((id) => WEAPONS.includes(id) && id !== 'needle'));
    const op = await page.evaluate((i) => __PALIMPSEST__.offerScreen(i), pick);
    await page.mouse.click(op.x, op.y);
    actions.push(`sacrificed ${spare[0].defId}+${spare[1].defId} → ${offers[pick]}`);
    s = await snap();
    const got = s.hand.find((x) => x.defId === offers[pick] && WEAPONS.includes(x.defId));
    const free = open();
    if (got && free.length && s.turn.energy >= 3) {
      await drag(await cardAt(got.uid), await page.evaluate((k) => __PALIMPSEST__.socketScreen(k), free[0]));
      await settleTo(free[0]);
      actions.push(`${(await snap()).slots[free[0]] ? 'placed' : 'FAILED to place'} ${got.defId} in socket ${free[0] + 1}`);
    }
  }
  // 3. spend remaining energy on spells (click; Quicken then click a tower)
  for (;;) {
    s = await snap();
    const c = s.hand.find((x) => !WEAPONS.includes(x.defId) && !(x.defId === 'mend' && s.hp > 92) && !(x.defId === 'quicken' && !s.slots.some(Boolean)));
    if (!c || s.turn.energy < 1) break;
    const p = await cardAt(c.uid);
    await page.mouse.click(p.x, p.y);
    if (c.defId === 'quicken') {
      const slot = s.slots.findIndex(Boolean);
      const sp = await page.evaluate((k) => __PALIMPSEST__.socketScreen(k), slot);
      await page.mouse.click(sp.x, sp.y);
    }
    actions.push(`played ${c.defId}`);
    await page.waitForFunction((u) => !__PALIMPSEST__.snapshot().hand.some((x) => x.uid === u), c.uid, { timeout: 60000 });
  }
  s = await snap();
  const entry = { turn: s.turn.turnIndex, hp: s.hp, energyLeft: s.turn.energy, deck: s.deckSize, foesFrozen: s.enemies.length, actions, towers: s.slots.map((w) => w && w.defId), wallSeconds: Math.round((Date.now() - t0) / 1000) };
  log.turns.push(entry);
  console.log(JSON.stringify(entry));
  if (s.turn.turnIndex === 2) {
    await raise();
    await page.screenshot({ path: 'docs/screenshots/14-fullrun-turn3.png', timeout: 180000 });
  }
  await page.click('#btn-end-turn');
  await page.waitForFunction(() => __PALIMPSEST__.snapshot().phase !== 'TURN', null, { timeout: 60000 });
  if (s.turn.turnIndex === 4) {
    await page.waitForFunction(() => __PALIMPSEST__.snapshot().trialTime > 20, null, { timeout: 3_600_000, polling: 500 });
    await page.screenshot({ path: 'docs/screenshots/15-fullrun-wave5-swarm.png', timeout: 180000 });
  }
}
const end = await snap();
log.outcome = end.phase;
log.final = { wave: end.trialIndex + 1, hp: end.hp, kills: end.kills, arrivals: end.arrivals, simTime: end.simTime, towers: end.slots.map((w) => w && w.defId) };
log.wallSeconds = Math.round((Date.now() - t0) / 1000);
log.perf = await page.evaluate(() => __PALIMPSEST__.perf());
await page.waitForTimeout(3000);
await page.screenshot({ path: `docs/screenshots/16-fullrun-${end.phase.toLowerCase()}.png`, timeout: 180000 });
await page.click('#btn-end-restart');
await page.waitForFunction(() => __PALIMPSEST__.snapshot().phase === 'TURN', null, { timeout: 60000 });
const fresh = await snap();
log.restartOk = fresh.trialIndex === 0 && fresh.hp === 100 && fresh.deckSize === 10 && fresh.slots.every((w) => !w);
log.finishedAt = new Date().toISOString();
fs.writeFileSync('tools/out/fullrun-report.json', JSON.stringify(log, null, 2));
console.log(JSON.stringify({ outcome: log.outcome, final: log.final, wallSeconds: log.wallSeconds, restartOk: log.restartOk, consoleErrors: log.console.length }));
await browser.close();
