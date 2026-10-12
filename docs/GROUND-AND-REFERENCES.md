# Ground, camera and references — planning candidate

## Ground (DESIGN, not biomechanics)
The floor is a fixed world-space y coordinate and is solid in editor and playback. Compute contact using exact transformed source visible path shapes plus stroke extents (or provably conservative proxy verified against actual renderer), NOT original untransformed AABB and NOT joint centers only.

**No hidden kinematic compensation.**
- Whole-actor drag downward (and OFF/Y axis allowed): clamp requested root Y to first exact nonpenetrating candidate; never alter joint angles or pivot-relative geometry. X-only lock prohibits implicit Y lift; if an X move would intersect floor due to transform, reject.
- ROTATE/FLIP: preserve selected pivot (or selected centroid) in world space and angle constraints; if request penetrates floor, clamp the angular progression to last valid candidate or reject when no safe partial rotation. Never auto-raise root behind user’s back.
- Keyframe sequence: interpolated frames with nonpenetration required; if a continuous transition would penetrate, mark sequence invalid and stop at first invalid playback/scrub time. Do not quietly transform evaluated keyframes into new poses. Constraint is editorial, not force/contact solved.
- When transforming too fast, validate swept arc or conservatively subdivide increments; do not allow endpoint-valid but path-penetrating gestures to tunnel through floor.
- Camera framing: initial viewport world projection defines maximum screen margin below floor. Zoom/pan/resize clamp so never expose MORE area below floor than that initial projection, independently of actor pose. Camera changes never change world floor level.

G2 Human Gate: accept/revise rejection-vs-angle-clamp style and feedback before implementation. User already decided ‘no penetration’; G2 only concerns UX presentation.

## Reference guides lifecycle
REF OFF → zero visible references; all cached snapshots may be discarded. REF ON captures snapshot of **currently selected keys**. A key tapped selected while REF ON creates a guide. A key removed from selection deletes its guide immediately regardless of previous frozen cache. Re-selecting captures fresh snapshot. Deleting a key removes its guide. Undo restoring a deleted key restores the authored key and selection, but any guide is recaptured on explicit re-selection (not mysteriously restored from stale source).

Saved pose reference: snapshot at time of selection and remains immutable until deselect/reselect, even if the key is actively authored, playhead moved or clip edited. Double tap same already-selected key does NOT refresh guide. Ghost reference: key with ID/time but no authored pose; its guide evaluates `time=ghost.t` against nearest authored keyframes and updates live during editing of neighboring keys. Ghost can retime/delete, has no Save-to-Library action; converting ghost to authored key is an explicit ADD/CONVERT operation which creates an authored snapshot (one Undo command).

Opacity: deterministic monotonic function of distance |guide.t - head.t| with nearest darker, farther lighter; different snapshots can overlap and guides render BELOW live actor and never capture pointer. On REF OFF→ON, recapture selected saved pose snapshots at that moment, not stale hidden caches.

For v1, UI selection/reference caches are session-only, not science/provenance. A cold reload restores authored clip and library but REF starts OFF with empty selection; user can reselect references. No old reference is implicitly kept or injected.
