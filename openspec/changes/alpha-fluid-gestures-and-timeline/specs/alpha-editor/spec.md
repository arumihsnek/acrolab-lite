# Alpha Editor — fluid interaction delta

Status: USER UX DECISIONS captured 2026-10-10; **NOT IMPLEMENTED NOR ACCEPTED** on `/alpha/`. Delta capability: `alpha-editor`. No biomechanics or physics claims.

## ADDED Requirements

### Requirement: A01 — Responsive fluid SVG canvas
The editor SHALL reflow stage, timeline, controls and library fluidly across available window proportions without switching between two fixed whole-app-sized viewBoxes, losing rig geometry or changing authored data.

#### Scenario: Stage survives live aspect-ratio changes
- **GIVEN** an authored project open at 360×800, 390×844, 800×600, 1280×720 or 1920×1080
- **WHEN** the viewport/frame is resized, including a landscape/portrait transition
- **THEN** every needed control and all 13 joints remain reachable, the library cannot cover timeline keys, the stage is not clipped and authored body/keys remain unchanged

### Requirement: A02 — Selected joint marker invokes bilateral bisector; unselected body drags root
With exactly one joint selected and ROTATE active, a drag originating on the **selected marker** SHALL fold both sides symmetrically around that joint's bisector under the existing radial X/Y/OFF semantics. With no selection, a drag on body geometry SHALL translate the actor and SHALL NOT change joint angles. Marker drag SHALL NOT be silently treated as a drag on a connected free part.

#### Scenario: Marker ROTATE retains the earlier bisector rules
- **GIVEN** an elbow joint selected and the ROTATE tool active
- **WHEN** the finger starts on the selected elbow marker and drags outward/inward under X, Y and OFF
- **THEN** both sides fold symmetrically around the fixed joint, X-out closes, Y-out opens, OFF allows the bisector to track finger azimuth and the opposite part is not held fixed

#### Scenario: No selection allows implicit whole-actor translation
- **GIVEN** there is no joint selected
- **WHEN** dragging body geometry with axis lock X/Y/OFF
- **THEN** the whole actor translates under the applicable translation constraints and local joint angles remain unchanged

### Requirement: A03 — Only touched exterior free branch rotates; constrained chains take precedence
A ROTATE drag beginning on **free-part geometry** SHALL move only the touched free branch about its selected boundary joint; the other side and constrained internal joints SHALL remain fixed. With multiple selected joints, the editor SHALL classify internal and free paths via feet→head, feet→hands, hands→head, hands→shoulder; feet→head has priority if anchors bracket shoulder from below and above. A constrained interior SHALL NOT fall back to whole-actor motion.

#### Scenario: Unilateral arm rotation about shoulder
- **GIVEN** shoulder is the only selected joint
- **WHEN** dragging arm geometry rather than the shoulder marker
- **THEN** only the touched arm branch rotates about shoulder, torso/head remain fixed and selection stays shoulder

#### Scenario: Multiselection foot-head shoulder-bracket priority
- **GIVEN** selected anchors on the feet→head chain below and above the shoulder branching position
- **WHEN** dragging arm geometry or an internal segment between selected anchors
- **THEN** the arm and shoulder are treated as part of the constrained interior, not as a free outward branch; no accidental global translation occurs

#### Scenario: Shoulder is upper terminal selected anchor
- **GIVEN** lower-body selected anchors plus shoulder as the highest selected anchor and no selected neck/head anchor
- **WHEN** dragging the exterior branch emerging from shoulder
- **THEN** the arm, not neck/head, is the free continuation and all constrained interior parts remain fixed

#### Scenario: Arm selections do not promote cervical branch
- **GIVEN** selected arm-side anchors but neither neck_base nor head_neck selected
- **WHEN** dragging arm-side free geometry
- **THEN** the compatible arm chain is used and neck/head are not inferred free solely by graphical proximity

#### Scenario: Multiple path families are classified by topology
- **GIVEN** selected anchors along feet→head, feet→hands, hands→head or hands→shoulder
- **WHEN** beginning a ROTATE gesture on geometry of one chain
- **THEN** the chosen free branch is exterior to the selected boundary on that chain and interior segments between the anchors are never treated as free

