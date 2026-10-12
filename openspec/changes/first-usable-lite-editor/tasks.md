# AcroLab Lite first-release tasks — PLANNING ONLY

OpenSpec tasks are work descriptions, NEVER an executor or acceptance evidence. **User-authorized limited execution from 2026-10-10:** harness-first testing and isolated surgical v0.5 improvements may proceed under docs/NIGHT-MISSION-2026-10-10.md; G1/G2/UX decisions, physical Android acceptance and publication remain Human Gates. The main product Goal is not achieved merely by these improvements. The first native Goal is currently paused, not executing. Specs authored/corrected by ChatGPT Arquitecta, GPT-6.1 Sol Medium is read-only reviewer only. All implementation workers must be separate Pi sessions under a future approved Goal driver.

## Planning and gating (not manifest scenarios)
- [ ] Examine source SVG exact pivots/shapes and visually confirm `shorts` below forearm, record source SHA in tests.
- [ ] Resolve G1 selected-joint marker ROTATE and G2 floor feedback in reviewed mockups with user; finalize spec.
- [ ] Audit **original interactive SVG Motion Lab v0.5**, compare its working/failing/untested controls with user contracts, and review THIS SVG at desktop 1440×900 and Android-like 390×844. The HTML mockup is only a supplemental sketch; do NOT replace v0.5.
- [ ] Conduct scenario-design audit and evidence-aware independent review; update test-plan and fold rows without weakening any test.
- [ ] Before H1: execute or design a bounded **read-only baseline probe of v0.5 real browser UI**, map reproducible existing defects and untested features to T01–T28; preserve screenshots, traces, console and UI-state evidence without modifying frozen source or user/public data.
- [ ] HUMAN GATE: user approves gesture/body interaction, floor policy, authoring between keys, timeline, ref semantics and library UI; stop until approval.
- [ ] After gate, create isolated candidate worktree and scaffold actual test harness exemplars: `tests/unit/rig.test.ts`, `tests/browser/gestures.spec.ts`, `tests/browser/timeline.spec.ts`, `tests/browser/persistence.spec.ts` (all NOT YET PRESENT). Record exact working test paths, no invented exemplars.
- [ ] After gate: use Pi native sessions/Goal, not a parallel orchestrator, for repeatable state-machine/fuzz gesture sequences, cross-feature mutation/replay, browser agent exploratory journeys and creative jump-sequence probes; preserve failing seeds and minimal repros, human plausibility review distinct from biomechanics.

