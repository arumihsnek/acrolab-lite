# AcroLab Lite — G1 13-joint chain mapping PREVIEW (Human Gate input, 2026-10-11)

**Status: DECISION-READY PREVIEW — USER confirmation required. This is NOT an
approved spec change and does NOT mark the Human Gate accepted. P2 (roadmap
Stage 2 / R2) stays BLOCKED in full until the user confirms this preview;
only the single-joint subset in §7 is unblocked.** Docs-only artifact; no
code, tests, source SVG, or candidate bytes were modified.

Role of author: docs-only canonical writer on clean `develop`
(`/home/ubuntu/code/acrolab-lite`, model `opencode-go/mimo-v2.6-flash`
Medium). Independent review: `commandcode/deepseek/deepseek-v4.1-flash`
(§10). Goal criteria: 0/N reported in §11.

## 1. Evidence base and static consistency check (all PASS)

| Check | Result |
|---|---|
| User source `assets/source/manekin2D-vertical2.svg` SHA-256 | `99ccb171…f097e` — **matches** roadmap immutable digest; untouched (read-only) |
| Frozen reference `assets/reference/svg-motion-lab-v0.5.svg` SHA-256 | `93246123…07555b` — **matches**; untouched |
| Candidate C1 full SHA | `203bc7da540dca02697c4c90e5f18045ae0db960` (read-only via `git show`; not an ancestor of `develop`, as expected for a candidate branch) |
| C1 `app/lite-g1.svg` blob SHA-256 | `d46efa219005aa358ff27eae56d1c41a7e3be91b5faa8279e00a4a87e73146fa` |
| C1 joint handles | exactly 13 `data-joint` handles; IDs match the 13 source `inkscape:label` joint marks 1:1 (only spelling delta: source `collective_fingers` vs app `collective_finger`) |
| C1 source marks | 13 `source-mark-*` circles/paths carry `data-original-id` back to source `pathNN` IDs |
| C1 painted parts | 14 `orig-*` body paths (`orig-thigh…orig-fingers`) + nested `part-*` groups, exactly as frozen v0.5 geometry |

Authorities used (in order): user decisions in
`docs/JOINT-CHAIN-DISPATCH-2026-10-10.md` and `docs/PRODUCT-CONTRACT.md`;
approved OpenSpec `alpha-fluid-gestures-and-timeline` A02/A03; live C1/SVG
bytes; Sol test-only oracles (hypothesis class, never user authority).

## 2. The 13 joints (literal IDs), connectivity and source mapping

Joint world positions are the **rendered** marker positions in source/C1
coordinates (several source marks carry per-marker `transform="rotate(…)"`
about the SVG origin; raw cx/cy alone is misleading — e.g. `shoulder` raw
`(74.640, 92.555)` renders at `(100.100, 64.173)`).

Wiring convention (no cycles): the **axial chain** is ordered head→feet as
`head_neck–neck_base–(shoulder)–upper_trunk–lower_trunk–hip–knee–ankle–midtarsal–mtp`
with the `pelvis` PART as the kinematic root between `hip` and `lower_trunk`
(both hang off it), and the **arm branch** `shoulder–elbow–wrist–collective_finger`.
"Axial neighbors" lists (toward feet ↔ toward head); the arm column lists the
branch child. Rendered coordinates use the C1 part-group rotate pivots where
each marker's own `rotate()` transform applies (values agree to <0.01 px).

