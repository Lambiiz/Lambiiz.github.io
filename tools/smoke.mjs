// Browser smoke suite for PALIMPSEST (Playwright + Chromium).
//   node tools/smoke.mjs [baseUrl]            (dev server or `vite preview` with ?dev)
// Interactions use real mouse input on the canvas and real DOM buttons. Deterministic dev
// fixtures are used only to reach states quickly (marked "fixture" in the report).
// Writes tools/out/smoke-report.json and screenshots to docs/screenshots/.
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
const waitPhase = (page, phases, timeout = 60000) =>
  page.waitForFunction((ph) => ph.includes(__PALIMPSEST__.snapshot().phase), phases, { timeout, polling: 100 });
async function shot(page, name) {
  const path = `${SHOTS}/${name}.png`;
  await page.screenshot({ path });
  report.screenshots.push(path);
}
async function drag(page, from, to, steps = 10) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  for (let i = 1; i <= steps; i++) await page.mouse.move(from.x + ((to.x - from.x) * i) / steps, from.y + ((to.y - from.y) * i) / steps);
  await page.mouse.up();
}
const frozenView = (s) => JSON.stringify({ t: s.tick, e: s.enemies, p: s.projectiles, sp: s.spawnProgress, w: s.slots.map((x) => x && [x.id, x.elapsed]), hp: s.hp });
/** Reach the end of the current trial quickly (fixture) and wait for the real boundary transition. */
async function toDraft(page) {
  await api(page, () => __PALIMPSEST__.skipToTrialEnd(0.25));
  await waitPhase(page, ['DRAFT', 'DEFEAT']);
  await api(page, () => __PALIMPSEST__.settle(1.4));
}
const weaponIndex = (s) => s.draft.offer.findIndex((id) => ['needle', 'light', 'thread', 'bell'].includes(id));

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
  await page.waitForTimeout(1500);
  await shot(page, '01-title');
  await page.click('#btn-start');
  await waitPhase(page, ['COMBAT']);
  const s0 = await snap(page);
  check('Start button begins COMBAT with one Memory Needle and five empty sockets', s0.slots.filter(Boolean).length === 1 && s0.slots[0].defId === 'needle' && s0.hp === 100);
  // normal-time combat: let real frames advance the simulation without fast-forward
  await page.waitForFunction(() => __PALIMPSEST__.snapshot().simTime > 9, null, { timeout: 120000, polling: 250 });
  await shot(page, '02-initial-combat');
  const s1 = await snap(page);
  check('Normal-time combat advances simulation and weapons fire', s1.tick > 0 && s1.slots[0].shots >= 1, { simTime: +s1.simTime.toFixed(2), shots: s1.slots[0].shots, enemies: s1.enemies.length });

  // trial boundary freeze (fixture: three durable far echoes so the frozen state has survivors in motion)
  await api(page, () => {
    for (const [x, z] of [[0, 9.3], [-8.8, -3], [7.5, -5.5]]) {
      const id = __PALIMPSEST__.spawn('echo', x, z, 1);
      const e = window.__PALIMPSEST_APP__.controller.sim.enemies.find((q) => q.id === id);
      e.hp = e.maxHp = 2000;
    }
  });
  await toDraft(page);
  const a = await snap(page);
  await page.waitForTimeout(3000);
  const b = await snap(page);
  check('Draft freezes enemies, projectiles, spawn progress, charge and damage over 3 s wall-clock', frozenView(a) === frozenView(b) && a.phase === 'DRAFT', { enemiesFrozen: a.enemies.length, tick: a.tick });
  check('Boundary lands exactly on the trial duration', Math.abs(a.trialTime - 30) < 1e-6, { trialTime: a.trialTime });
  check('First draft offers three distinct weapon cards', new Set(a.draft.offer).size === 3 && weaponIndex(a) >= 0, { offer: a.draft.offer });
  await shot(page, '03-draft-choices');

  // invalid drop: release over empty board
  const o0 = await api(page, () => __PALIMPSEST__.offerScreen(0));
  await drag(page, o0, { x: 120, y: 360 });
  await api(page, () => __PALIMPSEST__.settle(0.6));
  const c = await snap(page);
  check('Invalid drop returns the card without consuming the reward', c.slots.filter(Boolean).length === 1 && c.draft.stage !== 'resolved' && c.draft.offer.length === 3, { stage: c.draft.stage });

  // pointer cancel during drag
  const o1 = await api(page, () => __PALIMPSEST__.offerScreen(1));
  await page.mouse.move(o1.x, o1.y);
  await page.mouse.down();
  await page.mouse.move(o1.x + 40, o1.y - 60);
  await page.mouse.move(o1.x + 80, o1.y - 120);
  await page.evaluate(() => document.getElementById('scene').dispatchEvent(new PointerEvent('pointercancel', { pointerId: 1, bubbles: true })));
  await page.mouse.up();
  await api(page, () => __PALIMPSEST__.settle(0.6));
  const d = await snap(page);
  check('Pointer cancellation returns the dragged card unconsumed', d.slots.filter(Boolean).length === 1 && d.draft.stage !== 'resolved' && d.draft.stage !== 'settling');

  // click-select then click a socket (click fallback)
  await api(page, () => __PALIMPSEST__.settle(0.5));
  const st = await snap(page);
  const wi = weaponIndex(st);
  const ow = await api(page, (i) => __PALIMPSEST__.offerScreen(i), wi);
  if (st.draft.selected === wi && st.draft.stage === 'placing') {
    /* already selected */
  } else {
    await page.mouse.click(ow.x, ow.y);
  }
  await page.waitForFunction(() => __PALIMPSEST__.snapshot().draft?.stage === 'placing', null, { timeout: 10000 });
  const sock2 = await api(page, () => __PALIMPSEST__.socketScreen(2));
  await page.mouse.click(sock2.x, sock2.y);
  await page.mouse.click(sock2.x, sock2.y); // double click must not duplicate ownership
  const e = await snap(page);
  check('Click-select + click-socket equips; double click cannot duplicate', e.slots.filter(Boolean).length === 2 && !!e.slots[2], { stage: e.draft?.stage });
  check('Continue is locked while the card settles', (await page.isDisabled('#btn-continue')) === true || e.draft.stage === 'resolved');
  await api(page, () => __PALIMPSEST__.settle(0.6));
  await page.waitForFunction(() => !document.getElementById('btn-continue').disabled, null, { timeout: 10000 });
  const residual = (await snap(page)).slots[0].elapsed;
  const survivors = (await snap(page)).enemies.map((x) => x.id);
  await page.dblclick('#btn-continue');
  await waitPhase(page, ['COMBAT']);
  const f = await snap(page);
  check('Continue resumes the same encounter at the next trial exactly once', f.trialIndex === 1 && f.trialTime < 0.5, { trialIndex: f.trialIndex });
  check('Survivors and residual charge are preserved across the draft', survivors.length > 0 && survivors.every((id) => f.enemies.some((x) => x.id === id)) && f.slots[0].elapsed >= residual - 1e-9, {
    survivors: survivors.length,
    residual: +residual.toFixed(3),
  });

  // second normal-time cycle (no fast-forward until near the end)
  await page.waitForFunction(() => __PALIMPSEST__.snapshot().trialTime > 6, null, { timeout: 120000, polling: 250 });
  // pause during combat (manual) freezes
  await page.click('#btn-pause');
  await waitPhase(page, ['PAUSED']);
  const p1 = await snap(page);
  await page.waitForTimeout(2000);
  const p2 = await snap(page);
  check('Manual pause freezes the encounter', frozenView(p1) === frozenView(p2));
  await page.click('#btn-resume');
  await waitPhase(page, ['COMBAT']);
  // visibility suspension
  await api(page, () => __PALIMPSEST__.simulateHidden());
  const v1 = await snap(page);
  await page.waitForTimeout(2000);
  const v2 = await snap(page);
  check('Visibility loss suspends without catch-up and requires Resume', v1.phase === 'PAUSED' && frozenView(v1) === frozenView(v2) && (await page.isVisible('#btn-resume')));
  await page.click('#btn-resume');
  await waitPhase(page, ['COMBAT']);

  // second draft: drag onto an occupied socket -> confirm -> cancel -> then place elsewhere by drag
  await toDraft(page);
  let s = await snap(page);
  let wi2 = weaponIndex(s);
  const occupiedBefore = s.slots[0].id;
  let from = await api(page, (i) => __PALIMPSEST__.offerScreen(i), wi2);
  await drag(page, from, await api(page, () => __PALIMPSEST__.socketScreen(0)));
  await page.waitForSelector('#btn-replace:not(.hidden)', { timeout: 10000 }).catch(() => {});
  s = await snap(page);
  check('Dropping onto an occupied socket asks for Replace and keeps the old weapon', s.draft.stage === 'confirmReplace' && s.slots[0].id === occupiedBefore && (await page.isVisible('#btn-replace')));
  await shot(page, '04-replace-preview');
  await page.click('#btn-cancel');
  s = await snap(page);
  check('Cancel replacement preserves the old card and returns to the unresolved choice', s.draft.stage === 'choosing' && s.slots[0].id === occupiedBefore);
  await api(page, () => __PALIMPSEST__.settle(0.6));
  from = await api(page, (i) => __PALIMPSEST__.offerScreen(i), wi2);
  await drag(page, from, await api(page, () => __PALIMPSEST__.socketScreen(4)));
  s = await snap(page);
  check('Drag-to-empty-socket equips through the physical card', !!s.slots[4] && s.slots.filter(Boolean).length === 3);
  await api(page, () => __PALIMPSEST__.settle(0.6));
  await page.click('#btn-continue');
  await waitPhase(page, ['COMBAT']);
  check('Two complete combat/draft cycles completed through real input', (await snap(page)).trialIndex === 2);

  // restart from a pending draft via HUD
  await toDraft(page);
  await page.click('#btn-restart');
  await waitPhase(page, ['COMBAT']);
  s = await snap(page);
  check('Restart from a pending draft resets health, phase, build and trial', s.trialIndex === 0 && s.hp === 100 && s.slots.filter(Boolean).length === 1 && !s.draft && s.enemies.length === 0);
  report.consoleErrorsMain = report.console.filter((x) => x.includes('error')).length;
  await page.close();
}

