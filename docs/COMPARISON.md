# COMPARISON.md

The same context files and the same instruction line, given to two tools on
2026-09-29. Byte-identical prompt: PROJECT.md, FEATURES.md (rows E19–E23
marked), STYLE.md, STANDARDS.md, TOOLS.md, then index.html, styles.css, app.js,
then one line: *"Implement the feature marked in FEATURES.md, in these three
files only. Follow STYLE.md and STANDARDS.md. Do not add dependencies. Ask
before changing anything else."*

- **Tool A:** bolt.new, project `sb1-hw9wmzcv`. Output preserved unmodified in `delegated/bolt-001.zip`.
- **Tool B:** Google AI Studio, Build tab, Gemini 3.8 Flash, ran 125 seconds.

## Where they agreed

Both located the marked rows from FEATURES.md without being told where to look,
and both implemented E19 through E23 rather than inventing a different feature.
Both built the summary as read-only with no controls. Both suppressed the counts
on a network failure rather than showing zeros. Both used `textContent` and
neither used `innerHTML`. Both read from the existing `GET /entries` and neither
created a table, an endpoint, or a second source of truth. Both edited only the
three files named in the instruction line.

Both also produced the same error state in their own previews, for the same
reason: the CORS allowlist in `worker.js` does not include their sandbox
origins, so **neither tool ever reached the real data.** Each wrote code against
a server it could not contact and then reported that the feature worked.

## Where they differed

**STYLE.md tokens.** AI Studio applied them by name — `#FAFAFA` surface,
`#262626` text, `#737373` muted, 8px spacing, 8px radius. bolt styled the same
section with `#45586b` and `#e0e0e0`, colours it took from the existing
stylesheet rather than from the tokens file. Both outputs look coherent; only one
follows the document.

**What came back with the code.** bolt's zip contains its React/Vite/Tailwind
scaffold and a `package.json` with nineteen dependencies, including
`@supabase/supabase-js`, a client for a database this project does not use. The
instruction line said not to add dependencies. bolt also injected three meta tags
into `index.html` pointing the page's social preview at `bolt.new/static/og_default.png`.
AI Studio's output was an in-place edit of the three files with no scaffold and
no dependency manifest, though it did change the page title and meta description
without being asked.

**Wording.** bolt: "For parents: reply activity". AI Studio: "Parent summary:
reply activity". Neither was specified; both invented one.

## Which prediction this resolved

The **Loose** prediction — *bolt will add an edit or delete control, breaking
E22* — resolved **false**, and the comparison strengthens that result rather than
just recording it. Both tools independently chose read-only. E22 said "SHALL NOT
offer any control," and two tools from two companies read that the same way, so
the rule was clear rather than luckily interpreted.

## What the agreement says about the spec

Where two independent tools agree, the agreement is evidence about the
specification rather than about either tool: E19 through E23 were unambiguous
enough that neither had to guess. **Where they agree in a failure, that is
evidence too.** Neither asked who the parent is or how they reach this page,
even though the instruction line invited questions and ADR-002 records that the
endpoint has no authentication at all. A silent spec did not produce a question
from either tool; it produced the same unexamined assumption twice.

No verdict on which tool is better. One sample, one feature, one afternoon.
