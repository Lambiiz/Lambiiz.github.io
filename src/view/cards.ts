// Physical card views: beveled bodies with engraved faces, per-card charge overlays,
// spring-driven placement, the draft tray, drag, discard and boon dissolution.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { cardDef } from '../game/content';
import type { CardId, WeaponInstance } from '../game/types';
import * as art from './art';
import { createChargeMaterial, type ChargeUniforms } from './chargeMaterial';
import { CARD_H, CARD_SEAT_Y, CARD_T, CARD_W, EMITTER_POS, LID_TOP, socketCenter, STACK_POS, TRAY } from './layout';

type CardMode = 'socket' | 'tray' | 'drag' | 'returning' | 'discard' | 'consume';

export interface CardView {
  key: string;
  defId: CardId;
  group: THREE.Group;
  body: THREE.Mesh;
  overlay: THREE.Mesh;
  overlayMat: THREE.ShaderMaterial & { uniforms: ChargeUniforms };
  mode: CardMode;
  instanceId: number | null;
  offerIndex: number | null;
  slot: number | null;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  target: THREE.Vector3;
  quat: THREE.Quaternion;
  targetQuat: THREE.Quaternion;
  scale: number;
  targetScale: number;
  stiffness: number;
  damping: number;
  hover: number;
  hoverTarget: number;
  select: number;
  selectTarget: number;
  lastFireAt: number;
  life: number; // for discard/consume dissolve, presentation seconds
  delay: number;
  landed: boolean;
  onLand?: () => void;
}

const Q_FLAT = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
const Q_TRAY = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2 - TRAY.tilt, 0, 0));
const DRAG_Y = LID_TOP + 0.85;

function roundedRect(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
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

function remapUv(geo: THREE.BufferGeometry, w: number, h: number): void {
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) + w / 2) / w, (uv.getY(i) + h / 2) / h);
}

