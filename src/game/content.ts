// All tunable gameplay data lives here. Values are starting hypotheses (balance is not tuned yet);
// see docs/TUNING.md.
import type { ActiveDef, ActiveId, CardDef, CardId, CardType, EnemyDef, EnemyKind, PassiveId, SpellDef, SpellId, StatMods, TrialDef, WeaponDef, WeaponId } from './types';

export const FIXED_DT = 1 / 60;
export const MAX_FRAME_DELTA = 0.1;
export const MAX_STEPS_PER_FRAME = 6;

export const BASE = {
  halfX: 5.0, // 10.0 wide (holds the 3x2 socket grid of 2.65 x 3.54 cards)
  halfZ: 4.5, // 9.0 deep
  maxHealth: 100,
};

/** The arena is large: foes spawn far out and take ~15–40 s to reach the Base. */
export const ARENA = {
  boardRadius: 27, // inked arena circle on the table
  spawnRadius: 24,
};

export const SLOT_COUNT = 6;
/** Sockets open at the start of a run (the two centre sockets). The rest unlock later in a run. */
export const SLOTS_UNLOCKED_AT_START = [1, 4];

export const TURN = {
  handDraw: 4,
  energyPerTurn: 6,
  purgesPerTurn: 1,
};

/** Energy cost per card type at common rarity. */
export const COST: Record<CardType, number> = { tower: 3, active: 1, passive: 1 };

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  needle: {
    id: 'needle',
    name: 'Memory Needle',
    type: 'tower',
    cost: COST.tower,
    rarity: 'common',
    pattern: 'projectile',
    interval: 0.9,
    damage: 6,
    range: 14,
    projectileSpeed: 24,
    projectileLife: 1.4,
    summary: 'Fires a homing needle at the nearest foe. Medium range.',
  },
  light: {
    id: 'light',
    name: 'Last Light',
    type: 'tower',
    cost: COST.tower,
    rarity: 'common',
    pattern: 'lance',
    interval: 2.6,
    damage: 30,
    range: 22,
    summary: 'A heavy instant lance at the nearest foe. Long range, slow.',
  },
  thread: {
    id: 'thread',
    name: 'Kindred Thread',
    type: 'tower',
    cost: COST.tower,
    rarity: 'common',
    pattern: 'chain',
    interval: 2.0,
    damage: 9,
    range: 13,
    chainDamage: [9, 7, 5],
    chainHopRange: 2.6,
    summary: 'Strikes the nearest foe, then jumps to up to 2 more nearby.',
  },
  bell: {
    id: 'bell',
    name: 'Mercy Bell',
    type: 'tower',
    cost: COST.tower,
    rarity: 'common',
    pattern: 'pulse',
    interval: 2.8,
    damage: 10,
    range: 8.5,
    pulseRadius: 8.5,
    summary: 'Hits every foe near the vessel at once. Short range.',
  },
};

/**
 * Passive cards are permanent run-wide modifiers. Active cards install a repeating effect with its
 * own cooldown; every extra copy divides that cooldown. Both leave the deck once played.
 * Text markup: {+...} renders as a bonus (green), {-...} as a drawback (red).
 */
export const SPELLS: Record<SpellId, SpellDef> = {
  swift: { id: 'swift', name: 'Quickened Pulse', type: 'passive', cost: COST.passive, rarity: 'common', stat: 'attackSpeed', amount: 0.05, summary: '{+5% attack speed} for all towers.' },
  keen: { id: 'keen', name: 'Sharpened Grief', type: 'passive', cost: COST.passive, rarity: 'common', stat: 'damage', amount: 0.05, summary: '{+5% damage} for all towers.' },
  farsight: { id: 'farsight', name: 'Far Remembrance', type: 'passive', cost: COST.passive, rarity: 'common', stat: 'range', amount: 0.05, summary: '{+5% range} for all towers.' },
  sturdy: { id: 'sturdy', name: 'Sturdy Vessel', type: 'passive', cost: COST.passive, rarity: 'common', stat: 'maxIntegrity', amount: 0.05, summary: '{+5% max Integrity}. Also restores the added amount.' },
  stray: {
    id: 'stray',
    name: 'Stray Memory',
    type: 'active',
    cost: COST.active,
    rarity: 'common',
    cooldown: 4,
    effect: { kind: 'strike', dpsRatio: 0.5 },
    summary: 'During waves, every 4 s: strike a random foe for {+50% of your average tower DPS}.',
  },
  mend: {
    id: 'mend',
    name: 'Mend the Vessel',
    type: 'active',
    cost: COST.active,
    rarity: 'common',
    cooldown: 8,
    effect: { kind: 'heal', amount: 5 },
    summary: 'During waves, every 8 s: restore {+5 Integrity}.',
  },
};

