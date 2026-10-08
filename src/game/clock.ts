// Fixed-step accumulator. The frame loop feeds wall-clock deltas; the clock decides how many
// 1/60 s simulation steps to run and stops immediately when a step reports a non-continue outcome.
import { FIXED_DT, MAX_FRAME_DELTA, MAX_STEPS_PER_FRAME } from './content';
import type { StepOutcome } from './types';

export class FixedStepClock {
  accumulator = 0;
  /** Interpolation factor between the previous and current authoritative states. */
  alpha = 1;

  reset(): void {
    this.accumulator = 0;
    this.alpha = 1;
  }

  /**
   * @param frameDelta seconds since the previous frame (already measured once per frame)
   * @param running whether the current phase advances simulation
   * @param step runs one fixed tick and returns its outcome
   * @returns the first non-continue outcome, or 'continue'
   */
  advance(frameDelta: number, running: boolean, step: () => StepOutcome): StepOutcome {
    if (!running) {
      this.reset();
      return 'continue';
    }
    this.accumulator += Math.min(Math.max(frameDelta, 0), MAX_FRAME_DELTA);
    let steps = 0;
    while (this.accumulator >= FIXED_DT - 1e-12 && steps < MAX_STEPS_PER_FRAME) {
      this.accumulator -= FIXED_DT;
      steps++;
      const outcome = step();
      if (outcome !== 'continue') {
        this.reset();
        return outcome;
      }
    }
    if (steps === MAX_STEPS_PER_FRAME && this.accumulator > FIXED_DT) this.accumulator = FIXED_DT;
    this.accumulator = Math.max(0, this.accumulator);
    this.alpha = Math.min(1, this.accumulator / FIXED_DT);
    return 'continue';
  }
}
