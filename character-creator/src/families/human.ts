/**
 * Humans: ordinary people with natural proportions — villagers, farmers, merchants, nobles,
 * guards, knights, rangers, rogues, mages, clerics, monks, barbarians, smiths, children, elders.
 *
 * Body (age, height, build, shoulder/hip frame), face, skin tone, hair and beard, clothing in
 * layers (shirt, vest, coat, robe, dress, leather, mail, plate), footwear, belt, cape, headwear,
 * a weapon and an off-hand item. Archetypes are priors: they weight the choices and the dye
 * palettes, every gene can still be edited freely.
 */

import { AnatomyBuilder } from '../anatomy/builder';
import { BipedAnimator } from '../anim/biped';
import { gripXform, type BipedRig, type OffhandKind, type WeaponKind } from '../anim/bipedRig';
import { adjust, hexToOklch, mixHex, oklch, type Hex } from '../core/color';
import { clamp, lerp } from '../core/math';
import type { Rng } from '../core/rng';
import { SchemaBuilder, type GeneValue, type Genes } from '../genome/schema';
import type { Material } from '../render/materials';
import { NO_SURFACE } from '../render/surface';
import type { BuiltParts, Family, Genome, SampleContext } from '../model/types';
import {
  HAIR_STYLES, buildBackItem, buildBow, buildFacialHair, buildHair, buildHeadwear, buildHumanBody, buildOffhand, buildWeapon, dressExtras, dressLegs,
  dressTorso, hairChainFor, hatCoversHair, type Bottom, type FacialHair, type HairStyle, type Headwear, type Shoes, type Sleeves, type Top,
} from './humanBody';

type W = readonly (readonly [string, number])[];

const AGES = [['child', 'Child'], ['teen', 'Teen'], ['adult', 'Adult'], ['middle', 'Middle-aged'], ['elder', 'Elder']] as const;
const TOPS = [['none', 'None'], ['shirt', 'Shirt'], ['tunic', 'Tunic'], ['vest', 'Shirt & vest'], ['coat', 'Long coat'], ['robe', 'Robe'], ['dress', 'Dress'], ['leather', 'Leather armour'], ['chainmail', 'Chain mail'], ['plate', 'Plate armour'], ['rags', 'Rags']] as const;
const SLEEVES = [['none', 'None'], ['short', 'Short'], ['long', 'Long']] as const;
const BOTTOMS = [['trousers', 'Trousers'], ['shorts', 'Shorts'], ['leggings', 'Leggings'], ['skirt', 'Skirt'], ['longskirt', 'Long skirt'], ['loincloth', 'Loincloth']] as const;
const SHOES = [['barefoot', 'Barefoot'], ['sandals', 'Sandals'], ['shoes', 'Shoes'], ['boots', 'Boots'], ['tallboots', 'Tall boots']] as const;
const FACIAL = [['none', 'None'], ['stubble', 'Stubble'], ['mustache', 'Mustache'], ['goatee', 'Goatee'], ['beard', 'Beard'], ['longbeard', 'Long beard']] as const;
const HEADWEAR = [['none', 'None'], ['hood', 'Hood'], ['cap', 'Cap'], ['beanie', 'Beanie'], ['bandana', 'Bandana'], ['widebrim', 'Wide-brim hat'], ['strawhat', 'Straw hat'], ['wizard', 'Wizard hat'], ['helmet', 'Helmet'], ['horned', 'Horned helmet'], ['greathelm', 'Great helm'], ['crown', 'Crown'], ['circlet', 'Circlet']] as const;
const CAPES = [['none', 'None'], ['cape', 'Cape'], ['cloak', 'Cloak']] as const;
const GLOVES = [['none', 'None'], ['gloves', 'Gloves'], ['gauntlets', 'Gauntlets']] as const;
const WEAPONS = [['none', 'None'], ['sword', 'Sword'], ['dagger', 'Dagger'], ['axe', 'Axe'], ['mace', 'Mace'], ['hammer', 'Hammer'], ['club', 'Club'], ['spear', 'Spear'], ['staff', 'Staff'], ['wand', 'Wand'], ['bow', 'Bow']] as const;
const OFFHANDS = [['none', 'None'], ['shield', 'Shield'], ['buckler', 'Buckler'], ['torch', 'Torch'], ['lantern', 'Lantern'], ['book', 'Book']] as const;
const BACKS = [['none', 'None'], ['backpack', 'Backpack'], ['quiver', 'Quiver']] as const;
const METALS = [['steel', 'Steel'], ['iron', 'Dark iron'], ['bronze', 'Bronze'], ['gold', 'Gold'], ['silver', 'Silver']] as const;

const METAL_HEX: Record<string, Hex> = { steel: 0xa9b3bf, iron: 0x6b6f78, bronze: 0xb07a3c, gold: 0xd6a83a, silver: 0xcfd6dc };

