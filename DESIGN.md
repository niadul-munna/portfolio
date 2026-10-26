# Design notes

A short record of the decisions behind this site, so changes can be made in the same spirit.

## Brief

A personal site for Niadul Islam, frontend developer at Tenbyte Cloud. The reader is a hiring manager or senior engineer with five minutes. They should leave knowing three things: what he works on, how deep the work goes, and that the claims are honest.

The direction is a working document, not a landing page. Swiss editorial structure, the restraint of a well-set independent publication, and the plain annotation style of engineering documentation. Nothing on the page exists only to decorate it.

## Principles

1. **Type does the work.** Hierarchy comes from size, weight, and position, not boxes, icons, or colour.
2. **Structure is visible.** A 12-column grid with a narrow label column on the left. Hairlines separate; panels are rare.
3. **Every claim is checkable.** Each piece of work carries a status: shipped, in review, prototype, concept, or personal. Missing facts render as a marked placeholder; they are never filled with guesses.
4. **Motion is feedback.** Transitions run 150–250 ms and only respond to the reader. No entrance animations, no scroll effects.
5. **The page works without JavaScript.** The signature interaction is pure CSS. The theme toggle is the one piece of client code, and without JavaScript the site still follows the system theme.

## Tokens

Defined as CSS variables in `app/globals.css` and exposed to Tailwind through `@theme inline`.

| Token         | Light     | Dark      | Use                                                             |
| ------------- | --------- | --------- | --------------------------------------------------------------- |
| `--canvas`    | `#F7F7F4` | `#151614` | Page background                                                 |
| `--panel`     | `#EFEFEA` | `#1C1E1B` | Rare soft panels (project plates)                               |
| `--ink`       | `#20221F` | `#E8E9E3` | Primary text                                                    |
| `--ink-soft`  | `#3A3D38` | `#C9CCC4` | Long-form body text                                             |
| `--muted`     | `#666A63` | `#9A9E96` | Secondary text and metadata                                     |
| `--line`      | `#DADDD5` | `#2C2F2A` | Hairlines                                                       |
| `--line-strong` | `#BFC3B9` | `#41453F` | Hover underlines, schematic strokes                           |
| `--accent`    | `#4A6151` | `#8FAE98` | Links on hover, focus, the "shipped" marker, schematic emphasis |

Contrast against the canvas, measured with WCAG 2 relative luminance: ink 14.9:1, ink-soft 10.3:1, muted 5.1:1 (4.8:1 on panel), accent 6.3:1. The brief's suggested muted value (`#777B74`) measured 4.0:1, below AA for body-size text, so it was darkened. The accent was also nudged slightly darker for the same reason. Dark tokens: ink 14.9:1, muted 6.7:1, accent 7.5:1.

## Type

| Role      | Face           | Size                                | Notes                                     |
| --------- | -------------- | ----------------------------------- | ----------------------------------------- |
| Display   | Schibsted Grotesk 470 | `clamp(2.25rem, 1.3rem + 3.9vw, 4.5rem)` / 1.04 | Hero statement only. Tracking −0.035em |
| Title     | Schibsted Grotesk 470 | `clamp(1.75rem, 1.25rem + 1.9vw, 2.75rem)` / 1.08 | Work index rows, case study title |
| Heading   | Schibsted Grotesk 500 | 1.375rem / 1.25                     | Case study section headings              |
| Standfirst| Newsreader 400 | `clamp(1.25rem, 1.1rem + 0.55vw, 1.5rem)` / 1.45 | Intro paragraphs and the About section |
| Body      | Schibsted Grotesk 400 | 1.0625rem / 1.65                    | Prose, max 66ch                           |
| UI        | Schibsted Grotesk 450 | 0.9375rem / 1.5                     | Navigation, row summaries                 |
| Meta      | IBM Plex Mono 400 | 0.75rem / 1.5                   | Numbers, dates, status, captions. Sentence case, no tracking |

Newsreader is used only where a person is speaking at length. It never appears in headings. Mono is for metadata only, never for running text.

Schibsted Grotesk replaced Geist on 2026-10-15. Geist is the `create-next-app` default, so it read as a template; Schibsted Grotesk was drawn for a newspaper group and suits the editorial direction. It is a variable font (400–900), so the 450/470 weights still work. IBM Plex Mono replaced JetBrains Mono to match the engineering-document annotations. Share Tech was considered and rejected: it has one weight, so hierarchy by weight is impossible, and its squared letterforms read as a game interface. Pages load both through `next/font/google`; Open Graph images read static TTF instances from `assets/fonts/`, kept with their OFL licences.

## Grid and rhythm

- Page container: max 1440px, side gutters 20 / 32 / 48 / 64px at base / sm / lg / xl.
- 12 columns from `lg` (1024px), 8 from `md`, 4 below. Gap 24px, 32px from `xl`.
- Section pattern: label in columns 1–3, content in 4–12. Below `lg` the label stacks on top.
- Vertical spacing is in steps of 8px. Each section opens with 80px (128px from `lg`) of space, then a hairline, then its label.
- Prose measure: 62–66ch.

## Signature interaction: the work index

The selected-work list is an index. Each row shows a number, a title, its category, dates and status, and a one-line summary. On desktop with a fine pointer, hovering or focusing a row:

