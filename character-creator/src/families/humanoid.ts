/**
 * Humanoids: the fantasy peoples and monsters that share the human body plan and animations —
 * elves, dwarves, orcs, goblins, trolls, lizardfolk, catfolk, skeletons, zombies and imps. They
 * reuse the human body, clothes and the biped animator, and add snouts, tusks, horns, tails, cat
 * ears, scales, fur and bone.
 */

import { Domain, PF } from '../anatomy/anatomy';
import { AnatomyBuilder } from '../anatomy/builder';
import { BipedAnimator } from '../anim/biped';
import { SIDES, gripXform, type BipedRig, type OffhandKind, type WeaponKind } from '../anim/bipedRig';
import { hexToOklch, mixHex, oklch, type Hex } from '../core/color';
import { Vec3, clamp, lerp } from '../core/math';
import type { Rng } from '../core/rng';
import { SchemaBuilder, type GeneValue, type Genes } from '../genome/schema';
import type { BuiltParts, Family, SampleContext } from '../model/types';
import type { StyleName } from '../render/materials';
import { NO_SURFACE } from '../render/surface';
import { humanMaterials, syllableName } from './human';
import {
  HAIR_STYLES, buildBackItem, buildBow, buildFacialHair, buildHair, buildHeadwear, buildHumanBody, buildOffhand, buildWeapon, dressExtras, dressLegs, dressTorso,
  hairChainFor, hatCoversHair, type Bottom, type FacialHair, type HairStyle, type Headwear, type HumanBody, type Shoes, type Sleeves, type Top,
} from './humanBody';

type W = readonly (readonly [string, number])[];

const RACES = [['elf', 'Elf'], ['dwarf', 'Dwarf'], ['orc', 'Orc'], ['goblin', 'Goblin'], ['troll', 'Troll'], ['lizardfolk', 'Lizardfolk'], ['catfolk', 'Catfolk'], ['skeleton', 'Skeleton'], ['zombie', 'Zombie'], ['imp', 'Imp']] as const;

const opt = (...xs: string[][]) => xs as unknown as readonly (readonly [string, string])[];

