# Design — single shared library, local project

## Deployment roles

- Lite self-contained SVG editor: local JSON `data.library` and persistent project `data.keys`; new library-only import/export, shared library merge client and visible sync indicator. The in-SVG app may message a **same-origin parent portal** using whitelisted `postMessage`, with strict source/origin/type matching. A standalone SVG must degrade gracefully to local-only/export; do not require parent.
- Portal: separate private library datastore/API and token/pairing endpoint; never serve arbitrary user assets as executable web resources. Existing anonymous feedback JSONL retains its unrelated privacy lifecycle. Use same-origin fetch credentials in request headers, no secrets in query/path/history. Beta/Alpha isolate local project state while cross-channel shared library uses only explicitly compatible asset schema.

## Data model (proposal)

`Library {libraryId, schemaVersion, rigSourceSha, generation, assets}` server-side; `Asset {assetId, revision, kind: BodyPose|Exercise, name, payload, createdAt, updatedAt, deletedAt?}` bounded and validated, with BodyPose body/placement and Exercise members snapshots including any stable relative timing. Exclude UI-only collapsed/selected, project keys/duration, draft, playhead/camera/Undo and diagnostics. Names are escaped inert text. Preserve unwrapped orientation and DESIGN provenance. Use stable IDs and optimistic version checks.

## Access control / onboarding

Generate 128+ bit random master recovery key client-side or from a secure server entropy source, show-once with grouped text and optional locally generated QR. Server holds digest, not plain recovery key. Pairing mechanism: authenticated device creates short one-time 8-character code valid ~5 min, capped attempts per origin/IP/code, consumed on successful link. New device receives revocable scoped device credential; full recovery key can re-issue credentials if devices lost. Lost all keys/devices may be unrecoverable. Design revocation/rotation before accepting a stolen-key scenario. Do not pretend codes by themselves provide encrypted-at-rest or E2EE.

## Sync behavior

On SAVE/UPDATE library entry: commit locally → enqueue idempotent mutation by immutable assetId+client opId+baseRevision → attempt server POST/PUT conditional update → show pending/synced/conflict. On open/reconnect/manual refresh: authenticate → incremental GET since server generation → merge by ID and revisions. Return 409 on concurrent edits, preserving both payloads and queue; no silent last-write-wins or data loss. Offline queued actions survive reload and are retried without a daemon. Reconciliation leaves `data.keys` untouched, and should not create an editor Undo command for remote read (only library changes). Deletions use tombstones; check legacy schema version compatibility before applying.

## Telemetry/data separation

The portal DogFood recorder never sees master key/device token/pair code, request body or library content. A session diagnostic upload happens ONLY when opted in with explicit checkbox. Send only categorical library error indicators if relevant; never include library ID or secret in bug/idea reports.

## Validation and release

Source v0.5 SHA and mannequin SHA unchanged; local-only fallback test, two isolated browsers with different storage directories, browser reload and clear storage simulated loss, offline/409/quota/invalid schema/rotation 360°/XSS in name tests, encrypted HTTPS portal review, origin/header/auth/rate-limit negative Node tests, private store backup+restore. Canary Alpha first with separate datastore feature flag; no Beta changes or public service modifications before explicit rollout gate.
