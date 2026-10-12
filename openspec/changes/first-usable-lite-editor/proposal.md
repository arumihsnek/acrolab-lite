# Proposal: First usable AcroLab Lite editor

Status: PLANNING / PROPOSAL — not implementation authorization.

## Existing product baseline — User decision, 2026-10-10
This change **continues the existing interactive SVG Motion Lab v0.5** instead of creating a new application from zero. Freeze the byte-exact original at `assets/reference/svg-motion-lab-v0.5.svg` (SHA-256 `93246123d6e307e51562d187ddc0ed33639953f83ac9fee9f297cbed1f07555b`). Its usable SVG controls, gesture code, stage, timeline and library are the primary candidate for Lite. The HTML mockup is a parallel planning sketch only; do not promote it over v0.5 without a new user decision.

The user's central goal for this repository is **agent-driven testing and surgical debugging of the existing SVG editor**: act like an artist in browser/mobile, build complex movement clips, stress feature combinations, capture and replay regressions, and use reasoning to assess editorial plausibility. Human review defines visual/creative acceptance. No scripted motion is a physical or biomechanical proof.

The authoritative source mannequin `assets/source/manekin2D-vertical2.svg` has a different SHA from the metadata embedded in v0.5. Reconcile that provenance and exact visual/pivot mapping before changing any source geometry. Existing experimental site: `https://lab.hermesinthenight.duckdns.org/`; deployment is independently gated, not automatic.

## Why
An independent creative, participative, mechanically informed acrobatic animation tool is simpler and more useful than extending the scientific AcroLab Godot Studio for each interaction idea. The historical SVG experiments exposed regressions caused by confused gesture semantics, modes and independent pose drafts.

## What changes
- Establish a standalone web/SVG Lite product from user's revised anatomical SVG with exact original joint pivot marks and visual stacking.
- Minimal joint-only selection and deliberate separation of tap from swipe/drag, long-press multi-select, Rotate/Flip and implicit whole-actor drag.
- Always accessible pan/zoom, geometrically enforced solid floor, timeline keyframes/retiming, resumable play/pause, robust undo/redo.
- Auto-persist current authored pose within project state; Save to separate library, collapsible right panel. Copy/paste/delete and explicit timeline seek rules.
- Transparent references (selected saved frozen poses and live ghost keys) and deterministic absence of deselected refs.
- Project/pose library save/reopen with versioned data and export-ready bridge provenance; desktop and Android Chrome support.
- Native PiBoard Goal + OpenSpec + scenario tests + independent review + human UI acceptance gate.

## Exclusions
No scientific feasibility or safety certification; no forces, collision/contact dynamics, IK compensation, path optimisation, joint/part locks, AUTO/Protect/Disable, RigidLink, heterogeneous selection, parent Godot OpenSpec reuse, second control plane, automatic publishing to AcroLab.

## Dependencies
User-supplied exact `manekin2D-vertical2.svg`; PiBoard runtime Goal and skills. No runtime dependencies on AcroLab.

## Discipline Skills
- UX / frontend: browser pointer capture, accessible touch controls, responsive layout.
- Testing: Playwright pointer/touch emulation, DOM invariants and actual Android human acceptance.
- Data integrity: versioned scene/pose/library persistence, lossless import/export, undo/redo.
- Security: static public PWA, no OAuth or backend for phase 1; no remote uploads or secrets.

## Human Gates
**Planning gate BEFORE build:** user reviews an interactive mockup (desktop + Android viewport), accepts branch/gesture interpretation, floor feedback, between-key edit and Save-to-Library behavior. **Hardware gate AFTER automated candidate tests:** user validates touch workflow on actual Android Chrome before product acceptance. Later explicit authorization required for physics/scientific claims, collaboration server or AcroLab importer.

## Boundaries
OpenSpec tasks are plans, not evidence of execution. Candidate code runs in isolated worktrees only after plan approval; final acceptance needs test evidence and versioned SHA.
