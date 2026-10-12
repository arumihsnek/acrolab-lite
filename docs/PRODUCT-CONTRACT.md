# AcroLab Lite — Product contract (USER DECISIONS, draft consolidation)

> **Actualización de interfaz solicitada el 2026-10-10:** el OpenSpec `openspec/changes/alpha-fluid-gestures-and-timeline/` define el editor fluido, nuevo dispatch entre marcador articular y mitad tocada, selección de pose con desplazamiento al instante en modo normal, STOP a origen, paneo horizontal de rueda, rejilla, SHADOW y miniaturas de poses. Estos cambios propuestos prevalecen sobre los comportamientos incompatibles anteriores de este documento, pero no se consideran implementados ni publicados. La cinemática exacta de ROTATE bilateral frente a mitad tocada permanece como Human Gate.


> **AcroLab Lite es una herramienta creativa y participativa de animación acrobática mecánicamente informada; AcroLab es quien investiga qué parte de esas propuestas resiste el análisis biomecánico. Son complementarios, no competidores.**

Scope: independent, approachable SVG/web-first animation editor for 2D sagittal creative acrobatics. Interaction requirements here derive from user decisions in this Lite thread, NOT AcroLab Godot OpenSpecs.

## No Inspector in Lite (explicit user rejection, 2026-10-10)

The old self-contained v0.5 SVG included a desktop block labeled `INSPECTOR`. This block **is not part of the authorized Lite product**, regardless of its presence in our frozen reference. No independent Inspector/properties/solver panel on desktop or mobile and no reserved right gutter. Use the established small cyclic X/Y/OFF control in the toolbar; concise contextual messages may communicate selected joint(s), floor limits and REF/SHADOW without a studio-style side pane. Keep library Pose/Exercise (including its mobile drawer) distinct. A15 in `openspec/changes/alpha-fluid-gestures-and-timeline` requires browser evidence of its removal **in the candidate only**, never mutate the archived v0.5.

## Stage and manipulation
- Only joints are selectable. Tap/click selects; swipe/drag NEVER selects another joint. Hold selects and enters multi-select; tapping blank stage deselects and leaves multi-select.
- ROTATE: with selected joint(s), drag a segment on one side of a selected hinge. Rotate only the admissible free branch, single-axis, follow pointer. In multiselect the topological selected-chain boundary drives admissibility (not the nearest screen hinge), with feet→head priority when selections bracket shoulder; only free ends can pivot. Invalid internal branch rejects visibly, never rotates whole body accidentally.
- Whole actor MOVE has **no mode button**: when no joint selected, drag the acrobat to move the whole actor. One small square axis toggle controls movement X lock / Y lock / OFF, if useful; no per-joint/part free motion.
- **FLIP latest user decision:** with exactly one joint selected, drag on **either connected body portion** rotates the **whole actor** about that selected joint, following the swipe arc, preserving local joint angles and accumulated orientation (360 differs from 0); drag **on the selected joint marker** moves the whole actor in one block under X/Y/OFF translation constraints and does not rotate it. FLIP multi-selected pivot/constraints remain a design gate, not an assumed centroid solver.
- On empty stage swipe pans; pinch zooms and pans about gesture focal center; stage zoom/pan never change authored pose. Camera never reveals more space below floor than initial framing.
- Ground is a solid geometric DESIGN boundary throughout animation, regardless of root transform and limb angles; cannot penetrate. No claims about physical contact forces.
- Mannequin user SVG: exact source marks as 13 joint centers, art pieces untouched until approved; shorts below forearm in visual stacking. Compact visible joint handles, unchanged generous hit areas.
- No Lock Joint, Protect, RigidLink, AUTO, free IK, solver compensation or Godot mixed selection in this Lite first-release.

## Timeline and playback
- Simple tap on key selects only, never moves head; swipe does not select. Long press enters multiselect; tap blank deselects and exits it.
- Double tap saved key seeks/opens for editing. Drag playhead or tap upper time ruler to seek. Drag blank timeline pans horizontally; two-finger pinch zooms with focal anchoring; never beyond t=0 on left. Zoom out expands the timeline duration visibly (undoable) when the viewport exceeds its current end, without moving existing key timestamps; zoom in never silently shrinks duration.
- Move/retime selected instant(s) by explicit drag, preserving identities. Create, copy/paste, delete saved poses; insert near current time without overwriting an interpolated AUTO state.
- Playback PLAY becomes PAUSE while running; pause preserves current time and evaluated state (never snaps to start). Interpolation is editorial, not dynamics.

## Authoring persistence and library
- Editing a stored active pose changes its in-memory authored state immediately; undo/redo restore; SAVE only creates/updates a library asset by explicitly named scope. Do not leave uncommitted draft behind until SAVE.
- Minimal collapsible library with plain Inkscape-like tree rows; save, list, select and insert library poses, library persists across actual reload. **Latest mobile-specific user decision:** library closed by default as a **right drawer** accessed by a small button or by an inward swipe starting in the rightmost quarter of **eligible UI chrome outside stage and timeline**, inset from Android Back edge. No permanent full-height vertical stripe; no overlay hit targets on stage/timeline when closed. Opening/closing changes no authored, selection or camera state. Landscape/desktop may keep an ordinary visible panel. See OpenSpec A14.
- Import/export versioned project, rig, geometry mapping, poses, times and provenance. Support eventual explicit AcroLab bridge; no invisible data-filling.

> **New cross-device library request, 2026-10-10 (NOT yet implemented):** share only named library BodyPose/Exercise assets between linked browsers/devices, recover via secure permanent code or temporary pairing; keep active project, timeline, Undo/camera/selection local. Preserve offline library JSON import/export. See `docs/SHARED-LIBRARY-CONTRACT-2026-10-10.md` and OpenSpec `shared-library-recovery-code`; secure server rollout remains an explicit gate.

## Transparent reference guides
- Single REF toggle globally on/off. When on, **selected timeline poses only** appear as transparent references; deselecting one removes it immediately (no stale reference stuck until toggle OFF).
- Multiple refs; closer to playhead = darker/more visible. Saved pose guide is frozen snapshot even while original changes and on timeline seek, until deselect/reselect; entering edit on same pose does NOT refresh frozen guide.
- 'Ghost' empty key can be selected as a reference and updates live from current interpolated/evaluated pose; unlike saved reference it is not fixed.
- No independent lock/protect/mask property system for references; no references on joints, only full-body poses.

## Science and product boundary
- Lite is creative, participative, mechanically informed DESIGN. Any feasibility label is at most an unvalidated editor rule until scientifically assessed by AcroLab. Explicit human approval before importing findings or claiming real-world safety.
- Android Chrome touch-first + desktop responsive; distributable via HTTPS PWA; offline or standalone only if tests substantiate it. Public site already exists but old prototypes are never presumed accepted.

## Known regressions and negative evidence
Observed by user videos: ROTATE and FLIP in pre-Lite experiment malfunction; references persist after timeline deselect; touch gestures change selection; floor penetration with rotated poses; lower_trunk misplacement in earlier source, shorts-over-forearm layering; lack of save-vs-library distinction. No workaround by reusing old code without targeted regression tests.

## Gates before implementation
- Confirm UX designs and scenarios against this contract. Plan/review first; UI human acceptance on real Android separate from headless Chromium.
- Preserve source/mannequin2D geometry exactly or request explicit Human Gate for deviations.
- Future joint position inverse kinematics, biomechanics solver, team sharing server and scientific analysis require separate authorized OpenSpecs.
