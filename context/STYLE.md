---
color-text: "#172b40"
color-text-muted: "#45586b"
color-background: "#f7f9fb"
color-surface: "#fafafa"
color-primary: "#123552"
color-on-primary: "#ffffff"
color-border: "#526578"
color-divider: "#b8c5d0"
color-focus: "#b16d00"
color-danger: "#922020"
color-attention: "#7a3d00"
color-attention-surface: "#ffe8c2"
font-body: "system-ui"
font-size-min: 14px
space-unit: 8px
radius: 4px
---

# STYLE.md

Tokens above, rationale below. **Every token here is declared in `styles.css` as
a CSS custom property with the same hex string, and nothing outside that
`:root` block hard-codes a colour.** A grader opening both files sees the same
values.

Admired interface: **Instagram**, for restraint rather than content — the chrome
gets out of the way and the thing you came for is the largest object on screen.
Resented: **Hudl**, which is where the refusals come from.

## Contrast

Ratios computed with the WCAG 2.x relative-luminance formula. **Every pair used
for text meets 4.5:1 at body size.** Non-text pairs are listed separately against
the 3:1 threshold for interface components.

| Foreground | Background | Used for | Ratio | Needs |
|---|---|---|---|---|
| `color-text` | `color-background` | body text, entries | **13.67:1** | 4.5:1 ✓ |
| `color-text` | `color-surface` | text inside the parent summary | **13.82:1** | 4.5:1 ✓ |
| `color-text-muted` | `color-background` | helper text under the status field | **6.95:1** | 4.5:1 ✓ |
| `color-text-muted` | `color-surface` | summary heading, empty-state line | **7.03:1** | 4.5:1 ✓ |
| `color-danger` | `color-background` | validation errors | **8.12:1** | 4.5:1 ✓ |
| `color-danger` | `color-surface` | summary unavailable message | **8.21:1** | 4.5:1 ✓ |
| `color-attention` | `color-background` | the follow-up count | **7.98:1** | 4.5:1 ✓ |
| `color-attention` | `color-attention-surface` | text inside the overdue badge | **7.04:1** | 4.5:1 ✓ |
| `color-on-primary` | `color-primary` | button labels | **12.68:1** | 4.5:1 ✓ |
| `color-focus` | `color-background` | focus ring (non-text) | **3.93:1** | 3:1 ✓ |
| `color-border` | `color-background` | input borders (non-text) | **5.70:1** | 3:1 ✓ |
| `color-divider` | `color-background` | row separators (decorative) | 1.67:1 | n/a |

**Two honest notes rather than two omissions.**

`color-divider` at 1.67:1 would fail if it carried information. It does not: the
rows are already separated by their own layout, and removing the lines entirely
would lose nothing but polish. It is listed so the low number is visible rather
than quietly excluded.

`color-surface` against `color-background` is **1.01:1**. The parent summary is
meant to read as a distinct area and tonally it does not — the two near-whites
are indistinguishable. Its separation is carried entirely by the heading and the
corner radius. This was found by computing the ratio rather than by looking, and
it is the honest weakness in this palette. Revisiting it means either darkening
the surface or giving the section a real border, and that is a decision for HW6
rather than a silent tweak now.

## Rationale, one sentence per token

- **color-text `#172b40`**: near-black with a blue cast rather than `#000000`, because pure black on a near-white page is harsher than anything printed and this gets read at night between practice and homework.
- **color-text-muted `#45586b`**: the lightest text tone that still clears 4.5:1 on both backgrounds, so "muted" never means "harder to read for someone who needs it most."
- **color-background `#f7f9fb`**: off-white rather than white, so the input fields — which *are* white — read as inset without needing a heavier border.
- **color-surface `#fafafa`**: a second near-white for the read-only area, separating by tone instead of by line, which is the Instagram move; see the honest note above about how well it actually works.
- **color-primary `#123552`**: one dark blue, used only on the thing you can act on, so a parent skimming on a phone finds the button without reading the page.
- **color-on-primary `#ffffff`**: pure white reserved for text on the primary surface and for input interiors, never as the page background, so "white" always means "this is a thing you interact with."
- **color-border `#526578`**: dark enough to clear 3:1 as an interface component, because a field you cannot find the edge of is a field you are not sure you have filled in.
- **color-divider `#b8c5d0`**: deliberately decorative and deliberately weak, because row separation is already carried by layout and a strong line between every entry turns a list into a table.
- **color-focus `#b16d00`**: an amber that appears nowhere else in the interface, so a keyboard user can never confuse the focus ring with a state the page is trying to communicate.
- **color-danger `#922020`**: one red for every failure the user must act on, whether a missing field or an unreachable server, so the colour means "you need to do something" rather than "something is red."
- **color-attention `#7a3d00`**: a brown-amber distinct from danger, because a coach going quiet for seven days is a prompt and not an error, and the palette should not shout at an athlete for something no one did wrong.
- **color-attention-surface `#ffe8c2`**: the badge fill, light enough that its own text clears 7:1, so the flag is legible rather than merely noticeable.
- **font-body `system-ui`**: one family for every role, because a second family is a decision I have not earned and a third is a mess.
- **font-size-min `14px`**: the floor, because the parent in `USERS.md` reads this on a phone and is not the age of the person who designed it.
- **space-unit `8px`**: every margin and padding in `styles.css` is a multiple of it, so nothing is eyeballed and two sections built a week apart still line up.
- **radius `4px`**: soft enough to read as current, square enough that a form still reads as a form.

## Refusals

Things this interface will never do, drawn from **Hudl**. Laws from lawsofux.com.

1. **No media that plays on its own.** Enforces the **Peak-End Rule**: a visit is remembered by its most intense moment and its last one, and an unexpected video at unknown volume becomes both. An athlete checking her log between classes should never have to find the mute button.
2. **No feature that reveals it is paid only after the user has done the work.** Enforces the **Goal-Gradient Effect**: motivation rises closest to the finish, so interrupting there is both the most effective moment to extract a payment and the one that feels worst. `USERS.md` records a parent who already declined a camp for exactly this kind of reason.
3. **No burying the primary action behind a menu.** Enforces **Fitts's Law** and **Hick's Law**: the page exists to log a contact, so that control is first, always visible, and never one choice among many inside navigation.
4. **No notification or badge for anything the user did not ask to be told.** Enforces **Miller's Law**: working memory is small and my users' is already full of school, club, and training. The follow-up flag is the one exception, and it appears only on the page, never as an interruption.

## Sources

- **Admired:** Instagram. Named, not evidenced — no screenshot in `/docs`. Saying so is better than a caption implying a comparison I did not do.
- **Resented:** Hudl. Same.

## How this file was checked

`docs/JUDGMENT.md` questions 8 and 9 tested whether the delegated feature's CSS
used these tokens and the 8px unit. Both graders answered **No** to both, and the
second grader named a colour the first had missed. Those answers were given
against bolt's CSS as delivered. **`styles.css` was rewritten afterwards** so
every value is a token or a multiple of `space-unit`; bolt's original is
preserved unmodified in `delegated/bolt-001.zip` and the fix is recorded in
`DDR-001`. The judgment eval is left as it was answered, because a rubric edited
after the grading is not a rubric.
