# AcroLab Lite — contract for Pi and contributors

1. Authority: explicit user decisions > live PiBoard/Pi/Git evidence > this repo OpenSpec > upstream BlackBelt guidance > conversation history. Read README and docs/PRODUCT-CONTRACT.md on every new mission.
2. This is an INDEPENDENT product and Git repository; do not edit, graft, import or mutate /home/ubuntu/code/acrolab or its OpenSpec. Do not start or resume its paused Goals.
3. One driver per native Goal; attach session, verify /goal actually running, last activity and verdict. A configured Goal or idle session is NOT proof of progress. Use native pi-goal-hermes, Flows/subagents/worktrees where beneficial; no custom orchestration.
4. SPEC FIRST: explore -> plan (OpenSpec proposal/specs/design/scenario test-plan/tasks) -> independent review -> human UI/architecture gate when needed -> isolated implementation worktree -> tests & real touch/browser -> acceptance -> commit/merge/deploy after authorization. Do not blur draft specs and implemented behavior.
5. Work on develop for planning; no production feature implementation before the planning gate. Respect actual installed tool/skill versions; do not assume a Dashboard upstream feature is installed. **2026-10-10 LIMITED OVERRIDE:** the user explicitly authorized an isolated worktree derived from actual v0.5 for harness-first regression testing and surgical bugfixes overnight; consult docs/NIGHT-MISSION-2026-10-10.md. The final UX/G1/G2, physical Android and public release gates are NOT waived.
6. Keep interactions simple: exactly SELECT gesture (always available) + ROTATE and FLIP operations, root drag if no joint selected; zoom/pan navigation. **Latest 2026-10-10 CORRECTION:** ROTATE on a selected joint MARKER folds both sides by bisector; ROTATE on connected FREE PART GEOMETRY rotates ONLY touched branch about selected pivot, opposite side fixed; with no selection actor drag translates whole actor. Multiselection branches use the four user-specified chain paths with feet→head priority at shoulder. See `docs/JOINT-CHAIN-DISPATCH-2026-10-10.md`. **FLIP clarified 2026-10-10:** drag on either body side rotates the ENTIRE rig about the selected joint (finger arc, local angles fixed); drag on selected marker TRANSLATES the entire rig under X/Y/OFF. Do not confuse with ROTATE marker bisector/part unilateral behavior. Multi-selected FLIP pivot not yet specified. No MOVE tool or old Godot constraint vocabulary.
7. All pose edits directly update the authored active pose with Undo/Redo. Save is only for library asset; editing and library saving are different scopes. **Latest 2026-10-10 user update:** direct single POSE selection normally seeks and activates edit, except multi-select or REF; ruler/head seek alone never activates editing. See OpenSpec `alpha-fluid-gestures-and-timeline` and its open G1 start-target design gate.
8. Lite UI does NOT have an Inspector/properties/solver sidebar even though the frozen v0.5 SVG contains a legacy `INSPECTOR` block. User explicitly rejects it; omit only in new candidate, preserve frozen source. Do not import or borrow AcroLab/Godot UI/specs. See OpenSpec A15.
9. Mobile library UX (2026-10-10): hidden-by-default right drawer, compact button or safe swipe from rightmost quarter of app chrome outside stage/timeline, never physical Android Back edge, never a permanent vertical strip. See OpenSpec A14.
10. Source SVG `assets/source/manekin2D-vertical2.svg` belongs to user. Preserve vector geometry, visual layering (shorts behind forearm), pivot marks exactly; document any reinterpretation separately.
11. Mechanically informed DESIGN is not PHYSICS, SIMULATED, MEASURED, clinical safety, or human validation. Preserve evidence class, provenance, negative results and uncertainty.
12. Test interactions via real pointer/touch event emulation plus real Android human check as a separate manual-only acceptance gate. Browser tests must exercise event order, long press, swipe, capture, pinch, cancellation and nonpenetration across rotated frames. Don't weaken tests.
13. OpenSpec is the durable specification. Tasks.md is never an executor. Revisioned exported assets with stable IDs and rig mapping only; Godot import is a future explicit bridge, not a promise.
14. Model authority: follow `docs/PI-MODEL-ROUTING-2026-10-10.md` (latest user decision). Prefer available genuinely free LongCat 2.5 (opencode-go), Ling 3.1 and Glyph Cluster (commandcode) for bounded tests/review; use MiMo 2.6 Flash and Muse Contributor (opencode-go) for sustained engineering, DeepSeek v4.1 Flash (commandcode) sparingly as judge/fallback. Step 5 listed only via commandcode and free entitlement unverified. Verify actual availability, quota, model, and native Goal/Hermes liveness before assigning; diversify independent providers with one writer per target. **GPT-6.1 Sol Medium may review/plan ONLY inside native Pi and must not implement, drive Goals or modify specs.** No Codex CLI.
15. **LATEST 2026-10-10 AUTHORITY:** user APPROVES verified, reversible, small PUBLIC ALPHA releases and private opt-in DogFood UX, not Beta; see `docs/ALPHA-MICRORELEASE-DOGFOOD-MISSION-2026-10-10.md`. Release must use committed SHA/ref, real tests and live rollback verification. Never treat Goal `achieved` as acceptance. Former blanket Alpha prohibition is superseded narrowly by this approval.
16. Lite→portal publication: read `docs/PUBLIC-ARTIFACT-CONTRACT.md`; only an approved SVG blob plus vetted release refs may cross into Beta Web; Alpha promotion needs verified tests and explicit bounded authority, Beta publication remains a human gate. Never publish source/private AcroLab or make `achieved` imply release.
17. Report cwd, native Goal ID/status/criteria, Pi driver/session/model/effort, last activity, actual tests/SHAs/blockers and next step. Stop and ask at Human Gates.

18. Future-idea quarantine: `ideas/` is a non-authoritative incubator excluded from KB indexing. DO NOT read, retrieve, cite, execute or let it alter active Goals/OpenSpec/acceptance during ordinary development. Only explicit user-authorized idea capture or retrospective/promotion may access it; see `ideas/README.md`. KB exclusion is not filesystem permission isolation.

19. Native continuity + PiBoard dogfood (2026-10-12, docs-only mission). Canonical ONLY: `docs/operations/NATIVE-GOAL-CONTINUITY-RUNBOOK.md`, `docs/operations/NATIVE-GOAL-WAKE-PROMPT-TEMPLATE.md`, `docs/dogfood/PIBOARD-AUTOMATION-DUPLICATE-ROOTS-2026-10-12.md` (absorb all prior harvest evidence; dated snapshots inside are HISTORICAL/UNKNOWN if later product Goals updated them). Never assume chronological fixed stages; P3 dirty-tree recovery outranks new stages.

## Coding discipline (BlackBelt coding baseline)
- Before coding, read the relevant files and record assumptions and simpler alternatives.
- Keep the implementation surgical: change only what the approved OpenSpec task requires.
- Define tests first, confirm the regression/failing test, implement minimally, rerun, and record evidence.
- Match the official coding profile discipline checkpoints whenever their task signals apply; independent review does not replace tests.
- Reuse the verified user-approved UI ideas from SVG Motion Lab v0.5 as a design baseline once the exact source is located; never assume its mechanics or regressions are correct.
- The first usable Lite editor remains blocked at the Human Gate until the user approves it.

<!-- dox-doctrine -->

## DOX doctrine

Per-turn DOX doctrine — the kb-first READ discipline and the directory `AGENTS.md`
WRITE discipline — is injected by the `pi-dashboard-kb-extension`. Tune it in
`.pi/dashboard/knowledge_base.json` under the `doctrine` key (`inject`, `write`).
