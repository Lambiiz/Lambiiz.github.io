import type * as THREE from 'three';
import { SheetTexture } from '../sprite/Sprite3D';
import { lookByName, type CharacterLook } from './look';
import { bakeSheet, battleSpec, overworldSpec } from './bake';

/**
 * Baked sprite sheets, made on first use and cached. Baking needs the game's WebGL renderer, so
 * call `setBakeRenderer` once at start-up.
 */
let renderer: THREE.WebGLRenderer | null = null;
const cache = new Map<string, SheetTexture>();

export function setBakeRenderer(r: THREE.WebGLRenderer): void {
  renderer = r;
}

function get(key: string, look: CharacterLook, battle: boolean): SheetTexture {
  let s = cache.get(key);
  if (s) return s;
  if (!renderer) throw new Error('setBakeRenderer() first');
  s = new SheetTexture(bakeSheet(renderer, look, battle ? battleSpec(look) : overworldSpec()));
  cache.set(key, s);
  return s;
}

export function overworldSheet(look: string | CharacterLook): SheetTexture {
  const l = typeof look === 'string' ? lookByName(look) : look;
  return get(`ow:${typeof look === 'string' ? look : JSON.stringify(look)}`, l, false);
}

export function battleSheet(look: string | CharacterLook): SheetTexture {
  const l = typeof look === 'string' ? lookByName(look) : look;
  return get(`bt:${typeof look === 'string' ? look : JSON.stringify(look)}`, l, true);
}
