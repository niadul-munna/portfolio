# Portfolio UI/UX audit — 2026-10-14

## Scope and evidence

Refinement of the existing editorial portfolio. The live homepage was inspected for comparison; the working tree includes the earlier experience and draft-note changes that are not deployed yet. Implementation targets that working tree.

Baseline: homepage and `/work/vidinfra`, `/work/tenbyte-cdn`, `/work/tenbyte-website`, `/work/sellorio` at 375, 768, 1440 and 1920px, in light and dark themes. Screenshots and rendered measurements are in `.playwright-mcp/ui-audit/before/`. Axe 4.12.1 ran on all five routes at 375 and 1440px in both themes (20 scans).

The existing grid, fonts, colour tokens, section order, case-study structure, honest status model and CSS work preview are retained. No new dependencies or client components are needed.

## Prioritized audit, prepared before implementation

| Priority | Route / component | Evidence | Recommended action |
| --- | --- | --- | --- |
| P0 | All five routes | No overflow across 40 route/viewport/theme combinations. Twenty axe scans reported zero violations. Skip-link focus and native link navigation were inspected. | No verified blocker to fix. Automated scans do not establish complete WCAG compliance; SVG contrast still needs manual review. |
| P1 | `/`, `content/profile.ts`, `components/home/hero.tsx` | Headline occupies six lines at 375px and four at 768–1920px. The long introduction repeats the domains and technology list; Selected work starts at y=1143 on mobile and y=914 on desktop. | Shorten headline and supporting copy, retain identity/employer/product positioning, balance wrapping, and tighten the gap before hero metadata. Preserve CTA destinations. |
| P1 | All case studies, `app/work/[slug]/page.tsx` | Mobile pages are 4925–6798px tall. Contributions start 2403–2980px down, and decisions 3395–4548px down. The only project navigation is at the end. | Add a small opening navigation to contributions, decisions and outcome, with keyboard-focusable anchor destinations. |
| P1 | `/`, `content/practice.ts` | Six practice entries occupy 1950px on mobile. Commerce details repeat Sellorio; subtitle-service and promo-video detail fits their existing product case studies. | Keep all six entries and unique support/tool stories. Shorten three product summaries, link their case studies, and move the complete service/media explanations into Vidinfra and Sellorio. Preserve each status. |
| P2 | Header, hero, footer | Measured targets: name and hero CTAs ≈22px high; theme toggle 32×32px; footer CV 14×34px. The 375px hero leaves CV alone on a second row. | Give standalone controls 44px targets, maintain the small visible theme icon, and reduce mobile CTA spacing enough to keep the group together. This is a usability refinement, not a claim that every small target fails WCAG. |
| P2 | `/`, `components/work-index.tsx` | Sellorio's development status is visible inside its case study but absent from the homepage work index. | Show the existing plain-language status alongside project metadata. |
| P2 | `/`, `content/profile.ts` | About opens with career dates and promotion information already present in Experience. Its two following paragraphs provide the personal engineering perspective. | Start About with the personal paragraphs. Keep all career facts in Experience. |
| P2 | Shared footer | “Set in Geist, Newsreader and JetBrains Mono. Built with Next.js.” competes with the contact links and update date without helping the hiring reader. | Remove the colophon, retaining copyright, contact links and update date. |