| # | Joint ID (app `data-joint`) | Source mark (`inkscape:label` / `path id`) | Raw cx,cy | Rendered world x,y | Part boundary (part\|part) per C1 DOM | Axial neighbors (feet↔head) | Arm branch |
|---|---|---|---|---|---|---|---|
| 1 | `head_neck` | head_neck / `path19` | 100.093, 42.365 | 100.093, 42.365 | `neck` \| `head` | — ↔ `neck_base` | — |
| 2 | `neck_base` | neck_base / `path19-1` | 100.097, 58.254 | 100.097, 58.254 | `thorax` \| `neck` | `shoulder` (rec., D3) ↔ `head_neck` | — |
| 3 | `shoulder` | shoulder / `path18` | 74.640, 92.555 | **100.100, 64.173** (C1 `part-upper_arm` pivot 100.097, 64.173) | `thorax` \| `upper_arm` | `upper_trunk` ↔ `neck_base` | `elbow` |
| 4 | `upper_trunk` | upper_trunk / `path20` | 100.093, 97.572 | 100.093, 97.572 | `lumbar` \| `thorax` | `lower_trunk` ↔ `shoulder` | — |
| 5 | `lower_trunk` | lower_trunk / `path22` | 94.878, 121.702 | 100.097, 117.448 | `pelvis` \| `lumbar` | `hip` (via pelvis root) ↔ `upper_trunk` | — |
| 6 | `hip` | hip / `path24` | 100.097, 138.515 | 100.097, 138.515 | `pelvis` \| `thigh` | `knee` ↔ `lower_trunk` (via pelvis root) | — |
| 7 | `knee` | knee / `path25` | 100.097, 197.097 | 100.097, 197.097 | `thigh` \| `shank` | `ankle` ↔ `hip` | — |
| 8 | `ankle` | ankle / `path26` | 100.097, 254.851 | 100.097, 254.851 | `shank` \| `rearfoot` | `midtarsal` ↔ `knee` | — |
| 9 | `midtarsal` | midtarsal / `path27` | 102.422, 268.642 | 110.675, 265.349 | `rearfoot` \| `forefoot` | `mtp` ↔ `ankle` | — |
| 10 | `mtp` | mtp / `path28` | 55.977, 287.981 | 120.324, 267.561 | `forefoot` \| `toes` | — ↔ `midtarsal` | — |
| 11 | `elbow` | elbow / `path23` | 114.441, 94.929 | 108.571, 101.591 | `upper_arm` \| `forearm` | (arm branch) | `wrist`; proximal `shoulder` |
| 12 | `wrist` | wrist / `path21` | 133.574, 116.544 | 115.934, 134.104 | `forearm` \| `hand` | (arm branch) | `collective_finger`; proximal `elbow` |
| 13 | `collective_finger` | collective_fingers / `path40` | 152.293, 109.377 | 118.470, 145.332 | `hand` \| `fingers` | (arm branch) | terminal; proximal `wrist` |

Painted part → source path IDs (all preserved byte-exact in C1):
`head path6`, `neck path15`, `thorax path8`, `pelvis path9`, `lumbar path16`,
`thigh path10` (+`shorts path10-1`), `shank path11`, `rearfoot path1`,
`forefoot path2`, `toes path7`, `upper_arm path12`, `forearm path13`,
`hand path14`, `fingers path39`.

ASCII topology (recommendation pending D1–D4):

```
head_neck
   |            (arm branch)
neck_base        elbow
   |             /    \
upper_trunk  shoulder  wrist
   |         (branch)    |
lower_trunk            collective_finger  <- hands terminal (D2)
   |
hip
   |
knee
   |
ankle
   |
midtarsal
   |
mtp                <- feet terminal (D1)
```

## 3. The four user-named path families (node sequences)

Named by the user as *conceptual, overlapping paths on one branched graph*
(`JOINT-CHAIN-DISPATCH-2026-10-10.md`). Node sequences below are the
**recommended concrete instantiation** (label: RECOMMENDATION, not
permission), pending D1–D4 in §6:

1. **feet→head (priority chain):** `mtp–midtarsal–ankle–knee–hip–lower_trunk–upper_trunk–shoulder–neck_base–head_neck`
2. **feet→hands:** `mtp–midtarsal–ankle–knee–hip–lower_trunk–upper_trunk–shoulder–elbow–wrist–collective_finger`
3. **hands→head:** `collective_finger–wrist–elbow–shoulder–neck_base–head_neck`
4. **hands→shoulder:** `collective_finger–wrist–elbow–shoulder`

User rules that are already **CONFIRMED** and are NOT re-asked here:

- ROTATE on a selected joint **marker** = bilateral bisector (X/Y/OFF radial
  rules); ROTATE on connected **free part geometry** = touched branch only
  about the selected boundary joint. Two targets, not two algorithms.
- Selection set defines constrained intervals by **topology, not 2D
  proximity**; segments between two selected joints are internal, never
  free, never fall back to whole-actor translation.
- **Shoulder bracket:** selection lower and higher than the shoulder branch
  position on feet→head ⇒ feet→head wins; the arm belongs to the
  constrained interior and moves as one piece with shoulder.
- **Upper-terminal shoulder:** with shoulder the highest selected anchor and
  no neck/head selection ⇒ the **arm is the free continuation, never
  neck/head**. Arm-side selections never promote the cervical branch.
