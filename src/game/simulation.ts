// Deterministic fixed-step combat simulation. It never reads meshes, uniforms or wall-clock time.
//
// Step order (documented in README):
//   1. scheduled spawns (only while the trial clock is spawning)
//   2. enemy movement toward the Base center, then soft separation between foes (2b)
//   3. weapons charge and fire in stable creation-ID order; instant damage resolves immediately
//   3b. active cards charge and fire in the order they were first played
//   4. projectile travel and resolved hits
//   5. dead cleanup
//   6. surviving enemies that contact the Base footprint deal damage once and are removed
//   7. Base defeat check
//   8. phase clock (trial boundary / clearing start / victory)
import { activeCooldown, ARENA, BASE, CROWD, ENEMIES, FIXED_DT, NO_MODS, SLOT_COUNT, SLOTS_UNLOCKED_AT_START, SPELLS, TRIALS, WEAPONS } from './content';
import { averageDps, damageMultiplier, effInterval, effRange, maxIntegrity } from './stats';
import { deriveStream, Rng } from './rng';
import type {
  ActiveDef,
  ActiveId,
  ActiveInstance,
  EnemyKind,
  EnemyState,
  ProjectileState,
  SimEvent,
  StatId,
  StatMods,
  StepOutcome,
  TrialDef,
  WeaponDef,
  WeaponId,
  WeaponInstance,
} from './types';

const EPS = 1e-9;

/** Planar gap between a point and the rectangular Base footprint (0 inside). */
export function footprintGap(x: number, z: number, hx = BASE.halfX, hz = BASE.halfZ): number {
  const dx = Math.max(Math.abs(x) - hx, 0);
  const dz = Math.max(Math.abs(z) - hz, 0);
  return Math.hypot(dx, dz);
}

export function touchesBase(e: { x: number; z: number; radius: number }): boolean {
  return footprintGap(e.x, e.z) <= e.radius;
}

export interface SimOptions {
  seed: number;
  trials?: TrialDef[];
  /** Tests may disable natural spawning to build exact scenarios. */
  spawning?: boolean;
}

export class Simulation {
  readonly seed: number;
  readonly trials: TrialDef[];
  spawningEnabled: boolean;

  tick = 0;
  simTime = 0;
  trialIndex = 0;
  trialTime = 0;
  clearing = false;
  spawnProgress = 0;

  baseHp = BASE.maxHealth;
  /** Permanent run-wide modifiers from passive cards. */
  mods: StatMods = { ...NO_MODS };
  /** Played active cards, in first-played order. */
  actives: ActiveInstance[] = [];
  /** Locked sockets cannot hold towers until unlocked by some run event. */
  locked: boolean[] = Array.from({ length: SLOT_COUNT }, (_, i) => !SLOTS_UNLOCKED_AT_START.includes(i));
  enemies: EnemyState[] = [];
  projectiles: ProjectileState[] = [];
  /** Exactly six sockets; slot index has no gameplay meaning beyond ownership. */
  slots: (WeaponInstance | null)[] = new Array(SLOT_COUNT).fill(null);

  kills = 0;
  arrivals = 0;
  totalDamageDealt = 0;

  private nextEnemyId = 1;
  private nextWeaponId = 1;
  private nextProjectileId = 1;
  private spawnRng: Rng;
  private activeRng: Rng;
  private events: SimEvent[] = [];

  constructor(opts: SimOptions) {
    this.seed = opts.seed;
    this.trials = opts.trials ?? TRIALS;
    this.spawningEnabled = opts.spawning ?? true;
    this.spawnRng = deriveStream(opts.seed, 'spawns');
    this.activeRng = deriveStream(opts.seed, 'actives');
  }

  get trial(): TrialDef {
    return this.trials[this.trialIndex];
  }

  get damageMultiplier(): number {
    return damageMultiplier(this.mods);
  }

  get maxHp(): number {
    return maxIntegrity(this.mods);
  }

  /** Apply a passive card. Max Integrity also restores the amount it adds. */
  addStat(stat: StatId, amount: number): void {
    const before = this.maxHp;
    this.mods[stat] += amount;
    if (stat === 'maxIntegrity') this.baseHp = Math.min(this.maxHp, this.baseHp + (this.maxHp - before));
  }

  /** Apply an active card: a new effect, or one more copy (shorter cooldown, progress kept). */
  addActive(id: ActiveId): ActiveInstance {
    let a = this.actives.find((x) => x.defId === id);
    if (a) {
      const frac = a.elapsed / activeCooldown(id, a.count);
      a.count++;
      a.elapsed = Math.min(1, frac) * activeCooldown(id, a.count);
    } else {
      a = { defId: id, count: 1, elapsed: 0, uses: 0 };
      this.actives.push(a);
    }
    return a;
  }

