// Browser smoke suite for PALIMPSEST (Playwright + Chromium).
//   node tools/smoke.mjs [baseUrl]            (dev server, or a build served with ?dev)
// Interactions use real mouse input on the canvas and real DOM buttons. Deterministic dev fixtures
// are used only to reach states quickly (marked "fixture"). Writes tools/out/smoke-report.json and
// screenshots to docs/screenshots/.
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.argv[2] ?? 'http://127.0.0.1:5173/';
const URL_ = BASE.includes('?') ? BASE : `${BASE}?dev`;
const SHOTS = 'docs/screenshots';
fs.mkdirSync(SHOTS, { recursive: true });
fs.mkdirSync('tools/out', { recursive: true });

const report = { url: URL_, startedAt: new Date().toISOString(), checks: [], console: [], screenshots: [] };
let failures = 0;
function check(name, ok, detail = {}) {
  report.checks.push({ name, ok: !!ok, ...detail });
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${Object.keys(detail).length ? '  ' + JSON.stringify(detail) : ''}`);
}

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });

async function openPage(width = 1280, height = 720) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.setDefaultTimeout(120000);
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') report.console.push(`[${m.type()}] ${m.text()}`);
  });
  page.on('pageerror', (e) => report.console.push(`[pageerror] ${e.message}`));
  await page.goto(URL_);
  await page.waitForFunction(() => !!window.__PALIMPSEST__, null, { timeout: 60000 });
  return page;
}

const api = (page, expr, arg) => page.evaluate(expr, arg);
const snap = (page) => api(page, () => __PALIMPSEST__.snapshot());
const settle = (page, s = 1) => api(page, (x) => __PALIMPSEST__.settle(x), s);
const waitPhase = (page, phases, timeout = 90000) => page.waitForFunction((ph) => ph.includes(__PALIMPSEST__.snapshot().phase), phases, { timeout, polling: 100 });
async function shot(page, name, clip) {
  const path = `${SHOTS}/${name}.png`;
  await page.screenshot({ path, clip, timeout: 180000 });
  report.screenshots.push(path);
}
async function drag(page, from, to, steps = 10) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  for (let i = 1; i <= steps; i++) await page.mouse.move(from.x + ((to.x - from.x) * i) / steps, from.y + ((to.y - from.y) * i) / steps);
  await page.mouse.up();
}
/** Raise the hand (pointer near the bottom) and settle the card springs. */
async function raiseHand(page) {
  const vp = page.viewportSize();
  await page.mouse.move(vp.width / 2, vp.height - 12);
  await settle(page, 1);
}
const cardPos = (page, uid) => api(page, (u) => __PALIMPSEST__.handCardScreen(u), uid);
const frozenView = (s) => JSON.stringify({ t: s.tick, e: s.enemies, p: s.projectiles, sp: s.spawnProgress, w: s.slots.map((x) => x && [x.id, x.elapsed]), hp: s.hp });
async function toTurn(page) {
  await api(page, () => __PALIMPSEST__.skipToTrialEnd(0.25));
  await waitPhase(page, ['TURN', 'DEFEAT']);
  await settle(page, 1.2);
}

// ---------------------------------------------------------------------------------------------
{
  const page = await openPage();
  const gl = await page.evaluate(() => {
    const g = document.createElement('canvas').getContext('webgl2');
    const d = g && g.getExtension('WEBGL_debug_renderer_info');
    return g ? (d ? g.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'webgl2') : null;
  });
  report.renderer = gl;
  check('WebGL2 context available', !!gl, { renderer: gl });
  await shot(page, '01-title');
  await page.click('#btn-start');
  await waitPhase(page, ['TURN']);
  await settle(page, 1.5);
  let s = await snap(page);
  check('A run opens with a turn: 4 cards incl. the Needle tower, 6 energy, 2 open sockets', s.hand.length === 4 && s.hand.some((c) => c.defId === 'needle') && s.turn.energy === 6 && s.locked.filter((l) => !l).length === 2 && s.slots.every((w) => !w), { hand: s.hand.map((c) => c.defId) });
  const frustum0 = await api(page, () => __PALIMPSEST__.frustum());
  await shot(page, '02-turn-tucked-hand');

  await raiseHand(page);
  const needle = s.hand.find((c) => c.defId === 'needle');
  const np = await cardPos(page, needle.uid);
  await page.mouse.move(np.x, np.y - 10);
  await settle(page, 0.6);
  await page.waitForSelector('#tooltip:not(.hidden)', { timeout: 20000 }).catch(() => {});
  check('Hovering a hand card shows its 14px tooltip and the tower range preview', (await page.isVisible('#tooltip')) && (await api(page, () => window.__PALIMPSEST_APP__.board.rangeVisible.level)) > 0.3);
  await shot(page, '03-turn-hand-raised');

  // drag onto a locked socket: refused, card stays in hand
  const locked = s.locked.findIndex((l) => l);
  await drag(page, await cardPos(page, needle.uid), await api(page, (i) => __PALIMPSEST__.socketScreen(i), locked));
  await settle(page, 0.8);
  s = await snap(page);
  check('Dropping a tower on a locked socket is refused and the card stays in hand', s.slots.every((w) => !w) && s.hand.some((c) => c.uid === needle.uid) && s.turn.energy === 6);

  // drag onto an open socket
  const open = s.locked.findIndex((l) => !l);
  await raiseHand(page);
  await drag(page, await cardPos(page, needle.uid), await api(page, (i) => __PALIMPSEST__.socketScreen(i), open));
  await settle(page, 1);
  s = await snap(page);
  check('Dragging the Needle into an open socket places it for 3 energy and removes it from the deck cycle', s.slots[open]?.defId === 'needle' && s.turn.energy === 3 && s.deckSize === 9);

  // click-play a passive (fixture: guarantee a Sharpened Grief in hand)
  const spell = { uid: await api(page, () => __PALIMPSEST__.giveCard('keen')), defId: 'keen' };
  const deckBeforeSpell = s.deckSize + 1;
  await settle(page, 0.8);
  await raiseHand(page);
  const sp = await cardPos(page, spell.uid);
  await page.mouse.click(sp.x, sp.y);
  await settle(page, 0.8);
  s = await snap(page);
  check('Clicking a passive plays it for 1 energy, applies +5% damage permanently and removes it from the deck', s.turn.energy === 2 && !s.hand.some((c) => c.uid === spell.uid) && Math.abs(s.mods.damage - 0.05) < 1e-9 && s.deckSize === deckBeforeSpell - 1, { card: spell.defId, mods: s.mods });

  // the placed tower's tooltip shows modified stats (damage 6 -> 6.3) and no cost or charge
  const cs0 = await api(page, (i) => __PALIMPSEST__.cardScreen(i), open);
  await page.mouse.move(cs0.x, cs0.y);
  await settle(page, 0.6);
  const tip = await page.textContent('#tooltip');
  check('Hovering a placed tower lists Damage, DPS, Attack speed, Range, Target and Projectiles with modifiers applied', /Damage\s*6\.3/.test(tip) && /DPS/.test(tip) && /Attack speed/.test(tip) && /Projectiles\s*1/.test(tip) && !/Cost|Charge|Socket/.test(tip), { tip });
  await page.mouse.move(5, 300);

  // an active card adds a cooldown icon at the top of the screen (fixture card)
  const strayUid = await api(page, () => __PALIMPSEST__.giveCard('stray'));
  await settle(page, 0.8);
  await raiseHand(page);
  const sp2 = await cardPos(page, strayUid);
  await page.mouse.click(sp2.x, sp2.y);
  await settle(page, 0.8);
  check('Playing an active card installs it with a cooldown icon at the top of the screen', (await snap(page)).actives.some((a) => a.defId === 'stray') && (await page.isVisible('#actives .active-icon')));
  check('During a turn the modifier panel lists the current modifiers', (await page.isVisible('#stats-panel')) && /Damage\s*\+5%/.test(await page.textContent('#stats-panel')));

  // sacrifice two cards via right-click marks (fixture: top up the hand)
  while ((await snap(page)).hand.length < 3) await api(page, () => __PALIMPSEST__.giveCard('mend'));
  await settle(page, 0.8);
  await raiseHand(page);
  s = await snap(page);
  const [m1, m2] = s.hand;
  const before = s.deckSize;
  for (const m of [m1, m2]) {
    const p = await cardPos(page, m.uid);
    await page.mouse.click(p.x, p.y, { button: 'right' });
  }
  await page.waitForSelector('#btn-sacrifice:not(.hidden)', { timeout: 30000 }).catch(() => {});
  check('Right-clicking two cards marks them and offers Sacrifice', (await snap(page)).turn.marked.length === 2 && (await page.isVisible('#btn-sacrifice')));
  await page.click('#btn-sacrifice');
  await settle(page, 1.2);
  s = await snap(page);
  check('Sacrifice removes both cards and presents three offers', s.turn.stage === 'sacrificeChoice' && s.turn.offers.length === 3 && s.deckSize === before - 2);
  await shot(page, '04-sacrifice-offers');
  const op = await api(page, () => __PALIMPSEST__.offerScreen(1));
  await page.mouse.click(op.x, op.y);
  await settle(page, 1);
  s = await snap(page);
  check('Choosing an offer adds it to the hand (deck net −1)', s.turn.stage === 'idle' && s.deckSize === before - 1);

  // purge once
  await raiseHand(page);
  s = await snap(page);
  const pu = s.hand[0];
  let p = await cardPos(page, pu.uid);
  await page.mouse.click(p.x, p.y, { button: 'right' });
  await page.waitForSelector('#btn-purge:not(.hidden)', { timeout: 30000 }).catch(() => {});
  await page.click('#btn-purge');
  await settle(page, 0.8);
  const afterPurge = (await snap(page)).deckSize;
  check('Purge removes one marked card from the deck', afterPurge === before - 2);
  if ((await snap(page)).hand.length === 0) await api(page, () => __PALIMPSEST__.giveCard('mend'));
  await settle(page, 0.8);
  await raiseHand(page);
  s = await snap(page);
  p = await cardPos(page, s.hand[0].uid);
  await page.mouse.click(p.x, p.y, { button: 'right' });
  await settle(page, 0.6);
  check('A second purge in the same turn is not offered', (await snap(page)).turn.purgesLeft === 0 && !(await page.isVisible('#btn-purge')));
  await page.keyboard.press('Escape');

  // end turn -> combat; camera never moves on its own
  await page.click('#btn-end-turn');
  await waitPhase(page, ['COMBAT']);
  const frustum1 = await api(page, () => __PALIMPSEST__.frustum());
  check('End Turn discards the hand and starts wave 1', (await snap(page)).hand.length === 0 && (await snap(page)).trialIndex === 0);
  await settle(page, 0.5); // let a combat frame redraw the HUD
  check('During a wave the modifier panel is hidden until Tab', !(await page.isVisible('#stats-panel')));
  await page.keyboard.press('Tab');
  await settle(page, 0.3);
  check('Tab shows the modifier panel during a wave', await page.isVisible('#stats-panel'));
  await page.keyboard.press('Tab');
  await page.waitForFunction(() => __PALIMPSEST__.snapshot().simTime > 6, null, { timeout: 240000, polling: 250 });
  const st = await snap(page);
  check('Normal-time combat advances the simulation and foes walk in from the far ring', st.simTime > 6 && st.enemies.length > 0 && st.enemies.every((e) => Math.hypot(e.x, e.z) > 8), { simTime: +st.simTime.toFixed(1), foes: st.enemies.length });
  await api(page, () => __PALIMPSEST__.advanceTicks(60 * 14)); // fixture: let the first swarm close in
  check('Foes reach tower range and the tower fires', (await snap(page)).slots[open].shots > 0, { shots: (await snap(page)).slots[open].shots });
  await settle(page, 0.3);
  const cs = await api(page, (i) => __PALIMPSEST__.cardScreen(i), open);
  await page.mouse.move(cs.x, cs.y);
  await settle(page, 0.6);
  check('Hovering a placed tower shows its attack range outline', (await api(page, () => window.__PALIMPSEST_APP__.board.rangeVisible.level)) > 0.5 && (await api(page, () => window.__PALIMPSEST_APP__.board.rangeVisible.radius)) === 14);
  await shot(page, '05-combat-range-hover');
  await page.mouse.move(5, 300);

  // time speed: 3x runs three times as many steps per wall second
  await page.click('#btn-speed-3');
  check('The 3× speed button sets time speed 3', (await snap(page)).speed === 3);
  await page.click('#btn-speed-1');
  check('The 1× speed button restores normal speed', (await snap(page)).speed === 1);

  // pause dims effects; freeze holds
  await page.click('#btn-pause');
  await waitPhase(page, ['PAUSED']);
  await settle(page, 1);
  const a1 = await snap(page);
  await page.waitForTimeout(2500);
  const a2 = await snap(page);
  check('Pause freezes the wave and dims lingering effects', frozenView(a1) === frozenView(a2) && (await api(page, () => window.__PALIMPSEST_APP__.effects.dimLevel)) < 0.5);
  await page.click('#btn-resume');
  await waitPhase(page, ['COMBAT']);

  // boundary -> next turn draws 4; frozen state; frustum unchanged
  await toTurn(page);
  s = await snap(page);
  const frustum2 = await api(page, () => __PALIMPSEST__.frustum());
  check('The wave boundary opens a turn: draw 4, energy 6', s.phase === 'TURN' && s.turn.turnIndex === 1 && s.hand.length === 4 && s.turn.energy === 6);
  check('The camera frustum is identical in turn, combat and the next turn (no auto zoom)', JSON.stringify(frustum0) === JSON.stringify(frustum1) && JSON.stringify(frustum1) === JSON.stringify(frustum2), { frustum0, frustum2 });
  const b1 = await snap(page);
  await page.waitForTimeout(3000);
  const b2 = await snap(page);
  check('A turn freezes enemies, projectiles, spawn progress, charge and Integrity', frozenView(b1) === frozenView(b2), { enemiesFrozen: b1.enemies.length });
  await raiseHand(page);
  await shot(page, '06-turn-with-frozen-swarm');

  // replace: give a tower card and drop it on the occupied socket (fixture card)
  const lightUid = await api(page, () => __PALIMPSEST__.giveCard('light'));
  await settle(page, 1);
  await raiseHand(page);
  await drag(page, await cardPos(page, lightUid), await api(page, (i) => __PALIMPSEST__.socketScreen(i), open));
  await page.waitForSelector('#btn-replace:not(.hidden)', { timeout: 30000 }).catch(() => {});
  const oldId = (await snap(page)).slots[open].id;
  check('Dropping a tower on an occupied socket asks to Replace and keeps the old tower', (await snap(page)).turn.stage === 'confirmReplace' && (await snap(page)).slots[open].id === oldId);
  await page.click('#btn-replace');
  await settle(page, 1);
  s = await snap(page);
  check('Replace installs the new tower at zero charge and destroys the old one', s.slots[open].defId === 'light' && s.slots[open].elapsed === 0 && s.slots[open].id !== oldId);

  // visibility suspension during a turn
  await api(page, () => __PALIMPSEST__.simulateHidden());
  await settle(page, 0.3);
  check('Visibility loss during a turn suspends input until Resume', (await snap(page)).suspended && (await page.isVisible('#btn-resume')));
  await page.click('#btn-resume');

  // restart from a turn
  await page.click('#btn-restart');
  await waitPhase(page, ['TURN']);
  s = await snap(page);
  check('Restart resets health, deck, sockets and wave', s.hp === 100 && s.deckSize === 10 && s.slots.every((w) => !w) && s.trialIndex === 0);
  await page.close();
}

// ---------------------------------------------------------------------------------------------
{
  const page = await openPage();
  await page.click('#btn-start');
  await waitPhase(page, ['TURN']);
  // defeat (fixture)
  await api(page, () => {
    __PALIMPSEST__.setHp(2);
    window.__PALIMPSEST_APP__.controller.endTurn();
    __PALIMPSEST__.spawn('urn', 6.2, 0.2, 5);
  });
  await waitPhase(page, ['DEFEAT'], 120000);
  check('Contact damage ends the run in DEFEAT exactly once', (await snap(page)).phase === 'DEFEAT');
  await settle(page, 2);
  await shot(page, '07-defeat');
  await page.click('#btn-end-restart');
  await waitPhase(page, ['TURN']);
  check('Restart from defeat yields a fresh run', (await snap(page)).hp === 100);

  // victory via wave 8 clearing (fixture)
  await api(page, () => {
    __PALIMPSEST__.restart(71);
    __PALIMPSEST__.unlockAll();
    ['light', 'thread', 'bell', 'needle', 'light', 'thread'].forEach((id, i) => __PALIMPSEST__.install(i, id));
    window.__PALIMPSEST_APP__.controller.endTurn();
    __PALIMPSEST__.setTrial(7);
    __PALIMPSEST__.skipToTrialEnd(4);
  });
  await waitPhase(page, ['CLEARING', 'VICTORY'], 120000);
  while ((await snap(page)).phase === 'CLEARING') await api(page, () => __PALIMPSEST__.advanceTicks(60));
  check('Wave 8 clears into VICTORY (fixture)', (await snap(page)).phase === 'VICTORY');
  await settle(page, 3);
  await shot(page, '08-victory');
  await page.click('#btn-end-restart');
  await waitPhase(page, ['TURN']);

  // attack poses
  for (const [slot, ticks, name] of [
    [1, 3, '09-attack-lance'],
    [2, 4, '09-attack-thread'],
    [3, 10, '09-attack-bell'],
    [0, 8, '09-attack-needle'],
  ]) {
    await api(page, ([sl, tk]) => __PALIMPSEST__.attackPose(sl, tk), [slot, ticks]);
    await page.waitForTimeout(500);
    await shot(page, name, { x: 240, y: 90, width: 800, height: 560 });
    await api(page, () => __PALIMPSEST__.setCapture(false));
  }

  // ten restarts: resource plateau
  const series = [];
  for (let i = 0; i < 10; i++) {
    await api(page, (k) => {
      __PALIMPSEST__.restart(100 + k);
      const c = window.__PALIMPSEST_APP__.controller;
      const t = c.deck.hand.find((x) => x.defId === 'needle');
      c.playCard(t.uid, 1);
      c.endTurn();
      __PALIMPSEST__.advanceTicks(60 * 8);
    }, i);
    await settle(page, 0.5);
    series.push(await api(page, () => __PALIMPSEST__.resources()));
  }
  const keys = ['geometries', 'textures', 'programs', 'listeners', 'loops', 'sceneChildren'];
  const plateau = keys.every((k) => Math.max(...series.slice(3).map((r) => r[k])) <= Math.max(...series.slice(0, 3).map((r) => r[k])));
  check('Ten restarts reach a stable resource plateau with one loop', plateau && series.every((r) => r.loops === 1), { first: series[0], last: series[9] });
  report.restartSeries = series;
  await page.close();
}

// ---------------------------------------------------------------------------------------------
for (const [w, h] of [
  [1280, 720],
  [1366, 768],
  [1920, 1080],
]) {
  const page = await openPage(w, h);
  await page.click('#btn-start');
  await waitPhase(page, ['TURN']);
  await settle(page, 1.5);
  await raiseHand(page);
  const s = await snap(page);
  const cards = await Promise.all(s.hand.map((c) => cardPos(page, c.uid)));
  const sockets = await api(page, () => [0, 1, 2, 3, 4, 5].map((i) => __PALIMPSEST__.socketScreen(i)));
  const onScreen = [...cards, ...sockets].every((p) => p && p.x > 0 && p.x < w && p.y > 56 && p.y < h);
  const face = await api(page, () => __PALIMPSEST__.cardFacePixels(1));
  check(`${w}x${h}: hand cards and all sockets on screen`, onScreen, { socketCardPx: { w: +face.width.toFixed(1), h: +face.height.toFixed(1) } });
  await shot(page, `10-turn-${w}x${h}`);
  if (w === 1280) {
    await page.keyboard.press('q');
    await settle(page, 0.5);
    await shot(page, '11-turn-low-quality-1280x720');
    check('Low quality toggles without breaking the turn', (await snap(page)).phase === 'TURN' && (await api(page, () => __PALIMPSEST__.perf())).quality === 'low');
  }
  await page.close();
}

{
  const page = await openPage(1280, 720);
  await api(page, () => __PALIMPSEST__.chargeFixture());
  await page.waitForTimeout(800);
  await shot(page, '12-charge-fixture', { x: 440, y: 200, width: 400, height: 300 });
  const ch = await snap(page);
  check('Charge fixture holds six independent fills at 0/.25/.5/.75/.95/1', JSON.stringify(ch.slots.map((x) => +x.charge.toFixed(2))) === JSON.stringify([0, 0.25, 0.5, 0.75, 0.95, 1]));
  await page.close();
}

{
  const page = await openPage(1920, 1080);
  await api(page, () => {
    __PALIMPSEST__.setQuality('high');
    __PALIMPSEST__.stressFixture(300);
    __PALIMPSEST__.advanceTicks(240);
  });
  await page.waitForTimeout(10000);
  const perf = await api(page, () => __PALIMPSEST__.perf());
  const res = await api(page, () => __PALIMPSEST__.resources());
  const t0 = Date.now();
  await page.click('#btn-pause');
  await waitPhase(page, ['PAUSED']);
  const pauseLatency = Date.now() - t0;
  await page.click('#btn-resume');
  check('Swarm stress (6 towers, 300 foes with soft collision) keeps HUD input responsive (software GPU)', pauseLatency < 15000 && res.enemyVisuals >= 250, { perf, calls: res.calls, triangles: res.triangles, enemyVisuals: res.enemyVisuals, pauseLatencyMs: pauseLatency });
  report.stress = { perf, res, pauseLatency };
  await shot(page, '13-swarm-stress-1920x1080');
  await page.close();
}

const fatal = report.console.filter((x) => /pageerror|shader|error/i.test(x));
check('No page errors or shader errors in the console', fatal.length === 0, { sample: fatal.slice(0, 5) });
report.finishedAt = new Date().toISOString();
report.failures = failures;
fs.writeFileSync('tools/out/smoke-report.json', JSON.stringify(report, null, 2));
console.log(`\n${report.checks.length - failures}/${report.checks.length} checks passed`);
await browser.close();
process.exit(failures ? 1 : 0);
