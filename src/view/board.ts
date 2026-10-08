// The floating board, brass rim, the Base (stepped pedestal, enamel lid, six sockets,
// seam and shared soul emitter) and the return aperture beyond the rim.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { ARENA, BASE, SLOT_COUNT, TRIAL_COUNT } from '../game/content';
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
  SOCKET_FLOOR,
  socketCenter,
  STACK_POS,
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
  private apertureSegments: THREE.MeshStandardMaterial[] = [];
  private apertureIris: THREE.Mesh[] = [];
  private apertureCore: THREE.Mesh;
  private apertureCoreMat: THREE.MeshBasicMaterial;
  private apertureOpen = 0;
  private apertureOpenTarget = 0;
  private progress = 0;
  private soulLift = 0;
  private soulFade = 1;
  private pulse = 0;
  private disposables: { dispose(): void }[] = [];
  readonly apertureGroup = new THREE.Group();

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
    const ceramicTex = tex(art.drawCeramic());
    ceramicTex.wrapS = ceramicTex.wrapT = THREE.RepeatWrapping;
    const ceramic = track(new THREE.MeshStandardMaterial({ color: 0xffffff, map: ceramicTex, roughness: 0.42, metalness: 0.0 }));
    const enamelTex = tex(art.drawLidEnamel());
    const enamel = track(
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        map: enamelTex,
        roughness: 0.28,
        metalness: 0.05,
        clearcoat: 0.6,
        clearcoatRoughness: 0.25,
      }),
    ); // the single hero physical material
    const boardTex = tex(art.drawBoardTop());
    const board = track(new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.82, metalness: 0.08 }));
    const boardSide = track(new THREE.MeshStandardMaterial({ color: 0x0d1320, roughness: 0.7, metalness: 0.2 }));
    const rimTex = tex(art.drawRimBand());
    rimTex.wrapS = THREE.RepeatWrapping;
    rimTex.repeat.set(3, 1);
    const rimBand = track(new THREE.MeshStandardMaterial({ map: rimTex, metalness: 0.85, roughness: 0.36 }));

    // --- void backdrop far below
    const voidTex = tex(art.drawVoid());
    const voidPlane = new THREE.Mesh(track(new THREE.PlaneGeometry(120, 120)), track(new THREE.MeshBasicMaterial({ map: voidTex, toneMapped: false, depthWrite: false })));
    voidPlane.rotation.x = -Math.PI / 2;
    voidPlane.position.y = -14;
    voidPlane.renderOrder = -10;
    this.root.add(voidPlane);

    // --- board disc
    const R = ARENA.boardRadius;
    const boardGeo = track(new THREE.CylinderGeometry(R, R - 0.25, 0.6, 160, 1));
    const boardMesh = new THREE.Mesh(boardGeo, [boardSide, board, boardSide]);
    boardMesh.position.y = -0.3;
    boardMesh.receiveShadow = true;
    this.root.add(boardMesh);
    // underside taper: floating ceremonial slab
    const under = new THREE.Mesh(track(new THREE.CylinderGeometry(R - 0.25, R - 2.4, 1.1, 96, 1, true)), boardSide);
    under.position.y = -1.15;
    this.root.add(under);
    const underRing = new THREE.Mesh(track(new THREE.TorusGeometry(R - 1.6, 0.06, 8, 128)), darkBrass);
    underRing.rotation.x = Math.PI / 2;
    underRing.position.y = -1.3;
    this.root.add(underRing);

    // --- brass rim (lathe profile) + engraved band
    const rimProfile = [
      new THREE.Vector2(R - 0.18, 0.0),
      new THREE.Vector2(R - 0.16, 0.12),
      new THREE.Vector2(R - 0.05, 0.2),
      new THREE.Vector2(R + 0.25, 0.22),
      new THREE.Vector2(R + 0.42, 0.14),
      new THREE.Vector2(R + 0.45, -0.05),
    ];
    const rim = new THREE.Mesh(track(new THREE.LatheGeometry(rimProfile, 180)), brass);
    rim.receiveShadow = true;
    this.root.add(rim);
    const band = new THREE.Mesh(track(new THREE.CylinderGeometry(R + 0.45, R + 0.3, 0.55, 180, 1, true)), rimBand);
    band.position.y = -0.32;
    this.root.add(band);

    // memory stack ledge on the near rim (draft cards rise from here)
    const ledge = new THREE.Mesh(track(new RoundedBoxGeometry(2.0, 0.18, 2.4, 3, 0.06)), brass);
    ledge.position.set(STACK_POS.x, 0.02, STACK_POS.z);
    ledge.rotation.y = -0.25;
    ledge.castShadow = ledge.receiveShadow = true;
    this.root.add(ledge);
    const backTex = tex(art.drawCardBack());
    const backMat = track(new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.5, metalness: 0.1 }));
    const edgeMat = track(new THREE.MeshStandardMaterial({ color: 0xdfd3b2, roughness: 0.7 }));
    const stackCard = track(new THREE.BoxGeometry(1.5, 0.035, 2.0));
    for (let i = 0; i < 5; i++) {
      const c = new THREE.Mesh(stackCard, [edgeMat, edgeMat, backMat, edgeMat, edgeMat, edgeMat]);
      c.position.set(STACK_POS.x + (i % 2) * 0.02, 0.13 + i * 0.04, STACK_POS.z - i * 0.015);
      c.rotation.y = ledge.rotation.y + (i - 2) * 0.03;
      c.castShadow = true;
      this.root.add(c);
    }

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
    const pil = track(new THREE.CylinderGeometry(0.11, 0.13, BODY_TOP - PLINTH_TOP, 12));
    for (const sx of [-1, 1])
      for (const sz of [-1, 1]) {
        const p = new THREE.Mesh(pil, brass);
        p.position.set(sx * (hx - 0.24), (BODY_TOP + PLINTH_TOP) / 2, sz * (hz - 0.24));
        p.castShadow = true;
        this.baseGroup.add(p);
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
    for (let s = 0; s < SLOT_COUNT; s++) {
      const c = socketCenter(s);
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(c.x, SOCKET_FLOOR, c.z);
      floor.receiveShadow = true;
      this.baseGroup.add(floor);
      const lip = new THREE.Mesh(lipGeo, brass);
      lip.rotation.x = -Math.PI / 2;
      lip.position.set(c.x, LID_TOP - 0.005, c.z);
      lip.castShadow = true;
      lip.receiveShadow = true;
      this.baseGroup.add(lip);
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
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + 0.5;
      const prong = new THREE.Mesh(track(new THREE.CylinderGeometry(0.018, 0.025, 0.36, 6)), brass);
      prong.position.set(Math.cos(a) * 0.17, LID_TOP + 0.22, Math.sin(a) * 0.17);
      prong.rotation.z = Math.cos(a) * 0.35;
      prong.rotation.x = -Math.sin(a) * 0.35;
      this.baseGroup.add(prong);
    }
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

    // --- return aperture beyond the far rim
    // beyond the far-left rim, angled toward the viewer so it reads clearly
    this.apertureGroup.position.set(-10.2, 0, -7.6);
    this.apertureGroup.rotation.y = 0.55;
    const pedestal = new THREE.Mesh(track(new RoundedBoxGeometry(2.6, 0.5, 1.2, 3, 0.1)), darkBrass);
    pedestal.position.y = -0.15;
    this.apertureGroup.add(pedestal);
    const ring = new THREE.Mesh(track(new THREE.TorusGeometry(1.55, 0.13, 16, 96)), brass);
    ring.position.y = 1.85;
    this.apertureGroup.add(ring);
    const inner = new THREE.Mesh(track(new THREE.TorusGeometry(1.3, 0.04, 8, 96)), darkBrass);
    inner.position.y = 1.85;
    this.apertureGroup.add(inner);
    const segGeo = track(new THREE.BoxGeometry(0.34, 0.12, 0.16));
    for (let i = 0; i < TRIAL_COUNT; i++) {
      const a = Math.PI / 2 + ((i + 0.5) / TRIAL_COUNT - 0.5) * Math.PI * 1.7;
      const m = track(new THREE.MeshStandardMaterial({ color: 0x1a2030, emissive: 0x69dad0, emissiveIntensity: 0, roughness: 0.4, metalness: 0.3 }));
      const seg = new THREE.Mesh(segGeo, m);
      seg.position.set(Math.cos(a) * 1.78, 1.85 + Math.sin(a) * 1.78, 0.02);
      seg.rotation.z = a + Math.PI / 2;
      this.apertureGroup.add(seg);
      this.apertureSegments.push(m);
    }
    // iris leaves that slide open on victory
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.absarc(0, 0, 1.32, 0, Math.PI / 3 + 0.05, false);
    leafShape.lineTo(0, 0);
    const leafGeo = track(new THREE.ShapeGeometry(leafShape, 16));
    const leafMat = track(new THREE.MeshStandardMaterial({ color: 0x24324f, metalness: 0.6, roughness: 0.35, side: THREE.DoubleSide }));
    for (let i = 0; i < 6; i++) {
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(0, 1.85, 0.01);
      leaf.rotation.z = (i / 6) * Math.PI * 2;
      this.apertureGroup.add(leaf);
      this.apertureIris.push(leaf);
    }
    this.apertureCoreMat = track(new THREE.MeshBasicMaterial({ color: new THREE.Color(0x69dad0).multiplyScalar(2.4), transparent: true, opacity: 0.0, depthWrite: false }));
    this.apertureCore = new THREE.Mesh(track(new THREE.CircleGeometry(1.3, 48)), this.apertureCoreMat);
    this.apertureCore.position.set(0, 1.85, -0.02);
    this.apertureGroup.add(this.apertureCore);
    this.root.add(this.apertureGroup);
  }

  /** Points used to fit the combat camera. */
  combatFitPoints(): THREE.Vector3[] {
    // every spawn approach (ring + enemy height) and the Base; the ornamental rim may bleed off-edge
    const pts: THREE.Vector3[] = [];
    const R = ARENA.spawnRadius + 0.7;
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R), new THREE.Vector3(Math.cos(a) * R, 1.3, Math.sin(a) * R));
    }
    return pts;
  }

  setProgress(trialsCleared: number): void {
    this.progress = trialsCleared;
  }

  openAperture(open: boolean): void {
    this.apertureOpenTarget = open ? 1 : 0;
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
    this.apertureOpen = 0;
    this.apertureOpenTarget = 0;
    this.progress = 0;
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
      s.haloMat.color.copy(s.haloColor);
    }

    this.apertureSegments.forEach((m, i) => {
      const lit = i < this.progress ? 1 : 0;
      const target = lit * (1.4 + 0.3 * Math.sin(time * 2 + i)) + this.apertureOpen * 1.5;
      m.emissiveIntensity += (target - m.emissiveIntensity) * (1 - Math.exp(-presentDt * 4));
    });
    this.apertureOpen += (this.apertureOpenTarget - this.apertureOpen) * (1 - Math.exp(-presentDt * 1.6));
    this.apertureIris.forEach((leaf, i) => {
      const a = (i / 6) * Math.PI * 2;
      const r = this.apertureOpen * 1.25;
      leaf.position.set(Math.cos(a + 0.5) * r, 1.85 + Math.sin(a + 0.5) * r, 0.01);
      leaf.scale.setScalar(1 - this.apertureOpen * 0.75);
    });
    this.apertureCoreMat.opacity = 0.15 + this.apertureOpen * 0.85;
  }

  dispose(): void {
    for (const d of this.disposables) d.dispose();
    this.disposables.length = 0;
  }
}