const schema = new SchemaBuilder()
  .group('body', 'Body', 'anatomy')
  .float('height', 'Height', 0.5)
  .float('mass', 'Build', 0.4)
  .float('muscle', 'Muscle', 0.4)
  .float('frame', 'Frame', 0.4, { help: 'Broad shoulders ↔ wide hips.' })
  .float('heads', 'Head size', 0.5, { help: 'Small head (tall proportions) ↔ big head (stocky proportions).' })
  .float('legs', 'Leg length', 0.5)
  .float('arms', 'Arm length', 0.5)
  .float('posture', 'Hunch', 0.15)
  .float('belly', 'Belly', 0.2)
  .group('head', 'Head', 'anatomy')
  .float('snout', 'Snout', 0.0, { help: 'Flat face ↔ long muzzle.' })
  .float('nose', 'Nose', 0.5)
  .float('jaw', 'Jaw', 0.5)
  .choice('ears', 'Ears', opt(['round', 'Round'], ['pointed', 'Pointed'], ['long', 'Long & pointed'], ['cat', 'Cat ears'], ['none', 'None']), 'pointed')
  .choice('horns', 'Horns', opt(['none', 'None'], ['short', 'Short'], ['curved', 'Curved'], ['ram', 'Ram'], ['long', 'Long']), 'none')
  .bool('tusks', 'Tusks', false)
  .choice('eyeStyle', 'Eyes', opt(['human', 'Human'], ['bead', 'Beady'], ['slit', 'Slit pupils'], ['glow', 'Glowing'], ['round', 'Round']), 'human')
  .float('eyeSize', 'Eye size', 0.5)
  .choice('tail', 'Tail', opt(['none', 'None'], ['thin', 'Thin'], ['thick', 'Thick'], ['tufted', 'Tufted'], ['spade', 'Spade']), 'none')
  .float('tailLength', 'Tail length', 0.5)
  .group('hair', 'Hair', 'anatomy')
  .choice('hairStyle', 'Hair style', HAIR_STYLES, 'short')
  .float('hairVolume', 'Volume', 0.5)
  .choice('facialHair', 'Facial hair', opt(['none', 'None'], ['stubble', 'Stubble'], ['mustache', 'Mustache'], ['goatee', 'Goatee'], ['beard', 'Beard'], ['longbeard', 'Long beard']), 'none')
  .group('outfit', 'Outfit', 'anatomy')
  .choice('top', 'Top', opt(['none', 'None'], ['shirt', 'Shirt'], ['tunic', 'Tunic'], ['vest', 'Shirt & vest'], ['coat', 'Long coat'], ['robe', 'Robe'], ['dress', 'Dress'], ['leather', 'Leather armour'], ['chainmail', 'Chain mail'], ['plate', 'Plate armour'], ['rags', 'Rags']), 'tunic')
  .choice('sleeves', 'Sleeves', opt(['none', 'None'], ['short', 'Short'], ['long', 'Long']), 'short')
  .choice('bottom', 'Bottom', opt(['trousers', 'Trousers'], ['shorts', 'Shorts'], ['leggings', 'Leggings'], ['skirt', 'Skirt'], ['longskirt', 'Long skirt'], ['loincloth', 'Loincloth']), 'trousers')
  .choice('shoes', 'Footwear', opt(['barefoot', 'Barefoot'], ['sandals', 'Sandals'], ['shoes', 'Shoes'], ['boots', 'Boots'], ['tallboots', 'Tall boots']), 'boots')
  .bool('belt', 'Belt', true)
  .choice('gloves', 'Gloves', opt(['none', 'None'], ['gloves', 'Gloves'], ['gauntlets', 'Gauntlets']), 'none')
  .choice('cape', 'Cape', opt(['none', 'None'], ['cape', 'Cape'], ['cloak', 'Cloak']), 'none')
  .choice('headwear', 'Headwear', opt(['none', 'None'], ['hood', 'Hood'], ['cap', 'Cap'], ['bandana', 'Bandana'], ['helmet', 'Helmet'], ['horned', 'Horned helmet'], ['greathelm', 'Great helm'], ['crown', 'Crown'], ['circlet', 'Circlet'], ['wizard', 'Wizard hat']), 'none')
  .group('gear', 'Equipment', 'anatomy')
  .choice('weapon', 'Main hand', opt(['none', 'None'], ['sword', 'Sword'], ['dagger', 'Dagger'], ['axe', 'Axe'], ['mace', 'Mace'], ['hammer', 'Hammer'], ['club', 'Club'], ['spear', 'Spear'], ['staff', 'Staff'], ['wand', 'Wand'], ['bow', 'Bow']), 'none')
  .choice('offhand', 'Off hand', opt(['none', 'None'], ['shield', 'Shield'], ['buckler', 'Buckler'], ['torch', 'Torch'], ['lantern', 'Lantern'], ['book', 'Book']), 'none')
  .choice('back', 'On the back', opt(['none', 'None'], ['backpack', 'Backpack'], ['quiver', 'Quiver']), 'none')
  .float('weaponSize', 'Weapon size', 0.5)
  .group('colors', 'Colours', 'color')
  .color('skinColor', 'Skin / scales', 0x6a8a4a)
  .choice('skinType', 'Surface', opt(['skin', 'Skin'], ['scales', 'Scales'], ['fur', 'Fur'], ['bone', 'Bone'], ['hide', 'Rough hide']), 'skin')
  .color('eyeColor', 'Eyes', 0xd0a030)
  .color('hairColor', 'Hair', 0x2a2420)
  .color('topColor', 'Top', 0x6a5a3a)
  .color('secondColor', 'Second', 0xb8ac94)
  .color('trimColor', 'Trim', 0x8a5a2a)
  .color('pantsColor', 'Trousers / skirt', 0x4a4038)
  .color('bootsColor', 'Footwear', 0x4a3424)
  .color('leatherColor', 'Leather', 0x6a4a2e)
  .color('capeColor', 'Cape', 0x5a2a2a)
  .color('hatColor', 'Headwear', 0x4a4a3a)
  .color('shieldColor', 'Shield', 0x6a3a2a)
  .choice('metal', 'Metal', opt(['steel', 'Steel'], ['iron', 'Dark iron'], ['bronze', 'Bronze'], ['gold', 'Gold'], ['silver', 'Silver']), 'iron')
  .color('glowColor', 'Magic glow', 0x8affb0)
  .group('motion', 'Motion', 'motion')
  .float('energy', 'Energy', 0.5)
  .float('swing', 'Arm swing', 0.5)
  .float('weight', 'Heaviness', 0.5)
  .build();

interface RacePrior {
  weight: number;
  H: number;
  heads: number;
  mass: [number, number];
  muscle: [number, number];
  posture: [number, number];
  legs?: number;
  arms?: number;
  snout?: [number, number];
  nose?: [number, number];
  jaw?: [number, number];
  ears: W;
  horns?: W;
  tusks?: number;
  eye: W;
  tail?: W;
  skins: Hex[];
  skinType: string;
  hair: W;
  hairColors: Hex[];
  beard?: number;
  top: W;
  bottom: W;
  shoes: W;
  head: W;
  weapon: W;
  offhand: W;
  cape?: W;
  dyes: Hex[];
  eyes: Hex[];
  thin?: number;
  armsForward?: boolean;
  digitigrade?: boolean;
}

