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
| 1 | Does the parent summary show both the number of coaches contacted and the number who have replied? | Yes | Yes | Agree |
| 2 | Does it list each replied coach's name, school, and contact date? | Yes | Yes | Agree |
| 3 | When no coaches have been contacted, does it say so in words rather than showing a count of zero? | Yes | Yes | Agree |
| 4 | Is the parent summary free of any button, link, or input that could add, edit, or delete an entry? | Yes | Yes | Agree |
| 5 | When the server cannot be reached, does the summary withhold the counts rather than showing zeros? | Yes | Yes | Agree |
| 6 | Does every piece of user-supplied text reach the page through `textContent` rather than `innerHTML`? | Yes | Yes | Agree |
| 7 | Does the parent summary read from the existing `GET /entries` rather than any separate storage? | Yes | Yes | Agree |
| 8 | Do all colours used in the parent summary appear as tokens in STYLE.md? | **No** | **No** | Agree |
| 9 | Is every spacing and radius value in the parent summary CSS a multiple of the 8px `space-unit` token? | **No** | **No** | Agree |
| 10 | Is the page free of any framework, CDN script tag, or npm dependency? | Yes | Yes | Agree |

**Agreement: 10 of 10 (100%).** No disagreements. Above the 80% threshold, so
there is no rubric finding to log — but see the note below, because identical
verdicts did not mean identical evidence.

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

## Where the two graders differed, despite agreeing

Every verdict matched, which is a clean result and a dull one. One thing is worth
recording anyway.

**Q8: Grader 2 found a colour Grader 1 missed.** I cited `#45586b` and `#e0e0e0`
as the non-token colours in the parent summary. Gemini cited those two **plus
`#922020`**, the error red on `.summary-error`. It is right, and I had overlooked
it because `#922020` was already in `styles.css` before this feature and I was
only looking at what bolt added.

That matters beyond this row: **STYLE.md has no error colour token at all.** Six
tokens are defined and none of them covers the state the page enters whenever the
server is unreachable, which is the state a parent is most likely to see at the
worst moment. The gap is in my tokens file, not in bolt's output, and it was
found by the second grader rather than by me. Fixed in STYLE.md as part of HW5.

Both graders answering "No" for partly-overlapping reasons is exactly the case a
binary rubric hides. The verdict column agreed; the evidence column did not, and
the evidence column is where the finding was.

## Rubric revisions made

None. No question produced a split verdict, so no question needed rewriting. The
instruction to answer No when something is only partly true did real work on Q8
and Q9, where both graders faced a mix of compliant and non-compliant values and
both resolved it the same way.
