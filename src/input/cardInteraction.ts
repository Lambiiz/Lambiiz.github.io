// Pointer interaction: the physical hand (overlay pass) is picked first, then explicit world
// targets (socket hit planes, socketed tower cards). Left drag/click plays cards, right-click marks
// cards for sacrifice, the wheel zooms the camera (player-controlled only).
import * as THREE from 'three';
import type { PhaseController, PlayResult } from '../game/phases';
import type { BoardView } from '../view/board';
import type { CardsView, SocketCard } from '../view/cards';
import type { HandView } from '../view/hand';
import type { SceneRig } from '../view/scene';

export interface InteractionActions {
  play(uid: number, slot?: number): PlayResult;
  select(uid: number | null): void;
  toggleMark(uid: number): void;
  chooseOffer(index: number): void;
  hoverHand(uid: number | null, offer: number | null): void;
  hoverSocketCard(card: SocketCard | null): void;
  hoverSocket(slot: number | null): void;
  hoverSound(): void;
  pickSound(): void;
  returnSound(): void;
}

const DRAG_THRESHOLD_PX = 6;

export class CardInteraction {
  private raycaster = new THREE.Raycaster();
  private pointerId: number | null = null;
  private pressUid: number | null = null;
  private pressX = 0;
  private pressY = 0;
  private dragging = false;
  private lastX = -1;
  private lastY = -1;
  private hoverKey: string | null = null;
  private off: (() => void)[] = [];
  enabled = true;

  constructor(
    private canvas: HTMLCanvasElement,
    private rig: SceneRig,
    private board: BoardView,
    private cards: CardsView,
    private hand: HandView,
    private getController: () => PhaseController,
    private actions: InteractionActions,
  ) {
    const add = <K extends keyof HTMLElementEventMap>(t: K, fn: (e: HTMLElementEventMap[K]) => void, opts?: AddEventListenerOptions) => {
      canvas.addEventListener(t, fn as EventListener, opts);
      this.off.push(() => canvas.removeEventListener(t, fn as EventListener, opts));
    };
    add('pointerdown', (e) => this.onDown(e));
    add('pointermove', (e) => this.onMove(e));
    add('pointerup', (e) => this.onUp(e));
    add('pointercancel', () => this.cancelDrag('pointercancel'));
    add('lostpointercapture', () => {
      if (this.dragging) this.cancelDrag('lostcapture');
    });
    add('pointerleave', () => {
      if (!this.dragging) this.setHover(null);
    });
    add('contextmenu', (e) => e.preventDefault());
    add(
      'wheel',
      (e) => {
        e.preventDefault();
        const r = canvas.getBoundingClientRect();
        this.rig.zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
      },
      { passive: false },
    );
  }

  get isDragging(): boolean {
    return this.dragging;
  }

  /** The hand card currently being dragged, if any. */
  get draggedUid(): number | null {
    return this.dragging ? this.pressUid : null;
  }

