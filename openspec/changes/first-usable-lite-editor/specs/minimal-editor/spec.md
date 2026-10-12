# AcroLab Lite — first usable product requirements (PROPOSED)

Operational semantics are consolidated in `docs/GESTURE-CONTRACT.md`, `docs/EDITOR-STATE-AND-STORAGE.md`, and `docs/GROUND-AND-REFERENCES.md`. The original user-decided behaviors are mandatory; details labeled G1/G2/Human Gate remain provisional and MUST be accepted before implementation. Those documents are Lite-specific, NEVER imported from AcroLab Godot.

## Requirement: Product separation and provenance
AcroLab Lite SHALL remain an independent creative and participative 2D acrobatic animation editor. Mechanically informed constraints SHALL be marked DESIGN only. No inherited AcroLab Godot studio solver, heterogeneous selection, AUTO, Disable, Protect, joint locks, RigidLink, or scientific evidence claims.

#### Scenario: No product contamination
- GIVEN an initialized Lite repository, WHEN planning or shipping, THEN Lite builds/tests without importing AcroLab code/specs or mutating its files and scientific gates.

## Requirement: Exact mannequin source and layering
The renderer SHALL derive pivots from exactly the 13 authored joint marks and SVG transforms in `manekin2D-vertical2.svg`, retain authored path geometry and layer order with shorts below forearm.

#### Scenario: Exact joints after rotation
- WHEN each joint is rotated at a variety of angles and stage camera is zoomed THEN visible handle center = authored joint mark center in global world/SVG coordinates within deterministic display tolerance, and source path data remain bytewise unchanged.

## Requirement: Touch selection is independent of swipe
Only joints SHALL be selectable. Simple tap in single-select replaces selection with the tapped joint (re-tapping keeps it selected); in multi-select it toggles tapped membership. Holding includes the joint and enters multiselect for subsequent taps; tapping blank stage clears set and exits multiselect. Swipe or drag NEVER acquires/changes selection, even when it crosses another joint. Once gesture passes drag threshold it cannot turn into a tap; second finger/pointercancel cancels pending edit atomically. Detailed target/priority/threshold table in `docs/GESTURE-CONTRACT.md` applies, with marker-start ROTATE handling awaiting Human Gate G1.

#### Scenario: Drag across other joints
- GIVEN shoulder selected, WHEN finger drags across elbow and wrist, THEN shoulder stays selected, elbow/wrist stay unselected and operation pivot remains fixed.

## Requirement: Exactly two explicit transform tools
ROTATE SHALL hinge a free branch about the closest selected hinge, with rigidly rotating chain and no hidden compensation; invalid interior branch rejects. FLIP SHALL rotate whole actor about selected joint or centroid of multiple selected joints, preserving accumulated global angle. Whole actor translation SHALL be implicit when dragging body with no joint selected; an X/Y/OFF control MAY restrict axes. No MOVE mode button.

#### Scenario: Flip full turn
- WHEN FLIP executes a 360° gesture THEN stored root orientation changes by 360° rather than normalizing to zero; selected joint angles remain unchanged.

## Requirement: Ground boundary throughout playback
No transformed visible body path (including visible stroke) SHALL cross the fixed world-space floor after an accepted edit, FLIP, Rotate, implicit Move, or playback evaluation. No hidden DOF compensation/root lift during ROTATE/FLIP: reject or clamp angular progression keeping chosen pivot fixed; implicit Move may clamp root Y only if Y motion is allowed. Interpolation is evaluated without altering keys and stops at first invalid contact. Camera never reveals more below-floor space than initial framing. Ground policy and Human Gate G2 are in `docs/GROUND-AND-REFERENCES.md`.

#### Scenario: Rotated landing
- GIVEN a handstand or fully rotated actor, WHEN moving toward floor or playing interpolation THEN no part penetrates and contact remains editorial, not physically interpreted.

## Requirement: Camera navigation
Swipe blank stage SHALL pan, pinch SHALL simultaneously zoom and pan around the fingers' midpoint without modifying pose. Camera SHALL respect floor framing and allowed bounds. Timeline pinch SHALL affect only time viewport.

#### Scenario: Blank stage does not edit
- WHEN user pinch-zooms on blank stage THEN authored pose, joint selection and timeline head do not change.

## Requirement: Timeline intent isolation
Tap key SHALL select without moving head; double tap seeks and opens key; long press enters multiselection. Swipe SHALL not select key; ruler tap and head drag move cursor; blank timeline swipe pans; pinch zooms focal-anchored; left edge never less than time zero; zoom-out extending range requires explicit duration behavior. Retime selected keys without identity change; copy/paste/insert/delete key operations shall have Undo.

#### Scenario: Selecting an adjacent key
- GIVEN current edit at 1.0 s and a selected key at 1.2 s, WHEN tapping another key once THEN head and active authored key stay at 1.0 s, only timeline selection changes.

## Requirement: Play / Pause
Play SHALL progress from current head, toggle to PAUSE while running; Pause SHALL freeze current evaluated state and head, without resetting time to zero. Separate stop/reset MAY exist if clearly labeled.

#### Scenario: Resume
- WHEN pausing at t=1.37 s and pressing Play THEN motion continues from 1.37 s.

