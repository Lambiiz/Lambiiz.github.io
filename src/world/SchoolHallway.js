// The explorable school corridor: second-floor west wing of Seiryo Academy at
// golden hour. Built from modular pieces with painted canvas textures, real
// window-frame shadows, light shafts, floating dust and a glossy floor.
// It can also morph into the "otherworld" battle variant via setMood().
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import * as T from './textures.js';
import { lerp } from '../core/math.js';

export const HALL = {
  minX: -3,
  maxX: 3,
  minZ: 0,
  maxZ: 36,
  height: 3.3,
};

const SUN_DIR = new THREE.Vector3(-1, -0.52, -0.38).normalize(); // light travel direction

export class SchoolHallway {
  constructor(renderer, { quality = 'high' } = {}) {
    this.renderer = renderer;
    this.quality = quality;
    this.group = new THREE.Group();
    this.group.name = 'hallway';
    this.colliders = []; // AABBs in XZ: {minX,maxX,minZ,maxZ}
    this.animated = [];
    this.mood = 0;
    this.time = 0;

    this._materials();
    this._shell();
    this._windowWall();
    this._doorWall();
    this._ends();
    this._ceiling();
    this._props();
    this._lighting();
    this._shafts();
    this._dust();
    this._otherworld();
  }

  // ---------------------------------------------------------------------------
  _materials() {
    const floorTex = T.floorTexture();
    floorTex.repeat.set(6, 36);
    this.mat = {
      floor: new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.32, metalness: 0.0, color: 0xf2f0e8 }),
      floorBorder: new THREE.MeshStandardMaterial({ color: 0x2f5b63, roughness: 0.35 }),
      wall: new THREE.MeshStandardMaterial({ map: T.plasterTexture(), roughness: 0.9 }),
      wainscot: new THREE.MeshStandardMaterial({ color: 0x3d6b72, roughness: 0.7 }),
      trim: new THREE.MeshStandardMaterial({ color: 0x1f2f4f, roughness: 0.55 }),
      frame: new THREE.MeshStandardMaterial({ color: 0xd7d9dc, roughness: 0.35, metalness: 0.6 }),
      wood: new THREE.MeshStandardMaterial({ map: T.woodTexture(), roughness: 0.6 }),
      ceiling: new THREE.MeshStandardMaterial({ color: 0xf2efe6, roughness: 0.95 }),
      beam: new THREE.MeshStandardMaterial({ color: 0xe6e1d5, roughness: 0.9 }),
      lightPanel: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff3dd, emissiveIntensity: 1.6 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x9fb8d8,
        transparent: true,
        opacity: 0.06,
        roughness: 0.05,
        metalness: 0.0,
        depthWrite: false,
      }),
      frosted: new THREE.MeshStandardMaterial({ color: 0xfff1d8, emissive: 0xffc98a, emissiveIntensity: 0.35, roughness: 0.4 }),
      locker: new THREE.MeshStandardMaterial({ map: T.lockerTexture('#6d86a6'), roughness: 0.45, metalness: 0.35 }),
      lockerAlt: new THREE.MeshStandardMaterial({ map: T.lockerTexture('#5f9a96'), roughness: 0.45, metalness: 0.35 }),
      cork: new THREE.MeshStandardMaterial({ color: 0xa8784d, roughness: 1 }),
      red: new THREE.MeshStandardMaterial({ color: 0xd23a4a, roughness: 0.45 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x1b2233, roughness: 0.6 }),
      cardboard: new THREE.MeshStandardMaterial({ color: 0xc69a62, roughness: 0.95 }),
      plant: new THREE.MeshStandardMaterial({ color: 0x3f7d4f, roughness: 0.8 }),
      pot: new THREE.MeshStandardMaterial({ color: 0xe9e2d6, roughness: 0.6 }),
    };
  }

  _box(w, h, d, mat, x, y, z, opts = {}) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y, z);
    m.castShadow = opts.cast ?? true;
    m.receiveShadow = opts.receive ?? true;
    if (opts.rotY) m.rotation.y = opts.rotY;
    (opts.parent || this.group).add(m);
    if (opts.collide) this.addCollider(x - w / 2, x + w / 2, z - d / 2, z + d / 2);
    return m;
  }

  addCollider(minX, maxX, minZ, maxZ) {
    this.colliders.push({ minX, maxX, minZ, maxZ });
  }

  _plane(w, h, mat, pos, rotY = 0, opts = {}) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
    m.position.copy(pos);
    m.rotation.y = rotY;
    m.receiveShadow = opts.receive ?? true;
    m.castShadow = opts.cast ?? false;
    (opts.parent || this.group).add(m);
    return m;
  }

  // ---------------------------------------------------------------------------
  _shell() {
    const { minX, maxX, minZ, maxZ, height } = HALL;
    const L = maxZ - minZ;
    const W = maxX - minX;
    const cz = (minZ + maxZ) / 2;

    // Floor with a darker border band, plus a planar reflector for gloss.
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, L), this.mat.floor);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, cz);
    floor.receiveShadow = true;
    this.group.add(floor);
    for (const x of [minX + 0.18, maxX - 0.18]) {
      const band = new THREE.Mesh(new THREE.PlaneGeometry(0.36, L), this.mat.floorBorder);
      band.rotation.x = -Math.PI / 2;
      band.position.set(x, 0.002, cz);
      band.receiveShadow = true;
      this.group.add(band);
    }

    const reflectorShader = {
      name: 'GlossFloor',
      uniforms: {
        color: { value: null },
        tDiffuse: { value: null },
        textureMatrix: { value: null },
        strength: { value: 0.32 },
        tint: { value: new THREE.Color(1, 1, 1) },
      },
      vertexShader: /* glsl */ `
        uniform mat4 textureMatrix;
        varying vec4 vUv;
        varying vec3 vWorld;
        #include <common>
        #include <logdepthbuf_pars_vertex>
        void main() {
          vUv = textureMatrix * vec4(position, 1.0);
          vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          #include <logdepthbuf_vertex>
        }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse;
        uniform float strength;
        uniform vec3 tint;
        varying vec4 vUv;
        varying vec3 vWorld;
        #include <logdepthbuf_pars_fragment>
        void main() {
          #include <logdepthbuf_fragment>
          vec3 uv = vUv.xyz / vUv.w;
          // cheap blur: 5 taps, roughened by world position noise
          float n = fract(sin(dot(floor(vWorld.xz * 40.0), vec2(12.9898, 78.233))) * 43758.5453);
          vec2 o = vec2(0.0035, 0.0045) * (0.7 + n * 0.6);
          vec4 c = texture2DProj(tDiffuse, vUv) * 0.36;
          c += texture2D(tDiffuse, uv.xy + vec2(o.x, o.y)) * 0.16;
          c += texture2D(tDiffuse, uv.xy + vec2(-o.x, o.y)) * 0.16;
          c += texture2D(tDiffuse, uv.xy + vec2(o.x, -o.y)) * 0.16;
          c += texture2D(tDiffuse, uv.xy + vec2(-o.x, -o.y)) * 0.16;
          vec3 V = normalize(cameraPosition - vWorld);
          float fres = mix(0.35, 1.0, pow(1.0 - clamp(V.y, 0.0, 1.0), 3.0));
          gl_FragColor = vec4(c.rgb * tint, strength * fres);
          #include <colorspace_fragment>
        }`,
    };
    const dpr = this.quality === 'low' ? 0.5 : Math.min(window.devicePixelRatio, 1.5);
    this.reflector = new Reflector(new THREE.PlaneGeometry(W - 0.02, L), {
      textureWidth: Math.floor(innerWidth * dpr * 0.5),
      textureHeight: Math.floor(innerHeight * dpr * 0.5),
      clipBias: 0.003,
      shader: reflectorShader,
      multisample: 0,
    });
    this.reflector.material.transparent = true;
    this.reflector.material.depthWrite = false;
    this.reflector.rotation.x = -Math.PI / 2;
    this.reflector.position.set(0, 0.004, cz);
    this.reflector.renderOrder = 1;
    this.group.add(this.reflector);

    // Ceiling
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, L), this.mat.ceiling);
    ceil.rotation.x = Math.PI / 2;
    ceil.position.set(0, height, cz);
    this.group.add(ceil);

    // Side colliders (walls) — the window wall has a radiator ledge, keep player off it.
    this.addCollider(maxX - 0.42, maxX + 1, minZ - 1, maxZ + 1);
    this.addCollider(minX - 1, minX + 0.32, minZ - 1, maxZ + 1);
    this.addCollider(minX - 1, maxX + 1, minZ - 1, minZ + 0.35);
    this.addCollider(minX - 1, maxX + 1, maxZ - 0.35, maxZ + 1);
  }

  _windowWall() {
    const { maxX, minZ, maxZ, height } = HALL;
    const x = maxX;
    const sill = 0.95;
    const top = 2.72;
    const bay = 2.4;
    const L = maxZ - minZ;
    const cz = (minZ + maxZ) / 2;

    // lower wall + wainscot + sill
    this._box(0.2, sill, L, this.mat.wainscot, x + 0.1, sill / 2, cz);
    this._box(0.34, 0.05, L, this.mat.frame, x - 0.04, sill + 0.025, cz);
    // radiator / heater cover below windows
    this._box(0.22, 0.5, L - 0.6, this.mat.frame, x - 0.18, 0.35, cz, { cast: false });
    // upper wall
    this._box(0.2, height - top, L, this.mat.wall, x + 0.1, top + (height - top) / 2, cz);
    // header trim
    this._box(0.26, 0.08, L, this.mat.frame, x - 0.02, top, cz);

    // mullions and glass per bay
    const glassH = top - sill;
    this.windowPanes = [];
    for (let z = minZ; z <= maxZ + 0.01; z += bay) {
      this._box(0.16, glassH, 0.12, this.mat.frame, x, sill + glassH / 2, z);
      if (z + bay <= maxZ + 0.01) {
        // horizontal transom bar
        this._box(0.1, 0.06, bay, this.mat.frame, x, sill + glassH * 0.62, z + bay / 2);
        // centre stile of the sliding sashes
        this._box(0.08, glassH, 0.06, this.mat.frame, x - 0.03, sill + glassH / 2, z + bay / 2);
        const pane = this._plane(bay - 0.12, glassH, this.mat.glass, new THREE.Vector3(x - 0.02, sill + glassH / 2, z + bay / 2), -Math.PI / 2, { receive: false });
        pane.renderOrder = 2;
        this.windowPanes.push(pane);
      }
    }

    // Outside: balcony rail + distant sky backdrop
    const outside = new THREE.Group();
    this.group.add(outside);
    this._box(0.06, 0.06, L, this.mat.frame, x + 1.6, 1.05, cz, { cast: false, parent: outside });
    for (let z = minZ; z <= maxZ; z += 1.2) this._box(0.04, 1.05, 0.04, this.mat.frame, x + 1.6, 0.52, z, { cast: false, parent: outside });
    const balcony = this._box(1.8, 0.1, L, this.mat.ceiling, x + 0.9, -0.05, cz, { cast: false, parent: outside });
    balcony.receiveShadow = true;

    this.skyDay = T.skyTexture('day');
    this.skyNight = T.skyTexture('night');
    this.skyMat = new THREE.ShaderMaterial({
      uniforms: { tA: { value: this.skyDay }, tB: { value: this.skyNight }, mixv: { value: 0 }, time: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);} `,
      fragmentShader: `
        uniform sampler2D tA, tB; uniform float mixv, time; varying vec2 vUv;
        void main(){
          vec2 uv = vUv;
          uv.y += sin(uv.x * 30.0 + time * 2.0) * 0.004 * mixv;
          vec4 a = texture2D(tA, uv); vec4 b = texture2D(tB, uv);
          gl_FragColor = vec4(mix(a.rgb, b.rgb, mixv) * 1.15, 1.0);
          #include <colorspace_fragment>
        }`,
      depthWrite: false,
      fog: false,
    });
    // ShaderMaterial textures are sRGB-encoded canvases; decode in shader via colorspace chunk.
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(140, 52), this.skyMat);
    sky.position.set(x + 40, 10, cz);
    sky.rotation.y = -Math.PI / 2;
    outside.add(sky);
  }

  _doorWall() {
    const { minX, minZ, maxZ, height } = HALL;
    const x = minX;
    const L = maxZ - minZ;
    const cz = (minZ + maxZ) / 2;

    // base wall
    const wall = this._plane(L, height, this.mat.wall, new THREE.Vector3(x, height / 2, cz), Math.PI / 2);
    wall.receiveShadow = true;
    // skirting
    this._box(0.04, 0.12, L, this.mat.trim, x + 0.02, 0.06, cz, { cast: false });
    // dado rail
    this._box(0.05, 0.06, L, this.mat.trim, x + 0.025, 1.0, cz, { cast: false });
    const wains = this._plane(L, 1.0, this.mat.wainscot, new THREE.Vector3(x + 0.005, 0.5, cz), Math.PI / 2);
    wains.receiveShadow = true;

    // Classrooms: [label, sub, startZ, endZ]
    const rooms = [
      ['2-A', 'CLASS 2-A', 0, 12],
      ['2-B', 'CLASS 2-B', 12, 24],
      ['S.C.', 'STUDENT COUNCIL', 24, 36],
    ];
    for (const [label, sub, z0, z1] of rooms) {
      this._door(x, z0 + 1.6);
      this._door(x, z1 - 1.6);
      // transom (frosted clerestory) windows into the room
      for (let z = z0 + 3.1; z < z1 - 3.0; z += 1.25) {
        this._box(0.06, 0.5, 1.1, this.mat.frosted, x + 0.03, 2.55, z + 0.55, { cast: false });
        this._box(0.08, 0.04, 1.18, this.mat.frame, x + 0.04, 2.31, z + 0.55, { cast: false });
        this._box(0.08, 0.04, 1.18, this.mat.frame, x + 0.04, 2.8, z + 0.55, { cast: false });
      }
      // protruding name plate above the first door
      const plateTex = T.plateTexture(label, sub);
      const plateMat = new THREE.MeshStandardMaterial({ map: plateTex, roughness: 0.6 });
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.76), [this.mat.frame, this.mat.frame, this.mat.frame, this.mat.frame, plateMat, plateMat]);
      plate.position.set(x + 0.4, 2.62, z0 + 1.6);
      plate.rotation.y = Math.PI / 2;
      plate.castShadow = true;
      this.group.add(plate);
      this._box(0.36, 0.03, 0.03, this.mat.frame, x + 0.2, 2.75, z0 + 1.6, { cast: false });
    }

    // Lockers between doors (2-A and 2-B), bulletin boards above.
    const lockerRow = (zStart, count, mat) => {
      const w = 0.42;
      for (let i = 0; i < count; i++) {
        const lz = zStart + i * w + w / 2;
        this._box(0.46, 1.82, w - 0.01, mat, x + 0.23, 0.91, lz, { cast: true });
      }
      this.addCollider(x, x + 0.5, zStart, zStart + count * w);
      // top cap
      this._box(0.48, 0.03, count * w, this.mat.trim, x + 0.24, 1.835, zStart + (count * w) / 2, { cast: false });
    };
    lockerRow(3.2, 12, this.mat.locker);
    lockerRow(15.2, 6, this.mat.lockerAlt);

    // Bulletin board + posters (2-B wall, next to the student's spot)
    const bbZ = 19.4;
    this._box(0.04, 1.1, 2.6, this.mat.cork, x + 0.03, 1.65, bbZ, { cast: false });
    this._box(0.06, 1.18, 2.68, this.mat.trim, x + 0.01, 1.65, bbZ, { cast: false });
    const posters = [
      ['festival', bbZ - 0.75, 1.68, 0.62],
      ['notice', bbZ + 0.05, 1.62, 0.6],
      ['astronomy', bbZ + 0.85, 1.7, 0.5],
    ];
    for (const [kind, pz, py, ph] of posters) {
      const m = new THREE.MeshStandardMaterial({ map: T.posterTexture(kind), roughness: 0.7 });
      const p = this._plane(ph * 0.7, ph, m, new THREE.Vector3(x + 0.06, py, pz), Math.PI / 2);
      p.rotation.z = (Math.random() - 0.5) * 0.04;
    }
    // More posters on the locker row walls (above lockers)
    for (const [kind, pz] of [['track', 4.6], ['music', 6.4], ['library', 8.2]]) {
      const m = new THREE.MeshStandardMaterial({ map: T.posterTexture(kind), roughness: 0.7 });
      this._plane(0.45, 0.64, m, new THREE.Vector3(x + 0.02, 2.25, pz), Math.PI / 2);
    }
    for (const [kind, pz] of [['festival', 28.5], ['library', 30.2]]) {
      const m = new THREE.MeshStandardMaterial({ map: T.posterTexture(kind), roughness: 0.7 });
      this._plane(0.45, 0.64, m, new THREE.Vector3(x + 0.02, 1.65, pz), Math.PI / 2);
    }

    // Fire extinguisher box
    this._box(0.16, 0.5, 0.34, this.mat.red, x + 0.08, 0.6, 26.6, { collide: true });
  }

  _door(x, z) {
    const w = 1.8;
    const h = 2.1;
    // frame
    this._box(0.1, 0.08, w + 0.16, this.mat.trim, x + 0.04, h + 0.04, z, { cast: false });
    for (const s of [-1, 1]) this._box(0.1, h, 0.08, this.mat.trim, x + 0.04, h / 2, z + s * (w / 2 + 0.04), { cast: false });
    // two sliding panels with small windows
    for (const s of [-1, 1]) {
      const pz = z + s * (w / 4);
      const panel = new THREE.Group();
      panel.position.set(x + 0.04 + (s > 0 ? 0.03 : 0), 0, pz);
      this.group.add(panel);
      this._box(0.04, h - 0.02, w / 2 - 0.02, this.mat.wood, 0, h / 2, 0, { parent: panel, cast: false });
      // window cut-out visual: dark glass + frame
      this._box(0.05, 0.6, 0.42, this.mat.dark, 0.002, 1.55, 0, { parent: panel, cast: false });
      const g = this._box(0.052, 0.56, 0.38, this.mat.frosted, 0.003, 1.55, 0, { parent: panel, cast: false });
      g.material = this.mat.frosted;
      // handle recess
      this._box(0.05, 0.16, 0.04, this.mat.trim, 0.004, 1.0, s * -0.32, { parent: panel, cast: false });
    }
  }

  _ends() {
    const { minX, maxX, minZ, maxZ, height } = HALL;
    const W = maxX - minX;
    // near end wall with motto banner, clock and trophy cabinet
    this._plane(W, height, this.mat.wall, new THREE.Vector3(0, height / 2, minZ), 0);
    this._plane(W, 1.0, this.mat.wainscot, new THREE.Vector3(0, 0.5, minZ + 0.005), 0);
    const banner = new THREE.MeshStandardMaterial({ map: T.bannerTexture(), roughness: 0.8 });
    this._plane(3.6, 0.9, banner, new THREE.Vector3(0, 2.55, minZ + 0.02), 0);
    const clock = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.06, 32), [
      this.mat.frame,
      new THREE.MeshStandardMaterial({ map: T.clockTexture(), roughness: 0.4 }),
      this.mat.frame,
    ]);
    clock.rotation.x = Math.PI / 2;
    clock.rotation.y = Math.PI;
    clock.rotation.z = Math.PI;
    clock.position.set(2.3, 2.55, minZ + 0.05);
    this.group.add(clock);
    // trophy cabinet
    this._box(1.6, 1.2, 0.4, this.mat.wood, -1.6, 0.6, minZ + 0.2, { collide: true });
    this._box(1.5, 0.5, 0.34, this.mat.glass, -1.6, 1.45, minZ + 0.2, { cast: false });
    for (let i = 0; i < 4; i++) {
      const cup = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.03, 0.18, 12),
        new THREE.MeshStandardMaterial({ color: 0xe8c063, metalness: 0.9, roughness: 0.25 })
      );
      cup.position.set(-2.1 + i * 0.33, 1.3, minZ + 0.2);
      cup.castShadow = true;
      this.group.add(cup);
    }

    // far end: stairwell doors + exit sign
    this._plane(W, height, this.mat.wall, new THREE.Vector3(0, height / 2, maxZ), Math.PI);
    this._plane(W, 1.0, this.mat.wainscot, new THREE.Vector3(0, 0.5, maxZ - 0.005), Math.PI);
    for (const s of [-1, 1]) {
      this._box(0.9, 2.2, 0.06, this.mat.trim, s * 0.47, 1.1, maxZ - 0.03, { cast: false });
      this._box(0.5, 0.7, 0.07, this.mat.frosted, s * 0.47, 1.55, maxZ - 0.035, { cast: false });
    }
    const exit = new THREE.MeshStandardMaterial({ map: T.exitSignTexture(), emissive: 0xffffff, emissiveMap: T.exitSignTexture(), emissiveIntensity: 0.9 });
    this._box(0.6, 0.22, 0.05, exit, 0, 2.5, maxZ - 0.06, { cast: false });
  }

  _ceiling() {
    const { minZ, maxZ, height } = HALL;
    this.lightPanels = [];
    for (let z = minZ + 2.4; z < maxZ; z += 2.4) {
      this._box(6, 0.18, 0.22, this.mat.beam, 0, height - 0.09, z, { cast: false });
    }
    for (let z = minZ + 3.6; z < maxZ - 1; z += 4.8) {
      const housing = this._box(0.5, 0.06, 1.3, this.mat.frame, 0, height - 0.03, z, { cast: false });
      const panel = this._box(0.42, 0.02, 1.22, this.mat.lightPanel, 0, height - 0.065, z, { cast: false, receive: false });
      this.lightPanels.push(panel);
      void housing;
    }
  }

  _props() {
    // bench below the windows
    const bz = 8.5;
    this._box(0.42, 0.06, 1.8, this.mat.wood, 2.25, 0.45, bz, { collide: true });
    for (const s of [-1, 1]) this._box(0.36, 0.42, 0.06, this.mat.trim, 2.25, 0.21, bz + s * 0.8);
    // festival boxes near the student council
    const stack = [
      [0.6, 0.45, 0.5, -2.45, 23.3, 0.1],
      [0.55, 0.4, 0.45, -2.45, 23.25, -0.15],
      [0.5, 0.35, 0.4, -2.35, 22.6, 0.3],
    ];
    let y = 0;
    stack.forEach(([w, h, d, x, z, r], i) => {
      const yy = i === 1 ? 0.45 + h / 2 : h / 2;
      this._box(w, h, d, this.mat.cardboard, x, yy, z, { rotY: r });
      y += h;
    });
    this.addCollider(-2.8, -2.05, 22.25, 23.6);
    // painted festival sign leaning on boxes
    const signMat = new THREE.MeshStandardMaterial({ map: T.posterTexture('festival'), roughness: 0.8 });
    const sign = this._plane(0.6, 0.85, signMat, new THREE.Vector3(-2.12, 0.55, 22.2), Math.PI / 2);
    sign.rotation.z = 0.12;

    // potted plants at the far end
    for (const [px, pz] of [[2.35, 34.9], [-2.35, 34.9]]) {
      this._box(0.5, 0.5, 0.5, this.mat.pot, px, 0.25, pz, { collide: true });
      for (let i = 0; i < 7; i++) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.22 + Math.random() * 0.1, 10, 8), this.mat.plant);
        leaf.position.set(px + (Math.random() - 0.5) * 0.4, 0.7 + Math.random() * 0.7, pz + (Math.random() - 0.5) * 0.4);
        leaf.scale.y = 1.4;
        leaf.castShadow = true;
        this.group.add(leaf);
      }
    }
    // rubbish bins
    for (const [bx, bz2, col] of [[-2.7, 11.2, 0x3f6f9e], [-2.7, 11.6, 0xe2a54a]]) {
      const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.15, 0.6, 18), new THREE.MeshStandardMaterial({ color: col, roughness: 0.5 }));
      bin.position.set(bx, 0.3, bz2);
      bin.castShadow = true;
      bin.receiveShadow = true;
      this.group.add(bin);
    }
    this.addCollider(-2.95, -2.5, 10.95, 11.85);
  }

  _lighting() {
    this.hemi = new THREE.HemisphereLight(0xc9c2ff, 0x6b4a3a, 1.05);
    this.group.add(this.hemi);

    this.sun = new THREE.DirectionalLight(0xffb070, 4.2);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(this.quality === 'low' ? 1024 : 2048, this.quality === 'low' ? 1024 : 2048);
    const sc = this.sun.shadow.camera;
    sc.left = -12;
    sc.right = 12;
    sc.top = 12;
    sc.bottom = -12;
    sc.near = 0.5;
    sc.far = 40;
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.03;
    this.sun.shadow.radius = 3;
    this.group.add(this.sun, this.sun.target);
    this.focus = new THREE.Vector3(0, 0, 10);

    this.fill = new THREE.DirectionalLight(0x8fa6ff, 0.55);
    this.fill.position.set(-5, 4, 20);
    this.fill.target.position.set(2, 0, 16);
    this.group.add(this.fill, this.fill.target);

    this.ambient = new THREE.AmbientLight(0xffffff, 0.15);
    this.group.add(this.ambient);
  }

  /** Keep the shadow frustum centred on the action. */
  setFocus(v) {
    this.focus.copy(v);
  }

  _shafts() {
    const { maxX, minZ, maxZ } = HALL;
    const tex = T.shaftTexture();
    this.shaftMat = new THREE.MeshBasicMaterial({
      map: tex,
      color: 0xffc489,
      transparent: true,
      opacity: 0.13,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      fog: false,
    });
    this.shafts = new THREE.Group();
    this.group.add(this.shafts);
    const bay = 2.4;
    const len = 6.5;
    for (let z = minZ; z + bay <= maxZ + 0.01; z += bay) {
      for (const [y0, h] of [[1.0, 1.0], [1.95, 0.7]]) {
        const geo = new THREE.PlaneGeometry(bay - 0.3, len);
        geo.translate(0, -len / 2, 0);
        const m = new THREE.Mesh(geo, this.shaftMat);
        // basis: Y points back toward the sun, X runs along the corridor
        const yAxis = SUN_DIR.clone().negate();
        const xAxis = new THREE.Vector3(0, 0, 1).addScaledVector(yAxis, -yAxis.z).normalize();
        const zAxis = new THREE.Vector3().crossVectors(xAxis, yAxis);
        m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(xAxis, yAxis, zAxis));
        m.position.set(maxX - 0.05, y0 + h / 2, z + bay / 2);
        m.renderOrder = 3;
        this.shafts.add(m);
      }
    }
  }

  _dust() {
    const N = 420;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = HALL.minX + 0.3 + Math.random() * 5.4;
      pos[i * 3 + 1] = 0.2 + Math.random() * 2.8;
      pos[i * 3 + 2] = HALL.minZ + Math.random() * (HALL.maxZ - HALL.minZ);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.dustMat = new THREE.PointsMaterial({
      size: 0.03,
      map: T.glowTexture(),
      color: 0xffd9a8,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.dust = new THREE.Points(geo, this.dustMat);
    this.dust.frustumCulled = false;
    this.group.add(this.dust);
  }

  _otherworld() {
    // Glowing sigil disc on the floor (battle arena) — hidden by default.
    this.sigilMat = new THREE.MeshBasicMaterial({
      map: T.sigilTexture(),
      color: 0x38f5d8,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.sigil = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), this.sigilMat);
    this.sigil.rotation.x = -Math.PI / 2;
    this.sigil.position.set(0, 0.012, 18);
    this.sigil.renderOrder = 4;
    this.group.add(this.sigil);

    // Floating glass shards (instanced) that fill the corridor in the otherworld.
    const N = 160;
    const shardGeo = new THREE.TetrahedronGeometry(0.12, 0);
    shardGeo.scale(0.5, 1.8, 0.2);
    this.shardMat = new THREE.MeshStandardMaterial({
      color: 0xbff7ff,
      emissive: 0x2ad4ff,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0,
    });
    this.shards = new THREE.InstancedMesh(shardGeo, this.shardMat, N);
    this.shards.frustumCulled = false;
    this.shardData = [];
    for (let i = 0; i < N; i++) {
      this.shardData.push({
        // keep the central combat lane clear so shards never block the camera
        p: (() => {
          const high = Math.random() < 0.3;
          const side = Math.random() < 0.5 ? -1 : 1;
          const x = high ? (Math.random() - 0.5) * 5 : side * (1.55 + Math.random() * 1.15);
          const y = high ? 2.45 + Math.random() * 0.7 : 0.3 + Math.random() * 2.6;
          return new THREE.Vector3(x, y, 6 + Math.random() * 24);
        })(),
        r: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        s: 0.4 + Math.random() * 1.0,
        sp: 0.2 + Math.random() * 0.8,
      });
    }
    this.shards.visible = false;
    this.group.add(this.shards);

    this.fogColorDay = new THREE.Color(0xd9a58a);
    this.fogColorNight = new THREE.Color(0x12051e);
    this.sunDay = new THREE.Color(0xffb070);
    this.sunNight = new THREE.Color(0xff2d6a);
    this.hemiSkyDay = new THREE.Color(0xc9c2ff);
    this.hemiSkyNight = new THREE.Color(0x3a1d7a);
    this.hemiGroundDay = new THREE.Color(0x6b4a3a);
    this.hemiGroundNight = new THREE.Color(0x05232e);
    this.fillDay = new THREE.Color(0x8fa6ff);
    this.fillNight = new THREE.Color(0x29e0ff);
    this.panelDay = new THREE.Color(0xfff3dd);
    this.panelNight = new THREE.Color(0xff2d6a);
    this.reflectTintDay = new THREE.Color(1, 1, 1);
    this.reflectTintNight = new THREE.Color(0.7, 1.2, 1.4);
  }

  attachFog(scene) {
    this.scene = scene;
    scene.fog = new THREE.FogExp2(this.fogColorDay.clone(), 0.007);
  }

  setArena(center) {
    this.sigil.position.set(center.x, 0.012, center.z);
  }

  /** 0 = golden hour school, 1 = otherworld battle variant. */
  setMood(t) {
    this.mood = t;
    const c = (a, b) => a.clone().lerp(b, t);
    this.sun.color.copy(c(this.sunDay, this.sunNight));
    this.sun.intensity = lerp(4.2, 2.6, t);
    this.hemi.color.copy(c(this.hemiSkyDay, this.hemiSkyNight));
    this.hemi.groundColor.copy(c(this.hemiGroundDay, this.hemiGroundNight));
    this.hemi.intensity = lerp(1.05, 1.5, t);
    this.fill.color.copy(c(this.fillDay, this.fillNight));
    this.fill.intensity = lerp(0.55, 2.2, t);
    this.mat.lightPanel.emissive.copy(c(this.panelDay, this.panelNight));
    this.mat.lightPanel.emissiveIntensity = lerp(1.6, 0.9, t);
    this.mat.frosted.emissive.copy(c(new THREE.Color(0xffc98a), new THREE.Color(0x6a1dff)));
    this.skyMat.uniforms.mixv.value = t;
    this.shaftMat.opacity = lerp(0.13, 0.0, Math.min(1, t * 2));
    this.dustMat.color.copy(c(new THREE.Color(0xffd9a8), new THREE.Color(0x7ff6ff)));
    this.sigilMat.opacity = Math.max(0, (t - 0.4) / 0.6) * 0.85;
    this.shardMat.opacity = Math.max(0, (t - 0.3) / 0.7) * 0.85;
    this.shards.visible = t > 0.3;
    this.reflector.material.uniforms.strength.value = lerp(0.3, 0.55, t);
    this.reflector.material.uniforms.tint.value.copy(c(this.reflectTintDay, this.reflectTintNight));
    if (this.scene?.fog) {
      this.scene.fog.color.copy(c(this.fogColorDay, this.fogColorNight));
      this.scene.fog.density = lerp(0.007, 0.04, t);
    }
  }

  update(dt) {
    this.time += dt;
    // sun follows the focus so the shadow map stays sharp where it matters
    const f = this.focus;
    this.sun.target.position.set(f.x, 0, f.z);
    this.sun.position.set(f.x, 0, f.z).addScaledVector(SUN_DIR, -18);
    this.skyMat.uniforms.time.value = this.time;

    const pos = this.dust.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i) + dt * 0.03 * (0.5 + ((i * 7919) % 10) / 10);
      if (y > 3.1) y = 0.2;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(this.time * 0.3 + i) * dt * 0.02);
    }
    pos.needsUpdate = true;

    if (this.mood > 0.05) {
      this.sigil.rotation.z += dt * 0.12;
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const s = new THREE.Vector3();
      this.shardData.forEach((d, i) => {
        d.r.x += dt * d.sp * 0.6;
        d.r.y += dt * d.sp;
        const p = d.p.clone();
        p.y += Math.sin(this.time * d.sp + i) * 0.15;
        q.setFromEuler(d.r);
        s.setScalar(d.s * this.mood);
        m.compose(p, q, s);
        this.shards.setMatrixAt(i, m);
      });
      this.shards.instanceMatrix.needsUpdate = true;
    }
  }
}
