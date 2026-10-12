# Real-browser baseline audit — SVG Motion Lab v0.5

Status: **REVIEW EVIDENCE, not accepted implementation nor passing T01–T28**. Review by native Pi session `01a12311-e316-74cb-b090-6b2c5e93a1cc` using `openai-codex/gpt-6.1-sol` Medium, read-only. Date: 2026-10-10. CWD `/home/ubuntu/code/acrolab-lite`, `develop` HEAD `92ea138b983886f8a3b8cc93492ecac8586e36c5`. Native Goal `56e27ddb-09e2-486c-ba38-0047de38ae34` paused, no driver.

## Artifacts and setup

- Frozen SVG experiment: `assets/reference/svg-motion-lab-v0.5.svg` (86,088 bytes), SHA-256 `93246123d6e307e51562d187ddc0ed33639953f83ac9fee9f297cbed1f07555b`.
- Canonical user mannequin: `assets/source/manekin2D-vertical2.svg`, SHA-256 `99ccb17102f550192b4e47e9ae3b83f18ccdc3d8ad742a5f77d3d61f38df097e`.
- Chromium 155.0.8059.39 via `/usr/bin/chromium-browser` and Playwright, temporary isolated browser contexts. SVG opened as native `image/svg+xml` XML document, root `svg`, no `document.body`. No app files or public site changed by reviewer.
- Browser review images from ephemeral review were preserved at `openspec/changes/first-usable-lite-editor/evidence/v05-baseline/`: `desktop-initial.png`, `desktop-rotate.png`, `desktop-stale-ref.png`, `desktop-marker-drag.png`, `mobile-tap.png`. These are visual evidence, not full automated replay traces.

## Observed browser behavior — narrow conclusions only

| Behavior | Observation | T-case status |
| --- | --- | --- |
| Click/tap shoulder | Selection of `shoulder` observed desktop and emulated mobile | Smoke only; not T04–T06 |
| REF and deselect saved pose | `pose-02` selected, REF on, tap empty timeline: key count **1→0**, visible guide count **1→1** (stale guide) | Reproduced failing route for T19 |
| Rotate with prior selection | Select shoulder; drag unselected elbow marker by (+60, −25) CSS px, 8 steps: selection still shoulder; body angles stayed zero; global root moved about (+35.11, −14.67) scene units | Reproduced unintended fallback, relevant to T04/T06/T08 |
| Edit + reload | Modified body placement survived a `page.reload()` in same isolated context | Partial smoke, not T17 acceptance |
| Pause | Label/time stayed at 0.31 s for another 100 ms | Partial smoke, not T16 resume test |
| Mobile | Emulated 390×844, viewBox 0 0 400 800, 13 handles, tap selected shoulder | Not physical Android T27 |

No complete mortal workflow, FLIP circle, pinch, hold, export/import, cold restart, or physical mobile tests were run. No claim of green acceptance or coverage percentages.

## Source inspection and migration risks

1. SVG lines ~516/552/604 cache/draw deselected reference guides without removing them; stale REF confirmed.
2. SVG lines ~577–589 permit a selected-joint gesture to choose whole-actor translation on an unselected marker; must never silently fall back to root move.
3. SVG lines ~540–548/594 apply floor contact by path sampling and lift root, including at render/playback; the imposed lift violates the no-hidden-compensation editorial contract. Safety/nonpenetration NOT proven by 81 equidistant samples or endpoint tests alone.
4. SVG lines ~523–526/531 create a key during unrequested commit, fail to enter ADD/PASTE immediately into editing, and load a library row on direct click rather than selection-first. Validate every deviation with failing browser/unit tests before correction.
5. Storage write errors are swallowed (~495); cache load is not fully validated (~496/503). Browser reload smoke is not a guarantee of durable recovery.
6. SVG metadata `SOURCE_SHA=7069ad…12835` differs from authoritative source hash, but review found **15 named body path `d` values identical** and all **13 pivot centers agreeing numerically** after circle transforms (11 circular marks + 2 metadata head/neck). Whole style/layer/stroke and transformed-pose equivalence remain unverified. Never fix by replacing just the hash or altering the user's source SVG.
7. Design inconsistencies requiring an H1 decision or explicitly recorded interpretation: whether Undo restores selection (gesture vs editor-state contracts), canceled gesture selection preservation vs T25, timeline pinch duration extension vs viewport-only wording, and how multiple saved jumps/sequences differ from the current library of individual poses.

## Recommended test sequence

1. Capture deterministic **red regressions** first for stale REF (T19) and unexpected root fallback (T04/T06/T08), using SVG/document selectors, isolated storage, pointer event ordering, exact expected state, screenshots and replay trace.
2. Verify geometry mapping, z-order and 13 exact pivots against canonical original before migrating rig data.
3. Cover authorship and time transaction handling, actual mid-key edits, undo/redo, clips vs library, persistence/reload/reopen and invalid/corrupt input.
4. Solve explicit floor policy without root compensation; test rotated parts, stroke extents, swept paths, interpolation and camera clamping.
5. Test desktop/multi-touch/physical Android separately; then build human-like creative jump sequences and adversarial randomized state-machine scenarios with seeds and minimized repros.

The browser explorer shall use real UI actions and inspect DOM/SVG state + screenshots; never mutate a pose through browser evaluate as a substitute for user interaction. Visual plausibility is judged as an editorial proposal by people, never as proof of physical validity. Work in Pi-native isolated worktrees only after the Human Gate. Do not overwrite historical public site versions.

## Human Gate and liveness

Goal remains user-paused; do not update/attach/start until authorized. PiBoard Goal plugin still reports a requirement detection discrepancy for `pi-goal-hermes`; verify effective Hermes event/judge/continuation with a bounded authorized execution before treating idle or pursuing as autonomous work. Sol is reviewer only. Developer uses a different Pi session/model after gate. This document is review evidence, not approval.