- Multi-selected-marker overconstrained solver and multi-selected FLIP
  pivot remain **unspecified design gates** — not inferred here.

## 4. Touch-origin actual-SVG filled-part mapping (single-joint hinge owner, C1 DOM evidence)

Each `part-*` group in C1 rotates about its proximal joint; the marker is
stored in the parent part group. This is the painted part → hinge map used
for any touch-origin dispatch:

| Painted part (touched) | Hinge joint |
|---|---|
| toes | mtp |
| forefoot | midtarsal |
| rearfoot | ankle |
| shank | knee |
| thigh | hip |
| pelvis | root (part group has no rotate transform ⇒ no hinge; whole-actor drag when no selection). NOTE (review finding): the `orig-pelvis` path carries a legacy `data-part="hip"` attribute in C1 — a distal-owner attribute, not a second hinge; P2 must not read it as evidence that pelvis drags are hip drags. |
| lumbar | lower_trunk |
| thorax | upper_trunk |
| neck | neck_base |
| head | head_neck |
| upper_arm | shoulder |
| forearm | elbow |
| hand | wrist |
| fingers | collective_finger |

**Resolved distinction (do not re-ask):** G1/`data-joint` markers are
isolated hit targets (`handle-*`, class `handle`) — they are the bisector
drag origin; every `orig-*`/`part-*` painted contour is a free-part drag
origin. Sol's `paintedFar` helper already enforces this: it rejects any
start point that is a path inside a `[data-joint]` subtree.

**Selected terminal and arm sides:** foot-side distal terminals are
`ankle/midtarsal/mtp` (toes end); hand-side distal terminals are
`wrist/collective_finger` (fingers end); at the shoulder the **arm subtree**
(`upper_arm–elbow–wrist–collective_finger`) is the branch side and
`neck_base–head_neck` is the never-free-when-bracketed cervical side.

## 5. The four tested chain paths (Sol test-only oracle — HYPOTHESIS, not user authority)

From Sol independent test writer
`/home/ubuntu/code/acrolab-lite-sol-i1-closure-r234-20261011/tests/REL4-release-cross.spec.js`
(read-only), current status **4/4 RED — zero desired movement, but exact
native pointerdown target identity `orig-toes`/`orig-forearm` is asserted**:

| Family | Selected anchors | Expected pivot | Touched painted part | Asserted moved contour | Sweep |
|---|---|---|---|---|---|
| feet→head | `ankle`,`neck_base` | `ankle` (chain boundary) | toes | `orig-toes` | +25° |
| feet→hands | `ankle`,`elbow` | `elbow` | forearm | `orig-forearm` | −25° |
| hands→head | `elbow`,`neck_base` | `elbow` | forearm | `orig-forearm` | −25° |
| hands→shoulder | `shoulder`,`elbow` | `elbow` (nearest selected on chain) | forearm | `orig-forearm` | −25° |

Note the intended semantics encoded by these REDs: the pivot for a painted
touch is the **selected chain-boundary joint adjacent to the touched part's
exterior subtree**, not necessarily the part's own proximal hinge (toes
touched, but with only `ankle` selected the whole foot turns about `ankle`).
Consistent with §4 and with the user's connected-exterior rule. These tests
are a desired-RED oracle; they are **not** user authority and do not answer
D1–D3.

## 6. The ≤4 decisions the user needs to make

Each item: options, **recommended default (SOURCE+contract-supported RECOMMENDATION, not permission)**, and the test that distinguishes options. No broad questionnaire; all other semantics above are already confirmed or derivable.

**D1 — Distal `feet` terminal node of the feet→head / feet→hands chains.**
- A (RECOMMEND): `mtp` — the true distal end of the foot chain in the source SVG; `ankle` and `midtarsal` remain intermediate selectable nodes.
- B: `midtarsal`. C: `ankle`.
- Distinguishing test: select `{mtp, neck_base}`, drag painted `rearfoot`. Under A the rearfoot lies strictly between two selected joints ⇒ visible "interior constrained" refusal, world unchanged. Under C (`mtp` not on the chain) the drag finds a free branch and motion occurs. Under B the equivalent refusal only appears once `midtarsal` is selected.

