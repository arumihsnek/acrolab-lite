# Test Plan — lite-release-hardening-20261011

Stage: proposal. Generated:2026-10-11. **NOT EXECUTED by this planning mission.**

This catalog specifies settled invariants and observable **gate enforcement** only. Unfilled product decisions are excluded from executable outcome oracles and tracked in roadmap §5/design Open decisions. User explicitly requested a proposal with actual gates, not an interview or guessed semantics: no solver, A11 reference image, feedback cap/TTL, GRID default or timing threshold invented. Approval is required before folding these into code. Human acceptance remains pre-publication here, not deferred post-merge by a generic skill.

Project levels: **U** Node/pure unit (`tests/unit/*.mjs`); **B** product Playwright `tests/*.spec.js` with desktop and emulated-touch projects; **P** portal Node process/API tests; **PB** portal Chromium scripts; **N** upstream native Goal callback/lifecycle tests (separate repo/approval); **—** manual-only. Rendered assertions never replace browser evidence with process smoke. Existing historical runners must be transferred/read/reconfigured surgically; no new harness assumed installed.

## Scenarios

### Edge-case

| id | requirement | technique | level | disposition | input | trigger | expected observable |
| --- | --- | --- | --- | --- | --- | --- | --- |
| E1 | H01 | equivalence/invariant | U | automated | C5 and evidence descendant C6 | compare app Git blobs/SHA-256 and full pins | equality recorded; any byte mismatch blocks inherited qualification |
| E2 | H01 | boundary/invariant | U | automated | two protected assets + recorded SHA-256 | compare frozen bytes in candidate | exact hashes match; mismatch stops acceptance/no ref update |
| E3 | H02 | BVA | B | automated | libraries of8,9,13,14,36 assets; Exercise1,13,30,31,36 members | enumerate every stable row ID through paging/wheel/keyboard/mobile touch | all rows reached without input theft/phantom insert from scrolling; state-load behavior separately characterized for F6 |
| E4 | H03 | decision table | B | automated | actual exterior painted geometry and selected anchors for each of4 chains | safe-arc ROTATE at mapped boundary | moved-side contour nonzero, pivot/opposite/internal invariants and stable selection; generic refusal fails positive cases |
| E5 | H03 | decision table | B | automated | anchors bracket shoulder vs shoulder upper terminal vs arm-only/no cervical | drag arm/internal/head-near geometry | feet→head priority internal refusal; terminal arm eligible not cervical; selected interior stable, no nearest-screen fallback |
| E6 | H03 | decision table | B | automated | shoulder marker, one joint, ROTATE X/Y/OFF; elbow controls | outward/inward + OFF azimuth paths | both sides bilateral at fixed pivot, X-out closes/Y-out opens/OFF-out closes+tracks; no FLIP translation conflation |
| E7 | H03 | decision table | B | automated | one selected shoulder/elbow FLIP, either body side/selected marker, X/Y/OFF | equivalent arc/full turn or marker drag | whole-rig arc fixed pivot/local angles,360° winding; marker whole-rig axis translation only |
| E8 | H05 | invalid partitions | U+B | automated | unsupported schema, duplicate ID, malformed/wrong-rig JSON, script-like label | validate/import in cold browser | rejected before project/library/history mutation; label inert; no executable import/network disclosure |
| E9 | H07 | invalid partitions | P+PB | automated | missing/bad fixed ref, bad slug/traversal/arbitrary revision/private path | resolve/request candidate and releases | fail closed/no arbitrary file; Beta blob/cache unchanged; same-origin trust limitation retained |
| E10 | H08 | state transition | P | automated | old O/new N/third ref X; explicitly approved absence case | CAS O→N, stale O→X, inverse N→O; unapproved bootstrap | expected-ref success only, stale write refused, prior target restored; unapproved absence remains blocked |

### Frontend-quirk

