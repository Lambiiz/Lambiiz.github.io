import { describe, expect, it } from 'vitest';
import { cardDef, isWeaponId, SLOTS_UNLOCKED_AT_START, STARTING_DECK, TRIALS, TURN } from '../src/game/content';
import { FixedStepClock } from '../src/game/clock';
import { PhaseController } from '../src/game/phases';
import type { CardId, TrialDef } from '../src/game/types';

const SHORT: TrialDef[] = TRIALS.map((t) => ({ ...t, durationSeconds: 3 }));
const [OPEN_A, OPEN_B] = SLOTS_UNLOCKED_AT_START;
const LOCKED = [0, 1, 2, 3, 4, 5].find((i) => !SLOTS_UNLOCKED_AT_START.includes(i))!;

function runUntilFrozen(c: PhaseController, maxTicks = 100000) {
  for (let i = 0; i < maxTicks && c.isRunning(); i++) {
    const o = c.sim.step();
    c.sim.drainEvents();
    c.handleOutcome(o);
  }
}

function newRun(seed = 5, opts: { trials?: TrialDef[]; deck?: CardId[] } = {}) {
  const c = new PhaseController(seed, { trials: opts.trials ?? SHORT, deck: opts.deck });
  c.startRun(seed);
  return c;
}

const handIds = (c: PhaseController) => c.deck.hand.map((x) => x.defId);
const uidOf = (c: PhaseController, id: CardId) => c.deck.hand.find((x) => x.defId === id)!.uid;
const towerUid = (c: PhaseController) => c.deck.hand.find((x) => isWeaponId(x.defId))!.uid;

function snapshot(c: PhaseController) {
  const s = c.sim;
  return JSON.stringify({ t: s.simTime, e: s.enemies, p: s.projectiles, sp: s.spawnProgress, w: s.slots, hp: s.baseHp });
}