### Requirement: A16 — G1 canonical 13-joint branched topology binding (user-approved 2026-10-11)
The editor SHALL use the canonical branched skeleton: distal foot terminal `mtp` (articulated `ankle`,`midtarsal`,`mtp`, painted toes preserved); distal hand `collective_finger` singular canonical C1 runtime ID (`collective_fingers` source plural alias for normalization only; articulated `elbow`,`wrist`,fingers); appendicular branch `upper_trunk→shoulder→elbow→wrist→collective_finger`; axial feet→head `…→upper_trunk→neck_base→head_neck` with `shoulder` NOT an axial parent. Axial priority SHALL treat the junction level between `upper_trunk` and `neck_base`; bracketing lower+upper selections (e.g. `upper_trunk`+`neck_base`) SHALL constrain arm+shoulder interior without requiring `shoulder` selected. Upper-terminal `shoulder` SHALL free the ARM not neck/head; arm-only selections SHALL never promote cervical. Hit disambiguation SHALL be topological (not screen-nearest); raw pivots for `part-forefoot`/`midtarsal` and `part-toes`/`mtp` SHALL require transform-aware validation (rendered≠raw); `orig-pelvis` legacy `data-part="hip"` is ownership not hinge. Multi-selected marker overconstraint and multi-selected FLIP pivot stay unresolved gates.

#### Scenario: Distal foot interior refusal (midtarsal+mtp selected, forefoot touched)
- **GIVEN** selected `{midtarsal,mtp}` and painted `part-forefoot` touched with a ROTATE part-drag in any of X/Y/OFF
- **WHEN** the gesture is evaluated
- **THEN** it is refused as constrained interior: world transform stable, no Undo entry, concise interior feedback; identical verdict across X/Y/OFF

#### Scenario: Distal hand interior refusal (wrist+collective_finger selected, hand touched)
- **GIVEN** selected `{wrist,collective_finger}` and painted `part-hand` touched with a ROTATE part-drag
- **WHEN** the gesture is evaluated
- **THEN** it is refused as constrained interior: world stable, no Undo entry, no cervical promotion

#### Scenario: Shoulder-bracket priority refusal without selecting shoulder
- **GIVEN** selected `{upper_trunk,neck_base}` (`shoulder` NOT selected) and painted `part-upper_arm` touched
- **WHEN** a ROTATE part-drag begins on the arm
- **THEN** it is refused by feet→head priority: arm+shoulder are constrained interior, world stable, no fallback translation, no Undo entry

#### Scenario: Upper-terminal shoulder frees arm only
- **GIVEN** `shoulder` as highest selected anchor plus a lower selected anchor, no selected neck/head, arm geometry touched
- **WHEN** a ROTATE part-drag begins on the arm
- **THEN** only the arm branch rotates about `shoulder`; head/neck stay fixed, selection stable, one Undo transaction on commit

#### Scenario: Cancel and Undo preserve authoring isolation
- **GIVEN** any A16 matrix case mid-gesture under real-touch pointer emulation
- **WHEN** `pointercancel` fires or Undo is invoked after a committed free-branch rotation
- **THEN** cancel restores pre-gesture authored state atomically (no camera/selection change); Undo restores authored pose only, never camera or selection

### Requirement: A04 — Direct normal key selection edits at its timestamp
The editor SHALL distinguish a direct POSE-key tap from an indirect ruler/playhead seek, and SHALL suppress automatic seek/edit activation if multiselect or REF is enabled. Navigation and selection SHALL NOT create authored Undo history.

#### Scenario: Normal pose key tap activates editing
- **GIVEN** multiselect inactive and REF off
- **WHEN** tapping a saved POSE timeline marker
- **THEN** the head seeks to that key's exact t and activates the selected authored POSE for editing without writing a new key

#### Scenario: REF or multiselect leaves the head intact
- **GIVEN** REF on or multiselect active
- **WHEN** tapping a pose key
- **THEN** only selection/reference changes; the playhead and edit activation stay as they were

#### Scenario: Playhead or ruler seek never auto-edits
- **GIVEN** an authored pose at some timestamp
- **WHEN** dragging the head or tapping the ruler to that precise timestamp
- **THEN** the editor evaluates the pose without entering edit mode on that key merely because times coincide

### Requirement: A05 — Landscape pose-list selection reveals key in timeline
The editor SHALL pan the visible temporal viewport minimally to reveal an authored timeline key selected from the landscape pose list, without changing zoom or authoring state.

#### Scenario: Select offscreen pose from list
- **GIVEN** a landscape list row with an associated timeline key currently outside the visible ruler span
- **WHEN** selecting that row
- **THEN** the timeline pans just far enough to show the key; if already visible, it does not pan unnecessarily

### Requirement: A06 — STOP returns head and timeline to start, PAUSE freezes
STOP SHALL stop playback, set the head and timeline viewStart to zero and keep authored data and Undo untouched; PAUSE SHALL preserve current head and temporal viewport.

#### Scenario: STOP from scrolled and paused state
- **GIVEN** the clip paused away from t=0 with the timeline scrolled
- **WHEN** pressing STOP
- **THEN** playback is stopped, playhead is at t=0 and the timeline reveals its beginning without an authored edit

### Requirement: A07 — Horizontal mouse-wheel pan does not zoom
A horizontal wheel or touchpad delta SHALL pan the hovered temporal viewport or stage camera horizontally; it SHALL NOT change zoom, pose, key times, duration or Undo history.