const schema = new SchemaBuilder()
  .group('body', 'Body', 'anatomy')
  .choice('age', 'Age', AGES, 'adult', { mut: 0.3 })
  .float('height', 'Height', 0.5, { help: 'Short to tall for the age.' })
  .float('mass', 'Build', 0.4, { help: 'Slim to heavy.' })
  .float('muscle', 'Muscle', 0.35)
  .float('frame', 'Frame', 0.5, { help: 'Broad shoulders and narrow hips ↔ narrow shoulders and wide hips.' })
  .float('bust', 'Bust', 0.2)
  .float('belly', 'Belly', 0.15)
  .float('legs', 'Leg length', 0.5)
  .float('posture', 'Stoop', 0.1, { help: 'Upright to stooped.' })
  .group('face', 'Face', 'anatomy')
  .float('headWidth', 'Head width', 0.5)
  .float('jaw', 'Jaw', 0.5, { help: 'Narrow to square.' })
  .float('nose', 'Nose', 0.5)
  .float('eyeSize', 'Eye size', 0.5)
  .group('hair', 'Hair', 'anatomy')
  .choice('hairStyle', 'Hair style', HAIR_STYLES, 'short')
  .float('hairVolume', 'Volume', 0.5)
  .choice('facialHair', 'Facial hair', FACIAL, 'none')
  .group('outfit', 'Outfit', 'anatomy')
  .choice('top', 'Top', TOPS, 'shirt')
  .choice('sleeves', 'Sleeves', SLEEVES, 'long')
  .choice('bottom', 'Bottom', BOTTOMS, 'trousers')
  .choice('shoes', 'Footwear', SHOES, 'boots')
  .bool('belt', 'Belt', true)
  .bool('pouch', 'Belt pouch', false)
  .bool('apron', 'Apron', false)
  .bool('scarf', 'Scarf', false)
  .choice('gloves', 'Gloves', GLOVES, 'none')
  .choice('cape', 'Cape', CAPES, 'none')
  .choice('headwear', 'Headwear', HEADWEAR, 'none')
  .group('gear', 'Equipment', 'anatomy')
  .choice('weapon', 'Main hand', WEAPONS, 'none')
  .choice('offhand', 'Off hand', OFFHANDS, 'none')
  .choice('back', 'On the back', BACKS, 'none')
  .float('weaponSize', 'Weapon size', 0.5)
  .group('skin', 'Skin & eyes', 'color')
  .float('skinTone', 'Skin tone', 0.35, { help: 'Light to deep.' })
  .float('undertone', 'Undertone', 0.5, { help: 'Rosy ↔ golden / olive.' })
  .color('eyeColor', 'Eye colour', 0x5a3a22)
  .color('hairColor', 'Hair colour', 0x4a3020)
  .group('colors', 'Clothing colours', 'color')
  .color('topColor', 'Top', 0x6a7a5a)
  .color('secondColor', 'Second', 0xd8cdb0)
  .color('trimColor', 'Trim', 0x8a5a2a)
  .color('pantsColor', 'Trousers / skirt', 0x4a4038)
  .color('bootsColor', 'Footwear', 0x4a3424)
  .color('leatherColor', 'Leather', 0x6a4a2e)
  .color('capeColor', 'Cape', 0x7a2a2a)
  .color('hatColor', 'Headwear', 0x5a4a3a)
  .color('apronColor', 'Apron', 0xd6ccb4)
  .color('shieldColor', 'Shield', 0x6a3a2a)
  .choice('metal', 'Metal', METALS, 'steel')
  .color('glowColor', 'Magic glow', 0x6ad0ff)
  .group('motion', 'Motion', 'motion')
  .float('energy', 'Energy', 0.5, { help: 'Calm to lively steps.' })
  .float('swing', 'Arm swing', 0.5)
  .float('weight', 'Heaviness', 0.4)
  .build();

interface Prior {
  weight: number;
  age: W;
  mass: [number, number];
  muscle: [number, number];
  top: W;
  sleeves?: W;
  bottom: W;
  shoes: W;
  head: W;
  cape: W;
  weapon: W;
  offhand: W;
  back?: W;
  gloves?: W;
  belt: number;
  apron?: number;
  scarf?: number;
  pouch?: number;
  metal?: W;
  /** Dye palettes for top / second / trousers. */
  dyes: Hex[];
  seconds: Hex[];
  pants: Hex[];
  trims?: Hex[];
  capes?: Hex[];
  hats?: Hex[];
  hair?: W;
}

const EARTH = [0x7a5a3c, 0x8c7a58, 0x5d6b4a, 0x6b6f73, 0xa89a78, 0x4f6378, 0x8a4a3a, 0x6a5a7a, 0x5a4a3a, 0x7a6a3a];
const LINEN = [0xd8ccb0, 0xc8b890, 0xb8ac94, 0xe0d8c4, 0xa8a090];
const DARKS = [0x4a3c30, 0x5a4a38, 0x3c3c44, 0x6a5a42, 0x2e2a2a, 0x4a4a3a];
const RICH = [0x5a2a6a, 0x8a1e2e, 0x1e3a6a, 0x1e5a40, 0x2a2a34, 0x6a1e4a, 0x0e4a5a];
const BRIGHT = [0xb03a2e, 0x2e5ab0, 0x2e8a4a, 0xc89a2e, 0x7a3ab0, 0xc8642e];