  placedTowerIds(): WeaponId[] {
    return this.weaponsInOrder().map((w) => w.defId);
  }

  unlockSlot(slot: number): void {
    this.locked[slot] = false;
  }

  /** Weapons sorted by stable creation ID. Slot order never matters. */
  weaponsInOrder(): WeaponInstance[] {
    const list: WeaponInstance[] = [];
    for (const w of this.slots) if (w) list.push(w);
    list.sort((a, b) => a.id - b.id);
    return list;
  }

  installWeapon(slot: number, defId: WeaponId): WeaponInstance {
    if (slot < 0 || slot >= SLOT_COUNT) throw new Error(`bad slot ${slot}`);
    const inst: WeaponInstance = { id: this.nextWeaponId++, defId, slot, elapsed: 0, shots: 0 };
    this.slots[slot] = inst; // replaces (and discards) any previous owner atomically
    return inst;
  }

  /** Test helper: rearrange existing instances without touching their state. */
  permuteSlots(order: number[]): void {
    const old = this.slots.slice();
    const next: (WeaponInstance | null)[] = new Array(SLOT_COUNT).fill(null);
    old.forEach((w, i) => {
      const to = order[i];
      next[to] = w;
      if (w) w.slot = to;
    });
    this.slots = next;
  }

  spawnEnemy(kind: EnemyKind, x: number, z: number, hpMul = this.trial.hpMultiplier): EnemyState {
    const d = ENEMIES[kind];
    const hp = Math.round(d.hp * hpMul);
    const e: EnemyState = {
      id: this.nextEnemyId++,
      kind,
      x,
      z,
      prevX: x,
      prevZ: z,
      hp,
      maxHp: hp,
      radius: d.radius,
      speed: d.speed,
      contactDamage: d.contactDamage,
      alive: true,
      spawnedAt: this.simTime,
    };
    this.enemies.push(e);
    this.events.push({ type: 'spawned', t: this.simTime, enemyId: e.id, kind, x, z });
    return e;
  }

  spawnRate(): number {
    const tr = this.trial;
    const u = Math.min(1, Math.max(0, this.trialTime / tr.durationSeconds));
    return tr.spawnRateStart + (tr.spawnRateEnd - tr.spawnRateStart) * u;
  }

  isSpawningWindow(): boolean {
    return this.spawningEnabled && !this.clearing && this.trialTime < this.trial.durationSeconds - EPS;
  }

  drainEvents(): SimEvent[] {
    const e = this.events;
    this.events = [];
    return e;
  }

  /** Advance one fixed tick. Caller must stop stepping on any outcome other than 'continue'. */
  step(): StepOutcome {
    const dt = FIXED_DT;
    this.tick++;
    this.simTime = this.tick * dt;

    // 1. spawns
    if (this.isSpawningWindow()) {
      this.spawnProgress += this.spawnRate() * dt;
      // A pack may overdraw progress; the debt delays later spawns so the average rate holds.
      while (this.spawnProgress >= 1) this.spawnProgress -= this.spawnScheduled();
    }

    // 2. movement
    for (const e of this.enemies) {
      e.prevX = e.x;
      e.prevZ = e.z;
      if (!e.alive) continue;
      const d = Math.hypot(e.x, e.z);
      if (d > EPS) {
        const s = Math.min(e.speed * dt, d);
        e.x -= (e.x / d) * s;
        e.z -= (e.z / d) * s;
      }
    }
    // 2b. soft separation so the swarm spreads instead of stacking
    this.separate();
    for (const p of this.projectiles) {
      p.prevX = p.x;
      p.prevZ = p.z;
    }

    // 3. weapons, by stable creation ID
    for (const w of this.weaponsInOrder()) this.updateWeapon(w, dt);
    // 3b. active cards
    for (const a of this.actives) this.updateActive(a, dt);

    // 4. projectiles
    this.updateProjectiles(dt);

    // 5. dead cleanup (deaths were marked and announced immediately)
    if (this.enemies.some((e) => !e.alive)) this.enemies = this.enemies.filter((e) => e.alive);

    // 6. arrival damage from surviving enemies
    let arrived = false;
    for (const e of this.enemies) {
      if (e.alive && touchesBase(e)) {
        e.alive = false;
        arrived = true;
        this.arrivals++;
        this.baseHp = Math.max(0, this.baseHp - e.contactDamage);
        this.events.push({ type: 'arrived', t: this.simTime, enemyId: e.id, kind: e.kind, damage: e.contactDamage, x: e.x, z: e.z });
        this.events.push({ type: 'baseDamaged', t: this.simTime, amount: e.contactDamage, hp: this.baseHp });
      }
    }
    if (arrived) this.enemies = this.enemies.filter((e) => e.alive);

    // 7. defeat overrides any simultaneous phase change
    if (this.baseHp <= 0) return 'defeat';

    // 8. phase clock
    this.trialTime += dt;
    if (this.clearing) {
      return this.enemies.length === 0 ? 'victory' : 'continue';
    }
    if (this.trialTime >= this.trial.durationSeconds - EPS) {
      this.trialTime = this.trial.durationSeconds;
      if (this.trialIndex < this.trials.length - 1) return 'boundary';
      this.clearing = true;
      return this.enemies.length === 0 ? 'victory' : 'clearingStarted';
    }
    return 'continue';
  }

