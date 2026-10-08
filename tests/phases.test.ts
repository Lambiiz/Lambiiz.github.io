import { describe, expect, it } from 'vitest';
import { TRIALS, WEAPON_IDS, isWeaponId } from '../src/game/content';
import { FixedStepClock } from '../src/game/clock';
import { generateOffer } from '../src/game/draft';
import { PhaseController, SETTLE_SECONDS } from '../src/game/phases';
import { deriveStream, Rng } from '../src/game/rng';
import type { TrialDef, WeaponId } from '../src/game/types';

const SHORT: TrialDef[] = TRIALS.map((t) => ({ ...t, durationSeconds: 3 }));

function runUntilFrozen(c: PhaseController, maxTicks = 100000) {
  for (let i = 0; i < maxTicks && c.isRunning(); i++) {
    const o = c.sim.step();
    c.sim.drainEvents();
    c.handleOutcome(o);
  }
}

function settle(c: PhaseController) {
  c.updatePresentation(SETTLE_SECONDS + 0.01);
}

function toDraft(seed = 5, trials = SHORT) {
  const c = new PhaseController(seed, { trials });
  c.startRun(seed);
  runUntilFrozen(c);
  return c;
}

function firstWeaponIndex(c: PhaseController) {
  return c.draft!.offer.findIndex((id) => isWeaponId(id));
}

function snapshot(c: PhaseController) {
  const s = c.sim;
  return JSON.stringify({
    t: s.simTime,
    tick: s.tick,
    e: s.enemies,
    p: s.projectiles,
    sp: s.spawnProgress,
    w: s.slots,
    hp: s.baseHp,
  });
}

