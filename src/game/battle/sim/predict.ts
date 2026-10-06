import { clone, decide, step, RECOVERY } from './sim';
import type { Anim, BattleEvent, BattleState, Command } from './types';
import { TPS } from './types';

/** One fighter at one tick of the prediction. */
export interface FighterFrame {
  id: number;
  x: number;
  y: number;
  anim: Anim;
  animT: number;
  facing: 1 | -1;
  ko: boolean;
}

export interface ProjectileFrame {
  id: number;
  kind: 'arrow' | 'fireball';
  team: 'party' | 'enemy';
  owner: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/** Everything the preview needs to replay one tick. */
export interface PredFrame {
  tick: number;
  fighters: FighterFrame[];
  projectiles: ProjectileFrame[];
}

export type PredEvent =
  | (Extract<BattleEvent, { type: 'hit' }> & { certain: boolean })
  | (Extract<BattleEvent, { type: 'ko' }> & { certain: boolean })
  | (Extract<BattleEvent, { type: 'spawn' }> & { certain: boolean; owner: number })
  | { tick: number; type: 'turn'; fighter: number; certain: boolean };

export interface Prediction {
  /** Ticks simulated. */
  ticks: number;
  /** First tick at which anyone gets to decide again (∞ if nobody does within the horizon). */
  certainUntil: number;
  /** frames[0] is the moment of decision; frames[i] is i ticks later. */
  frames: PredFrame[];
  events: PredEvent[];
  /** Upcoming turns in order (inside the horizon). */
  turns: { fighter: number; tick: number }[];
  /** When the deciding fighter acts again, in ticks from now (projected past the horizon). */
  actorNext: number;
}

function snapshot(s: BattleState, tick: number): PredFrame {
  return {
    tick,
    fighters: s.fighters.map((f) => ({ id: f.id, x: f.x, y: f.y, anim: f.anim, animT: f.animT, facing: f.facing, ko: f.ko })),
    projectiles: s.projectiles.map((p) => ({ id: p.id, kind: p.kind, team: p.team, owner: p.owner, x: p.x, y: p.y, vx: p.vx, vy: p.vy })),
  };
}

/**
 * Exact preview: run the real simulation forward on a copy of the state with `cmd` applied for the
 * awaiting fighter, recording every tick. Future choices (the enemies', and your own on later
 * turns) are unknown, so when a turn comes up inside the horizon that fighter keeps doing what it
 * was doing ('wait'), and everything after the first such turn is flagged uncertain. Up to that
 * point it is exactly what will happen.
 */
export function predict(state: BattleState, id: number, cmd: Command, horizon = 150): Prediction | null {
  const s = clone(state);
  s.events = [];
  if (!decide(s, id, cmd)) return null;
  const t0 = s.tick;
  const out: Prediction = { ticks: horizon, certainUntil: Infinity, frames: [snapshot(s, 0)], events: [], turns: [], actorNext: Infinity };
  const actor = s.fighters.find((f) => f.id === id)!;
  for (const e of s.events) if (e.type === 'spawn') out.events.push({ ...e, tick: 0, certain: true, owner: id });
  s.events = [];

  for (let i = 1; i <= horizon; i++) {
    let guard = 0;
    while (s.awaiting !== null && guard++ < 16) {
      const who = s.awaiting;
      const rel = s.tick - t0;
      out.turns.push({ fighter: who, tick: rel });
      out.events.push({ tick: rel, type: 'turn', fighter: who, certain: rel <= out.certainUntil });
      out.certainUntil = Math.min(out.certainUntil, rel);
      if (who === id && out.actorNext === Infinity) out.actorNext = rel;
      decide(s, who, { kind: 'wait' });
    }
    step(s);
    const rel = s.tick - t0;
    const certain = rel <= out.certainUntil;
    for (const e of s.events) {
      if (e.type === 'hit') out.events.push({ ...e, tick: rel, certain });
      else if (e.type === 'ko') out.events.push({ ...e, tick: rel, certain });
      else if (e.type === 'spawn') {
        const p = s.projectiles.find((q) => q.id === e.projectile);
        out.events.push({ ...e, tick: rel, certain, owner: p?.owner ?? -1 });
      }
    }
    s.events = [];
    out.frames.push(snapshot(s, rel));
    if (s.outcome) {
      out.ticks = i;
      break;
    }
  }
  if (out.actorNext === Infinity && !actor.ko) {
    // past the horizon: extrapolate from the gauge
    out.actorNext = out.frames.length - 1 + Math.ceil(((1 - actor.atb) / actor.atbRate) * TPS);
  }
  return out;
}

/** The gauge value a command leaves (for the turn-order display). */
export function recoveryOf(cmd: Command): number {
  return RECOVERY[cmd.kind];
}

/**
 * When each fighter's gauge will fill if nothing changes (ticks from now). The awaiting fighter's
 * gauge is assumed to restart at `actorRestart`.
 */
export function turnOrder(state: BattleState, count = 8, actorRestart = 0): { fighter: number; tick: number; now?: boolean }[] {
  const res: { fighter: number; tick: number; now?: boolean }[] = [];
  for (const f of state.fighters) {
    if (f.ko) continue;
    let a = f.atb;
    if (state.awaiting === f.id) {
      res.push({ fighter: f.id, tick: 0, now: true });
      a = actorRestart;
    } else if (state.turnQueue.includes(f.id)) {
      res.push({ fighter: f.id, tick: 0 });
      a = 0;
    }
    const first = Math.ceil(((1 - a) / f.atbRate) * TPS);
    const period = Math.ceil((1 / f.atbRate) * TPS);
    for (let k = 0; k < 3; k++) res.push({ fighter: f.id, tick: first + k * period });
  }
  return res.sort((a, b) => a.tick - b.tick || a.fighter - b.fighter).slice(0, count);
}