const PRIORS: Record<string, Prior> = {
  villager: {
    weight: 3, age: [['child', 0.6], ['teen', 0.8], ['adult', 3], ['middle', 1.6], ['elder', 0.8]], mass: [0.25, 0.65], muscle: [0.15, 0.45],
    top: [['shirt', 3], ['tunic', 2], ['vest', 1.5], ['dress', 1.2]], bottom: [['trousers', 4], ['skirt', 1], ['longskirt', 1]], shoes: [['shoes', 2], ['boots', 2], ['sandals', 0.6], ['barefoot', 0.3]],
    head: [['none', 6], ['cap', 1], ['beanie', 0.6], ['bandana', 0.5], ['strawhat', 0.5], ['hood', 0.4]], cape: [['none', 10], ['cloak', 0.6]],
    weapon: [['none', 10], ['dagger', 0.3]], offhand: [['none', 8], ['lantern', 0.4], ['book', 0.4], ['torch', 0.3]], back: [['none', 6], ['backpack', 1]],
    belt: 0.7, apron: 0.12, scarf: 0.15, pouch: 0.3, dyes: EARTH, seconds: LINEN, pants: DARKS,
  },
  farmer: {
    weight: 1.5, age: [['teen', 0.6], ['adult', 3], ['middle', 2], ['elder', 0.8]], mass: [0.3, 0.6], muscle: [0.35, 0.65],
    top: [['shirt', 3], ['vest', 1], ['tunic', 1]], sleeves: [['short', 2], ['long', 2], ['none', 0.4]], bottom: [['trousers', 5], ['shorts', 0.6], ['skirt', 0.6]], shoes: [['boots', 3], ['barefoot', 0.6], ['sandals', 0.5]],
    head: [['strawhat', 3], ['none', 2], ['bandana', 0.6], ['cap', 0.6]], cape: [['none', 1]], weapon: [['none', 3], ['club', 0.4], ['spear', 0.3]], offhand: [['none', 5], ['lantern', 0.4]],
    belt: 0.5, apron: 0.15, scarf: 0.2, pouch: 0.2, dyes: [0x8a7a58, 0x6a7a4a, 0x7a5a3c, 0x9a8a68, 0x5a6a7a], seconds: LINEN, pants: [0x4a3c30, 0x5a5a6a, 0x6a5a42, 0x3c4a5a],
  },
  merchant: {
    weight: 1, age: [['adult', 2], ['middle', 3], ['elder', 1]], mass: [0.45, 0.9], muscle: [0.1, 0.35],
    top: [['vest', 3], ['coat', 2], ['tunic', 1], ['dress', 1]], bottom: [['trousers', 4], ['longskirt', 1]], shoes: [['shoes', 3], ['boots', 1.5]],
    head: [['none', 3], ['cap', 1], ['widebrim', 1]], cape: [['none', 5], ['cape', 0.6]], weapon: [['none', 10], ['dagger', 0.5]], offhand: [['none', 3], ['book', 1], ['lantern', 0.5]], back: [['none', 3], ['backpack', 1.2]],
    belt: 0.8, pouch: 0.7, apron: 0.1, dyes: [0x8a2e2e, 0x2e4a7a, 0x5a6a2e, 0x7a5a2a, 0x6a3a5a], seconds: LINEN, pants: DARKS, trims: [0xc89a3a, 0x8a6a3a],
  },
  noble: {
    weight: 1, age: [['teen', 0.6], ['adult', 3], ['middle', 2], ['elder', 0.7]], mass: [0.2, 0.6], muscle: [0.1, 0.35],
    top: [['coat', 3], ['dress', 2], ['vest', 1.5], ['robe', 0.5]], bottom: [['trousers', 3], ['leggings', 1.5], ['longskirt', 1]], shoes: [['tallboots', 2], ['shoes', 2]],
    head: [['none', 4], ['circlet', 1], ['crown', 0.4], ['widebrim', 0.6]], cape: [['cape', 2], ['cloak', 1], ['none', 2]], weapon: [['none', 3], ['sword', 1.2], ['dagger', 0.6], ['wand', 0.3]], offhand: [['none', 1]],
    gloves: [['none', 3], ['gloves', 1]], belt: 0.6, scarf: 0.1, metal: [['gold', 3], ['silver', 2], ['steel', 1]],
    dyes: RICH, seconds: [0xe8e0cc, 0xd8c8a0, 0xc8c8d0, 0x1e1e24], pants: [0x2a2a34, 0xe0d8c8, 0x3a2a4a, 0x1e2a3a], trims: [0xd6a83a, 0xe0c060, 0xc8ccd4], capes: RICH,
  },
  guard: {
    weight: 1.2, age: [['adult', 3], ['middle', 1.5]], mass: [0.35, 0.7], muscle: [0.5, 0.8],
    top: [['chainmail', 3], ['leather', 2], ['tunic', 1]], bottom: [['trousers', 1]], shoes: [['boots', 3], ['tallboots', 1]],
    head: [['helmet', 4], ['cap', 0.5], ['none', 0.6]], cape: [['none', 3], ['cape', 1.2]], weapon: [['spear', 3], ['sword', 2], ['mace', 0.6]], offhand: [['shield', 2.5], ['none', 1.5], ['torch', 0.4]],
    gloves: [['gloves', 2], ['none', 1]], belt: 0.95, metal: [['steel', 3], ['iron', 2]],
    dyes: [0x7a2e2e, 0x2e4a7a, 0x3a5a2e, 0x5a3a6a], seconds: [0x7a2e2e, 0x2e4a7a, 0xb8ac94], pants: [0x3a3a44, 0x4a3c30], trims: [0xc89a3a], capes: [0x7a2e2e, 0x2e4a7a, 0x3a5a2e],
  },
  knight: {
    weight: 1, age: [['adult', 3], ['middle', 1.5]], mass: [0.4, 0.7], muscle: [0.6, 0.9],
    top: [['plate', 4], ['chainmail', 1.5]], bottom: [['trousers', 1]], shoes: [['tallboots', 1]],
    head: [['helmet', 2], ['greathelm', 2], ['none', 1]], cape: [['cape', 2], ['none', 1]], weapon: [['sword', 4], ['mace', 1], ['hammer', 0.8], ['axe', 0.6], ['spear', 0.5]], offhand: [['shield', 3], ['none', 1]],
    gloves: [['gauntlets', 4], ['gloves', 0.5]], belt: 0.9, metal: [['steel', 4], ['silver', 1], ['iron', 1], ['gold', 0.3]],
    dyes: [0x2e4a8a, 0x8a2e2e, 0xe0d8c4, 0x2e6a4a, 0x2a2a30], seconds: [0x2e4a8a, 0x8a2e2e, 0xe0d8c4], pants: [0x3a3a44], trims: [0xd6a83a, 0xc8ccd4], capes: [0x2e4a8a, 0x8a2e2e, 0xe0d8c4, 0x5a2a6a],
  },
  ranger: {
    weight: 1.2, age: [['teen', 0.6], ['adult', 3], ['middle', 1]], mass: [0.2, 0.5], muscle: [0.35, 0.6],
    top: [['leather', 2.5], ['tunic', 2], ['coat', 1]], bottom: [['trousers', 3], ['leggings', 1.5]], shoes: [['tallboots', 2], ['boots', 2]],
    head: [['hood', 3], ['none', 2], ['widebrim', 0.4]], cape: [['cloak', 2.5], ['none', 1.5], ['cape', 0.5]], weapon: [['bow', 5], ['dagger', 0.6], ['spear', 0.5]], offhand: [['none', 1]], back: [['quiver', 5], ['backpack', 0.5]],
    gloves: [['gloves', 2], ['none', 1]], belt: 0.9, scarf: 0.25, pouch: 0.5,
    dyes: [0x3e5a2e, 0x5a6a3a, 0x6a5a3a, 0x4a5a4a, 0x3a4a3a], seconds: [0x8a7a58, 0x6a5a42, 0xb8ac94], pants: [0x4a3c30, 0x3a3a2e, 0x5a4a38], capes: [0x3e5a2e, 0x4a4a3a, 0x5a4a3a, 0x2e3a2e], hats: [0x3e5a2e, 0x4a4a3a, 0x5a4a3a],
  },
  rogue: {
    weight: 1, age: [['teen', 1], ['adult', 3]], mass: [0.15, 0.45], muscle: [0.25, 0.55],
    top: [['leather', 2], ['vest', 1.5], ['shirt', 1], ['coat', 0.8]], bottom: [['trousers', 3], ['leggings', 1.5]], shoes: [['tallboots', 2], ['boots', 2], ['shoes', 0.6]],
    head: [['hood', 3], ['bandana', 1.2], ['none', 1.5]], cape: [['none', 2], ['cloak', 1.5]], weapon: [['dagger', 4], ['sword', 1], ['bow', 0.4]], offhand: [['none', 3], ['buckler', 0.4]],
    gloves: [['gloves', 2], ['none', 1]], belt: 0.95, scarf: 0.35, pouch: 0.6,
    dyes: [0x2a2a30, 0x3a3044, 0x3a2a2a, 0x4a4a52, 0x2e3a3a], seconds: [0x6a2a2a, 0x8a7a58, 0x3a3044], pants: [0x2a2a30, 0x3a3a3a], capes: [0x2a2a30, 0x2e2a3a, 0x3a2a2a], hats: [0x2a2a30, 0x2e2a3a, 0x3a2a2a],
  },
  mage: {
    weight: 1.2, age: [['teen', 0.5], ['adult', 2], ['middle', 1.5], ['elder', 2]], mass: [0.15, 0.55], muscle: [0.0, 0.25],
    top: [['robe', 5], ['coat', 1], ['dress', 0.6]], bottom: [['trousers', 1]], shoes: [['shoes', 2], ['boots', 1], ['sandals', 0.5]],
    head: [['wizard', 3], ['hood', 2], ['none', 2], ['circlet', 0.6]], cape: [['none', 3], ['cloak', 1], ['cape', 0.6]], weapon: [['staff', 4], ['wand', 1.5], ['none', 0.6]], offhand: [['none', 3], ['book', 1.2], ['lantern', 0.4]],
    belt: 0.6, scarf: 0.1, pouch: 0.3,
    dyes: [0x2e3a8a, 0x5a2e8a, 0x8a2e5a, 0x2e6a6a, 0x3a3a4a, 0x7a2e2e, 0xe0d8c4], seconds: [0xd6a83a, 0xc8ccd4, 0xe0d8c4], pants: DARKS, trims: [0xd6a83a, 0xc8ccd4, 0x8a6aca], capes: RICH,
  },
  cleric: {
    weight: 0.8, age: [['adult', 2], ['middle', 2], ['elder', 1]], mass: [0.3, 0.7], muscle: [0.2, 0.5],
    top: [['robe', 4], ['chainmail', 1], ['tunic', 1]], bottom: [['trousers', 1]], shoes: [['sandals', 1.5], ['shoes', 2], ['boots', 1]],
    head: [['none', 3], ['hood', 1.5], ['circlet', 0.5]], cape: [['none', 3], ['cape', 0.8]], weapon: [['mace', 2], ['staff', 2], ['hammer', 0.6], ['none', 1]], offhand: [['book', 2], ['shield', 1], ['lantern', 0.6], ['none', 1.5]],
    belt: 0.8, metal: [['silver', 2], ['gold', 2], ['steel', 1]],
    dyes: [0xe8e0cc, 0xd8d0b8, 0xc8b88a, 0x8a7a5a, 0x3a4a6a], seconds: [0xd6a83a, 0x8a2e2e, 0x2e4a8a], pants: DARKS, trims: [0xd6a83a, 0xc8ccd4],
  },
  monk: {
    weight: 0.6, age: [['adult', 2], ['middle', 1.5], ['elder', 1]], mass: [0.15, 0.45], muscle: [0.4, 0.75],
    top: [['robe', 3], ['tunic', 1.5], ['none', 0.5]], sleeves: [['short', 1], ['long', 1]], bottom: [['trousers', 2], ['loincloth', 0.3]], shoes: [['sandals', 3], ['barefoot', 1.5]],
    head: [['none', 5], ['hood', 1]], cape: [['none', 1]], weapon: [['none', 3], ['staff', 2]], offhand: [['none', 4], ['book', 0.6]],
    belt: 0.7, dyes: [0xc8642e, 0xb08a3a, 0x8a5a2e, 0x6a6a6a, 0xd6a83a], seconds: LINEN, pants: [0x5a4a3a, 0x8a7a58], hair: [['bald', 4], ['buzz', 2], ['topknot', 1.5]],
  },
  barbarian: {
    weight: 0.8, age: [['adult', 3], ['middle', 1]], mass: [0.45, 0.8], muscle: [0.7, 1.0],
    top: [['none', 3], ['rags', 1], ['leather', 1.5]], sleeves: [['none', 1]], bottom: [['trousers', 2], ['loincloth', 1.5], ['shorts', 0.5]], shoes: [['boots', 3], ['barefoot', 0.6], ['sandals', 0.5]],
    head: [['none', 4], ['horned', 1.2], ['bandana', 0.5]], cape: [['none', 2], ['cloak', 0.8]], weapon: [['axe', 4], ['hammer', 1.2], ['club', 1], ['sword', 0.6]], offhand: [['none', 3], ['shield', 0.8]],
    gloves: [['none', 2], ['gloves', 1]], belt: 0.95, metal: [['iron', 3], ['bronze', 1.5], ['steel', 1]],
    dyes: [0x6a4a2e, 0x5a3a2a, 0x7a6a4a, 0x4a3a2e], seconds: [0x8a7a5a, 0x5a4a3a], pants: [0x4a3c30, 0x5a4a38, 0x6a5a42], capes: [0x6a5a42, 0x4a3c30, 0x8a7a5a],
  },
  blacksmith: {
    weight: 0.6, age: [['adult', 2], ['middle', 2]], mass: [0.5, 0.85], muscle: [0.65, 0.95],
    top: [['shirt', 3], ['none', 0.8], ['tunic', 1]], sleeves: [['short', 2], ['none', 1.5], ['long', 0.6]], bottom: [['trousers', 1]], shoes: [['boots', 1]],
    head: [['none', 4], ['bandana', 1.5], ['cap', 0.6]], cape: [['none', 1]], weapon: [['hammer', 5], ['none', 0.5]], offhand: [['none', 1]],
    gloves: [['gloves', 2], ['none', 1]], belt: 0.9, apron: 0.95,
    dyes: [0x6a6a6a, 0x8a7a58, 0x7a5a3c, 0x5d6b4a], seconds: LINEN, pants: DARKS,
  },
};

