# PiBoard automation duplicate roots — verified 2026-10-12

**Status:** tested platform evidence, docs only. No scheduler/API change made or proposed here —
any fix needs a separately authorized dashboard-repo plan. Absorbs the prior top-level snapshot
(removed; history preserved in Git).

## 1. Verified double fires (OBSERVED)

Every cron below declares a `schedule` trigger with `concurrency: skip` +
`maxConcurrentSpawns: 1` (verified via `list_automation` + `automation.yaml`, valid:true).
Expected: one root per schedule. Observed: **two separate root runs per firing, ~50–150 ms
apart**, every time — all four dated crons AND the standing hourly cron. Run logs live in
`home/.pi/automation/runs/`; each run dir holds `run.json` (`status`, `children`, `findings`)
plus a child dir and `result.md`. The `children` entry is the spawned root session, whose
`automationRun.runId` suffix is the EVEN number following the run record's ODD number.

| Cron (UTC) | Run records (`run.json`: startedAt Δ, status, findings) | Child root sessions |
| --- | --- | --- |
| 0316-c3-repair | `…031600…-00011` (…4960001, done, 6) + `…-00013` (…4960116, done, 8) — Δ 115 ms | `…-00012` + `…-00014` |
| 0431-p4-handoff | `…043100…-00019` (…9460001, done, 0) + `…-00021` (…9460122, done, 0) — Δ 121 ms | `…-00020` + `…-00022` |
| 0621-d4-qa | `…062100…-00031` (…060001, done, 5) + `…-00033` (…060144, done, 7) — Δ 143 ms | `…-00032` + `…-00034` |
| 0839-roadmap-harvest | `…083900…-00043` (…340001, done, 7) + `…-00045` (…340114, done, 5) — Δ 113 ms | `…-00044` + `…-00046` |
| hourly continuation (`0 * * * *`) | `…090000…-00047` (…600000, done, 3) + `…-00049` (…600050, done, 6) — Δ 50 ms; same paired pattern at 02:00 (`00003/00005`), 03:00 (`00007/00009`), 04:00 (`00015/00017`), 05:00, 06:00, 07:00, 08:00 | even children (e.g. `…-00048`, `…-00050`) |

Session-file cross-check: `agent/sessions/2026-10-12T03-16-01-538Z_…` +
`…-724Z_…` meta records carry `automationRun.runId …-00012` / `…-00014` — the same pair
seen from the session side. All four dated crons now `disabled: true` (verified via list +
`automation.yaml`); all retain `automation.yaml` + `prompt.md` intact.

Session-side signatures (0316 pair, both `status: ended`, `closedReason: unknown`):
meta `startedAt` `1791774969335` vs `1791774969425` (Δ 90 ms); 09:00 pair `1791795608772`
vs `1791795608671` (~100 ms, either root may start first). 09:00 pair carries
`liveEpoch: 1791763507577`; the 0316 pair has none — correlation UNKNOWN.

**Reproduction:** any schedule Automation with `concurrency: skip` + `maxConcurrentSpawns: 1`
firing on a cron minute yields two same-minute run dirs (odd suffixes, Δ <200 ms), each with
one even-suffixed child root. Check: `ls …/automation/runs/ | grep "<date>-<HHMM>"`.
**Regression-test candidate (upstream):** schedule one cron, fire once, assert exactly one run
record + one root child; assert a second same-minute trigger is skipped, not spawned.

## 2. Root-cause hypothesis (HYPOTHESIS, not proven)

Multiple trigger registrants or refresh/replay paths each admit one spawn before either records
the run, so the concurrency guard never sees its sibling (Δ ~50–150 ms fits a race, not a retry).
**UNKNOWN:** exact dispatch code path; why run records take odd suffixes while children take
even ones; whether `liveEpoch` presence correlates. Do not rationalize one native schedule —
diagnose trigger roots first.

## 3. False-positive spawn: launch receipt ≠ driver registered (OBSERVED + REPORTED)

- **Observed by this repo's ticks:** 09:00–09:05 UTC resume of dead P3 writer `01a12db1` —
  `resume(mode:continue)` RPC succeeded twice (keepers `2624007`, `2627152`) yet both keepers
  died within ~40–45 s, session stayed `ended`, prompt rejected (`no bridge connection`),
  `lastActivityAt` frozen at `1791773058349`. Reproducible check: after any resume-RPC success,
  verify within 60 s that the session leaves `ended`, `lastActivityAt` advances, the keeper
  persists, and the bridge accepts the prompt — else treat as false positive, stop, report BLOCKED.
- **Harvest-reported (not independently re-verified here):** 09:31–09:33 UTC
  `/api/session/spawn` returned success + keeper PIDs `2704138`/`2704865`, but both died and
  registered no session; a manual isolated Pi RPC (`2709928`, correct `HOME` /
  `PI_CODING_AGENT_DIR`) registered as `01a12f76`. Corroborated: `01a12f76` exists, streaming,
  cwd = clean recovery worktree. Lesson, both cases: **process-launch receipt is not proof of a
  registered/active driver** — always verify session registration + post-checkpoint work.
- **Cron POST caution:** dated crons were disabled by direct `automation.yaml` edit
  (`disabled: true`, `on`/`action`/`promptBody` intact — all four verified intact above).
  The automation-update API with a `config` object is known-unsafe (separate 2026-10-12 finding:
  serializes config as a char-indexed map, leaving `valid:false`). Whether any cron actually
  lost `prompt.md` or suffered YAML corruption via POST is **UNKNOWN** from this repo's
  evidence — document from harvest records, do not assume the root cause.
