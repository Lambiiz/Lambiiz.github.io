// Shared physical layout of the Base and cards (presentation only — combat never reads this).
import { BASE, SLOT_COUNT } from '../game/content';

// Scaled up 1.3x from the first slice so socketed cards stay readable in the zoomed-out swarm view.
export const CARD_W = 2.65;
export const CARD_H = 3.54;
export const CARD_T = 0.06;
export const HOLE_W = CARD_W + 0.1;
export const HOLE_H = CARD_H + 0.1;

export const PLINTH_TOP = 0.22;
export const BODY_TOP = 0.9;
export const BAND_TOP = 0.98;
export const LID_DEPTH = 0.14;
export const LID_BEVEL = 0.035;
export const LID_TOP = BAND_TOP + LID_DEPTH + LID_BEVEL; // top of lid surface
export const SOCKET_FLOOR = LID_TOP - 0.15;
export const CARD_SEAT_Y = SOCKET_FLOOR + CARD_T / 2 + 0.002;

export const LID_W = BASE.halfX * 2 - 0.3;
export const LID_D = BASE.halfZ * 2 - 0.3;

const COL_X = [-(HOLE_W + 0.2), 0, HOLE_W + 0.2];
const ROW_Z = [-(0.27 + HOLE_H / 2), 0.27 + HOLE_H / 2];

/** Socket centre in world XZ. Slots 0–2 are the far row, 3–5 the near row. */
export function socketCenter(slot: number): { x: number; z: number } {
  if (slot < 0 || slot >= SLOT_COUNT) throw new Error('bad slot');
  return { x: COL_X[slot % 3], z: ROW_Z[Math.floor(slot / 3)] };
}

export const EMITTER_POS = { x: 0, y: LID_TOP + 0.36, z: 0 };