describe('turn loop', () => {
  it('a run opens with a turn: 4 cards including the tower, 6 energy, empty sockets', () => {
    for (let seed = 1; seed < 60; seed++) {
      const c = newRun(seed);
      expect(c.phase).toBe('TURN');
      expect(c.turn!.turnIndex).toBe(0);
      expect(c.turn!.energy).toBe(TURN.energyPerTurn);
      expect(c.deck.hand.length).toBe(TURN.handDraw);
      expect(handIds(c)).toContain('needle');
      expect(c.deck.size).toBe(STARTING_DECK.length);
      expect(c.sim.slots.every((w) => w === null)).toBe(true);
    }
  });

  it('placing a tower costs 3 and removes it from the deck cycle; locked sockets are refused', () => {
    const c = newRun();
    const t = towerUid(c);
    expect(c.playCard(t, LOCKED)).toBe('locked');
    expect(c.playCard(t)).toBe('needsTarget');
    expect(c.turn!.stage).toBe('targeting');
    expect(c.playCard(t, OPEN_A)).toBe('played');
    expect(c.sim.slots[OPEN_A]!.defId).toBe('needle');
    expect(c.turn!.energy).toBe(TURN.energyPerTurn - cardDef('needle').cost);
    expect(c.deck.size).toBe(STARTING_DECK.length - 1);
    expect(c.deck.inHand(t)).toBeUndefined();
  });

  it('energy limits play; unaffordable cards stay in hand', () => {
    const deck: CardId[] = ['needle', 'light', 'thread', 'bell'];
    const c = newRun(3, { deck });
    const uids = c.deck.hand.map((x) => x.uid);
    expect(c.playCard(uids[0], OPEN_A)).toBe('played');
    expect(c.playCard(uids[1], OPEN_B)).toBe('played');
    expect(c.turn!.energy).toBe(0);
    expect(c.playCard(uids[2], OPEN_A)).toBe('noEnergy');
    expect(c.deck.hand.length).toBe(2);
  });

  it('occupied socket: confirm Replace destroys the old tower; cancel keeps everything', () => {
    const deck: CardId[] = ['needle', 'light', 'mend', 'mend'];
    const c = newRun(4, { deck });
    c.playCard(uidOf(c, 'needle'), OPEN_A);
    const old = c.sim.slots[OPEN_A]!;
    const light = uidOf(c, 'light');
    expect(c.playCard(light, OPEN_A)).toBe('confirm');
    expect(c.sim.slots[OPEN_A]).toBe(old);
    expect(c.canEndTurn()).toBe(false);
    c.cancel();
    expect(c.turn!.stage).toBe('idle');
    expect(c.deck.inHand(light)).toBeDefined();
    expect(c.playCard(light, OPEN_A)).toBe('confirm');
    expect(c.confirmReplace()).toBe(true);
    expect(c.confirmReplace()).toBe(false);
    expect(c.sim.slots[OPEN_A]!.defId).toBe('light');
    expect(c.sim.slots[OPEN_A]!.elapsed).toBe(0);
    // the destroyed needle is nowhere in the deck
    const all = [...c.deck.drawPile, ...c.deck.hand, ...c.deck.discard].map((x) => x.defId);
    expect(all).not.toContain('needle');
    expect(c.turn!.energy).toBe(0);
  });

  it('passives stack permanently and go to the discard pile; actives and towers leave the deck', () => {
    const deck: CardId[] = ['needle', 'swift', 'keen', 'sturdy', 'stray'];
    const c = newRun(6, { deck });
    expect(c.deck.hand.length).toBe(4);
    const hand = handIds(c);
    for (const id of hand) expect(c.playCard(uidOf(c, id), id === 'needle' ? OPEN_A : undefined)).toBe('played');
    if (hand.includes('swift')) expect(c.sim.mods.attackSpeed).toBeCloseTo(0.05);
    if (hand.includes('keen')) expect(c.sim.mods.damage).toBeCloseTo(0.05);
    if (hand.includes('sturdy')) {
      expect(c.sim.maxHp).toBeCloseTo(105);
      expect(c.sim.baseHp).toBeCloseTo(105); // the added max Integrity is restored
    }
    if (hand.includes('stray')) expect(c.sim.actives).toEqual([{ defId: 'stray', count: 1, elapsed: 0, uses: 0 }]);
    const passives = hand.filter((id) => cardDef(id).type === 'passive');
    const gone = hand.filter((id) => cardDef(id).type !== 'passive');
    expect(c.deck.discard.map((x) => x.defId).sort()).toEqual([...passives].sort());
    expect(c.deck.size).toBe(deck.length - gone.length);
  });

  it('a passive played again stacks again', () => {
    const c = newRun(6, { deck: ['needle', 'keen'] });
    c.playCard(uidOf(c, 'keen'));
    c.endTurn();
    runUntilFrozen(c);
    // the deck held 2 (< 4): the keen came back from the discard pile, plus Dust
    c.playCard(uidOf(c, 'keen'));
    expect(c.sim.mods.damage).toBeCloseTo(0.1);
  });

  it('a deck below 4 cards is topped up with Dust at the start of a turn', () => {
    const c = newRun(6, { deck: ['needle', 'keen'] });
    expect(c.deck.size).toBe(TURN.minDeckSize);
    expect([...c.deck.drawPile, ...c.deck.hand].filter((x) => x.defId === 'dust').length).toBe(2);
    expect(handIds(c)).toContain('needle'); // the opening tower guarantee still holds
  });

  it('Dust cannot be played, but can be sacrificed or purged, and is never offered', () => {
    const c = newRun(6, { deck: ['needle', 'dust', 'dust', 'dust'] });
    const dust = c.deck.hand.filter((x) => x.defId === 'dust');
    expect(c.canAfford(dust[0].uid)).toBe(false);
    expect(c.playCard(dust[0].uid)).toBe('unplayable');
    expect(c.turn!.energy).toBe(TURN.energyPerTurn);
    c.toggleMark(dust[0].uid);
    c.toggleMark(dust[1].uid);
    expect(c.sacrifice()).toBe(true);
    expect(c.turn!.offers).not.toContain('dust'); // a Dust pair guarantees nothing
    c.chooseOffer(0);
    c.toggleMark(dust[2].uid);
    expect(c.purge()).toBe(true);
  });

  it('spells never need a target', () => {
    const c = newRun(6, { deck: ['needle', 'mend', 'farsight', 'keen'] });
    for (const x of c.deck.hand) expect(c.needsTarget(x.uid)).toBe(isWeaponId(x.defId));
  });

  it('end turn discards the hand, combat freezes at the boundary, and the next turn draws 4', () => {
    const c = newRun(8);
    c.playCard(towerUid(c), OPEN_A);
    const handBefore = c.deck.hand.length;
    expect(c.endTurn()).toBe(true);
    expect(c.phase).toBe('COMBAT');
    expect(c.deck.hand.length).toBe(0);
    expect(c.deck.discard.length).toBe(handBefore);
    expect(c.sim.trialIndex).toBe(0); // the opening turn precedes wave 1
    runUntilFrozen(c);
    expect(c.phase).toBe('TURN');
    expect(c.turn!.turnIndex).toBe(1);
    expect(c.deck.hand.length).toBe(TURN.handDraw);
    expect(c.turn!.energy).toBe(TURN.energyPerTurn);
    c.endTurn();
    expect(c.sim.trialIndex).toBe(1);
  });

  it('modifiers and actives persist across waves', () => {
    const c = newRun(9, { deck: ['needle', 'keen', 'mend', 'swift'] });
    c.playCard(uidOf(c, 'needle'), OPEN_A);
    c.playCard(uidOf(c, 'keen'));
    c.playCard(uidOf(c, 'mend'));
    c.endTurn();
    runUntilFrozen(c);
    expect(c.sim.mods.damage).toBeCloseTo(0.05);
    expect(c.sim.actives.length).toBe(1);
  });

  it('a turn freezes enemies, projectiles, spawn progress, charge and damage', () => {
    const c = newRun(8, { trials: TRIALS.map((t) => ({ ...t, durationSeconds: 12 })) });
    c.playCard(towerUid(c), OPEN_A);
    c.endTurn();
    runUntilFrozen(c);
    const before = snapshot(c);
    const clock = new FixedStepClock();
    for (let i = 0; i < 600; i++) clock.advance(1 / 60, c.isRunning(), () => c.sim.step());
    expect(snapshot(c)).toBe(before);
    expect(c.sim.enemies.length).toBeGreaterThan(0);
  });
});

