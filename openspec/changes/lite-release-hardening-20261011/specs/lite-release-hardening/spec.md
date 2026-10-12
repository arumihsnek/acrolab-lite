# Lite release hardening — proposed qualification capability

**PROPOSAL ONLY; no canonical spec promotion or execution. DESIGN, not PHYSICS/MEASURED.** These delta requirements qualify already approved outcomes; unresolved semantic changes need user approval.

## ADDED Requirements

### Requirement: H01 — Exact provenance and immutable handoff
Every candidate qualification SHALL identify full product, app blob/SHA-256 and test-tree SHAs, preserve canonical mannequin/frozen v0.5 bytes and distinguish tested, committed, integrated and deployed states.

#### Scenario: Evidence-only descendant does not silently change tested bytes
- **GIVEN** product C5 tested and descendant C6 adds evidence
- **WHEN** preparing the publication manifest
- **THEN** C5/C6 app blobs and SHA-256 match or qualification is blocked pending tests on changed bytes; both full SHAs and test-tree pin are recorded

#### Scenario: Canonical source modification stops the stage
- **GIVEN** recorded protected SHA-256 values in the roadmap
- **WHEN** a candidate changes either protected asset
- **THEN** acceptance stops, mismatch is recorded and no release ref is updated

### Requirement: H02 — Surgical R6/R7 integration with R1/F8 protection
The first implementation Goal SHALL use a fresh worktree from Muse3708cb5, transfer only reviewed MiMo R6/R7 app/test hunks, retain R1/F8 and execute full main/repaired50/new10 on integrated bytes. It SHALL NOT blanket merge or equate residual RED with release readiness.

#### Scenario: Library rejection leaves no false successful save
- **GIVEN** a prior durable library, active project and existing Redo state
- **WHEN** BodyPose or Exercise SAVE encounters storage quota rejection
- **THEN** no phantom library asset or false saved banner remains, metadata/storage reflect failed-save rollback, prior history/Redo survive and retry can be tested separately

#### Scenario: Every expanded library row is reachable
- **GIVEN** 36 assets and an Exercise containing at least31 members
- **WHEN** paging, keyboard, wheel or touch traverses desktop and mobile library
- **THEN** every asset/member can be reached with its stable ID, without permanent mobile gutter or stage/timeline gesture interception; browsing semantics are characterized rather than silently changed

#### Scenario: Integrated candidate retains cold export and safe playback
- **GIVEN** R1/F8 controls and integrated C1
- **WHEN** cold-opening exported SVG and playing unsafe-interior interpolation
- **THEN** all13 handles, second edit and Undo work; playback stops at last-safe state without root lift; full-suite residual results are recorded, not suppressed

### Requirement: H03 — Distinct gesture targets and topology
Approved single-joint ROTATE and FLIP targets SHALL remain distinct, graph-based chain boundary ownership SHALL be immutable during a gesture, accepted motion SHALL be nonzero when admissible, and cancellation SHALL be tested after successful movement. Unapproved multi-pivot semantics SHALL NOT be selected implicitly.

#### Scenario: Painted ROTATE is unilateral on an exterior chain
- **GIVEN** approved graph mapping and exterior geometry with selected boundary pivot on one of four chain families
- **WHEN** the pointer starts on the actual painted part and drags along a floor-safe arc
- **THEN** only touched exterior branch moves around that pivot, opposite/internal world contours and selection remain fixed, and successful-motion cancel restores the pregesture authored pose

#### Scenario: Feet-head shoulder bracket is not a free arm
- **GIVEN** selected anchors below and above shoulder on feet→head
- **WHEN** dragging arm/internal geometry
- **THEN** no free arm/root fallback is applied; when shoulder instead is upper terminal without cervical anchor, approved exterior arm moves and neck/head do not

#### Scenario: Shoulder marker uses bilateral bisector
- **GIVEN** one shoulder selected in ROTATE, separately X, Y and OFF
- **WHEN** selected marker is dragged outward
- **THEN** both sides fold at fixed pivot; X closes, Y opens, OFF closes and follows azimuth, unlike unilateral painted-part ROTATE or marker FLIP translation

