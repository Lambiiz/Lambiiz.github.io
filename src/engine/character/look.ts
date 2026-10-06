/**
 * What a character looks like: colours, hair, outfit, headwear, weapon, build. A look is turned into
 * a small 3D model (model.ts) and baked into pixel-art sprite sheets (bake.ts).
 */

export type HairStyle = 'short' | 'long' | 'ponytail' | 'spiky' | 'bob' | 'bun' | 'swept' | 'none';
export type Outfit = 'tunic' | 'robe' | 'dress' | 'coat' | 'armor' | 'apron';
export type Hat = 'none' | 'hood' | 'wide' | 'cap' | 'helmet' | 'kerchief' | 'circlet';
export type Weapon = 'none' | 'sword' | 'staff' | 'bow' | 'dagger' | 'spear' | 'axe';

export interface CharacterLook {
  skin: number;
  hair: number;
  hairStyle: HairStyle;
  eyes?: number;
  outfit: Outfit;
  /** Main garment (tunic, robe, coat, dress body). */
  top: number;
  /** Trousers / leggings. */
  bottom: number;
  boots: number;
  /** Belt, trim, collar. */
  accent: number;
  /** Second garment colour: coat lining, apron, armour plates, sleeves. */
  second?: number;
  cape?: number;
  scarf?: number;
  gloves?: number;
  hat?: Hat;
  hatColor?: number;
  beard?: number;
  weapon?: Weapon;
  /** 0.8 child … 1 adult … 1.08 tall. */
  height?: number;
  /** 1 normal, >1 stout. */
  girth?: number;
}

export const LOOKS = {
  hero: {
    skin: 0xf2c9a0, hair: 0x6a4630, hairStyle: 'swept', eyes: 0x3a5a8a, outfit: 'tunic', top: 0x3a6aa8, second: 0x2a4a7a,
    bottom: 0x4a4038, boots: 0x6a4428, accent: 0x9a6a34, cape: 0xb03a3a, gloves: 0x7a5434, weapon: 'sword',
  },
  mage: {
    skin: 0xf6d6bc, hair: 0xeae2d4, hairStyle: 'long', eyes: 0x8a3a9a, outfit: 'robe', top: 0x5a3a86, second: 0xd8b860,
    bottom: 0x3a2a4a, boots: 0x3a2a3a, accent: 0xd8b050, weapon: 'staff', hat: 'circlet', hatColor: 0xe0c060,
  },
  ranger: {
    skin: 0xd8a47a, hair: 0x2a2630, hairStyle: 'ponytail', eyes: 0x3a6a3a, outfit: 'coat', top: 0x4a6e3a, second: 0x8a7a50,
    bottom: 0x5a4a38, boots: 0x4a3222, accent: 0x9a7a4a, scarf: 0xb88a3a, gloves: 0x5a4030, weapon: 'bow',
  },
  elder: {
    skin: 0xe8c0a0, hair: 0xdcdcdc, hairStyle: 'short', outfit: 'robe', top: 0x6a5a48, second: 0x8a7a5a, bottom: 0x4a4038,
    boots: 0x4a3828, accent: 0xa88a3a, beard: 0xe6e6e6, height: 0.95,
  },
  merchant: {
    skin: 0xf0c8a0, hair: 0x7a4a2a, hairStyle: 'short', outfit: 'apron', top: 0xb05a3a, second: 0xeae2cc, bottom: 0x4a3a30,
    boots: 0x4a3020, accent: 0x7a5a3a, hat: 'cap', hatColor: 0x3a5a3a, girth: 1.2,
  },
  maid: {
    skin: 0xf6d6b8, hair: 0xc87a3a, hairStyle: 'bun', eyes: 0x4a6a3a, outfit: 'dress', top: 0x4a6a9a, second: 0xf0ece0,
    bottom: 0x3a3a4a, boots: 0x4a2e24, accent: 0xf0ece0, hat: 'kerchief', hatColor: 0xf0ece0,
  },
  guard: {
    skin: 0xe0b090, hair: 0x3a2a20, hairStyle: 'short', outfit: 'armor', top: 0x7a3a34, second: 0xb8c0cc, bottom: 0x3a3a44,
    boots: 0x3a3030, accent: 0x8a6a3a, hat: 'helmet', hatColor: 0xb8c0cc, weapon: 'spear', cape: 0x3a4a7a,
  },
  child: {
    skin: 0xf6d0b0, hair: 0xe8b850, hairStyle: 'bob', eyes: 0x3a6aaa, outfit: 'tunic', top: 0xc85a5a, second: 0xa04040,
    bottom: 0x5a4a3a, boots: 0x6a3a2a, accent: 0x7a5a3a, height: 0.78,
  },
  traveler: {
    skin: 0xe8b890, hair: 0x2a2a2a, hairStyle: 'short', outfit: 'coat', top: 0x8a7050, second: 0x5a4a3a, bottom: 0x4a4038,
    boots: 0x3a2a20, accent: 0x5a3a2a, hat: 'wide', hatColor: 0x5a4030, scarf: 0x9a3a3a,
  },
  bandit: {
    skin: 0xd09a78, hair: 0x2a1a14, hairStyle: 'spiky', eyes: 0x6a2a1a, outfit: 'tunic', top: 0x6a3a34, second: 0x4a2a28,
    bottom: 0x3a3030, boots: 0x2e2420, accent: 0x6a5a4a, scarf: 0x8a2a2a, gloves: 0x3a2a24, weapon: 'dagger',
  },
  archer: {
    skin: 0xd09a78, hair: 0x5a2a1a, hairStyle: 'short', outfit: 'coat', top: 0x5a4a30, second: 0x3a3020, bottom: 0x3a3030,
    boots: 0x2e2420, accent: 0x7a3a2a, hat: 'hood', hatColor: 0x3e4e2c, gloves: 0x3a2a24, weapon: 'bow',
  },
} satisfies Record<string, CharacterLook>;

export type LookName = keyof typeof LOOKS;

export function lookByName(name: string): CharacterLook {
  return (LOOKS as Record<string, CharacterLook>)[name] ?? LOOKS.hero;
}
