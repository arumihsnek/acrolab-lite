# Capability lite-v060 — M1 playable scope (PROPOSED, not accepted)

## ADDED Requirements

### Requirement: V60.01 — Safe selection (single/multi)

The editor SHALL select only joints on tap/click; swipe/drag SHALL NEVER acquire another
joint; hold enters multi-select; blank-stage tap deselects.

#### Scenario: Swipe across markers keeps selection

- **Given** elbow selected with an authored pose
- **When** the pointer swipes across other joint markers and releases
- **Then** the selected joint is still elbow, authored angles are unchanged, and exactly one
  Undo entry (or none, if no edit) exists.

### Requirement: V60.02 — ROTATE marker-bilateral vs painted-unilateral

With a selected joint, marker drag folds BOTH sides by bisector (X/Y/OFF per contract);
connected free-part geometry drag rotates ONLY the touched branch about the pivot, opposite
side fixed; no-selection actor drag translates the whole actor.

#### Scenario: Painted part moves one branch, marker moves both

- **Given** shoulder selected, X axis
- **When** the user drags painted upper-arm geometry outward, undoes, then drags the shoulder
  marker outward
- **Then** the part drag moves only the arm branch (head side stable) and the marker drag
  folds both sides with the pivot stable; both MARK `pageerror` empty.

### Requirement: V60.03 — FLIP single-joint arc vs marker translation

With exactly one joint selected, body-side drag rotates the WHOLE rig about the joint
(local angles fixed, winding kept); selected-marker drag translates the whole rig under
X/Y/OFF. Multi-FLIP is out of scope (refuse visibly, no centroid invention).

#### Scenario: Either-side FLIP arc keeps local angles

- **Given** hip selected, OFF axis
- **When** the user drags either connected body side through ~90° and then drags the marker
- **Then** the arc preserves local joint angles with pivot fixed, and the marker drag only
  translates; cancel/Undo restores pre-gesture state.

### Requirement: V60.04 — Camera never authors

Empty-stage swipe pans, pinch zooms about focal center; zoom/pan change no authored pose,
selection, or history; floor framing invariant holds.

#### Scenario: Pinch leaves authoring untouched

- **Given** an authored pose with history depth N
- **When** the user pinches and pans the stage
- **Then** pose bytes, selection and history depth are identical and export is unchanged.

### Requirement: V60.05 — Nonpenetrating DESIGN floor

The silhouette (independent transformed-contour + visible-stroke oracle) stays at/above the
world floor across orientations and interpolated interiors; unsafe continuation stops
last-safe with warning, no hidden root lift. DESIGN only — no physics/contact claim.

#### Scenario: Rotated playback stops last-safe

- **Given** a pose whose interpolation interior dips toward the floor
- **When** playback crosses the unsafe interior
- **Then** evaluation stops at the last safe frame with a visible warning and keys unmutated.

### Requirement: V60.06 — Timeline authoring with Undo purity

Tap selects, ruler/head seek never auto-authors; add/copy/paste/delete/retime preserve key
identities; navigation writes no Undo entries; PLAY→PAUSE keeps time/state.

#### Scenario: Seek writes no history

- **Given** history depth N and three keys
- **When** the user seeks via ruler, selects keys, copies and pastes near current time
- **Then** seeks added zero entries, paste added exactly one, and Undo restores pre-paste keys.

### Requirement: V60.07 — REF selected/cache/paint coherence

REF ON shows ONLY selected timeline poses as guides; deselect removes immediately; saved
guides are frozen snapshots (edit/seek do not refresh); ghost is live at its own time;
nearer playhead = darker. REF OFF clears guides + cache; reload starts REF OFF.

#### Scenario: Deselect removes guide immediately

- **Given** REF ON with two saved poses + ghost selected
- **When** the user deselects one saved pose, edits the other, then toggles REF OFF/ON
- **Then** painted guides always equal eligible selection; the edited survivor's guide is
  byte-identical to its frozen capture; ghost tracked live; OFF shows zero guides.

### Requirement: V60.08 — Honest local persistence + cold round-trip

Authored edits apply immediately with Undo; SAVE writes named library scope only; quota/write
failure is disclosed visibly with memory edits kept and export available (no false saved
banner, no phantom asset); cold reload restores durable state; exported SVG cold-opens and
supports a second edit + Undo. Protected asset bytes unchanged (mannequin `99ccb171…`,
v0.5 `93246123…`).

#### Scenario: Quota failure keeps work and tells truth

- **Given** a filled store rejecting BodyPose and Exercise saves
- **When** SAVE is attempted, then export, then retry after space, then cold reload
- **Then** rejection is visible, memory/history intact, export holds current edits, retry is
  durable, reload restores it, and no phantom asset exists.

### Requirement: V60.09 — No Inspector, mobile drawer

No Inspector/properties panel or reserved gutter on any viewport (candidate only; frozen v0.5
untouched); toolbar keeps X/Y/OFF + selection/REF/floor feedback; library is a hidden
right drawer (button or safe-chrome swipe, never Back edge, no permanent strip, no input
theft when closed).

#### Scenario: Drawer never steals stage input

- **Given** the library closed on 390×844 touch
- **When** the user gestures on stage/timeline then opens the drawer via the button
- **Then** no stage gesture was intercepted and opening changed no authored/selection/camera state.

### Requirement: V60.10 — M1 provisional preview vs M2 public qualification

M1 is a **'preview privada provisional para jugar'**: deliverable to the user for play
BEFORE any manual verdict, and it is NEVER `v0.60-qualified` and NEVER public. M1 entry
requires ALL of: exact candidate SHA recorded; zero known catastrophic P0 risks (any actual
data loss or script exception BLOCKS even private trial — safety is never waived); L0 unit
matrix + L1 core smoke GREEN; L2 selected J-journeys GREEN — the full J1–J12 set or a
representative subset that ALWAYS includes the dangerous-core J3 (axial-invalid), J7 (floor)
and J10 (persistence-loss); no unexplained regression in touched behaviors; app openable
locally in private; a clear known-RED ledger (A11×2/A15b×1/X4×1 allowed in a visibly
labeled M1 ONLY if non-catastrophic — they MUST NOT be read as M2-ready); no unapproved
visual redesign. User play and Android feedback happen AFTER M1 delivery — the manual L4
verdict is NOT an M1 entry condition.

M2 (public 0.60 Alpha) additionally requires: L3 comprehensive run once on the immutable
SHA (full desktop + mobile + repaired50/new10); independent different-provider (DeepSeek)
review on immutable bytes; L4 physical-Android acceptance; A15b no-Inspector AND no-gutter
proven; A11 visual-gate decision recorded; D4 project write-loss/fail-honesty gate closed;
X4 determinism addressed by root cause plus a classified test or a fix (never silently
waived); G5 explicit exact-scope publish approval; L5 portal CAS/privacy/rollback proofs.
Beta untouched.

#### Scenario: M1 delivers before L4, M2 waits for everything

- **Given** a candidate with L0 + L1 GREEN and dangerous-core J3/J7/J10 GREEN, no data
  loss or script exception, known A11/A15b/X4 RED ledgered as non-catastrophic, but L3
  NOT_RUN and no manual verdict yet
- **When** the readiness checklist is evaluated
- **Then** M1 provisional preview is DELIVERABLE for private play AND the same candidate
  is NOT-QUALIFIED for M2, naming L3, DeepSeek review, L4, A15b/A11/D4 gates, X4
  root-cause, G5 and L5 as blockers (never inferred, never waived).
