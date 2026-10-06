import { clone, decide, step } from './sim';
import type { Anim, BattleEvent, BattleState, Command } from './types';

export interface TrackPoint {
  tick: number;
  x: number;
  y: number;
  /** False once another fighter's turn has come up: their choice could change things from here. */
  certain: boolean;
}

export interface PoseSnap {
  x: number;
  y: number;
  anim: Anim;
  animT: number;
  facing: 1 | -1;
  ko: boolean;
}

const snap = (f: { x: number; y: number; anim: Anim; animT: number; facing: 1 | -1; ko: boolean }): PoseSnap => ({ x: f.x, y: f.y, anim: f.anim, animT: f.animT, facing: f.facing, ko: f.ko });

export interface Prediction {
  /** Ticks simulated. */
  ticks: number;
  /** First tick at which someone else gets to decide (∞ if nobody does within the horizon). */
  certainUntil: number;
  fighters: { id: number; points: TrackPoint[]; end: PoseSnap; atCertain: PoseSnap }[];
  projectiles: { id: number; kind: string; team: string; points: TrackPoint[] }[];
  hits: (Extract<BattleEvent, { type: 'hit' }> & { certain: boolean })[];
  kos: (Extract<BattleEvent, { type: 'ko' }> & { certain: boolean })[];
  /** Upcoming turns in order: who, and when. */
  turns: { fighter: number; tick: number }[];
}

/**
 * Exact preview: run the real simulation forward on a copy of the state with `cmd` applied for the
 * awaiting fighter. Future choices (the enemies', and your own on later turns) are unknown, so when
 * a turn comes up inside the horizon that fighter keeps doing what it was doing ('wait'), and
 * everything after the first such turn is flagged uncertain. Up to that point it is exactly what
 * will happen.
 */
export function predict(state: BattleState, id: number, cmd: Command, horizon = 150, sampleEvery = 2): Prediction | null {
  const s = clone(state);
  s.events = [];
  if (!decide(s, id, cmd)) return null;
  const t0 = s.tick;
  const out: Prediction = { ticks: horizon, certainUntil: Infinity, fighters: [], projectiles: [], hits: [], kos: [], turns: [] };
  const ftrack = new Map<number, TrackPoint[]>();
  const ptrack = new Map<number, { id: number; kind: string; team: string; points: TrackPoint[] }>();
  for (const f of s.fighters) ftrack.set(f.id, [{ tick: 0, x: f.x, y: f.y, certain: true }]);
  const atCertain = new Map<number, PoseSnap>();

  for (let i = 1; i <= horizon; i++) {
    // auto-resolve every turn inside the preview with 'wait'
    let guard = 0;
    while (s.awaiting !== null && guard++ < 16) {
      const who = s.awaiting;
      if (!atCertain.size) for (const f of s.fighters) atCertain.set(f.id, snap(f));
      out.turns.push({ fighter: who, tick: s.tick - t0 });
      out.certainUntil = Math.min(out.certainUntil, s.tick - t0);
      decide(s, who, { kind: 'wait' });
    }
    step(s);
    const rel = s.tick - t0;
    const certain = rel <= out.certainUntil;
    for (const e of s.events) {
      if (e.type === 'hit') out.hits.push({ ...e, tick: e.tick - t0, certain });
      if (e.type === 'ko') out.kos.push({ ...e, tick: e.tick - t0, certain });
    }
    s.events = [];
    if (i % sampleEvery === 0 || i === horizon) {
      for (const f of s.fighters) ftrack.get(f.id)!.push({ tick: rel, x: f.x, y: f.y, certain });
    }
    for (const p of s.projectiles) {
      let t = ptrack.get(p.id);
      if (!t) ptrack.set(p.id, (t = { id: p.id, kind: p.kind, team: p.team, points: [] }));
      t.points.push({ tick: rel, x: p.x, y: p.y, certain });
    }
    if (s.outcome) break;
  }
  // projectiles that already existed get their current position as the first point
  for (const p of state.projectiles) {
    const t = ptrack.get(p.id);
    if (t) t.points.unshift({ tick: 0, x: p.x, y: p.y, certain: true });
  }
  for (const f of s.fighters) {
    out.fighters.push({ id: f.id, points: ftrack.get(f.id)!, end: snap(f), atCertain: atCertain.get(f.id) ?? snap(f) });
  }
  out.projectiles = [...ptrack.values()];
  return out;
}

/** When will each fighter's gauge fill if nothing changes? (ticks from now; for the turn-order bar) */
export function turnOrder(state: BattleState, count = 6): { fighter: number; tick: number }[] {
  const res: { fighter: number; tick: number }[] = [];
  const atb = new Map(state.fighters.map((f) => [f.id, f.atb]));
  for (const f of state.fighters) {
    if (f.ko) continue;
    let a = atb.get(f.id)!;
    if (state.awaiting === f.id) a = 0;
    for (let k = 0; k < 3; k++) {
      const ticks = Math.ceil(((1 - a) / f.atbRate) * 60) + k * Math.ceil((1 / f.atbRate) * 60);
      res.push({ fighter: f.id, tick: ticks });
    }
  }
  return res.sort((a, b) => a.tick - b.tick || a.fighter - b.fighter).slice(0, count);
}