const ARCHETYPES = [
  ['villager', 'Villager'], ['farmer', 'Farmer'], ['merchant', 'Merchant'], ['noble', 'Noble'], ['guard', 'Guard'], ['knight', 'Knight'], ['ranger', 'Ranger'],
  ['rogue', 'Rogue'], ['mage', 'Mage'], ['cleric', 'Cleric'], ['monk', 'Monk'], ['barbarian', 'Barbarian'], ['blacksmith', 'Blacksmith'],
] as const;

// natural hair colours [hex, weight]
const HAIR_NATURAL: [Hex, number][] = [
  [0x1f1a18, 3], [0x2e221c, 3], [0x3b2a20, 3], [0x5e3f28, 2.5], [0x7a5434, 1.6], [0x8a3b20, 0.8], [0xa94c24, 0.7], [0xc8884e, 0.6], [0xd3b06a, 1], [0xe2d2a6, 0.4],
];
const EYES: [Hex, number][] = [[0x5a3a22, 4], [0x2e2018, 3], [0x7a6030, 1.2], [0x4f7a45, 0.8], [0x4a6fa5, 1.2], [0x7d8a96, 0.6], [0x9a6a2a, 0.3]];

const pickHex = (rng: Rng, list: readonly Hex[]) => rng.pick(list);
const pickW = (rng: Rng, w: W) => rng.pickWeighted(w);
const pickHexW = (rng: Rng, list: [Hex, number][]) => list[rng.weighted(list.map((l) => l[1]))][0];
/** Small hue / lightness jitter so two dyes of the same palette entry still differ. */
const jitter = (rng: Rng, c: Hex, amt = 1) => {
  const l = hexToOklch(c);
  return oklch(l.l + rng.gaussian(0, 0.03 * amt), l.c * (1 + rng.gaussian(0, 0.1 * amt)), l.h + rng.gaussian(0, 6 * amt));
};

