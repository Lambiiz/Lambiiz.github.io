// Balance + rules tests for the pure battle system. Run: node tests/battle.test.mjs
import assert from 'node:assert/strict';
import { BattleSystem } from '../src/battle/BattleSystem.js';

function play(strategy, seed) {
  const b = new BattleSystem({ seed });
  let guard = 0;
  while (!b.over && b.turn < 60) {
    const a = strategy(b);
    const ev = b.playerAction(a);
    if (ev[0]?.type === 'invalid') b.playerAction({ kind: 'attack' });
    if (!b.over) b.enemyTurn();
    if (++guard > 200) throw new Error('loop');
  }
  return { result: b.over, turns: b.turn, hp: b.player.hp };
}

const smart = (b) => {
  const p = b.player, e = b.enemy;
  if (e.charged) return { kind: 'guard' };
  if (p.hp < 50 && b.items.soda) return { kind: 'item', id: 'soda' };
  if (p.sp < 10 && b.items.mints) return { kind: 'item', id: 'mints' };
  const weakEl = e.phase === 0 ? 'lumenEdge' : 'cinderVerse';
  if (b.canUse(weakEl)) return { kind: 'skill', id: weakEl };
  return { kind: 'attack' };
};
const attackOnly = () => ({ kind: 'attack' });
const wrongSkills = (b) => (b.canUse('cinderVerse') && b.enemy.phase === 0 ? { kind: 'skill', id: 'cinderVerse' } : { kind: 'attack' });
const randomish = (b) => {
  const r = b.rng();
  if (r < 0.3) return { kind: 'attack' };
  if (r < 0.55 && b.canUse('lumenEdge')) return { kind: 'skill', id: 'lumenEdge' };
  if (r < 0.8 && b.canUse('cinderVerse')) return { kind: 'skill', id: 'cinderVerse' };
  if (r < 0.9 && b.items.soda) return { kind: 'item', id: 'soda' };
  return { kind: 'guard' };
};

for (const [name, s] of Object.entries({ smart, attackOnly, wrongSkills, randomish })) {
  let wins = 0, turns = 0, hp = 0;
  const N = 2000;
  for (let i = 0; i < N; i++) { const r = play(s, i + 1); if (r.result === 'victory') { wins++; turns += r.turns; hp += r.hp; } }
  console.log(`${name.padEnd(12)} win ${(wins / N * 100).toFixed(1)}%  avg turns ${(turns / Math.max(1, wins)).toFixed(1)}  avg hp left ${(hp / Math.max(1, wins)).toFixed(0)}`);
}

// rules
{
  const b = new BattleSystem({ seed: 5 });
  const ev = b.playerAction({ kind: 'skill', id: 'lumenEdge' });
  assert.equal(ev.find((e) => e.type === 'damage').affinity, 'weak');
  assert.ok(ev.some((e) => e.type === 'stun'), 'weakness stuns');
  assert.equal(b.player.sp, 52);
  const en = b.enemyTurn();
  assert.equal(en[0].type, 'recover', 'stunned enemy loses its turn');
  const ev2 = b.playerAction({ kind: 'skill', id: 'lumenEdge' });
  assert.ok(!ev2.some((e) => e.type === 'stun'), 'no stun-lock right after recovering');
}
{
  const b = new BattleSystem({ seed: 9 });
  const ev = b.playerAction({ kind: 'skill', id: 'cinderVerse' });
  assert.equal(ev.find((e) => e.type === 'damage').affinity, 'resist');
}
{
  const b = new BattleSystem({ seed: 3 });
  b.enemy.hp = 125;
  const ev = b.playerAction({ kind: 'attack' });
  assert.ok(ev.some((e) => e.type === 'phase'), 'phase 2 triggers at half HP');
  assert.equal(b.affinityOf('fire'), 'weak');
  assert.equal(b.affinityOf('light'), 'resist');
}
{
  const b = new BattleSystem({ seed: 3 });
  b.enemy.charged = true;
  b.playerAction({ kind: 'guard' });
  const ev = b.enemyTurn();
  const d = ev.find((e) => e.type === 'damage');
  assert.ok(d.guarded && d.heavy && d.amount <= 26, 'guard halves the charged attack');
}
{
  const b = new BattleSystem({ seed: 1 });
  b.player.sp = 3;
  assert.equal(b.playerAction({ kind: 'skill', id: 'lumenEdge' })[0].type, 'invalid');
  b.items.soda = 0;
  assert.equal(b.playerAction({ kind: 'item', id: 'soda' })[0].type, 'invalid');
}
{
  const b = new BattleSystem({ seed: 1 });
  b.enemy.hp = 5;
  const ev = b.playerAction({ kind: 'attack' });
  assert.equal(b.over, 'victory');
  assert.ok(ev.some((e) => e.type === 'end'));
  assert.deepEqual(b.enemyTurn(), []);
}
console.log('battle rules: all assertions passed');
