# Design — bounded qualification, not a new editor

**PROPOSAL ONLY.** Architecture remains self-contained SVG + embedded JavaScript, canonical marked mannequin, authored keys/library distinct from evaluated pose/navigation, frozen saved REF cache vs live ghosts, world floor and portal-only HTTP/private feedback. Git commit/ref is the only cross-repo handshake. No runtime/task/controller infrastructure is introduced.

## Alternatives and rationale

1. **Reuse reviewed slices with surgical transfer** instead of restarting research or merging MiMo's stale whole SVG. C0 owns integrated R1/F8; reviewed R6/R7 app hunks from416853a^..12210d9 and tests throughd41fea2 are transferred and tested together. Conflict near updateMeta requires review, not automatic overwrite.
2. **Sequential product Goals** instead of parallel app writers: R2 target graph→R3 marker bilateral→R4 refs→project durability share central state/event/render seams. Parallel read-only/test-only Sol uses immutable fixtures, separate cwd/port/profile. User's explicit2026-10-11 XHigh planning/test-review authorization narrowly supersedes standing Sol Medium/no-Goal rule14 for this scope, never product/authoritative-spec edits. I1 already requires the reviewed Sol repaired50/new10 runner/test transfer with independent test-tree/runner digests and historical43122→43232 configuration; V7 reuses and verifies it. DeepSeek independent provider reviews each bounded diff/evidence.
3. **Human decisions before ambiguous edits**, not centroid solver/universal refusal or tolerance weakening. Resolved ROTATE/FLIP single-joint dispatch is never re-opened as an either/or choice.
4. **Trusted first-party public SVG** under strict portal allowlist/CSP. Channel keys prevent accidental state overwrite, not malicious same-origin access; a stronger-origin sandbox would be a separate architecture approval.
5. **Existing private feedback JSONL** and finite redacted triage, not a second tracker/poller. Clearly local-only Alpha does not depend on a new accountless library service.

## Commit/state invariants

C0 exact `3708cb56a46a5107521d85167feb137eb8e90e5e`; C1 output of I1; C2 R2; C3 R3; C4a R4; C4 durability; C5a A15b; conditional C5b visual/C5 final human-approved semantics. W is the portal output from base `8a34d151f7ff4d6cef335aeed346ffa5c70eaec1`. C6 is release-evidence pin, product bytes equivalent to tested C5 or fully retested. Future SHAs are unknown: fill full pin **before** each native Goal/worktree starts, never use dynamic HEAD.

Every manifest carries parent/product-changing/evidence HEAD SHAs, fixed path/blob/SHA-256, protected source hashes, test-tree SHA, runner hash/argv, URL/viewport/profile/ports, raw reports/digests, PASS/RED/SKIP/flaky/harness/NOT_RUN counts, reviewer execution limits, human approvals and blockers. Duplicate case-results aren't unique defects. Working-tree files are never publication input. Test-only fixture transfer cannot replace product bytes with the Sol audit worktree's older app.

Frozen canonical SHA-256 `99ccb17102f550192b4e47e9ae3b83f18ccdc3d8ad742a5f77d3d61f38df097e` and v0.5 `93246123d6e307e51562d187ddc0ed33639953f83ac9fee9f297cbed1f07555b` stay unchanged. Original17 path geometry and13 marks checked separately from candidate paint grouping. Embedded legacy7069ad3… source identity is not silently rewritten to canonical99ccb171…; migration/cache/schema needs explicit compatibility approval.

## Gesture and transaction constraints

Pointerdown captures target type/tool/pivot/selected chain ownership. ROTATE selected marker bilateral X/Y/OFF; painted exterior branch unilateral with opposite side world-fixed; no selection actor translation. Graph family priority is topology, never nearest-screen hinge. Single FLIP body either side rotates whole rig on finger arc at fixed pivot/local angles; selected marker translates whole rig. Winding unwrapped. Multi-marker/multi-FLIP remains blocked until recorded decision. Cancel/second-touch restores pregesture authored placement after an actually moving path; one accepted gesture one Undo transaction, no camera/selection history or floor root lift.

REF reconciles exact selected eligible keys, cache and painted guides after every authoring/history selection edge; saved snapshots remain frozen while still selected, ghosts evaluate live at their own time. UI/selection state is not automatically added to authored history. R6 library-save failure rolls back attempted asset/metadata/history effect, but general project-write failure preserves authored memory and discloses non-durability with export/retry per contract. Those policies are not interchangeable.

## Qualification and publication protocol

Stage I1 accepts **scope GREEN plus full residual accounting**, not all60 green; later V7 requires every mandatory approved scenario GREEN and all ambiguous oracles resolved. A11 historical tan observation adjudication cannot be substituted for desired forearm-over-shorts paint proof. Automated emulator doesn't satisfy real Android.

Portal resolves only product `refs/heads/lite-alpha-ready`→immutable commit→regular bounded `app/lite-g1.svg`. Alpha/preview namespace includes channel+slug+full SHA; Beta artifact/cache remains fixed. CAS old O→new N rejects stale expectations; approved absent-ref bootstrap uses explicit absence and separately verified legacy rollback, not fabricated O. Local tests rehearse CAS/inverse and server/config restoration. Only separately authorized A8 may install/promote; actual live bytes/releases/security/privacy/Beta checks and **live restore of both old product and service/config** are mandatory. Re-promotion after successful rollback demonstration repeats smoke. Any changed bytes invalidate affected qualification.

Feedback recorder off, separate attachment off; approved caps/rate/TTL/schema before implementation. Validate origin+source, minimize semantic diagnostics, forbid PII/secrets/raw project/text/localStorage/network bodies in Git/LLM/public, private JSONL outside public/Git0600, no saved IP. Failed feedback must not change editor state. Shared library credentials never enter diagnostics.

## Native lifecycle / recovery

One new bounded Goal/driver/writer lease; stage-specific caps in roadmap. Observe native state/events and judge, not resident labels or task checkboxes. At stop/error/WS1000 checkpoint Git/evidence and actual unmet criteria, **do not resume paused/finished Goals or reset budgets**. One bounded retry on transient provider failure only; new authorized recovery after inspection, no service restart/controller.

Duplicate hourly triggers were observed but cause unproven; disabled automation stays disabled. Upstream proposals distinguish slice closure/criteria acceptance/release, generation-safe callbacks, paused normal-close, duplicate-trigger idempotence, honest substantive activity and untracked-evidence refusal. Existing native APIs/processMetrics suffice. Upstream worktree SHA verified only at separate authorization.

## Open decisions

See roadmap §5 for owner and affected stage. All decisions belong to user: graph terminal/branch preview, multi-FLIP/multi-marker, allowable A11 paint/pelvis grouping, F6, nuanced timeline/F9, visual/feedback calibration, legacy migration, Android and exact live release/bootstrap/rollback. No mockup, benchmark latency threshold, missing feedback cap or semantic oracle is invented here. Scenario catalog below covers settled invariants and **gate behavior**, not unapproved solver/visual outcomes.
