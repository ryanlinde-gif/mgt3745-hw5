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
  - **Resolved 2026-09-29: 5 of 5.** All five verified by running the integrated
    page, not by reading it. E21 was tested by emptying the database and
    restoring it afterwards. I was wrong, and wrong in a specific direction: I
    assumed restraint rules would be the ones a tool misses, and bolt handled
    both of them. For E23 it invented a `lastLoadFailed` flag to distinguish
    "no entries" from "could not check" — a distinction my spec required and did
    not explain how to build.

- **Loose:** bolt will add an edit or delete control to the parent summary,
  breaking E22. A list of records looks like something that wants buttons, and
  nothing about building a summary screen makes a tool think "and no controls."
  - **Resolved 2026-09-29: false.** No edit or delete control was added. The
    summary contains only `<p>`, `<ul>`, and `<li>`. Google AI Studio, given the
    identical prompt, also built it read-only, so two independent tools read
    "SHALL NOT offer any control" the same way. The rule was clear rather than
    luckily interpreted.

- **Open:** My spec never says how the parent reaches this page or how the system
  knows who they are. There is no login, and ADR-002 records that the endpoint is
  completely unauthenticated. **What does bolt do with a hole in the spec — invent
  a login, ignore the question, or ask?** Resolves when I read the output and the
  chat transcript.
  - **Resolved 2026-09-29: it ignored the question.** bolt never mentioned the
    parent's identity, never asked, and built the summary as though the parent
    were already present and authorised. My instruction line explicitly said
    "Ask before changing anything else," and it asked nothing at all. Google AI
    Studio did the same: straight to "has been implemented."
    **This is the prediction that paid.** A silent spec did not produce a
    question from either tool. It produced the same unexamined assumption twice,
    which means the gap stayed invisible until I went looking for it. ADR-002
    already records that this endpoint has no authentication; neither tool
    connected that to a parent-facing view of another person's data.

## 3. Success criteria

Each EARS row for the delegated feature, and how it is checked.

| EARS row (feature) | Checked by | Where |
|---|---|---|
| **E19** WHEN the parent summary is displayed, THE SYSTEM SHALL show the number of coaches contacted and the number who have replied | test + judgment | `evals/worker.test.js`, "EARS E19: GET /entries carries the status field the parent summary counts"; `docs/JUDGMENT.md` #1 |
| **E20** WHERE a coach's status is "replied", THE SYSTEM SHALL list that coach's name, school, and the date contacted | test + judgment | `evals/worker.test.js`, "EARS E20: an entry saved as replied comes back with the three fields the summary lists"; `docs/JUDGMENT.md` #2 |
| **E21** IF no coaches have been contacted, THEN THE SYSTEM SHALL say so in words rather than displaying a summary of zeros | human + judgment | Database emptied and restored on 2026-09-29; page showed "No coaches have been contacted yet."; `docs/JUDGMENT.md` #3 |
| **E22** THE SYSTEM SHALL present the parent summary as read-only, and SHALL NOT offer any control that adds, edits, or deletes an entry | human + judgment | DOM and `renderParentSummary` read by hand; only `p`, `ul`, `li` are created; `docs/JUDGMENT.md` #4 |
| **E23** IF the server cannot be reached, THEN THE SYSTEM SHALL say so and SHALL NOT display counts that could be mistaken for current | human + judgment | Page loaded with `?failSave`; error shown and no counts rendered; `docs/JUDGMENT.md` #5 |

E19 and E20 are the only two rows a test can reach, because the parent summary
is client-side logic with no endpoint of its own. The tests therefore check the
data the summary is computed from rather than the summary itself, which is a
weaker check and is recorded as such rather than described as full coverage.
E21, E22, and E23 are behaviours of the rendered page and are checked by a human
and by the judgment eval.

## 4. Error-analysis log

Every failure observed across bolt, AI Studio, the tests, and the judgment eval.
Sorted by count.

