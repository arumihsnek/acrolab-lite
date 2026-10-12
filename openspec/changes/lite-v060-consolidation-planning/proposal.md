# Proposal — AcroLab Lite v0.60 consolidation release planning (docs only)

**PROPOSAL ONLY / USER APPROVAL REQUIRED. No implementation, merge, publication or deployment authorized by this document.**

## User-visible outcome

AcroLab Lite **v0.60** is defined here as the first **consolidation release candidate**: one exact-SHA
qualified build that integrates the already-reviewed hardening slices on top of the frozen
v0.5 baseline, with a single risk-grouped test strategy and a release-readiness checklist.
It is a creative/participatory 2D sagittal acrobatic DESIGN editor — mechanically informed,
never physics, biomechanics, clinical safety or human validation. Scientific assessment of
whatever users propose belongs to AcroLab (Godot Studio), not to Lite.

Concretely, v0.60 planning covers:

1. **Scope lock**: R1 cold-portable export + F8 last-safe playback (integrated C0), R6/R7
   library honesty + reachability (reviewed MiMo delta, integration gated on I1), G1
   13-joint branched topology binding (user-approved 2026-10-11), sequential R2 painted
   ROTATE → R3 shoulder bisector → R4 REF lifecycle → D4 project durability, A15b
   no-Inspector/no-gutter layout, and human-gated visuals/semantics (A11, F6, F9, GRID/SHADOW).
2. **Efficient consolidated test strategy**: all existing scenario rows (28-case plan, I1/P2/P3/P4
   matrices, repaired-50 + new-10 runners, main suite) regrouped into **five risk groups**
   (G-A … G-E) executed once per candidate instead of once per stage; see `test-strategy.md`.
3. **Release readiness checklist**: exact-SHA qualification (V7), physical Android manual gate
   (U5M), portal local gates + live rollback rehearsal (W6), one bounded Alpha increment +
   finite DogFood (A8); see `readiness-checklist.md`.

## Single authority + two milestones (2026-10-12 extension)

- **Single authority:** this change (`lite-v060-consolidation-planning`) is the ONLY v0.60
  planning authority. A same-day duplicate draft (`lite-v060-playable-alpha-20261012`)
  was folded into this change in place (its `specs/lite-v060/spec.md` V60.01–V60.10 and
  `test-plan.md` J1–J12 journeys moved here; its rival proposal/design/tasks removed).
  No second v0.60 change SHALL be created; all prior revisions and SHAs are preserved.
- **M1 — `PREVIEW PRIVADA PROVISIONAL PARA JUGAR`** (sooner, NEVER qualified, NEVER
  public): entry = exact SHA + zero catastrophic P0 (data loss / script exception blocks
  even M1) + L0 + L1 GREEN + dangerous-core J3/J7/J10 GREEN (+ rest or recorded subset) +
  no unexplained regression in touched behaviors + locally openable private + clear
  known-RED ledger (non-catastrophic A11/A15b/X4 visibly labeled). User play/Android
  feedback AFTER delivery; L4 verdict is NOT M1 entry; no unapproved visual redesign.
  Local-only; no portal change, no public URL.
- **M2 — PUBLIC 0.60 ALPHA** (only after L3-once + DeepSeek review + L4 + A15b/A11/D4 +
  X4 root-cause + G5 + L5): one bounded Alpha increment via portal CAS with live rollback
  rehearsal. Beta NOT in scope; the authorized reversible minor Public Alpha does NOT
  automatically authorize 0.60.
- G-groups (test-strategy) remain the risk framing; J-journeys (test-plan) are their
  pairwise execution form; V60.xx (specs/lite-v060) are the testable requirements.

## Non-goals

- No product/test code edits, worktree creation, Goal launches, merges, Alpha/Beta publication,
  portal restart, upgrades or old-Goal resumes in this mission.
- No new gesture semantics (multi-FLIP pivot, multi-marker solver), no A11 paint regrouping,
  no F6 browse/insert policy, no shared-library sync server, no biomechanics solver/IK,
  no telemetry provider, no scheduler/Jefa/Nudger/Codex CLI.
- Beta publication stays a separate Human Gate; shared-library credential/service rollout
  stays a separate security gate.
- This proposal does **not** claim any slice is GREEN, integrated or accepted — it only
  sequences and groups the proof.

## Relationship to existing artifacts

