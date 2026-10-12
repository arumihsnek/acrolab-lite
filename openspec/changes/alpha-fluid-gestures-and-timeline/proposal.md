# Alpha editor: fluid viewport, direct gestures, timeline and shadow visuals

Status: **USER FEEDBACK CAPTURED — implementation not authorized by this document alone**. Date 2026-10-10. Product: AcroLab Lite ONLY; do not change AcroLab scientific/Godot. Product authority: user's interactive alpha feedback 2026-10-10, overriding older v0.5 gesture/selection/zoom design where stated.

## Problem and evidence

The alpha at https://lite.acrolab.duckdns.org/alpha/ reports revision `0970c60893ee`; its `/alpha/lite.svg` loads a variant of `app/lite-g1.svg` with a channel-specific localStorage key. The SVG still chooses between fixed viewBoxes `1260x790` and `400x800`; G1 bilateral ROTATE is implemented for `elbow` and drag starting at the selected joint **marker**, rather than the desired selected-joint-as-pivot + touched-side gesture. The 85 green tests in the isolated worktree do not cover the user-observed interaction or the visual overlap of forearm over shorts; T03 only asserts DOM order and visibility.

The main OpenSpec `first-usable-lite-editor` still has 39 unticked checklist tasks, despite genuine candidate browser tests elsewhere. Do not equate unchecked boxes with failed tests or automated success with accepted UX. The two GoalRecords are `achieved` with 0/7 and 0/5 criteria checked — separate known Pi Dashboard DogFood, not proof that this editor is accepted.

## User-visible outcome

One responsive fluid editor; correct object under the finger starts the intended gesture; fast authoring navigation and STOP behavior; horizontal wheel pan; optional grid with *design-only* gravity-spacing cues; transparent outlined SHADOW overlays; sparse shadow silhouette thumbnails above timeline pose keys. Preserve established solid floor, Undo without selection/camera history, and duration = last POSE/SHADOW key time.

## Mobile library access — user decision (2026-10-10)

On mobile the library is a **hidden right-side drawer**, not a permanently visible vertical sidebar or a full-height tab/stripe stealing screen width. It opens via a **small explicit library button**, or by a deliberate **right-side swipe within the UI's rightmost quarter of eligible chrome outside both the stage and timeline**. The swipe MUST NOT begin at Android's physical screen edge; leave a protected edge/system-gesture exclusion margin so it does not compete with Android Back. It MUST NOT steal stage drag/rotate/flip or timeline pan/retime/pinch. A close control and reverse swipe restore the full editor surface. This is A14; precise hit slop/animation is a browser-preview tuning detail, not a second panel mode or permanent gutter.

## Lite-specific UX exclusion: no Inspector

The user explicitly rejects the v0.5 desktop **INSPECTOR** panel as an unexplained studio-style control surface. That text was already present in the externally staged and frozen v0.5 SVG, not added by the recent Pi worker changes; its historical UI author and any relation to scientific AcroLab are **not established**. **Do not carry it into the new Lite candidate** merely because v0.5 is reused as code/visual reference. There is no authorized independent Inspector/properties/simulation pane or fixed inspector-sized sidebar, on either desktop or mobile. Keep the single cyclic X/Y/OFF control in the normal toolbar, and show genuinely necessary selection/floor/reference feedback as modest contextual UI rather than reconstituting an Inspector. Preserve the frozen baseline bytes untouched; remove the panel **only in a new candidate after red/green tests**, A15.

This is separate from **A14 mobile library drawer** and the normal library of Pose/Exercise items, which *are* in scope. No code, spec, skill, Godot editor state or independent scientific product is to be imported from `/home/ubuntu/code/acrolab`; references to that path in Lite contracts are *boundary exclusions*, not a shared spec dependency.

## Boundaries / exclusions

- Keep frozen `assets/reference/svg-motion-lab-v0.5.svg` and source `assets/source/manekin2D-vertical2.svg` byte-identical; no HTML/Godot replacement, no 3D/physics/scientific accuracy, no public rollout without explicit approval.
- Existing `feat/lite-v05-nightly-regression` candidate and its 85-test run are **evidence**, not an accepted implementation. Implementation must occur in an isolated worktree with one writer, preserving it and running actual Chromium desktop/touch tests.
- Preserve time/rotation with unwrapped orientation, G2-A floor clamp, Undo isolation and max-key duration. Keep backwards-compatible `kind: ghost` import/export until explicit migration; display term **Shadow**.
- Do not weaken tests, claim G1-all-joints from elbow-only coverage, or infer physical Android acceptance from emulation.

