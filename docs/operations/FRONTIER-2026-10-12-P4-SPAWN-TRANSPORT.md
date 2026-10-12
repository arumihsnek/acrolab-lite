# Frontier handoff note — 2026-10-12 ~20:15 UTC (tick `01a131b3-5fde`)

Short, redacted, docs-only. Supersedes the 19:10 UTC note on ONE point: the P4 spawn
block is NOT specific to the old P4 worktree. No product change; no live writer anywhere.

## 1. C3 still VERIFIED-ACCEPTED (unchanged)

`97ea8ac` + 2x DeepSeek PASS. No live product writer. Old P3 `01a12db1` stays dead.

## 2. P4 spawn block: diagnosis advanced (new evidence this tick)

- 20:09 UTC REST spawn into `acrolab-lite-p4-rebase-20261012` (HEAD `dcb549e`, clean)
  -> keeper 3160574 died, never registered. Journal: `[watchdog] FIRE ... timeout=30000ms`.
- 20:12 UTC created FRESH worktree `acrolab-lite-p4-rebase2-20261012`, new branch
  `hardening/lite-p4-rebase2-20261012`, exact `97ea8ac`, clean, old P4 worktree untouched.
  REST spawn there -> keeper 3164627 died, never registered; identical FIRE signature.
- `.pi/settings.json` identical across P4 / recovery / canonical worktrees: not the cause.
- Score: 4 consecutive watchdog FIREs into acrolab-lite-* cwds (19:05 bus, 19:05 REST,
  20:10 REST, 20:13 REST) vs 1 success into `/tmp/tick-probe-20261012` (19:08).
  Dashboard shows persistent `[openspec-poll] slow tick ~6.5s`; 347 resident sessions.
  Root cause UNKNOWN (cwd-correlated keeper hang vs saturated dashboard). No keeper
  stderr in journal, only FIRE lines. No further retries this tick (spend cap).
  Zero live-writer footprint left behind (verified via list_sessions).

## 3. Next verifiable checks (following tick, in order - not a retry loop)

1. Retry ONE spawn into the FRESH worktree (clean at `97ea8ac`). If it registers, bind
   the bounded P4 prompt: rebase R4 `dcb549e` onto `97ea8ac`, re-test, commit, stop;
   DeepSeek review after. Old P4 worktree stays untouched.
2. If watchdog fires again, do NOT create more worktrees: spawn into a minimal fresh
   dir (proven /tmp-class path), then prompt that worker to operate on the P4 worktree
   by absolute path (lease still free). Verify lastActivityAt advances + real rebase
   work appears, or record BLOCKED.
3. Do NOT restart the dashboard, build a second scheduler, or touch old fixed-stage
   crons (all disabled; continuation-20261011 is the sole mechanism).
   Duplicate-tick rule stands: sibling `01a131b3-5ff7` already ended.