  private local(e: { clientX: number; clientY: number }): { x: number; y: number } {
    const r = this.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  private turnActive(): boolean {
    const c = this.getController();
    return this.enabled && c.phase === 'TURN' && !c.suspended && !!c.turn;
  }

  private worldPick(objects: THREE.Object3D[], x: number, y: number): THREE.Intersection | null {
    if (objects.length === 0) return null;
    const vp = this.rig.viewport;
    this.raycaster.setFromCamera(new THREE.Vector2((x / vp.width) * 2 - 1, -(y / vp.height) * 2 + 1), this.rig.camera);
    return this.raycaster.intersectObjects(objects, false)[0] ?? null;
  }

  socketAt(x: number, y: number): number | null {
    const hit = this.worldPick(
      this.board.sockets.map((s) => s.hit),
      x,
      y,
    );
    return hit ? (hit.object.userData.slot as number) : null;
  }

  private socketCardAt(x: number, y: number): SocketCard | null {
    const hit = this.worldPick(this.cards.pickables(), x, y);
    return hit ? this.cards.cardByObject(hit.object) ?? null : null;
  }

  private onDown(e: PointerEvent): void {
    if (this.pointerId !== null) return;
    const { x, y } = this.local(e);
    this.lastX = x;
    this.lastY = y;
    if (!this.turnActive()) return;
    const c = this.getController();
    const stage = c.turn!.stage;
    const hit = this.hand.pick(x, y);
    if (e.button === 2) {
      if (hit && 'uid' in hit && (stage === 'idle' || stage === 'targeting')) this.actions.toggleMark(hit.uid);
      return;
    }
    if (e.button !== 0) return;
    if (hit && 'offer' in hit) {
      if (stage === 'sacrificeChoice') this.actions.chooseOffer(hit.offer);
      return;
    }
    if (hit && 'uid' in hit && (stage === 'idle' || stage === 'targeting')) {
      this.pointerId = e.pointerId;
      this.pressUid = hit.uid;
      this.pressX = x;
      this.pressY = y;
      this.canvas.setPointerCapture(e.pointerId);
      e.preventDefault();
    }
  }

  private onMove(e: PointerEvent): void {
    const { x, y } = this.local(e);
    this.lastX = x;
    this.lastY = y;
    this.hand.setPointer(x, y);
    if (this.pointerId !== null && e.pointerId === this.pointerId && this.pressUid !== null) {
      if (!this.dragging && Math.hypot(x - this.pressX, y - this.pressY) > DRAG_THRESHOLD_PX) {
        this.dragging = true;
        this.hand.startDrag(this.pressUid, this.pressX, this.pressY);
        this.actions.pickSound();
      }
      if (this.dragging) {
        this.hand.dragTo(x, y);
        const c = this.getController();
        const slot = c.needsTarget(this.pressUid) ? this.socketAt(x, y) : null;
        this.actions.hoverSocket(slot !== null && c.validTarget(this.pressUid, slot) ? slot : null);
      }
      return;
    }
    this.updateHover(x, y);
  }

  private onUp(e: PointerEvent): void {
    const { x, y } = this.local(e);
    if (this.pointerId === null || e.pointerId !== this.pointerId) {
      // plain click on the board while a card waits for a target
      if (e.button === 0 && this.turnActive()) {
        const t = this.getController().turn!;
        if (t.stage === 'targeting' && t.selected !== null && !this.hand.pick(x, y)) {
          const slot = this.socketAt(x, y);
          if (slot !== null) this.actions.play(t.selected, slot);
          else this.actions.select(null);
        }
      }
      return;
    }
    const uid = this.pressUid!;
    const wasDragging = this.dragging;
    this.release();
    if (wasDragging) {
      this.dragging = false;
      this.hand.endDrag();
      this.actions.hoverSocket(null);
      const c = this.getController();
      let res: PlayResult | null = null;
      if (c.needsTarget(uid)) {
        const slot = this.socketAt(x, y);
        if (slot !== null) res = this.actions.play(uid, slot);
      } else if (y < this.hand.handTopY) res = this.actions.play(uid);
      if (res === null || (res !== 'played' && res !== 'confirm')) this.actions.returnSound();
    } else {
      const c = this.getController();
      if (c.needsTarget(uid)) this.actions.select(c.turn!.selected === uid ? null : uid);
      else this.actions.play(uid);
    }
  }

  private release(): void {
    if (this.pointerId !== null && this.canvas.hasPointerCapture(this.pointerId)) this.canvas.releasePointerCapture(this.pointerId);
    this.pointerId = null;
    this.pressUid = null;
  }

  /** Cancel an uncommitted drag: the card returns to the hand unplayed. */
  cancelDrag(_reason: string): void {
    void _reason;
    const was = this.dragging;
    this.dragging = false;
    this.release();
    this.hand.endDrag();
    this.actions.hoverSocket(null);
    if (was) this.actions.returnSound();
  }

  private updateHover(x: number, y: number): void {
    const c = this.getController();
    if (!this.enabled || c.phase === 'TITLE') {
      this.setHover(null);
      return;
    }
    const near = y > this.hand.handTopY - 30;
    const hit = c.phase === 'TURN' ? this.hand.pick(x, y) : null;
    this.hand.setRaised(c.phase === 'TURN' && (near || !!hit || this.dragging));
    if (hit) {
      this.setHover('uid' in hit ? `h${hit.uid}` : `o${hit.offer}`);
      this.hand.setHover(hit);
      this.actions.hoverHand('uid' in hit ? hit.uid : null, 'offer' in hit ? hit.offer : null);
      this.actions.hoverSocketCard(null);
      this.actions.hoverSocket(null);
      return;
    }
    this.hand.setHover(null);
    this.actions.hoverHand(null, null);
    const sc = this.socketCardAt(x, y);
    this.setHover(sc ? sc.key : null);
    this.actions.hoverSocketCard(sc);
    const t = c.turn;
    if (this.turnActive() && t && t.stage === 'targeting' && t.selected !== null) {
      const slot = this.socketAt(x, y);
      this.actions.hoverSocket(slot !== null && c.validTarget(t.selected, slot) ? slot : null);
    } else this.actions.hoverSocket(null);
    this.canvas.style.cursor = sc ? 'help' : 'default';
  }

  private setHover(key: string | null): void {
    if (key !== this.hoverKey) {
      this.hoverKey = key;
      if (key && key.startsWith('h')) this.actions.hoverSound();
    }
    if (key && (key.startsWith('h') || key.startsWith('o'))) this.canvas.style.cursor = this.dragging ? 'grabbing' : 'grab';
  }

  /** Re-evaluate hover after camera/hand motion without pointer movement. */
  refreshHover(): void {
    if (!this.dragging && this.pointerId === null && this.lastX >= 0) this.updateHover(this.lastX, this.lastY);
  }

  dispose(): void {
    this.cancelDrag('dispose');
    for (const f of this.off) f();
    this.off = [];
  }
}