Target-size interpretation follows [WCAG 2.2's minimum target guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), including spacing and inline-link exceptions. Code review also used the [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines).

## Implemented refinements

| Area | Before | After and reason |
| --- | --- | --- |
| Hero headline and introduction | Long headline and a technology-heavy introduction repeated the product domains. | Short headline, followed by identity, role, employer and product domains. Technical evidence stays in Work, Beyond, Experience and Skills. |
| Hero wrapping and spacing | Six headline lines at 375px; four elsewhere. Mobile CV sat on its own row. Large gap before metadata. | Balanced wrapping: three lines at 375px and two at 768, 1440 and 1920px. All three CTAs fit together at 375px. Smaller CTA and metadata gaps bring Selected work forward. |
| Header and theme control | Short text targets and a 32px theme target. | 44px targets for name, navigation and toggle; the existing icon size, theme behaviour and single-row mobile navigation are retained. |
| Hero and footer links | Small standalone controls, including a narrow footer CV target. | Minimum 44px height and width for the relevant controls, with original destinations and understated typography. |
| Work index | Status visible only inside the cases. | Existing status appears beside the dates, so Sellorio's ongoing work is clear before opening it. The distinctive CSS previews are retained. |
| Case-study navigation | Long reading path before contributions and decisions, with project navigation at the end. | Three opening links to What I did, Decisions and Outcome. Target headings accept focus and retain native scrolling. Previous/next project navigation remains. |
| Beyond the interface | Six entries, with detailed product stories repeating case-study information. | All six remain; three product summaries are shorter and link to their cases. Support SSO, support-desk and personal Onubad detail remains. No section reordering was needed. |
| Vidinfra processing detail | Full Go subtitle/chapter service explanation lived only on the homepage. | The full explanation now appears as a case-study contribution, retaining **Prototype**. AI panels remain **In review**. |
| Sellorio engineering and media detail | Homepage repeated transactional and tenant-isolation details; complete Remotion explanation was separate. | Backend detail remains in existing contributions and decisions. Full Remotion explanation joins the case as **Shipped**, while the platform remains **In progress**. |
| Practice links | Onubad external link only. | Related case links use the same tab; the existing Onubad destination and new-tab announcement remain, with a 44px-high link. |
| About | Career dates and promotion repeated Experience. | Begins with the personal engineering perspective. Dates, employer history and promotion remain in Experience. |
| Footer | Font/framework colophon alongside contacts and update date. | Colophon removed. Copyright, contacts, CV and update date remain. |
| Content model and regression coverage | No typed relationship from practice entries to cases. | Optional `relatedProject` uses existing project lookups. Tests verify valid public references, real link navigation, mobile targets and keyboard section jumps. |
| Project documentation | Earlier task context only; theme documentation specified a 32px target. | Design, README, context, plan and content questions describe the refinements and preserved publication statuses. |

No colours, fonts, overall grid, section order, schematic designs, route paths or dependencies changed. No new client component was added. Authentic screenshots were unavailable; the existing labelled diagrams and readable numbered HTML legends were more useful than invented product images.

## Hero copy: before and after

**Before headline**

> I build the interfaces of a video platform and a CDN, and increasingly the systems underneath them.

**After headline**

> I build interfaces that work beyond the screen.

**Before supporting copy**

> I’m Niadul Islam, a frontend developer at Tenbyte Cloud. Day to day that means React, Next.js and TypeScript: a video library, CDN analytics, auth that holds up across a stack of open tabs, a website in six languages. A growing share of my time goes to the other side of the API, in Go and Laravel services, Postgres and deploys, as I work toward product engineering.

**After supporting copy**

> I’m Niadul Islam, a frontend developer at Tenbyte Cloud. I work on video infrastructure, CDN products, and the services that keep them reliable.

The previous headline was technically specific, but its length weakened the opening composition. The shorter reference headline works because the next sentence names the actual domains and employer. “Services” preserves the broader engineering positioning without claiming a new job title or an unverified achievement. React, Next.js, TypeScript, Go, Laravel, Postgres, auth, localisation and deployment detail remains elsewhere on the site. CTA destinations remain `#work`, `#contact` and the existing CV PDF.

## Rendered comparison

These paired measurements use the same development visibility, including the two labelled draft notes, so their absence from normal production does not inflate the reported improvement.

| Width | Headline lines, before → after | Selected work starts, before → after | Homepage height, before → after |
| --- | --- | --- | --- |
| 375px | 6 → 3 | 1143 → 859px | 9234 → 8713px |
| 768px | 4 → 2 | 854 → 675px | 7099 → 6772px |
| 1440px | 4 → 2 | 914 → 735px | 6251 → 6066px |
| 1920px | 4 → 2 | 914 → 735px | 6251 → 6066px |

Beyond the interface's rendered word count drops from 322 to 272, including its new link labels. Its height changes from 1950 to 1924px at 375px, and from 1331 to 1418px on desktop. Comfortable link targets add height; the purpose is clearer summaries and access to detail, rather than a large reduction in page length. About loses only the repeated career paragraph, reducing its mobile height from 1376 to 1120px. Section gaps and the editorial rhythm remain.

## Files changed for this audit

- Hero and personal copy: `content/profile.ts`, `components/home/hero.tsx`.
- Shared controls and footer: `components/site-header.tsx`, `components/theme-toggle.tsx`, `components/site-footer.tsx`.
- Work status and case navigation: `components/work-index.tsx`, `app/work/[slug]/page.tsx`, `components/case-study.tsx`.
- Technical-story hierarchy: `content/practice.ts`, `content/projects.ts`, `content/types.ts`, `components/home/practice-list.tsx`.
- Regression coverage: `tests/content.spec.ts`, `tests/site.spec.ts`.
- Documentation: `UI-AUDIT.md`, `DESIGN.md`, `README.md`, `CLAUDE.md`, `CONTENT-TODO.md`, `PLAN.md`.

The working tree also contains earlier approved note, experience and About-photo changes. Those were preserved and verified; they are not attributed to this audit.

## Verification results

| Check actually run | Result |
| --- | --- |
| `pnpm verify` | Passed: ESLint, route type generation, TypeScript, production build, **54 Playwright tests** (20.1s test run). |
| `SHOW_DRAFTS=1 pnpm verify` | Passed: the same checks and **68 Playwright tests** (26.2s), including both draft-note routes and their generated social images. |
| `pnpm build` after the draft preview | Passed; normal production visibility restored, with draft notes excluded. |
| `pnpm check:content` | Exit 0: no `pending(...)` in public content; reports the two drafts. This does not resolve the editorial questions in `CONTENT-TODO.md`. |
| Rendered before/after checks | Forty combinations per phase: five routes × four target widths × two themes. HTTP 200, no horizontal overflow and no recorded page exceptions throughout. |
| Final production captures | All forty combinations also passed with normal public visibility. Local layout-shift measurements were zero throughout. |
| Axe 4.12.1 | Twenty scans before and twenty after at 375/1440px, across all five routes and both themes; **zero reported violations**. Some SVG/background contrast checks remain incomplete. |
| Browser interaction and regression tests | Skip link, mobile Work navigation, desktop hover/focus previews, static mobile previews, reduced-motion transitions, native case links, same-tab practice links, theme persistence and cross-tab sync passed. Internal links, CV, project navigation, 404s, sitemap and metadata passed. |
| JavaScript-disabled production browser | At 375px in dark/reduced-motion mode: homepage skip focus, mobile Work navigation and static plates passed; all four cases' three native links transferred focus to their headings. Draft notes remained absent. |
| Public external links | Tenbyte, Sellorio, Onubad and the GitHub profile returned HTTP 200. LinkedIn returned HTTP 999 to the automated request; it remains unverified rather than classified as broken. Email links were inspected without sending mail. |
| Independent code review | No critical, important or minor findings. |
| `git diff --check` | Passed. Changes remain uncommitted. |

Screenshots were captured and visually inspected across all target widths. The review covered hero wrapping, project plates, case-study openings, contributions/decisions, mobile diagrams and legends, About and footer in both themes. No visual regression requiring a design change was found.

## Accessibility and performance observations

The existing semantic structure, skip link, text status labels, visible focus outlines and reduced-motion CSS are sound. New section anchors transfer keyboard focus to the heading as well as scrolling. Standalone header/hero/footer targets now measure at least 44×44px at 375px. Body/metadata colour tokens were retained. Recalculated muted-text contrast is 5.14:1 on the light canvas, 4.78:1 on the light panel, 6.66:1 on the dark canvas and 6.16:1 on the dark panel. Fine schematic lines are supplementary to readable captions and numbered HTML legends.

Axe's incomplete contrast results for SVG text, decorative arrows and overlapping backgrounds are not treated as passes. This audit includes manual browser inspection, not a full assistive-technology or WCAG certification. Real-visitor performance data and screen-reader testing were not available in this environment.

Production browser measurements are recorded in `.playwright-mcp/ui-audit/production/measurements.json`. All forty observations reported CLS **0**; observed LCP ranged from **44 to 956ms**. The homepage ranged from **812–956ms** at 375–768px and **88–108ms** at 1440–1920px. These are single, unthrottled local Chrome observations per combination, with cache reuse between routes within each context. They are not field Core Web Vitals, a repeatable benchmark or a before/after speed comparison; INP was not measured. The original architecture remains static, with self-hosted fonts, intrinsic image dimensions, CSS previews and only the existing theme client component; no runtime dependency was added. Speed Insights requests are unavailable under local `next start`, as documented by the existing test configuration.

## Screenshot evidence

Artifacts are local and gitignored. The paired `before`/`after` images include draft-note previews; `production` shows the normal public build. Each directory contains complete light/dark captures for all four widths, with full-page, top, footer and section/figure views. `capture.py`, `accessibility.mjs`, `interactions.mjs` and JSON results are retained under `.playwright-mcp/ui-audit/` for inspection.

| Homepage width | Before | After, matched preview | Final production |
| --- | --- | --- | --- |
| 375px | [Before](.playwright-mcp/ui-audit/before/home-375-light-top.png) | [After](.playwright-mcp/ui-audit/after/home-375-light-top.png) | [Production](.playwright-mcp/ui-audit/production/home-375-light-top.png) |
| 768px | [Before](.playwright-mcp/ui-audit/before/home-768-light-top.png) | [After](.playwright-mcp/ui-audit/after/home-768-light-top.png) | [Production](.playwright-mcp/ui-audit/production/home-768-light-top.png) |
| 1440px | [Before](.playwright-mcp/ui-audit/before/home-1440-light-top.png) | [After](.playwright-mcp/ui-audit/after/home-1440-light-top.png) | [Production](.playwright-mcp/ui-audit/production/home-1440-light-top.png) |
| 1920px | [Before](.playwright-mcp/ui-audit/before/home-1920-light-top.png) | [After](.playwright-mcp/ui-audit/after/home-1920-light-top.png) | [Production](.playwright-mcp/ui-audit/production/home-1920-light-top.png) |

| Final case study, full page | 375px | 768px | 1440px | 1920px |
| --- | --- | --- | --- | --- |
| Vidinfra | [Mobile](.playwright-mcp/ui-audit/production/vidinfra-375-light-full.png) | [Tablet](.playwright-mcp/ui-audit/production/vidinfra-768-light-full.png) | [Desktop](.playwright-mcp/ui-audit/production/vidinfra-1440-light-full.png) | [Wide](.playwright-mcp/ui-audit/production/vidinfra-1920-light-full.png) |
| Tenbyte CDN | [Mobile](.playwright-mcp/ui-audit/production/tenbyte-cdn-375-light-full.png) | [Tablet](.playwright-mcp/ui-audit/production/tenbyte-cdn-768-light-full.png) | [Desktop](.playwright-mcp/ui-audit/production/tenbyte-cdn-1440-light-full.png) | [Wide](.playwright-mcp/ui-audit/production/tenbyte-cdn-1920-light-full.png) |
| Tenbyte website | [Mobile](.playwright-mcp/ui-audit/production/tenbyte-website-375-light-full.png) | [Tablet](.playwright-mcp/ui-audit/production/tenbyte-website-768-light-full.png) | [Desktop](.playwright-mcp/ui-audit/production/tenbyte-website-1440-light-full.png) | [Wide](.playwright-mcp/ui-audit/production/tenbyte-website-1920-light-full.png) |
| Sellorio | [Mobile](.playwright-mcp/ui-audit/production/sellorio-375-light-full.png) | [Tablet](.playwright-mcp/ui-audit/production/sellorio-768-light-full.png) | [Desktop](.playwright-mcp/ui-audit/production/sellorio-1440-light-full.png) | [Wide](.playwright-mcp/ui-audit/production/sellorio-1920-light-full.png) |

Dark variants use `-dark-` in the same filenames. Examples: [wide homepage](.playwright-mcp/ui-audit/production/home-1920-dark-top.png), [Vidinfra mobile diagram](.playwright-mcp/ui-audit/production/vidinfra-375-dark-figure.png), [mobile footer](.playwright-mcp/ui-audit/production/home-375-dark-footer.png).

## Remaining editorial questions

- Tenbyte start month: the site/CV use July 2025; LinkedIn says June. No date was guessed or changed.
- Confirm current delivery statuses and role wording in the existing cases. Prototype and in-review labels were preserved during relocation; no outcome or metric was invented.
- Employer comfort with the existing technical explanations, particularly support SSO and session/cache handling, remains an owner question. No internal endpoints, hostnames, customer data or new private implementation details were added.
- Sellorio attribution remains “Employer product” pending clarification of Tenbyte/ViteLoop naming.
- Authentic product screenshots still need permission. Labelled schematics remain.
- Both engineering notes remain drafts pending the previously required text approval and publication dates.
- LinkedIn's destination needs a normal human-browser check; automated verification was blocked by its HTTP 999 response.

The complete factual checklist is in [`CONTENT-TODO.md`](./CONTENT-TODO.md). No commit, push or deployment is included in this audit.

## Owner-directed follow-ups

The screenshots and measurements above record the original audit. Two subsequent owner requests refined the working tree further:

| Before | After |
| --- | --- |
| Nexail had no responsibility summary. | Two owner-confirmed bullets describe building the company website and implementing responsive layouts. Recorded in `content/profile.ts` and `CONTENT-TODO.md`. Screenshots are in `.playwright-mcp/nexail/`. |
| The hero photo occupied three desktop grid columns, leaving a 144px visual gap at 1440/1920px. | Its dedicated row fits the photo width and uses a 32px desktop gap. Introduction/CTA width is capped at 640px. Tablet gap stays 24px, its image now renders as a full 160px square, and the mobile stack retains its prior geometry. Implemented in `components/home/hero.tsx`; `DESIGN.md` describes the spacing. |

The hero was captured before and after at 375, 768, 1024, 1440 and 1920px in both themes, with no overflow. Updated evidence: [desktop before](.playwright-mcp/hero-gap/before/1440-dark.png), [desktop after](.playwright-mcp/hero-gap/after/1440-dark.png), [tablet](.playwright-mcp/hero-gap/after/768-light.png), [mobile](.playwright-mcp/hero-gap/after/375-dark.png). Measurements are in `.playwright-mcp/hero-gap/{before,after}/measurements.json`.