export class CardsView {
  readonly root = new THREE.Group();
  readonly cards = new Map<string, CardView>();
  private faceMats = new Map<CardId, THREE.MeshStandardMaterial>();
  private faceTextures = new Map<CardId, THREE.Texture>();
  private bodyGeo: THREE.ExtrudeGeometry;
  private faceGeo: THREE.ShapeGeometry;
  private edgeMat: THREE.MeshStandardMaterial;
  private shadowGeo: THREE.PlaneGeometry;
  private shadowMat: THREE.MeshBasicMaterial;
  private renderer: THREE.WebGLRenderer;
  private dimLevel = 1;
  private shared: { dispose(): void }[] = [];
  /** Raised near-edge tray rail that the offered cards rest on during drafts. */
  private rail: THREE.Group;
  private railLevel = 0;
  private railTarget = 0;

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
    const shape = roundedRect(CARD_W, CARD_H, 0.16);
    this.bodyGeo = new THREE.ExtrudeGeometry(shape, { depth: CARD_T, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.018, bevelSegments: 2, curveSegments: 8 });
    this.bodyGeo.translate(0, 0, -CARD_T / 2);
    this.faceGeo = new THREE.ShapeGeometry(roundedRect(CARD_W - 0.02, CARD_H - 0.02, 0.15), 8);
    remapUv(this.faceGeo, CARD_W - 0.02, CARD_H - 0.02);
    const edgeTex = art.colorTexture(art.drawCardEdge(), renderer);
    this.edgeMat = new THREE.MeshStandardMaterial({ map: edgeTex, color: 0xffffff, roughness: 0.55, metalness: 0.35 });
    this.shadowGeo = new THREE.PlaneGeometry(CARD_W * 1.25, CARD_H * 1.2);
    const shTex = art.colorTexture(art.drawRadial('rgba(0,0,0,0.55)', 'rgba(0,0,0,0)', 128), renderer);
    this.shadowMat = new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false });
    this.shared.push(this.bodyGeo, this.faceGeo, this.edgeMat, edgeTex, this.shadowGeo, this.shadowMat, shTex);

    const railBrass = new THREE.MeshStandardMaterial({ color: 0xc8ab70, metalness: 0.85, roughness: 0.36 });
    const railEnamel = new THREE.MeshStandardMaterial({ color: 0x1a2846, metalness: 0.1, roughness: 0.3 });
    const railGeo = new RoundedBoxGeometry(TRAY.spacing * 3 + 0.6, 0.18, 0.55, 3, 0.07);
    const inlayGeo = new RoundedBoxGeometry(TRAY.spacing * 3 + 0.2, 0.04, 0.22, 2, 0.02);
    this.rail = new THREE.Group();
    const railMesh = new THREE.Mesh(railGeo, railBrass);
    railMesh.castShadow = true;
    const inlay = new THREE.Mesh(inlayGeo, railEnamel);
    inlay.position.y = 0.09;
    this.rail.add(railMesh, inlay);
    const h = (CARD_H * TRAY.scale) / 2;
    this.rail.position.set(0, -1, TRAY.z + h * Math.cos(TRAY.tilt) + 0.1);
    this.rail.visible = false;
    this.root.add(this.rail);
    this.shared.push(railBrass, railEnamel, railGeo, inlayGeo);
  }

  /** Raise or lower the draft tray rail (presentation only). */
  setTray(active: boolean): void {
    this.railTarget = active ? 1 : 0;
  }

  /** Face material per definition, generated and cached once (fonts must already be loaded). */
  private faceMaterial(id: CardId): THREE.MeshStandardMaterial {
    let m = this.faceMats.get(id);
    if (!m) {
      const tex = art.colorTexture(art.drawCardFace(id), this.renderer);
      this.faceTextures.set(id, tex);
      m = new THREE.MeshStandardMaterial({ map: tex, color: 0xd9d2c4, roughness: 0.72, metalness: 0.0 });
      this.faceMats.set(id, m);
    }
    return m;
  }

  /** Warm the texture cache (call after fonts load). */
  prepare(ids: CardId[]): void {
    for (const id of ids) this.faceMaterial(id);
  }

  private create(key: string, defId: CardId): CardView {
    const group = new THREE.Group();
    const body = new THREE.Mesh(this.bodyGeo, this.edgeMat);
    body.castShadow = true;
    body.receiveShadow = true;
    const face = new THREE.Mesh(this.faceGeo, this.faceMaterial(defId));
    face.position.z = CARD_T / 2 + 0.013;
    face.receiveShadow = true;
    const overlayMat = createChargeMaterial(CARD_W - 0.02, CARD_H - 0.02);
    const overlay = new THREE.Mesh(this.faceGeo, overlayMat);
    overlay.position.z = CARD_T / 2 + 0.018;
    overlay.renderOrder = 2;
    const contact = new THREE.Mesh(this.shadowGeo, this.shadowMat);
    contact.position.z = -CARD_T / 2 - 0.004;
    contact.renderOrder = 1;
    group.add(contact, body, face, overlay);
    body.userData.cardKey = key;
    face.userData.cardKey = key;
    this.root.add(group);
    const v: CardView = {
      key,
      defId,
      group,
      body,
      overlay,
      overlayMat,
      mode: 'tray',
      instanceId: null,
      offerIndex: null,
      slot: null,
      pos: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      target: new THREE.Vector3(),
      quat: Q_FLAT.clone(),
      targetQuat: Q_FLAT.clone(),
      scale: 1,
      targetScale: 1,
      stiffness: 300,
      damping: 24,
      hover: 0,
      hoverTarget: 0,
      select: 0,
      selectTarget: 0,
      lastFireAt: -100,
      life: 0,
      delay: 0,
      landed: true,
    };
    this.cards.set(key, v);
    return v;
  }

  private destroy(v: CardView): void {
    this.root.remove(v.group);
    v.overlayMat.dispose(); // per-card material only; shared geometry/textures are retained
    this.cards.delete(v.key);
  }

  private socketTarget(slot: number): THREE.Vector3 {
    const c = socketCenter(slot);
    return new THREE.Vector3(c.x, CARD_SEAT_Y, c.z);
  }

  private trayTarget(i: number): THREE.Vector3 {
    return new THREE.Vector3((i - 1) * TRAY.spacing, TRAY.y, TRAY.z);
  }

  /** Ensure every owned weapon instance has a socketed card; discard cards whose instance is gone. */
  syncEquipped(slots: (WeaponInstance | null)[], snap = false): void {
    const live = new Set<number>();
    for (const w of slots) {
      if (!w) continue;
      live.add(w.id);
      const key = `w${w.id}`;
      let v = this.cards.get(key);
      if (!v) {
        v = this.create(key, w.defId);
        v.instanceId = w.id;
        v.slot = w.slot;
        v.mode = 'socket';
        v.pos.copy(this.socketTarget(w.slot));
        if (!snap) v.pos.y += 1.2;
      }
      if (v.mode === 'socket') {
        v.slot = w.slot;
        v.target.copy(this.socketTarget(w.slot));
        v.targetQuat.copy(Q_FLAT);
        v.targetScale = 1;
      }
    }
    for (const v of [...this.cards.values()]) {
      if (v.instanceId !== null && !live.has(v.instanceId) && v.mode === 'socket') this.discard(v);
    }
  }

  private discard(v: CardView): void {
    v.mode = 'discard';
    v.life = 0;
    v.target.set(v.pos.x, v.pos.y + 2.2, v.pos.z - 0.6);
    v.stiffness = 60;
    v.damping = 10;
  }

  presentOffer(offer: CardId[]): void {
    this.clearOffers(true);
    offer.forEach((id, i) => {
      const v = this.create(`o${i}`, id);
      v.offerIndex = i;
      v.mode = 'tray';
      v.pos.set(STACK_POS.x, STACK_POS.y + 0.3 + i * 0.05, STACK_POS.z);
      v.quat.copy(Q_FLAT);
      v.scale = 0.72;
      v.delay = 0.12 + i * 0.11;
      v.stiffness = 140;
      v.damping = 19;
      this.toTray(v);
    });
  }

  private toTray(v: CardView): void {
    v.mode = 'tray';
    v.target.copy(this.trayTarget(v.offerIndex ?? 0));
    v.targetQuat.copy(Q_TRAY);
    v.targetScale = TRAY.scale;
    v.stiffness = 170;
    v.damping = 22;
  }

  offerView(i: number): CardView | undefined {
    return this.cards.get(`o${i}`);
  }

  equippedView(instanceId: number): CardView | undefined {
    return this.cards.get(`w${instanceId}`);
  }

  /** Return the dragged/selected card to its tray position. */
  returnOffer(i: number): void {
    const v = this.offerView(i);
    if (v && v.mode !== 'consume') this.toTray(v);
  }

  startDrag(i: number): void {
    const v = this.offerView(i);
    if (!v) return;
    v.mode = 'drag';
    v.targetScale = 1.0;
    v.targetQuat.copy(Q_FLAT);
    v.stiffness = 600;
    v.damping = 45;
  }

  dragTo(i: number, p: THREE.Vector3): void {
    const v = this.offerView(i);
    if (!v || v.mode !== 'drag') return;
    v.target.set(p.x, DRAG_Y, p.z);
    // lean slightly into the motion
    const dx = THREE.MathUtils.clamp((p.x - v.pos.x) * 0.25, -0.12, 0.12);
    const dz = THREE.MathUtils.clamp((p.z - v.pos.z) * 0.25, -0.12, 0.12);
    v.targetQuat.copy(Q_FLAT).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-dz, dx, 0)));
  }

  dragPlaneY(): number {
    return DRAG_Y;
  }

  /** Placement committed: the offer card becomes the instance's socketed card. */
  commitOffer(i: number, instance: WeaponInstance, onLand: () => void): void {
    const v = this.offerView(i);
    if (!v) return;
    this.cards.delete(v.key);
    v.key = `w${instance.id}`;
    v.body.userData.cardKey = v.key;
    this.cards.set(v.key, v);
    v.offerIndex = null;
    v.instanceId = instance.id;
    v.slot = instance.slot;
    v.mode = 'socket';
    v.landed = false;
    v.onLand = onLand;
    v.target.copy(this.socketTarget(instance.slot));
    v.targetQuat.copy(Q_FLAT);
    v.targetScale = 1;
    // underdamped spring: ~0.3 s settle with a restrained overshoot
    v.stiffness = 330;
    v.damping = 23;
    v.selectTarget = 0;
    this.dismissOffers();
  }

  consumeBoon(i: number): void {
    const v = this.offerView(i);
    if (!v) return;
    v.mode = 'consume';
    v.life = 0;
    v.target.set(EMITTER_POS.x, EMITTER_POS.y + 0.6, EMITTER_POS.z);
    v.targetQuat.copy(Q_FLAT);
    v.targetScale = 0.4;
    v.stiffness = 90;
    v.damping = 16;
    this.dismissOffers();
  }

  /** Unchosen offers glide back into the memory stack. */
  dismissOffers(): void {
    for (const v of this.cards.values()) {
      if (v.offerIndex !== null && v.mode !== 'consume' && v.mode !== 'drag') {
        v.mode = 'returning';
        v.life = 0;
        v.target.set(STACK_POS.x, STACK_POS.y + 0.3, STACK_POS.z);
        v.targetQuat.copy(Q_FLAT);
        v.targetScale = 0.7;
        v.stiffness = 110;
        v.damping = 18;
      }
    }
  }

  clearOffers(immediate = false): void {
    for (const v of [...this.cards.values()]) {
      if (v.offerIndex !== null || v.mode === 'returning' || v.mode === 'consume') {
        if (immediate) this.destroy(v);
        else this.dismissOffers();
      }
    }
  }

  setSelected(i: number | null): void {
    for (const v of this.cards.values()) {
      if (v.offerIndex !== null) v.selectTarget = v.offerIndex === i ? 1 : 0;
    }
  }

  setHover(key: string | null, lift: boolean): void {
    for (const v of this.cards.values()) {
      const on = v.key === key;
      v.hoverTarget = on && lift ? 1 : 0;
      if (v.offerIndex === null && v.mode === 'socket') v.selectTarget = on ? 0.7 : 0;
    }
  }

  /** Real fire event: bounded release pulse and recoil. Charge continues from authority. */
  onFire(instanceId: number, simTime: number): void {
    const v = this.equippedView(instanceId);
    if (v) v.lastFireAt = simTime;
  }

  setDim(level: number): void {
    this.dimLevel = level;
  }

  pickables(filter: 'offers' | 'equipped' | 'all'): THREE.Object3D[] {
    const out: THREE.Object3D[] = [];
    for (const v of this.cards.values()) {
      if (filter === 'offers' && (v.offerIndex === null || v.mode === 'drag')) continue;
      if (filter === 'equipped' && v.mode !== 'socket') continue;
      out.push(v.body);
    }
    return out;
  }

  cardByObject(o: THREE.Object3D): CardView | undefined {
    const key = o.userData.cardKey as string | undefined;
    return key ? this.cards.get(key) : undefined;
  }

  /**
   * @param presentDt presentation seconds (card motion animates even while combat is frozen)
   * @param simTime interpolated simulation time (charge visuals and fire pulses)
   * @param charge per-instance charge fraction from the simulation
   */
  update(presentDt: number, simTime: number, charge: Map<number, number>): void {
    const dt = Math.min(presentDt, 0.05);
    this.railLevel += (this.railTarget - this.railLevel) * (1 - Math.exp(-dt * 7));
    this.rail.visible = this.railLevel > 0.01;
    const h = (CARD_H * TRAY.scale) / 2;
    const railTop = TRAY.y - h * Math.sin(-TRAY.tilt) - 0.1;
    this.rail.position.y = -0.8 + (railTop + 0.8) * this.railLevel;
    for (const v of [...this.cards.values()]) {
      if (v.delay > 0) {
        v.delay -= dt;
        v.group.position.copy(v.pos);
        v.group.quaternion.copy(v.quat);
        v.group.scale.setScalar(v.scale);
        v.group.visible = true;
        continue;
      }
      // bounded spring integration in sub-steps for stability
      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const h = dt / steps;
      for (let s = 0; s < steps; s++) {
        v.vel.x += (-(v.pos.x - v.target.x) * v.stiffness - v.vel.x * v.damping) * h;
        v.vel.y += (-(v.pos.y - v.target.y) * v.stiffness - v.vel.y * v.damping) * h;
        v.vel.z += (-(v.pos.z - v.target.z) * v.stiffness - v.vel.z * v.damping) * h;
        v.pos.addScaledVector(v.vel, h);
      }
      const k = 1 - Math.exp(-dt * (v.mode === 'drag' ? 22 : 12));
      v.quat.slerp(v.targetQuat, k);
      v.scale += (v.targetScale - v.scale) * k;
      v.hover += (v.hoverTarget - v.hover) * (1 - Math.exp(-dt * 16));
      v.select += (v.selectTarget - v.select) * (1 - Math.exp(-dt * 14));

      // fire recoil (simulation-time, frozen with combat)
      const fireAge = simTime - v.lastFireAt;
      const pulse = fireAge >= 0 && fireAge < 0.3 ? 1 - fireAge / 0.3 : 0;
      const recoil = fireAge >= 0 && fireAge < 0.22 ? Math.sin((fireAge / 0.22) * Math.PI) : 0;

      v.group.position.copy(v.pos);
      v.group.position.y += v.hover * 0.15 - recoil * 0.035;
      v.group.quaternion.copy(v.quat);
      if (v.hover > 0.001) {
        // hover tilt ~5 degrees toward the viewer
        v.group.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(v.hover * 0.09, 0, v.hover * 0.02)));
      }
      if (recoil > 0) v.group.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-recoil * 0.05, 0, 0)));
      v.group.scale.setScalar(v.scale);

      const u = v.overlayMat.uniforms;
      u.uTime.value = simTime;
      u.uSelect.value = v.select;
      u.uDim.value = v.offerIndex !== null ? 1 : this.dimLevel;
      if (v.instanceId !== null && v.mode === 'socket') {
        u.uCharge.value = charge.get(v.instanceId) ?? 0;
        u.uPulse.value = pulse;
      } else {
        u.uCharge.value = 0;
        u.uPulse.value = 0;
      }

      if (v.mode === 'socket' && !v.landed && v.pos.distanceTo(v.target) < 0.04) {
        v.landed = true;
        v.onLand?.();
        v.onLand = undefined;
      }
      if (v.mode === 'discard' || v.mode === 'consume' || v.mode === 'returning') {
        v.life += dt;
        const dur = v.mode === 'returning' ? 0.5 : 0.45;
        const t = Math.min(1, v.life / dur);
        if (v.mode !== 'returning') v.group.scale.setScalar(v.scale * (1 - t * t));
        else if (t > 0.7) v.group.scale.setScalar(v.scale * (1 - (t - 0.7) / 0.3));
        if (t >= 1) this.destroy(v);
      }
    }
  }

  /** Cards that still own a sim instance; used by restart to reset everything. */
  reset(): void {
    for (const v of [...this.cards.values()]) this.destroy(v);
  }

  /** Development fixture: card objects for screenshot/debug positions. */
  socketWorld(slot: number): THREE.Vector3 {
    return this.socketTarget(slot);
  }

  trayWorld(i: number): THREE.Vector3 {
    const v = this.offerView(i);
    return v ? v.group.position.clone() : this.trayTarget(i);
  }

  liveCount(): number {
    return this.cards.size;
  }

  dispose(): void {
    this.reset();
    for (const m of this.faceMats.values()) m.dispose();
    for (const t of this.faceTextures.values()) t.dispose();
    this.faceMats.clear();
    this.faceTextures.clear();
    for (const s of this.shared) s.dispose();
  }

  static describe(id: CardId): string {
    return cardDef(id).name;
  }
}
