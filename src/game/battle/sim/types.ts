/**
 * Battle simulation data. Everything here is plain, JSON-serialisable data: no classes, no
 * references to rendering. That is what makes the preview exact: predicting the future is
 * `clone(state)` then stepping the very same `step()` the real battle uses.
 *
 * Determinism rules for anything in sim/:
 *  - advance only in whole ticks (TPS per second, constant DT);
 *  - randomness only from the state's own seeded RNG (`state.rng`);
 *  - no wall-clock time, no Math.random, no iteration over unordered collections;
 *  - stick to + − × ÷ and Math.sqrt / Math.abs / Math.min / Math.max (exact in IEEE 754, identical
 *    in every JS engine), so replays and lockstep netplay can come later for free.
 */

export const TPS = 60;
export const DT = 1 / TPS;

export type Team = 'party' | 'enemy';

export type Anim = 'idle' | 'run' | 'jump' | 'fall' | 'cast' | 'shoot' | 'slash' | 'hurt' | 'guard' | 'ko';

export type Skill = 'move' | 'jump' | 'slash' | 'fireball' | 'arrow' | 'guard' | 'wait';

/** A decision made on a turn. Aimed commands carry their aim. */
export type Command =
  | { kind: 'wait' }
  | { kind: 'move'; x: number }
  | { kind: 'jump'; vx: number; vy: number }
  | { kind: 'slash'; dir?: 1 | -1 }
  | { kind: 'fireball'; tx: number; ty: number }
  | { kind: 'arrow'; vx: number; vy: number }
  | { kind: 'guard' };

export interface ActiveAction {
  cmd: Command;
  /** Ticks since the action started. */
  t: number;
  /** Fighters already struck by this action's hitbox (melee hits once per target). */
  struck: number[];
}

export interface Fighter {
  id: number;
  /** Key into the art / look table. */
  look: string;
  name: string;
  team: Team;
  maxHp: number;
  hp: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: 1 | -1;
  grounded: boolean;
  /** 0..1 turn gauge. */
  atb: number;
  /** Gauge fill per second. */
  atbRate: number;
  action: ActiveAction | null;
  anim: Anim;
  /** Ticks spent in the current anim (for animation playback). */
  animT: number;
  /** Ticks of hit-stun left (no actions while > 0). */
  stun: number;
  ko: boolean;
  skills: Skill[];
  /** AI brain for enemies; party members are player-controlled. */
  brain?: 'archer' | 'brawler';
  /** Hurtbox half-width and height. */
  hw: number;
  h: number;
  /** Cosmetic depth lane for rendering only (the sim is strictly 2D). */
  lane: number;
}

export interface Projectile {
  id: number;
  owner: number;
  team: Team;
  kind: 'arrow' | 'fireball';
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Multiplier on gravity (0 = flies straight). */
  gravity: number;
  r: number;
  damage: number;
  knock: number;
  /** Ticks left. */
  life: number;
}

export type BattleEvent =
  | { tick: number; type: 'hit'; target: number; source: number; damage: number; x: number; y: number; guarded: boolean }
  | { tick: number; type: 'ko'; target: number }
  | { tick: number; type: 'turn'; fighter: number }
  | { tick: number; type: 'spawn'; projectile: number; kind: Projectile['kind']; x: number; y: number }
  | { tick: number; type: 'land'; fighter: number; x: number }
  | { tick: number; type: 'act'; fighter: number; cmd: Command['kind'] }
  | { tick: number; type: 'whiff'; fighter: number };

export interface BattleState {
  tick: number;
  fighters: Fighter[];
  projectiles: Projectile[];
  nextId: number;
  /** Seeded RNG state (mulberry32). */
  rng: number;
  arena: { left: number; right: number };
  /** Fighters whose gauge is full, in the order they filled. */
  turnQueue: number[];
  /** Whose decision the battle is waiting for (null = time runs). */
  awaiting: number | null;
  outcome: null | 'win' | 'lose';
  /** Events produced by the most recent ticks (cleared by the consumer). */
  events: BattleEvent[];
}
