import { describe, expect, it } from 'vitest';
import { BASE, FIXED_DT, TRIALS } from '../src/game/content';
import { FixedStepClock } from '../src/game/clock';
import { chargeFraction, footprintGap, Simulation, touchesBase } from '../src/game/simulation';
import type { SimEvent, TrialDef } from '../src/game/types';

const LONG_TRIALS: TrialDef[] = TRIALS.map((t) => ({ ...t, durationSeconds: 1000 }));

function quietSim(trials = LONG_TRIALS): Simulation {
  return new Simulation({ seed: 7, trials, spawning: false });
}

/** A stationary, effectively immortal target in range. */
function dummy(sim: Simulation, x = 0, z = 6, hp = 1e6) {
  const e = sim.spawnEnemy('urn', x, z, 1);
  e.hp = e.maxHp = hp;
  e.speed = 0;
  return e;
}

function runTicks(sim: Simulation, n: number): SimEvent[] {
  const all: SimEvent[] = [];
  for (let i = 0; i < n; i++) {
    sim.step();
    all.push(...sim.drainEvents());
  }
  return all;
}

const fired = (ev: SimEvent[]) => ev.filter((e) => e.type === 'fired');

describe('footprint contact geometry', () => {
  it('measures gap to the rectangle, not to the center', () => {
    expect(footprintGap(0, 0)).toBe(0);
    expect(footprintGap(BASE.halfX + 1, 0)).toBeCloseTo(1);
    expect(footprintGap(0, -(BASE.halfZ + 0.5))).toBeCloseTo(0.5);
    expect(footprintGap(BASE.halfX + 3, BASE.halfZ + 4)).toBeCloseTo(5);
  });
  it('detects edge and corner contact with the enemy radius', () => {
    const r = 0.4;
    expect(touchesBase({ x: BASE.halfX + 0.39, z: 0, radius: r })).toBe(true);
    expect(touchesBase({ x: BASE.halfX + 0.41, z: 0, radius: r })).toBe(false);
    const c = r / Math.SQRT2;
    expect(touchesBase({ x: BASE.halfX + c * 0.99, z: BASE.halfZ + c * 0.99, radius: r })).toBe(true);
    expect(touchesBase({ x: BASE.halfX + c * 1.01, z: BASE.halfZ + c * 1.01, radius: r })).toBe(false);
    // A point inside the "center radius" but not near the corner must not count.
    expect(touchesBase({ x: BASE.halfX + 0.35, z: BASE.halfZ + 0.35, radius: r })).toBe(false);
  });
  it('bell radius covers the full footprint plus margin', () => {
    expect(6.0).toBeGreaterThan(Math.hypot(BASE.halfX, BASE.halfZ) + 0.6);
  });
});

describe('cadence and charge authority', () => {
  it('a 1.2 s weapon fires 10 times in 12 active seconds against a persistent target', () => {
    const sim = quietSim();
    sim.installWeapon(0, 'needle');
    dummy(sim);
    const ev = runTicks(sim, 720);
    expect(fired(ev).length).toBe(10);
  });

  it('30/60/144 FPS frame schedules produce identical outcomes', () => {
    const results = [30, 60, 144, 45.7].map((fps) => {
      const sim = quietSim();
      sim.installWeapon(0, 'needle');
      sim.installWeapon(3, 'light');
      dummy(sim);
      const clock = new FixedStepClock();
      const events: SimEvent[] = [];
      const frames = Math.round(12 * fps);
      for (let i = 0; i < frames; i++) {
        clock.advance(1 / fps, true, () => {
          const o = sim.step();
          events.push(...sim.drainEvents());
          return o;
        });
      }
      // Compare everything up to a common tick; the frame-quantized endpoint may differ by one tick.
      const cut = 718 * FIXED_DT + 1e-9;
      const early = events.filter((e) => e.t <= cut);
      const lastDamage = early.filter((e) => e.type === 'damaged').pop();
      return { ticks: sim.tick, shots: fired(early).length, hp: lastDamage && lastDamage.type === 'damaged' ? lastDamage.hp : -1 };
    });
    for (const r of results) {
      expect(Math.abs(r.ticks - 720)).toBeLessThanOrEqual(1);
      expect(r.shots).toBe(results[1].shots);
      expect(r.hp).toBe(results[1].hp);
    }
  });

  it('pause time does not count', () => {
    const sim = quietSim();
    sim.installWeapon(0, 'needle');
    dummy(sim);
    const clock = new FixedStepClock();
    let shots = 0;
    const step = () => {
      const o = sim.step();
      shots += fired(sim.drainEvents()).length;
      return o;
    };
    for (let i = 0; i < 360; i++) clock.advance(1 / 60, true, step); // 6s active
    for (let i = 0; i < 600; i++) clock.advance(1 / 60, false, step); // 10s frozen
    for (let i = 0; i < 360; i++) clock.advance(1 / 60, true, step); // 6s active
    expect(sim.tick).toBe(720);
    expect(shots).toBe(10);
  });

  it('a long stall is clamped and bounded to six catch-up steps', () => {
    const sim = quietSim();
    const clock = new FixedStepClock();
    clock.advance(5, true, () => sim.step());
    expect(sim.tick).toBe(6);
  });

  it('holds full charge with no target, then fires once and restarts the interval', () => {
    const sim = quietSim();
    const w = sim.installWeapon(0, 'light');
    runTicks(sim, 400);
    expect(chargeFraction(w)).toBe(1);
    expect(w.shots).toBe(0);
    dummy(sim);
    const ev = runTicks(sim, 1);
    expect(fired(ev).length).toBe(1);
    expect(w.elapsed).toBe(0);
    const ev2 = runTicks(sim, 179); // 3.0 s interval = 180 ticks
    expect(fired(ev2).length).toBe(0);
    expect(fired(runTicks(sim, 1)).length).toBe(1);
  });

  it('all weapons start empty; duplicate definitions charge independently', () => {
    const sim = quietSim();
    const a = sim.installWeapon(0, 'needle');
    runTicks(sim, 30);
    const b = sim.installWeapon(1, 'needle');
    expect(b.elapsed).toBe(0);
    runTicks(sim, 10);
    expect(a.elapsed).toBeCloseTo(40 * FIXED_DT);
    expect(b.elapsed).toBeCloseTo(10 * FIXED_DT);
  });
});

