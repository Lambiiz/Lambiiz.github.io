// The physical hand: a fanned row of 3D cards drawn in its own overlay pass (separate scene and
// pixel-space camera, depth cleared) so world objects can never cover it. Also draws the draw and
// discard piles and the 1-of-3 sacrifice offers. Presentation only; the controller owns the rules.
import * as THREE from 'three';
import type { CardId, CardInstance } from '../game/types';
import { createChargeMaterial, type ChargeUniforms } from './chargeMaterial';
import type { CardAssets } from './cardAssets';
import { CARD_H, CARD_T, CARD_W } from './layout';

type Mode = 'hand' | 'drag' | 'leaving' | 'offer';
type Leave = 'discard' | 'play' | 'tower' | 'burn';

interface HandCard {
  key: string;
  uid: number; // -1 for offers
  offerIndex: number | null;
  defId: CardId;
  group: THREE.Group;
  body: THREE.Mesh;
  overlayMat: THREE.ShaderMaterial & { uniforms: ChargeUniforms };
  mode: Mode;
  leave: Leave | null;
  leaveTo: THREE.Vector2;
  life: number;
  delay: number;
  pos: THREE.Vector2;
  vel: THREE.Vector2;
  target: THREE.Vector2;
  rot: number;
  rotTarget: number;
  scale: number;
  scaleTarget: number;
  z: number;
  /** resting (un-hovered) centre x and top edge, screen px, for flicker-free picking */
  restX: number;
  restTop: number;
  select: number;
  selectTarget: number;
  selectColor: THREE.Color;
  shade: number;
  shadeTarget: number;
}

export interface HandVisualState {
  hand: CardInstance[];
  marked: Set<number>;
  selected: number | null;
  affordable: (uid: number) => boolean;
  interactive: boolean; // during a turn
}

const C_HOVER = new THREE.Color(0xf2d79a);
const C_SELECT = new THREE.Color(0x69dad0);
const C_MARK = new THREE.Color(0xe0543f);

export class HandView {
  readonly scene = new THREE.Scene();
  readonly camera: THREE.OrthographicCamera;
  private cards = new Map<string, HandCard>();
  private w = 1;
  private h = 1;
  private pointer = new THREE.Vector2(-1, -1);
  private hoverKey: string | null = null;
  private dragKey: string | null = null;
  private grab = new THREE.Vector2();
  private raise = 0;
  private raiseTarget = 0;
  private raycaster = new THREE.Raycaster();
  private drawPile = new THREE.Group();
  private discardPile = new THREE.Group();
  private drawCount = 0;
  private discardCount = 0;
  private pileMeshes: THREE.Mesh[] = [];

  constructor(private assets: CardAssets) {
    this.camera = new THREE.OrthographicCamera(0, 1, 1, 0, -2000, 2000);
    this.camera.position.set(0, 0, 1000);
    this.scene.add(new THREE.AmbientLight(0xfff0dc, 1.4));
    const key = new THREE.DirectionalLight(0xffe2b8, 1.8);
    key.position.set(-0.4, 0.6, 1);
    this.scene.add(key);
    for (const pile of [this.drawPile, this.discardPile]) {
      for (let i = 0; i < 4; i++) {
        const m = new THREE.Mesh(this.assets.bodyGeo, [this.assets.backMat, this.assets.backMat]);
        m.position.set(i * 0.05, i * 0.07, -i * 0.1);
        pile.add(m);
        this.pileMeshes.push(m);
      }
      this.scene.add(pile);
    }
  }

  get cardHeight(): number {
    return THREE.MathUtils.clamp(this.h * 0.23, 120, 250);
  }

  get cardWidth(): number {
    return this.cardHeight * (CARD_W / CARD_H);
  }

  /** Screen-space (CSS px, y down) top edge of the raised hand, used to tell "dropped on the board". */
  get handTopY(): number {
    return this.h - this.cardHeight * 1.15;
  }

  resize(w: number, h: number): void {
    this.w = w;
    this.h = h;
    this.camera.left = 0;
    this.camera.right = w;
    this.camera.top = h;
    this.camera.bottom = 0;
    this.camera.updateProjectionMatrix();
  }

  private toWorld(px: number, py: number): THREE.Vector2 {
    return new THREE.Vector2(px, this.h - py);
  }

  drawPileScreen(): { x: number; y: number } {
    return { x: this.cardWidth * 0.7 + 18, y: this.h - this.cardHeight * 0.42 };
  }

  discardPileScreen(): { x: number; y: number } {
    return { x: this.w - this.cardWidth * 0.7 - 18, y: this.h - this.cardHeight * 0.42 };
  }