| Artifact | v0.60 treatment |
| --- | --- |
| `first-usable-lite-editor` | Original scope; authoritative for authored/evaluated separation, floor, Undo, library durability boundary. Superseded gesture rows defer to alpha change. |
| `alpha-fluid-gestures-and-timeline` | Newer authority for A02/A03 marker-bilateral vs free-part-unilateral, four chains + shoulder priority (A16/G1.01–05), A04 tap seek+edit, A13 single-FLIP, A14 safe drawer, A15 no gutter. |
| `shared-library-recovery-code` | Library-sync service only; explicitly **out** of v0.60 local-only scope. |
| `lite-release-hardening-20261011` | Eight-stage roadmap (I1→P2→P3→P4→D4→U5→W6→V7→A8) retained as execution spine; v0.60 adds the consolidation grouping, single-candidate qualification and checklist on top. |
| Roadmap `docs/plans/ACROLAB-LITE-ROADMAP-2026-10-11.md` | Sequencing/budget/lease authority unchanged; autonomous execution already user-authorized 2026-10-11 except Human Gates. |
| G1 binding `docs/decisions/2026-10-11-g1-chain-topology-approval.md` | D1=mtp, D2=collective_finger, D3 branched + equivalence, D4 conserved — binding, not re-asked. |

## Version semantics

- **v0.5** = frozen reference `assets/reference/svg-motion-lab-v0.5.svg`
  (`93246123d6e307e51562d187ddc0ed33639953f83ac9fee9f297cbed1f07555b`); never mutated.
- **v0.60** = first qualified consolidation candidate `app/lite-g1.svg` at an exact commit SHA
  (C-series), produced only by the gated stages above and accepted only via the checklist.
- No `v0.60` tag/ref is created by this planning mission.

## Human Gates (blocking, never inferred)

1. Approve this v0.60 scope + grouped strategy + checklist before any implementation Goal.
2. Per-stage gates from roadmap §5 (13-node preview detail, multi-marker/multi-FLIP containment,
   A11 grouping, F6 policy, F9/time-domain, desktop library placement, GRID/SHADOW calibration,
   rig-identity migration) — each blocks only its dependent stage.
3. Real Android manual gate (U5M) on the exact candidate SHA before any public increment.
4. Separate explicit approval of exact Alpha scope/SHA, portal installation/missing-ref
   bootstrap and live rollback before A8; Beta stays user-gated.

## Discipline Skills

Pre-scaffold coherence check (run before scaffolding — §Coherence below); scenario-design
(grouped risk scenarios only, no invented oracles); systematic-debugging (future RED→GREEN);
verify-standalone-svg-cold-export; test-svg-last-safe-playback; test-persistence-rejection-history;
serialize-browser-audit-evidence; security-hardening (portal W6); review-code / doubt-driven-review
(independent review, §Review below). OpenSpec tasks are plans, never an executor.

## Coherence check (performed 2026-10-12, before writing)

- `openspec list`-equivalent sweep: changes present are `alpha-fluid-gestures-and-timeline`,
  `first-usable-lite-editor`, `lite-release-hardening-20261011`, `shared-library-recovery-code`;
  no archived entries; new name `lite-v060-consolidation-planning` absent — no collision.
- Read root AGENTS.md, README, PRODUCT-CONTRACT, PLAN-STATUS, continuity runbook (canonical),
  roadmap, both 2026-10-11 decision records, Alpha microrelease contract, joint-chain dispatch
  doc, hardening proposal/test-plan/tasks headers. No `ideas/` content read (quarantine).
- Targeted Git verification on `develop` @ `15cca53` (clean): no `app/` or `tests/` tree —
  product evidence lives in sibling worktrees/branches (C0 `3708cb5`, MiMo `12210d9`/`d41fea2`,
  P2 `db9c99d`, P3 `2e4dd6c` dirty, P4 `dcb549e`, P2QA `9fb3c77` REVISE). v0.60 therefore plans
  consolidation; it does not assert a candidate exists on `develop`.
- No implementation SHAs invented; all pins are historical commits above, re-verifiable.

## Impact

Docs-only: eight planning files under `openspec/changes/lite-v060-consolidation-planning/`
(proposal, design, test-strategy, test-plan, readiness-checklist, tasks, review-concerns,
`specs/lite-v060/spec.md` V60.01–V60.10). No product, test, config, ref or portal change.
No budget spent beyond this planning turn.
