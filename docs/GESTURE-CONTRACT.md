# Deterministic gesture contract — planning candidate

> **Cambio de gestos solicitado el 2026-10-10 (pendiente de implementación):** al arrastrar exactamente el marcador de la articulación seleccionada se mueve el actor entero; al arrastrar una mitad de geometría se rota esa mitad desde la articulación seleccionada, con relación bilateral aún por aclarar. Un tap en POSE normal busca y activa edición; con REF o multiselección solo selecciona; mover la regla al mismo instante nunca abre edición. STOP devuelve cabeza y vista temporal al inicio; deltaX de rueda hace paneo, no zoom. Véase OpenSpec `alpha-fluid-gestures-and-timeline`; cualquier tabla anterior contraria queda supersedida para esta revisión.


**Newer explicit FLIP rule, 2026-10-10, overrides older table below for one selected joint:** With FLIP, dragging either free/body-side geometry sweeps the **whole mannequin** about the selected joint as world-space pivot; dragging the **selected joint marker** translates the whole mannequin as a block (X/Y/OFF), never changes local joint angles. With ROTATE, dragging free geometry rotates **only that free branch** about selected joint; dragging selected marker uses bilateral bisector folding. Multi-selected FLIP pivot is still a Human Gate; no inferred centroid. See `docs/JOINT-CHAIN-DISPATCH-2026-10-10.md` and OpenSpec A13. **Both ROTATE and FLIP have target-dependent gestures, but different outcomes.**

Normative UX decisions: user. Operational thresholds and gap closures below: ARCHITECT PROPOSAL, subject to UI Human Gate. No code yet.

## State and precedence
- Persistent: jointSelection (set), multiJoint (boolean), keySelection (set), multiKey (boolean), activeAuthoredKeyId, playheadT, activeTool (ROTATE/FLIP).
- Ephemeral gesture states: IDLE → PENDING(pointerdown target + snapshot) → TAP | HOLD | DRAG | PINCH | CANCEL → IDLE.
- Pointer capture and stable origin/pivot at pointerdown; a gesture never retargets as cursor moves. All thresholds in **CSS pixels, not SVG viewBox units**. Candidate movement threshold 8 CSS px, hold 450 ms, double tap ≤350 ms within 22 CSS px. To be tuned on physical Android under Human Gate.
- Precedence: second touch interrupts any pending drag and rolls it back; after two contacts, PINCH locks to stage or timeline where both started. Third finger cancels navigation without modifying authored data. pointercancel/blur cancels pending transforms; complete gesture = one undo transaction.
- Any drag crossing another joint/key MUST NOT modify selection. HOLD acts as selection only and consumes its entire pointer lifecycle; moving finger after HOLD cannot start ROTATE in the same pointer sequence.

## Stage gesture table
| Target | Tap | Hold | Swipe/drag |
|---|---|---|---|
| Joint marker | If multiselect OFF, selection = {joint}; if ON, toggle membership. Same selected marker in single mode stays selected. | Include joint in existing selection and switch multi ON; release to finish selection. | Never changes selection. For a selected marker: ROTATE folds the two halves symmetrically by bisector X/Y/OFF; FLIP translates the entire actor under X/Y/OFF without rotation. No retarget. |
| Segment (not joint marker), with selection | Does not select a part; no new object selected. | No selection effect. | ROTATE pivots only the valid touched free branch about selected hinge; FLIP arcs the ENTIRE actor about the selected joint regardless of which of the two parts was touched. For multiple selected joints, FLIP pivot selection is still unresolved, never silently use centroid. Invalid interior ROTATE branch → visible reject without pose change. |
| Body, no joints selected | No selectable object, preserve empty selection. | No selection effect. | Implicit whole-actor translation, X-lock / Y-lock / OFF respected. |
| Blank stage | Clear joint selection and multi flag. | Same as tap. | Camera pan; pinch camera zoom + pan anchored at midpoint. No pose change. |

During gesture, branch and pivot locked. Multi-selection: selected hinges form a graph cut; only terminal free branch not containing another selected hinge can rotate. If none, reject. Nearest hinge = minimum projected viewport distance at pointerdown; exact tie = lexical stable ID ordering (not random). Opposite-side proximal chain when multi-selected is not implicitly rotated. No hidden shoulder/root fallback.

## Timeline gesture table
| Target | Tap | Hold | Swipe/drag |
|---|---|---|---|
| Key marker | Select only; in single mode replace selection; in multi mode toggle. First tap NEVER seeks/edits. | Include key, enable multi; finish on release. | Only key already selected at pointerdown may retime selection (never select another). Swipe unselected marker pans timeline, not retime. |
| Same saved key, second tap in double window | Seek head to key and open authored key (after regular first-tap selection). | — | No accidental retime |
| Playhead head/handle | Seek to exact point if clicked; no key-selection change. | — | Scrub time continuously; never retime key |
| Ruler strip above track | Seek playhead to tapped instant | — | Candidate: scrub head while dragging ruler; not key retime |
| Blank timeline | Clear key selection and multi flag | Same as tap | Pan viewport horizontally; clamp viewStart≥0 |
| Two touches | — | — | Pinch zoom timeline around midpoint; on zoom-out beyond project end, extend total duration visibly/undoably, never altering key timestamps or playhead |

Ambiguous hit priority: 1) explicit interactive button, 2) playhead handle, 3) joint/key marker, 4) body segment, 5) blank surface. Browser native scrolling/long-tap menus disabled ONLY on interactive SVG surface; page chrome unaffected.

## Conflict and test oracles
A gesture has one immutable type, frozen target, saved pre-gesture authoring snapshot and one commit on pointerup. Undo restores authoring state including key identities, times, selected set and relevant library transaction; no partially committed pointer moves. Navigation gestures do not enter undo history.
Double tap opening active pose shall not recapture an already selected frozen reference; selection change on first tap follows ordinary key-selection rule and only recaptures on a genuine deselect/reselect.

Joint marker start target is **no longer a G1 Human Gate** for exactly one selected joint: ROTATE marker uses bilateral bisector; FLIP marker moves the whole actor; ROTATE touched free geometry rotates only that branch and FLIP touched geometry rotates the entire actor. Multi-selection overconstraint and multi-selected FLIP pivot remain open. Test each mode/target separately.