describe('sacrifice and purge', () => {
  it('two marked cards are sacrificed for a 1-of-3 choice that goes to the hand; unlimited per turn', () => {
    const c = newRun(10, { deck: ['needle', 'mend', 'stray', 'keen', 'swift', 'farsight', 'mend', 'stray'] });
    const sizeBefore = c.deck.size;
    const [a, b] = c.deck.hand.filter((x) => !isWeaponId(x.defId)).map((x) => x.uid);
    c.toggleMark(a);
    expect(c.sacrifice()).toBe(false); // needs two
    c.toggleMark(b);
    expect(c.sacrifice()).toBe(true);
    expect(c.turn!.stage).toBe('sacrificeChoice');
    expect(c.turn!.offers!.length).toBe(3);
    expect(new Set(c.turn!.offers).size).toBe(3);
    expect(c.canEndTurn()).toBe(false);
    expect(c.chooseOffer(1)).toBe(true);
    expect(c.deck.size).toBe(sizeBefore - 1);
    expect(c.deck.hand.length).toBe(TURN.handDraw - 1);
    // a second sacrifice in the same turn is allowed
    const rest = c.deck.hand.map((x) => x.uid);
    c.toggleMark(rest[0]);
    c.toggleMark(rest[1]);
    expect(c.sacrifice()).toBe(true);
    expect(c.chooseOffer(0)).toBe(true);
  });

  it('sacrificing two identical cards guarantees that card among the offers', () => {
    for (let seed = 1; seed < 80; seed++) {
      const c = newRun(seed, { deck: ['needle', 'mend', 'mend', 'mend'] });
      const mends = c.deck.hand.filter((x) => x.defId === 'mend').map((x) => x.uid);
      c.toggleMark(mends[0]);
      c.toggleMark(mends[1]);
      c.sacrifice();
      expect(c.turn!.offers).toContain('mend');
    }
  });

  it('purge removes one marked card from the deck, once per turn', () => {
    const c = newRun(11);
    const size = c.deck.size;
    const [a, b] = c.deck.hand.map((x) => x.uid);
    c.toggleMark(a);
    expect(c.purge()).toBe(true);
    expect(c.deck.size).toBe(size - 1);
    c.toggleMark(b);
    expect(c.purge()).toBe(false);
    expect(c.deck.size).toBe(size - 1);
  });

  it('a third mark replaces the oldest; marks never exceed two', () => {
    const c = newRun(12);
    const [a, b, d] = c.deck.hand.map((x) => x.uid);
    c.toggleMark(a);
    c.toggleMark(b);
    c.toggleMark(d);
    expect(c.turn!.marked).toEqual([b, d]);
    c.toggleMark(b);
    expect(c.turn!.marked).toEqual([d]);
  });
});

