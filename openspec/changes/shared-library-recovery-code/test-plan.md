# Library recovery test plan (future tests — not run)

| ID | Level | Test oracle / fixture |
| --- | --- | --- |
| LIB01 | Chromium desktop/mobile + offline | Save library-only JSON, reload/import, inspect payload excludes `data.keys` and device diagnostic state |
| LIB02 | Chromium 2 isolated contexts + Node CSPRNG/entropy | Create, copy secure long key, join a fresh browser and verify same library without project carryover |
| LIB03 | Node negative security + browser pair | Short-code one-use TTL, expiry, rate limiting and guessed-code failure with no information leak |
| LIB04 | Chromium 2 contexts + API spy | Real SAVE/UPDATE from A and read into B, no timeline POST or accidental duplicate |
| LIB05 | Node transactional SQLite + offline browsers | Two conflicting revisions, 409, queued retry with idempotent op ID, disconnected additions merge safely |
| LIB06 | Node security integration + storage permissions | Missing/invalid auth, Origin/CSRF, rejected payloads, bad rig/scripts/size, secret redaction in logs, backup/restore |
| LIB07 | Chromium 2 contexts | Nonempty libraries A/B linked: explicit preview and union, no replacing local project |
| LIB08 | Node/Chromium data-compat | Wrong schema mapping rejected; ori 360° remains 360°; tombstone/recovery protects deletion |
| LIB09 | Chromium opt-in trace + private feedback integration | Force 409 then report with diagnostics; test absence of secret, library content, credentials and unredacted request bodies |

Required evidence: raw RED old behavior, green implemented behavior on pinned SHA, exact command/fixture, desktop and mobile screenshots, independent security review and release reversal, explicit untested gates. No task may be marked done from a specification, a screenshot alone, or Hermes verdict.