  /**
   * Deterministic soft collision: a uniform grid hash, pairs visited in stable ID order, each push
   * capped. A push never moves a foe into contact with the Base (only walking does).
   */
  private separate(): void {
    const n = this.enemies.length;
    if (n < 2) return;
    const cs = CROWD.cellSize;
    const grid = new Map<number, number[]>();
    const key = (cx: number, cz: number) => (cx + 4096) * 8192 + (cz + 4096);
    for (let i = 0; i < n; i++) {
      const e = this.enemies[i];
      if (!e.alive) continue;
      const k = key(Math.floor(e.x / cs), Math.floor(e.z / cs));
      const bucket = grid.get(k);
      if (bucket) bucket.push(i);
      else grid.set(k, [i]);
    }
    const pushX = new Float64Array(n);
    const pushZ = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const a = this.enemies[i];
      if (!a.alive) continue;
      const cx = Math.floor(a.x / cs);
      const cz = Math.floor(a.z / cs);
      for (let ox = -1; ox <= 1; ox++)
        for (let oz = -1; oz <= 1; oz++) {
          const bucket = grid.get(key(cx + ox, cz + oz));
          if (!bucket) continue;
          for (const j of bucket) {
            if (j <= i) continue; // each pair once, in stable (spawn = ID) order
            const b = this.enemies[j];
            const dx = b.x - a.x;
            const dz = b.z - a.z;
            const min = a.radius + b.radius;
            const d2 = dx * dx + dz * dz;
            if (d2 >= min * min) continue;
            let d = Math.sqrt(d2);
            let nx: number;
            let nz: number;
            if (d < 1e-6) {
              // exact overlap: separate along a direction derived from the IDs (deterministic)
              const ang = ((a.id * 92821 + b.id * 68917) % 360) * (Math.PI / 180);
              nx = Math.cos(ang);
              nz = Math.sin(ang);
              d = 0;
            } else {
              nx = dx / d;
              nz = dz / d;
            }
            const push = (min - d) * CROWD.stiffness * 0.5;
            pushX[i] -= nx * push;
            pushZ[i] -= nz * push;
            pushX[j] += nx * push;
            pushZ[j] += nz * push;
          }
        }
    }
    for (let i = 0; i < n; i++) {
      const e = this.enemies[i];
      if (!e.alive || (pushX[i] === 0 && pushZ[i] === 0)) continue;
      let px = pushX[i];
      let pz = pushZ[i];
      const len = Math.hypot(px, pz);
      if (len > CROWD.maxPush) {
        px *= CROWD.maxPush / len;
        pz *= CROWD.maxPush / len;
      }
      const nx = e.x + px;
      const nz = e.z + pz;
      if (footprintGap(nx, nz) <= e.radius) continue; // never shoved into the Base
      e.x = nx;
      e.z = nz;
    }
  }

  /** Active cards hold when ready but have nothing to do (no foes / no towers / full Integrity). */
  private updateActive(a: ActiveInstance, dt: number): void {
    const def = SPELLS[a.defId] as ActiveDef;
    const cd = activeCooldown(a.defId, a.count);
    a.elapsed += dt;
    if (a.elapsed < cd - EPS) return;
    const eff = def.effect;
    if (eff.kind === 'strike') {
      const alive = this.enemies.filter((e) => e.alive);
      const dmg = averageDps(this.placedTowerIds(), this.mods) * eff.dpsRatio;
      if (alive.length === 0 || dmg <= 0) {
        a.elapsed = cd;
        return;
      }
      const target = alive[this.activeRng.int(alive.length)];
      a.elapsed = 0;
      a.uses++;
      this.events.push({ type: 'activeFired', t: this.simTime, defId: a.defId, enemyId: target.id, amount: dmg, x: target.x, z: target.z });
      this.damage(target, dmg, a.defId);
    } else {
      if (this.baseHp >= this.maxHp - EPS) {
        a.elapsed = cd;
        return;
      }
      a.elapsed = 0;
      a.uses++;
      const healed = this.heal(eff.amount);
      this.events.push({ type: 'activeFired', t: this.simTime, defId: a.defId, enemyId: null, amount: healed, x: 0, z: 0 });
    }
  }

  /** Called by the phase controller when a turn ends and the next wave begins. */
  beginNextTrial(): void {
    if (this.trialIndex < this.trials.length - 1) {
      this.trialIndex++;
      this.trialTime = 0;
    }
  }

  heal(amount: number): number {
    const before = this.baseHp;
    this.baseHp = Math.min(this.maxHp, this.baseHp + amount);
    const healed = this.baseHp - before;
    this.events.push({ type: 'healed', t: this.simTime, amount: healed, hp: this.baseHp });
    return healed;
  }

  /** Spawns one pack. Returns the number of enemies spawned (consumed from spawn progress). */
  private spawnScheduled(): number {
    const tr = this.trial;
    const [lo, hi] = tr.packSize ?? [1, 1];
    const n = lo + this.spawnRng.int(hi - lo + 1);
    const a = this.spawnRng.next() * Math.PI * 2;
    for (let i = 0; i < n; i++) {
      const kind = pickWeighted(this.spawnRng, tr.weights);
      const ai = a + (i === 0 ? 0 : this.spawnRng.range(-0.16, 0.16));
      const r = ARENA.spawnRadius + (i === 0 ? 0 : this.spawnRng.range(0.1, 0.9));
      this.spawnEnemy(kind, Math.cos(ai) * r, Math.sin(ai) * r);
    }
    return n;
  }

  /** Nearest threat: smallest footprint gap, tie-broken by enemy ID, within Base-center range. */
  nearestThreat(range: number, exclude?: Set<number>): EnemyState | null {
    let best: EnemyState | null = null;
    let bestGap = Infinity;
    for (const e of this.enemies) {
      if (!e.alive || (exclude && exclude.has(e.id))) continue;
      if (Math.hypot(e.x, e.z) > range + EPS) continue;
      const g = footprintGap(e.x, e.z);
      if (g < bestGap - EPS || (Math.abs(g - bestGap) <= EPS && best && e.id < best.id)) {
        best = e;
        bestGap = g;
      }
    }
    return best;
  }

  private nearestTo(x: number, z: number, maxDist: number, exclude: Set<number>): EnemyState | null {
    let best: EnemyState | null = null;
    let bestD = Infinity;
    for (const e of this.enemies) {
      if (!e.alive || exclude.has(e.id)) continue;
      const d = Math.hypot(e.x - x, e.z - z);
      if (d > maxDist + EPS) continue;
      if (d < bestD - EPS || (Math.abs(d - bestD) <= EPS && best && e.id < best.id)) {
        best = e;
        bestD = d;
      }
    }
    return best;
  }

  private anyInPulse(radius: number): boolean {
    return this.enemies.some((e) => e.alive && Math.hypot(e.x, e.z) <= radius + EPS);
  }

  private hasTarget(def: WeaponDef): boolean {
    if (def.pattern === 'pulse') return this.anyInPulse(effRange(def, this.mods));
    return this.nearestThreat(effRange(def, this.mods)) !== null;
  }

  private updateWeapon(w: WeaponInstance, dt: number): void {
    const def = WEAPONS[w.defId];
    const interval = effInterval(def, this.mods);
    const wasHeldFull = w.elapsed >= interval - EPS;
    w.elapsed += dt;
    if (w.elapsed < interval - EPS) return;
    if (!this.hasTarget(def)) {
      w.elapsed = interval; // hold full; never bank shots
      return;
    }
    // A held-ready weapon restarts from zero; otherwise preserve legitimate fixed-step overshoot.
    w.elapsed = wasHeldFull ? 0 : Math.min(Math.max(0, w.elapsed - interval), dt);
    w.shots++;
    this.fire(w, def);
  }

  private damage(e: EnemyState, amount: number, source: WeaponId | ActiveId): void {
    if (!e.alive) return;
    e.hp -= amount;
    this.totalDamageDealt += amount;
    this.events.push({ type: 'damaged', t: this.simTime, enemyId: e.id, amount, hp: Math.max(0, e.hp), source, x: e.x, z: e.z });
    if (e.hp <= 1e-6) {
      e.hp = 0;
      e.alive = false;
      this.kills++;
      this.events.push({ type: 'died', t: this.simTime, enemyId: e.id, kind: e.kind, x: e.x, z: e.z });
    }
  }

  private fire(w: WeaponInstance, def: WeaponDef): void {
    const mul = this.damageMultiplier;
    const range = effRange(def, this.mods);
    const base = { type: 'fired' as const, t: this.simTime, weaponId: w.id, defId: def.id, slot: w.slot };
    switch (def.pattern) {
      case 'projectile': {
        const target = this.nearestThreat(range)!;
        this.projectiles.push({
          id: this.nextProjectileId++,
          weaponId: w.id,
          x: 0,
          z: 0,
          prevX: 0,
          prevZ: 0,
          targetId: target.id,
          damage: def.damage * mul,
          speed: def.projectileSpeed ?? 18,
          life: def.projectileLife ?? 2,
          retargeted: false,
          bornAt: this.simTime,
        });
        this.events.push({ ...base, targets: [target.id], points: [{ x: target.x, z: target.z }] });
        break;
      }
      case 'lance': {
        const target = this.nearestThreat(range)!;
        const pt = { x: target.x, z: target.z };
        this.events.push({ ...base, targets: [target.id], points: [pt] });
        this.damage(target, def.damage * mul, def.id);
        break;
      }
      case 'chain': {
        const hops = def.chainDamage ?? [def.damage];
        const hit = new Set<number>();
        const targets: number[] = [];
        const points: { x: number; z: number }[] = [];
        let cur = this.nearestThreat(range);
        const pending: { e: EnemyState; dmg: number }[] = [];
        for (let i = 0; i < hops.length && cur; i++) {
          hit.add(cur.id);
          targets.push(cur.id);
          points.push({ x: cur.x, z: cur.z });
          pending.push({ e: cur, dmg: hops[i] * mul });
          cur = this.nearestTo(cur.x, cur.z, def.chainHopRange ?? 2.8, hit);
        }
        this.events.push({ ...base, targets, points });
        for (const p of pending) this.damage(p.e, p.dmg, def.id);
        break;
      }
      case 'pulse': {
        const r = range;
        const victims = this.enemies.filter((e) => e.alive && Math.hypot(e.x, e.z) <= r + EPS).sort((a, b) => a.id - b.id);
        this.events.push({ ...base, targets: victims.map((v) => v.id), points: [] });
        for (const v of victims) this.damage(v, def.damage * mul, def.id);
        break;
      }
    }
  }

  private updateProjectiles(dt: number): void {
    if (this.projectiles.length === 0) return;
    const survivors: ProjectileState[] = [];
    for (const p of this.projectiles) {
      let target = this.enemies.find((e) => e.id === p.targetId && e.alive);
      if (!target) {
        if (!p.retargeted) {
          p.retargeted = true;
          target = this.nearestTo(p.x, p.z, Infinity, new Set()) ?? undefined;
          if (target && Math.hypot(target.x, target.z) > effRange(WEAPONS.needle, this.mods) + EPS) target = undefined;
          if (target) p.targetId = target.id;
        }
        if (!target) {
          this.events.push({ type: 'projectileExpired', t: this.simTime, projectileId: p.id, x: p.x, z: p.z });
          continue;
        }
      }
      const dx = target.x - p.x;
      const dz = target.z - p.z;
      const d = Math.hypot(dx, dz);
      const stepLen = p.speed * dt;
      // Homing arrival threshold covers the whole step, so a fast needle cannot tunnel.
      if (d <= stepLen + target.radius * 0.5) {
        p.x = target.x;
        p.z = target.z;
        this.damage(target, p.damage, 'needle');
        continue;
      }
      p.x += (dx / d) * stepLen;
      p.z += (dz / d) * stepLen;
      p.life -= dt;
      if (p.life <= 0) {
        this.events.push({ type: 'projectileExpired', t: this.simTime, projectileId: p.id, x: p.x, z: p.z });
        continue;
      }
      survivors.push(p);
    }
    this.projectiles = survivors;
  }
}

export function pickWeighted(rng: Rng, weights: Partial<Record<EnemyKind, number>>): EnemyKind {
  const entries = (Object.entries(weights) as [EnemyKind, number][]).filter(([, w]) => w > 0);
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = rng.next() * total;
  for (const [k, w] of entries) {
    r -= w;
    if (r < 0) return k;
  }
  return entries[entries.length - 1][0];
}

export function chargeFraction(w: WeaponInstance, mods: StatMods = NO_MODS): number {
  return Math.min(1, Math.max(0, w.elapsed / effInterval(WEAPONS[w.defId], mods)));
}

export function activeFraction(a: ActiveInstance): number {
  return Math.min(1, Math.max(0, a.elapsed / activeCooldown(a.defId, a.count)));
}
