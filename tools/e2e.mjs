// End-to-end playthrough in headless Chromium (software WebGL).
// Usage: node tools/e2e.mjs [outDir] [--quick]
// Requires the dev server: node server.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'docs/screenshots';
fs.mkdirSync(OUT, { recursive: true });
const URL = 'http://localhost:5173/?q=low';
const log = (...a) => console.log(`[${((Date.now() - T0) / 1000).toFixed(0)}s]`, ...a);
const T0 = Date.now();
const results = [];
const check = (name, ok, extra = '') => { results.push({ name, ok }); log(`${ok ? 'PASS' : 'FAIL'} ${name} ${extra}`); };

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') { errors.push(m.text()); log('[console.error]', m.text()); } });
page.on('pageerror', (e) => { errors.push(e.message); log('[pageerror]', e.message); });
const shot = (n) => page.screenshot({ path: `${OUT}/${n}.png` });
const G = (fn, arg) => page.evaluate(fn, arg);
const waitFor = (fn, timeout = 120000, arg) => page.waitForFunction(fn, arg, { timeout, polling: 100 });

await page.goto(URL);
await page.addInitScript(() => {});
await waitFor(() => window.__ready === true, 300000);
check('assets load (3 VRMs + animation library)', await G(() => !!window.__game.player && !!window.__game.student && !!window.__game.echo));
check('animations retargeted', await G(() => window.__game.player.clips.size >= 18 && window.__game.echo.clips.has('slash')));
await page.waitForTimeout(1200);
await shot('01-title');

// ---- explore
await page.keyboard.press('Enter');
await waitFor(() => window.__game.state === 'explore', 60000);
await page.waitForTimeout(500);
await shot('02-explore');
const z0 = await G(() => window.__game.player.root.position.z);
await page.keyboard.down('KeyW');
await page.waitForTimeout(6000);
await shot('03-running');
await page.keyboard.up('KeyW');
const z1 = await G(() => window.__game.player.root.position.z);
check('W moves the player forward', z1 > z0 + 1, `${z0.toFixed(2)} -> ${z1.toFixed(2)}`);
check('player plays locomotion anim', await G(() => ['jog', 'walk', 'idle'].includes(window.__game.controller.anim)));

// collision with the door-side wall (screen-right = -X when facing down the hall)
await G(() => { const g = window.__game; g.player.root.position.set(-1.5, 0, 12.5); g.player.setHeading(0); g.follow.snap(g.player); });
await page.keyboard.down('KeyD');
await page.waitForTimeout(5000);
await page.keyboard.up('KeyD');
const xw = await G(() => window.__game.player.root.position.x);
check('wall collision holds (door wall)', xw > -2.75, `x=${xw.toFixed(3)}`);
await shot('04-collision');
await G(() => { const g = window.__game; g.player.root.position.set(1.8, 0, 13.0); g.player.setHeading(0); g.follow.snap(g.player); });
await page.keyboard.down('KeyA');
await page.waitForTimeout(4000);
await page.keyboard.up('KeyA');
const xw2 = await G(() => window.__game.player.root.position.x);
check('wall collision holds (window wall)', xw2 < 2.6, `x=${xw2.toFixed(3)}`);

// ---- approach + interact
await G(() => { const g = window.__game; g.player.root.position.set(0.6, 0, 15.6); g.player.setHeading(0.4); g.follow.snap(g.player); });
await page.keyboard.down('KeyW');
await page.waitForTimeout(2500);
await page.keyboard.up('KeyW');
await page.waitForTimeout(800);
const near = await G(() => window.__game.player.root.position.distanceTo(window.__game.student.root.position));
const prompt = await G(() => !document.querySelector('.prompt').classList.contains('hidden'));
check('talk prompt appears near the student', prompt, `dist=${near.toFixed(2)}`);
await shot('05-prompt');
await page.keyboard.press('KeyE');
await waitFor(() => window.__game.state === 'dialogue', 20000);
check('E starts the conversation', true);

// ---- dialogue
let lines = 0;
while (true) {
  const st = await G(() => window.__game.state);
  if (st !== 'dialogue') break;
  const ready = await G(() => !!window.__game.dialogue.waiting);
  if (!ready) { await page.waitForTimeout(250); continue; }
  await page.keyboard.press('Enter'); // complete the typewriter
  await page.waitForTimeout(400);
  lines++;
  if ([1, 3, 4, 7, 8, 9, 11].includes(lines)) await shot(`06-dialogue-${String(lines).padStart(2, '0')}`);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
}
check('dialogue plays all lines', lines >= 11, `lines=${lines}`);