const BROWNS = [0x5a4a3a, 0x6a5a3a, 0x4a3c30, 0x7a6a4a, 0x3a3a30];
const PRIORS: Record<string, RacePrior> = {
  elf: {
    weight: 1.2, H: 1.05, heads: 7.8, mass: [0.1, 0.35], muscle: [0.2, 0.45], posture: [0, 0.05], legs: 0.65,
    ears: [['long', 3], ['pointed', 1]], eye: [['human', 4], ['round', 1]],
    skins: [0xf2d6c0, 0xe8c4a4, 0xd8b090, 0xa87a5a, 0x7a5a48, 0xc8d0dc], skinType: 'skin',
    hair: [['long', 3], ['ponytail', 1.5], ['braid', 1.5], ['shoulder', 1], ['bun', 0.6], ['short', 0.6]], hairColors: [0xe8dcb4, 0xd8c890, 0x2a2420, 0x8a3b20, 0xc8d0e0, 0x4a3020],
    top: [['tunic', 2], ['robe', 1.5], ['leather', 1.5], ['dress', 1], ['coat', 0.8]], bottom: [['leggings', 2], ['trousers', 2], ['longskirt', 0.5]], shoes: [['tallboots', 2], ['boots', 1], ['shoes', 1]],
    head: [['none', 4], ['circlet', 1.5], ['hood', 1.5]], weapon: [['bow', 3], ['sword', 1.5], ['staff', 1.5], ['dagger', 0.6], ['spear', 0.6]], offhand: [['none', 4], ['buckler', 0.3]], cape: [['cloak', 2], ['none', 2], ['cape', 0.6]],
    dyes: [0x3e6a3a, 0x6a8a4a, 0x8a7a4a, 0x3a5a6a, 0xd8d0b8, 0x5a3a6a], eyes: [0x4a8a5a, 0x5a7ab0, 0x8a6aaa, 0xa08a3a],
  },
  dwarf: {
    weight: 1.2, H: 0.74, heads: 5.0, mass: [0.6, 0.95], muscle: [0.6, 0.95], posture: [0.05, 0.15], legs: 0.15, arms: 0.55,
    nose: [0.75, 1], jaw: [0.6, 0.9], ears: [['round', 1]], eye: [['human', 3], ['bead', 1]],
    skins: [0xf0c8a8, 0xe0b090, 0xc89070, 0xa06a4a, 0x7a4a34], skinType: 'skin',
    hair: [['short', 2], ['braid', 1.5], ['long', 1], ['bald', 1], ['receding', 1]], hairColors: [0x8a3b20, 0xa94c24, 0x3b2a20, 0x1f1a18, 0x9a9590, 0xc8884e], beard: 0.95,
    top: [['chainmail', 2], ['plate', 1.2], ['leather', 1.5], ['tunic', 1.5]], bottom: [['trousers', 1]], shoes: [['boots', 3], ['tallboots', 1]],
    head: [['helmet', 2], ['horned', 1.5], ['none', 1.5], ['cap', 0.5]], weapon: [['axe', 3], ['hammer', 3], ['mace', 0.6], ['none', 0.3]], offhand: [['none', 2], ['shield', 1.5], ['lantern', 0.6], ['torch', 0.4]],
    dyes: [0x7a2e2e, 0x2e4a7a, 0x3a5a2e, 0x6a5a3a, 0x5a3a2a], eyes: [0x3a2a1a, 0x4a6aa0, 0x5a4a2a],
  },
  orc: {
    weight: 1.3, H: 1.08, heads: 6.8, mass: [0.45, 0.8], muscle: [0.65, 1], posture: [0.15, 0.35], arms: 0.65,
    nose: [0.3, 0.6], jaw: [0.75, 1], ears: [['pointed', 3], ['round', 0.5]], tusks: 0.9, eye: [['bead', 2], ['human', 1], ['glow', 0.3]],
    skins: [0x6a8a4a, 0x5a7a40, 0x7a8a5a, 0x6a7a6a, 0x8a8a6a, 0x5a6a4a], skinType: 'hide',
    hair: [['mohawk', 1.5], ['topknot', 1.5], ['bald', 2], ['long', 1], ['braid', 1]], hairColors: [0x1f1a18, 0x2e221c, 0x3b2a20], beard: 0.1,
    top: [['leather', 2.5], ['none', 1.5], ['chainmail', 1], ['plate', 0.5], ['rags', 0.8]], bottom: [['trousers', 2], ['loincloth', 1.5]], shoes: [['boots', 2], ['barefoot', 0.8]],
    head: [['none', 3], ['horned', 1], ['helmet', 1], ['bandana', 0.5]], weapon: [['axe', 3], ['club', 1.5], ['spear', 1], ['hammer', 1], ['sword', 0.5]], offhand: [['none', 2], ['shield', 1.2]],
    dyes: BROWNS.concat([0x7a2e2e, 0x3a2a2a]), eyes: [0xd0a030, 0xb03a2a, 0x3a2a1a],
  },
  goblin: {
    weight: 1.3, H: 0.62, heads: 4.3, mass: [0.1, 0.4], muscle: [0.05, 0.3], posture: [0.3, 0.6], legs: 0.4, arms: 0.7,
    nose: [0.8, 1], jaw: [0.3, 0.6], ears: [['long', 4], ['pointed', 1]], eye: [['round', 2], ['slit', 1], ['bead', 1]],
    skins: [0x7aa04a, 0x6a9a3a, 0x8aa85a, 0x9aa05a, 0x5a8a4a, 0x8a9a7a], skinType: 'skin',
    hair: [['bald', 4], ['mohawk', 1], ['buzz', 1], ['curly', 0.5]], hairColors: [0x1f1a18, 0x3b2a20, 0x5a2a1a],
    top: [['rags', 2], ['none', 2], ['leather', 1], ['tunic', 1]], bottom: [['loincloth', 3], ['shorts', 1.5], ['trousers', 1]], shoes: [['barefoot', 3], ['sandals', 1], ['boots', 0.6]],
    head: [['none', 4], ['cap', 0.8], ['hood', 1], ['bandana', 0.5]], weapon: [['dagger', 2], ['spear', 1.5], ['club', 1], ['bow', 0.6], ['none', 1]], offhand: [['none', 3], ['torch', 0.6], ['buckler', 0.4]],
    dyes: BROWNS.concat([0x6a3a2a, 0x4a4a3a]), eyes: [0xd0b030, 0xd06a2a, 0xa0302a],
  },
  troll: {
    weight: 0.8, H: 1.32, heads: 7.6, mass: [0.35, 0.65], muscle: [0.4, 0.7], posture: [0.55, 0.85], legs: 0.45, arms: 1,
    nose: [0.85, 1], jaw: [0.6, 0.9], ears: [['pointed', 2], ['long', 1]], tusks: 0.6, eye: [['bead', 3], ['glow', 0.5]],
    skins: [0x6a7a8a, 0x5a8a7a, 0x7a8a6a, 0x6a6a5a, 0x8a9a9a], skinType: 'hide',
    hair: [['long', 2], ['bald', 2], ['mohawk', 0.6]], hairColors: [0x2a3a2a, 0x3b2a20, 0x5a5a4a],
    top: [['none', 3], ['rags', 1.5]], bottom: [['loincloth', 4], ['shorts', 1]], shoes: [['barefoot', 1]],
    head: [['none', 6], ['horned', 0.4]], weapon: [['club', 4], ['hammer', 1], ['none', 1.5]], offhand: [['none', 1]],
    dyes: BROWNS, eyes: [0xd0a030, 0x2a2a2a],
  },
  lizardfolk: {
    weight: 1, H: 1.0, heads: 7.0, mass: [0.3, 0.6], muscle: [0.4, 0.7], posture: [0.15, 0.35], legs: 0.45,
    snout: [0.55, 0.85], ears: [['none', 1]], horns: [['none', 3], ['short', 1]], eye: [['slit', 4], ['bead', 1]], tail: [['thick', 1]],
    skins: [0x4a8a4a, 0x3a7a5a, 0x6a8a3a, 0x8a7a3a, 0x3a6a7a, 0x8a4a3a, 0x5a5a8a], skinType: 'scales',
    hair: [['bald', 1]], hairColors: [0x1f1a18],
    top: [['none', 2], ['leather', 2], ['rags', 0.8]], bottom: [['loincloth', 3], ['shorts', 0.8]], shoes: [['barefoot', 1]],
    head: [['none', 6], ['bandana', 0.5]], weapon: [['spear', 3], ['club', 1], ['axe', 1], ['bow', 0.5]], offhand: [['shield', 1.5], ['none', 2]],
    dyes: BROWNS.concat([0x3a4a3a]), eyes: [0xd0b030, 0xd06a2a, 0xa0c040], digitigrade: true,
  },
  catfolk: {
    weight: 1, H: 0.96, heads: 7.0, mass: [0.15, 0.4], muscle: [0.3, 0.55], posture: [0.05, 0.2], legs: 0.6,
    snout: [0.18, 0.32], ears: [['cat', 1]], eye: [['slit', 4], ['round', 1]], tail: [['thin', 2], ['tufted', 0.5]],
    skins: [0xd89a4a, 0xc8a070, 0x8a7a6a, 0x3a3434, 0xe8dcc8, 0xb06a3a, 0x9a8a7a], skinType: 'fur',
    hair: [['short', 2], ['shoulder', 1.5], ['ponytail', 1], ['long', 1], ['bob', 1]], hairColors: [0x3b2a20, 0xe8dcc8, 0x1f1a18, 0xa94c24],
    top: [['leather', 2], ['tunic', 1.5], ['vest', 1], ['coat', 0.6]], bottom: [['trousers', 2], ['leggings', 1.5], ['shorts', 0.6]], shoes: [['barefoot', 2], ['sandals', 1], ['boots', 1]],
    head: [['none', 5], ['bandana', 0.8], ['hood', 0.5]], weapon: [['dagger', 2], ['sword', 1], ['bow', 1], ['spear', 0.6], ['none', 1]], offhand: [['none', 4], ['buckler', 0.5]], cape: [['none', 3], ['cloak', 1]],
    dyes: [0x7a2e2e, 0x2e4a7a, 0x3a5a2e, 0x6a5a3a, 0x2a2a30, 0xc89a2e], eyes: [0x9ac040, 0xd0a030, 0x4a9ab0], digitigrade: true,
  },
  skeleton: {
    weight: 1, H: 1.0, heads: 7.3, mass: [0, 0.1], muscle: [0, 0], posture: [0.05, 0.2], ears: [['none', 1]], eye: [['glow', 1]], thin: 1,
    skins: [0xe6dcc4, 0xd8ccb0, 0xc8c0a8], skinType: 'bone',
    hair: [['bald', 1]], hairColors: [0x1f1a18],
    top: [['none', 4], ['rags', 1], ['chainmail', 0.6]], bottom: [['loincloth', 1], ['none' as string, 2]], shoes: [['barefoot', 1]],
    head: [['none', 4], ['helmet', 1], ['crown', 0.2], ['horned', 0.4]], weapon: [['sword', 2], ['axe', 1], ['spear', 1], ['bow', 0.6], ['staff', 0.4]], offhand: [['shield', 1.5], ['none', 2]],
    dyes: BROWNS, eyes: [0xff5a3a, 0x5ae0ff, 0x8aff6a],
  },
  zombie: {
    weight: 0.8, H: 0.98, heads: 7.2, mass: [0.15, 0.5], muscle: [0.1, 0.3], posture: [0.5, 0.8], ears: [['round', 1]], eye: [['bead', 2], ['glow', 1]], armsForward: true,
    skins: [0x8a9a7a, 0x7a8a7a, 0x9a9a8a, 0x6a7a6a], skinType: 'skin',
    hair: [['bald', 2], ['shoulder', 1], ['receding', 1], ['short', 1]], hairColors: [0x3b3a30, 0x5a5048, 0x2a2a28],
    top: [['rags', 4], ['shirt', 1]], bottom: [['trousers', 2], ['shorts', 1]], shoes: [['barefoot', 2], ['shoes', 1]],
    head: [['none', 1]], weapon: [['none', 1]], offhand: [['none', 1]],
    dyes: [0x5a5a4a, 0x6a5a4a, 0x4a4a52, 0x7a6a5a], eyes: [0xd8d8a0, 0xff5a3a],
  },
  imp: {
    weight: 0.7, H: 0.55, heads: 4.4, mass: [0.1, 0.35], muscle: [0.1, 0.35], posture: [0.15, 0.35], legs: 0.5,
    snout: [0, 0.1], ears: [['long', 2], ['pointed', 1]], horns: [['curved', 2], ['short', 1.5], ['ram', 0.5]], eye: [['glow', 2], ['slit', 1]], tail: [['spade', 3], ['thin', 1]],
    skins: [0xb03a2e, 0xa02a3a, 0x8a2a5a, 0xc8502e, 0x5a2a6a], skinType: 'skin',
    hair: [['bald', 3], ['mohawk', 0.6]], hairColors: [0x1f1a18],
    top: [['none', 4], ['rags', 0.8]], bottom: [['loincloth', 3], ['shorts', 1]], shoes: [['barefoot', 1]],
    head: [['none', 1]], weapon: [['none', 2], ['spear', 1.5], ['staff', 0.6], ['dagger', 0.6]], offhand: [['none', 1]],
    dyes: [0x2a2a30, 0x4a2a2a], eyes: [0xffd040, 0xff6a2a], digitigrade: true,
  },
};

