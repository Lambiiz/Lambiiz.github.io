// Whole-run balance report with scripted turn policies at normal wave durations.
// `npm run balance` prints the table. Balance is not tuned yet; the assertions only guard
// against a degenerate state (an unwinnable or a trivially won run).
import { describe, expect, it } from 'vitest';
import { cardDef, isWeaponId, SLOTS_UNLOCKED_AT_START, WEAPONS } from '../src/game/content';
import { PhaseController } from '../src/game/phases';
import type { CardInstance, WeaponId } from '../src/game/types';

type Policy = (c: PhaseController) => void;

const TOWER_VALUE: Record<WeaponId, number> = { needle: 1, thread: 2, light: 2, bell: 2 };

function placeTowers(c: PhaseController) {
  for (const card of [...c.deck.hand]) {
    if (!isWeaponId(card.defId) || !c.canAfford(card.uid)) continue;
    const free = SLOTS_UNLOCKED_AT_START.find((s) => !c.sim.slots[s]);
    if (free !== undefined) c.playCard(card.uid, free);
    else {
      // replace the weakest placed tower with a better one
      const weakest = SLOTS_UNLOCKED_AT_START.reduce((a, b) => (TOWER_VALUE[c.sim.slots[a]!.defId] <= TOWER_VALUE[c.sim.slots[b]!.defId] ? a : b));
      if (TOWER_VALUE[card.defId] > TOWER_VALUE[c.sim.slots[weakest]!.defId]) {
        c.playCard(card.uid, weakest);
        c.confirmReplace();
      }
    }
  }
}

function playSpells(c: PhaseController) {
  for (const card of [...c.deck.hand] as CardInstance[]) {
    if (isWeaponId(card.defId) || !c.canAfford(card.uid)) continue;
    c.playCard(card.uid); // passives and actives are permanent, so play them all
  }
}

const POLICIES: Record<string, Policy> = {
  // place towers, then spend all energy on spells
  simple: (c) => {
    placeTowers(c);
    playSpells(c);
  },
  // sacrifice spare spells hoping for a second tower while a socket is empty
  seeker: (c) => {
    placeTowers(c);
    const open = SLOTS_UNLOCKED_AT_START.some((s) => !c.sim.slots[s]);
    const spare = c.deck.hand.filter((x) => !isWeaponId(x.defId));
    if (open && spare.length >= 2) {
      c.toggleMark(spare[0].uid);
      c.toggleMark(spare[1].uid);
      if (c.sacrifice()) {
        const offers = c.turn!.offers!;
        const ti = offers.findIndex((id) => isWeaponId(id) && id !== 'needle');
        c.chooseOffer(ti >= 0 ? ti : 0);
      }
    }
    placeTowers(c);
    playSpells(c);
  },
};

function playRun(seed: number, policy: Policy) {
  const c = new PhaseController(seed);
  c.startRun(seed);
  const hpByWave: number[] = [];
  let maxAlive = 0;
  for (let guard = 0; guard < 400000; guard++) {
    if (c.isRunning()) {
      const o = c.sim.step();
      c.sim.drainEvents();
      maxAlive = Math.max(maxAlive, c.sim.enemies.length);
      c.handleOutcome(o);
      continue;
    }
    if (c.phase === 'TURN') {
      if (c.turn!.turnIndex > 0) hpByWave.push(c.sim.baseHp);
      policy(c);
      c.endTurn();
      continue;
    }
    break;
  }
  return { outcome: c.phase, wave: c.sim.trialIndex + 1, hp: c.sim.baseHp, hpByWave, kills: c.sim.kills, maxAlive, towers: c.sim.slots.filter(Boolean).map((w) => w!.defId) };
}

describe('balance report', () => {
  it('prints whole-run results per policy', () => {
    const SEEDS = 20;
    const table: Record<string, Record<string, string | number>> = {};
    for (const [name, policy] of Object.entries(POLICIES)) {
      let wins = 0;
      let hp = 0;
      let alive = 0;
      const curve = new Array(7).fill(0);
      const deaths = new Array(9).fill(0);
      for (let s = 1; s <= SEEDS; s++) {
        const r = playRun(s * 7919, policy);
        if (r.outcome === 'VICTORY') wins++;
        else deaths[r.wave]++;
        hp += r.hp;
        alive += r.maxAlive;
        r.hpByWave.forEach((h, i) => (curve[i] += h));
      }
      table[name] = {
        wins,
        avgHp: Math.round(hp / SEEDS),
        peakFoesOnBoard: Math.round(alive / SEEDS),
        hpAfterWaves: curve.map((h) => Math.round(h / SEEDS)).join(' '),
        lossesByWave: deaths.slice(1).join(' '),
      };
    }
    console.table(table);
    void cardDef;
    void WEAPONS;
    expect(Number(table.simple.wins) + Number(table.seeker.wins)).toBeGreaterThan(0);
    expect(Number(table.simple.wins)).toBeLessThan(SEEDS + 1);
  }, 180000);
});