export function skinColor(tone: number, undertone: number): Hex {
  const L = lerp(0.87, 0.36, Math.pow(tone, 0.95));
  const C = lerp(0.04, 0.072, Math.sin(Math.PI * Math.min(1, tone * 1.15)) * 0.6 + tone * 0.4) * lerp(0.9, 1.08, undertone);
  const H = lerp(38, 74, undertone) + tone * 4;
  return oklch(L, C, H);
}

function sample(ctx: SampleContext): Record<string, GeneValue> {
  const p = PRIORS[ctx.arch] ?? PRIORS.villager;
  const a = ctx.rng('anatomy'), c = ctx.rng('color'), m = ctx.rng('motion');
  const v: Record<string, GeneValue> = {};
  const age = pickW(a, p.age);
  v.age = age;
  const child = age === 'child';
  v.height = clamp(a.gaussian(0.5, 0.2), 0, 1);
  v.mass = clamp(a.range(p.mass[0], p.mass[1]) + a.gaussian(0, 0.06), 0, 1);
  v.muscle = clamp(a.range(p.muscle[0], p.muscle[1]), 0, 1);
  const frame = clamp(a.chance(0.5) ? a.gaussian(0.25, 0.14) : a.gaussian(0.75, 0.14), 0, 1);
  v.frame = frame;
  v.bust = child ? 0 : clamp(frame > 0.55 ? a.gaussian(0.45, 0.2) : a.gaussian(0.05, 0.05), 0, 1);
  v.belly = clamp(a.gaussian(age === 'middle' || age === 'elder' ? 0.3 : 0.08, 0.12) + (v.mass as number) * 0.25, 0, 1);
  v.legs = clamp(a.gaussian(0.5, 0.15), 0, 1);
  v.posture = clamp(age === 'elder' ? a.gaussian(0.55, 0.15) : a.gaussian(0.08, 0.06), 0, 1);
  v.headWidth = clamp(a.gaussian(0.5, 0.15), 0, 1);
  v.jaw = clamp(a.gaussian(frame < 0.5 ? 0.6 : 0.35, 0.15), 0, 1);
  v.nose = clamp(a.gaussian(age === 'elder' ? 0.65 : 0.45, 0.17), 0, 1);
  v.eyeSize = clamp(a.gaussian(child ? 0.7 : 0.45, 0.15), 0, 1);

  // hair: longer styles more likely on narrow-shouldered frames, every style possible for anyone
  const fem = frame;
  const hairW: W = p.hair ?? [
    ['bald', age === 'elder' || age === 'middle' ? 0.6 * (1 - fem) : 0.1 * (1 - fem)], ['buzz', 1 * (1 - fem) + 0.1], ['receding', age === 'middle' || age === 'elder' ? 1 * (1 - fem) : 0],
    ['short', 3 * (1 - fem) + 0.4], ['sidepart', 1.6 * (1 - fem) + 0.3], ['curly', 1], ['afro', 0.5], ['bob', 1.6 * fem + 0.2], ['shoulder', 1.5 * fem + 0.4],
    ['long', 2.4 * fem + 0.2], ['ponytail', 1.8 * fem + 0.4], ['bun', 1.4 * fem + 0.1], ['braid', 1.2 * fem + 0.1], ['mohawk', 0.12], ['topknot', 0.25],
  ];
  v.hairStyle = pickW(a, hairW);
  v.hairVolume = clamp(a.gaussian(0.5, 0.2), 0, 1);
  const canBeard = !child && age !== 'teen' && fem < 0.55;
  v.facialHair = canBeard && a.chance(ctx.arch === 'barbarian' || ctx.arch === 'blacksmith' ? 0.7 : 0.4)
    ? pickW(a, [['stubble', 2], ['mustache', 1], ['goatee', 1], ['beard', 2], ['longbeard', age === 'elder' ? 2 : 0.3]]) : 'none';

  let top = pickW(a, p.top) as Top;
  if (top === 'dress' && fem < 0.45 && a.chance(0.7)) top = 'tunic';
  v.top = top;
  v.sleeves = p.sleeves ? pickW(a, p.sleeves) : pickW(a, [['long', 3], ['short', 1.5], ['none', 0.2]]);
  let bottom = pickW(a, p.bottom) as Bottom;
  if ((bottom === 'skirt' || bottom === 'longskirt') && fem < 0.45 && a.chance(0.75)) bottom = 'trousers';
  v.bottom = bottom;
  v.shoes = pickW(a, p.shoes);
  v.belt = a.chance(p.belt);
  v.pouch = !!v.belt && a.chance(p.pouch ?? 0.2);
  v.apron = a.chance(p.apron ?? 0);
  v.scarf = a.chance(p.scarf ?? 0.05);
  v.gloves = p.gloves ? pickW(a, p.gloves) : 'none';
  v.cape = pickW(a, p.cape);
  v.headwear = pickW(a, p.head);
  let weapon = pickW(a, p.weapon) as WeaponKind;
  if (child && weapon !== 'none' && a.chance(0.7)) weapon = 'none';
  v.weapon = weapon;
  let off = pickW(a, p.offhand) as OffhandKind;
  if (weapon === 'bow' || (weapon === 'staff' && off === 'shield')) off = 'none';
  v.offhand = off;
  v.back = weapon === 'bow' ? 'quiver' : p.back ? pickW(a, p.back) : 'none';
  if (v.back === 'quiver' && weapon !== 'bow') v.back = 'none';
  v.weaponSize = clamp(a.gaussian(0.5, 0.12), 0, 1);

  // colours
  v.skinTone = clamp(c.next() ** 1.1, 0, 1);
  v.undertone = clamp(c.gaussian(0.5, 0.22), 0, 1);
  v.eyeColor = pickHexW(c, EYES);
  let hair = pickHexW(c, HAIR_NATURAL);
  // darker skin tones carry darker hair more often; elders grey
  if ((v.skinTone as number) > 0.55 && c.chance(0.7)) hair = pickHexW(c, HAIR_NATURAL.slice(0, 4));
  if (age === 'elder') hair = c.chance(0.85) ? pickHex(c, [0x9a9590, 0xc8c4bc, 0xe8e6e0, 0x7a7670]) : hair;
  else if (age === 'middle' && c.chance(0.3)) hair = mixHex(hair, 0xb8b4ac, 0.45);
  if (c.chance(0.04)) hair = pickHex(c, [0x8a2a8a, 0x2a6aa8, 0xb83a5a, 0x3a8a6a]);
  v.hairColor = jitter(c, hair, 0.5);
  v.topColor = jitter(c, pickHex(c, p.dyes));
  v.secondColor = jitter(c, pickHex(c, p.seconds));
  v.trimColor = jitter(c, pickHex(c, p.trims ?? [0x8a5a2a, 0x6a4a2a, 0xa88a4a, ...p.seconds]));
  v.pantsColor = jitter(c, pickHex(c, p.pants));
  v.bootsColor = jitter(c, pickHex(c, [0x4a3424, 0x3a2a20, 0x5a3e28, 0x2a2420, 0x6a4a30]));
  v.leatherColor = jitter(c, pickHex(c, [0x6a4a2e, 0x5a3e28, 0x7a5434, 0x4a3424, 0x8a6a44]));
  v.capeColor = jitter(c, pickHex(c, p.capes ?? [...p.dyes, ...BRIGHT.slice(0, 2)]));
  v.hatColor = jitter(c, pickHex(c, p.hats ?? (v.headwear === 'strawhat' ? [0xd8b86a, 0xc8a85a] : [...p.dyes, ...DARKS])));
  v.apronColor = jitter(c, pickHex(c, ctx.arch === 'blacksmith' ? [0x5a3e28, 0x4a3424, 0x6a4a2e] : LINEN));
  v.shieldColor = jitter(c, pickHex(c, [0x6a3a2a, 0x2e4a8a, 0x8a2e2e, 0x3a5a2e, 0xc8a84a, 0x5a4a3a]));
  v.metal = p.metal ? pickW(c, p.metal) : pickW(c, [['steel', 3], ['iron', 2], ['bronze', 1]]);
  v.glowColor = pickHex(c, [0x6ad0ff, 0xb07aff, 0x7affb0, 0xffb04a, 0xff6a8a]);

  v.energy = clamp(m.gaussian(child ? 0.75 : age === 'elder' ? 0.25 : 0.5, 0.15), 0, 1);
  v.swing = clamp(m.gaussian(0.5, 0.18), 0, 1);
  v.weight = clamp(m.gaussian((v.mass as number) * 0.7, 0.12), 0, 1);
  return v;
}

