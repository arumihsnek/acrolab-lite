# Test plan — v0.60 (PLAN, not executed; historical 60-file suite stays for L3/nightly)

## Grouping table (journeys J1–J12; trace IDs → `specs/lite-v060/spec.md`)

| Group | Equivalence classes | Representative fixtures | Count | Key assertions | Tier / run | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| J1 select | tap/hold/swipe/blank, single+multi | elbow+shoulder, blank stage | 1 file, ~4 steps | V60.01: selection stable, Undo purity | L2 milestone | writer |
| J2 rotate | marker vs painted vs none × hinge/branch/leaf | shoulder, elbow, mtp; X/Y/OFF sample | 2 files, ~8 steps | V60.02: unilateral vs bilateral, pivot stable | L2; L1 impacted P2-21/~70s | writer |
| J3 rotate-invalid | axial brackets (upper/lower_trunk × neck_base), both sides | part-upper_arm touch, X/Y/OFF | 1 file, ~3 steps | V60.02: visible refusal, no `pageerror`, no state write, Undo clean, follow-up edit works | L1 R1 ~9s + L2 | writer |
| J4 flip | either-side arc vs marker translate, OFF/X/Y | hip, shoulder, 90°+360° | 1 file, ~5 steps | V60.03: angles fixed, winding kept, cancel restores | L2 | writer |
| J5 gesture-abuse | pinch/swipe/pointercancel/longpress/second-touch post-motion, mouse + 1 touch sample | active edit + camera | 1 file, ~5 steps | V60.01/V60.04: no selection theft, cancel rolls back, camera-only | L2 | writer |
| J6 camera | pan/pinch/resize, history depth N | authored pose + ruler | 1 file, ~3 steps | V60.04: bytes/selection/history identical | L2 | writer |
| J7 floor | 0°/90°/180°/270°/360° + unsafe interior + delayedRAF/repeatPLAY | contour+stroke oracle, frozen tolerance | 1 file, ~5 steps | V60.05: last-safe stop, no root lift | L2 | writer |
| J8 timeline | add/copy/paste/delete/retime/seek/tap/REF-multi exceptions | 3 keys + ghost | 2 files, ~8 steps | V60.06: identities kept, seek writes 0, paste writes 1 | L2 | writer |
| J9 ref | select/deselect/edit/seek/OFF/reload, frozen-vs-live | 2 saved + ghost | 1 file, ~6 steps | V60.07: painted == eligible, frozen byte-equal, OFF empty | L2 (P4 rebase gate G1) | writer |
| J10 persist | quota BodyPose+Exercise, export/retry/reload, corrupt import | filled store + malformed JSON | 1 file, ~5 steps | V60.08: visible failure, memory kept, no phantom, reload durable | L0 unit + L2 | writer |
| J11 layout | 360×800/390×844/800×600/1280×720/1920×1080 + drawer open/close | button + safe-chrome swipe | 1 file, ~5 steps | V60.09: no gutter rect, no input theft | L2 | writer |
| J12 cold round-trip | export → cold open (desktop+mobile) → 2nd edit → Undo; asset hashes | exported bytes | 1 file, ~4 steps | V60.08/V60.10: 13 handles, hashes `99ccb171…`/`93246123…` | L2 (M1) + L3-once (M2) | QA |

Rules: fresh page/state per journey, reset between scenarios; `pageerror` asserted every
journey; attachments on failure only; dangerous edges (J3/J7-unsafe/J10-loss) never merged
into happy-path files; asserts never weakened. Unit matrix (L0, seconds): all-13 adjacency,
4 chain paths, reducer/Undo/floor/localStorage — data-driven, no browser.

## Tiers & triggers — M1 delivers BEFORE L4, M2 waits for everything

M1 provisional entry (`preview privada provisional para jugar`, never qualified, never
public): exact SHA + zero catastrophic P0 (data loss / script exception blocks even M1) +
L0 + L1 GREEN + dangerous-core J3/J7/J10 GREEN (rest of J1–J12 or representative subset) +
no unexplained regression in touched behaviors + locally openable private + clear known-RED
ledger. Non-catastrophic A11/A15b/X4 RED allowed visibly labeled in M1; no unapproved
visual redesign. User play/Android feedback follows delivery — L4 verdict is NOT M1 entry.

M2 public Alpha additionally: L3 comprehensive once + DeepSeek review + L4 + A15b/A11/D4 +
X4 root-cause (classified test or fix, never waived) + G5 + L5.

L0 per commit · L1 per diff (~1 min; R1 ~9s, P2-21 ~70s baselines from QA evidence) ·
L2 M1-entry (few min, measure later) · L3 FULL desktop+mobile+repaired50/new10 ONCE on
immutable M2 SHA (desktop ~7–10 min today, never M1 entry) · L4 manual exact-SHA user
Android/desktop AFTER M1 delivery (gates M2, never M1 entry) ·
L5 portal CAS/security/rollback pre-public. Early-L3 triggers: data loss, JS exception, floor,
gesture drift, history corruption, auth/privacy, bridge, responsive break.

## Reviews

Independent different-provider reviewer (DeepSeek) on immutable milestone SHA (product diff +
test digests + raw counts); states Chromium-run scope or blocks browser rows. Separate portal
security review for L5; user UX acceptance for L4. Residual A11×2/A15b×1/X4×1 carried openly.
