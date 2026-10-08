// Shared card resources (geometry, per-definition face materials, per-type edge materials) used by
// both the socketed cards in the world and the physical hand overlay. Created once, owned here.
import * as THREE from 'three';
import { cardDef } from '../game/content';
import type { CardId, CardType } from '../game/types';
import * as art from './art';
import { CARD_H, CARD_T, CARD_W } from './layout';

function roundedRect(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function remapUv(geo: THREE.BufferGeometry, w: number, h: number): void {
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) + w / 2) / w, (uv.getY(i) + h / 2) / h);
}

const EDGE_COLORS: Record<CardType, number> = { tower: 0x3a4a66, active: 0x6e3430, passive: 0x6a5034 };

export class CardAssets {
  readonly bodyGeo: THREE.ExtrudeGeometry;
  readonly faceGeo: THREE.ShapeGeometry;
  readonly backMat: THREE.MeshStandardMaterial;
  readonly shadowGeo: THREE.PlaneGeometry;
  readonly shadowMat: THREE.MeshBasicMaterial;
  private faceMats = new Map<CardId, THREE.MeshStandardMaterial>();
  private faceTextures = new Map<CardId, THREE.Texture>();
  private edgeMats = new Map<CardType, THREE.MeshStandardMaterial>();
  private owned: { dispose(): void }[] = [];

  constructor(private renderer: THREE.WebGLRenderer) {
    const shape = roundedRect(CARD_W, CARD_H, 0.16);
    this.bodyGeo = new THREE.ExtrudeGeometry(shape, { depth: CARD_T, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.018, bevelSegments: 2, curveSegments: 8 });
    this.bodyGeo.translate(0, 0, -CARD_T / 2);
    this.faceGeo = new THREE.ShapeGeometry(roundedRect(CARD_W - 0.02, CARD_H - 0.02, 0.15), 8);
    remapUv(this.faceGeo, CARD_W - 0.02, CARD_H - 0.02);
    const backTex = art.colorTexture(art.drawCardBack(), renderer);
    this.backMat = new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.6 });
    this.shadowGeo = new THREE.PlaneGeometry(CARD_W * 1.25, CARD_H * 1.2);
    const shTex = art.colorTexture(art.drawRadial('rgba(0,0,0,0.55)', 'rgba(0,0,0,0)', 128), renderer);
    this.shadowMat = new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false });
    this.owned.push(this.bodyGeo, this.faceGeo, backTex, this.backMat, this.shadowGeo, shTex, this.shadowMat);
  }

  /** Face material per definition, generated and cached once (fonts must already be loaded). */
  face(id: CardId): THREE.MeshStandardMaterial {
    let m = this.faceMats.get(id);
    if (!m) {
      const tex = art.colorTexture(art.drawCardFace(id), this.renderer);
      this.faceTextures.set(id, tex);
      m = new THREE.MeshStandardMaterial({ map: tex, color: 0xdad3c6, roughness: 0.75, metalness: 0.0 });
      this.faceMats.set(id, m);
    }
    return m;
  }

  /** Card-thickness stock tinted by card type. */
  edge(id: CardId): THREE.MeshStandardMaterial {
    const type = cardDef(id).type;
    let m = this.edgeMats.get(type);
    if (!m) {
      m = new THREE.MeshStandardMaterial({ color: EDGE_COLORS[type], roughness: 0.65, metalness: 0.1 });
      this.edgeMats.set(type, m);
    }
    return m;
  }

  prepare(ids: CardId[]): void {
    for (const id of ids) {
      this.face(id);
      this.edge(id);
    }
  }

  dispose(): void {
    for (const m of this.faceMats.values()) m.dispose();
    for (const t of this.faceTextures.values()) t.dispose();
    for (const m of this.edgeMats.values()) m.dispose();
    for (const o of this.owned) o.dispose();
  }
}
