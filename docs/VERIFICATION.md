# Verification evidence

Environment used for every check below: Linux container, Node 22.22.0, npm 10.9.4, Chromium
build 1194 via Playwright 1.56.1, **no GPU** — WebGL2 runs on ANGLE → SwiftShader (a CPU
rasterizer, 4 cores): `ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)`.

> **Performance caveat.** SwiftShader renders this scene at roughly 2–4 frames per second, so the
> browser simulation advances at ~35% of real time at 960×540 Low (≈ 20% at 1280×720 High) — the
> game correctly clamps each frame to 0.1 s and ≤ 6 fixed steps instead of catching up. These
> timings say nothing about desktop GPU performance. **Real-GPU frame rate at 1920×1080 is
> unverified**; see "Not verified" below.

## Commands

| Command | Result |
|---|---|
| `npm ci` | lockfile install, 0 vulnerabilities reported |
| `npm run typecheck` | passes (TypeScript 5.9.3, `strict`, `noUnusedLocals/Parameters`) |
| `npm test` | **38/38** Vitest tests pass (`tests/simulation.test.ts`, `tests/phases.test.ts`, `tests/balance.report.test.ts`) |
| `npm run build` | passes; `dist/` ≈ 730 kB JS (195 kB gzip) + 5 bundled woff fonts; relative base |
| `npm run preview` | production build served and used for the two full runs below |
| `npm run balance` | table in `docs/TUNING.md` |
| `npm run smoke` | Playwright suite (results below; raw report: `docs/evidence/smoke-report.json`) |
| `node tools/fullrun.mjs <url> low - 960x540` | complete eight-trial runs with ordinary inputs (reports in `docs/evidence/`) |

## Deterministic simulation checks (Vitest)

| Required check | Evidence |
|---|---|
| Cadence and charge authority | 1.2 s Needle fires **10 times in 720 ticks** with a persistent target. 30/60/144/45.7 FPS frame schedules fed through `FixedStepClock` produce identical shot counts and HP up to a common tick; endpoints within one tick. Paused frames add 0 ticks. A 5 s stall advances exactly 6 steps. |
| Ready with no target | Last Light reaches q = 1 and holds with 0 shots; on reacquisition fires once, `elapsed` is exactly 0, the next shot comes 180 ticks later. |
| Six equivalent sockets | Same six stable-ID instances permuted across slots (`[5,4,3,2,1,0]`, `[1,2,3,4,5,0]`, `[3,0,5,1,4,2]`) produce identical fire logs (time, weapon id, targets), damage/death/arrival logs and Base HP. Duplicate Needles charge independently. |
| Atomic card actions | Controller tests: invalid slot, nothing-selected, double commit, double Replace, cancel replacement, full-Base replacement (exactly 6 distinct instances), boon onto a socket (rejected, sockets unchanged), Continue locked until settled. |
| Freeze / resume | 600 frames of a frozen draft leave tick, enemies, projectiles, spawn progress, weapon charge and HP byte-identical; Continue preserves survivor IDs and residual charge, new weapon starts at 0. |
| Damage and endings | Needle travel/hit, single retarget, launch damage kept after replacement; chain 12/9/7 to distinct foes within hop range (cap 3, no revisit); Bell readiness gated by radius; Polished Memory ×1.3; instant kill skipped by the next weapon; death prevents same-tick contact; edge and corner contact deduct once without kill credit; defeat overrides a simultaneous boundary; trial 8 → clearing with no spawns → victory. |
| Offers | 400 seeds × 7 drafts: three distinct IDs, ≥ 2 weapons, weapons only in drafts 1–2, an unowned type whenever one exists, capped Polish and full-HP Mend excluded. Offer/spawn RNG streams unaffected by cosmetic draws. |

## Browser checks (Playwright on the real canvas and DOM)

Latest `npm run smoke` run (dev server, 1280×720 unless noted). Interactions are real mouse
moves/drags/clicks on the canvas and real DOM button clicks; fixtures are used only to *reach*
states quickly and are labelled.

Run started 2026-10-08T11:22:02.593Z, finished 2026-10-08T11:35:09.004Z: **40/40 checks passed**, 0 console errors.

