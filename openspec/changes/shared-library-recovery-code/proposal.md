# Shared library recovery and cross-device sync

Status: **PROPOSED / HUMAN SECURITY GATE BEFORE PUBLIC DATASTORE DEPLOY** (2026-10-10).

## Why

The user's browsers currently hold their own `data.library` inside a local project cache. Exporting JSON is possible but moving files between mobile/desktop is inconvenient and losing a device/browser cache risks losing saved poses/exercises. The user wants a recoverable **single shared library** between devices via a code, without synchronizing project/timeline/editor state. A separate DogFood receipt/instrumentation flow remains private.

## User outcome

`Create library` → recovery key and optional QR; `Join library` on second device using key or short one-time pairing code; SAVE of BodyPose/Exercise on linked device becomes available on other linked devices when they refresh/reconnect. Offline saves survive, conflicts never silently overwrite, and library-only export/import remains available. Timeline project, camera/Undo/selection remain local.

## Technical boundary and risks

See `docs/SHARED-LIBRARY-CONTRACT-2026-10-10.md` (normative architectural design). Product Lite owns the asset schema/editor client; portal owns secure accountless capability auth and private persistent database. Never import the scientific AcroLab or upload raw project/gesture logs. Reuse existing origin and protect pinned Beta/Alpha. No custom second scheduler, task DB or persistent agent. Old client versions must not silently corrupt shared state.

## Discipline skills and phased plan

Explore → OpenSpec proposal/design/spec/test-plan → independent security review → explicit approval of secrets UX/backups/limits → implement **in isolated product and portal worktrees**, one writer per worktree → TDD Node+real Chromium/touch and two browser contexts → verify device loss and conflicts → local lab accept → separate user-approved public rollout. No `/api/library/v1/` is live today.

## Human Gate

Secure default proposed: 128-bit-or-more permanent recovery key (backup for device loss), and optional 8-character short code only for five-minute linking while an existing device is available, with strict anti-bruteforce measures. No small permanent PIN. Require confirmation of this tradeoff and reviewed private server backups before live persistence activation.
