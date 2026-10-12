// Docs-hygiene link/path check (docs infra, not product tests).
// Run: node --test scripts/docs-hygiene.test.mjs
// Asserts the single canonical continuity/dogfood set exists, the removed
// top-level snapshots are gone, and every AGENTS.md reference resolves.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const CANONICAL = [
  "docs/operations/NATIVE-GOAL-CONTINUITY-RUNBOOK.md",
  "docs/operations/NATIVE-GOAL-WAKE-PROMPT-TEMPLATE.md",
  "docs/operations/AGENTS.md",
  "docs/dogfood/PIBOARD-AUTOMATION-DUPLICATE-ROOTS-2026-10-12.md",
  "docs/dogfood/AGENTS.md",
];

const REMOVED = [
  "docs/NATIVE-CONTINUITY-RUNBOOK-2026-10-12.md",
  "docs/NATIVE-GOAL-PROMPT-TEMPLATE-2026-10-12.md",
  "docs/PIBOARD-DOGFOOD-2026-10-12.md",
];

test("canonical continuity/dogfood docs exist", () => {
  for (const p of CANONICAL) assert.ok(existsSync(join(ROOT, p)), `missing ${p}`);
});

test("redundant top-level snapshots are gone", () => {
  for (const p of REMOVED) assert.ok(!existsSync(join(ROOT, p)), `still present ${p}`);
});

test("AGENTS.md references resolve to existing paths", () => {
  for (const index of ["AGENTS.md", "docs/AGENTS.md"]) {
    const base = join(ROOT, dirname(index));
    const text = readFileSync(join(ROOT, index), "utf8");
    const refs = [...text.matchAll(/`((?:docs\/)?(?:operations|dogfood)\/[^`]+?\.md)`/g)].map(
      (m) =>
        index === "AGENTS.md"
          ? m[1].replace(/^(?:docs\/)?/, "docs/")
          : m[1].replace(/^docs\//, ""),
    );
    assert.ok(refs.length > 0, `no ops/dogfood refs in ${index}`);
    for (const r of refs) assert.ok(existsSync(join(base, r)), `${index} points at missing ${r}`);
  }
});

test("no live reference to removed snapshot paths", () => {
  for (const index of ["AGENTS.md", "docs/AGENTS.md"]) {
    const text = readFileSync(join(ROOT, index), "utf8");
    for (const p of REMOVED) assert.ok(!text.includes(p), `${index} still cites ${p}`);
  }
});