const pick = (rng: Rng, w: W) => rng.pickWeighted(w);
const jitter = (rng: Rng, c: Hex, amt = 1) => {
  const l = hexToOklch(c);
  return oklch(l.l + rng.gaussian(0, 0.035 * amt), l.c * (1 + rng.gaussian(0, 0.12 * amt)), l.h + rng.gaussian(0, 8 * amt));
};

function sample(ctx: SampleContext): Record<string, GeneValue> {
  const p = PRIORS[ctx.arch] ?? PRIORS.orc;
  const a = ctx.rng('anatomy'), c = ctx.rng('color'), m = ctx.rng('motion');
  const r = (lo: number, hi: number) => clamp(a.range(lo, hi), 0, 1);
  const v: Record<string, GeneValue> = {
    height: clamp(a.gaussian(0.5, 0.18), 0, 1), mass: r(...p.mass), muscle: r(...p.muscle), frame: clamp(a.gaussian(0.35, 0.2), 0, 1),
    heads: clamp(a.gaussian(0.5, 0.15), 0, 1), legs: clamp(a.gaussian(p.legs ?? 0.5, 0.1), 0, 1), arms: clamp(a.gaussian(p.arms ?? 0.5, 0.08), 0, 1),
    posture: r(...p.posture), belly: clamp(a.gaussian(0.2, 0.15), 0, 1),
    snout: p.snout ? r(...p.snout) : 0, nose: p.nose ? r(...p.nose) : clamp(a.gaussian(0.45, 0.15), 0, 1), jaw: p.jaw ? r(...p.jaw) : clamp(a.gaussian(0.5, 0.15), 0, 1),
    ears: pick(a, p.ears), horns: p.horns ? pick(a, p.horns) : 'none', tusks: a.chance(p.tusks ?? 0), eyeStyle: pick(a, p.eye), eyeSize: clamp(a.gaussian(0.5, 0.15), 0, 1),
    tail: p.tail ? pick(a, p.tail) : 'none', tailLength: clamp(a.gaussian(0.55, 0.15), 0, 1),
    hairStyle: pick(a, p.hair), hairVolume: clamp(a.gaussian(0.5, 0.2), 0, 1),
    facialHair: a.chance(p.beard ?? 0) ? pick(a, [['beard', 2], ['longbeard', 2], ['goatee', 0.5], ['mustache', 0.4]]) : 'none',
    top: pick(a, p.top), sleeves: pick(a, [['short', 2], ['long', 1.5], ['none', 1]]), bottom: pick(a, p.bottom), shoes: pick(a, p.shoes),
    belt: a.chance(0.6), gloves: a.chance(0.2) ? 'gloves' : 'none', cape: p.cape ? pick(a, p.cape) : 'none', headwear: pick(a, p.head),
    weapon: pick(a, p.weapon), offhand: pick(a, p.offhand), weaponSize: clamp(a.gaussian(0.5, 0.12), 0, 1),
  };
  if (v.bottom === 'none') v.bottom = 'loincloth';
  if (v.weapon === 'bow') {
    v.offhand = 'none';
    v.back = 'quiver';
  } else v.back = a.chance(0.1) ? 'backpack' : 'none';
  v.skinColor = jitter(c, c.pick(p.skins), 0.8);
  v.skinType = p.skinType;
  v.eyeColor = c.pick(p.eyes);
  v.hairColor = jitter(c, c.pick(p.hairColors), 0.5);
  v.topColor = jitter(c, c.pick(p.dyes));
  v.secondColor = jitter(c, c.pick([0xb8ac94, 0xa89a78, 0x8a7a5a, 0xd8ccb0]));
  v.trimColor = jitter(c, c.pick([0x8a5a2a, 0x6a4a2a, 0xa88a4a, 0x7a2e2e]));
  v.pantsColor = jitter(c, c.pick([0x4a3c30, 0x5a4a38, 0x3c3c44, 0x6a5a42, 0x5a5048]));
  v.bootsColor = jitter(c, c.pick([0x4a3424, 0x3a2a20, 0x5a3e28]));
  v.leatherColor = jitter(c, c.pick([0x6a4a2e, 0x5a3e28, 0x7a5434, 0x4a3424]));
  v.capeColor = jitter(c, c.pick(p.dyes));
  v.hatColor = jitter(c, c.pick(p.dyes));
  v.shieldColor = jitter(c, c.pick([0x6a3a2a, 0x5a4a3a, 0x3a4a5a, 0x7a2e2e]));
  v.metal = pick(c, [['iron', 3], ['steel', 2], ['bronze', 1.2]]);
  v.glowColor = c.pick([0x8affb0, 0x6ad0ff, 0xff7a4a, 0xc07aff]);
  v.energy = clamp(m.gaussian(ctx.arch === 'goblin' || ctx.arch === 'imp' ? 0.75 : ctx.arch === 'zombie' || ctx.arch === 'troll' ? 0.2 : 0.5, 0.15), 0, 1);
  v.swing = clamp(m.gaussian(0.5, 0.18), 0, 1);
  v.weight = clamp(m.gaussian(ctx.arch === 'troll' || ctx.arch === 'dwarf' ? 0.75 : 0.45, 0.12), 0, 1);
  return v;
}

