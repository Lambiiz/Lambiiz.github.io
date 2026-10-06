import * as THREE from 'three';
import { pixelMaterial, toMaps } from '../pixel/texture';
import { planks, roughStone, stripes, timber, stoneBlocks } from '../pixel/surfaces';
import { PixelCanvas } from '../pixel/PixelCanvas';
import { shade } from '../pixel/color';
import type { BillboardItem } from '../sprite/BillboardBatch';
import type { Lighting } from '../render/Lighting';
import type { Terrain } from './Terrain';

/**
 * Small 3D props built from primitives and pixel textures. A PropKit owns the shared materials and
 * collects what the props contribute elsewhere: billboard sprites (foliage, signs, produce),
 * colliders and lights.
 */
export class PropKit {
  readonly group = new THREE.Group();
  readonly billboards: BillboardItem[] = [];
  private mats = new Map<string, THREE.Material>();

  constructor(private terrain: Terrain, private lighting: Lighting) {}

  mat(key: string): THREE.Material {
    let m = this.mats.get(key);
    if (m) return m;
    switch (key) {
      case 'wood': m = pixelMaterial(toMaps(planks(3, 0x8a5a36, 32, 32, 5))); break;
      case 'woodH': m = pixelMaterial(toMaps(planks(4, 0x7a4e30, 32, 32, 4, true))); break;
      case 'darkwood': m = pixelMaterial(toMaps(timber(5, 0x4a3426, 16, 32))); break;
      case 'stone': m = pixelMaterial(toMaps(roughStone(6, 0x9a948a, 32))); break;
      case 'blocks': m = pixelMaterial(toMaps(stoneBlocks(7, 0xa09484, 32, 32, 8))); break;
      case 'iron': m = new THREE.MeshStandardMaterial({ color: 0x2a2a30, roughness: 0.5, metalness: 0.6 }); break;
      case 'water': m = new THREE.MeshStandardMaterial({ color: 0x1a3a50, roughness: 0.15, metalness: 0.1 }); break;
      case 'awningR': m = pixelMaterial(toMaps(stripes(0xc04a3a, 0xf0e6d0, 32, 32, 4)), { side: THREE.DoubleSide }); break;
      case 'awningG': m = pixelMaterial(toMaps(stripes(0x3a7a4a, 0xf0e6d0, 32, 32, 4)), { side: THREE.DoubleSide }); break;
      case 'awningB': m = pixelMaterial(toMaps(stripes(0x3a5a8a, 0xf0e6d0, 32, 32, 4)), { side: THREE.DoubleSide }); break;
      case 'cloth': m = new THREE.MeshStandardMaterial({ color: 0xf0e6d0, roughness: 1 }); break;
      case 'barrel': {
        const pc = planks(8, 0x8a5a36, 32, 32, 4);
        for (const y of [5, 6, 25, 26]) for (let x = 0; x < 32; x++) { pc.set(x, y, shade(0x4a4a50, y % 2 ? -0.2 : 0.2)); pc.setHeight(x, y, 0.9); }
        m = pixelMaterial(toMaps(pc));
        break;
      }
      case 'glass': {
        const mm = new THREE.MeshStandardMaterial({ color: 0xffe0a0, emissive: 0xffb050, emissiveIntensity: 2, roughness: 0.4 });
        this.lighting.addEmissive(mm, 3.2, 'lamp');
        m = mm;
        break;
      }
      default: throw new Error(`no prop material ${key}`);
    }
    this.mats.set(key, m);
    return m;
  }

  private mesh(geo: THREE.BufferGeometry, key: string, x: number, y: number, z: number): THREE.Mesh {
    const m = new THREE.Mesh(geo, this.mat(key));
    m.position.set(x, y, z);
    m.castShadow = m.receiveShadow = true;
    this.group.add(m);
    return m;
  }

  private y(x: number, z: number): number {
    return this.terrain.heightAt(x, z);
  }

