# Native Goal continuity runbook (operations)

**Status:** canonical operational instruction. **Scope:** docs only — no product writes, no scheduler/API
mutation without an approved plan. Absorbs the prior top-level harvest snapshot (removed;
history preserved in Git); this file is the reusable state-machine.
**Authority:** explicit user instruction 2026-10-12 (sole docs writer, develop, GoalRecord
`e2859e51-808c-4cb8-8c33-793e0473a3e5`). Companions:
`docs/operations/NATIVE-GOAL-WAKE-PROMPT-TEMPLATE.md`,
`docs/dogfood/PIBOARD-AUTOMATION-DUPLICATE-ROOTS-2026-10-12.md`.

## 0. Key error of the four 2026-10-12 crons

`0316-c3-repair`, `0431-p4-handoff`, `0621-d4-qa`, `0839-roadmap-harvest` were written as
**chronological fixed stages**: each assumed the previous cron had completed (P3→C3, then P4,
then D4/QA, then harvest). None had completed — P3 stayed dirty all day, so every downstream
tick could only exit no-op. A scheduled mission must be expressed as an **objective with an
adaptive CURRENT-FRONTIER decision tree**, never as "stage N runs at time T". Correct form:
every tick re-grounds and acts only at the verified frontier (§2).

## 1. State machine

```text
RE-GROUND → FRONTIER? ─┬─ busy/dirty predecessor ─→ HARVEST read-only → EXIT no-op
                       ├─ driver alive (idle or progressing) ─→ SALVAGE (same session/Goal)
                       ├─ driver dead + low context ─→ RESUME same session (1 bounded try)
                       ├─ driver dead + high context ─→ REPLACE (fresh session/Goal, §3)
                       └─ nothing to do / human gate blocks all fronts ─→ EXIT no-op
```

Bounded cap always: one meaningful transition per tick, max one transient retry, never
prolonged polling, never over-nudging an alive driver (no duplicate prompts into a session
that is already progressing).

## 2. RE-GROUND → find the actual frontier (live, never from prompt numbers)

- Dashboard health/plugins; native GoalRecords (folder ID, driver session, effective
  model/effort, Hermes state, last substantive event, judge verdict, criterion texts —
  `achieved`/`pursuing`/`active` prove nothing by themselves); `list_sessions`;
  `git worktree list` + per-worktree `git log --oneline` / `git status --short` (read-only);
  OpenSpec + Human Gates. Prompt-quoted IDs/SHAs are hints, not state.
- Duplicate-tick guard FIRST (see dogfood doc): same cron minute fired twice all day.
  Smallest session ID acts; siblings exit with zero mutations. Never "fix" the scheduler
  from a tick.
- Frontier = newest unverified dependency edge, e.g. 2026-10-12: P3 dirty
  (`2e4dd6c` + uncommitted R1 nullpivot guard, writer `01a12db1` dead) with P2QA `9fb3c77`
  REVISE as gate — NOT P4. Name the frontier with exact SHAs before acting.

## 3. SALVAGE → RESUME → REPLACE (in that order)

- **Salvage:** driver alive → send at most one scoped prompt to the EXISTING session.
  If it is progressing, do nothing further. One product writer per `app/lite-g1.svg`, ever.
- **Resume (same session, dead driver, reusable context):** one bounded `resume(mode:continue)`,
  then verify within ~60 s: session leaves `ended`, `lastActivityAt` advances, real
  post-checkpoint work appears. Keeper-without-bridge (observed 2×, keepers died <45 s,
  `no bridge connection`, `lastActivityAt` frozen) = false positive: ONE retry max, then
  STOP, record keepers/timestamps/signature, report BLOCKED. Never loop resumes.
- **Replace (dead driver, high-context transcript ~200k+ tokens):** fresh session + clean
  context + new or re-chartered Goal is REQUIRED — do not replay the transcript. Preserve the
  exact original dirty work untouched (never reset/clean another owner's worktree); new CLEAN
  worktree/branch at the exact predecessor SHA; confirm the single-writer lease is free;
  reconstruct state from immutable artifacts (commits, review records, QA reports).
  Live example (verified, do not disturb): recovery worktree
  `acrolab-lite-p3-nullpivot-recovery-20261012` + Goal `8ba35fe9-…` + driver `01a12f76`
  (Muse Medium), already dirty with its own fix — its files are off-limits to everyone else.
- **SeniorAdvisor:** before high-stakes pursuit (fresh Goal, stage transition, disputed fix),
  consult read-only `@senior` when authorized; quote its advice, then proceed. If unavailable,
  document the capability evidence and proceed with self review — never pretend it happened.
  Docs-only ticks skip this.

## 4. RED → commit (SHA) → review → accept → handoff

RED baseline first; minimal fix; GREEN rerun + regression classification; commit exact SHA;
independent different-provider review (DeepSeek Flash for Muse/MiMo writers); record
SHAs/blob hashes/commands/counts. No retry on auth failure, no hidden model substitution.
Successor starts only after predecessor commits + review returns + lease relinquished.
Fail-closed vs indefinite idle: a tick that cannot verify progress must EXIT no-op with a
precise blocker — but the blocker must name the next verifiable check, never "wait and retry".

## 5. Dated evidence snapshot — 2026-10-12 (HISTORICAL, read-only)

Do not read as current state. If a later product Goal updated any fact below, that fact is
UNKNOWN here — re-ground live per §2. It does not imply any successor stage completed.

- Main `develop` clean at `33fb4cd` (docs-only; no product change since Oct-11).
- P3 worktree `acrolab-lite-harden-p3-20261012` (`hardening/lite-p3-20261012`): HEAD `2e4dd6c`
  (DeepSeek PASS) over `a0475fb` (R3); dirty — `M app/lite-g1.svg` (1-line R1 axial-nullpivot
  refusal guard), `M tests/R3-shoulder-bilateral.spec.js`, 2 deleted + 14 untracked baseline
  PNGs. Writer `01a12db1` ended ~02:44 UTC (`process_gone`, transport death, not a verdict).
- Gate: P2QA `9fb3c77` REVISE stands; no C3 until the guard is committed GREEN + re-reviewed.
- P4 worktree at `dcb549e` with uncommitted `evidence/r4-*`; D4 NEVER launched (no `…-d4-*`
  worktree). Ticks `0316-c3-repair`, `0431-p4-handoff`, `0621-d4-qa` produced zero commits —
  correct fail-closed, not progress.
- Recovery session `01a12f76` (clean worktree `…-p3-nullpivot-recovery-20261012`, Goal
  `8ba35fe9-…`, Muse Medium) held 1 untracked spec at 09:36 UTC, dirty with its own fix by
  ~10:00 UTC. UNKNOWN (as of this writing): whether its pursuit/advisor outcome completed.