describe('six equivalent sockets', () => {
  function scenario(order: number[] | null) {
    const sim = new Simulation({ seed: 99, trials: LONG_TRIALS });
    sim.installWeapon(0, 'needle');
    sim.installWeapon(1, 'light');
    sim.installWeapon(2, 'thread');
    sim.installWeapon(3, 'bell');
    sim.installWeapon(4, 'needle');
    sim.installWeapon(5, 'thread');
    if (order) sim.permuteSlots(order);
    const ev = runTicks(sim, 60 * 40);
    const log = ev
      .filter((e) => e.type !== 'fired')
      .map((e) => JSON.stringify(e));
    const fires = fired(ev).map((e) => (e.type === 'fired' ? `${e.t}:${e.weaponId}:${e.targets.join(',')}` : ''));
    return { log, fires, hp: sim.baseHp, kills: sim.kills };
  }
  it('permuting the same instances across all six slots changes nothing', () => {
    const ref = scenario(null);
    expect(ref.kills).toBeGreaterThan(5);
    for (const order of [
      [5, 4, 3, 2, 1, 0],
      [1, 2, 3, 4, 5, 0],
      [3, 0, 5, 1, 4, 2],
    ]) {
      const r = scenario(order);
      expect(r.fires).toEqual(ref.fires);
      expect(r.log).toEqual(ref.log);
      expect(r.hp).toBe(ref.hp);
    }
  });
});

describe('weapons', () => {
  it('needle projectile travels, hits and reduces HP', () => {
    const sim = quietSim();
    sim.installWeapon(0, 'needle');
    const e = dummy(sim, 0, 8, 100);
    const ev = runTicks(sim, 72);
    expect(fired(ev).length).toBe(1);
    expect(sim.projectiles.length).toBe(1);
    runTicks(sim, 40);
    expect(sim.projectiles.length).toBe(0);
    expect(e.hp).toBe(91);
  });

  it('needle retargets once when its target dies, else dissolves', () => {
    const sim = quietSim();
    sim.installWeapon(0, 'needle');
    const a = dummy(sim, 0, 9, 5);
    const b = dummy(sim, 1, 9, 100);
    runTicks(sim, 72);
    expect(sim.projectiles.length).toBe(1);
    // kill a by other means before arrival
    a.alive = false;
    sim.enemies = sim.enemies.filter((x) => x.alive);
    runTicks(sim, 60);
    expect(b.hp).toBe(91);
  });

  it('lingering projectiles keep launch damage after weapon replacement', () => {
    const sim = quietSim();
    sim.installWeapon(0, 'needle');
    const e = dummy(sim, 0, 9, 100);
    runTicks(sim, 72);
    sim.installWeapon(0, 'bell');
    runTicks(sim, 40);
    expect(e.hp).toBe(91);
  });

  it('kindred thread hits up to three distinct enemies with 10/7/5 within hop range', () => {
    const sim = quietSim();
    sim.installWeapon(0, 'thread');
    const a = dummy(sim, 0, 6, 100);
    const b = dummy(sim, 2.0, 6, 100);
    const c = dummy(sim, 4.0, 6, 100);
    const far = dummy(sim, 7.5, 6, 100);
    runTicks(sim, Math.round(2.4 / FIXED_DT));
    expect([a.hp, b.hp, c.hp, far.hp]).toEqual([90, 93, 95, 100]);
  });

  it('kindred thread never revisits an enemy', () => {
    const sim = quietSim();
    sim.installWeapon(0, 'thread');
    const a = dummy(sim, 0, 6, 100);
    const b = dummy(sim, 1, 6, 100);
    runTicks(sim, Math.round(2.4 / FIXED_DT));
    expect([a.hp, b.hp]).toEqual([90, 93]);
  });

  it('mercy bell is ready only with an enemy in radius and hits all within it once', () => {
    const sim = quietSim();
    const w = sim.installWeapon(0, 'bell');
    const out = dummy(sim, 0, 7, 100);
    runTicks(sim, 300);
    expect(w.shots).toBe(0);
    expect(chargeFraction(w)).toBe(1);
    const inA = dummy(sim, 0, 5.5, 100);
    const inB = dummy(sim, -4, 3, 100);
    runTicks(sim, 1);
    expect([inA.hp, inB.hp, out.hp]).toEqual([86, 86, 100]);
  });

  it('polished memory multiplies damage additively', () => {
    const sim = quietSim();
    sim.polishStacks = 2;
    sim.installWeapon(0, 'light');
    const e = dummy(sim, 0, 6, 100);
    runTicks(sim, 180);
    expect(e.hp).toBeCloseTo(100 - 32 * 1.3);
  });

  it('instant damage lets a later weapon ignore a just-killed enemy', () => {
    const sim = quietSim();
    sim.installWeapon(0, 'light');
    sim.installWeapon(1, 'light');
    const weak = dummy(sim, 0, 5, 20);
    const strong = dummy(sim, 0, 8, 100);
    runTicks(sim, 180);
    expect(weak.alive).toBe(false);
    expect(strong.hp).toBe(68);
  });
});