#### Scenario: Horizontal wheel over stage and timeline
- **GIVEN** a nontrivial zoom and pan state with a playable pose
- **WHEN** sending a horizontal wheel delta over the stage or timeline
- **THEN** only the corresponding horizontal view offset changes; independent vertical-wheel zoom can remain available

### Requirement: A08 — Toggleable gravity-spacing design grid
A GRID toggle SHALL show noninteractive equidistant world-vertical lines and horizontal guide lines sampled from a **quadratic apex-relative spacing profile**: dense near the upper apex and progressively farther apart downwards. The grid SHALL NOT claim measured physics, mutate authored data or create Undo.

#### Scenario: Grid displays an apex-relative spacing pattern
- **GIVEN** GRID initially disabled
- **WHEN** enabling it, then resizing/panning the stage and disabling again
- **THEN** vertical world-aligned lines maintain regular spacing, horizontal guides cluster near apex and separate below, and the toggle never changes authored poses

### Requirement: A09 — Shadow naming and outlined transparent guides
The UI SHALL call temporal GHOST guides **SHADOW** and render them with more transparent fill and more opaque silhouette outline, preserving touch-through behavior and compatibility with persisted `kind:"ghost"` keys.

#### Scenario: Shadow draw and older data import
- **GIVEN** visible reference/shadow guides and a persisted older ghost key
- **WHEN** toggling shadow and importing that valid key
- **THEN** the new UI uses SHADOW labeling, guide fill is subtler with a readable outline, click-through remains intact and the older key is accepted

### Requirement: A10 — Sparse silhouette thumbnails above timeline pose keys
The timeline SHALL render shadow-style noninteractive silhouette thumbnails above pose markers when projected screen space permits and SHALL deterministically hide overlapping thumbnails without hiding/selectively disabling any underlying timeline key.

#### Scenario: Dense and sparse timeline thumbnail rendering
- **GIVEN** two, ten and forty poses in a timeline at different zoom levels
- **WHEN** zooming, panning and resizing
- **THEN** visible silhouettes do not overlap excessively, active/selected/endpoints are prioritized, and all marker hit targets remain usable

### Requirement: A11 — Forearm must really paint in front of shorts
The editor SHALL paint the forearm above shorts in genuinely overlapping poses, verified by pixel-level or occlusion evidence rather than document position alone; original path and pivot source geometry SHALL remain intact.

#### Scenario: Cross forearm over shorts in Chrome
- **GIVEN** a deterministic authored pose with forearm-short overlap
- **WHEN** rendering in Chromium at desktop and emulated mobile viewports
- **THEN** captured pixels show the forearm in front, without changing canonical pivot centers or the source mannequin

### Requirement: A12 — Evidence-based acceptance and release traceability
Every acceptance claim SHALL identify exact tested source/candidate SHA and published alpha revision, real browser traces, prior-regression compatibility and remaining Human Gates. A Goal judge's `done` or an old test count SHALL NOT be treated as product acceptance.

#### Scenario: Candidate proof does not inherit old green status
- **GIVEN** frozen v0.5, the isolated candidate and a publicly served alpha release
- **WHEN** preparing an acceptance report
- **THEN** the report distinguishes their SHA/version, separately reports new A01–A12 results, remembers Android emulation is not real-device testing, and preserves unresolved multiselection overconstraint cases

### Requirement: A13 — FLIP whole-actor arc versus selected-marker translation
With **one selected joint** in FLIP mode, a drag beginning on **either of the two body portions** SHALL rotate the **entire mannequin rigidly about the selected joint world pivot**, with angle corresponding to the pointer/finger's arc around that joint; this SHALL NOT be a unilateral branch rotation and SHALL NOT alter local joint angles. A drag beginning on the **selected joint marker** SHALL **translate the entire mannequin as a block** under existing X/Y/OFF translation constraints, without rotating it. The selected joint SHALL remain selected; floor limits, cancellation and authored-only Undo SHALL be preserved.

#### Scenario: FLIP arc from either body side rotates the whole actor
- **GIVEN** the shoulder selected, FLIP active and a valid pose with no floor conflict
- **WHEN** dragging either arm geometry or trunk geometry along an equivalent angular arc about the selected shoulder
- **THEN** the entire mannequin turns through the arc, the shoulder world pivot stays fixed, the body's relative geometry and local joint angles do not change and the other half is not held motionless

#### Scenario: FLIP drag directly on selected marker translates the actor
- **GIVEN** a selected shoulder, FLIP active, an axis setting X/Y/OFF and a valid floor-safe pose
- **WHEN** starting the swipe exactly on the selected shoulder marker and dragging
- **THEN** all mannequin parts translate together in the permitted direction, global orientation and local joint angles remain unchanged and selection stays shoulder

