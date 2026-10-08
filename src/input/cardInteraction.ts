// Pointer interaction with physical cards and sockets: hover, click-select, drag with pointer
// capture, grab offset, click/drag threshold, and safe cancellation. Raycasts only explicit
// interaction objects (offer card bodies, equipped card bodies, socket hit planes).
import * as THREE from 'three';
import { isWeaponId } from '../game/content';
import type { PhaseController } from '../game/phases';
import type { CardId } from '../game/types';
import type { BoardView } from '../view/board';
import type { CardsView } from '../view/cards';
import type { SceneRig } from '../view/scene';

export interface InteractionActions {
  selectOffer(i: number): void;
  placeSlot(slot: number): 'committed' | 'confirm' | 'rejected';
  cancel(): void;
  hover(card: { id: CardId; charge: number | null; slot: number | null } | null): void;
  hoverSound(): void;
  pickSound(): void;
  returnSound(): void;
  rejected(reason: string): void;
}

const DRAG_THRESHOLD_PX = 6;

export class CardInteraction {
  private raycaster = new THREE.Raycaster();
  private ndc = new THREE.Vector2();
  private pointerId: number | null = null;
  private pressOffer: number | null = null;
  private pressX = 0;
  private pressY = 0;
  private dragging = false;
  private grabDX = 0;
  private grabDY = 0;
  private lastX = 0;
  private lastY = 0;
  private hoverKey: string | null = null;
  private hoverSlot: number | null = null;
  private dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private off: (() => void)[] = [];
  enabled = true;

  constructor(
    private canvas: HTMLCanvasElement,
    private rig: SceneRig,
    private board: BoardView,
    private cards: CardsView,
    private getController: () => PhaseController,
    private actions: InteractionActions,
  ) {
    const add = <K extends keyof HTMLElementEventMap>(t: K, fn: (e: HTMLElementEventMap[K]) => void) => {
      canvas.addEventListener(t, fn as EventListener);
      this.off.push(() => canvas.removeEventListener(t, fn as EventListener));
    };
    add('pointerdown', (e) => this.onDown(e));
    add('pointermove', (e) => this.onMove(e));
    add('pointerup', (e) => this.onUp(e));
    add('pointercancel', () => this.cancelDrag('pointercancel'));
    add('lostpointercapture', () => {
      if (this.dragging) this.cancelDrag('lostcapture');
    });
    add('pointerleave', () => {
      if (!this.dragging) this.setHover(null, null);
    });
  }

  get isDragging(): boolean {
    return this.dragging;
  }

  private setNdc(x: number, y: number): void {
    const r = this.canvas.getBoundingClientRect();
    this.ndc.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(this.ndc, this.rig.camera);
  }

  private pick(objects: THREE.Object3D[], x: number, y: number): THREE.Intersection | null {
    if (objects.length === 0) return null;
    this.setNdc(x, y);
    const hits = this.raycaster.intersectObjects(objects, false);
    return hits[0] ?? null;
  }

  private canDraft(): boolean {
    const c = this.getController();
    return this.enabled && !!c.draft && !c.suspended && (c.phase === 'DRAFT' || c.phase === 'PLACEMENT');
  }

  private offerAt(x: number, y: number): number | null {
    const hit = this.pick(this.cards.pickables('offers'), x, y);
    if (!hit) return null;
    const v = this.cards.cardByObject(hit.object);
    return v && v.offerIndex !== null ? v.offerIndex : null;
  }

  private socketAt(x: number, y: number): number | null {
    const hit = this.pick(
      this.board.sockets.map((s) => s.hit),
      x,
      y,
    );
    return hit ? (hit.object.userData.slot as number) : null;
  }