/** Tusks, horns, cat ears and tails on a humanoid body. */
function extras(body: HumanBody, g: Genes, tail: string): void {
  const { b, B, h, C } = body;
  const R = body.skull.radii;
  if (g.b('tusks')) {
    const gt = b.group('tusks', 0, { depthBias: 0.3 });
    for (const side of SIDES) b.cone(gt, B.head, new Vec3(0.38 * h, 0.2 * h, side * 0.13 * h), 0.055 * h + 0.15, B.head, new Vec3(0.48 * h, 0.4 * h, side * 0.19 * h), 0.02 * h + 0.1, 'bone', { side, flags: PF.NoPattern });
  }
  const horns = g.c('horns');
  if (horns !== 'none') {
    for (const side of SIDES) {
      const gh = b.group('horn', h * 0.08, { side, depthBias: 0.2 });
      const base = C.add(new Vec3(0.12 * h, 0.32 * h, side * R.z * 0.55));
      const o = { side, flags: PF.NoPattern };
      if (horns === 'short') b.cone(gh, B.head, base, 0.1 * h, B.head, base.add(new Vec3(-0.05 * h, 0.3 * h, side * 0.08 * h)), 0.03 * h, 'bone', o);
      else if (horns === 'long') {
        const mid = base.add(new Vec3(-0.25 * h, 0.35 * h, side * 0.1 * h));
        b.cone(gh, B.head, base, 0.11 * h, B.head, mid, 0.07 * h, 'bone', o);
        b.cone(gh, B.head, mid, 0.07 * h, B.head, mid.add(new Vec3(-0.45 * h, 0.15 * h, side * 0.06 * h)), 0.02 * h, 'bone', o);
      } else if (horns === 'ram') {
        const p1 = base.add(new Vec3(-0.3 * h, 0.12 * h, side * 0.25 * h)), p2 = p1.add(new Vec3(-0.1 * h, -0.35 * h, side * 0.1 * h)), p3 = p2.add(new Vec3(0.25 * h, -0.12 * h, 0));
        b.cone(gh, B.head, base, 0.13 * h, B.head, p1, 0.11 * h, 'bone', o);
        b.cone(gh, B.head, p1, 0.11 * h, B.head, p2, 0.08 * h, 'bone', o);
        b.cone(gh, B.head, p2, 0.08 * h, B.head, p3, 0.04 * h, 'bone', o);
      } else {
        const mid = base.add(new Vec3(0.02 * h, 0.3 * h, side * 0.2 * h));
        b.cone(gh, B.head, base, 0.1 * h, B.head, mid, 0.07 * h, 'bone', o);
        b.cone(gh, B.head, mid, 0.07 * h, B.head, mid.add(new Vec3(0.18 * h, 0.22 * h, -side * 0.05 * h)), 0.02 * h, 'bone', o);
      }
    }
  }
  if (g.c('ears') === 'cat') {
    for (const side of SIDES) {
      const ge = b.group('catEar', h * 0.06, { side, depthBias: 0.1 });
      const base = C.add(new Vec3(-0.02 * h, 0.36 * h, side * R.z * 0.62));
      b.cone(ge, B.head, base, 0.15 * h, B.head, base.add(new Vec3(0.02 * h, 0.32 * h, side * 0.08 * h)), 0.03 * h, 'skin', { side, domain: Domain.Head });
    }
  }
  if (tail !== 'none' && B.tail.length) {
    const gt = b.group('tail', h * 0.1, { depthBias: -0.1 });
    const n = B.tail.length;
    const r0 = (tail === 'thick' ? 0.24 : 0.09) * h;
    const seg = b.bones[B.tail[1]]?.rest.origin.x ?? h * 0.5;
    for (let i = 0; i < n; i++) {
      const t0 = i / n, t1 = (i + 1) / n;
      const ra = r0 * (1 - t0 * (tail === 'thick' ? 0.85 : 0.5)), rb = r0 * (1 - t1 * (tail === 'thick' ? 0.85 : 0.5));
      if (i < n - 1) b.cone(gt, B.tail[i], Vec3.ZERO, ra, B.tail[i + 1], Vec3.ZERO, rb, 'skin', { domain: Domain.Tail, u0: t0, u1: t1 });
      else b.cone(gt, B.tail[i], Vec3.ZERO, ra, B.tail[i], new Vec3(seg, 0, 0), rb, 'skin', { domain: Domain.Tail, u0: t0, u1: t1 });
    }
    const tip = B.tail[n - 1];
    if (tail === 'tufted') b.ellipsoid(gt, tip, new Vec3(seg * 1.1, 0, 0), new Vec3(0.2 * h, 0.12 * h, 0.12 * h), 'hair', {});
    if (tail === 'spade') b.ellipsoid(gt, tip, new Vec3(seg * 1.15, 0, 0), new Vec3(0.16 * h, 0.13 * h, 0.04 * h + 0.2), 'skin', { flags: PF.Hard });
  }
}

