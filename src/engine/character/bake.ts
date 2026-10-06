import * as THREE from 'three';
import { PixelCanvas } from '../pixel/PixelCanvas';
import { pack, shade, mix } from '../pixel/color';
import type { CharacterLook } from './look';
import { buildRig, type Rig } from './model';
import { applyPose, battleAnims, OVERWORLD_ANIMS, type AnimSpec } from './poses';

/**
 * Bakes a character model into a pixel-art sprite sheet.
 *
 * Each frame is rendered at its final pixel size with an orthographic camera and the cel material
 * (flat colour bands, no anti-aliasing), together with a depth pass. The pixels are then read back
 * and finished on the CPU, the way a pixel artist would:
 *  - contour lines wherever a nearer part overlaps a farther one (an arm across the chest);
 *  - eyes, a mouth and blush painted at the face's projected position, pixel by pixel;
 *  - a soft coloured outline around the silhouette.
 *
 * The sheet layout is one block of rows per direction, one row per animation inside a block.
 */

export interface AnimDef {
  /** Row inside a direction block. */
  row: number;
  frames: number;
  fps: number;
  loop: boolean;
}

export interface SheetInfo {
  canvas: PixelCanvas;
  frameW: number;
  frameH: number;
  cols: number;
  rows: number;
  anims: Record<string, AnimDef>;
  /** Direction names, in block order. */
  dirs: string[];
  rowsPerDir: number;
  /** Pixel row (from the top of a frame) where the feet touch the ground. */
  footPx: number;
  /** Texels per world unit for this sheet. */
  ppu: number;
}

export interface SheetSpec {
  frame: number;
  ppu: number;
  /** Camera pitch in degrees (how far the bake looks down on the character). */
  pitch: number;
  /** World height at the centre of the frame. */
  centerY: number;
  dirs: { name: string; yaw: number }[];
  anims: AnimSpec[];
}

const DEG = Math.PI / 180;

/**
 * Overworld: 8 directions. The "sideways" views are turned partly toward the camera (as HD-2D
 * sprites are) so the face stays visible: east is drawn at 72°, not 90°.
 */
export const OVERWORLD_DIRS = [
  { name: 's', yaw: 0 }, { name: 'se', yaw: 38 * DEG }, { name: 'e', yaw: 72 * DEG }, { name: 'ne', yaw: 132 * DEG },
  { name: 'n', yaw: 180 * DEG }, { name: 'nw', yaw: -132 * DEG }, { name: 'w', yaw: -72 * DEG }, { name: 'sw', yaw: -38 * DEG },
];

/** Battle: facing right or left, three-quarters toward the camera. */
export const BATTLE_DIRS = [{ name: 'r', yaw: 58 * DEG }, { name: 'l', yaw: -58 * DEG }];

export const CHAR_PPU = 28;

export function overworldSpec(): SheetSpec {
  return { frame: 64, ppu: CHAR_PPU, pitch: 20, centerY: 0.92, dirs: OVERWORLD_DIRS, anims: OVERWORLD_ANIMS };
}

export function battleSpec(look: CharacterLook): SheetSpec {
  return { frame: 96, ppu: CHAR_PPU, pitch: 12, centerY: 1.3, dirs: BATTLE_DIRS, anims: battleAnims(look) };
}

const DEPTH_NEAR = 6, DEPTH_RANGE = 4;

