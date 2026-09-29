# Reading a Delegated Build: the seven questions

Binary answers only. Each No is a row in the EVALS.md error-analysis log.
Answered 2026-09-29 against `delegated/bolt-001.zip` and the AI Studio Build run.

| # | Question | bolt | AI Studio | Log category |
|---|---|---|---|---|
| 1 | Did it touch only the files you named? | **No** | **Yes** | scope |
| 2 | Any `innerHTML` with user input? Any concatenated SQL? (Yes is bad) | **No** (0 `innerHTML`, no SQL) | **Not verified** | STANDARDS |
| 3 | Are colors and fonts the STYLE.md tokens, or its own? | **Its own** | **The tokens** | STYLE |
| 4 | Did it add a dependency? Which? What does that package do? | **Yes, 19** | **No** | dependency |
| 5 | Does it call your Worker, or invent its own storage? | **Calls the Worker** | **Calls the Worker** | architecture |
| 6 | Run the feature's EARS rows by hand. How many pass? | **5 / 5** | **not run** | EARS |
| 7 | Is there anything you cannot explain? Name the line. | **Yes** (below) | **Yes** (below) | cannot verify |

## Notes on each answer

**1. Scope.** bolt's zip contains its whole starter scaffold alongside the three
files: `src/App.tsx`, `src/main.tsx`, `vite.config.ts`, `tailwind.config.js`,
`eslint.config.js`, four `tsconfig` files, and a `package-lock.json`. It also
added three meta tags to `index.html` pointing the page's social preview image
at `bolt.new/static/og_default.png`. AI Studio edited the three files in place,
though it changed the page title and meta description unprompted.

**2. STANDARDS.** bolt's `app.js`: `textContent` 17 times, `innerHTML` zero
times, no SQL anywhere (the Worker was untouched). AI Studio *stated* it used
"safe `textContent`" but its code was never pulled down and read, so this is
**not verified** rather than Yes or No. Recording it as verified would be
claiming a check that did not happen.

**3. STYLE.** bolt used `#45586b` and `#e0e0e0`, taken from the existing
stylesheet. Only two of six STYLE.md tokens appear in its output. AI Studio named
the tokens explicitly: `#FAFAFA`, `#262626`, `#737373`, 8px spacing, 8px radius.
Same file, same prompt, opposite results. **Cause identified:** see question 7.

**4. Dependency.** bolt shipped a `package.json` with nineteen entries, including
`@supabase/supabase-js` (a client for a hosted Postgres service this project does
not use), `react`, `react-dom`, `lucide-react`, `tailwindcss`, `typescript`, and
`vite`. The instruction line said not to add dependencies. None of them are
reachable from the three files that shipped, so none were carried into the repo.

**5. Architecture.** Both preserved `const API` pointing at the deployed Worker
and both read from `GET /entries`. Neither created a table, an endpoint, or a
second source of truth. This was the failure the assignment's own notes warned
about most, and neither tool committed it.

**6. EARS.** bolt: all five verified by running the integrated page, including
emptying the database to test E21 and restoring it afterwards. AI Studio: **not
run.** Its output exists only in the Build tab and was never integrated, so the
honest answer is that no rows were tested, not that they passed.

**7. Cannot explain.**

- **bolt, `.bolt/prompt`.** The zip contains a hidden instruction file the tool
  wrote for itself: *"have them be beautiful, not cookie cutter"* and *"this
  template supports JSX syntax with Tailwind CSS classes, React hooks, and
  Lucide React for icons."* This is a **second set of instructions competing with
  mine**, shipped inside my deliverable, which I did not see until I unzipped it.
  It directly contradicts STANDARDS.md rule 7 (no frameworks, no build step) and
  plausibly explains both question 3 and question 4: a tool told to be beautiful
  rather than to follow a token file will prefer its own palette. **Disposition:**
  the scaffold and the meta tags were removed during integration; the prompt file
  is preserved unmodified inside `delegated/bolt-001.zip` as evidence.

- **bolt, the nineteen dependencies.** I did not audit any of them. I removed
  them by not copying the scaffold, which is avoidance rather than verification.
  If a future delegation needs one of those packages, the audit is still owed.

- **AI Studio, all of it.** Its code was read in summary form in the chat panel
  and never downloaded, so every claim it made about its own output is
  unverified. **Disposition:** its row in question 6 says "not run," and
  `COMPARISON.md` draws no conclusion that depends on its code being correct.
