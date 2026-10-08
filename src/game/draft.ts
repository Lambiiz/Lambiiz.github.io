// Seeded reward offers. Rules:
//  - three distinct definition IDs
//  - drafts 0 and 1 offer only weapons; later drafts may include eligible boons
//  - at least two weapon choices; at least one unowned weapon type while one exists
//  - excluded boons (capped Polish, Mend at full health) are replaced by eligible weapons
import { BOON_TUNING, BASE, WEAPON_IDS } from './content';
import type { Rng } from './rng';
import type { BoonId, CardId, WeaponId } from './types';

export interface OfferContext {
  draftIndex: number;
  ownedWeapons: Set<WeaponId>;
  polishStacks: number;
  baseHp: number;
}

export function eligibleBoons(ctx: OfferContext): BoonId[] {
  const out: BoonId[] = [];
  if (ctx.polishStacks < BOON_TUNING.polishMaxStacks) out.push('polish');
  if (ctx.baseHp < BASE.maxHealth) out.push('mend');
  return out;
}

export function generateOffer(rng: Rng, ctx: OfferContext): CardId[] {
  const picks: CardId[] = [];
  const unowned = WEAPON_IDS.filter((w) => !ctx.ownedWeapons.has(w));
  if (unowned.length > 0) picks.push(rng.pick(unowned));

  const boons: CardId[] = ctx.draftIndex >= 2 ? eligibleBoons(ctx) : [];
  while (picks.length < 3) {
    const weaponsSoFar = picks.filter((p) => (WEAPON_IDS as CardId[]).includes(p)).length;
    const slotsLeft = 3 - picks.length;
    const mustBeWeapon = weaponsSoFar + slotsLeft <= 2;
    const weaponPool = WEAPON_IDS.filter((w) => !picks.includes(w));
    const boonPool = mustBeWeapon ? [] : boons.filter((b) => !picks.includes(b));
    // Boons are drawn with a modest weight relative to the four weapon definitions.
    const pool: { id: CardId; w: number }[] = [
      ...weaponPool.map((id) => ({ id: id as CardId, w: 1 })),
      ...boonPool.map((id) => ({ id, w: 0.9 })),
    ];
    const total = pool.reduce((s, p) => s + p.w, 0);
    let r = rng.next() * total;
    let chosen = pool[pool.length - 1].id;
    for (const p of pool) {
      r -= p.w;
      if (r < 0) {
        chosen = p.id;
        break;
      }
    }
    picks.push(chosen);
  }
  // Shuffle presentation order so the guaranteed unowned weapon is not always first.
  for (let i = picks.length - 1; i > 0; i--) {
    const j = rng.int(i + 1);
    [picks[i], picks[j]] = [picks[j], picks[i]];
  }
  return picks;
}