- dims the other titles to muted colour (200 ms), and
- reveals that project's plate in the right-hand four columns beside its own row, clipping open from top to bottom (240 ms, `cubic-bezier(.2,.7,.2,1)`). Plates are top-aligned with their row, except the last two rows, which align the plate's bottom with the row so it stays within the list.

The first project's plate is the resting state. The behaviour comes entirely from CSS (`:hover`, `:focus-within`, `:has()`), with no client JavaScript. On touch devices and below 1024px, each plate renders in flow with its row as a static thumbnail. Below 768px the drawing is 70% wide, with the caption at full width, so the index stays short on phones. Under `prefers-reduced-motion` the plates swap without transitions.

## Plates and schematics

There are no cleared product screenshots of employer work yet, and the brief rules out mock dashboards posing as real ones. Each employer project therefore gets a **schematic**: a hairline line drawing of the shape of the work (a library grid, a UTC-bucketed chart, a cache path), annotated in mono like an engineering figure. Each is labelled as a schematic in its caption. When a screenshot is cleared, add it to the project's `media` and the plate renders it with `next/image`.

GitMate is the owner's own open-source project, so it uses real screenshots from its repository (`docs/screenshots`, copied to `public/work/gitmate/`). They show the real desktop app run against a demo home directory, and the captions say so. They are light-theme captures in both site themes.

## Theme

Light is the default design. Dark follows the system setting until the reader chooses otherwise with the toggle at the end of the navigation: a half-filled circle, 44px hit area, labelled "Dark theme" with `aria-pressed`. One click flips the theme on screen. Choosing the theme the system already uses clears the saved choice, so the site follows the system again without a separate "System" option. The choice is stored in `localStorage`, applied by an inline script in `<head>` before first paint, and kept in sync across open tabs. The dark tokens live twice in `globals.css`, under the media query and under `[data-theme="dark"]`, and must stay identical.

The toggle is the only client component the site ships.

## Reading and navigation

The hero introduces the person, employer and product domains concisely; the work index supplies the technical evidence. Career dates stay in Experience, while About begins with the personal engineering perspective. Header, hero and footer controls have 44px targets without enlarging their typography or icons.

The hero facts lead with "Open to", the roles named in Contact, so availability is visible on the first screen; the intro already states the role. Both hero links point down the page, use sentence case and the ↓ arrow. The header links the CV (PDF, new tab). Phones keep Work, Contact and CV on one row at 375px; Experience and About join from 640px.

Beyond the interface keeps all six entries. The standalone stories stay visible; the short summaries already covered by case studies sit in a native disclosure with links to their full explanations. The disclosure shares the last story's hairline and uses a typographic ↓ that turns to ↑ when open, in place of the browser's triangle. The support and personal-tool stories retain their detail.

Case studies open with native links to What I did, Decisions and Outcome. Their headings accept programmatic focus, so keyboard readers arrive at the same content as pointer readers. No sticky navigation or extra client code is needed. The shared footer keeps contacts and the update date, without a font/framework colophon.

The rendered evidence and before/after decisions for these refinements are recorded in [`UI-AUDIT.md`](./UI-AUDIT.md).

## Notes

Engineering notes use the same left spine as the case studies, with “Note” and an ISO date in mono in columns 1–3. The title uses `text-title`; the opening paragraph uses Newsreader and `text-standfirst`. The body begins in column 4 and spans through column 10, with a maximum measure of 66ch in Schibsted Grotesk `text-body`. Section headings use `text-heading`. Below desktop the spine stacks above the writing.

Content is typed in `content/notes.ts` as paragraphs, headings, lists and code blocks. Inline backticks use `RichText`. Code blocks use plain `pre`/`code` in IBM Plex Mono, scroll within their own width, and have no syntax-highlighting dependency. A related case study is linked below the body.

Draft notes carry a visible review label in development or a `SHOW_DRAFTS=1` preview. Normal production builds exclude their pages, homepage links and social images; the sitemap always excludes drafts. Each visible note has article metadata, a shared-frame social image and `BlogPosting` structured data.

## Hero photo

The hero has your GitHub photo top-aligned with the intro paragraph: 192px on desktop, 160px beside the intro on tablets, 112px above it on phones. Its own row fits the photo's actual width, with a 24px gap to the text on tablets and 32px on desktop, rather than leaving empty grid columns beside the image. The introduction and CTAs keep a maximum width of 640px. It loads eagerly but isn't preloaded, because the headline, not the photo, is the largest element on screen.

The hero photo is the site's only portrait. About is text: personal paragraphs in columns 4–9 and skills in columns 10–12 on desktop. On tablets the paragraphs span six of the eight columns, with skills below; on phones both take the full width. Keeping one real photo gives the site a consistent image style.

The accepted photo treatment is left-aligned at every width, square with 3px corners. A centered circular mobile preview was tried and reverted at the owner's request. Retain the tighter photo-to-text spacing described above.

## What the design avoids

Gradients, glass, glow, blobs, grain, 3D, icon-and-title card grids, pill clouds of skills, progress bars, counters, typing effects, carousels, sticky headers, giant-name hero, uppercase tracked micro-labels. The only icons are typographic arrows.
