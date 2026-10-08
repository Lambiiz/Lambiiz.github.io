// Effective tower numbers after run-wide modifiers. The simulation and every tooltip use these
// functions, so what the player reads is exactly what the towers do.
import { BASE, WEAPONS } from './content';
import type { StatMods, WeaponDef, WeaponId } from './types';

export function effInterval(def: WeaponDef, mods: StatMods): number {
  return def.interval / (1 + mods.attackSpeed);
}

export function effRange(def: WeaponDef, mods: StatMods): number {
  return (def.pattern === 'pulse' ? (def.pulseRadius ?? def.range) : def.range) * (1 + mods.range);
}

export function damageMultiplier(mods: StatMods): number {
  return 1 + mods.damage;
}

export function maxIntegrity(mods: StatMods): number {
  return BASE.maxHealth * (1 + mods.maxIntegrity);
}

/** Damage of each hit in one attack (chain: one entry per hop). */
export function hitDamages(def: WeaponDef, mods: StatMods): number[] {
  const mul = damageMultiplier(mods);
  return (def.pattern === 'chain' ? (def.chainDamage ?? [def.damage]) : [def.damage]).map((d) => d * mul);
}

export interface TowerStats {
  damage: number[];
  dps: number;
  attacksPerSecond: number;
  interval: number;
  range: number;
  target: string;
  projectiles: number | null;
}

/**
 * DPS is damage per second against one foe per hit (a chain counts every hop; a pulse counts one
 * foe in reach). This is also the figure Stray Memory averages.
 */
export function towerStats(id: WeaponId, mods: StatMods): TowerStats {
  const def = WEAPONS[id];
  const interval = effInterval(def, mods);
  const damage = hitDamages(def, mods);
  const perAttack = damage.reduce((a, b) => a + b, 0);
  const target = { projectile: 'Single target', lance: 'Single target, instant', chain: `Chain, up to ${damage.length} foes`, pulse: 'Every foe in range' }[def.pattern];
  return {
    damage,
    dps: perAttack / interval,
    attacksPerSecond: 1 / interval,
    interval,
    range: effRange(def, mods),
    target,
    projectiles: def.pattern === 'projectile' ? 1 : null,
  };
}

/** Average DPS across the placed towers (0 with none). */
export function averageDps(ids: WeaponId[], mods: StatMods): number {
  if (ids.length === 0) return 0;
  return ids.reduce((s, id) => s + towerStats(id, mods).dps, 0) / ids.length;
}

/** Numbers for display: at most one decimal, trailing ".0" dropped. */
export function fmt(n: number, digits = 1): string {
  const r = Number(n.toFixed(digits));
  return String(r);
}
