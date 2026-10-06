/**
 * Determinism tests for the battle simulation: the preview must match reality exactly up to the
 * first point where someone else gets to decide. Run with `npm test`.
 */
import { createBattle } from '../src/game/battle/sim/encounters';
import { decide, step, clone, fighter, jumpToApex, canUse } from '../src/game/battle/sim/sim';
import { predict } from '../src/game/battle/sim/predict';
import { think } from '../src/game/battle/sim/ai';
import type { BattleState, Command } from '../src/game/battle/sim/types';

let failures = 0;
function check(cond: boolean, msg: string): void {
  if (!cond) {
    failures++;
    console.error('FAIL', msg);
  }
}

/** A deterministic stand-in for the player's choices. */
function playerChoice(s: BattleState, id: number, k: number): Command {
  const f = fighter(s, id);
  const foe = s.fighters.find((o) => o.team === 'enemy' && !o.ko)!;
  const opts: Command[] = [{ kind: 'wait' }];
  if (f.grounded && f.skills.includes('move')) opts.push({ kind: 'move', x: f.x + ((k % 5) - 2) * 1.3 });
  if (f.grounded && f.skills.includes('jump')) opts.push({ kind: 'jump', ...jumpToApex(f, f.x + ((k % 3) - 1) * 2, f.y + 2) });
  if (f.skills.includes('fireball')) opts.push({ kind: 'fireball', tx: foe.x, ty: foe.y + 1 });
  if (f.skills.includes('arrow')) opts.push({ kind: 'arrow', vx: 9 * (foe.x > f.x ? 1 : -1), vy: 4 });
  if (f.grounded && f.skills.includes('slash')) opts.push({ kind: 'slash' });
  return opts[k % opts.length];
}

for (let seed = 1; seed <= 25; seed++) {
  const s = createBattle('bandits', seed);
  let k = seed;
  let turns = 0;
  while (!s.outcome && s.tick < 60 * 90) {
    if (s.awaiting === null) {
      step(s);
      continue;
    }
    const id = s.awaiting;
    const f = fighter(s, id);
    if (f.team === 'enemy') {
      if (!decide(s, id, think(s, f))) decide(s, id, { kind: 'wait' });
      continue;
    }
    let cmd = playerChoice(s, id, k++);
    if (!canUse(f, cmd)) cmd = { kind: 'wait' };
    const pred = predict(s, id, cmd, 150, 1);
    check(pred !== null, `seed ${seed}: predict returned null for ${cmd.kind}`);
    const before = clone(s);
    check(decide(s, id, cmd), `seed ${seed}: decide refused ${cmd.kind}`);
    turns++;
    if (!pred) continue;
    // run reality forward until the first other decision, comparing every tick exactly
    const t0 = before.tick;
    const certain = Math.min(pred.certainUntil, pred.ticks);
    const track = new Map(pred.fighters.map((p) => [p.id, new Map(p.points.map((q) => [q.tick, q]))]));
    while (s.tick - t0 < certain && s.awaiting === null && !s.outcome) {
      step(s);
      for (const g of s.fighters) {
        const q = track.get(g.id)!.get(s.tick - t0);
        if (q && q.certain) check(q.x === g.x && q.y === g.y, `seed ${seed} tick ${s.tick}: fighter ${g.id} predicted (${q.x},${q.y}) got (${g.x},${g.y})`);
      }
    }
  }
  check(turns > 3, `seed ${seed}: only ${turns} player turns`);
  console.log(`seed ${seed}: ${s.outcome ?? 'timeout'} after ${(s.tick / 60).toFixed(1)}s, ${turns} player turns`);
}

// cloning must not share state
const a = createBattle('bandits', 3);
const b = clone(a);
b.fighters[0].x = 99;
check(a.fighters[0].x !== 99, 'clone shares fighter objects');

if (failures) {
  console.error(`${failures} failure(s)`);
  process.exit(1);
}
console.log('sim: all checks passed');
