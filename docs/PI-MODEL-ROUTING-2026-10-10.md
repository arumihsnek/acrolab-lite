# π / PiBoard model routing — free-first diverse native Pi workers (2026-10-10)

**Status:** explicit user authorization, recorded and live-catalogue-checked; model **listing is not proof of quota/auth or successful inference**. This policy governs new/future Pi sessions and model selections in the independent AcroLab Lite editor and portal, without retroactively reviving user-paused, falsely achieved, or orphaned Goals. Authority: user instruction 2026-10-10 > this file > older OpenSpec/mission model lists.

## Intent

Favor low-cost experimentation and **use genuinely free models actively**, rather than relying on a single Muse worker for all tasks. Free options may fail first due to quotas/concurrency; bounded, verifiable subtasks are a good fit. Muse Spark 1.3 Contributor can remain one active long-running worker; when there are two or more independent workers, diversify models **and providers**, and avoid duplicate writers to shared files. This is scheduling/role selection **inside native Pi**, not a new agent hierarchy, scheduler, custom retry daemon or Codex CLI.

## Verified live PiBoard model IDs

Catalogue checked with PiBoard `list_models` on 2026-10-10. **Listed/zero catalogue cost is not evidence of remaining usable quota**.

| Model / exact provider-qualified ID | User-intended lane | Limits |
| --- | --- | --- |
| `opencode-go/longcat-2.5-preview-free` | First-choice no-charge, bounded implementation, exploratory browser tests, docs | Marked `free` and zero rate in catalogue; preview, may 403/429/unavailable |
| `commandcode/stealth/glyph-cluster:free` | Free bounded experiments, alternate checks and small reviews | Free-labelled, try a short isolated proof of actual access before assigning a Goal |
| `commandcode/inclusionai/ling-3.1-flash:free` | Free independent analysis/review, test-case critique, short coding probes | Free-labelled, don't make security/deploy acceptance depend solely on it |
| `opencode-go/mimo-v2.6-flash` | Affordable reliable build/test worker, candidate long/small implementation | **Only OpenCode Go variant** preferred; do NOT route as CommandCode/Xiaomi |
| `opencode-go/muse-spark-1.3-contributor` | Economical sustained one-writer engineering / Goal driver; may stay active | Prefer small cohesive context and durable handoff over large in-session compression; previous OpenCode Go 429 on output quota paused Hermes |
| `commandcode/deepseek/deepseek-v4.1-flash` | Reserve for independent judge / demanding security and review, and fallback after free model failure | Be measured about using it; available in catalogue but provider usage/quota still checked |
| `commandcode/stepfun/Step-5-Preview` | **Conditional** experimental Step 5 for bounded tasks, ONLY after confirming actual free/quota entitlement and inference | **Not currently listed under `opencode-go`** and no `:free` label. Do not fabricate `opencode-go/step-5-preview-free`, silently substitute or assume zero-cost listing proves free |

Do not use `commandcode/meta/muse-spark-1.3-contributor` or `commandcode/xiaomi/mimo-v2.6-flash` merely because similarly named catalogue entries exist. The same named model through a different provider may have different quota/auth; use the exact intended provider route. If the live catalogue changes, discover and document the replacement rather than assuming it.

## Dispatch algorithm (not an executor or mandatory static order)

