# Scenario-driven test plan — AcroLab Lite (PLAN)

Status: PROPOSED; no implementation or test harness exists yet. This is a product project, not the Pi Dashboard repository: test levels below are locally defined. Automated acceptance requires actual executed tests; a task checkbox is not evidence. All cases derive from docs/PRODUCT-CONTRACT.md and the user's videos. Source SHA: 99ccb17102f550192b4e47e9ae3b83f18ccdc3d8ad742a5f77d3d61f38df097e.

Harness design: Level U = small deterministic unit tests; B = Playwright browser desktop+mobile emulated pointer/touch; I = project persistence/reload/browser integration; H = human physical Android Chrome/manual-only; R = repository boundary/static governance. No exemplar files yet in this new repository — **first planning implementation task must establish real harness exemplars** (e.g. tests/unit/kinematics.test.ts, tests/browser/gesture.spec.ts, tests/browser/persistence.spec.ts). Do not claim any exists before creation.

Every scenario requires input → trigger → observable proof. A following revision of tasks.md must map each manifest row to exactly one task.

## Real-v0.5 audit and autonomous exploratory layer

**Starting artifact:** `assets/reference/svg-motion-lab-v0.5.svg`, interactive XML/SVG + embedded JavaScript (not a standalone HTML application), SHA-256 `93246123d6e307e51562d187ddc0ed33639953f83ac9fee9f297cbed1f07555b`. Distinguish this artifact from the authoritative source mannequin `assets/source/manekin2D-vertical2.svg` and its SHA `99ccb17102f550192b4e47e9ae3b83f18ccdc3d8ad742a5f77d3d61f38df097e`. The source provenance discrepancy is an investigation gate. **No T01–T28 claims have been executed merely by this revision.**

**Phase A, allowed before UI build approval:** inventory and explore the frozen v0.5 in Chromium/Playwright with isolated storage and temporary evidence, including document type handling, desktop 1440×900 and Android-like 390×844 viewports. Record a baseline status for each applicable T scenario: *observed passing, reproduced failing, unavailable/missing, not attempted*; include exact input gestures, DOM/SVG identifiers, before/after state or transform, screenshots, console logs, trace, video when available and provenance. Respect that browser emulation is not a physical Android acceptance. Never alter the frozen SVG, Git, existing user's browser profile or public experimental site in Phase A.

**Phase B, after H1 approval:** build a minimal, reproducible test harness in a Pi-owned isolated worktree against a candidate based on v0.5, without replacing it with a fresh UI. Add stable locator/accessibility/rig-state observation only where necessary, keeping production semantics untouched; oracles must not rely solely on screenshot similarity. Run each scenario T01–T28 with red→green regression evidence for reproduced faults. Preserve test failures rather than weakening or deleting assertions.

**Autonomous exploratory layer (additional to, never replacing, T01–T28):**
- A browser-using Pi agent operates the **real interactive editor** with click, pointerdown/move/up, long hold, two-touch pinch, buttons, text/library actions, navigation and persistent reload in its isolated context; screenshots and UI inspection inform the next action.
- Deterministic state-machine/property-based runs randomize legal sequences of selection, ROTATE/FLIP, axis, camera, keyframe edits, Undo/Redo, REF, save/load and playback. Record seed, complete/reduced action trace, viewport/browser version, initial data snapshot and final SVG/state; minimize failures into replayable regression cases.
- Metamorphic/state oracles: pan/zoom leave authored body/time unchanged; Undo→Redo round trips; copy/paste preserve source and establish distinct IDs; disallowed floor penetration never silently adjusts root or angles; selection is stable through a drag; refs update according to frozen-vs-live rules; exports/reloads round-trip; layer order and exact 13 mark positions remain verifiable. Include visual snapshots for clipping and usable touch targets.
- Creative journey probes (agent exploration, **not mechanical validation**): assemble a readable sagittal jump/mortal sequence with anticipation, takeoff, grouping, rotation, opening and landing; alter timing and joints; save multiple distinct jumps, reopen, compare, edit and replay. Log whether the clip can be created with actual controls and whether output looks plausible for professional human review. No invented 'perfect' physics score or safety certification.
- Explore combined failure modes (selection+zoom+pointercancel, REF+Undo+delete, play+retime, floor+360° flip, browser reload+library); bound number of sequences, turns and model spending, keep one writer per target, run cheap deterministic tests before costly vision/LLM evaluations.

**Failure report minimum:** actual source/candidate SHA and Git SHA, browser/device/viewport, seed and executable replay, expected versus observed, state/DOM evidence + screenshot/trace, severity, test ID and fix/retest SHA. Stop and surface Human Gates instead of silently changing user-approved semantics. PiBoard native Goal/Hermes may drive continuation **only after explicit H1 authorization and verified driver/liveness**, and a judge `done` is not synonymous with passing tests.