  private onDown(e: PointerEvent): void {
    if (e.button !== 0 || this.pointerId !== null) return;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    if (!this.canDraft()) return;
    const c = this.getController();
    const stage = c.draft!.stage;
    if (stage !== 'choosing' && stage !== 'placing' && stage !== 'boonSelected') return;
    const offer = this.offerAt(e.clientX, e.clientY);
    if (offer !== null) {
      this.pointerId = e.pointerId;
      this.pressOffer = offer;
      this.pressX = e.clientX;
      this.pressY = e.clientY;
      this.canvas.setPointerCapture(e.pointerId);
      e.preventDefault();
    }
  }

  private onMove(e: PointerEvent): void {
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    if (this.pointerId !== null && e.pointerId === this.pointerId && this.pressOffer !== null) {
      if (!this.dragging && Math.hypot(e.clientX - this.pressX, e.clientY - this.pressY) > DRAG_THRESHOLD_PX) this.beginDrag();
      if (this.dragging) this.updateDrag(e.clientX, e.clientY);
      return;
    }
    this.updateHover(e.clientX, e.clientY);
  }

  private beginDrag(): void {
    const i = this.pressOffer!;
    const c = this.getController();
    if (c.draft?.selected !== i || c.draft.stage === 'choosing') this.actions.selectOffer(i);
    if (c.draft?.selected !== i) {
      this.release();
      return;
    }
    const v = this.cards.offerView(i);
    if (!v) return;
    const sp = this.rig.project(v.group.position);
    const r = this.canvas.getBoundingClientRect();
    this.grabDX = this.pressX - (sp.x + r.left);
    this.grabDY = this.pressY - (sp.y + r.top);
    // keep the grab offset modest so the card stays under the pointer as it shrinks to socket size
    this.grabDX *= 0.5;
    this.grabDY *= 0.5;
    this.dragging = true;
    this.cards.startDrag(i);
    this.actions.pickSound();
  }

  private dragPoint(x: number, y: number): THREE.Vector3 | null {
    this.dragPlane.constant = -this.cards.dragPlaneY();
    this.setNdc(x - this.grabDX, y - this.grabDY);
    const p = new THREE.Vector3();
    return this.raycaster.ray.intersectPlane(this.dragPlane, p) ? p : null;
  }

  private updateDrag(x: number, y: number): void {
    const p = this.dragPoint(x, y);
    if (p && this.pressOffer !== null) this.cards.dragTo(this.pressOffer, p);
    const slot = this.dropSlot(x, y);
    this.setHover(null, slot);
  }

  private dropSlot(x: number, y: number): number | null {
    // project the dragged card centre straight down onto the lid, then fall back to the pointer ray
    const p = this.dragPoint(x, y);
    if (p) {
      const ray = new THREE.Raycaster(new THREE.Vector3(p.x, p.y + 5, p.z), new THREE.Vector3(0, -1, 0));
      const hits = ray.intersectObjects(
        this.board.sockets.map((s) => s.hit),
        false,
      );
      if (hits[0]) return hits[0].object.userData.slot as number;
    }
    return this.socketAt(x, y);
  }

  private onUp(e: PointerEvent): void {
    if (this.pointerId === null || e.pointerId !== this.pointerId) {
      // a click without a pressed card: socket click while placing
      if (e.button === 0 && this.canDraft()) {
        const c = this.getController();
        if (c.draft!.stage === 'placing') {
          const slot = this.socketAt(e.clientX, e.clientY);
          if (slot !== null) this.actions.placeSlot(slot);
        }
      }
      return;
    }
    const i = this.pressOffer;
    if (this.dragging && i !== null) {
      const slot = this.dropSlot(e.clientX, e.clientY);
      this.dragging = false;
      this.release();
      if (slot !== null) {
        const c = this.getController();
        const id = c.draft?.offer[i];
        const res = this.actions.placeSlot(slot);
        if (res === 'rejected') {
          this.cards.returnOffer(i);
          this.actions.returnSound();
          if (id && !isWeaponId(id)) this.actions.rejected('Boons are used, not socketed — press Use.');
        } else if (res === 'confirm') {
          this.cards.returnOffer(i);
        }
      } else {
        // invalid drop: the card returns unconsumed and stays selected for click-to-place
        this.cards.returnOffer(i);
        this.actions.returnSound();
      }
    } else if (i !== null) {
      this.release();
      const c = this.getController();
      if (c.draft?.selected === i && c.draft.stage !== 'choosing') this.actions.cancel();
      else this.actions.selectOffer(i);
    }
  }

