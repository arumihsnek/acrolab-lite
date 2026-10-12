# Design — v0.60 consolidation (planning)

## Context

`develop` @ `15cca53` is docs-only: no `app/` or `tests/` tree. Product evidence is
distributed across sibling worktrees/branches (C0, MiMo R6/R7, P2/P3/P4 candidates, QA audits).
v0.60 must therefore **consolidate by exact-SHA handoff**, never by merging branches or
assuming HEAD state.

## Consolidation spine (from roadmap, unchanged order)

```text
approve → I1 (R6/R7 surgical onto C0 → C1) → P2 (R2 painted ROTATE → C2)
→ P3 (R3 shoulder bisector → C3) → P4 (R4 REF → C4a) → D4 (durability → C4)
→ U5 (A15b + gated visuals/semantics → C5) → W6 (portal pin W, local gates)
→ V7 (exact-SHA qualification → C6 manifest) → A8 (bounded Alpha + DogFood)
```

One product writer per `app/lite-g1.svg` ever; successor starts only after predecessor
commits + independent review returns + lease relinquished. QA companions (Sol XHigh,
test-only) run parallel on immutable fixtures with separate port/profile, never product edits.

## Key design decisions (planning)

1. **Single-candidate qualification.** V7 runs the grouped strategy once against immutable C5
   (+ portal W) instead of re-running per-stage suites at release time. Stage exits keep
   scoped matrices; only V7 confers `v0.60` readiness.
2. **Five risk groups, not stage repetition.** Groups G-A…G-E (see `test-strategy.md`) partition
   the full scenario catalog by failure risk (data loss > wrong motion > stale reference >
   layout/confusion > trust/rollback). Each group runs once per candidate; residuals carry a
   named ledger entry, never silent GREEN.
3. **Equivalence rule.** An evidence-only descendant (C6) may inherit V7 qualification **only**
   if app blob/SHA-256 is byte-identical and equivalence is recorded (hardening E1). Any byte
   change invalidates affected groups and requires re-run.
4. **Frozen-asset rule.** Mannequin (`99ccb171…`) and v0.5 (`93246123…`) SHA-256 verified on
   every candidate; mismatch blocks handoff (hardening E2).
5. **Open decisions stay open.** Multi-FLIP pivot, multi-marker solver, A11 grouping, F6
   policy, F9/time-domain, GRID/SHADOW defaults, library placement, rig-identity migration —
   each gated per roadmap §5. v0.60 ships with explicitly recorded containment or exclusion,
   never an inferred semantic.

## Alternatives considered

- **Per-stage full re-qualification at release:** rejected — multiplies Chromium hours without
  new signal; scoped stage matrices + one grouped V7 run dominate it.
- **One mega-suite run with no grouping:** rejected — a single RED would block triage of
  unrelated slices; groups allow partial acceptance with explicit residuals.
- **Tagging current develop as v0.60:** rejected — develop holds no product bytes; a version
  must pin an exact qualified candidate SHA.

## M1 execution design (2026-10-12 extension)

- **ONE bounded native product writer** builds M1 from pinned bases (fixed P3 + surgical R4
  hunks only, never blanket merge); isolated QA reviewer (different provider) + isolated
  portal worker (M2 only) in separate worktrees/ports/profiles. Clean commits + exact hashes;
  reuses C3-line + reviewed R4; skips redundant per-fix handoffs. Budgets/leases follow the
  roadmap §§2–4. No delivery date promised.
- **Pairwise, not Cartesian:** naive 13 joints × 3 modes × 2 sides × 2 inputs × 3 axes
  (~468 browser cases) is rejected — the C0–C3 app diff is 69 lines vs 1500+ test lines,
  so the defect surface is dispatch logic. Full 13-joint adjacency + 4 chain paths run as a
  **unit data-driven matrix (L0, seconds)**; browser samples one member per topology class
  (hinge / branching shoulder-hip / axial-invalid bracket / leaf), marker vs painted vs
  no-selection, mouse + one touch sample. See `test-plan.md` J1–J12.
- **Tiers (coherence fix: M1 delivers BEFORE L4).** M1 provisional entry: exact SHA +
  zero catastrophic P0 + L0 + L1 GREEN + dangerous-core J3/J7/J10 GREEN (+ rest or subset)
  + no unexplained regression in touched behaviors + locally openable private + clear
  known-RED ledger. L3-once, DeepSeek review, L4, A15b/A11/D4, X4 root-cause, G5, L5 gate
  M2 only. Per-tier: L0 per commit · L1 per diff (~1 min; R1 ~9s, P2-21 ~70s baselines) · L2 per
  milestone (8–15 journeys, few min) · L3 full desktop+mobile+repaired50/new10 ONCE on
  immutable SHA (desktop ~7–10 min today) · L4 manual exact-SHA user review (after M1
  delivery) · L5 portal proof pre-public. Early-L3 triggers: data loss, JS exception, floor,
  gesture drift, history corruption, auth/privacy, bridge, responsive break. Known A11×2/A15b×1/X4×1
  carried openly, never hidden or requalified; X4 needs root-cause/test/fix for M2.

## Open decisions (all Human Gates, unchanged)

See proposal §Human Gates. Nothing here pre-decides them.
