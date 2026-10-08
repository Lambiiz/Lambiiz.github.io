# Tuning notes

All gameplay numbers live in `src/game/content.ts`: towers, the placeholder active/passive cards,
costs (`COST`), turn rules (`TURN`: draw 4, 6 energy, 1 purge), the starting deck, sockets open at
the start (`SLOTS_UNLOCKED_AT_START`), foes, soft collision (`CROWD`) and the eight wave
definitions. Quality presets live in `src/view/quality.ts`. Difficulty never reacts to the player's
build or to frame rate.

**Balance is deliberately not tuned yet.** The current values only aim for a playable loop in
which engaging with sacrifice matters.

## Scale (v2)

| | v1 | v2 | why |
|---|---|---|---|
| Spawn ring radius | 9.5 | 24 | foes approach from far away; range matters |
| Arena (inked circle) | 10.6 | 27 | |
| Base footprint | 7.8 × 7.0 | 10 × 9 | cards scaled 1.3× so socketed cards stay readable when zoomed out |
| Foe radius (echo/moth/urn) | 0.42/0.36/0.55 | 0.45/0.37/0.62 | relative to the arena they are ~2.5× smaller |
| Foe HP (echo/moth/urn) | 18/10/65 | 6/3/24 | many weak foes instead of few strong ones |
| Foe speed | 0.7/1.15/0.4 | 0.9/1.4/0.5 | ~20 s for an echo to cross the arena |
| Contact damage | 6/4/14 | 3/2/8 | more arrivals per wave |
| Tower ranges | 11 (bell 6.8) | needle 14, light 22, thread 13, bell 8.5 | long range is valuable, short range a drawback |

## Latest balance report (`npm run balance`, 20 seeds)

| policy | wins | peak foes on board | Integrity after waves 1–7 | losses by wave |
|---|---:|---:|---|---|
| simple (never sacrifices, so never gets a 2nd tower) | 0 | 38 | 100 100 82 29 0 0 0 | 0 0 0 2 18 0 0 0 |
| seeker (sacrifices spare cards hoping for a tower) | 6 | 44 | 100 100 100 98 77 50 51 | 0 0 0 0 0 4 1 9 |

Reading it: with only two open sockets the main lever is getting a second, complementary tower
through sacrifice, plus using Quicken/Ash/passives at the right time. Slot unlocks (future) are the
natural next lever; once they exist, the spawn schedule should be retuned upward.

## Spawn schedule (enemies per second, interpolated across each 30 s wave)

| wave | rate | pack | mix |
|---:|---|---|---|
| 1 | 0.51 → 0.85 | 1–3 | echoes |
| 2 | 0.77 → 1.10 | 2–4 | + moths |
| 3 | 0.85 → 1.27 | 2–4 | + urns |
| 4 | 1.02 → 1.53 | 2–5 | mixed |
| 5 | 1.22 → 1.77 | 4–8 | crowd of echoes |
| 6 | 1.22 → 1.71 | 3–7 | moth swarm |
| 7 | 0.85 → 1.27 | 2–4 | urn procession |
| 8 | 1.25 → 1.85 | 3–6 | mixed finale, then clearing |
