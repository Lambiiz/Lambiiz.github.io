# Tuning notes

All gameplay numbers live in `src/game/content.ts` (weapons, boons, enemies, the eight trial
definitions, Base/arena dimensions). Quality presets live in `src/view/quality.ts`. Nothing about
difficulty reacts to the player's loadout or to frame rate.

## How balance was evaluated

`npm run balance` (`tests/balance.report.test.ts`) plays 30 seeds per scripted policy through the
real `PhaseController` at normal 30-second trial durations and prints win counts, average final
Integrity, Integrity at each draft, and the trial where losses happen:

| policy | intent |
|---|---|
| `focused` | single-target: prefers Last Light, Polished Memory, Memory Needle |
| `crowd` | crowd control: prefers Kindred Thread, Mercy Bell, Mend |
| `mixed` | always takes the least-represented weapon type |
| `needleOnly`, `bellOnly` | degenerate mono-builds (should be weaker) |

Latest report (seeds 7919·k, k = 1..30):

| policy | wins / 30 | avg final HP | HP at drafts 1–7 | losses by trial (1–8) |
|---|---:|---:|---|---|
| focused | 22 | 57 | 100 100 100 95 71 60 60 | 0 0 0 0 3 3 1 1 |
| crowd | 23 | 45 | 100 100 98 88 77 77 73 | 0 0 0 0 1 0 0 6 |
| mixed | 27 | 44 | 100 100 95 85 78 78 74 | 0 0 0 0 1 0 0 2 |
| needleOnly | 17 | 38 | 100 100 100 95 74 64 65 | 0 0 0 0 3 1 1 8 |
| bellOnly | 18 | 34 | 100 100 93 78 57 53 48 | 0 0 0 0 2 1 4 5 |

Reading it:

* **Early learning is forgiving**: no policy loses in trials 1–4; even a poor build arrives at
  trial 5 with most of its Integrity.
* **Focused builds** breeze through early trials and the urn trial, but bleed in the *crowd*
  (trial 5) and *swarm* (trial 6) trials — overkill on fragile foes is their weakness.
* **Crowd builds** hold the crowd/swarm trials almost perfectly (77 → 77 HP) but lose ground in
  the *urn* trial (7) and the mixed finale: chain and ring damage is thin against 65+ HP urns.
* **Mono-builds** win clearly less often than composed builds; the composed `mixed` policy is
  the most reliable (27/30), which is the intended reward for build composition.
* The finale (trial 8) remains the hardest test by design: most remaining losses happen there.
* An earlier version was harsher (urn trial 0.70→0.95/s at 55% urns, finale 1.15→1.45/s at 20%
  urns). A complete ordinary-input browser run on that version (see `docs/VERIFICATION.md`) held
  94 Integrity through trial 7 and then collapsed to 0 in ~23 s of the finale as urns carried
  over from trial 7 piled up. That cliff felt unfair, so both trials were softened to the values
  below.

These values are tuned hypotheses, not certified balance.

## Changes from the brief's starting values (and why)

| value | start | now | reason |
|---|---|---|---|
| Kindred Thread damage | 10/7/5 | 12/9/7 | Chains averaged ~1.8 targets; crowd builds lost every run. |
| Kindred Thread hop range | 2.8 | 3.2 | Same; spawns spread around the full ring. |
| Mercy Bell | 3.5 s, 14 dmg, r 6.0 | 3.2 s, 16 dmg, r 6.8 | At r 6.0 enemies were usually dead or arrived before a second ring; r 6.8 still covers the full footprint (corner distance 5.24) plus approach margin, verified in `tests/simulation.test.ts`. |
| Base depth | 6.7 | 7.0 | Gives the central seam/emitter room without shrinking the 2.04 × 2.72 card faces. |
| Card face | 2.1 × 2.8 | 2.04 × 2.72 | Fits six sockets with beveled lips on the 7.8 × 7.0 lid; measured ≥ 70 × 80 CSS px at 1280×720. |
| Spawn packs | — | `packSize` per trial | Packs share an approach angle (rate is still enemies/s and fractional progress is retained). Gives the crowd/swarm trials a real identity and rewards chain/ring weapons. |
| Trial 7 (urn) | 0.62→0.82/s | 0.62→0.86/s, 50% urns | Urn-heavy enough to punish crowd-only builds without a carry-over cliff. |
| Trial 8 | 1.2→1.6/s | 1.10→1.40/s, 16% urns | The original finale killed even well-composed builds most of the time. |

HP growth stays linear at `1 + 0.1·(trial−1)`; no exponential stats and no new enemy behaviours.

## Spawn schedule

| trial | rate (enemies/s) | pack | mix | forecast |
|---:|---|---|---|---|
| 1 | 0.28 → 0.42 | 1 | echoes | gentle introduction |
| 2 | 0.42 → 0.60 | 1–2 | + moths | |
| 3 | 0.50 → 0.72 | 1–2 | + urns | |
| 4 | 0.62 → 0.88 | 1–3 | mixed | |
| 5 | 0.95 → 1.25 | 3–5 | crowd of echoes | crowd-heavy |
| 6 | 1.00 → 1.35 | 2–4 | moth swarm | fast-spirit-heavy |
| 7 | 0.62 → 0.86 | 1–2 | urn procession (50% urns) | urn-heavy |
| 8 | 1.10 → 1.40 | 2–3 | mixed finale, then clearing | |

## Travel times (spawn ring r = 9.5, Base half-extents 3.9 × 3.5)

* Veiled Echo (0.7 u/s): ~8–8.5 s to contact.
* Folded Moth (1.15 u/s): ~5 s.
* Burden Urn (0.4 u/s): ~14 s.