describe('phase controller', () => {
  it('starts with one Memory Needle and five empty sockets', () => {
    const c = new PhaseController(1);
    expect(c.phase).toBe('TITLE');
    c.startRun(1);
    expect(c.phase).toBe('COMBAT');
    expect(c.sim.slots.filter(Boolean).length).toBe(1);
    expect(c.sim.slots[0]!.defId).toBe('needle');
    expect(c.sim.baseHp).toBe(100);
  });

  it('freezes exactly at the trial boundary and presents three distinct cards', () => {
    const c = toDraft();
    expect(c.phase).toBe('DRAFT');
    expect(c.sim.trialTime).toBe(3);
    expect(c.isRunning()).toBe(false);
    const offer = c.draft!.offer;
    expect(new Set(offer).size).toBe(3);
    expect(offer.every((id) => isWeaponId(id))).toBe(true);
  });

  it('a draft freezes enemies, projectiles, spawn progress, charge and damage', () => {
    const c = toDraft(8, TRIALS.map((t) => ({ ...t, durationSeconds: 12 })));
    const before = snapshot(c);
    const clock = new FixedStepClock();
    for (let i = 0; i < 600; i++) {
      clock.advance(1 / 60, c.isRunning(), () => c.sim.step());
      c.updatePresentation(1 / 60);
    }
    expect(snapshot(c)).toBe(before);
    expect(c.sim.enemies.length).toBeGreaterThan(0);
  });

  it('continue preserves survivors and residual charge and advances the trial', () => {
    const c = toDraft(8, TRIALS.map((t) => ({ ...t, durationSeconds: 12 })));
    const survivors = c.sim.enemies.map((e) => e.id);
    const charge = c.sim.slots[0]!.elapsed;
    const idx = firstWeaponIndex(c);
    c.selectOffer(idx);
    expect(c.requestPlace(3)).toBe('committed');
    expect(c.canContinue()).toBe(false); // still settling
    settle(c);
    expect(c.canContinue()).toBe(true);
    c.continueRun();
    expect(c.phase).toBe('COMBAT');
    expect(c.sim.trialIndex).toBe(1);
    expect(c.sim.trialTime).toBe(0);
    expect(c.sim.enemies.map((e) => e.id)).toEqual(survivors);
    expect(c.sim.slots[0]!.elapsed).toBe(charge);
    expect(c.sim.slots[3]!.elapsed).toBe(0);
  });

  it('invalid drops, cancels and double clicks never consume or duplicate rewards', () => {
    const c = toDraft();
    const idx = firstWeaponIndex(c);
    expect(c.requestPlace(2)).toBe('rejected'); // nothing selected
    c.selectOffer(idx);
    expect(c.requestPlace(9)).toBe('rejected');
    c.cancelSelection();
    expect(c.draft!.stage).toBe('choosing');
    expect(c.sim.slots.filter(Boolean).length).toBe(1);
    c.selectOffer(idx);
    expect(c.requestPlace(1)).toBe('committed');
    expect(c.requestPlace(2)).toBe('rejected');
    c.selectOffer(idx);
    expect(c.requestPlace(2)).toBe('rejected');
    expect(c.sim.slots.filter(Boolean).length).toBe(2);
    expect(c.continueRun()).toBe(false);
    settle(c);
    expect(c.continueRun()).toBe(true);
    expect(c.continueRun()).toBe(false);
  });

  it('occupied sockets require Replace; cancel keeps the old weapon; replace is atomic', () => {
    const c = toDraft();
    const idx = firstWeaponIndex(c);
    const old = c.sim.slots[0]!;
    c.selectOffer(idx);
    expect(c.requestPlace(0)).toBe('confirm');
    expect(c.phase).toBe('PLACEMENT');
    expect(c.sim.slots[0]).toBe(old);
    c.cancelReplace();
    expect(c.draft!.stage).toBe('choosing');
    expect(c.sim.slots[0]).toBe(old);
    c.selectOffer(idx);
    c.requestPlace(0);
    expect(c.confirmReplace()).toBe(true);
    expect(c.confirmReplace()).toBe(false);
    const fresh = c.sim.slots[0]!;
    expect(fresh).not.toBe(old);
    expect(fresh.id).toBeGreaterThan(old.id);
    expect(fresh.elapsed).toBe(0);
    expect(c.sim.slots.filter(Boolean).length).toBe(1);
  });

  it('a full Base replacement leaves exactly six weapons', () => {
    const c = new PhaseController(4, { trials: SHORT });
    c.startRun(4);
    for (let s = 1; s < 6; s++) c.sim.installWeapon(s, WEAPON_IDS[s % 4]);
    runUntilFrozen(c);
    const idx = firstWeaponIndex(c);
    c.selectOffer(idx);
    for (let s = 0; s < 6; s++) {
      expect(c.requestPlace(s)).toBe('confirm');
      c.cancelReplace();
      c.selectOffer(idx);
    }
    c.requestPlace(4);
    c.confirmReplace();
    expect(c.sim.slots.filter(Boolean).length).toBe(6);
    expect(new Set(c.sim.slots.map((w) => w!.id)).size).toBe(6);
  });

  it('boons never occupy a socket and resolve only through Use', () => {
    const trials = TRIALS.map((t) => ({ ...t, durationSeconds: 2 }));
    // Find a seed whose third draft contains a boon.
    for (let seed = 1; seed < 200; seed++) {
      const c = new PhaseController(seed, { trials });
      c.startRun(seed);
      c.sim.baseHp = 50;
      let boonIdx = -1;
      for (let d = 0; d < 3; d++) {
        runUntilFrozen(c);
        if (c.phase !== 'DRAFT') break;
        boonIdx = c.draft!.offer.findIndex((id) => !isWeaponId(id));
        if (d < 2) {
          expect(boonIdx).toBe(-1);
          c.selectOffer(firstWeaponIndex(c));
          c.requestPlace(d + 1);
          settle(c);
          c.continueRun();
        }
      }
      if (boonIdx < 0 || c.phase !== 'DRAFT') continue;
      const before = c.sim.slots.map((w) => w?.id ?? null);
      c.selectOffer(boonIdx);
      expect(c.requestPlace(5)).toBe('rejected');
      expect(c.sim.slots.map((w) => w?.id ?? null)).toEqual(before);
      expect(c.canContinue()).toBe(false);
      const hp = c.sim.baseHp;
      const stacks = c.sim.polishStacks;
      expect(c.useBoon()).toBe(true);
      expect(c.useBoon()).toBe(false);
      expect(c.sim.baseHp > hp || c.sim.polishStacks > stacks).toBe(true);
      expect(c.sim.baseHp).toBeLessThanOrEqual(100);
      expect(c.canContinue()).toBe(true);
      return;
    }
    throw new Error('no boon found in 200 seeds');
  });

  it('manual pause freezes and resume returns; visibility suspension preserves draft context', () => {
    const c = new PhaseController(2, { trials: SHORT });
    c.startRun(2);
    expect(c.pause()).toBe(true);
    expect(c.phase).toBe('PAUSED');
    expect(c.isRunning()).toBe(false);
    c.resume();
    expect(c.phase).toBe('COMBAT');
    c.suspend();
    expect(c.phase).toBe('PAUSED');
    expect(c.pauseReason).toBe('suspended');
    c.resume();
    runUntilFrozen(c);
    const idx = firstWeaponIndex(c);
    c.selectOffer(idx);
    c.requestPlace(0); // confirm pending
    c.suspend();
    expect(c.suspended).toBe(true);
    expect(c.confirmReplace()).toBe(false);
    c.resume();
    expect(c.draft!.stage).toBe('confirmReplace');
    expect(c.confirmReplace()).toBe(true);
  });

  it('runs a whole short campaign into clearing and an ending, with one transition per boundary', () => {
    const c = new PhaseController(12, { trials: TRIALS.map((t) => ({ ...t, durationSeconds: 4 })) });
    c.startRun(12);
    const phases: string[] = [];
    c.on((e) => {
      if (e.type === 'phase') phases.push(e.to);
    });
    let slot = 1;
    for (let guard = 0; guard < 50; guard++) {
      runUntilFrozen(c);
      if (c.phase === 'DRAFT') {
        const idx = firstWeaponIndex(c);
        c.selectOffer(idx);
        if (slot < 6) c.requestPlace(slot++);
        else {
          c.requestPlace(0);
          c.confirmReplace();
        }
        settle(c);
        c.continueRun();
      } else break;
    }
    expect(['VICTORY', 'DEFEAT']).toContain(c.phase);
    expect(phases.filter((p) => p === 'DRAFT' || p === 'PLACEMENT').length).toBeGreaterThan(0);
    expect(phases.filter((p) => p === 'VICTORY' || p === 'DEFEAT').length).toBe(1);
  });

  it('restart discards the old run completely', () => {
    const c = toDraft(3);
    c.selectOffer(firstWeaponIndex(c));
    c.startRun(77);
    expect(c.phase).toBe('COMBAT');
    expect(c.draft).toBeNull();
    expect(c.sim.trialIndex).toBe(0);
    expect(c.sim.enemies.length).toBe(0);
    expect(c.sim.slots.filter(Boolean).length).toBe(1);
    expect(c.sim.baseHp).toBe(100);
    expect(c.seed).toBe(77);
  });
});

