// Keyboard + mouse input with edge-triggered "pressed" queries.
// Gameplay code asks for logical actions rather than raw key codes.

const ACTIONS = {
  up: ['KeyW', 'ArrowUp'],
  down: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  run: ['ShiftLeft', 'ShiftRight'],
  confirm: ['Enter', 'Space', 'KeyE', 'KeyZ'],
  back: ['Escape', 'Backspace', 'KeyX', 'KeyQ'],
};

export class Input {
  constructor(target) {
    this.down = new Set();
    this.pressedThisFrame = new Set();
    this.mouse = { dx: 0, dy: 0, dragging: false, wheel: 0 };
    this.enabled = true;

    addEventListener('keydown', (e) => {
      if (e.repeat) return;
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace'].includes(e.code)) e.preventDefault();
      this.down.add(e.code);
      this.pressedThisFrame.add(e.code);
    });
    addEventListener('keyup', (e) => this.down.delete(e.code));
    addEventListener('blur', () => this.down.clear());

    target.addEventListener('pointerdown', (e) => {
      this.mouse.dragging = true;
      this.mouse.button = e.button;
      target.setPointerCapture?.(e.pointerId);
    });
    target.addEventListener('pointerup', () => (this.mouse.dragging = false));
    target.addEventListener('pointercancel', () => (this.mouse.dragging = false));
    target.addEventListener('pointermove', (e) => {
      if (!this.mouse.dragging) return;
      this.mouse.dx += e.movementX;
      this.mouse.dy += e.movementY;
    });
    target.addEventListener('wheel', (e) => { this.mouse.wheel += Math.sign(e.deltaY); }, { passive: true });
    target.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  held(action) {
    if (!this.enabled) return false;
    return ACTIONS[action].some((c) => this.down.has(c));
  }

  pressed(action) {
    if (!this.enabled) return false;
    return ACTIONS[action].some((c) => this.pressedThisFrame.has(c));
  }

  /** Movement axis in local input space: x = strafe, y = forward. */
  moveAxis() {
    const x = (this.held('right') ? 1 : 0) - (this.held('left') ? 1 : 0);
    const y = (this.held('up') ? 1 : 0) - (this.held('down') ? 1 : 0);
    const len = Math.hypot(x, y) || 1;
    return { x: x / len, y: y / len, active: x !== 0 || y !== 0 };
  }

  consumeMouse() {
    const m = { dx: this.mouse.dx, dy: this.mouse.dy, wheel: this.mouse.wheel };
    this.mouse.dx = this.mouse.dy = this.mouse.wheel = 0;
    return m;
  }

  endFrame() {
    this.pressedThisFrame.clear();
  }
}