## Requirement: Edits persist in active project pose
Accepted gesture edit SHALL update the explicitly active authored key directly and autosave the project locally on each transaction, with atomic Undo/Redo. Editing an evaluated in-between-key pose is NOT allowed until the user explicitly ADDs or PASTEs a new authored key at the head. Page cold reload SHALL restore clip and separate library without pressing Save. SAVE TO LIBRARY creates/updates an independent named asset only; browsing a library row never inserts automatically. Storage failure is visible and must not silently discard in-memory edits. `docs/EDITOR-STATE-AND-STORAGE.md` defines state separation and duration/clipboard conflict policy.

#### Scenario: Reload without library Save
- WHEN an active key is edited, project persisted and page reopened THEN edited key remains while library asset remains unchanged.

## Requirement: Simple right-side library
Minimal collapsible right library SHALL show plain tree-like text rows without heavy containers, never overlay timeline, list/save/reopen/insert poses at head with separate asset and instance identities.

#### Scenario: Library insert
- WHEN a library pose is selected and loaded at head THEN it creates an editable timeline instance while library source stays unchanged.

## Requirement: References are selected-key-driven
REF toggle ON SHALL show exactly selected timeline keys; deselection/deletion removes each guide immediately. Saved poses are frozen snapshots captured on selection (or when REF is turned ON for selected keys), remaining unchanged during edit/seek/double-tap until deselect/reselect. A ghost key is time/ID only, evaluates live at its own fixed time using nearby authored poses; converting to authored pose is explicit. Nearer-to-head guide opacity is greater than farther; guides cannot capture input. REF OFF clears references; ON recaptures current selection. Reload starts with REF OFF. `docs/GROUND-AND-REFERENCES.md` defines lifecycle.

#### Scenario: Stale reference regression
- GIVEN two selected referenced saved poses, WHEN deselecting one THEN its guide disappears immediately while the other stays; toggling OFF removes all.

## Requirement: Browser and evidence
Chrome Android and desktop SHALL perform full loop create/select/edit/undo/redo/references/play/save/reload. Automated Chromium mouse, touch, long-press, pinch and pointercancel scenarios SHALL be distinguished from manual hardware evidence; public HTTPS PWA behavior SHALL be checked before claims.

#### Scenario: Android and persisted project
- GIVEN a cold browser start, WHEN user creates a 3-pose clip, edits an intermediate key, plays/pauses, adds a reference and reloads project THEN values and references semantics are predictable and no original source is modified.

## Requirement: Authoring, evaluation and interpolation are separate
Head/playhead, selected key set, active authored key, evaluated pose and library asset SHALL be distinct. An interpolated pose SHALL NOT silently become writable, and a single tap on a timeline key SHALL NOT change the active authored key. Local joint angles interpolate as scalar design channels; root orientation interpolates in unwrapped accumulated degrees (360° is not 0°). Evaluations below floor are invalid and playback SHALL stop with visible feedback; no root autocorrection.

#### Scenario: Mid-pose edits are never implicit
- GIVEN playhead lies at 1.37 s between authored keys, WHEN user swipes actor without ADD/PASTE, THEN both keys and library remain unchanged and UI requests explicit key insertion.

#### Scenario: Accumulated turn
- GIVEN source keys root ori 0° and 360°, WHEN playing through their interval, THEN body makes a full progressive turn and orientation/IDs survive export/import.

## Requirement: Editable key timeline semantics are deterministic
Only already selected timeline keys may retime on drag; dragging an unselected marker SHALL NOT select or retime it. Tap ruler seeks; drag head scrubs; blank timeline drag pans. One key per time; invalid retime collision rejects atomically. Zoom-out beyond duration SHALL intentionally expand project duration as a visible, undoable operation while preserving the exact absolute seconds of every existing key. Zooming back in shall not shorten duration automatically.

#### Scenario: Invalid retime rollback
- GIVEN two selected keys dragged into an occupied instant, WHEN drag ends, THEN all original times and stable IDs remain unchanged and a visible collision warning is shown.

## Requirement: Versioned import/export and safe local persistence
The editor SHALL export/import versioned project/library pose data in a data-only format, with exact source SVG SHA, rig ID/version, joint identity/units, global accumulated orientation, stable object IDs, times in seconds, and DESIGN provenance. Unsupported/invalid payloads SHALL fail validation before changing state; arbitrary imported executable SVG/script SHALL NOT execute in initial Lite. Local persistence errors SHALL be visible and offer export, with no claim of server synchronization.

#### Scenario: Atomic incompatible file rejection
- GIVEN an import JSON with unsupported schema or duplicate key ID, WHEN importing, THEN error is visible, local library and clip remain byte-identical, and no remote request is required.

## Requirement: Joint gestures and cancellation are one transaction
Gesture target/pivot selection SHALL be immutable once a drag starts; hold SHALL consume the gesture and not become drag, and pinch/pointercancel SHALL cancel uncommitted editing rather than leaving partial states. One drag equals one undoable authoring transaction, regardless of incoming pointer event frequency.

#### Scenario: Same path at different touch sampling rates
- GIVEN a ROTATE path sampled at 8 and 24 events, WHEN applying it from identical starting pose, THEN the end pose coincides within stated numerical tolerance and selection remains identical.

## Requirement: Human review and evidence boundary
All accepted behaviors SHALL be verified by scenario-driven browser tests, plus separate manual-only Android Chrome evaluation. A screenshot, idle Pi session, judge stop verdict, or checked task SHALL NOT imply accepted implementation. Exact active Goal, SHA, test evidence, and scientific DESIGN label SHALL be reported.

#### Scenario: Review before implementation
- GIVEN UI Human Gate unapproved, WHEN planning review finishes, THEN Goal stays paused, no feature-build worktree or deployment is initiated, and only OpenSpec/read-only review changes are allowed.
