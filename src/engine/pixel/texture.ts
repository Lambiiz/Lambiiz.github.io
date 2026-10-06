import * as THREE from 'three';
import { PixelCanvas } from './PixelCanvas';

/** World scale: every texture texel is 1/16 of a world unit, everywhere (characters included). */
export const PX_PER_UNIT = 16;

export interface PixelMaps {
  map: THREE.Texture;
  normalMap: THREE.Texture | null;
  emissiveMap: THREE.Texture | null;
}

function configure(t: THREE.Texture, repeat: boolean, colour: boolean): THREE.Texture {
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestMipmapLinearFilter;
  t.generateMipmaps = true;
  t.anisotropy = 4;
  t.colorSpace = colour ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.needsUpdate = true;
  return t;
}

/** Upload a PixelCanvas (and its height / emissive channels) as textures. */
export function toMaps(pc: PixelCanvas, opts: { repeat?: boolean; normalStrength?: number } = {}): PixelMaps {
  const repeat = opts.repeat ?? true;
  const map = configure(new THREE.CanvasTexture(pc.toCanvas()), repeat, true);
  const normalMap = pc.height ? configure(new THREE.CanvasTexture(pc.normalCanvas(opts.normalStrength ?? 3)), repeat, false) : null;
  const em = pc.emissiveCanvas();
  const emissiveMap = em ? configure(new THREE.CanvasTexture(em), repeat, true) : null;
  return { map, normalMap, emissiveMap };
}

/** Sprite texture: no mipmaps (keeps alpha-tested edges crisp), clamped. */
export function spriteTexture(pc: PixelCanvas | HTMLCanvasElement): THREE.Texture {
  const t = new THREE.CanvasTexture(pc instanceof PixelCanvas ? pc.toCanvas() : pc);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  t.needsUpdate = true;
  return t;
}

/** A lit pixel-art surface material. */
export function pixelMaterial(maps: PixelMaps, opts: { roughness?: number; normalScale?: number; emissiveIntensity?: number; side?: THREE.Side } = {}): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({
    map: maps.map,
    normalMap: maps.normalMap ?? undefined,
    roughness: opts.roughness ?? 0.92,
    metalness: 0,
    side: opts.side ?? THREE.FrontSide,
  });
  if (maps.normalMap) m.normalScale.set(opts.normalScale ?? 1, opts.normalScale ?? 1);
  if (maps.emissiveMap) {
    m.emissiveMap = maps.emissiveMap;
    m.emissive.set(0xffffff);
    m.emissiveIntensity = opts.emissiveIntensity ?? 0;
  }
  return m;
}