  setPiles(draw: number, discard: number): void {
    this.drawCount = draw;
    this.discardCount = discard;
  }

  private makeCard(key: string, defId: CardId, uid: number): HandCard {
    const group = new THREE.Group();
    const body = new THREE.Mesh(this.assets.bodyGeo, this.assets.edge(defId));
    const face = new THREE.Mesh(this.assets.faceGeo, this.assets.face(defId));
    face.position.z = CARD_T / 2 + 0.013;
    const overlayMat = createChargeMaterial(CARD_W - 0.02, CARD_H - 0.02);
    overlayMat.depthTest = false;
    const overlay = new THREE.Mesh(this.assets.faceGeo, overlayMat);
    overlay.position.z = CARD_T / 2 + 0.03;
    body.userData.handKey = key;
    face.userData.handKey = key;
    group.add(body, face, overlay);
    this.scene.add(group);
    const start = this.toWorld(this.drawPileScreen().x, this.drawPileScreen().y);
    const c: HandCard = {
      key,
      uid,
      offerIndex: null,
      defId,
      group,
      body,
      overlayMat,
      mode: 'hand',
      leave: null,
      leaveTo: new THREE.Vector2(),
      life: 0,
      delay: 0,
      pos: start.clone(),
      vel: new THREE.Vector2(),
      target: start.clone(),
      rot: 0,
      rotTarget: 0,
      scale: 0.5,
      scaleTarget: 1,
      z: 0,
      restX: -1e6,
      restTop: 1e6,
      select: 0,
      selectTarget: 0,
      selectColor: C_HOVER.clone(),
      shade: 0,
      shadeTarget: 0,
    };
    this.cards.set(key, c);
    return c;
  }

  private remove(c: HandCard): void {
    this.scene.remove(c.group);
    c.overlayMat.dispose();
    this.cards.delete(c.key);
    if (this.hoverKey === c.key) this.hoverKey = null;
    if (this.dragKey === c.key) this.dragKey = null;
  }

  /** Reconcile with the controller's hand. New cards fly in from the draw pile (staggered). */
  sync(s: HandVisualState): void {
    let newcomers = 0;
    for (const inst of s.hand) {
      const key = `h${inst.uid}`;
      let c = this.cards.get(key);
      if (!c) {
        c = this.makeCard(key, inst.defId, inst.uid);
        c.delay = newcomers++ * 0.09;
      }
      if (c.mode === 'leaving') continue;
      const marked = s.marked.has(inst.uid);
      const selected = s.selected === inst.uid;
      const hovered = this.hoverKey === key && s.interactive;
      c.selectTarget = marked || selected ? 1 : hovered ? 0.7 : 0;
      c.selectColor.copy(marked ? C_MARK : selected ? C_SELECT : C_HOVER);
      c.shadeTarget = s.interactive && !s.affordable(inst.uid) ? 0.45 : 0;
    }
    // cards that vanished from the hand without an explicit animation simply discard
    for (const c of this.cards.values()) {
      if (c.mode === 'hand' && !s.hand.some((x) => `h${x.uid}` === c.key)) this.leave(c, 'discard');
    }
  }

  private leave(c: HandCard, kind: Leave, to?: { x: number; y: number }): void {
    c.mode = 'leaving';
    c.leave = kind;
    c.life = 0;
    const dest =
      kind === 'discard' ? this.discardPileScreen() : kind === 'play' ? { x: c.pos.x, y: this.h * 0.42 } : kind === 'tower' && to ? to : { x: c.pos.x, y: this.h - c.pos.y };
    c.leaveTo.copy(this.toWorld(dest.x, dest.y));
    if (kind === 'burn') {
      c.selectColor.copy(C_MARK);
      c.selectTarget = 1;
    }
  }

  /** Explicit leave animations driven by controller events. */
  animateLeave(uid: number, kind: Leave, to?: { x: number; y: number }): void {
    const c = this.cards.get(`h${uid}`);
    if (c && c.mode !== 'leaving') this.leave(c, kind, to);
  }

  /** Show (or clear with null) the three sacrifice offers in the middle of the screen. */
  showOffers(ids: CardId[] | null): void {
    for (const c of [...this.cards.values()]) if (c.mode === 'offer') this.remove(c);
    if (!ids) return;
    ids.forEach((id, i) => {
      const c = this.makeCard(`o${i}`, id, -1);
      c.mode = 'offer';
      c.offerIndex = i;
      c.pos.copy(this.toWorld(this.w / 2, this.h * 0.6));
      c.scale = 0.3;
      c.delay = i * 0.08;
    });
  }

