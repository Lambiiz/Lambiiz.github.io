// Socketed tower cards on the Base: beveled bodies with engraved faces, a per-card charge overlay,
// spring-driven seating, fire recoil and discard. Hand cards live in hand.ts (overlay pass).
import * as THREE from 'three';
import type { WeaponId, WeaponInstance } from '../game/types';
import { createChargeMaterial, type ChargeUniforms } from './chargeMaterial';
import type { CardAssets } from './cardAssets';
import { CARD_H, CARD_SEAT_Y, CARD_T, CARD_W, socketCenter } from './layout';

export interface SocketCard {
  key: string;
  defId: WeaponId;
  instanceId: number;
  slot: number;
  group: THREE.Group;
  body: THREE.Mesh;
  overlayMat: THREE.ShaderMaterial & { uniforms: ChargeUniforms };
  mode: 'socket' | 'discard';
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  target: THREE.Vector3;
  select: number;
  selectTarget: number;
  lastFireAt: number;
  life: number;
  landed: boolean;
  onLand?: () => void;
}

const Q_FLAT = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));

export class CardsView {
  readonly root = new THREE.Group();
  readonly cards = new Map<string, SocketCard>();
  private dimLevel = 1;

  constructor(private assets: CardAssets) {}

  private create(w: WeaponInstance): SocketCard {
    const key = `w${w.id}`;
    const group = new THREE.Group();
    const body = new THREE.Mesh(this.assets.bodyGeo, this.assets.edge(w.defId));
    body.castShadow = true;
    body.receiveShadow = true;
    const face = new THREE.Mesh(this.assets.faceGeo, this.assets.face(w.defId));
    face.position.z = CARD_T / 2 + 0.013;
    face.receiveShadow = true;
    const overlayMat = createChargeMaterial(CARD_W - 0.02, CARD_H - 0.02);
    const overlay = new THREE.Mesh(this.assets.faceGeo, overlayMat);
    overlay.position.z = CARD_T / 2 + 0.018;
    overlay.renderOrder = 2;
    const contact = new THREE.Mesh(this.assets.shadowGeo, this.assets.shadowMat);
    contact.position.z = -CARD_T / 2 - 0.004;
    contact.renderOrder = 1;
    group.add(contact, body, face, overlay);
    body.userData.cardKey = key;
    face.userData.cardKey = key;
    group.quaternion.copy(Q_FLAT);
    this.root.add(group);
    const c: SocketCard = {
      key,
      defId: w.defId,
      instanceId: w.id,
      slot: w.slot,
      group,
      body,
      overlayMat,
      mode: 'socket',
      pos: new THREE.Vector3(),
      vel: new THREE.Vector3(),
      target: new THREE.Vector3(),
      select: 0,
      selectTarget: 0,
      lastFireAt: -100,
      life: 0,
      landed: true,
    };
    this.cards.set(key, c);
    return c;
  }

  private destroy(c: SocketCard): void {
    this.root.remove(c.group);
    c.overlayMat.dispose(); // per-card material only; shared assets are retained
    this.cards.delete(c.key);
  }

  socketTarget(slot: number): THREE.Vector3 {
    const c = socketCenter(slot);
    return new THREE.Vector3(c.x, CARD_SEAT_Y, c.z);
  }

  /**
   * Ensure every placed tower has a socketed card; replaced towers fly off and dissolve.
   * New cards drop in from above unless `snap`.
   */
  syncEquipped(slots: (WeaponInstance | null)[], snap = false, onLand?: (slot: number) => void): void {
    const live = new Set<number>();
    for (const w of slots) {
      if (!w) continue;
      live.add(w.id);
      let c = this.cards.get(`w${w.id}`);
      if (!c) {
        c = this.create(w);
        c.pos.copy(this.socketTarget(w.slot));
        if (!snap) {
          c.pos.y += 3.2;
          c.landed = false;
          const slot = w.slot;
          c.onLand = () => onLand?.(slot);
        }
      }
      if (c.mode === 'socket') {
        c.slot = w.slot;
        c.target.copy(this.socketTarget(w.slot));
      }
    }
    for (const c of [...this.cards.values()]) {
      if (!live.has(c.instanceId) && c.mode === 'socket') {
        c.mode = 'discard';
        c.life = 0;
        c.target.set(c.pos.x, c.pos.y + 2.4, c.pos.z - 0.6);
      }
    }
  }

