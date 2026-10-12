# Design — candidate architecture (under review)

## V0.5 baseline and incremental migration
- Start from the **real, embedded-JavaScript SVG v0.5** in `assets/reference/svg-motion-lab-v0.5.svg`, not the auxiliary HTML wireframe. Keep the frozen reference unchanged. Audit implemented control IDs, event ordering, pose data, layers, transforms, timeline, library, persistence and viewport separately from aspirational OpenSpec requirements.
- Preserve functioning visuals/interactions as verified. Record a baseline matrix per feature: observed working / reproduced broken / untested / absent. An untested feature is not 'broken' by assumption, nor 'implemented' from a matching button name.
- A future Pi implementation worker, **only after the Human Gate**, edits an isolated candidate derived from v0.5; test-first surgical fixes instead of a fresh engine or framework. The authoritative original mannequin SVG has SHA `99ccb17102f550192b4e47e9ae3b83f18ccdc3d8ad742a5f77d3d61f38df097e`; compare geometry, layers, mark centers and mapping with older v0.5 metadata before accepting a candidate.
- The UI baseline is v0.5's compact SVG control layout, with user-requested single cyclic `OFF → X → Y → OFF` axis button and single timeline-action row (Play/Pause, Add, Copy, Paste, Delete). The exact implementation and interaction semantics remain subject to recorded contracts and G1/G2 review.
- Use an ephemeral, isolated browser profile for exploratory tests; never pollute the user's project/library data. Do not publish test artifacts or overwrite historical online versions automatically.

## Editor, not simulator
A scene transforms the user's exact SVG pieces about named joint-center marks. Canonical joints are stable identified objects mapped to authored SVG marks. Store local angles and explicit root pose/placement; viewport coordinates never become pose data. Renderer does not mutate original path geometry.

## Gesture state machine
Input arbitrator distinguishes TAP / HOLD / SWIPE using displacement+duration thresholds and pointer capture, with only one operation bound per gesture; never change selected joint during swipe. Handle multi-touch cancellation and pointercancel. Stage targets: joint marker for selection; body segment for Rotate/Flip; whole body when no joints selected; blank area for camera pan. Pinch with midpoint-focal zoom and pan; no hidden editing.

## Kinematics
ROTATE: choose closest selected hinge; apply rotation to the valid free branch selected once at gesture start; pivot/branch fixed throughout. Invalid branch gives feedback, never substitutes global movement. FLIP: choose selected pivot or centroid and rotate globally retaining accumulated orientation. Whole-actor drag when none selected, X/Y/OFF toggle. **Ground may NOT translate root during ROTATE/FLIP** to secretly resolve intersection. Stop at last safe angle or reject without changing key; playback stops at first invalid interpolated frame, no silent geometry repair. Consult `docs/GESTURE-CONTRACT.md` and `docs/GROUND-AND-REFERENCES.md`; branch marker ambiguity G1 and floor feedback G2 remain Human Gates.

## Timeline
Named stable key IDs, selected set, edit head/playhead are distinct. Tap key selects; double tap seeks to it for editing; tap ruler seeks head; drag head scrubs; swipe blank timeline pans; pinch focal zooms; viewport left cannot expose negative time. Zoom out that would exceed domain expands duration deliberately with observable preview. Retime selected keys without implicit select, preserving IDs; collisions reject transaction.

## Pose persistence
Authored active key updates immediately on each accepted atomic gesture, autosaved in browser local durable storage with explicit failure reporting. Between-key evaluation is read-only until ADD/PASTE creates a new authored key. Library asset is independent named source with explicit Save/Update Library; selecting a row only selects the asset, Load at Head creates a distinct editable key. No conflation of evaluated state, authored key or library. Undo restores full authoring transaction, not every pointer event. See `docs/EDITOR-STATE-AND-STORAGE.md`.

## Ghost and frozen references
REF on + selected keys => guides only for that set. Saved pose snapshot stays frozen even when same active key edited; deselect removes; reselect refreshes. Ghost key references live evaluated state. Opacity monotonic by distance to head, nearest darkest; guides render beneath actor and never capture input.

## UI
Full-window adaptive stage, left optional tools, right minimal text-tree library, bottom timeline stays unobstructed. PLAY button becomes PAUSE without resetting head. No Lock UI or MOVE/Select tool mode. Undo/Redo keyboard and buttons. Readable mobile touch targets without oversized visible joint dots.

## Storage, future bridge
Versioned JSON with rig source hash, units/axis convention, stable joint IDs, time (explicit units) and source provenance. Native editable SVG output optional only after data integrity test; future research product consumes export via separate reviewed adapter, never linked runtime.

## Unresolved review/gate questions — do not undo established decisions
1. **G1:** how a drag starting exactly on a selected joint marker chooses a free branch, without selecting another joint or falling back to global movement.
2. **G2:** visual feedback for rejected/clamped rotations at the solid floor. No root lift in ROTATE/FLIP is already settled; do not relitigate it as a hidden compensation option.
3. **Editorial state consistency:** `GESTURE-CONTRACT.md` currently includes UI selection in Undo while `EDITOR-STATE-AND-STORAGE.md` treats navigation/selection as transient. Resolve explicitly during H1; keep authoring Undo atomic regardless.
4. **Time domain consistency:** temporal pinch viewport-only language in `specs/minimal-editor/spec.md` conflicts with the proposed explicit duration extension in `EDITOR-STATE-AND-STORAGE.md`. User-approved behavior must decide this; never alter key times silently.
5. **Saved multi-jump compositions:** old v0.5 library stores individual poses, not sequences. Specify the smallest way to preserve multiple jumps/projects without inventing a complex new library.
6. **Baseline migration:** v0.5 source hash differs from the newer canonical drawing, despite matching inspected paths/13 pivots. Confirm styles/layers/transforms, versioning and cache migration before a rig SHA change.