// ---- transition
await waitFor(() => window.__game.state === 'transition', 20000).catch(() => {});
for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(700);
  await shot(`07-transition-${i}`);
}
await waitFor(() => window.__game.state === 'battle' && window.__game.battle.ui.mode === 'main', 240000);
check('transition reaches battle menu', true);
await page.waitForTimeout(600);
await shot('08-battle-menu');

// ---- battle (keyboard-driven, smart strategy)
async function chooseAndAct(turn) {
  const s = await G(() => {
    const b = window.__game.battle.sys;
    return { hp: b.player.hp, sp: b.player.sp, phase: b.enemy.phase, charged: b.enemy.charged, soda: b.items.soda, mints: b.items.mints, sel: window.__game.battle.ui.sel };
  });
  let cmd, sub = null;
  if (s.charged) cmd = 2;
  else if (s.hp < 55 && s.soda) { cmd = 3; sub = 0; }
  else if (s.sp < 10 && s.mints) { cmd = 3; sub = 1; }
  else if (s.sp >= (s.phase === 0 ? 8 : 10)) { cmd = 1; sub = s.phase === 0 ? 0 : 1; }
  else cmd = 0;
  // navigate with arrow keys from current selection
  const diff = cmd - s.sel;
  for (let i = 0; i < Math.abs(diff); i++) { await page.keyboard.press(diff > 0 ? 'ArrowDown' : 'ArrowUp'); await page.waitForTimeout(120); }
  if (turn === 1) await shot('09-menu-nav');
  await page.keyboard.press('Enter');
  if (sub !== null) {
    await waitFor(() => window.__game.battle.ui.mode === 'sub', 10000);
    if (turn === 1) {
      // test back out of sub-menu with Escape, then re-enter
      await page.waitForTimeout(400);
      await shot('10-skill-submenu');
      await page.keyboard.press('Escape');
      await waitFor(() => window.__game.battle.ui.mode === 'main', 5000);
      check('ESC backs out of the sub-menu', true);
      await page.keyboard.press('Enter');
      await waitFor(() => window.__game.battle.ui.mode === 'sub', 5000);
    }
    for (let i = 0; i < sub; i++) { await page.keyboard.press('ArrowDown'); await page.waitForTimeout(120); }
    await page.keyboard.press('Enter');
  }
  return { cmd, sub };
}

let turn = 0;
let sawWeak = false, sawStun = false, sawPhase = false, sawEnemyAttack = false;
const hp0 = await G(() => window.__game.battle.sys.enemy.hp);
while (turn < 30) {
  const st = await G(() => ({ state: window.__game.state, mode: window.__game.battle.ui.mode, over: window.__game.battle.sys?.over }));
  if (st.over || st.state !== 'battle') break;
  if (st.mode !== 'main') { await page.waitForTimeout(250); continue; }
  turn++;
  const before = await G(() => ({ e: window.__game.battle.sys.enemy.hp, p: window.__game.battle.sys.player.hp, phase: window.__game.battle.sys.enemy.phase }));
  const act = await chooseAndAct(turn);
  // capture action moments
  for (let k = 0; k < 3; k++) {
    await page.waitForTimeout(k === 0 ? 900 : 1100);
    if (turn <= 4 || act.cmd === 2) await shot(`11-turn${String(turn).padStart(2, '0')}-${k}`);
  }
  await waitFor(() => window.__game.battle.ui.mode === 'main' || window.__game.battle.sys.over, 240000);
  const after = await G(() => ({ e: window.__game.battle.sys.enemy.hp, p: window.__game.battle.sys.player.hp, phase: window.__game.battle.sys.enemy.phase, known: window.__game.battle.sys.known, turn: window.__game.battle.sys.turn }));
  if (after.known[0].light === 'weak') sawWeak = true;
  if (after.phase === 1) sawPhase = true;
  if (after.p < before.p) sawEnemyAttack = true;
  sawStun = sawStun || (await G(() => window.__game.battle.ui.eStatus.textContent.includes('CRACKED') || window.__game.battle.sys.enemy.stunImmune));
  log(`turn ${turn}: cmd=${act.cmd} sub=${act.sub} enemy ${before.e}->${after.e} player ${before.p}->${after.p} phase=${after.phase}`);
}
const over = await G(() => window.__game.battle.sys.over);
check('battle reaches a result', !!over, over);
check('enemy HP decreased', (await G(() => window.__game.battle.sys.enemy.hp)) < hp0);
check('weakness discovered (Lumen = WEAK)', sawWeak);
check('weakness stun observed', sawStun);
check('phase 2 (Mirror Glaze) triggered', sawPhase || over !== 'victory');
check('enemy attacked the player', sawEnemyAttack);

