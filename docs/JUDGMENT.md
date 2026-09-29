# JUDGMENT.md

Ten binary questions about the delegated feature (FEATURES.md E19–E23) and
STYLE.md, answered independently by two graders on 2026-09-29.

- **Grader 1: Ryan Linde.** Answered from running the integrated page, reading
  `app.js` and `styles.css`, and the five passing tests in `evals/`.
- **Grader 2: Gemini (Google AI Studio).** Answered from the same three files
  pasted in, with no access to my answers. Prompt recorded below.

**Claude (Opus 5, via Claude Code) is deliberately not a grader here.** It
integrated the code, wrote the tests, and filled `CHECKLIST.md`. A second column
from the tool that did the work is agreement with itself, not a second opinion.

| # | Question | Grader 1 (Ryan) | Grader 2 (Gemini) | Agree? |
|---|---|---|---|---|
| 1 | Does the parent summary show both the number of coaches contacted and the number who have replied? | Yes | | |
| 2 | Does it list each replied coach's name, school, and contact date? | Yes | | |
| 3 | When no coaches have been contacted, does it say so in words rather than showing a count of zero? | Yes | | |
| 4 | Is the parent summary free of any button, link, or input that could add, edit, or delete an entry? | Yes | | |
| 5 | When the server cannot be reached, does the summary withhold the counts rather than showing zeros? | Yes | | |
| 6 | Does every piece of user-supplied text reach the page through `textContent` rather than `innerHTML`? | Yes | | |
| 7 | Does the parent summary read from the existing `GET /entries` rather than any separate storage? | Yes | | |
| 8 | Do all colours used in the parent summary appear as tokens in STYLE.md? | **No** | | |
| 9 | Is every spacing and radius value in the parent summary CSS a multiple of the 8px `space-unit` token? | **No** | | |
| 10 | Is the page free of any framework, CDN script tag, or npm dependency? | Yes | | |

**Agreement: _ of 10 (_%).** Under 80% is a finding about the rubric, not about
the build, and goes in the error-analysis log.

## Notes on Grader 1's two No answers

**Q8.** The parent summary uses `#45586b` for the heading and `#e0e0e0` for the
list dividers. Neither appears in STYLE.md. bolt took them from the existing
stylesheet rather than the token file. `#fafafa` and `#737373` *are* tokens and
are used correctly, so this is partial rather than total, and the question is
binary, so the answer is No.

**Q9.** With `space-unit: 8px`, the rules use `0.3rem` (4.8px) and `1.25rem`
(20px), neither a multiple of 8. `2.5rem` (40px), `0.5rem` (8px), and `1rem`
(16px) are. Again partial, and the question is binary.

Both No answers are the same underlying finding seen twice: bolt matched the
existing stylesheet by eye instead of reading STYLE.md. AI Studio, given the
identical prompt, used the tokens by name. See `COMPARISON.md`.

## Prompt given to Grader 2

Pasted into Google AI Studio with `index.html`, `styles.css`, and `app.js`
appended, in a new session with no prior context:

> You are reviewing a web feature as an independent grader. Below are three
> files from a project: index.html, styles.css, and app.js. The feature under
> review is the "parent summary" section, which shows a parent how many college
> coaches have been contacted and how many have replied.
>
> Answer each of the following ten questions with exactly one word, Yes or No,
> followed by one short sentence of evidence citing what you saw in the files.
> Do not hedge and do not answer "partially" — if something is only partly true,
> answer No. Do not explain your overall impression of the code.
>
> STYLE.md defines these design tokens: color-primary #0095F6, color-accent
> #ED4956, color-background #FFFFFF, color-surface #FAFAFA, color-text #262626,
> color-text-muted #737373, font-body system-ui, font-size-min 14px,
> space-unit 8px, radius 8px.
>
> [the ten questions, verbatim from the table above]

## Rubric revisions made

*(If a question turns out to be ambiguous enough that two graders read it
differently, the fix is to rewrite the question until they cannot, and to record
the rewrite here rather than quietly changing it.)*

- *pending Grader 2's answers*
