# Release readiness checklist — v0.60 (planning; all boxes unchecked, none inferred)

**No box may be checked without the named artifact committed. `achieved`, `active`,
task ticks or judge `done` are never evidence. M1 provisional preview and M2 public Alpha
are DIFFERENT verdicts: M1 delivers BEFORE L3/L4; M2 requires everything.**

## P0 — M1 provisional preview entry (`preview privada provisional para jugar`)

M1 is NEVER `v0.60-qualified` and NEVER public. ALL boxes required for delivery:

- [ ] Exact candidate SHA + parent chain + app blob/SHA-256 recorded; locally openable private.
- [ ] Zero known catastrophic P0 risks: NO actual data loss, NO script exception — either
      BLOCKS even private trial; safety never waived.
- [ ] L0 unit matrix + L1 core smoke GREEN on exact bytes.
- [ ] Dangerous-core J3 (axial-invalid) + J7 (floor) + J10 (persistence-loss) GREEN, plus
      either the remaining J1–J12 journeys or a recorded representative subset.
- [ ] No unexplained regression in touched behaviors; frozen assets verified (E2).
- [ ] Clear known-RED ledger: non-catastrophic A11×2/A15b×1/X4×1 allowed ONLY visibly
      labeled as M1-provisional (never read as M2-ready); no unapproved visual redesign.
- [ ] User play / Android feedback happens AFTER delivery — L4 verdict is NOT M1 entry.

## Q1 — Candidate identity

- [ ] Exact product commit SHA (C6/C5) + parent chain recorded; app blob Git hash + SHA-256 recorded.
- [ ] Test-tree SHA + runner digests recorded; portal pin W recorded (if portal-touched).
- [ ] Frozen mannequin + v0.5 SHA-256 verified on candidate bytes (E2).
- [ ] Equivalence record if C6 is evidence-only descendant of qualified C5 (E1), or re-run noted.

## Q2 — Grouped test proof (M2, exact bytes; M1 needs only P0 + dangerous-core J3/J7/J10)

- [ ] G-A durability GREEN (X1, X2, F1, E8) — desktop + emulated touch where B-level.
- [ ] D4 project write-loss/fail-honesty gate CLOSED (part of G-A for M2; separate public
      gate if data-loss risk — never waived for M2).
- [ ] G-B motion GREEN (E4–E7, F10, F2) with independent geometry oracle + frozen tolerance.
- [ ] G-C reference GREEN (F3, F4, F11).
- [ ] G-D layout GREEN (F5, E3) + A15b no-Inspector AND no-gutter proven on candidate +
      A11 visual-gate decision recorded (M2-mandatory; F6/F7 remaining manuals per item).
- [ ] G-E trust GREEN (E1/E2, F9, E9/X3, E10-local).
- [ ] Full main suite + repaired-50 + new-10 executed ONCE on immutable M2 SHA (L3); raw
      counts incl. skipped/flaky/harness errors archived; residuals assigned in ledger.
- [ ] X4 determinism addressed by root cause plus a classified test or a fix — never
      silently waived for M2.

## Q3 — Independent review

- [ ] Different-provider reviewer (DeepSeek Flash for Muse/MiMo writers) verdict on exact diff
      bytes + test digests + raw commands/counts, corrections recorded or NOT_RUN declared.
- [ ] Reviewer explicitly states whether Chromium was run; non-Chromium review blocks
      browser-scoped rows.

## Q4 — Manual + hardware gates

- [ ] U5M physical Android on exact SHA/URL: device/browser/actions/negatives/verdict recorded.
- [ ] F6/F7 semantic/visual decisions recorded per item (or dependent scope excluded in writing).

## Q5 — Portal + publication gates (only if A8 authorized)

- [ ] W6 local gates GREEN on pin W; live CAS/rollback rehearsal demonstrated in lab.
- [ ] Separate explicit approval: exact Alpha scope/SHA, installation, missing-ref bootstrap,
      live rollback plan.
- [ ] Live A8: health/profile/ownership checks → install/CAS → smoke → restore → verify →
      repromote, Beta unchanged; any mismatch = approved rollback + stop.
- [ ] DogFood finite batch (≤10 reports or ≤60 min): triage ledger, redacted scenarios only,
      private payloads outside Git.

## Release verdict

- [ ] P0 ALL GREEN → M1 provisional preview DELIVERABLE for private play (still not
      qualified, still not published). L4 verdict NOT required.
- [ ] P0 + Q1–Q4 GREEN + reviewer accepted + L4 passed + A15b/A11/D4/X4 closed → candidate
      MAY be declared `v0.60-qualified` (still not published).
- [ ] Q5 GREEN + live rollback verified → one bounded Alpha increment permitted; Beta remains
      a separate Human Gate.
