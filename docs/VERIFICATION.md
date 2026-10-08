# Verification evidence (v3: candle light and fog, permanent passives/actives, stat tooltips)

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
| `npm test` | **60/60** Vitest tests pass (`simulation`, `deck`, `phases`, balance report) |
| `npm run build` | passes, ≈ 750 kB JS (≈ 200 kB gzip) + bundled fonts; published to the repo root for Pages |
| `npm run balance` | table in `docs/TUNING.md` (placeholder balance) |
| `npm run smoke` | **42/42** checks, 0 console errors (`docs/evidence/smoke-report.json`) |
| `node tools/fullrun.mjs <preview> low - 960x540` | one whole run with ordinary inputs (see below) |

## Deterministic checks (Vitest)

* **Turn rules:** opening hand of 4 always contains the tower; 6 energy per turn; tower 3 / common 1;
  overspending refused; End Turn discards the hand; empty draw pile reshuffles the discard.
* **Passives / actives:** passives add permanent modifiers (+5% attack speed shortens the interval,
  +5% damage and range multiply, max Integrity raises the cap and restores the added amount); a
  played passive goes to the discard pile and stacks again when replayed; actives and towers
  leave the deck. Stray Memory hits a random foe for exactly 50% of the average tower
  DPS; a second copy halves the cooldown; actives hold with nothing to do (no foes, no towers, full
  Integrity). Tower stats (damage, DPS, attack speed, range, projectiles) follow the modifiers.
* **Dust:** a deck under 4 cards is topped up with Dust at the start of a turn (the opening tower
  guarantee still holds); Dust cannot be played, is never offered, and can be sacrificed or purged.
* **Time speed:** 1×/2×/3× run 60/120/180 fixed steps for the same 60 frames.
* **Sacrifice / purge:** two marked → three offers; a matching pair guarantees that card among
  them; unlimited sacrifices; one purge per turn; a third mark replaces the oldest.
* **Sockets:** locked sockets reject towers; replacing destroys the old tower; spells never need a target.
* **Soft collision:** deterministic for a seed, stable-ID order, capped pushes, never pushes a foe
  into the Base, no contact damage from a push.
* **Freeze:** a turn leaves tick, foes, projectiles, spawn progress, charge and Integrity
  byte-identical.
* Earlier v1 guarantees retained: fixed-step cadence across frame schedules, socket equivalence,
  damage/ending order, defeat overriding a simultaneous boundary.

## Browser checks (`npm run smoke`, dev server, 1280×720 unless noted)

Real mouse moves, drags, clicks and right-clicks on the canvas and real DOM buttons. Fixtures only
*reach* states quickly (defeat, victory, charge poses, swarm stress) and are labelled.
Run 2026-10-08T20:48:36.891Z: **42/42 passed**.

| | Check |
|---|---|
| ✔ | WebGL2 context available |
| ✔ | A run opens with a turn: 4 cards incl. the Needle tower, 6 energy, 2 open sockets |
| ✔ | Hovering a hand card shows its 14px tooltip and the tower range preview |
| ✔ | Dropping a tower on a locked socket is refused and the card stays in hand |
| ✔ | Dragging the Needle into an open socket places it for 3 energy and removes it from the deck cycle |
| ✔ | Clicking a passive plays it for 1 energy, applies +5% damage permanently and sends the card to the discard pile |
| ✔ | Hovering a placed tower lists Damage, DPS, Attack speed, Range, Target and Projectiles with modifiers applied |
| ✔ | Clicking Dust does not play it and costs nothing |
| ✔ | Playing an active card installs it with a cooldown icon at the top of the screen |
| ✔ | During a turn the modifier panel lists the current modifiers |
| ✔ | Right-clicking two cards marks them and offers Sacrifice |
| ✔ | Sacrifice removes both cards and presents three offers |
| ✔ | Choosing an offer adds it to the hand (deck net −1) |
| ✔ | Purge removes one marked card from the deck |
| ✔ | A second purge in the same turn is not offered |
| ✔ | End Turn discards the hand and starts wave 1 |
| ✔ | During a wave the modifier panel is hidden until Tab |
| ✔ | Tab shows the modifier panel during a wave |
| ✔ | Normal-time combat advances the simulation and foes walk in from the far ring |
| ✔ | Foes reach tower range and the tower fires |
| ✔ | Hovering a placed tower shows its attack range outline |
| ✔ | The 3× speed button sets time speed 3 |
| ✔ | The 1× speed button restores normal speed |
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
canvas drags, clicks and right-clicks plus DOM buttons, with no dev fast-forward and no fixtures.
After the first End Turn it presses the in-game **3×** button, as an impatient player would. The
logical snapshot is only read to decide moves and to log evidence. Every tower placement is
verified against the simulation.

* **Turn 0:** placed the Needle by drag. Sacrificed Stray Memory + Sturdy Vessel and chose
  Kindred Thread, then placed it in the second open socket.
* **Turns 1–7:** played four cards a turn by click. Passives returned through the discard pile
  and stacked again, reaching +60% damage, +50% attack speed and +20% range by turn 7, with
  Stray Memory and Mend the Vessel in play. The deck held 5 cards, so no Dust was needed.
* **Outcome: VICTORY** at 100 Integrity: 286 kills, 0 arrivals (256 s of simulation, 538 s of
  wall time at 3×). Restart then produced a fresh run. 0 console errors.

Per-turn log: `docs/evidence/fullrun-victory.json`. Because SwiftShader caps the frame rate, this
run is **not** evidence of real-time pacing feel.

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
| `14`–`16-fullrun-*.png` | from the ordinary-input full run (turn 3, wave 5 at 3×, victory) |

## Problems found during verification (→ fixes)

* The first light pass was too dark, with a narrow pool → a wider, softer candle cone, a brighter
  fill and higher exposure.
* Bonus text lost its "+" sign, and punctuation after a highlighted phrase got a stray space →
  fixed in both the card faces and the tooltips.
* The Stray Memory cooldown icon was too faint at 48 px → its illustration is drawn larger.
* The smoke check on the modifier panel ran before the first combat frame redrew the HUD →
  it now lets a frame render first.
* Earlier (v2): the title overlay swallowed the first pointer move after Begin, and hand picking
  flickered between overlapping cards; both fixed.

## Performance record (SwiftShader, honest)

| Scenario | Viewport | Quality | Result |
|---|---|---|---|
| Swarm stress: 6 towers, ~300 foes, candle shadows | 1920×1080 | High | ~2.1 s avg frame, JS update ≈ 2.7 ms/frame (the rest is software rasterization, including the shadow pass) |
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
   play a passive and check the tower tooltip numbers change; right-click two cards → Sacrifice →
   choose; right-click one → Purge.
3. End Turn and watch wave 1: pieces walk out of the fog and spread out, with candle shadows;
   active icons fill at the top right; Tab shows the modifiers; try 2× and 3×.
4. Check frame rate in waves 5–8 at 1920×1080 High (`?dev`, `__PALIMPSEST__.perf()`).
