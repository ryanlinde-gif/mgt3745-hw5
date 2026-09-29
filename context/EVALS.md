# EVALS.md

The verification table from HW3, grown up. Five sections, in this order.
The first two are written and committed BEFORE any tool sees the spec.

## 1. RAT statement

**Written before bolt.new saw anything. 2026-09-29 17:36 EDT.**

The riskiest assumption in delegating the parent summary is that bolt.new can
read my own spec files well enough to build from them. If that is false, then
the last three weeks of writing FEATURES.md, STANDARDS.md, and STYLE.md bought
me nothing where delegation is concerned, and I should keep building by hand.

**What would show it is false:** bolt producing something that ignores the rows
I marked, invents its own coach data instead of calling my Worker, or replaces
my working contact log rather than adding a section to it. Any of those means it
treated my files as decoration rather than as instructions.

## 2. Prediction Stake (before build, 2026-09-29 17:36 EDT)

Written before bolt.new was given the spec. Prediction text is never edited;
resolutions are added underneath after the build.

- **Tight:** bolt will satisfy **3 of the 5** EARS rows (E19 to E23) on its first
  output. My reasoning: E19 and E20 ask it to display things, which is what these
  tools are good at. E21, E22, and E23 are restraint rules, and E22 and E23 in
  particular say *do not* rather than *do*. I expect the two visible rows plus one
  of the three edge cases.
  - *Resolved: pending.*

- **Loose:** bolt will add an edit or delete control to the parent summary,
  breaking E22. A list of records looks like something that wants buttons, and
  nothing about building a summary screen makes a tool think "and no controls."
  - *Resolved: pending.*

- **Open:** My spec never says how the parent reaches this page or how the system
  knows who they are. There is no login, and ADR-002 records that the endpoint is
  completely unauthenticated. **What does bolt do with a hole in the spec — invent
  a login, ignore the question, or ask?** Resolves when I read the output and the
  chat transcript.
  - *Resolved: pending.*

## 3. Success criteria
| EARS row (feature) | Checked by | Where |
|---|---|---|
| WHEN ..., THE SYSTEM SHALL ... | test | evals/worker.test.js, "..." |
| IF ..., THEN THE SYSTEM SHALL ... | judgment | docs/JUDGMENT.md #8 |
| THE SYSTEM SHALL ... | human | README, See It Work |

## 4. Error-analysis log
<!-- Every failure observed, a few words each, counted, sorted by count. -->
| Failure (a few words) | Count | Source | Category |
|---|---|---|---|
| Buttons used its own blue, not color-primary | 2 | bolt, AI Studio | STYLE |
| | | | |

## 5. Evals
- **Code:** `npm test` with `API=<worker url>`; _ tests, _ passing. Screenshot in README.
- **Judgment:** docs/JUDGMENT.md, _ questions, two graders, agreement _%.

## Verification table (carried from HW4)
<!-- Paste your HW4 verification table here; it is the ancestor of section 3. -->
