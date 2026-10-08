# Verification evidence (v2: turn loop, swarm arena, wooden table)

Environment for every check: Linux container, Node 22, Chromium via Playwright 1.56.1, **no GPU**.
WebGL2 runs on ANGLE → SwiftShader, a CPU rasterizer:
`ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)`.

> **Performance caveat.** SwiftShader renders this scene at a few frames per second (seconds per
> frame in the 300-foe stress case). The game clamps each frame to 0.1 s and at most 6 fixed steps,
> so in this environment the simulation runs much slower than real time. These numbers say nothing
> about desktop GPU performance. **Real-GPU frame rate is unverified.**

## Commands

| Command | Result |
|---|---|
| `npm run typecheck` | passes (strict) |
| `npm test` | **50/50** Vitest tests pass (`simulation`, `deck`, `phases`, balance report) |
| `npm run build` | passes, ≈ 750 kB JS (≈ 200 kB gzip) + bundled fonts; published to the repo root for Pages |
| `npm run balance` | table in `docs/TUNING.md` (placeholder balance) |
| `npm run smoke` | **34/34** checks, 0 console errors (`docs/evidence/smoke-report.json`) |
| `node tools/fullrun.mjs <preview> low - 960x540` | one whole run with ordinary inputs (see below) |

## Deterministic checks (Vitest)

* **Turn rules:** opening hand of 4 always contains the tower; 6 energy per turn; tower 3 / common 1;
  overspending refused; End Turn discards the hand; empty draw pile reshuffles the discard.
* **Sacrifice / purge:** two marked → three offers; a matching pair guarantees that card among
  them; unlimited sacrifices; one purge per turn; a third mark replaces the oldest.
* **Sockets:** locked sockets reject towers; replacing destroys the old tower; Quicken needs a tower.
* **Soft collision:** deterministic for a seed, stable-ID order, capped pushes, never pushes a foe
  into the Base, no contact damage from a push.
* **Freeze:** a turn leaves tick, foes, projectiles, spawn progress, charge and Integrity
  byte-identical; Scatter Ash resolves at step 0 of the next wave.
* Earlier v1 guarantees retained: fixed-step cadence across frame schedules, socket equivalence,
  damage/ending order, defeat overriding a simultaneous boundary.

## Browser checks (`npm run smoke`, dev server, 1280×720 unless noted)

Real mouse moves, drags, clicks and right-clicks on the canvas and real DOM buttons. Fixtures only
*reach* states quickly (defeat, victory, charge poses, swarm stress) and are labelled.
Run 2026-10-08T18:37:07.614Z: **34/34 passed**.

| | Check |
|---|---|
| ✔ | WebGL2 context available |
| ✔ | A run opens with a turn: 4 cards incl. the Needle tower, 6 energy, 2 open sockets |
| ✔ | Hovering a hand card shows its 14px tooltip and the tower range preview |
| ✔ | Dropping a tower on a locked socket is refused and the card stays in hand |
| ✔ | Dragging the Needle into an open socket places it for 3 energy and removes it from the deck cycle |
| ✔ | Clicking an active/passive card plays it for 1 energy and sends it to the discard pile |
| ✔ | Right-clicking two cards marks them and offers Sacrifice |
| ✔ | Sacrifice removes both cards and presents three offers |
| ✔ | Choosing an offer adds it to the hand (deck net −1) |
| ✔ | Purge removes one marked card from the deck |
| ✔ | A second purge in the same turn is not offered |
| ✔ | End Turn discards the hand and starts wave 1 |
| ✔ | Normal-time combat advances the simulation and foes walk in from the far ring |
| ✔ | Foes reach tower range and the tower fires |
| ✔ | Hovering a placed tower shows its attack range outline |
| ✔ | Pause freezes the wave and dims lingering effects |
| ✔ | The wave boundary opens a turn: draw 4, energy 6 |
| ✔ | The camera frustum is identical in turn, combat and the next turn (no auto zoom) |
| ✔ | A turn freezes enemies, projectiles, spawn progress, charge and Integrity |
| ✔ | Dropping a tower on an occupied socket asks to Replace and keeps the old tower |
| ✔ | Replace installs the new tower at zero charge and destroys the old one |
| ✔ | Visibility loss during a turn suspends input until Resume |
| ✔ | Restart resets health, deck, sockets and wave |
| ✔ | Contact damage ends the run in DEFEAT exactly once |
| ✔ | Restart from defeat yields a fresh run |
| ✔ | Wave 8 clears into VICTORY (fixture) |
| ✔ | Ten restarts reach a stable resource plateau with one loop |
| ✔ | 1280x720: hand cards and all sockets on screen |
| ✔ | Low quality toggles without breaking the turn |
| ✔ | 1366x768: hand cards and all sockets on screen |
| ✔ | 1920x1080: hand cards and all sockets on screen |
| ✔ | Charge fixture holds six independent fills at 0/.25/.5/.75/.95/1 |
| ✔ | Swarm stress (6 towers, 300 foes with soft collision) keeps HUD input responsive (software GPU) |
| ✔ | No page errors or shader errors in the console |