describe('suspension, pause and endings', () => {
  it('manual pause and visibility suspension preserve context', () => {
    const c = newRun(2);
    c.playCard(towerUid(c)); // targeting
    c.suspend();
    expect(c.suspended).toBe(true);
    expect(c.playCard(towerUid(c), OPEN_A)).toBe('invalid');
    expect(c.endTurn()).toBe(false);
    c.resume();
    expect(c.turn!.stage).toBe('targeting');
    expect(c.playCard(towerUid(c), OPEN_A)).toBe('played');
    c.endTurn();
    expect(c.pause()).toBe(true);
    expect(c.isRunning()).toBe(false);
    c.resume();
    expect(c.phase).toBe('COMBAT');
  });

  it('a whole short run reaches an ending with one ending transition', () => {
    const c = newRun(12, { trials: TRIALS.map((t) => ({ ...t, durationSeconds: 4 })) });
    const phases: string[] = [];
    c.on((e) => {
      if (e.type === 'phase') phases.push(e.to);
    });
    for (let guard = 0; guard < 50 && c.phase === 'TURN'; guard++) {
      for (const card of [...c.deck.hand]) {
        const free = SLOTS_UNLOCKED_AT_START.find((s) => !c.sim.slots[s]);
        if (isWeaponId(card.defId) && free !== undefined) c.playCard(card.uid, free);
        else if (!c.needsTarget(card.uid)) c.playCard(card.uid);
      }
      c.endTurn();
      runUntilFrozen(c);
    }
    expect(['VICTORY', 'DEFEAT']).toContain(c.phase);
    expect(phases.filter((p) => p === 'VICTORY' || p === 'DEFEAT').length).toBe(1);
  });

  it('restart discards the old run completely', () => {
    const c = newRun(3);
    c.playCard(towerUid(c), OPEN_A);
    c.toggleMark(c.deck.hand[0].uid);
    c.startRun(77);
    expect(c.phase).toBe('TURN');
    expect(c.turn!.turnIndex).toBe(0);
    expect(c.turn!.marked).toEqual([]);
    expect(c.sim.slots.every((w) => !w)).toBe(true);
    expect(c.deck.size).toBe(STARTING_DECK.length);
    expect(c.sim.baseHp).toBe(100);
    expect(c.seed).toBe(77);
  });
});