const AGE_NUM: Record<string, number> = { child: 0, teen: 0.2, adult: 0.45, middle: 0.7, elder: 1 };

function build(g: Genes, _genome: Genome, scale: number): BuiltParts {
  const age = g.c('age');
  const heads = { child: 5.3, teen: 6.6, adult: 7.3, middle: 7.2, elder: 7.0 }[age] ?? 7.3;
  const hScale = { child: 0.62, teen: 0.92, adult: 1, middle: 0.99, elder: 0.95 }[age] ?? 1;
  const H = lerp(57, 71, g.f('height')) * hScale * scale;
  const b = new AnatomyBuilder(scale);
  const hairStyle = g.c('hairStyle') as HairStyle;
  const top = g.c('top') as Top;
  const bottom = g.c('bottom') as Bottom;
  const cape = g.c('cape') as 'none' | 'cape' | 'cloak';
  const weapon = g.c('weapon') as WeaponKind;
  const offhand = (weapon === 'bow' ? 'none' : g.c('offhand')) as OffhandKind;
  const headwear = g.c('headwear') as Headwear;
  const skirtish = top === 'tunic' || top === 'coat' || top === 'robe' || top === 'dress' || top === 'chainmail' || top === 'plate' || top === 'leather' || top === 'rags' || bottom === 'skirt' || bottom === 'longskirt' || bottom === 'loincloth' || g.b('apron');
  const h = H / heads;
  const child = age === 'child';
  const sleeves = g.c('sleeves') as Sleeves;
  const shoes = g.c('shoes') as Shoes;
  const covered = new Set<'torso' | 'pelvis' | 'upper' | 'fore' | 'hand' | 'thigh' | 'shin' | 'foot'>();
  if (top !== 'none') covered.add('torso');
  if (bottom === 'trousers' || bottom === 'leggings' || bottom === 'shorts' || bottom === 'skirt' || bottom === 'longskirt') covered.add('pelvis');
  if (bottom === 'trousers' || bottom === 'leggings') covered.add('thigh').add('shin');
  if ((top !== 'none' && top !== 'rags' && top !== 'plate' && top !== 'chainmail' && sleeves === 'long') || top === 'robe' || top === 'coat') covered.add('upper').add('fore');
  if (shoes !== 'barefoot' && shoes !== 'sandals') covered.add('foot');
  if (top === 'plate') covered.add('shin').add('foot').add('hand');
  if (shoes === 'tallboots') covered.add('shin');
  if (g.c('gloves') !== 'none') covered.add('hand');
  const body = buildHumanBody(b, {
    H, heads, legs: g.f('legs'), mass: g.f('mass'), muscle: child ? g.f('muscle') * 0.3 : g.f('muscle'), frame: g.f('frame'),
    bust: child ? 0 : g.f('bust'), belly: g.f('belly'), headWidth: g.f('headWidth'), jaw: g.f('jaw'), nose: child ? g.f('nose') * 0.5 : g.f('nose'),
    eyeSize: g.f('eyeSize'), hunch: g.f('posture') * 0.35, covered,
  }, {
    cape: cape !== 'none', skirt: skirtish, quiver: g.c('back') === 'quiver',
    hairChain: hairChainFor(hairStyle, h),
  });

  dressLegs(body, bottom, shoes, 'pants', { greaves: top === 'plate' });
  dressTorso(body, top, sleeves, { top: 'top', second: 'second', trim: 'trim' });
  dressExtras(body, { belt: g.b('belt'), gloves: top === 'plate' ? 'gauntlets' : (g.c('gloves') as 'none'), scarf: g.b('scarf'), apron: g.b('apron'), cape, pouch: g.b('pouch') }, { trim: 'trim', cape: 'cape', apron: 'apron' });
  buildHair(body, hairStyle, g.f('hairVolume'), hatCoversHair(headwear));
  buildFacialHair(body, child ? 'none' : (g.c('facialHair') as FacialHair));
  buildHeadwear(body, headwear, 'hat');
  const wsize = lerp(0.8, 1.2, g.f('weaponSize')) * (child ? 0.8 : 1);
  if (weapon === 'bow') buildBow(body, wsize);
  else buildWeapon(body, weapon, wsize);
  buildOffhand(body, offhand);
  buildBackItem(body, g.c('back') as 'none');

  for (const t of [age, top !== 'none' ? top : 'bare chest', hairStyle !== 'bald' ? `${hairStyle} hair` : 'bald', weapon !== 'none' ? weapon : '', offhand !== 'none' ? offhand : '', headwear !== 'none' ? headwear : ''])
    if (t) b.trait(t);

  const rig: BipedRig = {
    kind: 'biped', dims: body.d, bones: body.B, weapon, offhand,
    traits: {
      energy: g.f('energy'), weight: g.f('weight'), swing: g.f('swing'), bounce: 0.5, age: AGE_NUM[age] ?? 0.45,
      posture: g.f('posture'), digitigrade: false, sway: g.f('frame'),
    },
    weaponGrip: gripXform(body.d), offhandGrip: gripXform(body.d),
    longSkirt: top === 'robe' || top === 'dress' || bottom === 'longskirt',
  };
  const anatomy = b.build({ height: H + h * 0.2, walkSpeed: 0, runSpeed: 0, length: h * 1.5 }, rig, 1);
  const animator = new BipedAnimator(rig);
  anatomy.metrics.walkSpeed = animator.clips.find((c) => c.id === 'walk')!.speed;
  anatomy.metrics.runSpeed = animator.clips.find((c) => c.id === 'run')!.speed;
  return { anatomy, materials: humanMaterials(g), surface: NO_SURFACE, animator };
}