  private release(): void {
    if (this.pointerId !== null && this.canvas.hasPointerCapture(this.pointerId)) this.canvas.releasePointerCapture(this.pointerId);
    this.pointerId = null;
    this.pressOffer = null;
  }

  /** Cancel an uncommitted drag: the card returns without being consumed. */
  cancelDrag(_reason: string): void {
    void _reason;
    const i = this.pressOffer;
    const wasDragging = this.dragging;
    this.dragging = false;
    this.release();
    if (wasDragging && i !== null) {
      this.cards.returnOffer(i);
      this.actions.returnSound();
    }
    this.setHover(null, null);
  }

  private updateHover(x: number, y: number): void {
    const c = this.getController();
    if (!this.enabled || c.phase === 'TITLE') {
      this.setHover(null, null);
      return;
    }
    if (this.canDraft()) {
      const offer = this.offerAt(x, y);
      if (offer !== null) {
        this.setHover(`o${offer}`, null);
        return;
      }
      if (c.draft!.stage === 'placing') {
        const slot = this.socketAt(x, y);
        this.setHover(this.equippedKeyAt(x, y), slot);
        return;
      }
    }
    this.setHover(this.equippedKeyAt(x, y), null);
  }

  private equippedKeyAt(x: number, y: number): string | null {
    const hit = this.pick(this.cards.pickables('equipped'), x, y);
    const v = hit ? this.cards.cardByObject(hit.object) : undefined;
    return v ? v.key : null;
  }

  private setHover(key: string | null, slot: number | null): void {
    if (key !== this.hoverKey) {
      this.hoverKey = key;
      const v = key ? this.cards.cards.get(key) : undefined;
      this.cards.setHover(key, !!v && v.offerIndex !== null);
      if (v) {
        this.actions.hover({ id: v.defId, charge: null, slot: v.offerIndex === null ? v.slot : null });
        this.actions.hoverSound();
      } else this.actions.hover(null);
    }
    if (slot !== this.hoverSlot) this.hoverSlot = slot;
    this.canvas.style.cursor = key && key.startsWith('o') ? 'grab' : slot !== null ? 'pointer' : 'default';
    if (this.dragging) this.canvas.style.cursor = 'grabbing';
  }

  /** Socket halos: valid empty sockets glow turquoise, occupied ones warm; hover intensifies. */
  updateHalos(): void {
    const c = this.getController();
    const placing = this.canDraft() && (c.draft!.stage === 'placing' || this.dragging) && c.selectedCard() !== null && isWeaponId(c.selectedCard()!);
    for (const s of this.board.sockets) {
      if (!placing) {
        this.board.setSocketHalo(s.slot, 0, 0x69dad0);
        continue;
      }
      const occupied = !!c.sim.slots[s.slot];
      const hovered = this.hoverSlot === s.slot;
      this.board.setSocketHalo(s.slot, hovered ? 1 : 0.35, occupied ? 0xe2b074 : 0x69dad0);
    }
    if (c.draft?.stage === 'confirmReplace' && c.draft.pendingSlot !== null) this.board.setSocketHalo(c.draft.pendingSlot, 1, 0xe28174);
  }

  /** Re-evaluate hover after camera motion without pointer movement. */
  refreshHover(): void {
    if (!this.dragging && this.pointerId === null) this.updateHover(this.lastX, this.lastY);
  }

  dispose(): void {
    this.cancelDrag('dispose');
    for (const f of this.off) f();
    this.off = [];
  }
}
