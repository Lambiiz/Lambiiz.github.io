// The wooden table, the inked arena, the single candle and the old book, the fog that swallows
// the table's edges, and the Base (stepped pedestal, lid, six sockets, seam and soul emitter).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { ARENA, BASE, SLOT_COUNT } from '../game/content';
import * as art from './art';
import {
  BAND_TOP,
  BODY_TOP,
  EMITTER_POS,
  HOLE_H,
  HOLE_W,
  LID_BEVEL,
  LID_D,
  LID_DEPTH,
  LID_TOP,
  LID_W,
  PLINTH_TOP,
  BOOK_POS,
  CANDLE_HEIGHT,
  CANDLE_POS,
  candleFlicker,
  FOG_WORLD,
  FOG_Y,
  SOCKET_FLOOR,
  socketCenter,
} from './layout';

function roundedRectShape(w: number, h: number, r: number, cx = 0, cy = 0): THREE.Shape {
  const s = new THREE.Shape();
  const x = cx - w / 2;
  const y = cy - h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function roundedRectPath(w: number, h: number, r: number, cx: number, cy: number): THREE.Path {
  const p = new THREE.Path();
  const x = cx - w / 2;
  const y = cy - h / 2;
  // holes wind opposite to the outer shape
  p.moveTo(x + r, y);
  p.quadraticCurveTo(x, y, x, y + r);
  p.lineTo(x, y + h - r);
  p.quadraticCurveTo(x, y + h, x + r, y + h);
  p.lineTo(x + w - r, y + h);
  p.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
  p.lineTo(x + w, y + r);
  p.quadraticCurveTo(x + w, y, x + w - r, y);
  p.closePath();
  return p;
}

/** Bake a set of transformed copies of `geo` into one geometry (one draw call). */
function bake(geo: THREE.BufferGeometry, transforms: THREE.Matrix4[]): THREE.BufferGeometry {
  const parts = transforms.map((m) => geo.clone().applyMatrix4(m));
  const merged = mergeGeometries(parts)!;
  parts.forEach((p) => p.dispose());
  return merged;
}

function trs(x: number, y: number, z: number, rx = 0, ry = 0, rz = 0): THREE.Matrix4 {
  return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(1, 1, 1));
}

export interface SocketView {
  slot: number;
  hit: THREE.Mesh; // explicit raycast target
  halo: THREE.Mesh;
  haloMat: THREE.MeshBasicMaterial;
  center: THREE.Vector3;
  haloLevel: number;
  haloTarget: number;
  haloColor: THREE.Color;
}

export class BoardView {
  readonly root = new THREE.Group();
  readonly baseGroup = new THREE.Group();
  readonly sockets: SocketView[] = [];
  readonly emitter: THREE.Mesh;
  readonly emitterLight: THREE.PointLight;
  private emitterMat: THREE.MeshStandardMaterial;
  private warnMat: THREE.MeshBasicMaterial;
  private warnLevel = 0;
  private baseShake = 0;
  private baseShakeAge = 1;
  private soulLift = 0;
  private soulFade = 1;
  private pulse = 0;
  private disposables: { dispose(): void }[] = [];
  private rangeRing: THREE.Mesh;
  private rangeMat: THREE.MeshBasicMaterial;
  private rangeFill: THREE.Mesh;
  private rangeFillMat: THREE.MeshBasicMaterial;
  private rangeTarget = 0;
  private rangeLevel = 0;
  private rangeRadius = 1;
  private flame: THREE.Mesh;
  private flameLight: THREE.PointLight;
  private lockCovers: THREE.Mesh[] = [];