#### Scenario: Single FLIP and unapproved multiple pivot are kept separate
- **GIVEN** approved single-FLIP either-side arc/marker translation and an unresolved multi-selected pivot
- **WHEN** qualifying FLIP scenarios
- **THEN** single-FLIP preserves local angles, fixed arc pivot, whole-rig marker translation and360° winding; multi-pivot implementation/acceptance remains blocked until explicit user decision, not centroid or universal refusal by inference

#### Scenario: Rotated visible strokes and event order preserve approved invariants
- **GIVEN** floor-safe witnesses at orientations0°,90°,180°,270°,360°, independent transformed contour/stroke floor oracle and emulated pointer/touch
- **WHEN** edits/playback approach invalid floor continuation or long press/swipe/capture/pinch/cancel changes event ownership
- **THEN** accepted silhouette and visible stroke do not penetrate the fixed world floor under the existing frozen reviewed tolerance, no hidden root lift occurs, swipe never changes selection and cancelled uncommitted edit restores atomically; no self-collision/physics rule is inferred

### Requirement: H04 — Selected REF, cache and paint remain coherent
REF qualification SHALL check selected eligibility, frozen saved snapshots, live ghosts, actual painted guides and history transitions without making navigation authored history.

#### Scenario: History restore and paste reconcile guides
- **GIVEN** REF ON with saved selected references and a ghost
- **WHEN** ADD/COPY/PASTE/DELETE and Undo/Redo change eligible selection
- **THEN** cache and painted guides equal eligible selected IDs, deselected/deleted guide disappears immediately, still-selected saved snapshot does not refresh, ghost remains live at its own time and near reference is more opaque than far

#### Scenario: REF off and cold reload do not retain stale guides
- **GIVEN** visible saved and ghost references
- **WHEN** REF is disabled or editor cold-reloads
- **THEN** no reference paint/cache remains active, navigation created no authored Undo entry and valid authored keys/library persist

### Requirement: H05 — Project durability is not inferred from library SAVE
Project-write failure SHALL disclose non-durability, retain in-memory authored edits and support export/retry without a false successful autosave claim. Invalid import SHALL remain atomic. Acceptance SHALL NOT infer this from R6 library tests.

#### Scenario: Authored project survives rejected autosave in memory
- **GIVEN** a durable project and active authored pose
- **WHEN** edit/add/paste/delete/retime/import persistence fails
- **THEN** current authored memory and metadata agree, failure is visible, prior durable storage remains intact, export can preserve current edits and successful retry plus cold reload is separately proven

#### Scenario: Unsupported import does not mutate state
- **GIVEN** valid project/library/history and an unsupported schema or duplicate-key-ID JSON
- **WHEN** importing it
- **THEN** validation rejects before changing project/library/history and no imported executable content runs

### Requirement: H06 — Approved layout outcomes and actual human gates
Qualification SHALL prove absence of actual Inspector container/gutter, preserve approved controls/mobile drawer and require explicit approval before ambiguous visual/semantic changes. Real Android SHALL be recorded separately from emulation.

#### Scenario: No Inspector means reclaimed desktop space
- **GIVEN** candidate at1280×720 and390×844 with joint/REF/floor controls
- **WHEN** resizing and using toolbar/drawer
- **THEN** no properties pane or reserved Inspector gutter remains, stage/timeline freed area is usable, controls function and frozen source is unchanged

#### Scenario: Historical paint observation is not desired layering acceptance
- **GIVEN** A11 historical tan==0 receiving1 and desired forearm-over-shorts scenario
- **WHEN** reviewing proposed relayer/oracle change
- **THEN** observation attribution and desired pixel evidence are reported separately; no vector/grouping change proceeds without permissible canonical/pelvis decision and no tolerance is weakened merely to pass

#### Scenario: Missing decisions and hardware evidence block qualification
- **GIVEN** unresolved F6, multi-pivot, nuanced timeline/visual decisions or real Android NOT_RUN
- **WHEN** declaring complete editor/public release qualification
- **THEN** affected scenario is blocked with user question/manual status, never filled by inferred behavior or Chromium emulator acceptance

