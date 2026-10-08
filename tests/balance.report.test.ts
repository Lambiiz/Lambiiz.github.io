// Whole-run balance report using scripted draft policies at normal trial durations.
// Run `npm run balance` to print the table. Assertions are deliberately loose: they guard
// against regressions such as an unwinnable run or a single dominant card.
import { describe, expect, it } from 'vitest';
import { isWeaponId } from '../src/game/content';
import { PhaseController, SETTLE_SECONDS } from '../src/game/phases';
import type { CardId, WeaponId } from '../src/game/types';

type Policy = (offer: CardId[], c: PhaseController) => number;

const prefer =
  (order: CardId[]): Policy =>
  (offer) => {
    for (const id of order) {
      const i = offer.indexOf(id);
      if (i >= 0) return i;
    }
    return 0;
  };

const POLICIES: Record<string, { pick: Policy; weakest: WeaponId[] }> = {
  // Focused single-target: lances and needles plus damage boons.
  focused: { pick: prefer(['light', 'polish', 'needle', 'mend', 'thread', 'bell']), weakest: ['bell', 'thread', 'needle', 'light'] },
  // Crowd control: threads and bells first.
  crowd: { pick: prefer(['thread', 'bell', 'mend', 'polish', 'needle', 'light']), weakest: ['needle', 'light', 'thread', 'bell'] },
  // Balanced composition: take whatever weapon type is least represented.
  mixed: {
    pick: (offer, c) => {
      const counts: Record<string, number> = { needle: 0, light: 0, thread: 0, bell: 0 };
      for (const w of c.sim.slots) if (w) counts[w.defId]++;
      let best = 0;
      let bestScore = Infinity;
      offer.forEach((id, i) => {
        const score = isWeaponId(id) ? counts[id] : id === 'mend' && c.sim.baseHp < 60 ? -1 : 2.5;
        if (score < bestScore) {
          bestScore = score;
          best = i;
        }
      });
      return best;
    },
    weakest: ['needle', 'thread', 'bell', 'light'],
  },
  needleOnly: { pick: prefer(['needle', 'polish', 'mend', 'light', 'thread', 'bell']), weakest: ['bell', 'thread', 'light', 'needle'] },
  bellOnly: { pick: prefer(['bell', 'mend', 'polish', 'thread', 'needle', 'light']), weakest: ['needle', 'light', 'thread', 'bell'] },
};

interface RunResult {
  outcome: string;
  trialReached: number;
  hp: number;
  hpByTrial: number[];
  kills: number;
}

function playRun(seed: number, policy: { pick: Policy; weakest: WeaponId[] }): RunResult {
  const c = new PhaseController(seed);
  c.startRun(seed);
  const hpByTrial: number[] = [];
  for (let guard = 0; guard < 200000; guard++) {
    if (c.isRunning()) {
      const o = c.sim.step();
      c.sim.drainEvents();
      c.handleOutcome(o);
      continue;
    }
    if (c.phase === 'DRAFT' && c.draft) {
      hpByTrial.push(c.sim.baseHp);
      const idx = policy.pick(c.draft.offer, c);
      const id = c.draft.offer[idx];
      c.selectOffer(idx);
      if (isWeaponId(id)) {
        const empty = c.sim.slots.findIndex((s) => !s);
        if (empty >= 0) c.requestPlace(empty);
        else {
          let target = 0;
          for (const kind of policy.weakest) {
            const s = c.sim.slots.findIndex((w) => w?.defId === kind);
            if (s >= 0) {
              target = s;
              break;
            }
          }
          c.requestPlace(target);
          c.confirmReplace();
        }
        c.updatePresentation(SETTLE_SECONDS + 0.01);
      } else c.useBoon();
      c.continueRun();
      continue;
    }
    break;
  }
  return { outcome: c.phase, trialReached: c.sim.trialIndex + 1, hp: c.sim.baseHp, hpByTrial, kills: c.sim.kills };
}

describe('balance report', () => {
  it('prints whole-run results per policy', () => {
    const SEEDS = 30;
    const table: Record<string, { wins: number; avgHp: number; avgTrial: number; hpCurve: string; deaths: string }> = {};
    for (const [name, policy] of Object.entries(POLICIES)) {
      let wins = 0;
      let hpSum = 0;
      let trialSum = 0;
      const curve = new Array(7).fill(0);
      const deaths: number[] = new Array(9).fill(0);
      for (let s = 1; s <= SEEDS; s++) {
        const r = playRun(s * 7919, policy);
        if (r.outcome === 'VICTORY') wins++;
        else deaths[r.trialReached]++;
        hpSum += r.hp;
        trialSum += r.trialReached;
        r.hpByTrial.forEach((h, i) => (curve[i] += h));
      }
      table[name] = {
        wins,
        avgHp: Math.round(hpSum / SEEDS),
        avgTrial: +(trialSum / SEEDS).toFixed(2),
        hpCurve: curve.map((h) => Math.round(h / SEEDS)).join(' '),
        deaths: deaths.slice(1).join(' '),
      };
    }
    console.table(table);
    for (const k of ['focused', 'crowd', 'mixed']) expect(table[k].wins).toBeGreaterThan(0);
    expect(table.needleOnly.wins).toBeLessThanOrEqual(table.mixed.wins);
  }, 120000);
});