  setPointer(x: number, y: number): void {
    this.pointer.set(x, y);
  }

  setRaised(raised: boolean): void {
    this.raiseTarget = raised ? 1 : 0;
  }

  /** Card under a screen point. */
  pick(x: number, y: number): { uid: number } | { offer: number } | null {
    const ndc = new THREE.Vector2((x / this.w) * 2 - 1, -(y / this.h) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const live = (c: HandCard) => this.raycaster.intersectObject(c.body, false).length > 0;
    for (const c of this.cards.values()) if (c.mode === 'offer' && live(c)) return { offer: c.offerIndex! };
    // the lifted card wins where it is actually drawn
    const hovered = this.hoverKey ? this.cards.get(this.hoverKey) : undefined;
    if (hovered && hovered.mode === 'hand' && live(hovered)) return { uid: hovered.uid };
    // otherwise pick by the resting fan layout: each card owns the slice between its neighbours'
    // midpoints, so lifting a card never moves its hit area and overlapping cards never flicker
    const fan = [...this.cards.values()].filter((c) => c.mode === 'hand' && c.key !== this.dragKey).sort((p, q) => p.restX - q.restX);
    for (let i = 0; i < fan.length; i++) {
      const c = fan[i];
      const left = i > 0 ? (fan[i - 1].restX + c.restX) / 2 : c.restX - this.cardWidth / 2;
      const right = i < fan.length - 1 ? (fan[i + 1].restX + c.restX) / 2 : c.restX + this.cardWidth / 2;
      if (x >= left && x < right && y >= c.restTop) return { uid: c.uid };
    }
    return null;
  }

  setHover(target: { uid: number } | { offer: number } | null): void {
    this.hoverKey = !target ? null : 'uid' in target ? `h${target.uid}` : `o${target.offer}`;
    for (const c of this.cards.values()) if (c.mode === 'offer') c.selectTarget = c.key === this.hoverKey ? 0.8 : 0;
  }

  startDrag(uid: number, x: number, y: number): void {
    const c = this.cards.get(`h${uid}`);
    if (!c || c.mode !== 'hand') return;
    this.dragKey = c.key;
    c.mode = 'drag';
    const p = this.toWorld(x, y);
    this.grab.set(c.pos.x - p.x, c.pos.y - p.y).multiplyScalar(0.5);
  }

  dragTo(x: number, y: number): void {
    const c = this.dragKey ? this.cards.get(this.dragKey) : undefined;
    if (!c) return;
    const p = this.toWorld(x, y);
    c.target.set(p.x + this.grab.x, p.y + this.grab.y);
  }

  endDrag(): void {
    const c = this.dragKey ? this.cards.get(this.dragKey) : undefined;
    if (c && c.mode === 'drag') c.mode = 'hand';
    this.dragKey = null;
  }

  get dragging(): boolean {
    return this.dragKey !== null;
  }

  /** Screen rect (CSS px) of a hand card, for tooltips. */
  cardRect(uid: number): { x: number; y: number; w: number; h: number } | null {
    const c = this.cards.get(`h${uid}`);
    if (!c) return null;
    const w = this.cardWidth * c.scale;
    const h = this.cardHeight * c.scale;
    return { x: c.pos.x - w / 2, y: this.h - c.pos.y - h / 2, w, h };
  }

  /** Screen centre of a hand card (for automation). */
  cardScreen(uid: number): { x: number; y: number } | null {
    const c = this.cards.get(`h${uid}`);
    return c ? { x: c.target.x, y: this.h - c.target.y } : null;
  }

  offerScreen(i: number): { x: number; y: number } | null {
    const c = this.cards.get(`o${i}`);
    return c ? { x: c.target.x, y: this.h - c.target.y } : null;
  }

  settled(): boolean {
    for (const c of this.cards.values()) {
      if (c.mode === 'leaving' || c.delay > 0) return false;
      if (c.pos.distanceTo(c.target) > 1.5 || c.vel.length() > 5) return false;
    }
    return true;
  }

  update(dt: number): void {
    dt = Math.min(dt, 0.1);
    this.raise += (this.raiseTarget - this.raise) * (1 - Math.exp(-dt * 10));
    const ch = this.cardHeight;
    const cw = this.cardWidth;
    const inHand = [...this.cards.values()].filter((c) => c.mode === 'hand' || c.mode === 'drag');
    const n = inHand.length;
    const spacing = Math.min(cw * 0.86, (this.w * 0.5 - cw) / Math.max(1, n - 1));
    const tuckedY = ch * 0.5 - ch * 0.64;
    const raisedY = ch * 0.5 + 10;
    const baseY = tuckedY + (raisedY - tuckedY) * this.raise;
    inHand.forEach((c, i) => {
      const o = i - (n - 1) / 2;
      const hovered = this.hoverKey === c.key;
      if (c.mode === 'drag') {
        c.scaleTarget = 0.82;
        c.rotTarget = 0;
        c.z = 400;
        return;
      }
      const lift = hovered ? ch * 0.3 * Math.max(this.raise, 0.6) + (1 - this.raise) * ch * 0.45 : c.select > 0.5 ? ch * 0.16 : 0;
      const restY = baseY - o * o * 3;
      c.restX = this.w / 2 + o * spacing;
      c.restTop = this.h - (restY + ch / 2);
      c.target.set(c.restX, restY + lift);
      c.rotTarget = hovered ? 0 : -o * 0.045;
      c.scaleTarget = hovered ? 1.16 : 1;
      c.z = i * 4 + (hovered ? 200 : 0);
    });
    // offers
    const offers = [...this.cards.values()].filter((c) => c.mode === 'offer');
    offers.forEach((c) => {
      const o = c.offerIndex! - 1;
      const hovered = this.hoverKey === c.key;
      c.target.copy(this.toWorld(this.w / 2 + o * cw * 1.75, this.h * 0.47 - (hovered ? 14 : 0)));
      c.scaleTarget = hovered ? 1.62 : 1.5;
      c.rotTarget = 0;
      c.z = 600 + c.offerIndex!;
    });

    const k = ch / CARD_H;
    for (const c of [...this.cards.values()]) {
      if (c.delay > 0) {
        c.delay -= dt;
        this.place(c, k);
        continue;
      }
      if (c.mode === 'leaving') {
        c.life += dt;
        const dur = c.leave === 'burn' ? 0.5 : c.leave === 'tower' ? 0.35 : 0.42;
        const t = Math.min(1, c.life / dur);
        c.target.copy(c.leaveTo);
        c.scaleTarget = c.leave === 'discard' ? 0.5 : c.leave === 'burn' ? 1 - t : 1 - t * 0.9;
        c.rotTarget = c.leave === 'burn' ? 0.2 * t : 0;
        if (t >= 1) {
          this.remove(c);
          continue;
        }
      }
      const stiff = c.mode === 'drag' ? 900 : 260;
      const damp = c.mode === 'drag' ? 55 : 28;
      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const hs = dt / steps;
      for (let s = 0; s < steps; s++) {
        c.vel.x += (-(c.pos.x - c.target.x) * stiff - c.vel.x * damp) * hs;
        c.vel.y += (-(c.pos.y - c.target.y) * stiff - c.vel.y * damp) * hs;
        c.pos.addScaledVector(c.vel, hs);
      }
      const e = 1 - Math.exp(-dt * 14);
      c.rot += (c.rotTarget - c.rot) * e;
      c.scale += (c.scaleTarget - c.scale) * e;
      c.select += (c.selectTarget - c.select) * e;
      c.shade += (c.shadeTarget - c.shade) * e;
      this.place(c, k);
    }

    // piles
    const dp = this.toWorld(this.drawPileScreen().x, this.drawPileScreen().y);
    const xp = this.toWorld(this.discardPileScreen().x, this.discardPileScreen().y);
    this.drawPile.position.set(dp.x, dp.y, -50);
    this.discardPile.position.set(xp.x, xp.y, -50);
    for (const [pile, count] of [
      [this.drawPile, this.drawCount],
      [this.discardPile, this.discardCount],
    ] as const) {
      pile.scale.setScalar(k * 0.62);
      pile.rotation.set(0.25, 0, pile === this.drawPile ? 0.05 : -0.05);
      pile.children.forEach((m, i) => (m.visible = i < Math.min(4, Math.ceil(count / 2))));
    }
  }

  private place(c: HandCard, k: number): void {
    c.group.position.set(c.pos.x, c.pos.y, c.z);
    c.group.rotation.set(0.12, 0, c.rot);
    c.group.scale.setScalar(k * c.scale);
    const u = c.overlayMat.uniforms;
    u.uSelect.value = c.select;
    u.uSelectColor.value.copy(c.selectColor);
    u.uShade.value = c.shade;
    u.uCharge.value = 0;
  }

  reset(): void {
    for (const c of [...this.cards.values()]) this.remove(c);
    this.hoverKey = null;
    this.dragKey = null;
  }

  liveCount(): number {
    return this.cards.size;
  }

  dispose(): void {
    this.reset();
    void this.pileMeshes;
  }
}
