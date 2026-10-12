# Prototype evidence at project creation

Status: earlier sandbox experiments provide UX feedback, NOT verified Lite implementation. Preserve independent originals externally.

Known user-observed bugs in latest experiment: ROTATE inoperative, FLIP inoperative, transparent refs remain when pose/key deselected, other touch failures. Full user video `video_2026-10-10_01-43-13.mp4` attached to conversation; should be inspected for test cases before feature implementation. Earlier `video_2026-10-10_00-41-22.mp4` shows stage/timeline issues. Do not mark regressions resolved without reproducing then testing.

User's canonical revised mannequin: `assets/source/manekin2D-vertical2.svg`, source hash to be verified on copied raw file. Pivot centers must be derived from authored SVG joint marks with transforms, including head/neck paths; don't invent a pivot shift. Preserve layer order: shorts should appear below forearm.

Existing public playground: https://lab.hermesinthenight.duckdns.org/versions/ . Publishing a new Lite build is a distinct acceptance/deployment step; do not overwrite old historical versions.
