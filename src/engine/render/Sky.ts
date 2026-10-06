import * as THREE from 'three';

/**
 * Gradient sky dome plus layered ridge silhouettes on the horizon, tinted toward the fog colour so
 * they sit in the atmosphere. Colours follow the lighting preset (call `update` each frame).
 */
export class Sky extends THREE.Group {
  private dome: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
  private ridges: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>[] = [];

  constructor(center: THREE.Vector3, radius = 150) {
    super();
    this.dome = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 24, 12),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: { top: { value: new THREE.Color() }, horizon: { value: new THREE.Color() }, glow: { value: new THREE.Color() }, sunDir: { value: new THREE.Vector3(0, 1, 0) } },
        vertexShader: /* glsl */ `varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: /* glsl */ `
          uniform vec3 top, horizon, glow, sunDir; varying vec3 vDir;
          void main() {
            float h = clamp(vDir.y, 0.0, 1.0);
            vec3 c = mix(horizon, top, pow(h, 0.55));
            float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
            c += glow * pow(s, 8.0) * 0.6 * (1.0 - h);
            gl_FragColor = vec4(c, 1.0);
          }`,
      }),
    );
    this.dome.renderOrder = -10;
    this.add(this.dome);
    // three ridge layers, nearer = darker
    for (let l = 0; l < 3; l++) {
      const pts: number[] = [];
      const R = radius * (0.55 + l * 0.12);
      const seg = 96;
      for (let i = 0; i <= seg; i++) {
        const a = (i / seg) * Math.PI * 2;
        const n = Math.sin(a * (5 + l * 2) + l) * 0.5 + Math.sin(a * (13 + l * 3) + l * 2) * 0.25 + Math.sin(a * 29) * 0.08;
        const hgt = (10 + l * 6) + n * (6 + l * 3);
        const x = Math.cos(a) * R, z = Math.sin(a) * R;
        pts.push(x, -4, z, x, hgt, z);
      }
      const idx: number[] = [];
      for (let i = 0; i < seg; i++) {
        const b = i * 2;
        idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      g.setIndex(idx);
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide, fog: false, depthWrite: false }));
      m.renderOrder = -9 + (2 - l);
      this.ridges.push(m);
      this.add(m);
    }
    this.position.copy(center);
  }

  update(top: number, horizon: number, sunColor: number, sunDir: THREE.Vector3): void {
    const u = this.dome.material.uniforms;
    u.top.value.set(top);
    u.horizon.value.set(horizon);
    u.glow.value.set(sunColor);
    u.sunDir.value.copy(sunDir);
    const h = new THREE.Color(horizon), t = new THREE.Color(top);
    this.ridges.forEach((r, l) => {
      // far ridges fade into the horizon haze, near ones are cooler and darker
      r.material.color.copy(h).lerp(t, 0.35 + l * 0.12).multiplyScalar(0.92 - (2 - l) * 0.04);
    });
  }
}
