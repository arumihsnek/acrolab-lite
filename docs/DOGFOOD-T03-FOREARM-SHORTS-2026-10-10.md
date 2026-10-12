# DogFood — T03 forearm / shorts occlusion report (2026-10-10)

State: OPEN / user visually reports **shorts drawn above forearm** on published AcroLab Lite alpha. Browser pixels not yet reproduced in a pinned frame by this investigation. Do not call the reporter wrong because the automated test is green.

Published alpha: `https://lite.acrolab.duckdns.org/alpha/`, public `/api/releases` revision `0970c60893ee`; `/alpha/lite.svg` editor JavaScript same as candidate `app/lite-g1.svg` except localStorage key name. Candidate Git HEAD at inspection `0970c60`. Refer to `openspec/changes/alpha-fluid-gestures-and-timeline/specs/alpha-editor/spec.md` A11.

Observed test gap: existing `tests/T02-T03-rig-mapping.spec.js` checks only `Node.DOCUMENT_POSITION_FOLLOWING` and `getComputedStyle(...).display`, then takes an unspecified pose screenshot; this **cannot prove** visible pixels at a forearm-short overlap. Element `path10-1` is shorts inside `part-thigh`, whereas `part-forearm` is nested under `part-upper_arm` / `part-thorax` / `part-lumbar` / `part-pelvis`; group nesting, transforms and overlap geometry must be checked. Do not alter original user SVG paths to fake a passing pixel test.

Next proof: use browser UI to position forearm across shorts; capture state + screenshot; measure actual overlapping painted pixels, visual occlusion and correct foreground. Compare fixed source/candidate/public sample on desktop and touch emulation. If reproducible, preserve RED baseline and fix only candidate stacking. If not, request exact pose JSON/screenshot and keep OPEN. No physical or deployment claim.
