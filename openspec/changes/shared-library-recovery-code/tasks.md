# Shared library (planned, no implementation yet)

## Planning and security gates

- [ ] Approve long permanent recovery key + separate temporary pairing code and failure/revocation model; no weak permanent short PIN.
- [ ] Review threat model, datastore ownership/backups/quotas and cross-origin/Alpha-Beta compatibility before public data collection.
- [ ] Approve isolated implementation plan with distinct product and portal worktrees and one writer per target.

## Scenario-linked tests and implementation

- [ ] **LIB01** [Chromium/offline]: local-only library export/import without project/session state.
- [ ] **LIB02** [Chromium/Node]: secure recovery key, recover on second browser, no local-project migration.
- [ ] **LIB03** [Node/browser]: ephemeral pairing code one-use TTL, failed/expired/guessed-code throttling.
- [ ] **LIB04** [Chromium/API]: SAVE and UPDATE sync library only, safe two-browser merge.
- [ ] **LIB05** [Node/Chromium]: conflict 409, idempotent queued operations, offline reconnect with no data loss.
- [ ] **LIB06** [Node/security]: private store, backup/restore, scopes, invalid credential/Origin/JSON/rig/size/script tests.
- [ ] **LIB07** [Chromium]: linking prepopulated local libraries with an explicit non-destructive merge preview.
- [ ] **LIB08** [Node/Chromium]: 360° orientation and data schema compatibility, reversible tombstones.
- [ ] **LIB09** [Chromium/privacy]: no sharing of recovery secrets or library contents with DogFood trace.

## Deployment gates

- [ ] Fresh-model independent review of client credential risks and private persistent store.
- [ ] Full existing editor+portal regression, user demonstration with two real browsers, no Beta/PWA regression.
- [ ] Backup/rollback rehearsal on localhost; later **explicit approval** before public API/storage rollout, then verify live health and recovery without secrets in logs.
