# Test strategy — v0.60 risk-grouped consolidation (planning, NOT executed)

Combines, without weakening, the 28-case first-release plan, the alpha gesture/timeline rows,
and the hardening E-/F-/X- catalog (E1–E10, F1–F11, X1–X5). Groups run **once per candidate**;
stage exits run only their scoped rows. Levels: **U** unit/Node, **B** product Playwright
(desktop + emulated touch), **P/PB** portal Node/Chromium, **—** manual-only.

## G-A — Authoring durability (highest risk: silent data loss)

| Row | Requirement | Level | Observable |
| --- | --- | --- | --- |
| X1 | R6 library quota honesty | U+B | BodyPose **and** Exercise failure → visible rejection, no phantom asset/banner, prior Redo/history intact; retry + cold reload durable |
| X2 | D4 project-write honesty | B | Failed autosave keeps in-memory edits, discloses non-durability, export preserves edits, old durable bytes intact, retry proven |
| F1 | R1 cold export | B | Exported SVG cold-opens (desktop + mobile), 13 handles, second edit + Undo valid; source/output bytes recorded |
| E8 | Import atomicity | U+B | Bad schema/duplicate ID/wrong-rig/script-like label rejected before mutation; label inert |

## G-B — Motion correctness (wrong-body-motion risk)

| Row | Requirement | Level | Observable |
| --- | --- | --- | --- |
| E4 | R2 painted ROTATE | B | 4-chain safe-arc: moved-side contour nonzero, pivot/opposite/internal stable; generic refusal fails |
| E5 | R2 topology | B | Feet→head shoulder bracket refuses interior; terminal shoulder frees arm not head; no screen-nearest fallback |
| E6 | R3 shoulder bisector | B | Bilateral fold at fixed shoulder; X-out closes / Y-out opens / OFF-out closes + azimuth tracks; elbow controls |
| E7 | Single-FLIP | B | Either-side drag = whole-rig arc (winding kept); marker drag = whole-rig X/Y/OFF translation only |
| F10 | Floor DESIGN boundary | B | Silhouette + visible stroke at/above world floor at 0°/90°/180°/270°/360° and unsafe interiors; last-safe stop, no hidden root lift (frozen tolerance) |
| F2 | Playback safety | B | Unsafe interior → last-safe stop/warning; delayed-RAF / repeat-PLAY / post-motion cancel+second-touch restore pre-gesture state |

## G-C — Reference & timeline coherence (stale/misleading-guide risk)

| Row | Requirement | Level | Observable |
| --- | --- | --- | --- |
| F3 | R4 REF lifecycle | B | Eligible selected IDs == cache IDs == painted IDs across create/copy/paste/delete/Undo/Redo/seek/edit; deselect removes immediately; saved frozen, ghost live, near>far opacity |
| F4 | REF reset | B | REF OFF clears guides+cache; reload starts REF OFF with authored state restored; navigation writes no history |
| F11 | Event order | B | Long-press/swipe-across/pinch/cancel matrix: swipe never steals selection, one Undo transaction, camera-only on cancel |

## G-D — Layout, library reach, visual truth (confusion/misreading risk)

| Row | Requirement | Level | Observable |
| --- | --- | --- | --- |
| F5 | A15b no gutter | B | Actual 229×575 properties rect absent at 360×800 → 1920×1080 + live resize; toolbar X/Y/OFF/selection/REF/floor feedback retained |
| E3 | R7 reachability | B | Libraries of 8/9/13/14/36 assets + 1/13/30/31/36-member Exercises fully traversable (wheel/keyboard/touch/paging, desktop + mobile) |
| F6 | A11 layering | — | **Manual:** user adjudicates forearm-over-shorts on canonical samples; historical tan==0 observation not misreported |
| F7 | Pending semantics | — | **Manual:** per-item decision (multi-FLIP, F6, F9/time, GRID/SHADOW, placement) or dependent stage blocked |
| F8 | Physical Android | — | **Manual U5M:** exact-SHA 3-pose edit/ROTATE/FLIP/REF/history/play/save/reload/export/PWA/Back-edge, portrait + landscape |

## G-E — Trust, privacy, rollback (publication-harm risk)

| Row | Requirement | Level | Observable |
| --- | --- | --- | --- |
| E1/E2 | Provenance | U | Blob/SHA-256 equality; frozen-asset hashes match; mismatch blocks |
| F9 | Channel isolation | PB | Channel+slug+full-SHA storage; Beta bytes/cache untouched |
| E9/X3 | Portal + feedback gates | P+PB | Bad refs fail closed; consent/schema/origin enforced; private JSONL 0600, no PII public |
| E10/X4 | CAS + live rollback | P/— | Local CAS O→N / stale-refusal / inverse N→O rehearsed; **live** install→smoke→restore→verify→repromote is manual, mandatory, pre-approved |

## Execution form (2026-10-12 extension)

Risk groups above are executed as **J1–J12 coherent journeys** in `test-plan.md`
(8–15 Playwright files, `test.step`, fresh page/state, `pageerror` every journey,
attachments on failure only; dangerous edges separate; asserts never weakened).
V60.01–V60.10 in `specs/lite-v060/spec.md` are the testable requirements (Given/When/Then).
Trace: checklist row → ≥1 J-group → ≥1 V60 scenario → ≥1 G-row/catalog scenario.
Milestones: M1 provisional (P0 entry — exact SHA, zero catastrophic P0, L0+L1, dangerous-core
J3/J7/J10; L4 verdict NOT entry; never qualified/public) → M2 public Alpha (L3 + DeepSeek +
L4 + A15b/A11/D4 + X4 root-cause + G5 + L5).

## Efficiency rule

Full main suite + repaired-50 + new-10 run **once per candidate** at V7 (dedupe overlapping
desktop/touch controls; inventory projects so totals are honest). Stage exits run scoped rows
only. `NOT_RUN` / RED / skip / harness-error stay distinct; residuals need named ledger entries.
No A11 historical observation is counted as visual acceptance; no emulation is counted as
hardware proof.
