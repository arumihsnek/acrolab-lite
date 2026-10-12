# Authorized v0.5 hardening mission — 2026-10-10

Authority: user explicitly approved overnight autonomous execution using native Pi, an isolated Git worktree, the existing SVG Motion Lab v0.5 as implementation starting point, and repeatable browser/unit tests. This is **scope-limited implementation authorization**; it is not approval of G1/G2 choices, final product acceptance, physical Android H2, or public deployment. Existing parent AcroLab is out of scope.

## Objective
Produce a tested, reproducible **candidate** successor to `assets/reference/svg-motion-lab-v0.5.svg`, retaining the v0.5 UI/interactive SVG approach rather than replacing it with HTML/React/Godot. Harness first, preserve red test evidence, then fix reproduced defects and cover maximum meaningful T01–T28 scenarios with actual Pi-driven browser actions, isolated profiles, deterministic assertions, screenshots and traces.

## Permission and safeguards
- Save and commit frozen v0.5, docs and OpenSpec baseline in `develop`. Create one isolated worktree/branch; only candidate implementation and test code may change there. Never modify original `assets/reference/svg-motion-lab-v0.5.svg` or `assets/source/manekin2D-vertical2.svg`.
- **Now authorized without further human approval:** infrastructure/unit/Playwright tests, reproducible red failures, fixing objectively broken behavior against unambiguous existing contracts (stale refs, unintended root translation, explicit authoring, undo/redo, storage warnings, reliable cancellation and replay), instrumenting read-only diagnostics, desktop and Android-emulated stress tests, editorial creative jump journey, additional regression cases.
- **Still Human Gates:** G1 semantics of drag begun exactly on *selected* joint marker; G2 precise floor rejection/clamp feedback; unresolved Undo-selection contradiction; timeline duration-extension policy where specs disagree; design of a multi-jump library/clip storage if beyond existing pose library. Make the smallest reversible candidate or isolate/suspend that feature; record a precise decision for Architect, do not silently declare it accepted.
- No scientific/physical claims, no Godot integration, no public domain/tunnel/release/deploy, no editing other projects, no global Pi config changes, no bespoke nudgers/schedulers, no Sol implementer. No weakening tests and no marking user gates passed.
- One writer to shared candidate files; optional Pi subagents/Flows may parallelize independent bounded test analysis only. Native Pi Goal/Hermes drives continuation, no sidecar loop.
- Independent reviewer/judge must be a distinct provider/model from the worker. GPT-6.1 Sol Medium is review-only and not required for nightly review; prefer economical independent model.
- Keep worker context bounded: commit each proven change with tests and exact SHA; durable notes in Git/OpenSpec, start fresh sessions on saturation. Budget is finite; continue while actionable failures and quota remain, stop/report genuine permissions or design gate blockers.

## Execution order (not a single giant coding turn)
1. Verify Git baseline, SHA invariants, v0.5 XML application served as `image/svg+xml` and browser setup. Establish minimal harness with real Playwright Chromium XML-root support, tests and deterministic storage fixture. Run tests against **unmodified frozen v0.5** and preserve reproducible red evidence.
2. Start candidate copy under worktree (e.g. `app/lite.svg`) and fix the two *reproduced* failures first: T19 residual REF guide after deselection, T04/T06 no whole-root fallback when a joint selection exists. Prove red→green in same harness.
3. Extend tests and surgical fixes by severity: mapping 13 pivots + layer visual; zoom/pan, Rotate/Flip, key selection/editing, refs/ghost/Undo, clipboard/retime/play pause, persistence/reload, floor without hidden compensation, mobile touch/pinch/cancel, import/export.
4. Run a browser-using agent journey to make a deliberately *editorial* jump sequence (preparation, push, tuck, rotate, open, land), save poses/projects, reopen, compare visual outcomes; preserve screenshots, actions, and blockers. Do not call internal app functions to fake human editing.
5. Add randomized seeded state-machine exploratory sequences across selection/axis/refs/time/library/camera, shrink failures to small replay traces and add them to deterministic regressions where useful.
6. Run targeted unit/browser/visual integration tests, independent code review, document tested/untested/blocked for each Txx. Commit isolated candidate changes; keep worktree open for morning review. Do not merge or publish until user gate.

## Acceptance evidence for the bounded overnight Goal
- Candidate + harness committed in isolated worktree; baseline SVG and source mannequin hashes unchanged.
- At least two previously reproduced errors covered by red→green browser tests, or a precise verified blocker.
- A working browser smoke on desktop and emulated mobile and tests for meaningful controls/scenarios, with exact results and failure evidence. Unexecuted Txx remain explicitly pending.
- Git/OpenSpec notes with each defect, SHA, reproduction, actual test command, screenshots/trace where applicable, remaining gaps and Human Gates.
- Verify native Hermes /goal loop and GoalRecord binding; GoalRecord done/idle by itself is never acceptance.

This document is written by ChatGPT Arquitecta as durable authorization reflecting the user's explicit current decision.