  equippedView(instanceId: number): SocketCard | undefined {
    return this.cards.get(`w${instanceId}`);
  }

  /** Real fire event: bounded release pulse and recoil. Charge continues from authority. */
  onFire(instanceId: number, simTime: number): void {
    const c = this.equippedView(instanceId);
    if (c) c.lastFireAt = simTime;
  }

  setHover(key: string | null): void {
    for (const c of this.cards.values()) c.selectTarget = c.key === key ? 0.8 : 0;
  }

  setDim(level: number): void {
    this.dimLevel = level;
  }

  pickables(): THREE.Object3D[] {
    const out: THREE.Object3D[] = [];
    for (const c of this.cards.values()) if (c.mode === 'socket') out.push(c.body);
    return out;
  }

  cardByObject(o: THREE.Object3D): SocketCard | undefined {
    const key = o.userData.cardKey as string | undefined;
    return key ? this.cards.get(key) : undefined;
  }

  /**
   * @param presentDt presentation seconds (seating animates even while combat is frozen)
   * @param simTime interpolated simulation time (charge visuals and fire pulses)
   */
  update(presentDt: number, simTime: number, charge: Map<number, number>): void {
    const dt = Math.min(presentDt, 0.1);
    for (const c of [...this.cards.values()]) {
      const stiffness = c.mode === 'discard' ? 60 : 330;
      const damping = c.mode === 'discard' ? 10 : 23;
      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const h = dt / steps;
      for (let s = 0; s < steps; s++) {
        c.vel.x += (-(c.pos.x - c.target.x) * stiffness - c.vel.x * damping) * h;
        c.vel.y += (-(c.pos.y - c.target.y) * stiffness - c.vel.y * damping) * h;
        c.vel.z += (-(c.pos.z - c.target.z) * stiffness - c.vel.z * damping) * h;
        c.pos.addScaledVector(c.vel, h);
      }
      c.select += (c.selectTarget - c.select) * (1 - Math.exp(-dt * 14));
      const fireAge = simTime - c.lastFireAt;
      const pulse = fireAge >= 0 && fireAge < 0.3 ? 1 - fireAge / 0.3 : 0;
      const recoil = fireAge >= 0 && fireAge < 0.22 ? Math.sin((fireAge / 0.22) * Math.PI) : 0;
      c.group.position.copy(c.pos);
      c.group.position.y -= recoil * 0.035;
      c.group.quaternion.copy(Q_FLAT);
      if (recoil > 0) c.group.quaternion.multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-recoil * 0.05, 0, 0)));
      const u = c.overlayMat.uniforms;
      u.uTime.value = simTime;
      u.uSelect.value = c.select;
      u.uDim.value = this.dimLevel;
      u.uCharge.value = c.mode === 'socket' ? charge.get(c.instanceId) ?? 0 : 0;
      u.uPulse.value = c.mode === 'socket' ? pulse : 0;
      if (c.mode === 'socket' && !c.landed && c.pos.distanceTo(c.target) < 0.05) {
        c.landed = true;
        c.onLand?.();
        c.onLand = undefined;
      }
      if (c.mode === 'discard') {
        c.life += dt;
        const t = Math.min(1, c.life / 0.45);
        c.group.scale.setScalar(1 - t * t);
        if (t >= 1) this.destroy(c);
      }
    }
  }

  reset(): void {
    for (const c of [...this.cards.values()]) this.destroy(c);
  }

  liveCount(): number {
    return this.cards.size;
  }

  dispose(): void {
    this.reset();
  }
}
