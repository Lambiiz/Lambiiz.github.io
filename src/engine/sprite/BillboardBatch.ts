import * as THREE from 'three';
import type { Atlas } from './Atlas';
import { GLOBALS } from '../render/globals';
import { PX_PER_UNIT } from '../pixel/texture';

export interface BillboardItem {
  region: string;
  x: number;
  y: number;
  z: number;
  /** Scale on top of the 16 px/unit size. */
  scale?: number;
  /** Wind sway amount (0 = rigid). */
  sway?: number;
  flip?: boolean;
  /** Pixel row of the anchor from the bottom of the sprite (default 0 = bottom edge). */
  anchorPx?: number;
}

/**
 * Many static camera-facing sprites (grass, flowers, bushes, tree canopies, signs) in one draw call.
 * Each quad turns to the camera's yaw in the vertex shader and sways with the wind from its base.
 */
export class BillboardBatch extends THREE.Mesh<THREE.BufferGeometry, THREE.MeshLambertMaterial> {
  constructor(atlas: Atlas, items: BillboardItem[], opts: { normalUp?: number; castShadow?: boolean; fill?: number } = {}) {
    const n = items.length;
    const pos = new Float32Array(n * 12);
    const corner = new Float32Array(n * 8);
    const uv = new Float32Array(n * 8);
    const sway = new Float32Array(n * 4);
    const idx: number[] = [];
    items.forEach((it, i) => {
      const r = atlas.get(it.region);
      const s = (it.scale ?? 1) / PX_PER_UNIT;
      const w = r.w * s, h = r.h * s;
      const a = (it.anchorPx ?? 0) * s;
      const cs = [[-w / 2, -a], [w / 2, -a], [w / 2, h - a], [-w / 2, h - a]];
      const us = it.flip ? [[r.u1, r.v0], [r.u0, r.v0], [r.u0, r.v1], [r.u1, r.v1]] : [[r.u0, r.v0], [r.u1, r.v0], [r.u1, r.v1], [r.u0, r.v1]];
      for (let k = 0; k < 4; k++) {
        pos.set([it.x, it.y, it.z], (i * 4 + k) * 3);
        corner.set(cs[k], (i * 4 + k) * 2);
        uv.set(us[k], (i * 4 + k) * 2);
        sway[i * 4 + k] = (it.sway ?? 0) * (k >= 2 ? 1 : 0);
      }
      const b = i * 4;
      idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('corner', new THREE.BufferAttribute(corner, 2));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setAttribute('sway', new THREE.BufferAttribute(sway, 1));
    geo.setIndex(idx);
    geo.computeBoundingSphere();
    if (geo.boundingSphere) geo.boundingSphere.radius += 4;

    const up = (opts.normalUp ?? 1.6).toFixed(3);
    const patch = (shader: THREE.WebGLProgramParametersWithUniforms) => {
      shader.uniforms.uTime = GLOBALS.uTime;
      shader.uniforms.uCamYaw = GLOBALS.uCamYaw;
      shader.uniforms.uWind = GLOBALS.uWind;
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>
attribute vec2 corner;
attribute float sway;
uniform float uTime, uCamYaw, uWind;`)
        .replace('#include <beginnormal_vertex>', `vec3 objectNormal = normalize(vec3(sin(uCamYaw), ${up}, cos(uCamYaw)));`)
        .replace('#include <begin_vertex>', `vec3 transformed = position;
vec3 camRight = vec3(cos(uCamYaw), 0.0, -sin(uCamYaw));
float ph = uTime * 1.6 + position.x * 0.45 + position.z * 0.3;
float sw = (sin(ph) + 0.35 * sin(ph * 2.3 + 1.0)) * sway * uWind;
transformed += camRight * (corner.x + sw * 0.06) + vec3(0.0, corner.y, 0.0);`);
    };
    const mat = new THREE.MeshLambertMaterial({
      map: atlas.texture,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
      emissive: new THREE.Color(1, 1, 1).multiplyScalar(opts.fill ?? 0.05),
      emissiveMap: atlas.texture,
    });
    mat.onBeforeCompile = patch;
    mat.customProgramCacheKey = () => `bb-${up}`;
    super(geo, mat);
    this.castShadow = opts.castShadow ?? true;
    this.receiveShadow = true;
    const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: atlas.texture, alphaTest: 0.5, side: THREE.DoubleSide });
    depth.onBeforeCompile = patch;
    this.customDepthMaterial = depth;
    this.frustumCulled = true;
  }
}