#### Scenario: FLIP preserves full turns and cancels cleanly
- **GIVEN** one selected joint in FLIP, a zoomed stage and touch-emulated pointer
- **WHEN** sweeping the body through a complete valid turn, then separately beginning another FLIP gesture interrupted by pointercancel
- **THEN** the full-turn orientation remains unwrapped, the selected world pivot is unchanged during rotation, and the cancelled gesture returns to its pre-gesture authored placement without touching selection or camera

#### Scenario: FLIP ground collision clamps without lifting the root
- **GIVEN** a selected pivot and a body arc whose continuation would place the silhouette beneath the floor
- **WHEN** rotating in FLIP toward that invalid continuation
- **THEN** rotation stops at its last safe angle with visible limit feedback and the editor does not auto-elevate the actor

### Requirement: A14 — Mobile library is a compact-button drawer with gesture-safe swipe
In mobile/narrow layouts the library SHALL be closed by default and SHALL NOT occupy a persistent full-height vertical right gutter. It SHALL open via a **small library button** or by a deliberate inward swipe starting in the **rightmost quarter of eligible application chrome outside both stage and timeline**, away from the physical screen edge protected for Android Back. Gesture recognition SHALL be confined to those allowed start regions and SHALL NOT intercept editor gesture sequences; toggling the drawer SHALL NOT change authored state, selection, timeline or camera.

#### Scenario: Small button opens and closes library without stealing width
- **GIVEN** the editor loaded in a 390×844 mobile viewport with its library initially closed
- **WHEN** tapping the compact library button, then closing the drawer
- **THEN** the library opens as a temporary right overlay with an accessible close control, no permanent vertical stripe is reserved when closed, and stage/timeline remain reachable with unchanged project, camera and playhead

#### Scenario: Right-side app-chrome swipe opens drawer safely
- **GIVEN** a mobile layout with identifiable stage, timeline, application-chrome hit regions and a protected screen-edge margin
- **WHEN** an inward swipe starts within the rightmost quarter of eligible non-editor UI chrome but outside the system-edge safety zone
- **THEN** the drawer opens and the gesture does not begin at or require the physical Android Back edge

#### Scenario: Stage, timeline and Android edge gestures are not hijacked
- **GIVEN** the library closed, a selected joint, editable timeline key and touch-emulated input
- **WHEN** making horizontal swipes starting on stage, on timeline, near the physical right edge, or elsewhere outside eligible app chrome
- **THEN** the library stays closed and existing rotate/flip, camera-pan, timeline-pan/retime and system-edge-safe behaviors retain priority

#### Scenario: Closing library leaves editor state intact
- **GIVEN** an open library drawer containing saved poses and exercises
- **WHEN** tapping its close affordance or swiping closed from inside the drawer, including after a pointercancel
- **THEN** the drawer hides without authoring an Undo entry or changing selection, pose, playhead, timeline zoom or camera; the UI is usable again across portrait/landscape changes

### Requirement: A15 — Lite has no Inspector or inherited studio properties pane
The new AcroLab Lite candidate SHALL NOT render the legacy v0.5 `INSPECTOR` panel, a blank inspector gutter, or a replacement studio-like properties/solver pane in mobile or desktop. It SHALL retain necessary editor actions through the authorized controls (single cyclic X/Y/OFF toolbar button, ROTATE/FLIP, library, timeline, context feedback) without removing the underlying editable joint/pose selection state. The frozen v0.5 reference SHALL remain byte-identical and the Lite candidate SHALL NOT import scientific AcroLab/Godot code or specs as product authority.

#### Scenario: No Inspector on desktop while controls remain functional
- **GIVEN** the Lite candidate opened at 1280×720 with selected joint and active FLIP or ROTATE
- **WHEN** viewing the stage and using axis cycle, selection, floor-limit and reference feedback
- **THEN** no `INSPECTOR` panel, duplicate individual X/Y/XY inspector buttons or reserved gutter exists; normal toolbar controls and contextual status still work and stage/timeline occupy the freed area

#### Scenario: Mobile library is a drawer and never an Inspector
- **GIVEN** the same saved project in a 390×844 or 360×800 mobile viewport
- **WHEN** opening/closing the Pose/Exercise library drawer and rotating/translating the mannequin
- **THEN** no Inspector/properties pane or permanent right strip is introduced and the stage/timeline retain touch priority when library is closed

#### Scenario: Legacy Inspector stays archived but never becomes a requirement
- **GIVEN** frozen original SVG Motion Lab v0.5 plus the proposed successor candidate
- **WHEN** checking asset provenance, boundaries, tests and product specs
- **THEN** the source v0.5 SHA-256 is unchanged, its historical Inspector is treated as non-authoritative UI, the successor has no such panel and no AcroLab scientific repo import exists
