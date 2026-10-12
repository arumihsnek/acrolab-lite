# Frontier handoff note — 2026-10-12 ~21:10 UTC (tick `01a131ea`)

Short, redacted, docs-only. Supersedes the 20:15 UTC note on ONE point: the P4 worker
is now LIVE via the /tmp fallback. No product change yet; C3 `97ea8ac` still accepted.

## 1. P4 worker launched (verified transition, one bounded step)

- Session `01a131ec-e1ad-72d3-8caa-ddcace42cff0`, status `streaming` after prompt
  delivery (`transmitted:true`, promptId `d58a15de`), pid 3215490 alive.
- Effective model `opencode-go/muse-spark-1.3-contributor`, thinking `medium` — the
  preferred worker profile arrived as the spawn default; no `set_model` was needed.
- Launch shim cwd `/tmp/p4-worker-01a131ea`; ALL product work directed by absolute
  path into `/home/ubuntu/code/acrolab-lite-p4-rebase2-20261012`
  (branch `hardening/lite-p4-rebase2-20261012`, base C3 `97ea8ac`, tree clean).
- Bounded brief: rebase REF R4 `dcb549e` onto `97ea8ac` (C3 guard wins conflicts),
  full regression battery (Chromium max 2, ports 43231/43232), commit `fix(lite-p4)`
  only if GREEN, then STOP. No `develop` merge, no release, no other worktree.
- Old P4 worktree (`...-p4-rebase-20261012` at `dcb549e`) untouched. Old P3 `01a12db1`
  stays dead. Single `app/lite-g1.svg` writer lease held by this worker.

## 2. Spawn-transport diagnosis advanced (new evidence)

- 21:02 UTC REST spawn into the FRESH P4 worktree -> keepers died, never registered;
  journal shows **two** `[watchdog] FIRE` lines (pids 3213469, 3213581) for ONE POST —
  possible double-keeper anomaly, worth one bounded read-only look by a future tick.
- 6th consecutive FIRE into an `acrolab-lite-*` cwd vs 2nd success into a `/tmp` cwd
  (19:08 probe, 21:03 worker). Block is cwd-correlated, root cause still UNKNOWN;
  no dashboard restart attempted. No strays left (list_sessions 349 -> 350, delta is
  exactly the new worker).

## 3. QA zombie confirmed (read-only, no action)

- Session `01a12f88` still lists `active` but last activity ~16:55 UTC (~4h idle);
  its worktree is CLEAN at `5ed9285` (both DeepSeek PASS reviews committed). Stale
  entry, not a progressing reviewer — no salvage, no nudge, no replacement.

## 4. Next checks (following tick, not a loop)

1. Verify the worker's first real activity: `tokensOut`/`lastEntryCount` advance +
   rebase commits appear in the P4 worktree. If streaming with zero progress for
   >1h, send at most ONE scoped salvage prompt to the SAME session.
2. After P4 commit: separate DeepSeek HIGH review before any C4 claim.
3. Duplicate-tick rule stands: this tick's siblings all `ended`; `01a131ea` owned it.