// victory sequence + epilogue conversation
let epi = 0;
const tEnd = Date.now() + 400000;
while (Date.now() < tEnd) {
  const s = await G(() => ({ result: document.querySelector('.result').getBoundingClientRect().width > 0, waiting: !!window.__game.dialogue.waiting }));
  if (s.result) break;
  if (s.waiting) {
    await page.keyboard.press('Enter');
    await page.waitForTimeout(400);
    epi++;
    await shot(`12-epilogue-${epi}`);
    await page.keyboard.press('Enter');
  } else if (epi === 0) {
    await shot(`12-victory-seq-${Date.now() % 100000}`);
  }
  await page.waitForTimeout(1500);
}
check('epilogue conversation plays', epi >= 3, `lines=${epi}`);
await waitFor(() => document.querySelector('.result').getBoundingClientRect().width > 0, 60000);
await page.waitForTimeout(1200);
await shot(over === 'victory' ? '12-victory' : '12-defeat');
check('result screen shown', true);

// ---- restart from the corridor
await page.keyboard.press('Enter');
await waitFor(() => window.__game.state === 'explore', 60000);
const reset = await G(() => ({ z: window.__game.player.root.position.z, mood: window.__game.world.mood, echo: window.__game.echo.root.visible }));
check('restart returns to the corridor with world reset', reset.z < 5 && reset.mood === 0 && !reset.echo, JSON.stringify(reset));
await shot('13-restarted');

// ---- defeat + retry path
await G(() => { const g = window.__game; g.player.root.position.set(1.0, 0, 17.3); g.follow.snap(g.player); });
await page.waitForTimeout(600);
await page.keyboard.press('KeyE');
await waitFor(() => window.__game.state === 'dialogue', 20000);
while ((await G(() => window.__game.state)) === 'dialogue') {
  if (await G(() => !!window.__game.dialogue.waiting)) { await page.keyboard.press('Enter'); await page.waitForTimeout(150); await page.keyboard.press('Enter'); }
  await page.waitForTimeout(250);
}
await waitFor(() => window.__game.state === 'battle' && window.__game.battle.ui.mode === 'main', 240000);
await G(() => { window.__game.battle.sys.player.hp = 1; window.__game.battle.view.php = 1; window.__game.battle._pushUI(); });
await page.keyboard.press('Digit1'); // attack — enemy will KO us on its turn
await waitFor(() => window.__game.battle.sys.over === 'defeat' || window.__game.battle.sys.over === 'victory', 240000);
const res2 = await G(() => window.__game.battle.sys.over);
check('defeat path triggers at 0 HP', res2 === 'defeat', res2);
await waitFor(() => document.querySelector('.result').getBoundingClientRect().width > 0, 240000);
await page.waitForTimeout(1200);
await shot('14-defeat');
await page.keyboard.press('Enter'); // RETRY BATTLE
await waitFor(() => window.__game.state === 'battle' && window.__game.battle.ui.mode === 'main', 240000);
const retry = await G(() => ({ hp: window.__game.battle.sys.player.hp, ehp: window.__game.battle.sys.enemy.hp, turn: window.__game.battle.sys.turn }));
check('retry restarts the battle at full HP', retry.hp === 140 && retry.ehp === 240 && retry.turn === 1, JSON.stringify(retry));
await shot('15-retry');

check('no runtime errors', errors.length === 0, errors.slice(0, 3).join(' | '));
const fails = results.filter((r) => !r.ok);
log(`\n${results.length - fails.length}/${results.length} checks passed`);
fs.writeFileSync(`${OUT}/e2e-report.json`, JSON.stringify({ results, errors, date: new Date().toISOString() }, null, 2));
await browser.close();
process.exit(fails.length ? 1 : 0);
