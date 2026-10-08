import { describe, expect, it } from 'vitest';
import { CARD_IDS, isWeaponId, STARTING_DECK } from '../src/game/content';
import { Deck, sacrificeOffers } from '../src/game/deck';
import { deriveStream, Rng } from '../src/game/rng';

describe('deck', () => {
  it('draws from the top, discards, and reshuffles the discard pile when empty', () => {
    const d = new Deck(STARTING_DECK, new Rng(1));
    expect(d.draw(4).length).toBe(4);
    d.discardHand();
    expect(d.draw(4).length).toBe(4);
    d.discardHand();
    expect(d.drawPile.length).toBe(2);
    const third = d.draw(4); // 2 from the pile, then the 8 discards are reshuffled in
    expect(third.length).toBe(4);
    expect(d.size).toBe(STARTING_DECK.length);
    expect(new Set([...d.drawPile, ...d.hand, ...d.discard].map((c) => c.uid)).size).toBe(STARTING_DECK.length);
  });

  it('draws fewer when the whole deck is in hand', () => {
    const d = new Deck(['needle', 'mend'], new Rng(2));
    expect(d.draw(4).length).toBe(2);
  });

  it('opening hand always contains a tower', () => {
    for (let seed = 1; seed < 300; seed++) {
      const d = new Deck(STARTING_DECK, deriveStream(seed, 'deck'));
      d.drawOpening(4);
      expect(d.hand.some((c) => isWeaponId(c.defId))).toBe(true);
      expect(d.hand.length).toBe(4);
      expect(d.size).toBe(STARTING_DECK.length);
    }
  });

  it('is deterministic per seed', () => {
    const a = new Deck(STARTING_DECK, deriveStream(9, 'deck'));
    const b = new Deck(STARTING_DECK, deriveStream(9, 'deck'));
    expect(a.drawOpening(4)).toEqual(b.drawOpening(4));
  });

  it('sacrifice offers: three distinct cards of any type; identical pairs guarantee that card', () => {
    const rng = new Rng(5);
    const seenTypes = new Set<string>();
    for (let i = 0; i < 500; i++) {
      const a = CARD_IDS[rng.int(CARD_IDS.length)];
      const b = i % 3 === 0 ? a : CARD_IDS[rng.int(CARD_IDS.length)];
      const offers = sacrificeOffers(rng, a, b);
      expect(offers.length).toBe(3);
      expect(new Set(offers).size).toBe(3);
      if (a === b) expect(offers).toContain(a);
      for (const o of offers) seenTypes.add(isWeaponId(o) ? 'tower' : 'spell');
    }
    expect(seenTypes).toEqual(new Set(['tower', 'spell']));
  });
});
