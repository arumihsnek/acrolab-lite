# Relationship to AcroLab — deliberate non-coupling

Lite and AcroLab are complementary independent Git repositories and PiBoard projects.

**Lite owns:** expressive authoring, interaction semantics, visual motion proposals, pose library, timeline, audience participation and creative workflows.

**AcroLab owns:** research questions, scientific evidence, biomechanics modeling, validity, simulation analysis, pilot measurements and any classification of actual physical feasibility.

**Bridge later:** export typed pose sequences + stable rig/build version/hash + source SVG provenance + temporal units; import to AcroLab only via explicit reviewed mapping. No shared runtime dependency, hidden reverse import, implicit validation, or cross-repo mutation.

Permanently keep experimental/design assertions distinct from scientific evidence. Negative/failed proposals are preserved as creative history, not quietly dropped.