describe('offers', () => {
  it('obey distinctness, weapon minimums, unowned inclusion and boon eligibility over many seeds', () => {
    for (let seed = 1; seed < 400; seed++) {
      const rng = new Rng(seed);
      for (let d = 0; d < 7; d++) {
        const owned = new Set<WeaponId>(WEAPON_IDS.filter(() => rng.next() < 0.5));
        const polishStacks = rng.int(3);
        const baseHp = rng.next() < 0.3 ? 100 : 60;
        const offer = generateOffer(rng, { draftIndex: d, ownedWeapons: owned, polishStacks, baseHp });
        expect(new Set(offer).size).toBe(3);
        const weapons = offer.filter((id) => isWeaponId(id));
        expect(weapons.length).toBeGreaterThanOrEqual(2);
        if (d < 2) expect(weapons.length).toBe(3);
        if (owned.size < 4) expect(weapons.some((w) => !owned.has(w as WeaponId))).toBe(true);
        if (polishStacks >= 2) expect(offer).not.toContain('polish');
        if (baseHp >= 100) expect(offer).not.toContain('mend');
      }
    }
  });

  it('independent RNG streams: cosmetic draws cannot change offers or spawns', () => {
    const a = deriveStream(42, 'offers');
    const b = deriveStream(42, 'offers');
    const cosmetic = deriveStream(42, 'cosmetic');
    for (let i = 0; i < 1000; i++) cosmetic.next();
    for (let i = 0; i < 20; i++) expect(a.next()).toBe(b.next());
    const s1 = new PhaseController(42);
    const s2 = new PhaseController(42);
    s1.startRun(42);
    s2.startRun(42);
    for (let i = 0; i < 1200; i++) {
      s1.sim.step();
      s2.sim.step();
    }
    expect(JSON.stringify(s1.sim.enemies)).toBe(JSON.stringify(s2.sim.enemies));
  });
});