| ID | Level | Disposition | Input → trigger → observable |
| --- | --- | --- | --- |
| T01 | R | automated | Inspect imports/code/dependencies → run repository-boundary check → no AcroLab Godot imports/spec references as authority, parent Git untouched |
| T02 | U+B | automated | Authored SVG source + each source mark transformed → rotate joint/camera + inspect positions → 13 control/pivot/source mark centers coincide within 0.05 viewport px, original path geometry hash unchanged |
| T03 | B | automated | Forearm crossing torso/shorts → render neutral and bent poses → forearm visible above shorts in intended overlap, source pieces preserved |
| T04 | B | automated | Tap shoulder then drag across elbow/wrist → gesture → only shoulder remains selected, branch/pivot stays fixed, no intermediate select |
| T05 | B | automated | Hold joint > long-press threshold → tap second joint, tap blank → both were selected, blank clears all and exits multiselect; drag never creates selection |
| T06 | U+B | automated | Shoulder+codo group selected, drag internal vs free segment → Rotate → internal branch rejects visibly without changing state; free end rotates about nearest selected hinge, only admissible branch transforms |
| T07 | B | automated | Joint(s) selected, circular motion around chosen centroid >360° → Flip → whole-body orientation retains continuous turn and joint values unchanged |
| T08 | B | automated | Empty selection then drag body; toggle X/Y/OFF → Move implicit → root only translates respecting axis choice, no selected joint or angles changed |
| T09 | B | automated | Empty stage swipe + two touch points spread/shift → pan and focal zoom → camera changes, authored body/time unchanged, pinch center remains stable |
| T10 | U+B | automated | Rotate actor, arm/hand below foot, interpolate frames; move toward ground → each operation/playback → each visible path stays above floor within 0.05 scene units or operation rejected explicitly |
| T11 | B | automated | Pan/downward zoom about floor → viewport changes → no extra below-floor scene is revealed compared to neutral initial camera |
| T12 | B | automated | Single tap key, swipe across other keys, double-tap saved key, long press → timeline → tap selects only, swipe does not select, double-tap seeks/edits, hold enters multiselect |
| T13 | B | automated | Tap upper ruler; drag playhead; swipe blank lane; pinch zoom out near t=0 → timeline → head seeks only with ruler/head, pan not head, t=0 preserved and duration-extension policy is explicit |
| T14 | U+B | automated | Two selected keys + drag/retime into another key → edit → IDs/time preserved if invalid, one Undo transaction; valid move updates without collisions |
| T15 | B | automated | Copy a saved key, paste between keys, delete pasted key → timeline and undo/redo → new stable ID created, original unchanged, deletion reversible |
| T16 | B | automated | Play to 1.37s, tap pause, tap play → playback → pause time freezes at 1.37s ± frame tolerance, resume continues from there |
| T17 | I+B | automated | Edit authored key and navigate away without library Save → reload → current project autosave recovers edits, undo/redo behavior explicit, library original unchanged |
| T18 | I | automated | Add library item + insert at playhead + reopen browser → persistence → library and clip survive, independent IDs, editing insert doesn't mutate source |
| T19 | B | automated | Activate REF with 2 selected saved keys, then deselect one → guide layer → deselected guide disappears immediately; other stays; REF OFF clears guides |
| T20 | B | automated | REF ON + select active key, modify pose, double tap same key, deselect/reselect → guides → frozen snapshot stays unchanged until reselect; then refreshed |
| T21 | B | automated | Add ghost at interpolated time, reference it, edit adjacent pose → render → ghost changes live; frozen saved guide unchanged |
| T22 | B | automated | Three reference poses at distinct distances to head → render → near-to-head guide opacity strictly > far guide; refs don't intercept touches |
| T23 | I+B | automated | Close/open minimal right library in desktop and 390x844 viewport → geometry → stage and timeline stay usable, library never overlays timeline, rows use plain tree semantics |
| T24 | I | automated | Export poses/project with rig ID, SVG SHA, names, units, times, then import → validation → exact round-trip including ori=360°; incompatible rig version rejected, no implicit scientific claim |
| T25 | B | automated | Pointercancel and two fingers during joint drag → cancellation → no leftover selected joint, corrupted key, altered pose, locked capture or playback state |
| T26 | B | automated | Sequence of Rotate/Flip/reference/undo/redo and playback against known user-video reproduction → regression harness → observed v0.4/v0.5 bugs fail red before fix and pass after, evidence recorded |
| T27 | H | manual-only | Android Chrome installed PWA, full 3-pose creative jump with pinch/pan/rotate/flip/ref/library → human uses phone → explicit acceptance/feedback from user, never inferred from emulation |
| T28 | R | automated | Repo Git tree + status after design/test cycle → inspect worktree/repo → no AcroLab canonical file change, source SVG original intact and review/test evidence class DESIGN |

## Human gates
- H1: approve/adjust UX prototype (gesture boundaries, multi-hinge, floor conflict, time-domain zoom policy, save semantics) before implementation.
- H2: confirm physically on user's Android Chrome after automated checks.
- H3: separately approve future AcroLab scientific bridge, remote collaboration/server, physics validation or public product release.

## Evidence rules
Before any claim of complete: list each scenario ID, test run/commit SHA, mobile emulation details, negative reproduction, physical/manual pending gates. A judge 'done', OpenSpec checkbox, browser screenshot, or PWA manifest alone does not prove achievement.
