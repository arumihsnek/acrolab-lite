# AcroLab Lite — joint marker vs free branch and chain priority (user clarification, 2026-10-10)

Status: **AUTHORITATIVE USER DECISION for interaction semantics, not yet implemented nor browser-tested.** Preserves SVG Motion Lab v0.5 as immutable source evidence. Applies to the `alpha-fluid-gestures-and-timeline` OpenSpec change, revising A02–A03. This resolves the false 'unilateral versus bisector' alternative in that change: they are **two distinct drag targets, not competing algorithms for the same target**.

## One selected joint: three distinct gesture origins

- **On a free body part** attached to the selected joint: that actual touched branch rotates **alone around the selected joint**; the other side of the pivot remains fixed in world coordinates. Never redirect this to root movement or bilateral folding.
- **On the selected joint's marker**: the earlier bilateral **bisector** ROTATE gesture (the two sides close/open symmetrically). Preserve its context-sensitive radial X/Y/OFF rules: X outward closes; Y outward opens; OFF follows the direction of the finger and outward closes. This is not the same as dragging a free body part.
- **With no joint selected**, dragging the mannequin geometry moves the complete actor as before. Navigation on empty stage remains camera pan. The existing X/Y/OFF root-translation constraints are applicable to whole-actor motion.

The false statement 'dragging the selected joint marker translates the entire actor' in the first 2026-10-10 `alpha-fluid-gestures-and-timeline` draft is explicitly **superseded** by this newer user clarification. Clicking/tapping an unselected marker still selects as normal; drag-never-selects remains an invariant.

## FLIP — clarified by user (2026-10-10)

FLIP is **whole-actor orientation around the selected joint**, regardless of which of the two body portions the finger touches:

- **With a single joint selected, starting the drag on either body-side geometry**: the arc traced by pointer/finger determines an angular rotation of the **entire mannequin as one rigid visual block around the selected joint world position**. Preserve internal joint angles and limb-relative geometry; the pivot stays fixed in world space during the arc. The selection is the pivot, not a selector for a unilateral branch.
- **Starting the drag on the selected joint marker**: move/translate the **entire mannequin as a single block** without rotating it or folding an angle. This whole-actor translation is available even though a joint remains selected; reuse the existing X/Y/OFF translation constraints. The selection remains stable.
- **ROTATE is NOT FLIP**: ROTATE body-part drag affects only the free portion; ROTATE selected-marker drag folds both sides by bisector. FLIP body-part drag turns everything around the pivot; FLIP selected-marker drag translates everything.
- Drag on an unselected marker does not silently switch selection; tap remains the selection gesture. Capture the mode, marker/geometry target and pivot at pointerdown. One authored gesture = one Undo transaction. No hidden floor compensation; apply G2-A clamp when rotation/translation would penetrate the solid ground. Keep unwrapped global orientation (360° != 0°).
- **Multi-selected FLIP pivot is not specified by this latest decision**: do not silently choose a centroid, nearest screen handle, or whole-mannequin translation in conflict with constrained selected joints. Mark the multi-pivot case as a design/test gate rather than treating the single-joint rule as a solver.

### FLIP browser regressions — NOT YET RUN

1. Select shoulder, FLIP, start arc from **arm** → all parts rotate about shoulder, all body-local angles unchanged; shoulder screen/world pivot stable.
2. Same selected shoulder, start arc from **torso** → identical whole-rig effect at equivalent pointer arc; not merely the touched half.
3. Drag the **selected shoulder marker** in FLIP, once for each X/Y/OFF → whole rig translates as a unit on permitted axes, orientation and local joint angles unchanged, selected shoulder remains selected.
4. Repeat with zoomed camera and touch-emulated pointer; angular delta depends on world-space arc around selected pivot rather than screen-scale distance; pointercancel returns pre-gesture authored state.
5. G2-A floor: FLIP arc stops at the last allowed angle without automatically lifting the rig. Undo restores authored state, never camera or selection.

## Multiselection: classify free vs internal by joint chains, not nearest screen coordinate

The user's conceptual path families, as named, are:
1. **Feet → head** (priority chain; main sagittal body axis)
2. **Feet → hands**
3. **Hands → head**
4. **Hands → shoulder**

These are overlapping paths on **one branched articulated graph**, not four independent skeletons. Shoulder is a branching articulation. A selected set defines constrained/bounded intervals on relevant paths. Free portions are the exterior portions available from the selected *terminal anchor*; a body segment enclosed **between selected joints** is internal (not free), even if visibly near the dragged finger. Decide on topology/path membership, NOT 2D nearest-pivot distance, and do not silently rotate or translate the constrained interior.

**Priority override at the shoulder:** when the multi-selection brackets shoulder on **both sides of the feet→head chain** (a selected joint lower and another higher than the branching position), that feet→head chain wins. The arm attached at shoulder is classified **with the constrained interior**, not a spuriously available free terminal branch; it behaves as a single piece with shoulder in that constrained set.

**Upper terminal shoulder:** when shoulder is the selected upper endpoint (and no selection extends into the cervical/head side of the main chain), the **arm is the free continuation**, **not neck or head**. Do not select the nearest graphical piece and rotate the head accidentally.

**Selected arm but no neck_base or head_neck:** similarly, the arm-side path governs that free continuation; the head/neck chain must not be treated as a freely rotatable limb just because its screen geometry lies near shoulder.

**Connected exterior dragging:** in a multi-selection case with a valid free branch, rotate only that free branch about its **chain boundary selected joint**; all selected joints and the constrained internal section remain fixed. Do not infer a free branch from a part between two selected joints.

## Implementation questions to test, not silently resolve

- For gestures begun directly on a **selected marker with several selected joints**, determine whether bisector closure is enabled only at an unconstrained boundary or should refuse explicitly. The user clarified marker-vs-part but did not define an overconstrained multi-pivot solver; do not invent a multi-joint IK/physics engine.
- Exact membership of 'hands' and 'feet' terminal nodes must map to the current 13-joint SVG (wrist/fingers and ankle/midtarsal/mtp), and define how nested segments are grouped at shoulder.
- For a touched body region classified **internal/nonfree**, preserve the pose; show concise 'interior constrained' feedback rather than falling back to whole-actor translation (wording not yet UX-approved).
- Preserve G2-A last-valid-angle floor clamp, Undo authoring-only, selection stable through drag, pointercancel atomic rollback; camera untouched and no authored pose created implicitly.
- All geometric assumptions are *DESIGN* controls, not physics or musculoskeletal measurement.

## Browser regression examples (new; NOT executed)

- One selected `elbow`: drag actual forearm shape → forearm alone turns about elbow, upper arm stays fixed; drag selected elbow *marker* → symmetric bisector closes/opens with X/Y/OFF. Distinct gesture start target evidence (pixel+state), Undo each separately.
- One selected `shoulder`: drag arm geometry → arm alone rotates around shoulder, trunk and head stay fixed. No accidental whole-body translation; dragging joint marker → previous bisector rules.
- Multiselection lower trunk + upper cervical joints bracketing shoulder along feet→head → dragging arm does not use arm as a free exterior branch; shoulder + arm belong to constrained interior.
- Multiselection lower body + shoulder as highest selected anchor → arm is eligible free extension; neck/head are not. Check terminal chosen on chain, not screen-nearest.
- Arm-side selection with neither `neck_base` nor `head_neck` selected → correct arm chain used, no inadvertent cervical free segment.
- Across the four user-named path families: test selected anchors, touched part, chosen branch, fixed-part transform, exact pivot, branch rejection, and potential crossover at shoulder.