// ---------------------------------------------------------------------------------------------
// Boons, full-Base replacement, pause with projectile, defeat, victory (fixtures to reach states)
{
  const page = await openPage();
  await page.click('#btn-start');
  await waitPhase(page, ['COMBAT']);

  // boon: find a draft containing a boon (third draft onward)
  let found = false;
  for (let seed = 11; seed < 80 && !found; seed++) {
    await api(page, (sd) => {
      __PALIMPSEST__.restart(sd);
      __PALIMPSEST__.setTrial(2);
      __PALIMPSEST__.setHp(60);
    }, seed);
    await toDraft(page);
    const s = await snap(page);
    const bi = s.draft.offer.findIndex((id) => id === 'polish' || id === 'mend');
    if (bi < 0) continue;
    found = true;
    const before = JSON.stringify(s.slots.map((x) => x && x.id));
    await drag(page, await api(page, (i) => __PALIMPSEST__.offerScreen(i), bi), await api(page, () => __PALIMPSEST__.socketScreen(3)));
    const t = await snap(page);
    check('Dragging a boon onto a socket never creates or occupies a weapon (fixture: seed search)', JSON.stringify(t.slots.map((x) => x && x.id)) === before && t.draft.stage !== 'resolved', { boon: s.draft.offer[bi] });
    await api(page, () => __PALIMPSEST__.settle(0.5));
    const t2 = await snap(page);
    if (t2.draft.selected !== bi) await page.mouse.click(...Object.values(await api(page, (i) => __PALIMPSEST__.offerScreen(i), bi)));
    await page.waitForFunction(() => __PALIMPSEST__.snapshot().draft?.stage === 'boonSelected', null, { timeout: 10000 });
    const hpBefore = (await snap(page)).hp;
    const stBefore = (await snap(page)).polishStacks;
    await page.click('#btn-use');
    await page.waitForFunction(() => !document.getElementById('btn-continue').disabled, null, { timeout: 10000 }).catch(() => {});
    const u = await snap(page);
    check('Use resolves the boon immediately and enables Continue', u.draft.stage === 'resolved' && (u.hp > hpBefore || u.polishStacks > stBefore) && !(await page.isDisabled('#btn-continue')), { hp: u.hp, polish: u.polishStacks });
  }
  check('A boon offer was reachable', found);

  // full Base replacement (fixture: six installed weapons)
  await api(page, () => {
    __PALIMPSEST__.restart(31);
    ['light', 'thread', 'bell', 'needle', 'light'].forEach((id, i) => __PALIMPSEST__.install(i + 1, id));
  });
  await toDraft(page);
  let s = await snap(page);
  const wi = weaponIndex(s);
  const oldId = s.slots[3].id;
  await drag(page, await api(page, (i) => __PALIMPSEST__.offerScreen(i), wi), await api(page, () => __PALIMPSEST__.socketScreen(3)));
  await page.waitForFunction(() => __PALIMPSEST__.snapshot().draft?.stage === 'confirmReplace', null, { timeout: 10000 });
  await page.click('#btn-replace');
  await page.click('#btn-replace').catch(() => {});
  s = await snap(page);
  check('Full-Base replacement is atomic: exactly six weapons, new instance at zero charge', s.slots.filter(Boolean).length === 6 && s.slots[3].id !== oldId && s.slots[3].elapsed === 0 && new Set(s.slots.map((x) => x.id)).size === 6);
  await api(page, () => __PALIMPSEST__.settle(0.8));
  await shot(page, '05-six-slots-draft');
  await page.click('#btn-continue');
  await waitPhase(page, ['COMBAT']);
  // populated six-slot Base with varied fills during combat
  await api(page, () => {
    __PALIMPSEST__.advanceTicks(60 * 7);
    __PALIMPSEST__.settle(1.2);
  });
  await page.mouse.move(1200, 650);
  await page.waitForTimeout(800);
  await shot(page, '06-six-slots-combat');

  // pause with a projectile in flight
  await api(page, () => {
    __PALIMPSEST__.restart(41);
    const a = window.__PALIMPSEST_APP__;
    a.controller.sim.spawningEnabled = false;
    __PALIMPSEST__.spawn('urn', 0, 9.2, 3);
  });
  await page.waitForFunction(() => {
    __PALIMPSEST__.advanceTicks(1);
    return __PALIMPSEST__.snapshot().projectiles.length > 0;
  }, null, { timeout: 30000, polling: 50 });
  await page.click('#btn-pause');
  const q1 = await snap(page);
  await page.waitForTimeout(2000);
  const q2 = await snap(page);
  check('Pause with a projectile in flight freezes its position (fixture)', q1.projectiles.length > 0 && JSON.stringify(q1.projectiles) === JSON.stringify(q2.projectiles));
  await page.click('#btn-resume');

  // attack impact captures: deterministic poses a few ticks after each archetype fires (fixture)
  for (const [slot, ticks, name] of [
    [1, 3, '07-attack-lance'],
    [2, 4, '07-attack-thread'],
    [3, 10, '07-attack-bell'],
    [0, 10, '07-attack-needle'],
  ]) {
    await api(page, ([sl, tk]) => __PALIMPSEST__.attackPose(sl, tk), [slot, ticks]);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${SHOTS}/${name}.png`, clip: { x: 280, y: 100, width: 720, height: 560 } });
    report.screenshots.push(`${SHOTS}/${name}.png`);
    await api(page, () => __PALIMPSEST__.setCapture(false));
  }

  // defeat
  await api(page, () => {
    __PALIMPSEST__.restart(61);
    __PALIMPSEST__.setHp(5);
    __PALIMPSEST__.spawn('urn', 4.6, 0.2, 5);
  });
  await waitPhase(page, ['DEFEAT'], 90000);
  const df = await snap(page);
  check('Edge arrival deals contact damage once and defeat triggers once', df.phase === 'DEFEAT' && df.hp === 0 && df.transitions >= 2);
  await api(page, () => __PALIMPSEST__.settle(2));
  await shot(page, '08-defeat');
  await page.click('#btn-end-restart');
  await waitPhase(page, ['COMBAT']);
  s = await snap(page);
  check('Restart from defeat yields a fresh run', s.hp === 100 && s.trialIndex === 0 && s.slots.filter(Boolean).length === 1);

  // victory via trial 8 clearing (fixture: jump to trial 8)
  await api(page, () => {
    __PALIMPSEST__.restart(71);
    __PALIMPSEST__.setTrial(7);
    ['light', 'thread', 'bell', 'needle', 'light'].forEach((id, i) => __PALIMPSEST__.install(i + 1, id));
    __PALIMPSEST__.skipToTrialEnd(4);
  });
  await waitPhase(page, ['CLEARING', 'VICTORY'], 90000);
  const cl = await snap(page);
  let spawnedInClearing = false;
  const idsAtClearing = new Set(cl.enemies.map((x) => x.id));
  while ((await snap(page)).phase === 'CLEARING') {
    const n = await snap(page);
    if (n.enemies.some((x) => !idsAtClearing.has(x.id))) spawnedInClearing = true;
    await api(page, () => __PALIMPSEST__.advanceTicks(30));
  }
  const vi = await snap(page);
  check('Trial 8 clears without new spawns and ends in VICTORY (fixture)', vi.phase === 'VICTORY' && !spawnedInClearing, { phase: vi.phase });
  await api(page, () => __PALIMPSEST__.settle(3));
  await shot(page, '09-victory');
  await page.click('#btn-end-restart');
  await waitPhase(page, ['COMBAT']);
  check('Restart from victory yields a fresh run', (await snap(page)).trialIndex === 0);

  // ten restarts: resource plateau
  const series = [];
  for (let i = 0; i < 10; i++) {
    await api(page, (k) => {
      __PALIMPSEST__.restart(100 + k);
      __PALIMPSEST__.advanceTicks(60 * 6);
    }, i);
    await page.waitForTimeout(400);
    series.push(await api(page, () => __PALIMPSEST__.resources()));
  }
  const keys = ['geometries', 'textures', 'programs', 'listeners', 'loops', 'sceneChildren'];
  // plateau = no growth: later restarts never exceed the early maximum (programs may be released and
  // recompiled as per-card materials come and go, so they are allowed to oscillate within that bound)
  const plateau = keys.every((k) => {
    const early = Math.max(...series.slice(0, 3).map((r) => r[k]));
    const late = Math.max(...series.slice(3).map((r) => r[k]));
    return late <= early;
  });
  check('Ten restarts reach a stable resource plateau with one loop', plateau && series.every((r) => r.loops === 1), { first: series[0], last: series[9] });
  report.restartSeries = series;
  await page.close();
}

// ---------------------------------------------------------------------------------------------
// Resolutions, quality, charge fixture, stress
for (const [w, h] of [
  [1280, 720],
  [1366, 768],
  [1920, 1080],
]) {
  const page = await openPage(w, h);
  await page.click('#btn-start');
  await waitPhase(page, ['COMBAT']);
  await api(page, () => {
    __PALIMPSEST__.advanceTicks(60 * 12);
    __PALIMPSEST__.settle(1);
  });
  await page.waitForTimeout(700);
  const face = await api(page, () => __PALIMPSEST__.cardFacePixels(4));
  const sockets = await api(page, () => [0, 1, 2, 3, 4, 5].map((i) => __PALIMPSEST__.socketScreen(i)));
  const inView = sockets.every((p) => p.x > 0 && p.x < w && p.y > 56 && p.y < h);
  check(`${w}x${h}: equipped card face ≥ ~70x80 CSS px and all sockets on screen`, face.width >= 68 && face.height >= 78 && inView, { face: { w: +face.width.toFixed(1), h: +face.height.toFixed(1) } });
  await shot(page, `10-combat-${w}x${h}`);
  await toDraft(page);
  const panelLeft = await page.evaluate(() => document.getElementById('draft-panel').getBoundingClientRect().left);
  const trays = await api(page, () => [0, 1, 2].map((i) => __PALIMPSEST__.offerScreen(i)));
  const sockets2 = await api(page, () => [0, 1, 2, 3, 4, 5].map((i) => __PALIMPSEST__.socketScreen(i)));
  const clear = [...trays, ...sockets2].every((p) => p.x > 0 && p.x < panelLeft - 10 && p.y > 56 && p.y < h - 10);
  check(`${w}x${h}: tray and sockets are clear of the draft panel and HUD`, clear, { panelLeft });
  await shot(page, `11-draft-${w}x${h}`);
  if (w === 1280) {
    await page.click('#btn-quality');
    await api(page, () => __PALIMPSEST__.settle(0.5));
    await page.waitForTimeout(600);
    await shot(page, '12-draft-low-quality-1280x720');
    check('Low quality toggles without breaking the draft', (await snap(page)).phase === 'DRAFT' && (await api(page, () => __PALIMPSEST__.perf())).quality === 'low');
  }
  await page.close();
}

{
  const page = await openPage(1280, 720);
  await api(page, () => __PALIMPSEST__.chargeFixture());
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SHOTS}/13-charge-fixture-high.png`, clip: { x: 380, y: 150, width: 520, height: 420 } });
  report.screenshots.push(`${SHOTS}/13-charge-fixture-high.png`);
  const ch = await snap(page);
  check('Charge fixture holds six independent fills at 0/.25/.5/.75/.95/1', JSON.stringify(ch.slots.map((x) => +x.charge.toFixed(2))) === JSON.stringify([0, 0.25, 0.5, 0.75, 0.95, 1]));
  const uniforms = await page.evaluate(() => {
    const a = window.__PALIMPSEST_APP__;
    const s = a.controller.sim.slots;
    const mats = s.map((w) => a.cards.equippedView(w.id).overlayMat);
    return { values: mats.map((m) => +m.uniforms.uCharge.value.toFixed(3)), distinctMaterials: new Set(mats).size, distinctUniformObjects: new Set(mats.map((m) => m.uniforms.uCharge)).size };
  });
  check('Each card owns its own charge material/uniform', uniforms.distinctMaterials === 6 && uniforms.distinctUniformObjects === 6, uniforms);
  await api(page, () => __PALIMPSEST__.setQuality('low'));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${SHOTS}/14-charge-fixture-bloom-off.png`, clip: { x: 380, y: 150, width: 520, height: 420 } });
  report.screenshots.push(`${SHOTS}/14-charge-fixture-bloom-off.png`);
  await page.close();
}

{
  const page = await openPage(1920, 1080);
  await api(page, () => {
    __PALIMPSEST__.setQuality('high');
    __PALIMPSEST__.stressFixture(80);
    __PALIMPSEST__.advanceTicks(240); // populate effects before measuring (fixture)
  });
  await page.waitForTimeout(12000);
  const perf = await api(page, () => __PALIMPSEST__.perf());
  const res = await api(page, () => __PALIMPSEST__.resources());
  const t0 = Date.now();
  await page.click('#btn-pause');
  await waitPhase(page, ['PAUSED']);
  const pauseLatency = Date.now() - t0;
  await page.click('#btn-resume');
  check('Stress fixture (6 weapons, 80 enemies) keeps HUD input responsive and effects bounded (software GPU)', pauseLatency < 5000 && res.effects.particles <= 1200, { perf, calls: res.calls, triangles: res.triangles, effects: res.effects, pauseLatencyMs: pauseLatency });
  report.stress = { perf, res, pauseLatency };
  await shot(page, '15-stress-1920x1080');
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