/** Extra copies of an active card divide its cooldown: n copies fire n times as often. */
export function activeCooldown(id: ActiveId, count: number): number {
  return (SPELLS[id] as ActiveDef).cooldown / Math.max(1, count);
}

export const WEAPON_IDS: WeaponId[] = ['needle', 'light', 'thread', 'bell'];
export const PASSIVE_IDS: PassiveId[] = ['swift', 'keen', 'farsight', 'sturdy'];
export const ACTIVE_IDS: ActiveId[] = ['stray', 'mend'];
export const SPELL_IDS: SpellId[] = [...PASSIVE_IDS, ...ACTIVE_IDS];
export const CARD_IDS: CardId[] = [...WEAPON_IDS, ...SPELL_IDS];

/** 10 cards: one tower (always in the opening hand) and nine commons. */
export const STARTING_DECK: CardId[] = ['needle', 'swift', 'swift', 'keen', 'keen', 'farsight', 'sturdy', 'stray', 'stray', 'mend'];

export const NO_MODS: StatMods = { attackSpeed: 0, damage: 0, range: 0, maxIntegrity: 0 };

export function cardDef(id: CardId): CardDef {
  return (WEAPONS as Record<string, CardDef>)[id] ?? (SPELLS as Record<string, CardDef>)[id];
}

export function isWeaponId(id: CardId): id is WeaponId {
  return id in WEAPONS;
}

/** Foes are small game pieces; many of them, individually weak. */
export const ENEMIES: Record<EnemyKind, EnemyDef> = {
  echo: { kind: 'echo', name: 'Veiled Echo', hp: 6, speed: 0.9, contactDamage: 3, radius: 0.45 },
  moth: { kind: 'moth', name: 'Folded Moth', hp: 3, speed: 1.4, contactDamage: 2, radius: 0.37 },
  urn: { kind: 'urn', name: 'Burden Urn', hp: 24, speed: 0.5, contactDamage: 8, radius: 0.62 },
};

export const ENEMY_KINDS: EnemyKind[] = ['echo', 'moth', 'urn'];

/** Soft collision between foes (presentation of a swarm; deterministic). */
export const CROWD = {
  cellSize: 1.0,
  stiffness: 0.5, // fraction of overlap resolved per tick
  maxPush: 0.06, // per enemy per tick
};

/** Eight waves. HP multiplier follows 1 + 0.1*(wave-1). */
export const TRIALS: TrialDef[] = [
  { durationSeconds: 30, spawnRateStart: 0.51, spawnRateEnd: 0.85, weights: { echo: 1 }, hpMultiplier: 1.0, packSize: [1, 3], forecast: 'Veiled Echoes gather at the edge of the table.' },
  { durationSeconds: 30, spawnRateStart: 0.77, spawnRateEnd: 1.1, weights: { echo: 0.7, moth: 0.3 }, hpMultiplier: 1.1, packSize: [2, 4], forecast: 'Folded Moths join — fast and fragile.' },
  { durationSeconds: 30, spawnRateStart: 0.85, spawnRateEnd: 1.27, weights: { echo: 0.6, moth: 0.25, urn: 0.15 }, hpMultiplier: 1.2, packSize: [2, 4], forecast: 'The first Burden Urns: slow, heavy, hard to break.' },
  { durationSeconds: 30, spawnRateStart: 1.02, spawnRateEnd: 1.53, weights: { echo: 0.5, moth: 0.3, urn: 0.2 }, hpMultiplier: 1.3, packSize: [2, 5], forecast: 'A mixed procession of all three.' },
  { durationSeconds: 30, spawnRateStart: 1.22, spawnRateEnd: 1.77, weights: { echo: 0.8, moth: 0.14, urn: 0.06 }, hpMultiplier: 1.4, packSize: [4, 8], forecast: 'Crowd: a dense tide of Veiled Echoes.' },
  { durationSeconds: 30, spawnRateStart: 1.22, spawnRateEnd: 1.71, weights: { moth: 0.7, echo: 0.24, urn: 0.06 }, hpMultiplier: 1.5, packSize: [3, 7], forecast: 'Swarm: fast Folded Moths from every side.' },
  { durationSeconds: 30, spawnRateStart: 0.85, spawnRateEnd: 1.27, weights: { urn: 0.45, echo: 0.4, moth: 0.15 }, hpMultiplier: 1.6, packSize: [2, 4], forecast: 'Burden: a procession of armored Urns.' },
  { durationSeconds: 30, spawnRateStart: 1.25, spawnRateEnd: 1.85, weights: { echo: 0.5, moth: 0.35, urn: 0.15 }, hpMultiplier: 1.7, packSize: [3, 6], forecast: 'The final wave. Then the way home opens.' },
];

export const TRIAL_COUNT = TRIALS.length;

export const STAKES_LINE = 'Reclaim your memories. Endure eight waves. Return to life.';
