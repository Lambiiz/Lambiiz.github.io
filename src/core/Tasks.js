// Game-time scheduler: promises that resolve on simulated time, so scripted
// sequences stay in sync with animation even when the frame rate dips.

export class Tasks {
  constructor() {
    this.time = 0;
    this.items = [];
  }

  /** Resolve after `sec` seconds of game time. */
  sleep(sec) {
    return new Promise((resolve) => this.items.push({ kind: 'sleep', end: this.time + sec, resolve }));
  }

  /** Run fn(t) for t in [0,1] over `sec` seconds (with easing), resolve at end. */
  tween(sec, fn, ease = (t) => t) {
    return new Promise((resolve) => {
      const item = { kind: 'tween', start: this.time, dur: Math.max(1e-4, sec), fn, ease, resolve };
      fn(ease(0));
      this.items.push(item);
    });
  }

  /** Call fn(dt) every frame until it returns true. */
  until(fn) {
    return new Promise((resolve) => this.items.push({ kind: 'until', fn, resolve }));
  }

  /** Cancel every pending task (used on hard restarts). Pending promises never resolve. */
  clear() {
    this.items.length = 0;
  }

  update(dt) {
    this.time += dt;
    const done = [];
    for (const it of this.items) {
      if (it.kind === 'sleep') {
        if (this.time >= it.end) done.push(it);
      } else if (it.kind === 'tween') {
        const t = Math.min(1, (this.time - it.start) / it.dur);
        it.fn(it.ease(t));
        if (t >= 1) done.push(it);
      } else if (it.fn(dt)) done.push(it);
    }
    if (done.length) {
      this.items = this.items.filter((i) => !done.includes(i));
      for (const d of done) d.resolve();
    }
  }
}