describe('arrival, death and endings', () => {
  it('an arriving enemy deals contact damage once and is removed without a kill', () => {
    const sim = quietSim();
    const e = sim.spawnEnemy('echo', BASE.halfX + 0.5, 0, 1);
    const ev = runTicks(sim, 120);
    expect(sim.baseHp).toBe(100 - e.contactDamage);
    expect(ev.filter((x) => x.type === 'arrived').length).toBe(1);
    expect(sim.kills).toBe(0);
    expect(sim.enemies.length).toBe(0);
  });

  it('corner arrival deducts once', () => {
    const sim = quietSim();
    sim.spawnEnemy('urn', BASE.halfX + 1, BASE.halfZ + 1, 1);
    runTicks(sim, 600);
    expect(sim.baseHp).toBe(100 - 14);
  });

  it('death prevents same-tick contact', () => {
    const sim = quietSim();
    const w = sim.installWeapon(0, 'light');
    w.elapsed = 3.0 - FIXED_DT; // fires next tick
    const e = sim.spawnEnemy('echo', BASE.halfX + e0Radius() + 0.005, 0, 1);
    const ev = runTicks(sim, 1);
    expect(e.alive).toBe(false);
    expect(ev.some((x) => x.type === 'died')).toBe(true);
    expect(ev.some((x) => x.type === 'arrived')).toBe(false);
    expect(sim.baseHp).toBe(100);
  });

  it('defeat is reported once and overrides a simultaneous boundary', () => {
    const trials = TRIALS.map((t) => ({ ...t, durationSeconds: 1 }));
    const sim = new Simulation({ seed: 1, trials, spawning: false });
    sim.baseHp = 5;
    sim.spawnEnemy('echo', BASE.halfX + 0.42 + 0.7 * (59 / 60) + 0.0001, 0, 1);
    const outcomes: string[] = [];
    for (let i = 0; i < 60; i++) {
      const o = sim.step();
      if (o !== 'continue') {
        outcomes.push(o);
        break;
      }
    }
    expect(outcomes).toEqual(['defeat']);
  });

  it('trial 8 enters clearing, spawns nothing more, and wins when the field is empty', () => {
    const trials = TRIALS.map((t) => ({ ...t, durationSeconds: 2 }));
    const sim = new Simulation({ seed: 3, trials });
    sim.trialIndex = 7;
    sim.installWeapon(0, 'light');
    sim.installWeapon(1, 'bell');
    sim.installWeapon(2, 'needle');
    sim.spawnEnemy('echo', 0, 8, 1);
    let o = 'continue';
    while (o === 'continue') o = sim.step();
    expect(o).toBe('clearingStarted');
    sim.drainEvents();
    const count = sim.enemies.length;
    let spawnedDuringClearing = 0;
    o = 'continue';
    for (let i = 0; i < 60 * 60 && o === 'continue'; i++) {
      o = sim.step();
      spawnedDuringClearing += sim.drainEvents().filter((e) => e.type === 'spawned').length;
    }
    expect(count).toBeGreaterThan(0);
    expect(spawnedDuringClearing).toBe(0);
    expect(o).toBe('victory');
  });

  it('retains fractional spawn progress and interpolates spawn rate', () => {
    const sim = new Simulation({ seed: 11 });
    expect(sim.spawnRate()).toBeCloseTo(TRIALS[0].spawnRateStart);
    for (let i = 0; i < 900; i++) sim.step();
    expect(sim.spawnRate()).toBeCloseTo((TRIALS[0].spawnRateStart + TRIALS[0].spawnRateEnd) / 2, 2);
    expect(sim.spawnProgress).toBeGreaterThanOrEqual(0);
    expect(sim.spawnProgress).toBeLessThan(1);
  });
});

function e0Radius() {
  return 0.42;
}