| id | requirement | technique | level | disposition | input | trigger | expected observable (invariant) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F1 | H02 | state transition | B | automated | C1 exported SVG and cold desktop/mobile context | load exported bytes, second edit, Undo |13 initialized handles/layout, valid authoring/history; exact source/output bytes recorded |
| F2 | H02/H03 | state transition | B | automated | safe endpoints/unsafe interpolation interior; delayedRAF, repeatPLAY; moving ROTATE/FLIP | play across invalid interior; separately cancel/second-touch after nonzero edit | last-safe stop/warning no root lift/key mutation; cancelled edit returns pregesture authored pose/camera/selection/history |
| F3 | H04 | state transition | B | automated | REF ON with2 selected saved poses+ghost | create/copy/paste/delete/Undo/Redo/seek/edit/deselect/reselect | eligible selected IDs equal cache AND painted guide IDs; frozen survivor unchanged, deselect removes immediately, ghost live at own time, near>far opacity, navigation no authored history |
| F4 | H04 | state transition | B | automated | visible references and durable authored project | REF OFF/ON then cold reload | OFF no guides/cache; ON recaptures eligible selection; reload REF OFF, authored state restored |
| F5 | H06 | layout decision table | B | automated |360×800,390×844,800×600,1280×720,1920×1080 | resize/orientation, axis/REF/floor controls, drawer safe chrome vs stage/timeline swipe | actual properties rect/gutter absent, freed stage/timeline functional; drawer no permanent strip/editor-input theft |
| F6 | H06 | visual adjudication | — | manual-only | actual canonical crossing samples + old tan observation evidence | user inspects forearm/shorts/pelvis grouping proposal and oracle attribution | user records allowable candidate paint decision; historical observation not misreported as desired layering regression; no implementation before approval |
| F7 | H06 | decision gate | — | manual-only | proposed13-node graph/multi-FLIP/F6/F9/time/GRID/SHADOW/library preview | user reviews each affected policy | explicit decision per item or affected stage blocked; resolved marker-vs-part distinction not reasked |
| F8 | H06 | hardware workflow | — | manual-only | exact C5/W URL/SHA, real Android device/browser |3-pose edit/ROTATE/FLIP/REF/history/play/save/reload/export/PWA/Back-edge portrait+landscape | recorded actions/device/verdict and negative observations; emulation not substituted; failure blocks public stage |
| F9 | H07 | convergence/isolation | PB | automated | Beta and2 revision contexts with stable namespaced project data | edit/save/reload/switch/import intentional export | channel+slug+full-SHA isolation, no implicit data migration, Beta hash/cache fixed |
| F10 | H03 | boundary/geometry invariant | B | automated | reviewed floor-safe witnesses with whole-rig orientation0°,90°,180°,270°,360° and independent transformed contour+visible-stroke oracle | ROTATE/FLIP/translation and interpolated interior playback approach floor | accepted/evaluated silhouette+stroke stays at/above fixed world floor under existing frozen reviewed tolerance; unsafe continuation last-safe stops with no hidden root lift. No new body self-collision/physics semantics |
| F11 | H03 | event-order/state transition | B | automated | selected joint + active authored pose, emulated pointer/touch; explicit down/move/up sequences | long press then swipe across other markers, captured drag crossing stage edge, second-touch pinch or pointercancel after nonzero edit | hold consumes selection gesture; swipe never acquires another joint; owner/pivot stable; accepted edit one Undo; pinch/cancel rolls back uncommitted edit and only camera navigation proceeds |

### Error-handling

| id | requirement | technique | level | disposition | input/fault | trigger | expected observable |
| --- | --- | --- | --- | --- | --- | --- | --- |
| X1 | H02 | fault injection | U+B | automated | prior stored data + existing Redo; quota throws for BodyPose/Exercise | SAVE rejected then successful retry/cold reload | no phantom asset/false saved banner; prior Redo/history/library/storage preserved; metadata agrees; retry durable separately |
| X2 | H05 | fault injection | B | automated | active project with preceding history; setItem failure | edit/add/paste/delete/retime/import then export/retry/reload | memory edits kept, metadata agrees, visible non-durability/no false autosave; old durable bytes intact, export current edits; retry proven |
| X3 | H07 | fault injection/consent table | P+PB | automated | recordingOFF/ON, attachmentOFF/ON, sensitive/oversized/foreign-origin payload, post fails; approved caps supplied before implementation | form submit/message/receipt/private storage | consent/schema/origin+source enforced; no unauthorized data/PII/secrets/raw project uploaded or public inbox; failed post doesn't disrupt editor |
| X4 | H08 | live rollback | — | manual-only | exact approved N/W, prior ref or approved legacy bootstrap backup/service/config, live Beta baseline | authorized live install/CAS→smoke→restore→verify→repromote | exact live releases/HTTP digest/health; old Alpha/service/config verified on restore, Beta/cache unchanged; failure restores prior and stops |
| X5 | H09 | lifecycle transition | N | automated | deferred native judge + close1000/EOF, duplicate top-level trigger/generation | callbacks terminate/replay under separate upstream authorization | honest paused/no fabricated verdict, budgets/counts preserved, one eligible driver/writer, no paused Goal resume |
| X6 | H09 | handoff failure | N | automated | achieved0/8, stale active label, intended untracked evidence | successor bootstrap/refusal/authorized immutable handoff | unmet texts/native verdict/substantive timestamp visible; unsafe transfer refused without delete/stash/force-add; new authorized clean handoff distinct |
| X7 | H09 | bounded batch | — | manual-only | at most10 redacted private reports,60-minute ceiling, exact Alpha SHA | authorized human/Pi triage and reproduction | redacted P0/P1/P2/human/duplicate/NOT_REPRODUCED classification; no raw PII in Git/LLM, no auto fix Goal/controller; batch stops at ceiling |

### Performance

No new latency/p95 budget specified by user/contract; **no fabricated performance acceptance**. Existing data capacities and2/10/40 key visibility/hitability belong to approved A10 coverage in V7; visual priority/calibration and new latency thresholds require human decision. Do not make elapsed test time a product acceptance metric.

## Coverage summary

9 qualification requirements covered;28 scenario IDs: edge10, frontend11, error7, performance0. Automated23, manual-only5. Levels overlap; E8 combines pure validation/browser atomicity, X1 unit/browser/history, X3 API/browser consent. H06's gate scenarios verify missing-decision handling, not unapproved semantics. I1 only closes R1/F8/R6/R7 slice; V7 reruns main+full50+10 and approved A01–A15/T01–T28 scope, source/test digests and actual Android. Every residual RED/SKIP/harness/NOT_RUN survives manifest; no test weakening.

## New infra needed

No runtime/new controller. I1's prerequisite test-only work transfers reviewed rel5 runner/tests from Sol e12b103 (not postponed to V7), configures unique43232 rather than historical hardcoded43122, and verifies real fixture provenance/project configs. New R2/R3/R4/durability witnesses and portal rollback/feedback scenarios are authorized implementation/test tasks **after** planning gate, not tests claimed present now. Upstream N rows require separately authorized dashboard worktree/full verified base. All numeric consent limits and unapproved visual/semantic oracles stay decision-blocked.
