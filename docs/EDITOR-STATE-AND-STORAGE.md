# Authoring state and persistence — planning candidate

> **Delta de comportamiento 2026-10-10 (plan, aún no implantado):** un tap normal en POSE de timeline selecciona, salta a su marca y activa edición; con REF o multiselección NO busca ni activa; desplazar timeline al instante no activa edición por proximidad temporal. STOP retorna a 0 y revela el principio. Estos eventos de navegación siguen fuera de Undo. Ver `openspec/changes/alpha-fluid-gestures-and-timeline/`.


## Four distinct concepts
1. **Playhead**: independent time cursor; time may fall exactly on or between keys.
2. **Selected timeline keys**: zero or many IDs; selection alone never makes a key active for editing.
3. **Active authored key**: exactly one saved key explicitly entered via double tap, or created explicitly via ADD/PASTE at head. All accepted pose manipulations update this key **immediately** (not a temporary draft waiting for Save).
4. **Evaluated state**: read-only interpolated pose when playhead is between keys or during playback. Evaluation is never silently written back to a key.
5. **Library asset**: independent named pose copied explicitly using Save to Library; loading inserts a NEW editable timeline instance at the head. Selecting a library row only selects the asset (no automatic insert).

## Candidate editing rule
At an interpolated playhead with no active authored key, body drags do not change the underlying keys. User chooses ADD POSE (evaluated snapshot) or PASTE POSE (clipboard) to create a key and enter explicit editing at that time. No `AUTO` mode, no accidental draft overwrites. If active authored key is edited, head follows key time and every gesture commits directly to key data.

## Persistence
Project edits and timeline edits automatically persist to same-origin local durable browser storage after every committed transaction (IndexedDB preferred, localStorage fallback if support and quota tests pass); project load on cold reload reproduces current clip **without pressing Save**. Failure/full quota shows explicit warning, retains current in-memory work, makes Export visible. Save (button label **SAVE TO LIBRARY**) creates a named independent library item or explicit **UPDATE LIBRARY** action; it never commits pending timeline work, because timeline work is already committed.

Projects and library assets each have stable IDs and independent scopes. Library updates never rewrite timeline instances; editing an inserted instance never rewrites original asset. Conflict rules: pasting exactly on occupied key time prompts INSERT NEAR (non-colliding epsilon) or REPLACE explicitly; no implicit destructive overwrite. One key per exact authored time in normalized timescale.

Timeline zoom-out is the user's way to lengthen the available time: pinch expands the displayed timespan; if that timespan extends beyond project.duration, project.duration extends accordingly (all existing key timestamps UNCHANGED), displays a duration-extension notice and records ONE undoable authoring transaction at gesture end. Zoom-in NEVER auto-shrinks authored duration. Pan viewStart is clamped to 0 at the left edge.

## History
One whole pointer gesture = one undoable command. Key creation/deletion/copy/paste/retiming, root/joint edits, duration changes, library saves and updates are atomic undo transactions. Undo/Redo restore all authored objects plus IDs; no per-pointermove history spam. Navigation-only pan/zoom/playhead selection is transient and outside Undo history; if user wants selection restored separately later it is a new feature. On gesture cancellation restore pre-gesture state; after commit autosave. Browser reload clears history unless explicitly persisted later, but restores authored project/library data.

## Playback and evaluation
Keyframe interpolation is editorial: for local joint angles use scalar interpolation respecting design ranges, **for root orientation use unwrapped accumulated degrees** (0° → 360° actually turns). Position interpolates x/y in scene units. PLAY from current head; while running button label PAUSE. Pause freezes current time and evaluated pose. Play resumes from frozen head; at end playback pauses at final frame (does not silently reset to t=0). If user tries to author while playing, first pause in place, then require explicit key authoring (no hidden writes).
At times where evaluation violates the floor: playback stops at last safe time, emits blocking warning, does not silently change keys or raise the whole actor. Editor flags the transition invalid until fixed.

## Import and sharing
Versioned JSON only in initial Lite release, no arbitrary user-supplied active SVG/scripts. Validated fields: project/schema version, SVG-source SHA256, rig identity/version, joint IDs, angles degrees and sign convention, placement x/y/unwrapped orientation, times seconds, provenance and data class DESIGN. Reject unsupported version/NaN/invalid coordinates/duplicate IDs/malicious names before mutating any state. Export then import must preserve stable IDs and 360° accumulated turns exactly; no implied compatibility with AcroLab Godot.