/** Materials shared by humans and humanoid families (slot names used by humanBody.ts). */
export function humanMaterials(g: Genes, skinHex?: Hex): Record<string, Material> {
  const skin = skinHex ?? skinColor(g.f('skinTone'), g.f('undertone'));
  const hair = g.col('hairColor');
  const metal = METAL_HEX[g.c('metal')] ?? METAL_HEX.steel;
  const lip = adjust(mixHex(skin, 0xb04a4a, 0.25), -0.06);
  const cloth = (c: Hex): Material => ({ color: c, ramp: 'cloth', style: 'cloth' });
  return {
    skin: { color: skin, ramp: 'skin', style: 'skin' },
    lip: { color: lip, ramp: 'skin', style: 'skin' },
    eye: { color: g.col('eyeColor'), ramp: 'cloth', style: 'matte' },
    hair: { color: hair, ramp: 'hair', style: 'hair' },
    buzz: { color: mixHex(hair, skin, 0.4), ramp: 'hair', style: 'matte' },
    stubble: { color: mixHex(skin, hair, 0.38), ramp: 'skin', style: 'skin' },
    top: cloth(g.col('topColor')),
    second: cloth(g.col('secondColor')),
    trim: cloth(g.col('trimColor')),
    pants: cloth(g.col('pantsColor')),
    boots: { color: g.col('bootsColor'), ramp: 'leather', style: 'leather' },
    leather: { color: g.col('leatherColor'), ramp: 'leather', style: 'leather' },
    cape: cloth(g.col('capeColor')),
    hat: g.c('headwear') === 'strawhat' ? { color: g.col('hatColor'), ramp: 'wood', style: 'knit' } : g.c('headwear') === 'beanie' ? { color: g.col('hatColor'), ramp: 'cloth', style: 'knit' } : cloth(g.col('hatColor')),
    apron: g.c('top') === 'none' && g.b('apron') ? { color: g.col('apronColor'), ramp: 'leather', style: 'leather' } : cloth(g.col('apronColor')),
    metal: { color: metal, ramp: g.c('metal') === 'gold' || g.c('metal') === 'bronze' ? 'gold' : 'metal', style: 'metal' },
    mail: { color: adjust(metal, -0.05), ramp: 'metal', style: 'chain' },
    gold: { color: g.c('metal') === 'silver' ? 0xd0d6de : 0xd8aa40, ramp: g.c('metal') === 'silver' ? 'metal' : 'gold', style: 'metal' },
    gem: { color: 0xd8304a, ramp: 'glow', style: 'glossy' },
    visor: { color: 0x14121a, ramp: 'dark', style: 'matte' },
    bone: { color: 0xe6dcc4, ramp: 'bone', style: 'glossy' },
    wood: { color: 0x7a5434, ramp: 'wood', style: 'matte' },
    glow: { color: g.col('glowColor'), ramp: 'glow', style: 'emissive', emissive: true },
    flame: { color: 0xffb040, ramp: 'glow', style: 'emissive', emissive: true },
    string: { color: 0xe8e0d0, ramp: 'cloth', style: 'matte' },
    fletch: { color: 0xe8e4dc, ramp: 'cloth', style: 'matte' },
    shield: cloth(g.col('shieldColor')),
    book: { color: 0x6a2a2a, ramp: 'leather', style: 'leather' },
    paper: { color: 0xeee6d2, ramp: 'cloth', style: 'matte' },
  };
}