function build(g: Genes, genome: { archetype: string }, scale: number): BuiltParts {
  const race = genome.archetype;
  const p = PRIORS[race] ?? PRIORS.orc;
  const H = 64 * p.H * lerp(0.9, 1.1, g.f('height')) * scale;
  const heads = p.heads * lerp(1.12, 0.88, g.f('heads'));
  const h = H / heads;
  const b = new AnatomyBuilder(scale);
  const top = g.c('top') as Top, bottom = g.c('bottom') as Bottom, sleeves = g.c('sleeves') as Sleeves, shoes = g.c('shoes') as Shoes;
  const weapon = g.c('weapon') as WeaponKind;
  const offhand = (weapon === 'bow' ? 'none' : g.c('offhand')) as OffhandKind;
  const headwear = g.c('headwear') as Headwear;
  const hairStyle = g.c('hairStyle') as HairStyle;
  const tail = g.c('tail');
  const cape = g.c('cape') as 'none' | 'cape' | 'cloak';
  const skirtish = ['tunic', 'coat', 'robe', 'dress', 'chainmail', 'plate', 'leather', 'rags'].includes(top) || ['skirt', 'longskirt', 'loincloth'].includes(bottom);
  const digi = !!p.digitigrade;
  const covered = new Set<'torso' | 'pelvis' | 'upper' | 'fore' | 'hand' | 'thigh' | 'shin' | 'foot'>();
  if (top !== 'none') covered.add('torso');
  if (['trousers', 'leggings', 'shorts', 'skirt', 'longskirt'].includes(bottom)) covered.add('pelvis');
  if (bottom === 'trousers' || bottom === 'leggings') covered.add('thigh').add('shin');
  if ((top !== 'none' && top !== 'rags' && top !== 'plate' && top !== 'chainmail' && sleeves === 'long') || top === 'robe' || top === 'coat') covered.add('upper').add('fore');
  if (shoes !== 'barefoot' && shoes !== 'sandals' && !digi) covered.add('foot');
  const tailLen = lerp(0.6, 1.4, g.f('tailLength'));
  const body = buildHumanBody(b, {
    H, heads, legs: g.f('legs'), mass: g.f('mass'), muscle: g.f('muscle'), frame: g.f('frame'), bust: race === 'skeleton' ? 0 : g.f('frame') * 0.4,
    belly: g.f('belly'), headWidth: race === 'goblin' || race === 'imp' ? 0.7 : 0.5, jaw: g.f('jaw'), nose: g.f('nose'), eyeSize: g.f('eyeSize'),
    hunch: g.f('posture') * 0.55, arms: lerp(0.9, 1.3, g.f('arms')), snout: g.f('snout') * 1.1,
    ears: (g.c('ears') === 'cat' ? 'none' : g.c('ears')) as 'round', digitigrade: digi, eyeStyle: g.c('eyeStyle'), thin: p.thin, covered,
    noFace: race === 'skeleton',
  }, {
    cape: cape !== 'none', skirt: skirtish, quiver: g.c('back') === 'quiver', hairChain: hairChainFor(hairStyle, h),
    tail: tail !== 'none' ? { count: 4, seg: h * (tail === 'thick' ? 0.55 : 0.5) * tailLen, pitch: tail === 'thick' ? -0.35 : 0.15, curl: tail === 'thick' ? 0.08 : -0.25 } : undefined,
  });
  dressLegs(body, bottom, digi && shoes !== 'barefoot' ? 'sandals' : shoes, 'pants', { greaves: top === 'plate' });
  dressTorso(body, top, sleeves, { top: 'top', second: 'second', trim: 'trim' });
  dressExtras(body, { belt: g.b('belt'), gloves: top === 'plate' ? 'gauntlets' : (g.c('gloves') as 'none'), scarf: false, apron: false, cape, pouch: false }, { trim: 'trim', cape: 'cape', apron: 'second' });
  buildHair(body, hairStyle, g.f('hairVolume'), hatCoversHair(headwear));
  buildFacialHair(body, g.c('facialHair') as FacialHair);
  buildHeadwear(body, headwear, 'hat');
  const ws = lerp(0.8, 1.2, g.f('weaponSize')) * Math.sqrt(64 / Math.max(32, H / scale)) * 0.95;
  if (weapon === 'bow') buildBow(body, ws);
  else buildWeapon(body, weapon, ws);
  buildOffhand(body, offhand);
  buildBackItem(body, g.c('back') as 'none');
  extras(body, g, tail);
  if (race === 'skeleton') {
    // ribs and eye sockets
    const gr = b.group('ribs', 0, { depthBias: 0.05 });
    for (let k = 0; k < 3; k++) b.ellipsoid(gr, body.B.chest, new Vec3(0.02 * h, (0.25 - k * 0.22) * h, 0), new Vec3(body.chest.radii.x * 0.95, 0.06 * h, body.chest.radii.z * (1 - k * 0.08)), 'bone', { shadeBias: k === 1 ? -1 : 0 });
  }
  for (const t of [race, top !== 'none' ? top : '', weapon !== 'none' ? weapon : '', tail !== 'none' ? `${tail} tail` : '', g.c('horns') !== 'none' ? `${g.c('horns')} horns` : '', g.b('tusks') ? 'tusks' : '']) if (t) b.trait(t);

  const rig: BipedRig = {
    kind: 'biped', dims: body.d, bones: body.B, weapon, offhand,
    traits: { energy: g.f('energy'), weight: g.f('weight'), swing: g.f('swing'), bounce: 0.5, age: 0.45, posture: g.f('posture'), digitigrade: digi, sway: g.f('frame'), armsForward: p.armsForward },
    weaponGrip: gripXform(body.d), offhandGrip: gripXform(body.d), longSkirt: top === 'robe' || top === 'dress' || bottom === 'longskirt',
  };
  const anatomy = b.build({ height: H + h * 0.2, walkSpeed: 0, runSpeed: 0, length: h * 1.5 }, rig, 1);
  const animator = new BipedAnimator(rig);
  anatomy.metrics.walkSpeed = animator.clips.find((c) => c.id === 'walk')!.speed;
  anatomy.metrics.runSpeed = animator.clips.find((c) => c.id === 'run')!.speed;

  const skin = g.col('skinColor');
  const mats = humanMaterials(g, skin);
  const type = g.c('skinType');
  const style: StyleName = type === 'scales' ? 'scales' : type === 'fur' ? 'fur' : type === 'bone' ? 'glossy' : type === 'hide' ? 'hide' : 'skin';
  mats.skin = { color: skin, ramp: type === 'bone' ? 'bone' : type === 'skin' ? 'skin' : 'organic', style };
  mats.lip = { color: mixHex(skin, 0x3a1a1a, 0.35), ramp: 'organic', style: 'matte' };
  mats.eye = { color: g.col('eyeColor'), ramp: g.c('eyeStyle') === 'glow' ? 'glow' : 'cloth', style: g.c('eyeStyle') === 'glow' ? 'emissive' : 'matte', emissive: g.c('eyeStyle') === 'glow' };
  if (race === 'skeleton' || race === 'zombie') mats.bone = { color: race === 'skeleton' ? skin : 0xd8ccb0, ramp: 'bone', style: 'glossy' };
  return { anatomy, materials: mats, surface: NO_SURFACE, animator };
}


export const humanoidFamily: Family = {
  id: 'humanoid',
  label: 'Humanoids',
  description: 'Fantasy peoples and monsters on two legs: elves, dwarves, orcs, goblins, trolls, lizardfolk, catfolk, skeletons, zombies and imps — with the same clothes, gear and animations as humans.',
  archetypes: RACES.map(([id, label]) => ({ id, label, weight: PRIORS[id].weight })),
  schema,
  sample,
  build,
  name(rng, genome) {
    const n = syllableName(rng);
    const epithet: Record<string, string[]> = {
      orc: ['Skullsplitter', 'Ironjaw', 'the Grim'], goblin: ['the Sneak', 'Quickfingers'], troll: ['Bridgekeeper', 'the Hungry'], dwarf: ['Stonebeard', 'Ironfoot', 'Deepdelver'],
      skeleton: ['the Restless'], zombie: ['the Risen'], imp: ['the Wicked'], elf: ['Silverleaf', 'of the Glade'], lizardfolk: ['Swiftscale'], catfolk: ['Softpaw', 'the Nimble'],
    };
    const e = epithet[genome.archetype];
    return e && rng.chance(0.5) ? `${n} ${rng.pick(e)}` : n;
  },
};
