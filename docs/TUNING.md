# Tuning notes

All gameplay numbers live in `src/game/content.ts`: towers, passive cards (stat and amount per
copy), active cards (cooldown and effect), costs (`COST`), turn rules (`TURN`: draw 4, 6 energy,
1 purge, minimum deck size 4 topped up with Dust), the starting deck, sockets open at the start (`SLOTS_UNLOCKED_AT_START`), foes, soft
collision (`CROWD`) and the eight wave definitions. How modifiers turn into tower numbers lives in
`src/game/stats.ts` (attack speed divides the interval, damage and range multiply, Stray Memory
uses the average DPS of the placed towers). Quality presets live in `src/view/quality.ts`. Difficulty never reacts to the player's
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
| simple (never sacrifices, so never gets a 2nd tower) | 0 | 39 | 102 105 107 103 38 4 7 | 0 0 0 0 2 13 0 5 |
| seeker (sacrifices spare cards hoping for a tower) | 20 | 32 | 100 103 105 107 107 105 112 | 0 0 0 0 0 0 0 0 |

(Both policies play every passive and active card they can afford; Integrity can exceed 100 once
Sturdy Vessel raises the cap.)

Reading it: since passives cycle back through the discard pile and stack again every time they
are played, a player who finds a second tower now wins every seeded run — the waves are too easy
for a recycling passive build and need retuning upward (deliberately left for the balance pass).
Without a second tower the run still collapses around wave 5–6. Slot unlocks (future) are the
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
