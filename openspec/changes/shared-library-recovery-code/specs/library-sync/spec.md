# Library synchronization

## ADDED Requirements

### Requirement: LIB01 — Offline local library is an independent scope
Lite SHALL keep library assets separate from authored timeline/working state, preserve them on same-origin reload and allow a local-only library JSON export/import without server connectivity.

#### Scenario: Saving a pose offline never uploads timeline
- **GIVEN** a valid local project with a timeline, joint selection, camera pan, Undo state and one existing BodyPose in the library
- **WHEN** disconnected from the internet, the user saves an Exercise to the library then exports and reloads
- **THEN** both library assets survive and the export contains no project keys, draft, camera, selection, Undo, credentials or DogFood logs; importing on another local-only browser restores just the library

### Requirement: LIB02 — Recoverable accountless library identity
The web app SHALL offer a cryptographically unpredictable permanent library recovery key with at least 128 bits of entropy, optional local QR and a clearly communicated risk of key loss/disclosure. It SHALL NOT accept an easily guessable short permanent PIN as the recovery identity.

#### Scenario: Recover across unrelated browser profiles
- **GIVEN** browser A has created a shared library, saved a pose and safely recorded its recovery key
- **WHEN** browser B with empty storage joins using that key
- **THEN** B sees the same library assets after explicit confirmation while its local timeline and camera remain unchanged; missing all keys/linked devices is visibly unrecoverable rather than silently substituted

### Requirement: LIB03 — Short pairing is temporary and rate limited
An already-linked device MAY generate a short one-use pairing code with a brief expiration (~5 minutes); the code SHALL be invalid after use/expiry and brute-force resistant with server-side throttling.

#### Scenario: Temporary code joins one device only
- **GIVEN** an authenticated device creates a short pairing code
- **WHEN** a second device pairs within the permitted window, then another device retries that same code or tries numerous incorrect codes
- **THEN** exactly the intended pairing succeeds once; reused/expired/guessed codes fail without disclosing existence of a library

### Requirement: LIB04 — Saving a library asset syncs without syncing the project
When a shared library is linked, SAVE/UPDATE library operations SHALL durably save locally, enqueue an idempotent scoped cloud mutation and visibly indicate sync state. Timeline edits SHALL NOT produce library network writes unless explicitly saved as library assets.

#### Scenario: Device A library save appears on device B
- **GIVEN** two devices linked to the same library with different local projects and network connectivity
- **WHEN** device A saves a new BodyPose or Exercise to its library and device B refreshes/reconnects
- **THEN** the new stable-ID asset appears on B without overwriting either device's timeline, active pose, camera, selection or Undo and without duplicate entries

### Requirement: LIB05 — Offline edits and concurrent changes do not silently destroy data
Library syncing SHALL use stable asset IDs, revision-checked writes and idempotent operations, preserving offline queues and returning explicit conflicts instead of last-write-wins.

#### Scenario: Reconnect and conflict safety
- **GIVEN** two linked devices edit the same saved library item offline
- **WHEN** both reconnect and submit their changes
- **THEN** one succeeds, the other sees a recoverable 409 conflict with both alternatives retained; independent new item IDs merge by union, retries do not duplicate, and active projects stay untouched

### Requirement: LIB06 — Private server persistence and scoped credentials
The portal SHALL persist only validated library assets in a private backed-up datastore, require authenticated capability credentials and HTTPS/same-origin validation, cap quota/body sizes and exclude stored secrets, arbitrary scripts, project keys and diagnostics.

#### Scenario: Unauthorized reads or malformed assets are rejected
- **GIVEN** a running localhost test portal with library access controls
- **WHEN** attempting library lookup without a credential, random short guesses, oversized/malformed item uploads, foreign Origin, unsupported rig SHA, script-like labels or token in URL
- **THEN** the server fails closed, does not disclose private libraries or log secrets, does not execute injected content, and previously saved items remain intact

### Requirement: LIB07 — Existing local library links non-destructively
On pairing/recovery, the app SHALL show an explicit merge preview of local versus remote library assets and union by immutable IDs without silently replacing the local library.

#### Scenario: Linking devices with distinct saved poses
- **GIVEN** browser A and B each have distinct local library assets before linking
- **WHEN** B enters A's recovery key and approves combining collections
- **THEN** the result retains both sets in local and server shared library, keeps stable IDs and does not modify the current project or open timeline

### Requirement: LIB08 — Compatibility and deletion remain controlled
The app SHALL reject incompatible library schema/rig mappings without mutating data, preserve 360° placement winding and not purge an asset silently when another device deletes it.

#### Scenario: Version mismatch and tombstone restore
- **GIVEN** a valid library with an item carrying orientation 360° and a prior revision
- **WHEN** a device supplies a wrong rig mapping or a second linked device deletes the item
- **THEN** wrong-rig imports/syncs are rejected without corruption, full-turn orientation persists and deletion is an explicit versioned tombstone with a documented recovery mechanism

### Requirement: LIB09 — DogFood trace and library credential boundaries
No library recovery secret, pairing code, device credential, private library content or complete project payload SHALL be included in opt-in DogFood logs or attached diagnostic sessions.

#### Scenario: Feedback while library sync fails
- **GIVEN** an authenticated library session with diagnostic recording enabled
- **WHEN** a sync operation returns a network/409/quota error and the user submits a DogFood report with opt-in trace
- **THEN** the report may include a safe categorical error, editor revision and event timing but no credentials, library content, credential-bearing request bodies or person/device identifiers
