# Design notes — alpha editor delta

Status: REVIEW REQUIRED. This document records approved user outcomes and flags implementation choices that are still hypotheses.

## Fluid layout

Retain one authored rig-coordinate space independent of viewport; compute available stage, timeline, controls and library rectangles at resize/orientation. Do not choose one of two fixed app-sized viewBoxes as the whole layout. Keep SVG paths/pivot marks exactly as source; camera matrix, pointer-to-world transforms and hit targets must agree after live resize. Use flexible responsive zones and layout reflow rather than just stretching a fixed 1260x790/400x800 canvas. The outer /alpha iframe must fill its available container and editor must respond when frame size changes. Native landscape and narrow portrait must expose the same actions.

## No Inspector, and source-provenance separation

The frozen `assets/reference/svg-motion-lab-v0.5.svg` contains a right-side block labeled `INSPECTOR`, including `Selected joints`, `modeDescription`, three legacy separate axis buttons and explanatory FLOOR/REFERENCE text. The exact bytes also predate Lite's repository as `/home/ubuntu/acrolab-motion-lab-v0.5-deploy.svg.txt`. Its presence is **source carryover**, not user approval of an Inspector and not proof of derivation from the independent Godot/AcroLab project.

The new candidate layout SHALL **omit the Inspector container itself**, not merely hide its heading. Preserve functional mechanisms without duplicating desktop controls: the single compact cyclic X/Y/OFF control belongs in the normal action toolbar; mode can be shown by ROTATE/FLIP state; selection information, G2 floor-limit feedback and REF/SHADOW status can be brief contextual annotations when needed. Do not create alternative inspector-like property cards or a permanent right-hand metadata area. The only authorized right-side content is the Pose/Exercise library (A14: mobile drawer), plus optional minimal contextual controls explicitly covered by product specs.

Check SVG DOM and browser screenshots for actual Inspector disappearance, absence of a blank reserved gutter, no lost axis/selection functionality and uninterrupted stage/timeline hit-testing at desktop and mobile. **Do not alter frozen v0.5**; modify only the isolated candidate once implementation authorization/review criteria are met. Source/project boundary checks: no Godot engine files or parent repository imports; scientific boundary docs can mention AcroLab solely to prohibit coupling.

## Mobile library drawer and Android Back safety

In narrow/mobile layouts, do **not** reserve a permanent right-hand stripe for the library. Start **closed** with a compact, accessible library button in the app's existing toolbar/chrome. Opening it overlays a right-side drawer temporarily; closing restores the same stage/timeline viewport and preserves selection, playhead, camera, edits and zoom. Do not remap stage coordinates or create an Undo entry merely by toggling library visibility.

A secondary opening gesture starts from **eligible application chrome in the rightmost quarter of the interface width**, *not* from the physical 0-pixel screen edge and **never inside the stage or timeline**. Leave an OS-edge safety inset; pointerdown outside this safe chrome region has no library effect even when the gesture travels horizontally. Gesture detection should use directional/distance thresholds in CSS pixels, respect touch-action/pointercancel and abort if a stage/timeline or Android-native gesture owns the contact. Don't create an invisible full-height activation strip; the admissible gesture area is existing non-editor UI, not an overlay on stage/timeline.

Once open, use a visible close affordance and allow a reverse swipe **within the drawer**; Android Back may close the drawer on devices where the web app receives the event but must not require overriding or blocking the OS navigation gesture. On desktop/landscape the existing normal library panel may remain. Emulated touch in Chromium is the current automated acceptance surface; physical Android/ADB separately verifies system Back-edge coexistence later.

## Gesture dispatch priority — explicit user correction

**Do not conflate start-target types:** with **one selected joint**, the actual contacted *free body geometry* pivots unilaterally around the selected joint while the opposite part is world-fixed. On that **selected joint's marker**, drag runs the earlier symmetric **bisector** fold X/Y/OFF. With **no selected joint**, drag over the actor translates the actor; empty stage pans the camera. The first version of this OpenSpec mistakenly assigned whole-actor move to the marker even with a selection; that rule is **revoked**.

In multiselection, use the G1 canonical **branched** graph (binding user approval 2026-10-11; `docs/decisions/2026-10-11-g1-chain-topology-approval.md`): appendicular `upper_trunk→shoulder→elbow→wrist→collective_finger` (D2 singular canonical; `collective_fingers` source plural alias only), axial feet→head `…→upper_trunk→neck_base→head_neck` (D1 terminal `mtp`; `ankle`,`midtarsal`,`mtp` articulated, painted toes preserved). `shoulder` is NOT an axial parent pointer. Four overlapping families on one skeleton: feet→head (priority), feet→hands, hands→head, hands→shoulder. Do not pick only the nearest joint on screen. A region *between selected terminal anchors* is internal, not a free branch. If feet→head selections bracket shoulder from below and above, **the arm attaches to the interior locked region**. If shoulder is the highest selected endpoint, arm is the terminal free continuation — **not head/neck**. If arm is selected but cervical joints are not, do not accidentally free the cervical branch. See canonical user-decision delta and examples: `docs/JOINT-CHAIN-DISPATCH-2026-10-10.md`.

