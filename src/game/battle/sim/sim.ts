import { DT, type ActiveAction, type BattleEvent, type BattleState, type Command, type Fighter, type Projectile } from './types';

/**
 * The battle simulation: a pure function of state. `step` advances one tick; when a fighter's turn
 * gauge fills, time stops (`state.awaiting`) until `decide` gives that fighter a command.
 */

export const PHYS = {
  gravity: 30,
  run: 5.2,
  groundFriction: 0.8,
  maxJumpVx: 7,
  maxJumpVy: 14,
  arrowGravity: 0.55,
  fireballSpeed: 10,
};

/** Frame data per command: when it fires, when it ends. */
export const FRAMES = {
  slash: { windup: 8, active: 7, end: 26, reach: 1.5, damage: 18, knock: 5 },
  fireball: { windup: 14, end: 28, damage: 22, knock: 6 },
  arrow: { windup: 20, end: 32, damage: 14, knock: 3.5 },
  guard: { end: 45 },
};

export const STUN_TICKS = 20;

// ---------------------------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------------------------

/** mulberry32 on the state's own seed. */
export function rand(s: BattleState): number {
  let t = (s.rng = (s.rng + 0x6d2b79f5) >>> 0);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function clone(s: BattleState): BattleState {
  return structuredClone(s);
}

export function fighter(s: BattleState, id: number): Fighter {
  const f = s.fighters.find((x) => x.id === id);
  if (!f) throw new Error(`no fighter ${id}`);
  return f;
}

function emit(s: BattleState, e: BattleEvent): void {
  s.events.push(e);
}

function setAnim(f: Fighter, a: Fighter['anim']): void {
  if (f.anim !== a) {
    f.anim = a;
    f.animT = 0;
  }
}

/** Where projectiles leave the hand. */
export function muzzle(f: Fighter): { x: number; y: number } {
  return { x: f.x + f.facing * 0.55, y: f.y + 1.45 };
}

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);

// ---------------------------------------------------------------------------------------------
// commands
// ---------------------------------------------------------------------------------------------

/**
 * Give the awaited fighter its command and let time run again. 'wait' keeps whatever the fighter
 * was doing. Returns false if the command is not allowed right now (state unchanged).
 */
export function decide(s: BattleState, id: number, cmd: Command): boolean {
  if (s.awaiting !== id) return false;
  const f = fighter(s, id);
  if (!canUse(f, cmd)) return false;
  if (cmd.kind !== 'wait') {
    f.action = { cmd: sanitize(f, cmd, s), t: 0, struck: [] };
    emit(s, { tick: s.tick, type: 'act', fighter: id, cmd: cmd.kind });
  }
  f.atb = 0;
  s.awaiting = null;
  advanceQueue(s);
  return true;
}

export function canUse(f: Fighter, cmd: Command): boolean {
  if (f.ko) return false;
  if (cmd.kind === 'wait') return true;
  if (!f.skills.includes(cmd.kind)) return false;
  if (f.stun > 0) return false;
  if ((cmd.kind === 'jump' || cmd.kind === 'move' || cmd.kind === 'slash' || cmd.kind === 'guard') && !f.grounded) return false;
  return true;
}

function sanitize(f: Fighter, cmd: Command, s: BattleState): Command {
  switch (cmd.kind) {
    case 'move': return { kind: 'move', x: clamp(cmd.x, s.arena.left + f.hw, s.arena.right - f.hw) };
    case 'jump': return { kind: 'jump', vx: clamp(cmd.vx, -PHYS.maxJumpVx, PHYS.maxJumpVx), vy: clamp(cmd.vy, 4, PHYS.maxJumpVy) };
    default: return cmd;
  }
}

function advanceQueue(s: BattleState): void {
  while (s.awaiting === null && s.turnQueue.length) {
    const id = s.turnQueue.shift()!;
    const f = fighter(s, id);
    if (f.ko) continue;
    s.awaiting = id;
    emit(s, { tick: s.tick, type: 'turn', fighter: id });
  }
}

// ---------------------------------------------------------------------------------------------
// the tick
// ---------------------------------------------------------------------------------------------

