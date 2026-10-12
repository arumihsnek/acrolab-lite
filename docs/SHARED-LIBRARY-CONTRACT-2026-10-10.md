# AcroLab Lite — shared library by recovery key (design, 2026-10-10)

**Status:** architectural proposal derived from user's request to recover and share Pose/Exercise **library assets** among browsers/devices without uploading files. NOT implemented, deployed, security-reviewed or a public API. This is part of the independent Lite product; the scientific AcroLab repository and its private data are out of scope.

## What the user should experience

The editor keeps editing state locally, and optionally connects its **library only** to a private shared shelf:

1. **Biblioteca → Compartir / Recuperar**: on first connection select **Crear biblioteca compartida**. Existing local BodyPose/Exercise objects are offered for *non-destructive merge*; never silently upload the user's local data. Cloud library has an opaque ID, version and an unguessable **recovery secret**.
2. Display the **recovery key once**, 128+ cryptographically random bits, encoded for typing (e.g. ~26 Crockford Base32 characters with groups and checksum; actual implementation must prove entropy) and/or **local QR**, with clear copy/save instructions. This is effectively a password: anyone holding it can read/modify that library. Never put in URL/query, log, analytics, feedback, screenshots or Git. Warn that loss of *all* paired devices and recovery key means recovery may not be possible.
3. **Recuperar biblioteca** on a new browser/device: paste/scan the **long recovery key** → authenticate over HTTPS, show a preview of library name + asset count, then merge cloud items with any existing local library by stable IDs. Never replace current project, active timeline, camera, selection or Undo. Save the credential on this device only after clear confirmation; offer **Desvincular** to remove locally.
4. For convenient pairing **while an already linked device is available**, its user requests a **short temporary one-time code** (e.g. 8 random alphanumeric characters, valid for ~5 minutes with strict attempt/rate limits). A second device enters that short code to link its own persistent device credential. This short code is not a permanent recovery key; code enumeration must fail by design and tests. It cannot restore a library if no linked device/key exists.
5. Once linked, a library SAVE / UPDATE / new Exercise becomes **locally durable immediately** and queues a scoped library mutation. The application attempts a cloud write and indicates **Synchronised / Pending / Offline / Conflict** honestly. On editor open, reconnect, or explicit **Sincronizar**, pull cloud changes and merge. No custom background scheduler, no second account system. Editing the current timeline must never silently sync as a library item.
6. An existing library item keeps stable ID, rig/schema/provenance, body/placement (including unwrapped orientation) and Exercise members with their relative ordering/timing; UI-only `collapsed`, active selection, viewport/camera, playhead, gesture logs and clipboard do **not** sync.
7. **Exportar biblioteca JSON** and **Importar biblioteca JSON** remain independent, robust offline fallbacks, distinct from full-project export. No requirement to upload a file for normal cross-device recovery.

## Persistence and server boundary

- Existing SVG v0.5 `CACHE_KEY` and `data.library` currently persist **in the same localStorage JSON as project keys**. Shared library sync must select only validated library assets and preserve independent local project identity; never upload `data.keys`, working `draft`, timestamps of active playhead, Undo history, camera, device/session diagnostics or raw localStorage.
- Portal repo `/home/ubuntu/code/acrolab-lite-beta-web` would own a strictly bounded same-origin HTTPS API under `/api/library/v1/...` plus a private durable store (SQLite with migrations/backup preferable over feedback JSONL for upserts/concurrency). Product repo owns library schema, save/list/merge client and browser tests. Cross-repo interface is a **versioned schema/API contract**, never imports or a shared writable repository.
- Recovery secrets should be generated with CSPRNG, stored on server as a keyed digest/hash with constant-time lookup; per-device opaque scoped credential (revocable) is preferable to using permanent recovery secret on every request. No credentials in server request logs/URLs/referrer. Strict same-origin, HTTPS, CSRF/Origin checks, authentication, request/body/entry/quota limits, replay/abuse throttling, private file permissions, backup/restore drill and temporary-code expiry.
- Initial deployment uses existing OCI portal server only after independent review, isolated localhost integration tests, predeployment backup/rollback and explicit live-data migration gate. Do not expose server folders, private AcroLab data or any arbitrary user-provided SVG/HTML/JS. Treat pose labels as untrusted text.
- Threat model honesty: absent end-to-end encryption the portal **can access content of library assets**, and same-origin trusted SVG scripts can access locally stored device credentials. HTTPS + access code is not E2EE. Separate-origin/harder sandboxing requires later approval.

## Data conflict and offline defaults

- Asset upsert by immutable `assetId` + revision/checksum, with optimistic concurrency (e.g. `If-Match`/etag). Different asset IDs from separate devices **union**. For same-ID concurrent edits, return CONFLICT with both versions; never last-write-wins silently: preserve both or ask user to choose. Stable dedupe via ID, not by display name.
- Deletions are explicit and replicated as versioned tombstones with a clear recovery grace period/backup policy, not immediately destroying another device's item. Offline pending queue must be retried safely and idempotently, without mutating `data.keys` or duplicating entries on reconnect.
- Server limits protect resource cost: bounded item count, member count, bytes per item and total per library; exact initial quotas based on tests/real usage, configurable without weakening parser.
- Incompatible rig/schema versions do not corrupt library: explain mismatch, retain local copies, offer export/migration later. No invisible cross-Beta/Alpha migration unless both versions pass compatibility.

## Relation to DogFood

- Existing private feedback API `/api/feedback` appends anonymous user reports to server-owned JSONL with AL-... identifiers. The new DogFood portal candidate adds an **opt-in** rolling action recorder (150 events/3 minutes/28KB, OFF by default), but real intra-SVG semantic gesture events are **not yet wired end-to-end**. After user consents to attach, the server receives bounded diagnostics, validates and stores privately; Pi triages a finite batch, reproduces with revision+seed, then links redacted accepted DogFood in Git/OpenSpec with tests.
- **Never attach or reuse the library recovery key, per-device credential, pairing code, library content or private data inside DogFood logs**, even when diagnostics are enabled. Library sync failures can be reported using *safe categorical* errors (OFFLINE, HTTP 409 conflict, QUOTA) only, not secrets/request bodies.
- DogFood diagnostic **session** is distinct from saved Pose/Exercise **library** and from local project/timeline work. No silent linking of people or libraries to anonymous reports.

## Human/security gate

The user's outcome (no account; share library via code across devices; local project stays local) is clear. This document chooses a **secure default** of a permanent long recovery key plus short *temporary* pairing code. Before public activation, independently review threat model, datastore backup, expected asset quotas and device-loss UX; disclose that a shared recovery key grants editing access. Public live rollout is a distinct security/deployment gate, not implied by this planning document.