const depthMaterial = new THREE.ShaderMaterial({
  vertexShader: /* glsl */ `
    varying float vZ;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vZ = -mv.z;
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: /* glsl */ `
    varying float vZ;
    void main() {
      float d = clamp((vZ - ${DEPTH_NEAR.toFixed(1)}) / ${DEPTH_RANGE.toFixed(1)}, 0.0, 1.0) * 255.0;
      gl_FragColor = vec4(floor(d) / 255.0, fract(d), 0.0, 1.0);
    }`,
  side: THREE.DoubleSide,
});

interface FacePoint {
  x: number;
  y: number;
  /** How squarely it faces the camera (−1..1). */
  vis: number;
  depth: number;
}

interface FaceInfo {
  cx: number;
  cy: number;
  eyeR: FacePoint;
  eyeL: FacePoint;
  mouth: FacePoint;
  blink: boolean;
}

export function bakeSheet(renderer: THREE.WebGLRenderer, look: CharacterLook, spec: SheetSpec): SheetInfo {
  const F = spec.frame;
  const cols = Math.max(...spec.anims.map((a) => a.frames));
  const rowsPerDir = spec.anims.length;
  const rows = rowsPerDir * spec.dirs.length;
  const W = cols * F, H = rows * F;

  const rig = buildRig(look);
  const scene = new THREE.Scene();
  scene.add(rig.root);
  const half = F / 2 / spec.ppu;
  const cam = new THREE.OrthographicCamera(-half, half, half, -half, 0.1, 30);
  const target = new THREE.Vector3(0, spec.centerY, 0);
  const pitch = spec.pitch * DEG;
  cam.position.copy(target).add(new THREE.Vector3(0, Math.sin(pitch), Math.cos(pitch)).multiplyScalar(8));
  cam.lookAt(target);
  cam.updateMatrixWorld();

  const mkRT = () => {
    const rt = new THREE.WebGLRenderTarget(W, H, { type: THREE.UnsignedByteType, format: THREE.RGBAFormat, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, depthBuffer: true, generateMipmaps: false });
    rt.texture.colorSpace = THREE.NoColorSpace;
    return rt;
  };
  const colorRT = mkRT(), depthRT = mkRT();

  const prevTarget = renderer.getRenderTarget();
  const prevClear = renderer.getClearColor(new THREE.Color());
  const prevAlpha = renderer.getClearAlpha();
  const prevAuto = renderer.autoClear;
  const prevShadow = renderer.shadowMap.enabled;
  renderer.shadowMap.enabled = false;
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0);
  for (const rt of [colorRT, depthRT]) {
    rt.scissorTest = false;
    renderer.setRenderTarget(rt);
    renderer.clear(true, true, true);
  }

  const faces: (FaceInfo | null)[] = [];
  const anims: Record<string, AnimDef> = {};
  const toCam = new THREE.Vector3();
  cam.getWorldDirection(toCam).negate();
  const headW = new THREE.Vector3(), p = new THREE.Vector3(), n = new THREE.Vector3();

  const facePoint = (o: THREE.Object3D): FacePoint => {
    o.getWorldPosition(p);
    n.copy(p).sub(headW).normalize();
    const depth = -p.clone().applyMatrix4(cam.matrixWorldInverse).z;
    const ndc = p.clone().project(cam);
    return { x: (ndc.x * 0.5 + 0.5) * F, y: (1 - (ndc.y * 0.5 + 0.5)) * F, vis: n.dot(toCam), depth };
  };

  spec.dirs.forEach((dir, d) => {
    spec.anims.forEach((anim, a) => {
      anims[anim.name] = { row: a, frames: anim.frames, fps: anim.fps, loop: anim.loop };
      for (let i = 0; i < anim.frames; i++) {
        const pose = anim.pose(i, anim.frames);
        applyPose(rig, pose, look);
        rig.root.rotation.y = dir.yaw;
        rig.root.updateMatrixWorld(true);
        const row = d * rowsPerDir + a;
        const vx = i * F, vy = H - (row + 1) * F;
        for (const [rt, override] of [[colorRT, null], [depthRT, depthMaterial]] as const) {
          rt.viewport.set(vx, vy, F, F);
          rt.scissor.set(vx, vy, F, F);
          rt.scissorTest = true;
          scene.overrideMaterial = override;
          renderer.setRenderTarget(rt);
          renderer.render(scene, cam);
        }
        scene.overrideMaterial = null;
        rig.head.getWorldPosition(headW);
        const hc = headW.clone().project(cam);
        faces[row * cols + i] = {
          cx: (hc.x * 0.5 + 0.5) * F, cy: (1 - (hc.y * 0.5 + 0.5)) * F,
          eyeR: facePoint(rig.eyeR), eyeL: facePoint(rig.eyeL), mouth: facePoint(rig.mouth),
          blink: !!pose.blink,
        };
      }
    });
  });

  const col = new Uint8Array(W * H * 4), dep = new Uint8Array(W * H * 4);
  renderer.readRenderTargetPixels(colorRT, 0, 0, W, H, col);
  renderer.readRenderTargetPixels(depthRT, 0, 0, W, H, dep);
  renderer.setRenderTarget(prevTarget);
  renderer.setClearColor(prevClear, prevAlpha);
  renderer.autoClear = prevAuto;
  renderer.shadowMap.enabled = prevShadow;
  colorRT.dispose();
  depthRT.dispose();
  disposeRig(rig);

  // feet: where the origin projects
  const foot = new THREE.Vector3(0, 0, 0).project(cam);
  const footPx = Math.round((1 - (foot.y * 0.5 + 0.5)) * F);

  const pc = finish(col, dep, W, H, F, cols, faces, look);
  return { canvas: pc, frameW: F, frameH: F, cols, rows, anims, dirs: spec.dirs.map((d) => d.name), rowsPerDir, footPx, ppu: spec.ppu };
}

function disposeRig(rig: Rig): void {
  rig.root.traverse((o) => {
    if (o instanceof THREE.Mesh) o.geometry.dispose();
  });
}

/** CPU finishing pass: contours, face, outline. Flips the GL rows (bottom-up) to canvas rows. */
function finish(col: Uint8Array, dep: Uint8Array, W: number, H: number, F: number, cols: number, faces: (FaceInfo | null)[], look: CharacterLook): PixelCanvas {
  const pc = new PixelCanvas(W, H);
  const depth = new Float32Array(W * H).fill(Infinity);
  for (let y = 0; y < H; y++) {
    const gy = H - 1 - y;
    for (let x = 0; x < W; x++) {
      const gi = (gy * W + x) * 4;
      if (col[gi + 3] < 128) continue;
      const i = (y * W + x) * 4;
      pc.data[i] = col[gi];
      pc.data[i + 1] = col[gi + 1];
      pc.data[i + 2] = col[gi + 2];
      pc.data[i + 3] = 255;
      depth[y * W + x] = DEPTH_NEAR + ((dep[gi] + dep[gi + 1] / 255) / 255) * DEPTH_RANGE;
    }
  }
  const opaque = (x: number, y: number) => x >= 0 && y >= 0 && x < W && y < H && pc.data[(y * W + x) * 4 + 3] > 0;
  const sameCell = (x0: number, y0: number, x1: number, y1: number) => Math.floor(x0 / F) === Math.floor(x1 / F) && Math.floor(y0 / F) === Math.floor(y1 / F);

  // 1. contour lines: a pixel next to a clearly nearer part gets darkened (it sits behind an edge)
  const contour: number[] = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!opaque(x, y)) continue;
      const d = depth[y * W + x];
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (!opaque(nx, ny) || !sameCell(x, y, nx, ny)) continue;
        if (depth[ny * W + nx] < d - 0.11) { contour.push(x, y); break; }
      }
    }
  }
  for (let k = 0; k < contour.length; k += 2) {
    const x = contour[k], y = contour[k + 1];
    pc.set(x, y, shade(pc.get(x, y), -0.5));
  }

  // 2. faces
  const eyeC = look.eyes ?? 0x3a3448;
  const lash = mix(shade(look.hair, -0.75), 0x1a1424, 0.5);
  faces.forEach((f, idx) => {
    if (!f) return;
    const ox = (idx % cols) * F, oy = Math.floor(idx / cols) * F;
    const visible = (pt: FacePoint, px: number, py: number) => {
      if (!opaque(px, py)) return false;
      return depth[py * W + px] > pt.depth - 0.035; // nothing (hair, an arm) in front of it
    };
    /**
     * An anime pixel eye, as HD-2D sprites draw them: a dark lash line across the top that flicks
     * out at the outer corner, a 2 × 2 iris below with a catch-light, a lighter lower iris row.
     * Seen from the side (low `vis`) it narrows to one column.
     */
    const eye = (pt: FacePoint, outer: number) => {
      if (pt.vis < 0.18) return;
      const ex = ox + Math.round(pt.x - 0.5), ey = oy + Math.round(pt.y - 1.5);
      const wide = pt.vis > 0.45 ? 2 : 1;
      const x0 = outer < 0 ? ex - (wide - 1) : ex;
      if (!visible(pt, ex, ey + 1)) return;
      const inner = outer < 0 ? x0 + wide - 1 : x0;
      const outerX = outer < 0 ? x0 : x0 + wide - 1;
      if (f.blink) {
        for (let i = 0; i < wide; i++) pc.set(x0 + i, ey + 2, lash);
        pc.set(outerX + outer, ey + 1, lash);
        return;
      }
      for (let i = 0; i < wide; i++) {
        pc.set(x0 + i, ey, lash);
        pc.set(x0 + i, ey + 1, shade(eyeC, -0.45));
        pc.set(x0 + i, ey + 2, eyeC);
      }
      pc.set(outerX + outer, ey, lash);
      pc.set(outerX + outer, ey + 1, mix(lash, look.skin, 0.4));
      pc.set(inner, ey + 1, mix(eyeC, 0xffffff, 0.8));
      if (wide === 2) pc.set(outerX, ey + 2, mix(eyeC, 0xffffff, 0.3));
    };
    // which eye is on screen-left decides where the catch-light goes (outer side)
    const rLeft = f.eyeR.x < f.eyeL.x;
    eye(f.eyeR, rLeft ? -1 : 1);
    eye(f.eyeL, rLeft ? 1 : -1);
    // mouth and blush when the face looks our way
    const m = f.mouth;
    if (m.vis > 0.45) {
      const mx = ox + Math.round(m.x - 0.5), my = oy + Math.round(m.y);
      if (visible(m, mx, my)) pc.set(mx, my, shade(look.skin, -0.42));
      for (const e of [f.eyeR, f.eyeL]) {
        if (e.vis < 0.45) continue;
        const bx = ox + Math.round(e.x - 0.5 + (e.x < m.x ? -1 : 1)), by = oy + Math.round(e.y + 2);
        if (visible(e, bx, by) && !f.blink) pc.set(bx, by, mix(look.skin, 0xe86a6a, 0.3));
      }
    }
  });

  // 3. soft outline: transparent pixels touching the silhouette take a dark, saturated version of it
  const src = new Uint8ClampedArray(pc.data);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (src[(y * W + x) * 4 + 3] > 0) continue;
      let best = -1, bestDepth = Infinity;
      for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H || !sameCell(x, y, nx, ny)) continue;
        const ni = ny * W + nx;
        if (src[ni * 4 + 3] === 0) continue;
        if (depth[ni] < bestDepth) { bestDepth = depth[ni]; best = ni; }
      }
      if (best < 0) continue;
      const r = src[best * 4], g = src[best * 4 + 1], b = src[best * 4 + 2];
      pc.set(x, y, pack(r * 0.28 + 14, g * 0.24 + 10, b * 0.3 + 22));
    }
  }
  return pc;
}
