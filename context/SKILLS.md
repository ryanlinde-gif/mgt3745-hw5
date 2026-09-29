# SKILLS.md

Reusable patterns and delegation guidance, written so an agent (or a stranger)
could apply them next time. Each entry under fifteen lines. Load-on-demand: read
the heading first and the body only when relevant.

## Pattern: one request helper, so failure has exactly one home
**When:** any call from `app.js` to the Worker.
**Do:** route every call through a single `request(path, options)` that returns
`{ok: true, response}` or `{ok: false, message}` and never throws. Check
`res.ok`; on a non-OK status read `res.text()` for the server's reason; catch
network errors separately and return a message about reachability, not about the
request. Callers branch on `result.ok` and put `result.message` on the page with
`textContent`.
**Because:** localStorage never failed; the network does (ADR-002). With one
helper, "show the user what went wrong" is written once instead of at every call
site, and a new caller cannot forget it.
**Watch for:** a shared message that is only true on one path. The first version
said "your entry is still here" on the *load* path, where nothing was typed. Put
path-specific promises in the caller, not in the helper.

## Delegation guidance: what to paste, what to check first
**Paste, in order:** PROJECT, FEATURES (rows marked), STYLE, STANDARDS, TOOLS,
then the current page files. **Instruction line last** — it is what the model
weighs most heavily in a long prompt — naming the exact files it may touch.
**Check first, in this order:** (1) unzip and read the *file list* before any
code, because that is where the scaffold and the dependencies are; (2) look for a
hidden prompt or config the tool shipped itself; (3) diff against your originals
for what was **removed**, not just added; (4) `innerHTML` and concatenated SQL;
(5) whether it used your tokens; (6) only then run the feature.
**Reliably wrong (bolt.new, 2026-09-29):** ships its whole starter scaffold and
nineteen dependencies after being told to add none; injects its own vendor meta
tags into `index.html`; styles from the existing stylesheet rather than the token
file; **never asks a question, even when the instruction line invites one.**
**Reliably right:** found the marked EARS rows unaided, called the existing
Worker rather than inventing storage, and used `textContent` throughout.

## Delegation guidance: record the model before you start
**When:** any delegation you will have to write up.
**Do:** note the tool, the model it reports, the mode, and the date *before*
prompting. Screenshot the tool's first reply, including its plan.
**Because:** DDR-002 has a permanent hole — the Copilot delegation in HW4 cannot
name its model, because nobody checked at the time and the session is gone. bolt
never displayed one at all, so that DDR says "not reported" rather than guessing.
A DDR that cannot name the tool that wrote the code is weaker than one that can,
and the cost of avoiding it is five seconds before you start.

## Pattern: tests that clean up after themselves
**When:** any eval that writes to a live database.
**Do:** create rows through one helper that records the returned id, and delete
them in an `after` hook.
**Because:** the evals here wrote to the deployed D1 the real page reads. Before
the hook existed, a row named `eval-coach-1790717496737` appeared in the parent
summary's count of coaches contacted — a test changing the thing it was
measuring, visible in a screenshot before anyone noticed.
