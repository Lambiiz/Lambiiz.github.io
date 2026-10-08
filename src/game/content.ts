// All tunable gameplay data lives here. Values are starting hypotheses tuned by
// tests/balance.report.test.ts — see docs/TUNING.md for the reasoning.
import type { BoonDef, CardDef, CardId, EnemyDef, EnemyKind, TrialDef, WeaponDef, WeaponId } from './types';

export const FIXED_DT = 1 / 60;
export const MAX_FRAME_DELTA = 0.1;
export const MAX_STEPS_PER_FRAME = 6;

export const BASE = {
  halfX: 3.9, // 7.8 wide
  halfZ: 3.5, // 7.0 deep (adjusted from 6.7 after composition review to give the emitter seam room)
  maxHealth: 100,
};

export const ARENA = {
  boardRadius: 10.6,
  spawnRadius: 9.5,
};

export const SLOT_COUNT = 6;

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  needle: {
    id: 'needle',
    name: 'Memory Needle',
    kind: 'weapon',
    pattern: 'projectile',
    interval: 1.2,
    damage: 9,
    range: 11,
    projectileSpeed: 18,
    projectileLife: 2,
    summary: 'Fast homing needle. Single target.',
    flavor: 'It remembers where the crack began.',
  },
  light: {
    id: 'light',
    name: 'Last Light',
    kind: 'weapon',
    pattern: 'lance',
    interval: 3.0,
    damage: 32,
    range: 11,
    summary: 'Heavy instant lance. Single target.',
    flavor: 'The final sunrise, held in two lenses.',
  },
  thread: {
    id: 'thread',
    name: 'Kindred Thread',
    kind: 'weapon',
    pattern: 'chain',
    interval: 2.4,
    damage: 12,
    range: 11,
    chainDamage: [12, 9, 7],
    chainHopRange: 3.2,
    summary: 'Chains through up to 3 nearby foes.',
    flavor: 'What was bound in life stays bound.',
  },
  bell: {
    id: 'bell',
    name: 'Mercy Bell',
    kind: 'weapon',
    pattern: 'pulse',
    interval: 3.2,
    damage: 16,
    range: 6.8,
    pulseRadius: 6.8,
    summary: 'Rings all foes near the Base.',
    flavor: 'Rung once for every name forgotten.',
  },
};

export const BOONS: Record<'polish' | 'mend', BoonDef> = {
  polish: {
    id: 'polish',
    name: 'Polished Memory',
    kind: 'boon',
    summary: '+15% damage for all weapons (max 2).',
    flavor: 'Rubbed bright by repetition.',
  },
  mend: {
    id: 'mend',
    name: 'Mend the Vessel',
    kind: 'boon',
    summary: 'Restore 20 Integrity.',
    flavor: 'Gold in the seams, stronger than before.',
  },
};

export const BOON_TUNING = {
  polishPerStack: 0.15,
  polishMaxStacks: 2,
  mendAmount: 20,
};

export const WEAPON_IDS: WeaponId[] = ['needle', 'light', 'thread', 'bell'];
export const BOON_IDS: ('polish' | 'mend')[] = ['polish', 'mend'];

export function cardDef(id: CardId): CardDef {
  return (WEAPONS as Record<string, CardDef>)[id] ?? (BOONS as Record<string, CardDef>)[id];
}

export function isWeaponId(id: CardId): id is WeaponId {
  return id in WEAPONS;
}

export const ENEMIES: Record<EnemyKind, EnemyDef> = {
  echo: { kind: 'echo', name: 'Veiled Echo', hp: 18, speed: 0.7, contactDamage: 6, radius: 0.42 },
  moth: { kind: 'moth', name: 'Folded Moth', hp: 10, speed: 1.15, contactDamage: 4, radius: 0.36 },
  urn: { kind: 'urn', name: 'Burden Urn', hp: 65, speed: 0.4, contactDamage: 14, radius: 0.55 },
};

export const ENEMY_KINDS: EnemyKind[] = ['echo', 'moth', 'urn'];

/** Eight trials. HP multiplier follows 1 + 0.1*(trial-1). */
export const TRIALS: TrialDef[] = [
  {
    durationSeconds: 30,
    spawnRateStart: 0.28,
    spawnRateEnd: 0.42,
    weights: { echo: 1 },
    hpMultiplier: 1.0,
    packSize: [1, 1],
    forecast: 'Veiled Echoes drift in slowly.',
  },
  {
    durationSeconds: 30,
    spawnRateStart: 0.42,
    spawnRateEnd: 0.6,
    weights: { echo: 0.7, moth: 0.3 },
    hpMultiplier: 1.1,
    packSize: [1, 2],
    forecast: 'Folded Moths join — fast and fragile.',
  },
  {
    durationSeconds: 30,
    spawnRateStart: 0.5,
    spawnRateEnd: 0.72,
    weights: { echo: 0.6, moth: 0.25, urn: 0.15 },
    hpMultiplier: 1.2,
    packSize: [1, 2],
    forecast: 'The first Burden Urns: slow, heavy, and hard to break.',
  },
  {
    durationSeconds: 30,
    spawnRateStart: 0.62,
    spawnRateEnd: 0.88,
    weights: { echo: 0.5, moth: 0.3, urn: 0.2 },
    hpMultiplier: 1.3,
    packSize: [1, 3],
    forecast: 'A mixed procession of all three.',
  },
  {
    durationSeconds: 30,
    spawnRateStart: 0.95,
    spawnRateEnd: 1.25,
    weights: { echo: 0.78, moth: 0.14, urn: 0.08 },
    hpMultiplier: 1.4,
    packSize: [3, 5],
    forecast: 'Crowd: a dense tide of Veiled Echoes.',
  },
  {
    durationSeconds: 30,
    spawnRateStart: 1.0,
    spawnRateEnd: 1.35,
    weights: { moth: 0.68, echo: 0.24, urn: 0.08 },
    hpMultiplier: 1.5,
    packSize: [2, 4],
    forecast: 'Swarm: fast Folded Moths from every side.',
  },
  {
    durationSeconds: 30,
    spawnRateStart: 0.7,
    spawnRateEnd: 0.95,
    weights: { urn: 0.55, echo: 0.33, moth: 0.12 },
    hpMultiplier: 1.6,
    packSize: [1, 2],
    forecast: 'Burden: a procession of armored Urns.',
  },
  {
    durationSeconds: 30,
    spawnRateStart: 1.15,
    spawnRateEnd: 1.45,
    weights: { echo: 0.46, moth: 0.34, urn: 0.2 },
    hpMultiplier: 1.7,
    packSize: [2, 3],
    forecast: 'The final trial. Then the way home opens.',
  },
];

export const TRIAL_COUNT = TRIALS.length;

export const STAKES_LINE = 'Reclaim your memories. Endure eight trials. Return to life.';