**Equivalence contract (D3):** axial priority treats the branch junction level as between `upper_trunk` and `neck_base`, preserving all previously-approved visible behavior. An implementation MAY project `shoulder` inline positionally as a priority shortcut ONLY if semantically identical to the constrained-interior outcome; it SHALL NEVER claim `shoulder` is the anatomical axial parent. **D4 conserved:** bracketing lower+upper selections (e.g. `upper_trunk`+`neck_base`) suffice without selecting `shoulder`; no fallbacks. Binding cautions: hit-target disambiguation by topology (short toes/fingertips), transform-aware pivot validation (rendered≠raw source coords; `part-forefoot`/`midtarsal`, `part-toes`/`mtp`), 0.2px drift is a future-test expectation NOT proof, `orig-pelvis` legacy `data-part="hip"` is ownership not hinge (pelvis root-adjacent).

Keep other selected joints and the constrained interior invariant. On a free branch, preserve an exact world pivot and move only connected descendants of that branch; no fallback translation or partial deformation of unrelated ancestors. On a selected **marker** with multiple selected joints, the overconstrained solver/limit feedback remains a local design gate: test and expose alternatives; do not pretend the old single-elbow bilateral prototype solves it. Pointercancel/second touch rollback atomically, G2-A floor clamp and Undo authored-only remain authoritative.

## FLIP target dispatch (latest explicit user decision)

With a **single selected joint**, FLIP has two distinct paths frozen at pointerdown:

1. **Pointerdown on either connected body-side geometry**: rotate the **entire mannequin** as a single block about the **selected joint world pivot**, using the angle swept by the pointer/finger around that pivot (no unilateral branch rotation). Preserve all local joint angles; only whole-rig placement/orientation changes. Maintain continuous unwrapped orientation across complete turns and keep the selected pivot in world position.
2. **Pointerdown on that selected joint's marker**: translate the **entire mannequin** as one block with established X/Y/OFF axis constraints, even though selection is nonempty. Do not change global orientation or local angles; retain selected joint identity.

This is deliberately **different from ROTATE**: ROTATE part=one free branch, ROTATE marker=symmetric bisector; FLIP part=whole-rig pivot rotation, FLIP marker=whole-rig translation. Do not claim equivalent behavior from their shared selected joint. Preserve G2-A last-valid-angle floor limits and authored-only Undo with camera/selection unaffected.

**Multi-selected FLIP** remains an open design gate (chosen pivot / centroid / constraint compatibility not settled). Characterize existing behavior in tests before implementing an arbitrary centroid choice.

## Timeline and selection

Default single tap on an authored POSE key when **not** in multiselect and **REF is off**: select and seek to exact key t; activate that key for editing, without manufacturing a new key or Undo history. With either multiselect or REF on: select/deselect as appropriate but no implicit seek or edit activation. Tapping/dragging ruler or moving playhead alone: update time/evaluated draft, never silently edit the key merely because current time equals its t. Keep selection state distinct from authored state.

Selecting a pose from the landscape pose-list **when its row is associated with an authored timeline key** should pan the timeline horizontally **only as needed** until its key is visible; preserve zoom and data. A saved library-only pose without a timeline key has no intrinsic time; mapping/selection semantics in that case need UI clarification, never invent a timestamp. STOP (distinct from PAUSE) sets playhead to t=0 and pans timeline viewStart to 0; PAUSE freezes current t and viewport; STOP is navigation, not an authored Undo event. Wheel/trackpad horizontal delta should pan horizontal contents, not zoom; priority depends on hovered region (timeline pans temporal view; stage pans camera horizontally). Vertical wheel zoom may retain existing behavior if it does not turn horizontal delta into scale.

## Grid and shadows

GRID toggle overlays world-space vertical equidistant x lines and horizontal y lines at equal notional time intervals along a quadratic rise/fall *guide* from a chosen apex: `y(n)=y_apex + a*(n·dt)^2` downward, thus tight near the top and increasingly spaced toward the ground. This is an illustration guide, **not measured gravity or dynamic motion**, no effect on snap, pose, export or Undo. Choice of apex origin/spacing remains a preview control, not a hard-coded biomechanics claim.

In the UI rename GHOST to **SHADOW** (pose visualization and temporal shadow key labels as applicable). Silhouette guides should be generally more translucent but their outline more opaque/readable; never intercept touches. Keep persistent/internal `kind=ghost` compat and distinguish REF guides from timeline shadow keys in stored data. No automatic mass schema migration.

For each POSE marker on timeline, render a tiny noninteractive shadow-style silhouette **above** its key when space permits. If projected thumbnails overlap at the current zoom, decimate by screen-space bounds; favor selected/edited or endpoint poses. Keep every underlying key/label clickable even when its thumbnail is suppressed. Dynamically recompute on zoom/pan/resize; minimize SVG DOM churn on playback.

## Visual layer DogFood

Forearm must visibly paint over shorts in an **actual overlapping pose**. Existing T03 uses `compareDocumentPosition` and visibility only; insufficient to show rendered occlusion. Create deterministic crossing sample(s), screenshot and pixel/alpha comparison against expected forearm-over-shorts image (desktop+mobile). Investigate group nesting, transforms, z/paint order, not only DOM path order. Do not change source paths/pivot geometry unless authorized.

## Delivery and gates

Tests first (red on old behavior where meaningful). Preserve baseline and experiment branch; independent fresh-model code review, human screenshot/gesture review, no merge/deploy on this plan alone. Upstream 85/85 Playwright are a foundation, not coverage of newly requested UX.