  constructor(renderer: THREE.WebGLRenderer) {
    const track = <T extends { dispose(): void }>(x: T): T => {
      this.disposables.push(x);
      return x;
    };
    const tex = (c: HTMLCanvasElement) => track(art.colorTexture(c, renderer));

    // --- materials (shared)
    const brassTex = tex(art.drawBrassBrushed());
    brassTex.wrapS = brassTex.wrapT = THREE.RepeatWrapping;
    const brass = track(new THREE.MeshStandardMaterial({ color: 0xc8ab70, map: brassTex, metalness: 0.85, roughness: 0.38 }));
    const darkBrass = track(new THREE.MeshStandardMaterial({ color: 0x8a7041, map: brassTex, metalness: 0.8, roughness: 0.5 }));
    const woodTex = tex(art.drawDarkWood());
    woodTex.wrapS = woodTex.wrapT = THREE.RepeatWrapping;
    const ceramic = track(new THREE.MeshStandardMaterial({ color: 0xb08a66, map: woodTex, roughness: 0.72, metalness: 0.0 })); // carved reliquary wood
    const enamel = track(new THREE.MeshStandardMaterial({ color: 0x8a6a50, map: woodTex, roughness: 0.6, metalness: 0.0 }));
    const R = ARENA.boardRadius;

    // --- the physical wooden table the game is played on
    const tableTex = tex(art.drawWoodTable());
    tableTex.wrapS = tableTex.wrapT = THREE.RepeatWrapping;
    tableTex.repeat.set(5, 5);
    const table = new THREE.Mesh(track(new THREE.PlaneGeometry(240, 240)), track(new THREE.MeshStandardMaterial({ map: tableTex, color: 0xb59a80, roughness: 0.86, metalness: 0.0 })));
    table.rotation.x = -Math.PI / 2;
    table.receiveShadow = true;
    this.root.add(table);
    // the arena circle inked into the wood
    const decalTex = tex(art.drawArenaDecal(R, ARENA.spawnRadius));
    const decal = new THREE.Mesh(track(new THREE.PlaneGeometry((R + 1.5) * 2, (R + 1.5) * 2)), track(new THREE.MeshStandardMaterial({ map: decalTex, transparent: true, depthWrite: false, roughness: 0.9 })));
    decal.rotation.x = -Math.PI / 2;
    decal.position.y = 0.004;
    decal.receiveShadow = true;
    this.root.add(decal);

    // range preview ring (hovering a placed or selected tower)
    // drawn after (above) the fog veil so long ranges stay readable at the dark edges
    this.rangeMat = track(new THREE.MeshBasicMaterial({ color: 0x69dad0, transparent: true, opacity: 0, depthWrite: false, depthTest: false }));
    this.rangeRing = new THREE.Mesh(track(new THREE.RingGeometry(0.985, 1, 160)), this.rangeMat);
    this.rangeRing.rotation.x = -Math.PI / 2;
    this.rangeRing.position.y = 0.03;
    this.rangeRing.renderOrder = 10;
    this.rangeRing.visible = false;
    this.root.add(this.rangeRing);
    this.rangeFillMat = track(new THREE.MeshBasicMaterial({ color: 0x69dad0, transparent: true, opacity: 0, depthWrite: false }));
    this.rangeFill = new THREE.Mesh(track(new THREE.CircleGeometry(1, 128)), this.rangeFillMat);
    this.rangeFill.rotation.x = -Math.PI / 2;
    this.rangeFill.position.y = 0.025;
    this.rangeFill.visible = false;
    this.root.add(this.rangeFill);

    // the only props: one tall candle (the scene's key light, see SceneRig) and an old book
    const wax = track(new THREE.MeshStandardMaterial({ color: 0xcbbc98, roughness: 0.8 }));
    const bookMat = track(new THREE.MeshStandardMaterial({ color: 0x3a2418, roughness: 0.9 }));
    const pageMat = track(new THREE.MeshStandardMaterial({ color: 0xb9a888, roughness: 0.95 }));
    const flameMat = track(new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffc36b).multiplyScalar(4) }));
    const cp = CANDLE_POS;
    const candleGeo = track(new THREE.CylinderGeometry(0.9, 1.0, CANDLE_HEIGHT, 20));
    const candle = new THREE.Mesh(candleGeo, wax);
    candle.position.set(cp.x, CANDLE_HEIGHT / 2, cp.z);
    candle.castShadow = true;
    this.root.add(candle);
    const dish = new THREE.Mesh(track(new THREE.CylinderGeometry(2.0, 2.2, 0.3, 28)), darkBrass);
    dish.position.set(cp.x, 0.15, cp.z);
    dish.castShadow = true;
    dish.receiveShadow = true;
    this.root.add(dish);
    const flameGeo = track(new THREE.SphereGeometry(0.26, 12, 10));
    flameGeo.scale(1, 2.3, 1);
    this.flame = new THREE.Mesh(flameGeo, flameMat);
    this.flame.position.set(cp.x, CANDLE_HEIGHT + 0.6, cp.z);
    this.root.add(this.flame);
    // a close, unshadowed glow so the candle and its dish read warmly
    this.flameLight = new THREE.PointLight(0xffb060, 60, 26, 1.6);
    this.flameLight.position.set(cp.x, CANDLE_HEIGHT + 1.4, cp.z);
    this.root.add(this.flameLight);
    const book = new THREE.Mesh(track(new RoundedBoxGeometry(9, 1.4, 12, 3, 0.25)), [pageMat, bookMat, bookMat, bookMat, pageMat, pageMat]);
    book.position.set(BOOK_POS.x, 0.7, BOOK_POS.z);
    book.rotation.y = 0.35;
    book.castShadow = true;
    book.receiveShadow = true;
    this.root.add(book);

    // fog: a dark veil just above the pieces that clears toward the Base and around the candle, so
    // foes walk in out of the dark. Tall things (the candle, effects in the air) rise above it.
    const fogTex = tex(art.drawFogVeil(FOG_WORLD, FOG_Y, CANDLE_POS, BOOK_POS));
    const fog = new THREE.Mesh(track(new THREE.PlaneGeometry(FOG_WORLD, FOG_WORLD)), track(new THREE.MeshBasicMaterial({ map: fogTex, transparent: true, depthWrite: false })));
    fog.rotation.x = -Math.PI / 2;
    fog.position.y = FOG_Y;
    fog.renderOrder = 5;
    this.root.add(fog);

    // --- Base: stepped pedestal
    const hx = BASE.halfX;
    const hz = BASE.halfZ;
    const plinth = new THREE.Mesh(track(new RoundedBoxGeometry(hx * 2, PLINTH_TOP + 0.1, hz * 2, 4, 0.08)), darkBrass);
    plinth.position.y = (PLINTH_TOP - 0.1) / 2;
    const body = new THREE.Mesh(track(new RoundedBoxGeometry(hx * 2 - 0.42, BODY_TOP - PLINTH_TOP + 0.04, hz * 2 - 0.42, 4, 0.1)), ceramic);
    body.position.y = (BODY_TOP + PLINTH_TOP) / 2;
    const bandMesh = new THREE.Mesh(track(new RoundedBoxGeometry(hx * 2 - 0.16, BAND_TOP - BODY_TOP + 0.04, hz * 2 - 0.16, 3, 0.05)), brass);
    bandMesh.position.y = (BAND_TOP + BODY_TOP) / 2;
    for (const m of [plinth, body, bandMesh]) {
      m.castShadow = true;
      m.receiveShadow = true;
      this.baseGroup.add(m);
    }
    // ceramic body corner pilasters (brass)
    const pil = new THREE.CylinderGeometry(0.11, 0.13, BODY_TOP - PLINTH_TOP, 12);
    const pilXf: THREE.Matrix4[] = [];
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) pilXf.push(trs(sx * (hx - 0.24), (BODY_TOP + PLINTH_TOP) / 2, sz * (hz - 0.24)));
    const pilasters = new THREE.Mesh(track(bake(pil, pilXf)), brass);
    pil.dispose();
    pilasters.castShadow = true;
    this.baseGroup.add(pilasters);
    // brass inlay frieze around the ceramic body and a glyph medallion on the viewer-facing side
    const frieze = new THREE.Mesh(track(new RoundedBoxGeometry(hx * 2 - 0.36, 0.07, hz * 2 - 0.36, 2, 0.03)), brass);
    frieze.position.y = PLINTH_TOP + (BODY_TOP - PLINTH_TOP) * 0.62;
    frieze.castShadow = true;
    this.baseGroup.add(frieze);
    const medTex = tex(art.drawMedallion());
    const medMat = track(new THREE.MeshStandardMaterial({ map: medTex, transparent: true, metalness: 0.7, roughness: 0.4 }));
    const medGeo = track(new THREE.PlaneGeometry(1.5, 0.42));
    for (const [x, z, ry] of [
      [0, hz - 0.209, 0],
      [hx - 0.209, 0, Math.PI / 2],
    ] as const) {
      const med = new THREE.Mesh(medGeo, medMat);
      med.position.set(x, PLINTH_TOP + (BODY_TOP - PLINTH_TOP) * 0.3, z);
      med.rotation.y = ry;
      this.baseGroup.add(med);
    }
    // warning rim (coral), pulses when the Base is hit
    this.warnMat = track(new THREE.MeshBasicMaterial({ color: 0xe28174, transparent: true, opacity: 0, depthWrite: false, toneMapped: true }));
    const warnShape = roundedRectShape(hx * 2 + 0.36, hz * 2 + 0.36, 0.3);
    warnShape.holes.push(roundedRectPath(hx * 2 + 0.02, hz * 2 + 0.02, 0.1, 0, 0));
    const warn = new THREE.Mesh(track(new THREE.ShapeGeometry(warnShape, 8)), this.warnMat);
    warn.rotation.x = -Math.PI / 2;
    warn.position.y = 0.012;
    this.baseGroup.add(warn);

    // --- enamel lid with six beveled socket holes
    const lidShape = roundedRectShape(LID_W, LID_D, 0.28);
    for (let s = 0; s < SLOT_COUNT; s++) {
      const c = socketCenter(s);
      // shape space: x -> world x, y -> -world z (after rotating -90° about X)
      lidShape.holes.push(roundedRectPath(HOLE_W, HOLE_H, 0.14, c.x, -c.z));
    }
    const lidGeo = track(
      new THREE.ExtrudeGeometry(lidShape, {
        depth: LID_DEPTH,
        bevelEnabled: true,
        bevelThickness: LID_BEVEL,
        bevelSize: 0.04,
        bevelSegments: 3,
        curveSegments: 10,
      }),
    );
    // remap cap UVs from shape space into [0,1] for the enamel artwork
    const uv = lidGeo.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, (uv.getX(i) + LID_W / 2) / LID_W, (uv.getY(i) + LID_D / 2) / LID_D);
    }
    const lid = new THREE.Mesh(lidGeo, [enamel, brass]);
    lid.rotation.x = -Math.PI / 2;
    lid.position.y = BAND_TOP;
    lid.castShadow = true;
    lid.receiveShadow = true;
    this.baseGroup.add(lid);

    // socket recesses: dark floors, brass lip frames, glyph halos and explicit hit targets
    const floorTex = tex(art.drawSocketFloor());
    const floorMat = track(new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.9, metalness: 0.1 }));
    const floorGeo = track(new THREE.PlaneGeometry(HOLE_W + 0.08, HOLE_H + 0.08));
    const lipShape = roundedRectShape(HOLE_W + 0.2, HOLE_H + 0.2, 0.2);
    lipShape.holes.push(roundedRectPath(HOLE_W + 0.02, HOLE_H + 0.02, 0.14, 0, 0));
    const lipGeo = track(new THREE.ExtrudeGeometry(lipShape, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015, bevelSegments: 2 }));
    const haloShape = roundedRectShape(HOLE_W + 0.5, HOLE_H + 0.5, 0.34);
    haloShape.holes.push(roundedRectPath(HOLE_W + 0.24, HOLE_H + 0.24, 0.22, 0, 0));
    const haloGeo = track(new THREE.ShapeGeometry(haloShape, 8));
    const hitGeo = track(new THREE.PlaneGeometry(HOLE_W + 0.2, HOLE_H + 0.2));
    const hitMat = track(new THREE.MeshBasicMaterial({ visible: false }));
    const floorXf: THREE.Matrix4[] = [];
    const lipXf: THREE.Matrix4[] = [];
    for (let s = 0; s < SLOT_COUNT; s++) {
      const c = socketCenter(s);
      floorXf.push(trs(c.x, SOCKET_FLOOR, c.z, -Math.PI / 2));
      lipXf.push(trs(c.x, LID_TOP - 0.005, c.z, -Math.PI / 2));
    }
    const floors = new THREE.Mesh(track(bake(floorGeo, floorXf)), floorMat);
    floors.receiveShadow = true;
    const lips = new THREE.Mesh(track(bake(lipGeo, lipXf)), brass);
    lips.castShadow = true;
    lips.receiveShadow = true;
    this.baseGroup.add(floors, lips);
    const coverTex = tex(art.drawLockCover());
    const coverMat = track(new THREE.MeshStandardMaterial({ map: coverTex, metalness: 0.7, roughness: 0.45 }));
    const coverGeo = track(new RoundedBoxGeometry(HOLE_W - 0.04, 0.08, HOLE_H - 0.04, 2, 0.03));
    for (let s = 0; s < SLOT_COUNT; s++) {
      const c = socketCenter(s);
      const cover = new THREE.Mesh(coverGeo, coverMat);
      cover.position.set(c.x, LID_TOP - 0.03, c.z);
      cover.castShadow = true;
      cover.receiveShadow = true;
      cover.visible = false;
      this.baseGroup.add(cover);
      this.lockCovers.push(cover);
      const haloMat = track(new THREE.MeshBasicMaterial({ color: 0x69dad0, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = -Math.PI / 2;
      halo.position.set(c.x, LID_TOP + 0.03, c.z);
      halo.renderOrder = 3;
      this.baseGroup.add(halo);
      const hit = new THREE.Mesh(hitGeo, hitMat);
      hit.rotation.x = -Math.PI / 2;
      hit.position.set(c.x, LID_TOP + 0.02, c.z);
      hit.userData.slot = s;
      this.baseGroup.add(hit);
      this.sockets.push({
        slot: s,
        hit,
        halo,
        haloMat,
        center: new THREE.Vector3(c.x, LID_TOP, c.z),
        haloLevel: 0,
        haloTarget: 0,
        haloColor: new THREE.Color(0x69dad0),
      });
    }

    // fine central seam between the rows, plus a cross seam
    const seam = new THREE.Mesh(track(new THREE.BoxGeometry(LID_W - 0.6, 0.02, 0.035)), brass);
    seam.position.set(0, LID_TOP + 0.005, 0);
    this.baseGroup.add(seam);

    // shared soul emitter: small orb in a brass cradle on the seam
    const cradle = new THREE.Mesh(track(new THREE.TorusGeometry(0.2, 0.035, 10, 32)), brass);
    cradle.rotation.x = Math.PI / 2;
    cradle.position.set(EMITTER_POS.x, LID_TOP + 0.08, EMITTER_POS.z);
    cradle.castShadow = true;
    this.baseGroup.add(cradle);
    const prongGeo = new THREE.CylinderGeometry(0.018, 0.025, 0.36, 6);
    const prongXf: THREE.Matrix4[] = [];
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + 0.5;
      prongXf.push(trs(Math.cos(a) * 0.17, LID_TOP + 0.22, Math.sin(a) * 0.17, -Math.sin(a) * 0.35, 0, Math.cos(a) * 0.35));
    }
    this.baseGroup.add(new THREE.Mesh(track(bake(prongGeo, prongXf)), brass));
    prongGeo.dispose();
    this.emitterMat = track(new THREE.MeshStandardMaterial({ color: 0x0b1a1c, emissive: 0x69dad0, emissiveIntensity: 2.2, roughness: 0.2 }));
    this.emitter = new THREE.Mesh(track(new THREE.SphereGeometry(0.15, 24, 16)), this.emitterMat);
    this.emitter.position.set(EMITTER_POS.x, EMITTER_POS.y, EMITTER_POS.z);
    this.baseGroup.add(this.emitter);
    this.emitterLight = new THREE.PointLight(0x69dad0, 2.2, 6, 2);
    this.emitterLight.position.copy(this.emitter.position);
    this.baseGroup.add(this.emitterLight);

    // baked-looking contact occlusion around the Base on the board
    const aoTex = tex(art.drawRadial('rgba(0,0,0,0.7)', 'rgba(0,0,0,0)', 256));
    const ao = new THREE.Mesh(track(new THREE.PlaneGeometry(hx * 2 + 2.4, hz * 2 + 2.4)), track(new THREE.MeshBasicMaterial({ map: aoTex, transparent: true, depthWrite: false })));
    ao.rotation.x = -Math.PI / 2;
    ao.position.y = 0.005;
    this.root.add(ao);

    this.root.add(this.baseGroup);

  }

  /** Points used to fit the combat camera. */
  combatFitPoints(): THREE.Vector3[] {
    // every spawn approach (ring + enemy height) and the Base; the ornamental rim may bleed off-edge
    const pts: THREE.Vector3[] = [];
    const R = ARENA.spawnRadius + 0.8;
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R), new THREE.Vector3(Math.cos(a) * R, 1.3, Math.sin(a) * R));
    }
    return pts;
  }

  get rangeVisible(): { level: number; radius: number } {
    return { level: this.rangeLevel, radius: this.rangeRadius };
  }

  /** Show covers on locked sockets. */
  setLocked(locked: boolean[]): void {
    locked.forEach((l, i) => (this.lockCovers[i].visible = l));
  }

  /** Range preview around the Base centre (null hides it). */
  setRange(radius: number | null, color = 0x69dad0): void {
    if (radius === null) {
      this.rangeTarget = 0;
      return;
    }
    this.rangeTarget = 1;
    this.rangeRadius = radius;
    this.rangeMat.color.setHex(color);
    this.rangeFillMat.color.setHex(color);
  }

  setSoul(lift: number, fade: number): void {
    this.soulLift = lift;
    this.soulFade = fade;
  }

  emitterPulse(strength = 1): void {
    this.pulse = Math.max(this.pulse, strength);
  }

  baseHit(amount: number): void {
    this.warnLevel = Math.min(1, this.warnLevel + 0.5 + amount / 20);
    this.baseShake = Math.min(1, 0.4 + amount / 14);
    this.baseShakeAge = 0;
  }

  setSocketHalo(slot: number, level: number, color: number): void {
    const s = this.sockets[slot];
    s.haloTarget = level;
    s.haloColor.setHex(color);
  }

  clearHalos(): void {
    for (const s of this.sockets) s.haloTarget = 0;
  }

  reset(): void {
    this.warnLevel = 0;
    this.baseShake = 0;
    this.soulLift = 0;
    this.soulFade = 1;
    this.pulse = 0;
    this.clearHalos();
  }

  /** combat-time effects use `simDt`; ceremonies and UI-ish motion use `presentDt`. */
  update(presentDt: number, simDt: number, time: number): void {
    // warning rim and shake respond to sim time (frozen while frozen)
    this.warnLevel = Math.max(0, this.warnLevel - simDt * 1.6);
    this.warnMat.opacity = this.warnLevel * 0.75;
    this.baseShakeAge += simDt;
    const k = Math.max(0, 1 - this.baseShakeAge / 0.35);
    const shake = this.baseShake * k * k;
    this.baseGroup.position.set(Math.sin(this.baseShakeAge * 70) * 0.05 * shake, -0.04 * shake, Math.cos(this.baseShakeAge * 55) * 0.03 * shake);

    // range preview (presentation)
    this.rangeLevel += (this.rangeTarget - this.rangeLevel) * (1 - Math.exp(-presentDt * 14));
    const show = this.rangeLevel > 0.01;
    this.rangeRing.visible = this.rangeFill.visible = show;
    if (show) {
      const r = this.rangeRadius;
      this.rangeRing.scale.set(r, r, 1);
      this.rangeFill.scale.set(r, r, 1);
      this.rangeMat.opacity = 0.85 * this.rangeLevel;
      this.rangeFillMat.opacity = 0.07 * this.rangeLevel;
    }
    // candle flicker (the shadow-casting key light flickers with it in SceneRig)
    const flick = candleFlicker(time);
    this.flame.scale.set(1, flick, 1);
    this.flameLight.intensity = 60 * flick;

    this.pulse = Math.max(0, this.pulse - simDt * 5);
    const breathe = 0.5 + 0.5 * Math.sin(time * 1.7);
    this.emitterMat.emissiveIntensity = (1.6 + breathe * 0.6 + this.pulse * 3.5) * this.soulFade;
    this.emitterLight.intensity = (1.4 + this.pulse * 3) * this.soulFade;
    const sc = 1 + this.pulse * 0.35;
    this.emitter.scale.setScalar(sc * (0.4 + 0.6 * this.soulFade));
    this.emitter.position.y = EMITTER_POS.y + this.soulLift * 3.5 + Math.sin(time * 1.3) * 0.03;
    this.emitterLight.position.copy(this.emitter.position);

    for (const s of this.sockets) {
      s.haloLevel += (s.haloTarget - s.haloLevel) * (1 - Math.exp(-presentDt * 12));
      s.haloMat.opacity = s.haloLevel * (0.55 + 0.25 * Math.sin(time * 6));
      s.halo.visible = s.haloLevel > 0.01;
      s.haloMat.color.copy(s.haloColor);
    }
  }

  dispose(): void {
    for (const d of this.disposables) d.dispose();
    this.disposables.length = 0;
  }
}
