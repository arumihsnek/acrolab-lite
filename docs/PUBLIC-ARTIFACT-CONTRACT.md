# AcroLab Lite → Beta Web: minimal Git release interface (v1)

Status: **architecture approved for isolated implementation and local verification, NOT a public release authorization**. Date: 2026-10-10. AcroLab scientific `/home/ubuntu/code/acrolab` is private and OUT OF SCOPE.

## Responsibility and source

- **Product repo** `/home/ubuntu/code/acrolab-lite`: owns editor SVG, Playwright, OpenSpec, accessibility, UX and exported pose/project data. The source remains immutable for the frozen v0.5 and canonical mannequin. A candidate is only a Git commit, not a release.
- **Portal repo** `/home/ubuntu/code/acrolab-lite-beta-web`: owns web shell, same-origin feedback intake, static allowlist, content security, Alpha/Beta/preview display, local PWA cache and public HTTP paths. Never reads uncommitted worktree files and never serves an arbitrary repository file or directory.
- **BlackBelt/PiBoard** coordinates bounded native Goals, sessions, tests, review and worktrees. Git is the **only cross-repo release handshake**. No persistent Jefa/Nudger, task DB, bespoke daemon, scheduler, watcher or new Git hooks.
- **Canonical export (initial v1)**: product commit contains `app/lite-g1.svg` as a regular Git blob of bounded size. The public artifact is **only this one reviewed SVG**, not the repository or its directory. Later filenames/schema require a versioned contract change, not a permissive arbitrary-file API.

## Channel references (planned; must NOT change current live server until separately approved)

- **Alpha**: `refs/heads/lite-alpha-ready` in the product Git repo, an explicit **movable publication pointer**, never `HEAD` of a developer worktree. It moves by atomic compare-and-swap `git update-ref ... <new> <old>` only after release gate. Pi performs that authorized finite action at the end of a native Goal; **no background service**. Public Alpha reload resolves only this named ref to a commit, then the fixed SVG path. If missing/bad, server fails closed while Beta remains available.
- **Preview A/B/C**: user-visible stable slugs point to immutable **annotated or lightweight Git tags** under `refs/tags/lite-experiment/<slug>`, never query-controlled Git revisions. Slugs are constrained `[a-z0-9][a-z0-9-]{0,31}`, server caps listed variants, and each is a fixed commit eligible for comparison. A new revision creates a new slug/tag or explicit reviewed new target; no silent retagging.
- **Beta**: unchanged manually approved artifact `public/app/lite.svg` plus recorded SHA-256, revision, PWA cache version; promotion is an explicit Human Gate with full HTTPS/E2E review. **Never auto-promote Beta** or change the existing deployment/proxy in this initial task.

## Publication gate (not simply GoalRecord achieved)

1. Pin candidate commit and verify `app/lite-g1.svg` exists as a regular complete XML/SVG blob; source mannequin/frozen v0.5 hashes unchanged; no symlink, external imports/assets, private repo paths, secrets, disallowed API/network calls or unapproved origin storage keys. At most the approved single file is public.
2. Run product's deterministic browser suite against **that same committed SHA**, including desktop/touch/mobile, Undo/persistence, stable export and negative/fuzz regressions; record command, counts, failures and evidence. The staged/new UX A01–A15 may be unfinished: explicitly record coverage and only expose approved experiment scope, never label all specs passed.
3. Run portal's local release-contract tests on the same candidate/ref (JSON releases, public whitelist, CSP, slug traversal, cache, isolated storage, unchanged Beta hash), plus independent review on changes with public/security implications.
4. Record verdict evidence in durable Git/OpenSpec note; if red, blocked or user approval needed, **do not update release ref**. Ref mutation is a narrow explicit Pi step after all gates, bounded/rollbackable with old SHA recorded. Never use `status: achieved` or `done` as proof: PiBoard DogFood documents accepted Goals with 0 criteria checked.

## Saved-state safety and limitations

- Alpha and each preview isolate accidental overwrites with stable per-**channel + slug + full commit SHA** storage namespaces, distinct from Beta. New revision does NOT silently migrate or replace existing poses. Provide export/import for intentional migration; test reload and switching branches/variants.
- A shared HTTPS **origin** still allows same-origin script access across localStorage keys. Namespacing alone is NOT a strong malicious-code boundary. Until a separate origin or secure sandbox migration is approved, only first-party reviewed, trusted SVG with strict CSP may be exposed, and no private AcroLab code may enter those Git commits. Do not claim security against malicious first-party scripts.
- CSP/PWA isolation remains unchanged pending a separate explicitly approved live migration. Compare candidates on a local preview URL before activating public `/try/<slug>/`.

## Feedback classification

- Feedback remains a private append-only JSONL inbox owned by Beta Web, with user contact and diagnostic fields kept out of Git; optionally record validated `channel`, `revision`, `variantSlug` supplied by the portal, not trusted blindly.
- Incoming type `bug/idea/acro/other` is a **user report**, not a proven defect. Triaged, redacted report -> Lite issue/OpenSpec scenario; reproduce with exact SHA, state and steps; only then record confirmed DogFood. Portal transport/storage defects remain in Beta Web, not Lite. Avoid feedback pollers or independent task stores. Humans/Pi Goals triage finite batches when authorized.

## Acceptance and permissions

Initial isolated implementation may add repo-specific docs, test fixtures and server/preview code in the **portal worktree only** and test with `SITE_HOST=127.0.0.1`, unique port. No mutation of public `/app/`, live `/alpha/`, HTTPS proxy, certificates, service processes or private research exposure. A separate explicit approval is needed before installing and switching public Alpha or enabling preview URLs.