export function step(s: BattleState): void {
  if (s.awaiting !== null || s.outcome) return;

  // 1. turn gauges
  for (const f of s.fighters) {
    if (f.ko || f.atb >= 1) continue;
    f.atb = Math.min(1, f.atb + f.atbRate * DT);
    if (f.atb >= 1) s.turnQueue.push(f.id);
  }

  // 2. actions
  for (const f of s.fighters) {
    if (f.ko) continue;
    if (f.stun > 0) {
      f.stun--;
      setAnim(f, 'hurt');
      continue;
    }
    if (f.action) runAction(s, f, f.action);
  }

  // 3. physics
  for (const f of s.fighters) {
    const controlled = f.action && f.action.cmd.kind === 'move' && f.grounded;
    if (f.grounded && !controlled) f.vx *= PHYS.groundFriction;
    if (Math.abs(f.vx) < 0.01) f.vx = 0;
    if (!f.grounded) f.vy -= PHYS.gravity * DT;
    f.x += f.vx * DT;
    f.y += f.vy * DT;
    if (f.y <= 0 && (!f.grounded || f.vy < 0)) {
      const wasAir = !f.grounded;
      f.y = 0;
      f.vy = 0;
      f.grounded = true;
      if (wasAir) emit(s, { tick: s.tick, type: 'land', fighter: f.id, x: f.x });
    }
    if (f.x < s.arena.left + f.hw) { f.x = s.arena.left + f.hw; f.vx = 0; }
    if (f.x > s.arena.right - f.hw) { f.x = s.arena.right - f.hw; f.vx = 0; }
    if (!f.ko && f.stun <= 0 && !f.action) setAnim(f, f.grounded ? 'idle' : f.vy > 0 ? 'jump' : 'fall');
    f.animT++;
  }

  // 4. projectiles
  for (const p of s.projectiles) {
    p.vy -= PHYS.gravity * p.gravity * DT;
    p.x += p.vx * DT;
    p.y += p.vy * DT;
    p.life--;
    for (const f of s.fighters) {
      if (f.ko || f.team === p.team || p.life <= 0) continue;
      if (overlapCircle(f, p.x, p.y, p.r)) {
        hit(s, f, p.owner, p.damage, p.knock, p.vx >= 0 ? 1 : -1, p.x, p.y);
        p.life = 0;
      }
    }
    if (p.y < -0.2 || p.x < s.arena.left - 2 || p.x > s.arena.right + 2) p.life = 0;
  }
  s.projectiles = s.projectiles.filter((p) => p.life > 0);

  s.tick++;

  // 5. outcome and turns
  const partyUp = s.fighters.some((f) => f.team === 'party' && !f.ko);
  const enemyUp = s.fighters.some((f) => f.team === 'enemy' && !f.ko);
  if (!enemyUp) s.outcome = 'win';
  else if (!partyUp) s.outcome = 'lose';
  if (!s.outcome) advanceQueue(s);
}

