# UX baseline: SVG Motion Lab v0.5 (design evidence, not acceptance)

## Canonical evidence

- Frozen, exact byte copy: `assets/reference/svg-motion-lab-v0.5.svg`.
- OCI staging source (external to Lite): `/home/ubuntu/acrolab-motion-lab-v0.5-deploy.svg.txt`.
- Copy SHA-256: `93246123d6e307e51562d187ddc0ed33639953f83ac9fee9f297cbed1f07555b` (matches staging source).
- Self-contained user experiment, SVG `viewBox="0 0 1260 790"`, root `aria-label="AcroLab SVG Motion Lab v0.5"`, with interactive JavaScript.
- Earlier landing-page staging file `/home/ubuntu/acrolab-lab-index-v0.5.html` links to `/versions/v0.5/index.svg`, but the examined local published versions directory **does not contain** v0.5. Do not claim it is live/public.
- Authoritative Lite mannequin remains `assets/source/manekin2D-vertical2.svg` SHA-256 `99ccb17102f550192b4e47e9ae3b83f18ccdc3d8ad742a5f77d3d61f38df097e`; never replace it with geometry embedded in the older experiment.
- The embedded v0.5 metadata records sourceSvg name `manekin2D-vertical2.svg` with a **different** SVG SHA. This is an unresolved source-provenance mismatch; do not treat it as the current canonical rig geometry.

## User's design decision

**Reuse v0.5 as the primary UX and interaction implementation candidate for Lite**, not merely as inspiration. Preserve the SVG-authored panels/timeline/control layouts and the lightweight self-contained architecture wherever they pass the Lite product contract and regression tests. The later HTML mockup under OpenSpec is a temporary parallel planning sketch; it must not silently supplant v0.5.

Specific refinements approved in the current conversation: one cyclic `OFF → X → Y → OFF` movement-axis button; one compact action row `Play/Pause · Add · Copy · Paste · Delete`. The user likes the density and simplicity of v0.5.

## Explicit Inspector exclusion from reuse (2026-10-10)

The externally staged 86,088-byte v0.5 reference **already** had an `INSPECTOR` header at SVG line 173. Its archived staging source `/home/ubuntu/acrolab-motion-lab-v0.5-deploy.svg.txt` and Lite's frozen reference share SHA-256 `93246123d6e307e51562d187ddc0ed33639953f83ac9fee9f297cbed1f07555b`. The user explicitly rejects retaining this panel. **Freeze original SVG untouched, but do not reuse the Inspector in new Lite candidate UI.** Retain the compact cyclic axis button and unobtrusive contextual status instead. This does NOT establish that the inspector came from the other scientific AcroLab/Godot project; no such origin is evidenced. See OpenSpec A15.

## Reuse and exclusions

- Inspect and test actual v0.5 stage/timeline/touch/library UI before redesign. Record behavior deltas and reuse working code/visual patterns rather than reimplementing from scratch.
- Correct v0.5 bugs from negative evidence: ROTATE/FLIP malfunction, references lingering after key deselection, joint selection changes on swipe, ground penetration, provenance/canonical source mismatch. Run targeted red→green regressions.
- Obey `docs/PRODUCT-CONTRACT.md`, `docs/GESTURE-CONTRACT.md`, `docs/EDITOR-STATE-AND-STORAGE.md` and `docs/GROUND-AND-REFERENCES.md`: only ROTATE/FLIP tools, movement implicit, no AUTO or Godot Studio extra controls.
- Keep the versioned source immutable; perform candidate adaptations only later in an authorized Pi implementation worktree after the planning Human Gate.
- Treat SVG source paths, layers, source joint centers, source SHA and DESIGN/PHYSICS provenance independently of the UI code. The Lite canonical original controls geometry authority.
- This file and reference asset are **planning evidence**, not implementation, acceptance, passed tests or publication.
