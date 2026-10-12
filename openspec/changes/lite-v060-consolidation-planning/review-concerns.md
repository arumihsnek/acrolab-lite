# Independent review concerns — v0.60 planning (self-review, 2026-10-12)

**Status:** planning self-review only. Not a different-provider review, not product/security/
release acceptance. A DeepSeek-Flash (or other independent-provider) critique is still
required per the tasks checklist before execution.

## Concerns raised against this proposal

1. **P3 dirty-tree risk understated?** P3 worktree holds an uncommitted R1 nullpivot guard at
   last grounding; a recovery Goal may already own that fix. *Disposition:* spine preserves
   strict successor-after-commit + single-writer lease; P3 entry must re-ground live SHAs
   before Goal creation. No SHA invented here.
2. **Overlapping test counts (165+50+10) could be misread as unique bugs.** *Disposition:*
   stated explicitly (roadmap §1, strategy efficiency rule); V7 must inventory projects so
   totals stay honest.
3. **Emulation vs hardware conflation.** *Disposition:* F8/U5M manual-only, emulation never
   substituted; reviewer must disclose non-Chromium scope (checklist Q3).
4. **Equivalence inheritance could greenwash a changed build.** *Disposition:* byte-identity
   + recorded equivalence required (E1); any byte change re-runs affected groups.
5. **G1 surrogate-review provenance.** The G1 topology review used a surrogate reviewer when
   Sol was unavailable (see decision record). *Disposition:* binding user decision stands,
   but V7 R2/R3 rows must still go GREEN on candidate bytes — approval is not proof.
6. **R4 out-of-order integration temptation.** R4 candidate `dcb549e` has isolated QA PASS but
   must rebase sequentially after C3. *Disposition:* spine order explicit; no out-of-order
   merge authorized.
7. **Scope creep via shared-library/F6/A11.** *Disposition:* explicitly out of v0.60 unless
   separately approved; checklist Q4 forces per-item decision or written exclusion.

8. **Duplicate-authority risk (closed 2026-10-12).** A second v0.60 change draft existed
   briefly the same day; it was folded into THIS change in place (spec + test-plan moved,
   rival proposal/design/tasks removed, single authority recorded in proposal).
   *Disposition:* no second v0.60 change SHALL be created.
9. **SeniorAdvisor scope advice (advisory only, 2026-10-12, read-only subagent).** Lean M1
   cut as locked in proposal; pairwise over Cartesian (4 topologies, marker/painted/none,
   mouse + one touch sample); one-writer risks: (1) P3+P4 rebase collision → unit matrix
   green before browser; (2) known-fail laundering → L3 once on immutable SHA; (3) writer
   scope creep → M1 scope frozen, extras need gates. Adopted into design/test-plan; the
   advisor approves nothing and its word changes no gate.

## Residual risk accepted in planning

- All pins are historical; live re-grounding at approval time may move the frontier
  (per continuity runbook). This proposal sequences; it does not freeze SHAs.
- No structural `openspec validate` CLI run on THIS change in this turn (no network/package
  install attempted); files follow the repo's existing proposal/design/test-plan/tasks shape.
  (A sibling draft validated clean with the local CLI 1.11.0 before being folded here;
  re-run validate before approval.) Update 2026-10-12: `openspec validate
  lite-v060-consolidation-planning` (local CLI 1.11.0) → **valid** after the fold-in.