function overlapCircle(f: Fighter, x: number, y: number, r: number): boolean {
  const cx = clamp(x, f.x - f.hw, f.x + f.hw);
  const cy = clamp(y, f.y, f.y + f.h);
  const dx = x - cx, dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function hit(s: BattleState, f: Fighter, source: number, damage: number, knock: number, dir: number, x: number, y: number): void {
  const guarded = f.action?.cmd.kind === 'guard' && f.grounded && dir === -f.facing;
  const dmg = guarded ? Math.floor(damage * 0.3) : damage;
  f.hp = Math.max(0, f.hp - dmg);
  emit(s, { tick: s.tick, type: 'hit', target: f.id, source, damage: dmg, x, y, guarded });
  if (guarded) {
    f.vx = dir * knock * 0.3;
    return;
  }
  f.action = null;
  f.stun = STUN_TICKS;
  f.vx = dir * knock;
  if (f.grounded) {
    f.vy = 3.5;
    f.grounded = false;
  }
  setAnim(f, 'hurt');
  if (f.hp <= 0) {
    f.ko = true;
    f.stun = 0;
    f.atb = 0;
    setAnim(f, 'ko');
    s.turnQueue = s.turnQueue.filter((id) => id !== f.id);
    emit(s, { tick: s.tick, type: 'ko', target: f.id });
  }
}

function spawn(s: BattleState, p: Omit<Projectile, 'id'>): void {
  const id = s.nextId++;
  s.projectiles.push({ id, ...p });
  emit(s, { tick: s.tick, type: 'spawn', projectile: id, kind: p.kind, x: p.x, y: p.y });
}

function runAction(s: BattleState, f: Fighter, a: ActiveAction): void {
  const c = a.cmd;
  const t = a.t++;
  const done = () => { f.action = null; };
  switch (c.kind) {
    case 'move': {
      if (!f.grounded) { done(); break; }
      const dx = c.x - f.x;
      if (Math.abs(dx) <= PHYS.run * DT) {
        f.x = c.x;
        f.vx = 0;
        done();
        setAnim(f, 'idle');
        break;
      }
      f.facing = dx > 0 ? 1 : -1;
      f.vx = f.facing * PHYS.run;
      setAnim(f, 'run');
      break;
    }
    case 'jump': {
      if (t === 0) {
        if (!f.grounded) { done(); break; }
        f.vx = c.vx;
        f.vy = c.vy;
        f.grounded = false;
        if (c.vx !== 0) f.facing = c.vx > 0 ? 1 : -1;
      } else if (f.grounded) { done(); break; }
      setAnim(f, f.vy > 0 ? 'jump' : 'fall');
      break;
    }
    case 'fireball': {
      const F = FRAMES.fireball;
      if (t === 0) f.facing = c.tx >= f.x ? 1 : -1;
      if (f.grounded) f.vx = 0;
      setAnim(f, 'cast');
      if (t === F.windup) {
        const m = muzzle(f);
        let dx = c.tx - m.x, dy = c.ty - m.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        dx /= len; dy /= len;
        spawn(s, { owner: f.id, team: f.team, kind: 'fireball', x: m.x, y: m.y, vx: dx * PHYS.fireballSpeed, vy: dy * PHYS.fireballSpeed, gravity: 0, r: 0.32, damage: F.damage, knock: F.knock, life: 180 });
      }
      if (t >= F.end) done();
      break;
    }
    case 'arrow': {
      const F = FRAMES.arrow;
      if (t === 0 && c.vx !== 0) f.facing = c.vx > 0 ? 1 : -1;
      if (f.grounded) f.vx = 0;
      setAnim(f, 'shoot');
      if (t === F.windup) {
        const m = muzzle(f);
        spawn(s, { owner: f.id, team: f.team, kind: 'arrow', x: m.x, y: m.y, vx: c.vx, vy: c.vy, gravity: PHYS.arrowGravity, r: 0.18, damage: F.damage, knock: F.knock, life: 240 });
      }
      if (t >= F.end) done();
      break;
    }
    case 'slash': {
      const F = FRAMES.slash;
      if (t === 0 && c.dir) f.facing = c.dir;
      setAnim(f, 'slash');
      if (t >= F.windup && t < F.windup + F.active) {
        if (t === F.windup) f.vx = f.facing * 3.5;
        for (const o of s.fighters) {
          if (o.ko || o.team === f.team || a.struck.includes(o.id)) continue;
          const front = (o.x - f.x) * f.facing;
          if (front > -0.3 && front - o.hw < F.reach && Math.abs(o.y - f.y) < 1.6) {
            a.struck.push(o.id);
            hit(s, o, f.id, F.damage, F.knock, f.facing, o.x - f.facing * o.hw, f.y + 1.2);
          }
        }
        if (t === F.windup + F.active - 1 && a.struck.length === 0) emit(s, { tick: s.tick, type: 'whiff', fighter: f.id });
      }
      if (t >= F.end) done();
      break;
    }
    case 'guard': {
      setAnim(f, 'guard');
      if (f.grounded) f.vx = 0;
      if (t >= FRAMES.guard.end) done();
      break;
    }
    case 'wait':
      done();
      break;
  }
}

// ---------------------------------------------------------------------------------------------
// jump aiming helper (UI)
// ---------------------------------------------------------------------------------------------

/** Velocity for a jump whose apex lands near (ax, ay). Uses only sqrt (deterministic). */
export function jumpToApex(f: Fighter, ax: number, ay: number): { vx: number; vy: number } {
  const h = clamp(ay - f.y, 0.5, (PHYS.maxJumpVy * PHYS.maxJumpVy) / (2 * PHYS.gravity));
  const vy = Math.sqrt(2 * PHYS.gravity * h);
  const tApex = vy / PHYS.gravity;
  const vx = clamp((ax - f.x) / tApex, -PHYS.maxJumpVx, PHYS.maxJumpVx);
  return { vx, vy };
}

/** Velocity for a gravity arrow from `from` to land on `to`, with a flight time from the distance. */
export function ballistic(from: { x: number; y: number }, to: { x: number; y: number }, g: number): { vx: number; vy: number } {
  const dx = to.x - from.x, dy = to.y - from.y;
  const T = clamp(Math.abs(dx) / 11, 0.45, 1.25);
  return { vx: dx / T, vy: dy / T + 0.5 * g * T };
}
