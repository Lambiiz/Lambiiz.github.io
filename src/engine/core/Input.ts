/** Keyboard (and basic gamepad) state with edge detection. */
export type Action = 'up' | 'down' | 'left' | 'right' | 'run' | 'confirm' | 'cancel' | 'battle' | 'time' | 'camLeft' | 'camRight' | 'zoomIn' | 'zoomOut' | 'debug' | 'menu';

const KEYMAP: Record<string, Action> = {
  KeyW: 'up', ArrowUp: 'up', KeyS: 'down', ArrowDown: 'down', KeyA: 'left', ArrowLeft: 'left', KeyD: 'right', ArrowRight: 'right',
  ShiftLeft: 'run', ShiftRight: 'run', Space: 'confirm', Enter: 'confirm', KeyF: 'confirm', Escape: 'cancel', Backspace: 'cancel',
  KeyB: 'battle', KeyT: 'time', KeyQ: 'camLeft', KeyE: 'camRight', KeyZ: 'zoomIn', KeyX: 'zoomOut', Backquote: 'debug', Tab: 'menu',
};

const PAD: [number, Action][] = [[0, 'confirm'], [1, 'cancel'], [3, 'battle'], [4, 'camLeft'], [5, 'camRight'], [7, 'run'], [12, 'up'], [13, 'down'], [14, 'left'], [15, 'right']];

export class Input {
  private down = new Set<Action>();
  private pressed = new Set<Action>();
  private padDown = new Set<Action>();
  /** Analog stick (x right, y down), already dead-zoned. */
  stick = { x: 0, y: 0 };
  /** Last key code pressed this frame (for menus that want raw keys). */
  readonly keysPressed = new Set<string>();

  constructor(target: Window = window) {
    target.addEventListener('keydown', (e) => {
      const a = KEYMAP[e.code];
      this.keysPressed.add(e.code);
      if (a) {
        if (!this.down.has(a)) this.pressed.add(a);
        this.down.add(a);
        if (e.code === 'Tab' || e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault();
      }
    });
    target.addEventListener('keyup', (e) => {
      const a = KEYMAP[e.code];
      if (a) this.down.delete(a);
    });
    target.addEventListener('blur', () => this.down.clear());
  }

  /** Poll the gamepad; call once per frame before reading. */
  poll(): void {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const p = pads && Array.from(pads).find((g) => g);
    this.stick.x = this.stick.y = 0;
    if (!p) return;
    const dz = (v: number) => (Math.abs(v) < 0.2 ? 0 : v);
    this.stick.x = dz(p.axes[0] ?? 0);
    this.stick.y = dz(p.axes[1] ?? 0);
    for (const [b, a] of PAD) {
      const on = !!p.buttons[b]?.pressed;
      if (on && !this.padDown.has(a)) this.pressed.add(a);
      if (on) this.padDown.add(a);
      else this.padDown.delete(a);
    }
  }

  held(a: Action): boolean {
    return this.down.has(a) || this.padDown.has(a);
  }

  /** True only on the frame the action was pressed. */
  hit(a: Action): boolean {
    return this.pressed.has(a);
  }

  /** Movement vector from keys + stick (x right, y down/toward camera), length ≤ 1. */
  move(): { x: number; y: number } {
    let x = this.stick.x, y = this.stick.y;
    if (this.held('left')) x -= 1;
    if (this.held('right')) x += 1;
    if (this.held('up')) y -= 1;
    if (this.held('down')) y += 1;
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    return { x, y };
  }

  /** Call at the end of each frame. */
  endFrame(): void {
    this.pressed.clear();
    this.keysPressed.clear();
  }

  /** Inject an action press (automation / touch). */
  inject(a: Action, hold?: boolean): void {
    this.pressed.add(a);
    if (hold === true) this.down.add(a);
    if (hold === false) this.down.delete(a);
  }
}