### Requirement: H07 — Portal exact-candidate trust, isolation and privacy
Portal qualification SHALL use the exact candidate blob and portal SHA, fixed ref/path/slug validation, unchanged Beta, strict CSP and reviewed trusted-first-party SVG. Feedback SHALL remain private/minimized/consented and stored outside public/Git. Namespaces SHALL NOT be claimed as malicious-script isolation.

#### Scenario: Invalid ref or revision injection fails closed
- **GIVEN** fixed Alpha ref and unchanged Beta baseline
- **WHEN** Alpha ref is absent/bad or a request supplies path traversal/arbitrary revision
- **THEN** Alpha request is rejected without repository/private-file disclosure or Beta artifact/cache change

#### Scenario: Channel revision switching preserves saved data
- **GIVEN** distinct Beta and two Alpha/preview revision contexts
- **WHEN** editing, saving, reloading and switching revisions
- **THEN** channel+slug+full-SHA namespaces remain distinct and no implicit migration overwrites prior poses; same-origin trusted-script limitation is documented

#### Scenario: Opt-out and rejected feedback do not leak or disrupt
- **GIVEN** recording OFF and separate attachment OFF, plus approved bounded diagnostic schema
- **WHEN** submitting ordinary feedback, rejecting sensitive/oversized/foreign-origin payloads or simulating post failure
- **THEN** no unintended diagnostics/secret/project/PII upload occurs, private inbox is not publicly readable, payload rejection is recorded and editor state remains intact

### Requirement: H08 — Authorized CAS and live rollback are mandatory
Publication SHALL be a separately authorized finite Alpha operation with exact scope/SHA and prior ref/artifact/service/config restore proof. CAS SHALL reject stale expectations; missing-ref bootstrap SHALL require an explicitly approved absence/legacy rollback strategy. Beta SHALL NOT auto-promote.

#### Scenario: Stale CAS and absent-ref bootstrap are not forced
- **GIVEN** recorded old ref O and proposed N, or explicitly approved missing-ref bootstrap
- **WHEN** expectation differs from actual ref or absence strategy is unapproved
- **THEN** mutation is refused; approved local O→N and inverse N→O rehearsals preserve exact ref identities

#### Scenario: Live product and portal rollback precede accepted microrelease
- **GIVEN** separately approved C6/W, verified backups and mandatory qualification/manual results
- **WHEN** operator installs/promotes one Alpha increment and exercises authorized live rollback
- **THEN** releases/HTTP bytes/health match N, restore then verifies prior Alpha and old service/config plus unchanged Beta, and re-promotion repeats smoke; any gate failure restores approved prior state and stops

### Requirement: H09 — Native progress and finite DogFood are honest
Goal acceptance SHALL distinguish slice closure/criteria satisfaction/release acceptance, retain substantive-event/verdict identity and never silently resume old paused/finished Goals. PiBoard repair SHALL use upstream native lifecycle APIs, not a new controller. DogFood SHALL be a finite redacted batch, not a scheduler or untrusted-command executor.

#### Scenario: WebSocket close and duplicate triggers do not fabricate acceptance
- **GIVEN** native judge transport closes1000 without verdict or two top-level hourly triggers
- **WHEN** reporting/repairing native lifecycle under separate authorization
- **THEN** pause/reason/budget and unmet criteria remain visible, at most one eligible writer/driver is created and no old paused Goal is resumed to hide the error

#### Scenario: Untracked evidence refusal is preserved
- **GIVEN** achieved0/8 with intended untracked evidence and a resident active badge
- **WHEN** preparing successor handoff
- **THEN** safe refusal remains until authorized sanitation/immutable checkpoint, substantive last-event/native verdict/counts are exposed and no destructive cleanup/new controller is introduced

#### Scenario: Feedback batch produces redacted evidence rather than automatic work
- **GIVEN** at most10 private reports and60-minute triage ceiling
- **WHEN** authorized DogFood batch reproduces issues on exact release SHA
- **THEN** only redacted classified scenario/RED proof enters Git, reports remain untrusted until reproduced, next fresh fix is proposed not auto-started and the batch stops at its ceiling