## Scenario manifest fold — every row maps one-to-one to one future task
- [ ] **T01** [R, automated; repository invariant harness]: Inspect imports/code/dependencies → run repository-boundary check → no AcroLab Godot imports/spec references as authority, parent Git untouched
- [ ] **T02** [U+B, automated; unit+browser assertion harness]: Authored SVG source + each source mark transformed → rotate joint/camera + inspect positions → 13 control/pivot/source mark centers coincide within 0.05 viewport px, original path geometry hash unchanged
- [ ] **T03** [B, automated; Playwright pointer/touch harness]: Forearm crossing torso/shorts → render neutral and bent poses → forearm visible above shorts in intended overlap, source pieces preserved
- [ ] **T04** [B, automated; Playwright pointer/touch harness]: Tap shoulder then drag across elbow/wrist → gesture → only shoulder remains selected, branch/pivot stays fixed, no intermediate select
- [ ] **T05** [B, automated; Playwright pointer/touch harness]: Hold joint > long-press threshold → tap second joint, tap blank → both were selected, blank clears all and exits multiselect; drag never creates selection
- [ ] **T06** [U+B, automated; unit+browser assertion harness]: Shoulder+codo group selected, drag internal vs free segment → Rotate → internal branch rejects visibly without changing state; free end rotates about nearest selected hinge, only admissible branch transforms
- [ ] **T07** [B, automated; Playwright pointer/touch harness]: Joint(s) selected, circular motion around chosen centroid >360° → Flip → whole-body orientation retains continuous turn and joint values unchanged
- [ ] **T08** [B, automated; Playwright pointer/touch harness]: Empty selection then drag body; toggle X/Y/OFF → Move implicit → root only translates respecting axis choice, no selected joint or angles changed
- [ ] **T09** [B, automated; Playwright pointer/touch harness]: Empty stage swipe + two touch points spread/shift → pan and focal zoom → camera changes, authored body/time unchanged, pinch center remains stable
- [ ] **T10** [U+B, automated; unit+browser assertion harness]: Rotate actor, arm/hand below foot, interpolate frames; move toward ground → each operation/playback → each visible path stays above floor within 0.05 scene units or operation rejected explicitly
- [ ] **T11** [B, automated; Playwright pointer/touch harness]: Pan/downward zoom about floor → viewport changes → no extra below-floor scene is revealed compared to neutral initial camera
- [ ] **T12** [B, automated; Playwright pointer/touch harness]: Single tap key, swipe across other keys, double-tap saved key, long press → timeline → tap selects only, swipe does not select, double-tap seeks/edits, hold enters multiselect
- [ ] **T13** [B, automated; Playwright pointer/touch harness]: Tap upper ruler; drag playhead; swipe blank lane; pinch zoom out near t=0 → timeline → head seeks only with ruler/head, pan not head, t=0 preserved and duration-extension policy is explicit
- [ ] **T14** [U+B, automated; unit+browser assertion harness]: Two selected keys + drag/retime into another key → edit → IDs/time preserved if invalid, one Undo transaction; valid move updates without collisions
- [ ] **T15** [B, automated; Playwright pointer/touch harness]: Copy a saved key, paste between keys, delete pasted key → timeline and undo/redo → new stable ID created, original unchanged, deletion reversible
- [ ] **T16** [B, automated; Playwright pointer/touch harness]: Play to 1.37s, tap pause, tap play → playback → pause time freezes at 1.37s ± frame tolerance, resume continues from there
- [ ] **T17** [I+B, automated; browser persistence/reload harness]: Edit authored key and navigate away without library Save → reload → current project autosave recovers edits, undo/redo behavior explicit, library original unchanged
- [ ] **T18** [I, automated; browser persistence/reload harness]: Add library item + insert at playhead + reopen browser → persistence → library and clip survive, independent IDs, editing insert doesn't mutate source
- [ ] **T19** [B, automated; Playwright pointer/touch harness]: Activate REF with 2 selected saved keys, then deselect one → guide layer → deselected guide disappears immediately; other stays; REF OFF clears guides
- [ ] **T20** [B, automated; Playwright pointer/touch harness]: REF ON + select active key, modify pose, double tap same key, deselect/reselect → guides → frozen snapshot stays unchanged until reselect; then refreshed
- [ ] **T21** [B, automated; Playwright pointer/touch harness]: Add ghost at interpolated time, reference it, edit adjacent pose → render → ghost changes live; frozen saved guide unchanged
- [ ] **T22** [B, automated; Playwright pointer/touch harness]: Three reference poses at distinct distances to head → render → near-to-head guide opacity strictly > far guide; refs don't intercept touches
- [ ] **T23** [I+B, automated; browser persistence/reload harness]: Close/open minimal right library in desktop and 390x844 viewport → geometry → stage and timeline stay usable, library never overlays timeline, rows use plain tree semantics
- [ ] **T24** [I, automated; browser persistence/reload harness]: Export poses/project with rig ID, SVG SHA, names, units, times, then import → validation → exact round-trip including ori=360°; incompatible rig version rejected, no implicit scientific claim
- [ ] **T25** [B, automated; Playwright pointer/touch harness]: Pointercancel and two fingers during joint drag → cancellation → no leftover selected joint, corrupted key, altered pose, locked capture or playback state
- [ ] **T26** [B, automated; Playwright pointer/touch harness]: Sequence of Rotate/Flip/reference/undo/redo and playback against known user-video reproduction → regression harness → observed v0.4/v0.5 bugs fail red before fix and pass after, evidence recorded
- [ ] **T27** [H, manual-only; manual human Android verification]: Android Chrome installed PWA, full 3-pose creative jump with pinch/pan/rotate/flip/ref/library → human uses phone → explicit acceptance/feedback from user, never inferred from emulation
- [ ] **T28** [R, automated; repository invariant harness]: Repo Git tree + status after design/test cycle → inspect worktree/repo → no AcroLab canonical file change, source SVG original intact and review/test evidence class DESIGN

## Release and evidence gate
- [ ] Independent code review by a model/provider different from builder, not self-review; no test weakening; all automated manifest scenarios genuinely green.
- [ ] HUMAN GATE: Android Chrome physical gesture/edit/reload session (`T27`) separately verified.
- [ ] Accept with actual test traces, commit SHA and reviewed OpenSpec archive/sync. Publish a NEW versioned URL only after user authorizes release; keep old prototype links intact.