1. Inspect PiBoard health and provider availability, exact absolute cwd, native Goal/driver, Git/worktrees, budgets, installed Pi extension and model catalogue. Respect user-paused resources; do not mass-revive Goals on model change.
2. **Small parallel, isolated tasks** (test design, test fixtures, quick bug investigation, bounded code change, docs): test LongCat 2.5 Free or Ling/Glyph free as suited to coding vs review, while one Muse driver can handle a larger independent front. Verify real reply, output files and tests, not just API listing.
3. **Sustained/complex implementation:** OpenCode Go Muse Contributor or MiMo v2.6 Flash, chosen for actual tool-call reliability, context and observed 429/quota. A free model with demonstrated strong performance can be promoted for more bounded tasks; never require a paid upgrade solely because a model has `free` in its name.
4. **Independent critique/judge:** prefer a different model/provider from the author. First try free Ling or Glyph for a *bounded* check; use CommandCode DeepSeek v4.1 Flash when it fails, output is insufficient, the review is unusually important (data/security/public Alpha deployment), or model diversity is otherwise insufficient. Never auto-accept `done`; judge + GoalRecord criteria + tests and actual evidence must agree.
5. **Experimental Step 5**: until PiBoard exposes an explicitly free OpenCode Go ID or proves a free usable CommandCode route, do a small opt-in bounded probe before using it in unattended loops. Avoid surprise billing.
6. **Retry and fallback**: on transient 429/timeouts, pause safely, preserve exact error and committed state; at most one short bounded provider retry when within quota, then switch to a *different provider's approved model* with fresh Pi session and durable Git/OpenSpec handoff when suitable. On authorization/403, inspect entitlement; don't retry blindly. Verify the effective new model/effort actually took effect. Respect single writer and existing native Hermes continuation, not blind prompt nudges; autoRespawn only handles eligible process death, not idle/judge/429 pause.
7. **Per-mission accounting**: finite max turns/spend; explicit progress evidence (criterion, session ID, model, last event, test log, commit SHA). A model swap may require ending/handoff from saturated 200k+ context instead of dragging history through compression. No Sol High/XHigh or Astra escalation without explicit user authorization; Sol Medium remains review/planning-only per Lite contract, never builder.
8. **Security and cross-repo boundaries are invariant**, irrespective of price: private research AcroLab untouched, live Beta user approval gate, Alpha microrelease only after actual code/security/E2E/release checks and rollback. Never let an untrusted short-task agent skip release gates.

## Practical role examples

- Three separate fronts: Muse (core UI), `opencode-go/longcat-2.5-preview-free` (isolated targeted Playwright tests), `commandcode/inclusionai/ling-3.1-flash:free` (independent bounded test review).
- On free provider failure: switch that front to `opencode-go/mimo-v2.6-flash`; for independent higher-assurance review, `commandcode/deepseek/deepseek-v4.1-flash`. Step 5 is conditional.
- Two workers should not both modify `app/lite-g1.svg` or `server.mjs` in the same worktree. Use native Flow/DAG dependencies or isolated worktrees, then integrate reviewed results.

Implementation of this policy does **not** by itself launch or modify any Goal; each mission needs real Pi Hermes start and observed work.

## 2026-10-11 user feedback — Muse-first for similar paid OpenCode Go work

Explicit user objection: the previous dispatch overused MiMo v2.6 Flash where Muse Spark 1.3 Contributor appeared cheaper and more capable in actual AcroLab Lite work. This newer preference overrides the earlier informal MiMo-for-small-work fallback/default without overturning distinct-provider independent reviewing or short trials of usable truly-free routes.

Verified live PiBoard catalogue on 2026-10-11:
- `opencode-go/muse-spark-1.3-contributor`: input $0.10 / 1M tokens; output $0.20 / 1M; cache read $0.002 / 1M; advertised context 1,048,576 tokens.
- `opencode-go/mimo-v2.6-flash`: input $0.14 / 1M; output $0.28 / 1M; cache read $0.0028 / 1M; advertised context 1,048,576 tokens.
Muse's catalogue rates are 28.6% cheaper at identical token volumes. Benchmark-proven superiority across all work is **not established**, but Muse's local product R6/R7/R4 work has produced substantial GREEN evidence. The previous choice of MiMo for G1 mapping/docs alone is not a capability advantage.

**Dispatch from now on:** Muse Contributor Medium is the **default coding and plan/doc model**, including bounded small tasks; MiMo is **conditional**, selected only after concrete quota/auth/rate-limit availability, lower actual end-to-end cost, or task-specific quality/latency evidence justifies it. A named MiMo assignment in a not-yet-started roadmap package is a suggestion, not a requirement; preserve per-stage budgets and exact effective model. Truly free model experiments may run for isolated disposable work but must not displace a productive Muse writer without evidence. Independent reviewers remain a different model/provider, commonly CommandCode DeepSeek Flash; Sol stays constrained to expressly authorized review/test-only work in native Pi.

Model pricing is indicative catalogue metadata, not a promise of usable remaining quota or final bill; benchmark by accepted deliverable per total tokens/time, not only list rates. Existing ended sessions and produced commits remain untouched.