## Full run with ordinary inputs

`node tools/fullrun.mjs http://127.0.0.1:4173/ low - 960x540` against the production build: real
canvas drags, clicks and right-clicks plus DOM buttons, with no fast-forward and no fixtures. The
logical snapshot is only read to decide moves and to log evidence. Every tower placement is
verified against the simulation.

* **Turn 0:** placed the Needle by drag into socket 2. Sacrificed Polish + Quicken, chose Last Light
  from the three offers, and placed it in socket 5 (energy 6 → 0).
* **Turns 1–7:** played actives and passives by click (Quicken by click → tower click), then End Turn.
  Integrity after each turn: 100, 100, 100, 100, 82, 54, 6. Up to 40 foes were frozen on the board
  during a turn.
* **Outcome: DEFEAT in wave 8** after 198 kills and 42 arrivals (237.5 s of simulation, 1173 s of
  wall time). Restart then produced a fresh run (Integrity 100, 10-card deck, empty sockets).
  0 console errors.

With only two sockets and the placeholder balance, losing late is expected (`docs/TUNING.md`:
the scripted "seeker" policy wins 6/20). Per-turn log: `docs/evidence/fullrun-defeat.json`.
Because SwiftShader runs the simulation far below real time, this run is **not** evidence of
real-time pacing feel.

## Screenshots (`docs/screenshots/`)

| File | Shows |
|---|---|
| `01-title.png` | title plate |
| `02-turn-tucked-hand.png`, `03-turn-hand-raised.png` | opening turn: the hand tucks away and rises on approach |
| `04-sacrifice-offers.png` | 1-of-3 choice after a sacrifice |
| `05-combat-range-hover.png` | combat with a placed tower's range outline |
| `06-turn-with-frozen-swarm.png` | a turn over a frozen board; hand drawn over everything |
| `07-defeat.png`, `08-victory.png` | endings (fixture-reached) |
| `09-attack-*.png` | attack poses for each tower |
| `10-turn-*.png`, `11-turn-low-quality-1280x720.png` | 1280×720, 1366×768, 1920×1080, Low quality |
| `12-charge-fixture.png` | six independent charge fills |
| `13-swarm-stress-1920x1080.png` | six towers vs 300 foes with soft collision |
| `14`–`16-fullrun-*.png` | from the ordinary-input full run |

## Problems found during verification (→ fixes)

* Foes need ~11 s to reach tower range in the larger arena → the smoke check now waits for
  foes to arrive before asserting shots.
* Hand hover flickered at the bottom edge (a lifted card moved out from under the pointer) →
  hand picking now uses each card's resting fan slice, so lifting never moves the hit area.
* After **Begin**, the title overlay lingered until the next HUD frame and swallowed the first
  pointer move, so the hand did not rise (the full run's first tower drag missed) → the overlay
  hides on click.
* Energy panel clipped at 960 px → tooltip/panel placement clamps to the viewport.
* Game pieces too small / moths too dark at the new scale → larger visual scale, brighter wings.

## Performance record (SwiftShader, honest)

| Scenario | Viewport | Quality | Result |
|---|---|---|---|
| Swarm stress: 6 towers, ~300 foes | 1920×1080 | High | ~2.5 s avg frame, 131 draw calls, ~257k triangles, JS update ≈ 3.2 ms/frame; Pause reached after ~10 s (dominated by the software frame) |
| Normal play | 960×540 | Low | a few fps; the simulation runs well below real time |

JS update cost stays a few milliseconds even with 300 foes and soft collision; the rest is
software rasterization.

## Not verified (needs a real GPU / a human)

* 60 FPS at 1920×1080 on a desktop GPU; real-time feel of a 30-second wave.
* Audio (the graph is built and voices counted, but nothing was listened to).
* Real tab switching (checked through the same suspension path via the dev API).
* Touch/pen input and non-Chromium browsers.

### Manual checklist for a GPU machine

1. `npm ci && npm run dev`, open http://127.0.0.1:5173.
2. Opening turn: the hand rises when the pointer nears it; drag the Needle into an open socket;
   right-click two cards → Sacrifice → choose; right-click one → Purge.
3. End Turn and watch wave 1: pieces walk in from the far ring and spread out; hover the placed
   tower to see its range.
4. Check frame rate in waves 5–8 at 1920×1080 High (`?dev`, `__PALIMPSEST__.perf()`).
