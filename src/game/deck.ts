// The run's Memory Deck: draw pile, hand and discard pile. Pure and seeded.
// Rules: draw N per turn; when the draw pile runs out the discard pile is shuffled back in;
// unplayed cards are discarded at the end of a turn. Played passives go to the discard pile; played
// towers and actives, sacrificed and purged cards leave the cycle entirely. If the deck holds fewer
// than the minimum at the start of a turn, Dust is shuffled into the draw pile.
import { CARD_IDS, isWeaponId } from './content';
import type { Rng } from './rng';
import type { CardId, CardInstance } from './types';

export class Deck {
  drawPile: CardInstance[] = [];
  hand: CardInstance[] = [];
  discard: CardInstance[] = [];
  private nextUid = 1;

  constructor(
    cards: CardId[],
    private rng: Rng,
  ) {
    this.drawPile = cards.map((defId) => this.make(defId));
    this.shuffle(this.drawPile);
  }

  private make(defId: CardId): CardInstance {
    return { uid: this.nextUid++, defId };
  }

  private shuffle(arr: CardInstance[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = this.rng.int(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  /** Total cards still in the run (draw + hand + discard). */
  get size(): number {
    return this.drawPile.length + this.hand.length + this.discard.length;
  }

  /** Draw up to `n` cards (top of the draw pile is the end of the array). Returns the drawn cards. */
  draw(n: number): CardInstance[] {
    const drawn: CardInstance[] = [];
    for (let k = 0; k < n; k++) {
      if (this.drawPile.length === 0) {
        if (this.discard.length === 0) break;
        this.drawPile = this.discard;
        this.discard = [];
        this.shuffle(this.drawPile);
      }
      const c = this.drawPile.pop()!;
      this.hand.push(c);
      drawn.push(c);
    }
    return drawn;
  }

  /** Opening hand: guarantees a tower card so the first turn can always place one. */
  drawOpening(n: number): CardInstance[] {
    const drawn = this.draw(n);
    if (!this.hand.some((c) => isWeaponId(c.defId))) {
      const ti = this.drawPile.findIndex((c) => isWeaponId(c.defId));
      if (ti >= 0 && this.hand.length > 0) {
        const swapOut = this.rng.int(this.hand.length);
        const tower = this.drawPile[ti];
        this.drawPile[ti] = this.hand[swapOut];
        this.hand[swapOut] = tower;
        drawn[drawn.indexOf(this.drawPile[ti])] = tower;
      }
    }
    return drawn;
  }

  discardHand(): CardInstance[] {
    const gone = this.hand;
    this.discard.push(...gone);
    this.hand = [];
    return gone;
  }

  inHand(uid: number): CardInstance | undefined {
    return this.hand.find((c) => c.uid === uid);
  }

  /** Remove a card from the hand without putting it anywhere (played, sacrificed, purged). */
  takeFromHand(uid: number): CardInstance | undefined {
    const i = this.hand.findIndex((c) => c.uid === uid);
    return i < 0 ? undefined : this.hand.splice(i, 1)[0];
  }

  /** A played passive goes to the discard pile. */
  discardFromHand(uid: number): CardInstance | undefined {
    const c = this.takeFromHand(uid);
    if (c) this.discard.push(c);
    return c;
  }

  /** Shuffle `defId` cards into the draw pile until the deck holds at least `min`. Returns them. */
  topUp(min: number, defId: CardId): CardInstance[] {
    const added: CardInstance[] = [];
    while (this.size < min) {
      const c = this.make(defId);
      this.drawPile.splice(this.rng.int(this.drawPile.length + 1), 0, c);
      added.push(c);
    }
    return added;
  }

  /** Add a newly created card (from a sacrifice) to the hand. */
  addToHand(defId: CardId): CardInstance {
    const c = this.make(defId);
    this.hand.push(c);
    return c;
  }
}

/**
 * Three distinct replacement offers for a sacrifice, drawn from every card type. If both sacrificed
 * cards are the same card, one offer is guaranteed to be that card (later: its upgraded variant).
 * Dust is never offered.
 */
export function sacrificeOffers(rng: Rng, a: CardId, b: CardId): CardId[] {
  const picks: CardId[] = [];
  if (a === b && CARD_IDS.includes(a)) picks.push(a);
  const pool = CARD_IDS.filter((id) => !picks.includes(id));
  while (picks.length < 3 && pool.length > 0) picks.push(pool.splice(rng.int(pool.length), 1)[0]);
  for (let i = picks.length - 1; i > 0; i--) {
    const j = rng.int(i + 1);
    [picks[i], picks[j]] = [picks[j], picks[i]];
  }
  return picks;
}