const SYL_A = ['Al', 'Bran', 'Cor', 'Da', 'El', 'Fen', 'Gar', 'Hal', 'Is', 'Jor', 'Ka', 'Lin', 'Mar', 'Nor', 'Os', 'Per', 'Quin', 'Ro', 'Sa', 'Tor', 'Ul', 'Vel', 'Wyn', 'Yar', 'Ze', 'Ber', 'Ced', 'Ed', 'Mir', 'Tam', 'Lea', 'Ari', 'Ce', 'Rhia'];
const SYL_B = ['an', 'en', 'ric', 'wyn', 'a', 'ia', 'or', 'is', 'ett', 'in', 'ard', 'ell', 'o', 'us', 'ine', 'ra', 'win', 'tha', 'mund', 'elle', 'ias', 'dra'];
const TITLES: Record<string, string[]> = {
  farmer: ['of the Fields'], merchant: ['the Trader'], noble: ['of House Vale', 'the Fair'], guard: ['of the Watch'], knight: ['Sir', 'Dame'], ranger: ['the Wanderer'],
  rogue: ['the Quiet'], mage: ['the Wise', 'the Grey'], cleric: ['the Devout'], monk: ['of the Mountain'], barbarian: ['the Bold'], blacksmith: ['the Smith'],
};

export function syllableName(rng: Rng): string {
  return rng.pick(SYL_A) + rng.pick(SYL_B) + (rng.chance(0.2) ? rng.pick(SYL_B) : '');
}

export const humanFamily: Family = {
  id: 'human',
  label: 'Humans',
  description: 'Ordinary people with natural proportions: every age and build, skin tones, hair, layered clothing, armour and equipment, with a full set of human animations.',
  archetypes: ARCHETYPES.map(([id, label]) => ({ id, label, weight: PRIORS[id].weight })),
  schema,
  sample,
  build,
  name(rng, genome) {
    const n = syllableName(rng);
    const t = TITLES[genome.archetype];
    if (t && rng.chance(0.45)) {
      const title = rng.pick(t);
      return title === 'Sir' || title === 'Dame' ? `${title} ${n}` : `${n} ${title}`;
    }
    return n;
  },
};
