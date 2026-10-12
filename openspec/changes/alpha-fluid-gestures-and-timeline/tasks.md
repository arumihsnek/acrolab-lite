# Alpha fluid/editor UX tasks — pending OpenSpec execution

Every Axx entry maps 1:1 to the scenario manifest in `test-plan.md`. **No task is checked merely because the previous 85-test candidate suite passed.** The older `first-usable-lite-editor` tasks remain separately open; reconcile criteria before merging, do not mass-mark.

## Planning and gate

- [x] **G1 BINDING DECISION 2026-10-11 (docs-only, NOT implementation):** user approved D1=`mtp`, D2=`collective_finger` (singular; plural alias), D3=branched canonical graph with equivalence contract (junction between `upper_trunk`/`neck_base`; `shoulder` NOT axial parent), D4 conserved (bracketing suffices; upper-terminal shoulder frees ARM). Record: `docs/decisions/2026-10-11-g1-chain-topology-approval.md`. Reviewer surrogate Muse Spark, review commit `776cd9ab559a4d3cc1db005707a81934b4c68ee8`. Normative A16 + G1.01–G1.05 matrix PROPOSED; implementation/tests stay OPEN (RED-until-P2-GREEN). R2 (`d29506a`,`db9c99d`, paused) and R4 (`dcb549e`, isolated QA PASS) NOT integrated here.

- [x] **DESIGN DECISION ONLY (not tested):** user resolved unilateral touched-free-branch ROTATE versus bilateral selected-marker bisector as distinct gestures, including four path families and feet→head priority at shoulder; see `docs/JOINT-CHAIN-DISPATCH-2026-10-10.md`. Do not count this as implementation acceptance.
- [ ] Resolve only remaining edge cases: FLIP with several selected joints needs an explicit pivot/constraint rule (do not assume centroid); ROTATE with several selected markers needs a bounded response; verify precise branch membership at shoulder. No invented multi-pivot solver.
- [ ] Confirm A08 guide apex/scale default visually (a *design* cue, not simulated falling mechanics), and A09 SHADOW outline/fill style via screenshot previews.
- [ ] Validate all prior tests still cover user decisions after the new interaction contract; baseline red on actual old behavior.
- [ ] Record a per-version acceptance table for published alpha, candidate and tested branch with exact revision/SHA.

## Manifest — one scenario per task

- [ ] **A01** [B+V; `tests/mobile.smoke.mobile.spec.js`/`tests/T23-library-panel.spec.js`]: responsive multi-viewport/orientation reflow screenshot and non-clipped controls test.
- [ ] **A02** [B; `tests/T08-axis.spec.js`]: selected marker drag applies bilateral bisector X/Y/OFF; with no selection body drag moves root.
- [ ] **A03** [B+U; `tests/G1-bilateral-rotate.spec.js`]: unilateral free-part ROTATE with selected pivot, opposite part fixed; multi-anchor four-chain internal-vs-free shoulder-priority test matrix.
- [ ] **A16/G1.01–G1.05** [B+U; new G1 matrix spec]: canonical branched binding RED-until-P2-GREEN — foot/hand interior refusals, shoulder-bracket priority refusal without selecting shoulder, upper-terminal shoulder arm-only, cancel/Undo + topology disambiguation. DECISION approved; implementation and tests OPEN.
- [ ] **A04** [B; `tests/T12-T14-timeline.spec.js`]: normal key-tap edits+seeks, REF/multiselect exceptions and ruler no-authoring.
- [ ] **A05** [B; `tests/T23-library-panel.spec.js`]: offscreen pose-list selection reveals timeline key at same zoom.
- [ ] **A06** [B; `tests/T16-playback.spec.js`]: STOP resets head + timeline pan, PAUSE preserves both.
- [ ] **A07** [B; `tests/T09-camera.spec.js`]: deltaX wheel pan vs deltaY zoom, scene/timeline region.
- [ ] **A08** [U+B+V; `tests/T02-T03-rig-mapping.spec.js`]: GRID world-vertical uniform, horizontal apex-quadratic spacing, no authored changes.
- [ ] **A09** [B+V+I; `tests/T20-T22-refs.spec.js`]: SHADOW wording, semi-transparent fill, stronger outline, legacy ghost import and click-through.
- [ ] **A10** [B+V; `tests/T12-T14-timeline.spec.js`]: noninteractive pose shadow thumbnails with deterministic overlap culling.
- [ ] **A11** [B+V; `tests/T02-T03-rig-mapping.spec.js`]: actual foreground paint of forearm crossing shorts, screenshot pixel evidence (not DOM order only).
- [ ] **A12** [R+B; `tests/R-T01-T28-boundary.spec.js`]: accurate published-alpha/candidate SHA, regressions/evidence/Human Gate report.
- [ ] **A13** [B+U+V; `tests/T07-flip.spec.js`/`tests/T08-axis.spec.js`]: FLIP drag on either body side rotates entire actor about selected joint; selected marker drag translates whole actor under X/Y/OFF, preserve angles/turns and G2/Undo, exact red→green tests.

- [ ] **A14** [B+V+I; `tests/mobile.smoke.mobile.spec.js`/`tests/T23-library-panel.spec.js`]: mobile library hidden by default, compact button + safe right-quarter chrome swipe open, no permanent stripe or Android Back conflict, stage/timeline gestures preserved and drawer close leaves state unchanged. Chromium emulation now; real Android ADB later.

- [ ] **A15** [B+V+R; `tests/T02-T03-rig-mapping.spec.js`/`tests/R-T01-T28-boundary.spec.js`]: no inherited Inspector/properties panel or empty right gutter in successor desktop/mobile, keep compact axis/selection/ref/floor controls, validate v0.5 hash and no parent AcroLab/Godot dependency; real browser screenshots and code/path check.

## End gate

- [ ] Run all prior tests + new tests on isolated candidate; preserve RED→GREEN evidence and any remaining reproducible DogFood. Independent reviewer not the worker model. User reviews UI on a real browser before any version is promoted. No automatic deploy/merge.
