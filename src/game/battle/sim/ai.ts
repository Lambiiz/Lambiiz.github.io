import type { BattleState, Command, Fighter } from './types';
import { PHYS, ballistic, muzzle, rand } from './sim';

/**
 * Enemy brains. Pure functions of the battle state (randomness comes from the state's seeded RNG),
 * so the same situation always produces the same decision.
 */
export function think(s: BattleState, f: Fighter): Command {
  const foes = s.fighters.filter((o) => o.team !== f.team && !o.ko);
  if (!foes.length) return { kind: 'wait' };
  // nearest foe; ties broken by id so the order of the array never matters
  let target = foes[0];
  for (const o of foes) {
    const d = Math.abs(o.x - f.x), bd = Math.abs(target.x - f.x);
    if (d < bd || (d === bd && o.id < target.id)) target = o;
  }
  const r = rand(s);
  if (f.brain === 'archer') {
    const dist = Math.abs(target.x - f.x);
    if (dist < 2.6 && f.grounded && r < 0.6) {
      // too close: back off toward the far wall
      const away = f.x >= target.x ? s.arena.right - 1 : s.arena.left + 1;
      return { kind: 'move', x: f.x + Math.max(-3.5, Math.min(3.5, away - f.x)) };
    }
    const m = muzzle({ ...f, facing: target.x >= f.x ? 1 : -1 });
    return { kind: 'arrow', ...ballistic(m, { x: target.x, y: target.y + 1.0 }, PHYS.gravity * PHYS.arrowGravity) };
  }
  // brawler: close in, slash, sometimes hop in
  const dx = target.x - f.x;
  const dist = Math.abs(dx);
  const dir = dx >= 0 ? 1 : -1;
  if (dist < 1.7 && f.grounded) {
    return r < 0.8 ? { kind: 'slash', dir } : { kind: 'guard' };
  }
  if (f.grounded && dist > 3.5 && r < 0.3) return { kind: 'jump', vx: dir * 5.5, vy: 9 };
  return { kind: 'move', x: target.x - dir * 1.2 };
}