| | Check | Detail |
|---|---|---|
| ✔ | WebGL2 context available | {"renderer":"ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)"} |
| ✔ | Start button begins COMBAT with one Memory Needle and five empty sockets |  |
| ✔ | Normal-time combat advances simulation and weapons fire | {"simTime":9.62,"shots":4,"enemies":0} |
| ✔ | Draft freezes enemies, projectiles, spawn progress, charge and damage over 3 s wall-clock | {"enemiesFrozen":4,"tick":592} |
| ✔ | Boundary lands exactly on the trial duration | {"trialTime":30} |
| ✔ | First draft offers three distinct weapon cards | {"offer":["thread","light","needle"]} |
| ✔ | Invalid drop returns the card without consuming the reward | {"stage":"placing"} |
| ✔ | Pointer cancellation returns the dragged card unconsumed |  |
| ✔ | Click-select + click-socket equips; double click cannot duplicate | {"stage":"settling"} |
| ✔ | Continue is locked while the card settles |  |
| ✔ | Continue resumes the same encounter at the next trial exactly once | {"trialIndex":1} |
| ✔ | Survivors and residual charge are preserved across the draft | {"survivors":4,"residual":0.233} |
| ✔ | Manual pause freezes the encounter |  |
| ✔ | Visibility loss suspends without catch-up and requires Resume |  |
| ✔ | Dropping onto an occupied socket asks for Replace and keeps the old weapon |  |
| ✔ | Cancel replacement preserves the old card and returns to the unresolved choice |  |
| ✔ | Drag-to-empty-socket equips through the physical card |  |
| ✔ | Two complete combat/draft cycles completed through real input |  |
| ✔ | Restart from a pending draft resets health, phase, build and trial |  |
| ✔ | Dragging a boon onto a socket never creates or occupies a weapon (fixture: seed search) | {"boon":"mend"} |
| ✔ | Use resolves the boon immediately and enables Continue | {"hp":80,"polish":0} |
| ✔ | A boon offer was reachable |  |
| ✔ | Full-Base replacement is atomic: exactly six weapons, new instance at zero charge |  |
| ✔ | Pause with a projectile in flight freezes its position (fixture) |  |
| ✔ | Edge arrival deals contact damage once and defeat triggers once |  |
| ✔ | Restart from defeat yields a fresh run |  |
| ✔ | Trial 8 clears without new spawns and ends in VICTORY (fixture) | {"phase":"VICTORY"} |
| ✔ | Restart from victory yields a fresh run |  |
| ✔ | Ten restarts reach a stable resource plateau with one loop | {"first":{"geometries":79,"textures":39,"programs":35,"calls":111,"triangles":58856,"listeners":5,"voices":0,"cards":1,"enemyVisuals":0,"… |
| ✔ | 1280x720: equipped card face ≥ ~70x80 CSS px and all sockets on screen | {"face":{"w":72.7,"h":81.4}} |
| ✔ | 1280x720: tray and sockets are clear of the draft panel and HUD | {"panelLeft":936} |
| ✔ | Low quality toggles without breaking the draft |  |
| ✔ | 1366x768: equipped card face ≥ ~70x80 CSS px and all sockets on screen | {"face":{"w":77.6,"h":87.5}} |
| ✔ | 1366x768: tray and sockets are clear of the draft panel and HUD | {"panelLeft":1022} |
| ✔ | 1920x1080: equipped card face ≥ ~70x80 CSS px and all sockets on screen | {"face":{"w":114,"h":128.3}} |
| ✔ | 1920x1080: tray and sockets are clear of the draft panel and HUD | {"panelLeft":1576} |
| ✔ | Charge fixture holds six independent fills at 0/.25/.5/.75/.95/1 |  |
| ✔ | Each card owns its own charge material/uniform | {"values":[0,0.25,0.5,0.75,0.95,1],"distinctMaterials":6,"distinctUniformObjects":6} |
| ✔ | Stress fixture (6 weapons, 80 enemies) keeps HUD input responsive and effects bounded (software GPU) | {"perf":{"frames":7,"simSecondsPerWallSecond":0.035,"avgMs":2247.53,"p95Ms":5766.5,"maxMs":5766.5,"updateMs":3.78,"renderSubmitMs":774.25… |
| ✔ | No page errors or shader errors in the console | {"sample":[]} |

### Complete runs with ordinary inputs (production build)

`tools/fullrun.mjs` plays a whole run with only real input: canvas drags and click-select/
click-socket placements (alternating), **Replace**, **Use** for boons, **Continue**, and the
end-screen **Restart**. No fast-forward, no fixtures (it reads the logical snapshot only to choose
like a player would and to log evidence). 960×540, Low quality, because of the SwiftShader speed.

| Run | Seed | Draft actions | Outcome | Sim time | Wall time | Console errors | Restart after ending |
|---|---|---|---|---|---|---|---|
| 1 (pre-tuning finale) | 419979565 | 7 drafts: 5 placements (drag + click), 2× Polished Memory | **DEFEAT** in trial 8 (Integrity 94 → 0, 171 kills, 9 arrivals) | 233.4 s | 733 s | 0 | ✔ fresh run |
| 2 (current tuning) | 35665099 | 7 drafts: 4 placements, 2× Polished Memory, 1× Mend | **VICTORY** (Integrity 70, 189 kills, 5 arrivals), aperture opened | 246.0 s | 752 s | 0 | ✔ fresh run |

Run 1 exposed an unfair difficulty cliff (see `docs/TUNING.md`); the urn trial and finale were
softened before run 2. Per-draft logs (offer, action, build, Integrity, survivors carried over)
are in `docs/evidence/fullrun-run1-defeat.json` and `docs/evidence/fullrun-run2-victory.json`.
These runs prove the full loop with ordinary inputs; because SwiftShader runs the simulation at
~35% of real time they are **not** evidence of real-time pacing feel.

## Screenshots (`docs/screenshots/`)

| File | Shows |
|---|---|
| `01-title.png` | title plate with the stakes line |
| `02-initial-combat.png` | first trial in normal-time combat |
| `03-draft-choices.png` | frozen draft: three raised cards on the tray rail, all six sockets clear, detail panel |
| `04-replace-preview.png` | occupied-socket drop → old/new comparison, Replace/Cancel |
| `05-six-slots-draft.png`, `06-six-slots-combat.png` | full six-slot Base with varied fills |
| `07-attack-lance.png`, `07-attack-thread.png`, `07-attack-bell.png`, `07-attack-needle.png` | deterministic attack poses for each weapon archetype |
| `08-defeat.png`, `09-victory.png` | endings (fixture-reached) |
| `10-combat-*.png`, `11-draft-*.png` | 1280×720, 1366×768, 1920×1080 |
| `12-draft-low-quality-1280x720.png` | Low quality (no bloom, no MSAA, 1024 shadows) |
| `13-charge-fixture-high.png`, `14-charge-fixture-bloom-off.png` | six independent fills at 0/.25/.50/.75/.95/1, with and without bloom |
| `15-stress-1920x1080.png` | six weapons vs 80 enemies |
| `16-fullrun-after-two-drafts.png`, `17-fullrun-victory.png`, `17-fullrun-defeat.png` | from the ordinary-input full runs (run 2 victory, run 1 defeat) |

## Review passes

**Pass 1 — clarity, gameplay, input (problems found → fixes):**

* Title plate overflowed at 1280 px → smaller letter-spacing and wider plate.
* Board fit used the outer rim, making equipped faces ~65 px wide → camera now fits the spawn
  ring (every approach) plus the Base; faces measure 72.7 × 81.4 px at 1280×720.
* The draft tray overlapped the near row of sockets → tray lowered toward the viewer; automated
  check confirms tray and all six sockets are clear of the panel/HUD at all three resolutions.
* Draft panel hid **Continue** when the socket list was shown → sticky action row.
* The memory stack sat under the draft panel → moved to the free left side of the board.
* Crowd builds lost every scripted run; finale cliff in full run 1 → retuned (see TUNING.md).
* Fixture captures showed effects missing because interpolation α was stale → fixtures reset
  the clock and capture mode renders the authoritative state.
* Placement-landing motes aged in simulation time and froze mid-air during drafts → moved to
  the presentation-time pool.
* Test harness pressed cards that were still rising → `offersSettled()` query.

**Pass 2 — materials, artwork, lighting, silhouettes, effect envelopes:**

* Charge overlay washed card art pale (white filaments, light tint) → deep-turquoise normal-blend
  tint, filaments ×0.3, edge ×0.5; meniscus stays the brightest element; legible with bloom off.
* Release pulse whitened the whole face → edge-weighted pulse; bloom strength 0.42 → 0.30,
  threshold 1.05 → 1.10.
* Veiled Echo read as an egg on a blob → taller tapering rippled veil, larger tilted mask with
  bigger eye slits, brass halo; all miniatures scaled up visually (logic radii unchanged).
* Burden Urn bands lacked contrast → thicker dark-brass bands, enamel lid.
* Bell ring was hidden under the Base and then rendered as a filled disc → ring starts at the
  Base walls with a narrow trailing ripple, plus a small emitter ring above the lid; foes in the
  pulse get a brief visual lift.
* Needle projectile flew inside the Base box and was too small → it leaves the emitter above the
  lid and descends once clear of the footprint; longer head and trail.
* Card faces over-exposed → face albedo and sun intensity reduced.
* Ceramic body read as a glaring white strip → warmer, rougher ceramic, brass frieze and
  engraved medallion plates.
* Draw calls: static socket floors/lips, pilasters, prongs and the memory stack baked into single
  meshes; aperture lights instanced; hidden halos skipped → 119 calls with 80 enemies + 6 cards.

## Performance record (honest)

| Scenario | Viewport / DPR | Quality | Frame time (SwiftShader) | Notes |
|---|---|---|---|---|
| Normal play | 960×540 / 1 | Low | ~270–290 ms avg (≈ 3.5 fps) | sim ≈ 0.35× real time |
| Normal play | 1280×720 / 1 | Low | ~450–740 ms | sim ≈ 0.23× |
| Stress: 6 weapons + 80 enemies | 1920×1080 / 1 | High | 1–2 s | 119 draw calls, ~270k triangles, JS update ≈ 2.6 ms/frame, Pause click → PAUSED observed after ~4 s (dominated by the software frame) |

JS per-frame update cost stays ~0.7 ms in normal play and ~2.6 ms in the stress fixture; the
rest is SwiftShader rasterization. Cosmetic pools never dropped simulation work (pool stats are
reported by `__PALIMPSEST__.resources()`).

## Not verified (needs a real GPU / human)

* 60 FPS at 1920×1080 on a desktop GPU, and High-quality frame pacing in general.
* Real-time *feel* of a 30-second trial, card-spring timing at 60/144 Hz, camera impulse feel.
* Audio: the Web Audio graph is created and voices are counted (≤ 14 cap), but nothing was
  listened to in this headless environment.
* Real tab switching (`visibilitychange`): automated checks call the same suspension path through
  `__PALIMPSEST__.simulateHidden()`; the DOM listener itself was not exercised.
* Touch/pen input and browsers other than Chromium.

### Manual checklist for a GPU machine

1. `npm ci && npm run dev`, open http://127.0.0.1:5173 in desktop Chrome/Firefox/Safari.
2. Check the frame rate (DevTools Performance or `__PALIMPSEST__.perf()` with `?dev`) at
   1920×1080 High during trial 5–8; toggle **Quality: Low** and compare.
3. Play two trials: confirm card fills rise smoothly bottom→top, the release pulse and conduit
   line coincide with each shot, the four weapon sounds are distinct, Mute and volume work.
4. Switch tabs mid-trial and mid-draft: on return the **Resume** overlay appears and nothing
   advanced.
5. Drag a card, then press Esc / alt-tab mid-drag: the card returns to the tray unconsumed.
6. Finish a run (or use `?dev` + `__PALIMPSEST__.setTrial(7)`) to see the aperture open and the
   soul rise; then Restart.