| Failure (a few words) | Count | Source | Category |
|---|---|---|---|
| Did not ask about the parent's identity, which the spec never defines | 2 | bolt, AI Studio | spec gap |
| Used its own colours instead of STYLE.md tokens | 2 | bolt (CHECKLIST Q3, JUDGMENT Q8) | STYLE |
| Spacing values not on the 8px unit (`0.3rem`, `1.25rem`) | 1 | bolt (JUDGMENT Q9) | STYLE |
| Shipped 19 dependencies after being told not to add any | 1 | bolt | dependency |
| Shipped a React/Vite scaffold beyond the three named files | 1 | bolt | scope |
| Injected vendor meta tags pointing at its own CDN | 1 | bolt | scope |
| Hidden `.bolt/prompt` competing with my STANDARDS.md | 1 | bolt | cannot verify |
| Changed page title and meta description unprompted | 1 | AI Studio | scope |
| Starter test assumed the template's one-column schema | 1 | HW5 template | spec drift |
| `node --test evals/` fails on Node 24 | 1 | HW5 template | tooling |
| Tests left rows in the live database, inflating the summary count | 1 | my own evals | tooling |
| Python `urllib` gets 403 from the Worker; `curl` and `fetch` do not | 1 | Cloudflare bot protection | tooling |

Two observations about this table rather than about any single row.

**The top row is the only one both tools produced.** Where two independent tools
fail identically, the failure is more likely mine than theirs: the spec was
silent, so neither had anything to ask about. Everything below it is a
single-source failure and therefore a fact about one tool.

**Four rows are not about the delegated build at all.** The template's test
runner, the template's starter test, my own evals polluting the database, and
Cloudflare's bot protection were all found while verifying, not while building.
That is what verification time actually buys.

## 5. Evals

- **Code:** `API=https://mgt3745-hw4.ryanlindebusiness.workers.dev npm test` —
  **5 tests, 5 passing.** Screenshot in `docs/npm-test.png` and in the README.
  Two of the five exercise the delegated feature's effect on `GET /entries`.
- **Judgment:** `docs/JUDGMENT.md`, 10 questions, two graders (Ryan Linde and
  Gemini via Google AI Studio, prompted in a fresh session with the prompt
  recorded). Agreement: *pending Grader 2's answers.*

## Verification table (carried from HW4)

The full HW4 table, with steps, expected results, and observed results, lives in
[`FEATURES.md`](FEATURES.md#verification) and is not duplicated here; a second
copy would drift from the first. Summary of where those statements stand:

| Criterion | HW4 | HW5 | Note |
|---|---|---|---|
| E10 save and display | PASS | PASS | now also covered by an automated test |
| E11 survives a reload | PASS | PASS | |
| E12 empty field named | PASS | PASS | enforced in the page and again in the Worker |
| E12 201-character boundary | PASS | PASS | was CANNOT TEST in HW3 |
| E13 flagged at 8 days, not 6 | PASS | PASS | |
| E14 failed write preserves input | PASS | PASS | |
| E5 coach, date, status visible | PASS | PASS | |
| E15 bad JSON rejected | PASS | PASS | |
| E16 submitted SQL stored as data | PASS | PASS | |
| E17 survives a cleared cache | PASS | PASS | |
| E18 network unreachable handled | PASS | PASS | extended to the parent summary as E23 |
| Server returns 500 | CANNOT TEST YET | CANNOT TEST YET | still cannot force an internal failure without editing the Worker to fail on purpose |
| Two clients, one table | DEFERRED (ADR-002) | DEFERRED (ADR-002) | |
| Unauthenticated access | FAIL, known | **FAIL, and now worse** | the parent summary puts a second person's view on the same open endpoint; ADR-003 is still owed |

The last row changed this week and is the one worth reading. HW4 recorded an
unauthenticated endpoint as a known FAIL affecting the athlete's own data. HW5
adds a view intended for a *different* person, on the same endpoint, with no way
to tell the two apart. The delegated feature did not cause this and neither tool
raised it. It is the direct consequence of the Open prediction above: a spec that
never says who the parent is produces a build that never asks.
