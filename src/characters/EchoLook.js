// Turns a VRM into the "Echo" — a dark porcelain reflection with a coral rim
// glow and burning eyes — by re-tuning its MToon materials.
import * as THREE from 'three';

export function applyEchoLook(vrm) {
  const mats = new Set();
  vrm.scene.traverse((o) => {
    if (!o.isMesh) return;
    const list = Array.isArray(o.material) ? o.material : [o.material];
    list.forEach((m) => mats.add(m));
  });
  const rim = new THREE.Color(1.0, 0.24, 0.42);
  for (const m of mats) {
    if (!m.isMToonMaterial) continue;
    const n = m.name || '';
    const isEye = /EyeIris|EyeHighlight/.test(n);
    const isSkin = /SKIN|Face_00/.test(n) && !/Brow|Eyeline|Eyelash|Mouth/.test(n);
    const isEyeWhite = /EyeWhite/.test(n);
    if (isEye) {
      m.emissive.setRGB(1.0, 0.18, 0.35);
      m.emissiveIntensity = 4.0;
      m.color.setRGB(1, 0.3, 0.45);
      continue;
    }
    if (isEyeWhite) {
      m.color.setRGB(0.08, 0.02, 0.1);
      continue;
    }
    if (isSkin) {
      m.color.setRGB(0.5, 0.47, 0.66);
      m.shadeColorFactor.setRGB(0.16, 0.1, 0.3);
    } else if (/HAIR/.test(n)) {
      m.color.multiply(new THREE.Color(0.2, 0.1, 0.28));
      m.shadeColorFactor.setRGB(0.03, 0.0, 0.08);
    } else {
      m.color.multiply(new THREE.Color(0.24, 0.18, 0.36));
      m.shadeColorFactor.setRGB(0.02, 0.0, 0.06);
    }
    m.parametricRimColorFactor.copy(rim);
    m.parametricRimFresnelPowerFactor = 3.2;
    m.parametricRimLiftFactor = 0.0;
    m.rimLightingMixFactor = 1;
    if (m.outlineColorFactor) m.outlineColorFactor.setRGB(1, 0.2, 0.4);
    m.needsUpdate = true;
  }
}

/** Soft rim light for the heroes so they pop against the background. */
export function applyHeroRim(vrm, color) {
  vrm.scene.traverse((o) => {
    if (!o.isMesh) return;
    const list = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of list) {
      if (!m.isMToonMaterial || /Eye/.test(m.name)) continue;
      m.parametricRimColorFactor.copy(color);
      m.parametricRimFresnelPowerFactor = 4.5;
      m.parametricRimLiftFactor = 0.0;
      m.rimLightingMixFactor = 1;
    }
  });
}
