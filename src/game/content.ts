// All tunable gameplay data lives here. Values are starting hypotheses (balance is not tuned yet);
// see docs/TUNING.md.
import type { CardDef, CardId, CardType, EnemyDef, EnemyKind, SpellDef, SpellId, TrialDef, WeaponDef, WeaponId } from './types';

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
    summary: 'Steady homing needle. Medium range, single target.',
    flavor: 'It remembers where the crack began.',
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
    summary: 'Heavy instant lance. Long range, single target.',
    flavor: 'The final sunrise, held in two lenses.',
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
    summary: 'Chains through up to 3 nearby foes.',
    flavor: 'What was bound in life stays bound.',
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
    summary: 'Rings every foe close to the Base. Short range.',
    flavor: 'Rung once for every name forgotten.',
  },
};

/** Placeholder active and passive cards. Passive effects last through the next wave. */
export const SPELLS: Record<SpellId, SpellDef> = {
  mend: {
    id: 'mend',
    name: 'Mend the Vessel',
    type: 'active',
    cost: COST.active,
    rarity: 'common',
    effect: { kind: 'heal', amount: 10 },
    target: 'none',
    summary: 'Restore 10 Integrity.',
    flavor: 'Gold in the seams, stronger than before.',
  },
  ash: {
    id: 'ash',
    name: 'Scatter Ash',
    type: 'active',
    cost: COST.active,
    rarity: 'common',
    effect: { kind: 'blast', damage: 12, radius: 10 },
    target: 'none',
    summary: 'When the next wave begins, deal 12 to every foe within 10 of the Base.',
    flavor: 'What burns once remembers the fire.',
  },
  quicken: {
    id: 'quicken',
    name: 'Quicken',
    type: 'active',
    cost: COST.active,
    rarity: 'common',
    effect: { kind: 'charge' },
    target: 'tower',
    summary: 'Fill one placed tower to full charge.',
    flavor: 'The sand forgets to fall.',
  },
  polish: {
    id: 'polish',
    name: 'Polished Memory',
    type: 'passive',
    cost: COST.passive,
    rarity: 'common',
    effect: { kind: 'damageBonus', amount: 0.15 },
    target: 'none',
    summary: 'Next wave: all towers deal +15% damage.',
    flavor: 'Rubbed bright by repetition.',
  },
  heavy: {
    id: 'heavy',
    name: 'Heavy Air',
    type: 'passive',
    cost: COST.passive,
    rarity: 'common',
    effect: { kind: 'slow', factor: 0.8 },
    target: 'none',
    summary: 'Next wave: foes move 20% slower.',
    flavor: 'Even the dead tire of walking.',
  },
};

export const WEAPON_IDS: WeaponId[] = ['needle', 'light', 'thread', 'bell'];
export const SPELL_IDS: SpellId[] = ['mend', 'ash', 'quicken', 'polish', 'heavy'];
export const CARD_IDS: CardId[] = [...WEAPON_IDS, ...SPELL_IDS];

/** 10 cards: one tower (always in the opening hand) and nine placeholder commons. */
export const STARTING_DECK: CardId[] = ['needle', 'mend', 'mend', 'ash', 'ash', 'quicken', 'quicken', 'polish', 'polish', 'heavy'];

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
