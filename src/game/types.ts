// Core gameplay types. Simulation code only depends on this file, content.ts and rng.ts.

export type WeaponId = 'needle' | 'light' | 'thread' | 'bell';
/** Placeholder active/passive cards (real card design comes later). */
export type SpellId = 'mend' | 'ash' | 'quicken' | 'polish' | 'heavy';
export type CardId = WeaponId | SpellId;
export type CardType = 'tower' | 'active' | 'passive';
/** Only 'common' exists for now; higher rarities cost more energy later. */
export type Rarity = 'common';
export type EnemyKind = 'echo' | 'moth' | 'urn';

export type Phase = 'TITLE' | 'COMBAT' | 'TURN' | 'PAUSED' | 'CLEARING' | 'DEFEAT' | 'VICTORY';

export type WeaponPattern = 'projectile' | 'lance' | 'chain' | 'pulse';

interface CardBase {
  name: string;
  cost: number; // energy
  rarity: Rarity;
  summary: string;
  flavor: string;
}

export interface WeaponDef extends CardBase {
  id: WeaponId;
  type: 'tower';
  pattern: WeaponPattern;
  interval: number; // seconds between shots
  damage: number; // primary damage (chain: first hop)
  range: number; // measured from the common Base center (planar XZ)
  chainDamage?: number[]; // damage per hop for chain weapons
  chainHopRange?: number;
  pulseRadius?: number;
  projectileSpeed?: number;
  projectileLife?: number;
}

export type SpellEffect =
  | { kind: 'heal'; amount: number }
  | { kind: 'blast'; damage: number; radius: number } // resolves at the start of the next wave
  | { kind: 'charge' } // fills one placed tower's charge (needs a tower target)
  | { kind: 'damageBonus'; amount: number } // passive: additive damage bonus for the next wave
  | { kind: 'slow'; factor: number }; // passive: enemy speed multiplier for the next wave

export interface SpellDef extends CardBase {
  id: SpellId;
  type: 'active' | 'passive';
  effect: SpellEffect;
  target: 'none' | 'tower';
}

export type CardDef = WeaponDef | SpellDef;

/** A physical card in the run's deck. `uid` distinguishes duplicates. */
export interface CardInstance {
  uid: number;
  defId: CardId;
}

export interface EnemyDef {
  kind: EnemyKind;
  name: string;
  hp: number;
  speed: number;
  contactDamage: number;
  radius: number;
}

export interface TrialDef {
  durationSeconds: number;
  spawnRateStart: number; // enemies per second at trial start
  spawnRateEnd: number; // enemies per second at trial end
  weights: Partial<Record<EnemyKind, number>>;
  hpMultiplier: number;
  /** Enemies per spawn opportunity [min, max]; packs share an approach angle. Rate stays enemies/s. */
  packSize?: [number, number];
  forecast: string;
}

/** An equipped weapon. Stable `id` (creation order) decides resolution order, never `slot`. */
export interface WeaponInstance {
  id: number;
  defId: WeaponId;
  slot: number;
  elapsed: number; // authoritative charge time, 0..interval
  shots: number;
}

export interface EnemyState {
  id: number;
  kind: EnemyKind;
  x: number;
  z: number;
  prevX: number;
  prevZ: number;
  hp: number;
  maxHp: number;
  radius: number;
  speed: number;
  contactDamage: number;
  alive: boolean;
  spawnedAt: number; // simulation time
}

export interface ProjectileState {
  id: number;
  weaponId: number; // instance that launched it (informational only)
  x: number;
  z: number;
  prevX: number;
  prevZ: number;
  targetId: number;
  damage: number; // captured at launch
  speed: number;
  life: number;
  retargeted: boolean;
  bornAt: number;
}

export interface Vec2 {
  x: number;
  z: number;
}

export type SimEvent =
  | { type: 'spawned'; t: number; enemyId: number; kind: EnemyKind; x: number; z: number }
  | {
      type: 'fired';
      t: number;
      weaponId: number;
      defId: WeaponId;
      slot: number;
      targets: number[];
      points: Vec2[]; // impact points (chain: each hop; lance: target; pulse: empty)
    }
  | { type: 'damaged'; t: number; enemyId: number; amount: number; hp: number; source: WeaponId | 'ash'; x: number; z: number }
  | { type: 'died'; t: number; enemyId: number; kind: EnemyKind; x: number; z: number }
  | { type: 'arrived'; t: number; enemyId: number; kind: EnemyKind; damage: number; x: number; z: number }
  | { type: 'projectileExpired'; t: number; projectileId: number; x: number; z: number }
  | { type: 'baseDamaged'; t: number; amount: number; hp: number }
  | { type: 'blast'; t: number; radius: number; hits: number }
  | { type: 'healed'; t: number; amount: number; hp: number };

export type StepOutcome = 'continue' | 'boundary' | 'clearingStarted' | 'defeat' | 'victory';