  lamppost(x: number, z: number, opts: { wall?: boolean } = {}): void {
    const y = this.y(x, z);
    const h = 2.9;
    if (!opts.wall) {
      this.mesh(new THREE.CylinderGeometry(0.07, 0.1, h, 6), 'iron', x, y + h / 2, z);
      this.mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.25, 8), 'blocks', x, y + 0.12, z);
      this.terrain.addCollider(x, z, 0.25);
    }
    const ly = y + h + 0.12;
    this.mesh(new THREE.BoxGeometry(0.34, 0.42, 0.34), 'glass', x, ly, z);
    this.mesh(new THREE.ConeGeometry(0.3, 0.22, 4), 'iron', x, ly + 0.32, z).rotation.y = Math.PI / 4;
    this.mesh(new THREE.BoxGeometry(0.38, 0.05, 0.38), 'iron', x, ly - 0.22, z);
    const light = new THREE.PointLight(0xffa850, 6, 9, 1.6);
    light.position.set(x, ly, z + 0.05);
    this.group.add(light);
    this.lighting.addLamp(light, 6);
  }

  well(x: number, z: number): void {
    const y = this.y(x, z);
    const ring = new THREE.CylinderGeometry(0.95, 1.0, 0.8, 14, 1, true);
    this.mesh(ring, 'blocks', x, y + 0.4, z);
    const inner = new THREE.CylinderGeometry(0.78, 0.78, 0.8, 14, 1, true);
    const im = this.mesh(inner, 'stone', x, y + 0.4, z);
    (im.material as THREE.Material).side = THREE.DoubleSide;
    this.mesh(new THREE.TorusGeometry(0.88, 0.1, 4, 14), 'stone', x, y + 0.8, z).rotation.x = Math.PI / 2;
    this.mesh(new THREE.CircleGeometry(0.78, 14), 'water', x, y + 0.55, z).rotation.x = -Math.PI / 2;
    for (const s of [-1, 1]) this.mesh(new THREE.BoxGeometry(0.12, 1.8, 0.12), 'darkwood', x + s * 0.82, y + 1.4, z);
    this.mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.7, 6), 'darkwood', x, y + 1.75, z).rotation.z = Math.PI / 2;
    const roof = new THREE.ConeGeometry(1.35, 0.85, 4);
    const r = this.mesh(roof, 'woodH', x, y + 2.65, z);
    r.rotation.y = Math.PI / 4;
    this.terrain.addCollider(x, z, 1.05);
  }

  barrel(x: number, z: number, scale = 1): void {
    const y = this.y(x, z);
    this.mesh(new THREE.CylinderGeometry(0.32 * scale, 0.28 * scale, 0.8 * scale, 10), 'barrel', x, y + 0.4 * scale, z);
    this.mesh(new THREE.CircleGeometry(0.3 * scale, 10), 'woodH', x, y + 0.8 * scale + 0.005, z).rotation.x = -Math.PI / 2;
    this.terrain.addCollider(x, z, 0.32 * scale);
  }

  crate(x: number, z: number, s = 0.7, rot = 0, onTopOf = 0): void {
    const y = this.y(x, z) + onTopOf;
    this.mesh(new THREE.BoxGeometry(s, s, s), 'wood', x, y + s / 2, z).rotation.y = rot;
    if (!onTopOf) this.terrain.addCollider(x, z, s * 0.6);
  }

  bench(x: number, z: number, rotY = 0): void {
    const y = this.y(x, z);
    const g = new THREE.Group();
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 0.45), this.mat('woodH'));
    seat.position.y = 0.45;
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.08), this.mat('woodH'));
    back.position.set(0, 0.75, -0.2);
    g.add(seat, back);
    for (const s of [-0.7, 0.7]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.4), this.mat('iron'));
      leg.position.set(s, 0.22, 0);
      g.add(leg);
    }
    g.traverse((o) => { if (o instanceof THREE.Mesh) { o.castShadow = o.receiveShadow = true; } });
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    this.group.add(g);
    this.terrain.addCollider(x, z, 0.6);
  }

  marketStall(x: number, z: number, awning: 'awningR' | 'awningG' | 'awningB', goods: string[]): void {
    const y = this.y(x, z);
    const w = 2.4, d = 1.2;
    this.mesh(new THREE.BoxGeometry(w, 0.9, d * 0.7), 'wood', x, y + 0.45, z + 0.1);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) this.mesh(new THREE.BoxGeometry(0.1, 2.3, 0.1), 'darkwood', x + sx * (w / 2 - 0.05), y + 1.15, z + sz * (d / 2 - 0.05));
    // sloped striped awning
    const aw = new THREE.PlaneGeometry(w + 0.5, d + 0.9);
    const a = this.mesh(aw, awning, x, y + 2.35, z + 0.15);
    a.rotation.x = -Math.PI / 2 + 0.38;
    // valance
    const v = this.mesh(new THREE.PlaneGeometry(w + 0.5, 0.25), awning, x, y + 2.05, z + 0.98);
    v.rotation.x = 0;
    goods.forEach((g, i) => {
      this.billboards.push({ region: g, x: x - w / 2 + 0.5 + i * ((w - 1) / Math.max(1, goods.length - 1)), y: y + 0.9, z: z + 0.25, scale: 1 });
    });
    this.terrain.addCollider(x - 0.6, z + 0.1, 0.65);
    this.terrain.addCollider(x + 0.6, z + 0.1, 0.65);
  }

  /** Stone balustrade between two points (posts + rail), the classic HD-2D foreground railing. */
  balustrade(x0: number, z0: number, x1: number, z1: number, opts: { y?: number; collide?: boolean } = {}): void {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const n = Math.max(1, Math.round(len / 0.45));
    const ang = Math.atan2(z1 - z0, x1 - x0);
    const y = opts.y ?? this.y((x0 + x1) / 2, (z0 + z1) / 2);
    const geoPost = new THREE.CylinderGeometry(0.1, 0.13, 0.6, 6);
    const posts = new THREE.InstancedMesh(geoPost, this.mat('blocks'), n + 1);
    const m = new THREE.Matrix4();
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const big = i % 6 === 0 || i === n;
      m.compose(new THREE.Vector3(x0 + (x1 - x0) * t, y + 0.3 + 0.12, z0 + (z1 - z0) * t), new THREE.Quaternion(), new THREE.Vector3(big ? 2.2 : 1, big ? 1.1 : 1, big ? 2.2 : 1));
      posts.setMatrixAt(i, m);
    }
    posts.castShadow = posts.receiveShadow = true;
    this.group.add(posts);
    const rail = this.mesh(new THREE.BoxGeometry(len + 0.2, 0.14, 0.34), 'blocks', (x0 + x1) / 2, y + 0.8, (z0 + z1) / 2);
    rail.rotation.y = -ang;
    const base = this.mesh(new THREE.BoxGeometry(len + 0.2, 0.16, 0.36), 'blocks', (x0 + x1) / 2, y + 0.08, (z0 + z1) / 2);
    base.rotation.y = -ang;
    if (opts.collide !== false) {
      for (let i = 0; i <= Math.ceil(len / 0.5); i++) {
        const t = i / Math.ceil(len / 0.5);
        this.terrain.addCollider(x0 + (x1 - x0) * t, z0 + (z1 - z0) * t, 0.25);
      }
    }
  }

  fence(x0: number, z0: number, x1: number, z1: number): void {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const n = Math.max(1, Math.round(len / 1.0));
    const ang = Math.atan2(z1 - z0, x1 - x0);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t;
      this.mesh(new THREE.BoxGeometry(0.12, 0.9, 0.12), 'darkwood', x, this.y(x, z) + 0.45, z);
      this.terrain.addCollider(x, z, 0.3);
    }
    const cy = this.y((x0 + x1) / 2, (z0 + z1) / 2);
    for (const h of [0.35, 0.7]) {
      const r = this.mesh(new THREE.BoxGeometry(len, 0.08, 0.06), 'woodH', (x0 + x1) / 2, cy + h, (z0 + z1) / 2);
      r.rotation.y = -ang;
    }
  }

  /** Tree: a trunk with branches and camera-facing canopy clumps. */
  tree(x: number, z: number, opts: { height?: number; clumps?: string[]; seed?: number; collide?: boolean } = {}): void {
    const y = this.y(x, z);
    const h = opts.height ?? 3.2;
    const seed = opts.seed ?? Math.round(x * 31 + z * 17);
    const trunk = this.mesh(new THREE.CylinderGeometry(0.16, 0.28, h, 6), 'darkwood', x, y + h / 2, z);
    trunk.rotation.z = ((seed % 7) - 3) * 0.02;
    const clumps = opts.clumps ?? ['canopyA', 'canopyB', 'canopyC'];
    const rnd = (i: number) => (Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453) % 1;
    const n = 7;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + rnd(i) * 0.5;
      const rr = i === 0 ? 0 : 0.9 + Math.abs(rnd(i + 9)) * 0.5;
      this.billboards.push({
        region: clumps[i % clumps.length],
        x: x + Math.cos(a) * rr * 0.8,
        y: y + h - 0.5 + (i === 0 ? 1.2 : Math.abs(rnd(i + 3)) * 1.4 - 0.2),
        z: z + Math.sin(a) * rr * 0.6,
        scale: 1,
        sway: 1,
        anchorPx: 14,
        flip: rnd(i + 5) > 0,
      });
    }
    if (opts.collide !== false) this.terrain.addCollider(x, z, 0.4);
  }

  sprite(region: string, x: number, z: number, opts: { y?: number; sway?: number; scale?: number; flip?: boolean; anchorPx?: number } = {}): void {
    this.billboards.push({ region, x, y: opts.y ?? this.y(x, z), z, sway: opts.sway ?? 0, scale: opts.scale ?? 1, flip: opts.flip, anchorPx: opts.anchorPx });
  }

  /** A flat sprite fixed to a wall (banner, sign): a lit quad, not a billboard. */
  wallSprite(pc: PixelCanvas, x: number, y: number, z: number, rotY: number, scale = 1): THREE.Mesh {
    const maps = toMaps(pc, { repeat: false });
    maps.map.minFilter = THREE.NearestFilter;
    maps.map.generateMipmaps = false;
    const m = new THREE.MeshStandardMaterial({ map: maps.map, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 1 });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry((pc.w / 16) * scale, (pc.h / 16) * scale), m);
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotY;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: maps.map, alphaTest: 0.5 });
    this.group.add(mesh);
    return mesh;
  }

  /** Hanging sign on an iron bracket sticking out of a wall facing +z. */
  hangingSign(pc: PixelCanvas, x: number, y: number, z: number): void {
    this.mesh(new THREE.BoxGeometry(0.06, 0.06, 0.9), 'iron', x, y + 0.5, z + 0.45);
    const s = this.wallSprite(pc, x, y, z + 0.75, Math.PI / 2);
    s.position.y = y;
  }
}
