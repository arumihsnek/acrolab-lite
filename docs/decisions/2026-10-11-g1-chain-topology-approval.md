# G1 chain-topology binding decision (user approval, 2026-10-11)

Date: 2026-10-11. Branch: `develop`. Pinned start SHA: `89bb13934216a5e1656dcdf878d3b74e33d6053a` (clean).
Status: **APPROVED HUMAN GATE DECISION — BINDING FOR OPENSPEC.** Not code acceptance, not test GREEN, no release/merge/deploy.

## Verbatim user authorization

> 'Apruebo las decisiones G1 tras la revisión de Muse: D1=mtp; D2=collective_finger. Para D3 adopta el grafo ramificado recomendado por Muse preservando la equivalencia funcional; D4 conserva la prioridad ya aprobada. Actualiza OpenSpec y continúa el roadmap respetando las pruebas y Human Gates restantes.'

This overrides prior pending proposals. Do not re-ask D1–D4.

## Accepted choices

- **D1 distal foot terminal = `mtp`.** Articulated foot preserves `ankle`, `midtarsal`, `mtp`; actual painted toes preserved. Distal chain endpoint for feet→* families is `mtp`.
- **D2 distal hands = `collective_finger` (singular, canonical C1 runtime ID).** `collective_fingers` (plural) is a source-SVG alias documented for normalization only. Articulated arm preserves `elbow`, `wrist`, fingers (`collective_finger`).
- **D3 canonical kinematic graph = branched (Muse recommendation).** Arm attaches at/near `upper_trunk` as appendicular branch:
  - appendicular: `upper_trunk → shoulder → elbow → wrist → collective_finger`
  - axial feet→head: `… → upper_trunk → neck_base → head_neck`
  - `shoulder` is **NOT** an axial parent pointer.
- **Strict equivalence contract (D3):** for axial priority, the branch junction level is treated **between `upper_trunk` and `neck_base`**. All previously-approved user-visible behavior (dispatch `docs/JOINT-CHAIN-DISPATCH-2026-10-10.md`) is preserved. Implementations MAY internally project `shoulder` as an inline positional priority shortcut **only if semantically identical to the constrained-interior outcome**; they SHALL NEVER claim `shoulder` is the anatomical axial parent.
- **D4 ALREADY APPROVED, conserved:** lower+upper selected joints bracketing the branch position (e.g. `upper_trunk` + `neck_base`) suffice; `shoulder` need not be selected. Arm and `shoulder` are constrained interior even as graph branch nodes. No fallbacks to whole-actor translation. Upper-terminal `shoulder` with no selected neck/head frees the ARM, not neck/head; arm-only selections never promote a cervical free branch.
- One branched skeleton carries four overlapping user-named families: feet→head (priority), feet→hands, hands→head, hands→shoulder.
- Gesture semantics unchanged: ROTATE touched actual free part = unilateral about chain boundary; selected MARKER = bilateral bisector under X/Y/OFF; FLIP separate (body-side = whole-rig arc, marker = whole-rig X/Y/OFF translation). `docs/JOINT-CHAIN-DISPATCH-2026-10-10.md` remains authoritative.

## Critical Muse-review cautions (binding, from independent review)

Reviewer: surrogate **Muse Spark** (file header says "Sol XHigh" but commit message records Codex Sol XHigh unavailable, surrogate used). Commit `776cd9ab559a4d3cc1db005707a81934b4c68ee8` in sibling worktree `/home/ubuntu/code/acrolab-lite-g1-sol-xhigh-review-20261011/docs/reviews/ACROLAB-LITE-G1-SOL-XHIGH-TOPOLOGY-REVIEW-2026-10-11.md`. Verdicts: D1 conditional-A, D2 A, D3 branch-B + equivalence (no gate), D4-A already authoritative. MiMo preview reviewed: `docs/plans/ACROLAB-LITE-G1-13-JOINT-MAPPING-PREVIEW-2026-10-11.md` (commit `9e24629`); first DeepSeek failed-then-corrected findings noted therein.

- Short foot toe and finger tips need **hit-target disambiguation by topology, not screen-nearest pivot**.
- `part-forefoot`/`midtarsal` and `part-toes`/`mtp` source raw pivot positions require **transform-aware validation** before treating coordinates as exact; do NOT treat rendered SVG coordinates as raw source coordinates.
- Normalization must document source plural vs C1 singular alias (`collective_fingers` → `collective_finger`).
- Objective browser max pivot drift **0.2px** is a future-testing expectation, **NOT executed proof**.
- `orig-pelvis` legacy `data-part="hip"` is **ownership, not a hinge**; pelvis part is root-adjacent.

## Exact SHAs andrepo state referenced

- Canonical cwd `/home/ubuntu/code/acrolab-lite`, `develop`, start `89bb13934216a5e1656dcdf878d3b74e33d6053a` clean.
- G1 reviewer commit `776cd9ab559a4d3cc1db005707a81934b4c68ee8` (sibling worktree, docs-only).
- R2 single-branch app candidate commits `d29506a`, `db9c99d` exist on a separate branch: **paused Goal, untracked evidence, needs separate independent validation. Do NOT claim multi-chain GREEN.**
- R4 REF commit `dcb549e` has independent DeepSeek QA PASS at `/home/ubuntu/code/acrolab-lite-r4-qa-20261011/docs/audits/R4-INDEPENDENT-ACCEPTANCE-2026-10-11.md` (32/50 repaired, 9/10 novel, 4/4 library, 0 regressions vs C1): accepted **isolated** candidate pending sequential rebase. **Do NOT integrate R4 out of order into develop/app.**

## Still-open Human Gates (unchanged, must stay gates)

- Multi-selected marker overconstraint (ROTATE bisector with several selected joints): unresolved.
- Multi-selected FLIP pivot: unresolved.
- A11 visuals (forearm-over-shorts pixel proof).
- Physical Android manual check (separate manual-only gate).
- Security/release gates; no public alpha/beta, merge or deployment in this mission.
- Multi-chain implementation/tests remain RED-until-P2-GREEN; only DECISION tasks close here.

## OpenSpec delta applied

- `openspec/changes/alpha-fluid-gestures-and-timeline/{proposal.md,design.md,specs/alpha-editor/spec.md,test-plan.md,tasks.md}` updated surgically: normative A16 binding, branched graph, scenario matrix, G1 test rows, decision tasks [x]; code/implementation/test tasks stay open.
- Only DECISION tasks marked [x]; no implementation or test claimed complete.