## Gesture decision clarified by user (2026-10-10)

**This is NOT an either-or choice.** Directly dragging a **free body part** while a joint is selected rotates **only the touched branch** around that selected joint; the opposite branch stays fixed. Directly dragging the **selected joint marker** uses the earlier **bilateral bisector fold** with X/Y/OFF radial semantics. With no joint selected, dragging body geometry translates the whole actor. The earlier draft saying marker drag should translate the actor while selected was a misunderstanding and is superseded. Multiselection uses user-defined branching chains and an explicit feet→head priority when the selected anchors span both sides of shoulder. Details and test cases: `docs/JOINT-CHAIN-DISPATCH-2026-10-10.md`.

The previous binary G1 unilateral-versus-bisector **Human Gate is resolved**. Remaining design questions concern overconstrained multiple selected-marker drags, mapping chain endpoints to the current 13 joints and visual calibration, not re-asking whether the free branch should move unilaterally.

## FLIP gesture decision — user clarification

The latest user decision resolves FLIP for one selected joint: **dragging either portion of the body rotates the entire mannequin around the selected joint, following the pointer's arc**; **dragging the selected joint marker moves the entire mannequin as a block** instead of rotating it. This is different from ROTATE's free-branch and marker-bisector behavior. Exact single-joint target and invariants: `docs/JOINT-CHAIN-DISPATCH-2026-10-10.md`, requirement A13. Multi-selected FLIP pivot remains a separate gate, not permission to invent a centroid solver.

## Discipline Skills

- UI/UX and interactive SVG: real viewport screenshots and pixel-grounded overlap, not DOM order only.
- Browser testing: Playwright pointer/touch, timeline scrolling, responsiveness, viewport, wheel, overlays.
- Data compatibility: project/libraries, ghost/shadow terminology, key identity and import/export.
- No deployment/infra change in this planning change.

## Gate

H1: approve multi-selection overconstraint/shoulder edge-case rules and responsive/timeline/overlay preview; then bounded isolated implementation and independent review. H2: later physical Android/ADB. H3: separate deployment authorization.

## G1 chain-topology binding — user approval 2026-10-11 (BINDING, not implementation)

User verbatim: 'Apruebo las decisiones G1 tras la revisión de Muse: D1=mtp; D2=collective_finger. Para D3 adopta el grafo ramificado recomendado por Muse preservando la equivalencia funcional; D4 conserva la prioridad ya aprobada. Actualiza OpenSpec y continúa el roadmap respetando las pruebas y Human Gates restantes.' Full record: `docs/decisions/2026-10-11-g1-chain-topology-approval.md`.

- **D1 = `mtp`** (foot terminal; `ankle`,`midtarsal`,`mtp` articulated, painted toes preserved). **D2 = `collective_finger`** (singular canonical C1 runtime ID; `collective_fingers` source plural alias only; `elbow`,`wrist`,fingers articulated).
- **D3 = branched canonical graph** (Muse recommendation): appendicular `upper_trunk→shoulder→elbow→wrist→collective_finger`; axial `…→upper_trunk→neck_base→head_neck`; `shoulder` NOT axial parent. Equivalence contract: junction level between `upper_trunk` and `neck_base` for axial priority; inline positional projection of `shoulder` allowed ONLY if semantically identical constrained-interior outcome, never as anatomical claim.
- **D4 conserved (already approved):** bracketing lower+upper selected joints (e.g. `upper_trunk`+`neck_base`) suffice, `shoulder` need not be selected; arm+shoulder constrained interior; upper-terminal `shoulder` frees ARM not neck/head. Four overlapping families on one branched skeleton, feet→head priority.
- Reviewer: surrogate Muse Spark (header says Sol XHigh), commit `776cd9ab559a4d3cc1db005707a81934b4c68ee8`; review cautions (topology hit disambiguation, transform-aware pivots, plural→singular alias, rendered≠raw coords, 0.2px drift expectation NOT proof, `orig-pelvis` ownership≠hinge) are binding. Multi-marker overconstraint, multi-FLIP pivot, A11 visuals, Android manual, security/release stay Human Gates. Multi-chain tests stay RED-until-P2-GREEN; R2 (`d29506a`,`db9c99d`, paused) and R4 (`dcb549e`, isolated QA PASS) NOT integrated here.