**D2 — Distal `hands` terminal node of the feet→hands / hands→head chains.**
- A (RECOMMEND): `collective_finger` — matches source mark `path40` and keeps `wrist` as a normal intermediate hinge; the `fingers` part groups with this terminal.
- B: `wrist` (hand/fingers treated as a single rigid hand part beyond the chain).
- Distinguishing test: select `{wrist, collective_finger}`, drag painted `hand`. Under A both are chain nodes ⇒ hand is interior between two selected joints ⇒ refusal, world unchanged. Under B `collective_finger` is not a chain node ⇒ hand is the free continuation beyond `wrist` ⇒ it moves about `wrist`. (Symmetric to the §5 terminal-anchor rule: geometry distal to the only chain anchor moves, geometry between two chain anchors refuses.)

**D3 — Shoulder junction membership (graph wiring).**
- A (RECOMMEND): `shoulder` is a node **on** the feet→head chain between `upper_trunk` and `neck_base` (matches the rendered source mark lying between them at `(100.100, 64.173)`, and the user's own phrase "brackets shoulder on both sides of the feet→head chain"); hands→head routes `shoulder–neck_base`.
- B: `shoulder` branches off `upper_trunk`/thorax and feet→head bypasses it (`upper_trunk–neck_base` direct); hands→head routes `shoulder–upper_trunk–neck_base`.
- HONEST LIMIT (post-review correction): under the user's confirmed **level-based** bracket rule, A and B yield the same refusal/motion outcomes for every single-joint and bracket case examined — no user-visible distinguishing test was found; the choice pins the graph written into the test oracle only. Distinguishing check for the oracle: select `{upper_trunk, neck_base}` and inspect the classified interior set — under A `shoulder` (and therefore the whole arm) must appear in the constrained interior; under B the arm must be added by the level rule despite `shoulder` not being a chain node. If the user prefers B, the oracle must encode the level rule explicitly rather than chain membership. A is the smaller graph with no virtual node.

**D4 — Minimum bracket pair for the feet→head priority override (confirm recommended reading).**
- A (RECOMMEND): `{upper_trunk, neck_base}` (any selected joint below + any above the shoulder branch position on feet→head) is sufficient to trigger the override; `shoulder` itself need not be selected. This is the direct reading of the user's confirmed rule.
- B: require an explicitly shoulder-adjacent selected anchor in addition.
- Distinguishing test: select `{upper_trunk, neck_base}`, drag painted `upper_arm`. Under A ⇒ visible refusal, arm stays with the constrained interior, world unchanged. Under B ⇒ free motion about one of the anchors — the behavior the user rule forbids — so B is documented only as the contrast case; if B were chosen it would contradict the confirmed bracket wording and require an explicit user amendment.

**Explicitly NOT decided here:** multi-selected-marker overconstrained
solver, multi-selected FLIP pivot, interior-refusal UX wording, R4 REF
lifecycle — separate gates, unchanged.

## 7. Unblocked work available now (no gate needed)

The **single-joint** subset of R2/R3 depends only on already-CONFIRMED
semantics (marker bisector vs free-part unilateral) and needs no terminal/
bracket answers:

- **R2 single-joint:** one selected joint (e.g. `elbow`), drag the actual
  painted connected part (`part-forearm`/`orig-forearm`) ⇒ that branch alone
  turns about the selected joint; opposite side, other world contours and
  the selected pivot stay world-fixed; `pointercancel` rolls back; Undo
  reports nothing to undo. (User example in JOINT-CHAIN-DISPATCH §"Browser
  regression examples".)
- **R3:** selected-marker **shoulder** bilateral bisector with X/Y/OFF
  contrast (Sol `forward-synchronized-4`: elbow control already passes 1/1,
  shoulder remains RED on identical app bytes — a legitimate single-joint
  target).

**Acceptance oracle pinned C1:** boot exact C1 `203bc7da` with
`app/lite-g1.svg` blob SHA-256 `d46efa21…46fa`; reuse Sol `REL4-release-cross`
world-matrix oracles unchanged (rendered `getScreenCTM` orientation deltas,
anchor drift < 0.2 px, constrained maxMotion < 0.02, painted target identity,
cancel atomicity, one-transaction Undo). No threshold weakening; the four
family REDs stay RED until D1–D4 are confirmed and P2 lands.

## 8. Gate status and links

- Full roadmap: `docs/plans/ACROLAB-LITE-ROADMAP-2026-10-11.md` (Stage 2 = P2/R2, Stage 3 = P3/R3; G1 preview named as P2's entry condition).
- P2 launch draft: `docs/plans/P2-PRODUCT-GOAL-DRAFT-20261011.md` — **launch checklist item 4 remains UNCONFIRMED; P2 full scope is BLOCKED until the user answers D1–D4 here. Do not route around it.**
- P3 (R3 shoulder bisector) shares the same candidate base; its single-joint portion may proceed under §7 once P2's single-joint subset lands; nothing in this doc authorizes implementation, worktrees, or Goals.
- Authoritative interaction contracts remain `docs/JOINT-CHAIN-DISPATCH-2026-10-10.md`, `docs/PRODUCT-CONTRACT.md` and OpenSpec `alpha-fluid-gestures-and-timeline` A02/A03 — this preview does not rewrite them.

## 9. Confirmed vs hypothesis vs unknown (summary)

- **CONFIRMED (user):** marker-vs-part ROTATE distinction; topology-over-proximity multiselection; feet→head shoulder-bracket priority with arm in constrained interior; upper-terminal shoulder frees arm not neck/head; cervical non-promotion; interior never falls back to whole-actor motion.
- **REASONABLE HYPOTHESIS (source/C1-derived, this doc):** part↔hinge map (§4), 13-joint connectivity table (§2), family node sequences (§3), pivot = adjacent selected chain boundary (§5).
- **GENUINE UNKNOWN (user decisions D1–D4):** feet terminal node, hands terminal node, shoulder junction wiring, minimum bracket pair.

## 10. Independent review record

Reviewer: `commandcode/deepseek/deepseek-v4.1-flash` (independent Sol judge
model), read-only review of this draft for topological contradictions and
fabricated source/decision claims. Verdict appended below.

Reviewer: `commandcode/deepseek/deepseek-v4.1-flash` (independent Sol judge
model), read-only review of this draft for topological contradictions and
fabricated source/decision claims.

**Verdict (2026-10-11): initial FAIL on both categories → all findings
fixed in this revision; re-verify PASS pending.** Findings and dispositions:

1. §2 parent/child column formed a 2-cycle (`lower_trunk`↔`hip`) and mixed
   conventions → **FIXED**: replaced with a cycle-free axial-chain +
   arm-branch convention (§2 preamble).
2. §2 `shoulder` rendered coordinate `(100.100, 64.192)` was an arithmetic
   error → **FIXED**: `(100.100, 64.173)`, agreeing with the C1
   `part-upper_arm` rotate pivot `(100.097, 64.173)`; D3 rationale updated.
3. §2 `wrist` rendered `(115.925, 134.096)` rounding drift → **FIXED** to
   the C1 pivot values `(115.934, 134.104)`.
4. §4 `pelvis → root` vs C1 `orig-pelvis` legacy `data-part="hip"`
   attribute → **FIXED**: annotated as a distal-owner attribute, not a
   second hinge.
5. D2 distinguishing test was unsound (`{collective_finger, neck_base}` +
   fingers is a terminal-anchor free case, per the §5 oracle) → **FIXED**:
   `{wrist, collective_finger}` + drag painted `hand` (interior-refusal vs
   motion-about-wrist).
6. D3 distinguishing test was unsound (`{elbow, upper_trunk}` + forearm is
   exterior beyond boundary `elbow`, which must MOVE per §5) → **FIXED**:
   D3 now honestly states A vs B is behaviorally equivalent under the
   confirmed level-based bracket rule and only pins the oracle graph; the
   distinguishing check inspects the classified interior set, not motion.

Reviewer independently verified clean: all three SHA-256 digests; C1 not an
ancestor of `develop`; 13 `data-joint` IDs ↔ 13 source joint labels; 13
`data-original-id` back-references; all 14 `part-*` rotate pivots equal the
§4 hinge joints; §5 four families match Sol `REL4-release-cross.spec.js`
1:1; elbow bisector control 1/1 with shoulder RED; `paintedFar` rejects
`[data-joint]` subtrees; D1/D4 tests sound; recommendations labelled as
recommendations; no multi-marker solver or multi-FLIP-pivot invention.

## 11. Goal criteria discrepancy report (native Hermes driver)

Driver: native Hermes session, model `opencode-go/mimo-v2.6-flash` Medium.
Criteria status: 0/N discrepancies — all mission requirements met within
budget except the human gate itself, which intentionally remains OPEN (this
document is the decision request, not its answer). No code, tests, source,
candidate, spec, or other-project file was touched; commit is docs-only on
`develop`.
