// Small developer/test API (enabled in dev builds or with ?dev in the URL). It exposes logical
// snapshots, deterministic fixtures and projected card/socket positions for browser automation.
// It never replaces real interaction: automation still drags and clicks the canvas.
import * as THREE from 'three';
import { ENEMY_KINDS, WEAPONS } from '../game/content';
import { chargeFraction } from '../game/simulation';
import type { CardId, WeaponId } from '../game/types';
import type { App } from '../main';
import { CARD_H, CARD_W, LID_TOP, socketCenter } from '../view/layout';

export function installDevApi(app: App): void {
  const enabled = import.meta.env.DEV || new URLSearchParams(location.search).has('dev');
  if (!enabled) return;
  const canvasRect = () => (app.rig.renderer.domElement as HTMLCanvasElement).getBoundingClientRect();
  const toClient = (p: THREE.Vector3) => {
    const s = app.rig.project(p);
    const r = canvasRect();
    return { x: Math.round(s.x + r.left), y: Math.round(s.y + r.top) };
  };
  const fromCanvas = (p: { x: number; y: number } | null) => {
    if (!p) return null;
    const r = canvasRect();
    return { x: Math.round(p.x + r.left), y: Math.round(p.y + r.top) };
  };
  const api = {
    snapshot() {
      const c = app.controller;
      const s = c.sim;
      return {
        phase: c.phase,
        suspended: c.suspended,
        seed: c.seed,
        tick: s.tick,
        simTime: s.simTime,
        trialIndex: s.trialIndex,
        trialTime: s.trialTime,
        clearing: s.clearing,
        hp: s.baseHp,
        kills: s.kills,
        arrivals: s.arrivals,
        spawnProgress: s.spawnProgress,
        maxHp: s.maxHp,
        mods: { ...s.mods },
        actives: s.actives.map((a) => ({ ...a })),
        speed: app.speed,
        locked: [...s.locked],
        enemies: s.enemies.map((e) => ({ id: e.id, kind: e.kind, x: e.x, z: e.z, hp: e.hp })),
        projectiles: s.projectiles.map((p) => ({ id: p.id, x: p.x, z: p.z, life: p.life })),
        slots: s.slots.map((w) => (w ? { id: w.id, defId: w.defId, slot: w.slot, elapsed: w.elapsed, charge: chargeFraction(w, s.mods), shots: w.shots } : null)),
        turn: c.turn ? JSON.parse(JSON.stringify(c.turn)) : null,
        hand: c.deck.hand.map((x) => ({ ...x })),
        drawPile: c.deck.drawPile.length,
        discard: c.deck.discard.length,
        deckSize: c.deck.size,
        transitions: c.transitions,
      };
    },
    start(seed?: number) {
      app.start(seed);
    },
    restart(seed?: number) {
      app.restart(seed);
    },
    endTurn() {
      return app.controller.endTurn();
    },
    playCard(uid: number, slot?: number) {
      return app.controller.playCard(uid, slot);
    },
    advanceTicks(n: number) {
      app.advanceTicks(n);
    },
    /** Jump the active wave clock forward (fixture only). */
    skipToTrialEnd(secondsBefore = 0.5) {
      const s = app.controller.sim;
      s.trialTime = Math.max(s.trialTime, s.trial.durationSeconds - secondsBefore);
    },
    setTrial(index: number) {
      app.controller.sim.trialIndex = index;
    },
    setHp(hp: number) {
      app.controller.sim.baseHp = hp;
    },
    unlockAll() {
      const s = app.controller.sim;
      for (let i = 0; i < 6; i++) s.unlockSlot(i);
      app.board.setLocked(s.locked);
    },
    /** Put a specific card into the hand (fixture). */
    giveCard(defId: CardId) {
      return app.controller.deck.addToHand(defId).uid;
    },
    install(slot: number, defId: WeaponId, charge = 0) {
      const w = app.controller.sim.installWeapon(slot, defId);
      w.elapsed = charge * WEAPONS[defId].interval;
      app.cards.reset();
      app.cards.syncEquipped(app.controller.sim.slots, true);
      return w.id;
    },
    spawn(kind: 'echo' | 'moth' | 'urn', x: number, z: number, hpMul = 1) {
      return app.controller.sim.spawnEnemy(kind, x, z, hpMul).id;
    },
    /** Six cards frozen at fixed charge levels for shader inspection (all sockets unlocked). */
    chargeFixture(levels = [0, 0.25, 0.5, 0.75, 0.95, 1]) {
      app.restart(4242);
      api.unlockAll();
      app.controller.endTurn();
      const sim = app.controller.sim;
      sim.spawningEnabled = false;
      const kit: WeaponId[] = ['needle', 'light', 'thread', 'bell'];
      levels.forEach((q, i) => {
        const w = sim.installWeapon(i, kit[i % 4]);
        w.elapsed = q * WEAPONS[kit[i % 4]].interval;
      });
      app.cards.reset();
      app.cards.syncEquipped(sim.slots, true);
      app.controller.pause();
      app.capture = true;
      document.body.classList.add('capture');
    },
    /** A swarm: towers in every socket and `count` durable foes walking in. */
    stressFixture(count = 300) {
      app.restart(777);
      api.unlockAll();
      app.controller.endTurn();
      const sim = app.controller.sim;
      sim.spawningEnabled = false;
      const kit: WeaponId[] = ['needle', 'light', 'thread', 'bell', 'needle', 'thread'];
      kit.forEach((id, i) => sim.installWeapon(i, id));
      app.cards.reset();
      app.cards.syncEquipped(sim.slots, true);
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 * 7.3;
        const r = 10 + (i % 13) * 1.0;
        const e = sim.spawnEnemy(ENEMY_KINDS[i % 3], Math.cos(a) * r, Math.sin(a) * r, 1);
        e.hp = e.maxHp = e.maxHp * 40;
      }
      sim.baseHp = 100000;
    },
    /**
     * Deterministic attack capture pose: towers vs a ring of durable foes; advance fixed ticks until
     * `slot`'s weapon fired `ticksAfter` ticks ago, then freeze presentation for a screenshot.
     */
    attackPose(slot = 1, ticksAfter = 3, seed = 51) {
      app.restart(seed);
      api.unlockAll();
      app.controller.endTurn();
      const sim = app.controller.sim;
      sim.spawningEnabled = false;
      sim.baseHp = 100000;
      const kit: WeaponId[] = ['needle', 'light', 'thread', 'bell', 'needle', 'thread'];
      kit.forEach((id, i) => sim.installWeapon(i, id));
      app.cards.reset();
      app.cards.syncEquipped(sim.slots, true);
      for (let i = 0; i < 60; i++) {
        const a = i * 0.41 + 0.4;
        const r = 6.5 + (i % 7) * 1.4;
        const e = sim.spawnEnemy(ENEMY_KINDS[i % 3], Math.cos(a) * r, Math.sin(a) * r, 1);
        e.hp = e.maxHp = e.maxHp * 12;
        e.speed = 0.05;
      }
      const w = sim.slots[slot]!;
      let guard = 0;
      while (guard++ < 3000) {
        app.advanceTicks(1);
        if (w.shots >= 1 && Math.round(w.elapsed / (1 / 60)) === ticksAfter) break;
      }
      app.capture = true;
      document.body.classList.add('capture');
      return { ticks: sim.tick, shots: w.shots };
    },
    /** Advance presentation-only motion (card springs, hand); simulation untouched. */
    settle(seconds = 1) {
      for (let t = 0; t < seconds; t += 1 / 60) app.update(0, 1 / 60);
    },
    setCapture(on: boolean) {
      app.capture = on;
      document.body.classList.toggle('capture', on);
    },
    handSettled() {
      return app.hand.settled();
    },
    /** Client coordinates of a hand card by uid. */
    handCardScreen(uid: number) {
      return fromCanvas(app.hand.cardScreen(uid));
    },
    offerScreen(i: number) {
      return fromCanvas(app.hand.offerScreen(i));
    },
    endTurnScreen() {
      const b = document.getElementById('btn-end-turn')!.getBoundingClientRect();
      return { x: Math.round(b.left + b.width / 2), y: Math.round(b.top + b.height / 2) };
    },
    socketScreen(slot: number) {
      const c = socketCenter(slot);
      return toClient(new THREE.Vector3(c.x, LID_TOP, c.z));
    },
    cardScreen(slot: number) {
      const w = app.controller.sim.slots[slot];
      const v = w ? app.cards.equippedView(w.id) : undefined;
      return v ? toClient(v.group.position) : null;
    },
    /** Projected size (CSS px) of an equipped card face, measured from its corners. */
    cardFacePixels(slot: number) {
      const c = socketCenter(slot);
      const hw = CARD_W / 2;
      const hh = CARD_H / 2;
      const a = toClient(new THREE.Vector3(c.x - hw, LID_TOP, c.z + hh));
      const b = toClient(new THREE.Vector3(c.x + hw, LID_TOP, c.z + hh));
      const t = toClient(new THREE.Vector3(c.x, LID_TOP, c.z - hh));
      const bot = toClient(new THREE.Vector3(c.x, LID_TOP, c.z + hh));
      return { width: Math.hypot(b.x - a.x, b.y - a.y), height: Math.hypot(t.x - bot.x, t.y - bot.y) };
    },
    /** Camera frustum (to prove it does not change between phases). */
    frustum() {
      const cam = app.rig.camera;
      return { left: +cam.left.toFixed(4), right: +cam.right.toFixed(4), top: +cam.top.toFixed(4), bottom: +cam.bottom.toFixed(4), zoom: app.rig.zoomLevel };
    },
    resources() {
      const info = app.rig.renderer.info;
      return {
        geometries: info.memory.geometries,
        textures: info.memory.textures,
        programs: info.programs?.length ?? 0,
        calls: info.render.calls,
        triangles: info.render.triangles,
        listeners: app.listenerCount,
        voices: app.audio.activeVoices,
        cards: app.cards.liveCount(),
        handCards: app.hand.liveCount(),
        enemyVisuals: app.enemies.liveVisuals(),
        effects: { ...app.effects.stats },
        loops: app.loops,
        sceneChildren: app.rig.scene.children.length,
      };
    },
    perf() {
      const f = app.frameTimes.slice(-240);
      const simRate = app.simRate();
      const sorted = [...f].sort((a, b) => a - b);
      const avg = f.reduce((s, x) => s + x, 0) / Math.max(1, f.length);
      return {
        frames: f.length,
        simSecondsPerWallSecond: simRate,
        avgMs: +avg.toFixed(2),
        p95Ms: +(sorted[Math.floor(sorted.length * 0.95)] ?? 0).toFixed(2),
        maxMs: +(sorted[sorted.length - 1] ?? 0).toFixed(2),
        updateMs: +(app.cpuTimes.reduce((s, x) => s + x[0], 0) / Math.max(1, app.cpuTimes.length)).toFixed(2),
        renderSubmitMs: +(app.cpuTimes.reduce((s, x) => s + x[1], 0) / Math.max(1, app.cpuTimes.length)).toFixed(2),
        dpr: app.rig.renderer.getPixelRatio(),
        quality: app.rig.quality,
        viewport: app.rig.viewport,
      };
    },
    setQuality(q: 'high' | 'low') {
      app.setQuality(q);
    },
    simulateHidden() {
      app.input.cancelDrag('hidden');
      app.controller.suspend();
    },
  };
  (window as unknown as { __PALIMPSEST__: typeof api }).__PALIMPSEST__ = api;
  (window as unknown as { __PALIMPSEST_APP__: App }).__PALIMPSEST_APP__ = app;
}
