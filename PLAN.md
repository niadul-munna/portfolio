# Portfolio handoff — session complete, 2026-10-14

The owner ended this implementation session. There is **no active implementation task**. The previously approved notes infrastructure, About image cleanup, UI/UX audit and follow-up refinements are complete. Do not restart the old Task A/Task B build instructions or publish drafts without a new request.

## Review follow-ups — 2026-10-15 (committed and pushed)

The owner asked for a site review, then for its suggestions to be implemented. The owner approved committing and pushing them on 2026-10-15, one file per commit, without a co-author trailer. Check `git log` for the resulting commits.

- **Hero:** facts lead with "Open to: Frontend and product engineering roles" (`profile.openTo`, the roles already named in Contact) instead of repeating the role. CTAs are sentence case, "Selected work ↓" and "Get in touch ↓".
- **Start date:** `tenbyteStart` in `content/profile.ts` feeds the hero and Experience. Projects still write their periods and prose out separately. The June/July question stays open.
- **Header:** CV link (PDF, new tab). Phones show Work, Contact and CV on one row at 375/390px; About and Experience join from 640px. 320px still wraps to two rows, as before.
- **Work index:** desktop plates sit beside their own row (rows 1–2 top-aligned, last two bottom-aligned), still pure CSS. Below 768px the drawing is 70% wide; the homepage work section went from 2,349px to about 2,035px tall at 390px.
- **Beyond:** single hairline above the disclosure (`-mt-px`), typographic ↓/↑ marker instead of the browser triangle, and an intro without a hard-coded count: "Services, tools and pipelines, each with its own status. Stories that belong to a case study are grouped below." The owner should confirm this wording.
- **Skills:** Motion (Framer Motion) added to Interface at the owner's request. No animation library was installed.
- **Notes:** both set to `visibility: "public"` and dated 2026-10-15 at the owner's request. Published with the 2026-10-15 push.
- **Fonts:** Schibsted Grotesk replaced Geist and IBM Plex Mono replaced JetBrains Mono (owner-approved after a side-by-side render; Share Tech was rejected). Static TTFs and OFL licences for Open Graph images are in `assets/fonts/`; the `geist` package was removed. A stale Turbopack cache first produced CSS still pointing at Geist; deleting `.next/` and rebuilding fixed it.
- **Not done:** a clearer hero photo needs an owner-supplied image.
- **Verification:** `pnpm verify` passed on a clean `.next/` after the font change (lint, typecheck, build, 69 Playwright tests). `pnpm check:content` exit 0. Production screenshots were checked at 320, 375, 390, 640, 768 and 1440px, including desktop hover on every row and the disclosure open and closed.

## Read this context first

| File | Purpose |
| --- | --- |
| `AGENTS.md` | Next.js requirements and the repository context index. Preserve its managed block. |
| `CLAUDE.md` | Stack, source layout, content/design constraints, verification and Git preferences. |
| `PLAN.md` | Current completion snapshot and next owner decisions. |
| `DESIGN.md` | Accepted visual system and final hero-photo treatment. |
| `README.md` | Commands, architecture, content editing and deployment. |
| `CONTENT-TODO.md` | Detailed factual/publication questions. Unchecked items require confirmation, not guesses. |
| `UI-AUDIT.md` | Prioritized findings, copy comparisons, browser evidence and verification limits. |

## Completed work

- **Engineering notes infrastructure:** typed body blocks, `/notes/[slug]`, article metadata, `BlogPosting` JSON-LD, related case links, social images and draft-aware homepage/sitemap visibility. Two complete posts are still drafts.
- **About image cleanup:** removed `assets/portrait.jpg` and its rendering. The real `assets/avatar.jpg` hero photo remains. About now contains personal paragraphs and skills; career dates stay in Experience.
- **Profile and experience:** Dhaka, Bangladesh; Frontend Developer promotion in May 2026; Nexail Ltd, Dec 2024–Jul 2025, full-time remote. Nexail has owner-confirmed bullets about building the company website and implementing responsive layouts.
- **Hero:** “I build interfaces that work beyond the screen.” The approved supporting paragraph names the frontend role, Tenbyte Cloud, video infrastructure, CDN platforms and reliable product implementation. Selected Work and Get in Touch retain their `#work` and `#contact` destinations; the CV remains in Contact and the footer.
- **Hero spacing:** photo-to-text gap is 24px on tablet and 32px on desktop, with a 640px maximum text/CTA width. Image sizes are 112/160/192px on mobile/tablet/desktop.
- **Accepted photo treatment:** left-aligned at every width, square with 3px corners. The owner tried a centered circular mobile photo, rejected it and requested a revert. That experiment is fully reverted; retain the tighter desktop gap.
- **Homepage hierarchy:** all six Beyond the interface entries remain. Three summaries link to their cases; complete subtitle-service and Remotion explanations moved to Vidinfra and Sellorio without changing statuses. Work rows show project status. Repeated About career prose and the font/framework footer colophon were removed.
- **Beyond the interface grouping (2026-10-15):** three independent stories remain visible; the three related project summaries are available in a native disclosure with links to their full case studies. No story or status was removed.
- **Usability:** 44px standalone header/hero/footer targets; native case links to What I did, Decisions and Outcome, with focus transfer to headings. Existing CSS previews, reduced motion and theme behaviour remain.
- **X profile:** `https://x.com/Niadul_Munna`, supplied by the owner, appears in Contact, the footer and Person `sameAs` data.
- No dependencies, new client components, route replacements, invented metrics or fake product screenshots were added. Keep the existing editorial design.

## Git and deployment snapshot

- Branch: `main`; remote: `https://github.com/niadul-munna/portfolio.git`.
- Application changes were committed and pushed as **33 single-file commits** after `15c1783`.
- First batch: 31 commits, ending at `b7285b4`.
- X update: `4e713fe` — Add X profile to portfolio contact channels; `b5785f3` — Record owner-confirmed X profile link.
- Application tip at handoff: **`b5785f3`**, confirmed equal to remote `main`.
- Vercel reported **Deployment has completed** for that tip. Live homepage: `https://niadul.vercel.app/`; a read-only check returned HTTP 200 and found the two rendered X links.
- The application working tree was clean before the owner requested this final documentation update. The owner then authorized six one-file documentation commits and a push. Inspect `git status` and `git log`; do not assume local changes are already remote.
- Owner preference persists: **one file per commit**, including additions/deletions; meaningful messages; no `Co-Authored-By` trailer. Commit and push each require explicit authorization for the new work. Earlier approvals applied to the completed batches.
- Authorized pushes use `git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push origin main`. Do not alter global Git configuration or force-push.

## Verification actually completed

| Check | Latest relevant result |
| --- | --- |
| `pnpm verify` after adding X | ESLint, route type generation, TypeScript, production build and **54 Playwright tests passed**; test run 24.6s. |
| `SHOW_DRAFTS=1 pnpm verify` before the X-only update | The same checks and **68 tests passed**, including both draft notes and social images; test run 27.7s. |
| `pnpm check:content` | Exit 0; no pending public facts. Reports the two drafts. Does not resolve the editorial checklist. |
| `git diff --check` before publication | Passed. |
| UI audit | Homepage and all four cases at 375, 768, 1440 and 1920px, light/dark; before/after/production captures showed no overflow. |
| Follow-up hero/X checks | Hero checked at 375, 768, 1024, 1440 and 1920px; X links, new-tab safety, Person metadata and overflow checked at 320, 375, 768, 1440 and 1920px, both themes. |
| Accessibility | Twenty axe scans before and twenty after the main audit: zero reported violations; some SVG/background contrast checks incomplete. Keyboard, reduced motion, theme persistence/sync and native section links passed. Navigation also checked with JavaScript disabled. |
| Performance | Forty local production observations reported CLS 0 and LCP 44–956ms. Unthrottled single samples, not field Core Web Vitals or a before/after speed benchmark. INP and full screen-reader testing were not measured. |

## Local environment and evidence

At handoff, `pnpm dev` was running on port 3000 and returned HTTP 200. Check current ports before starting another server. Stop development before production builds/verification, and restart afterwards; see README's shared `.next` warning.

Existing tests use system Google Chrome locally (`channel: "chrome"`) and production port 3100. Browser work used available Python Playwright and `agent-browser`; discover tools again in a new environment rather than assuming a browser MCP exists. No extra package was installed for this work.

Local, gitignored artifacts:

- `.playwright-mcp/ui-audit/`: original audit before/after/production screenshots, axe results, measurements and scripts.
- `.playwright-mcp/verification/playwright/`: original About and draft-note screenshots.
- `.playwright-mcp/notes-review.md`: local note-review aid; the authoritative text is `content/notes.ts`.
- `.playwright-mcp/nexail/`: confirmed Nexail summary captures.
- `.playwright-mcp/hero-gap/after/`: accepted tighter-gap photo layout. `circular-preview/` is the rejected trial, not the accepted baseline.
- `.playwright-mcp/x-profile/`: X contact/footer captures.

These artifacts will be absent from a fresh clone. Read the committed text reports and recreate screenshots with available browser tools when needed; their absence does not mean the prior tests were never run.

## Latest targeted audit — 2026-10-15

- The shorter hero headline remains the stronger fit: three lines at 375px and two at 768, 1440 and 1920px. The screen-reader heading identifies Niadul and his role; the owner-approved supporting paragraph supplies employer and product context. A later copy refinement retains the headline and uses two hero CTAs.
- The three standalone Beyond stories remain visible; related summaries are in a native disclosure. All six are retained, and all three linked project summaries open by keyboard. The About illustration was already removed, so no portrait change was needed.
- All four case studies were visually checked at 375, 768, 1440 and 1920px. Existing schematics and explicit labels remain; no authentic, approved product screenshots were available.
- Production checks across five routes and four widths returned HTTP 200, no page errors or horizontal overflow. Local layout-shift observations were 0. The optimized hero image loaded with intrinsic dimensions and responsive `/_next/image` sources. Reduced-motion plate duration is effectively zero.
- Four axe 4.14 scans (375/1440px, light/dark) reported zero violations. Axe left color-contrast checks incomplete for short glyphs and SVG schematic text; the normal text uses the existing contrast-checked design tokens.
- `pnpm verify`: lint, type generation, TypeScript, production build and **55 Playwright tests passed**. `pnpm check:content` found no pending public facts; `git diff --check` passed.
- Current screenshots and measurements are gitignored under `.playwright-mcp/current-ui-audit/`; they are local evidence, not tracked assets. The latest task changes remain local and uncommitted unless the owner separately authorizes a commit.

## Remaining owner decisions — no automatic next task

1. **Review the two notes before publishing:**
   - `when-two-numbers-disagree-check-the-time-zone` (related: `tenbyte-cdn`).
   - `one-url-two-responses-caching-nextjs-behind-a-cdn` (related: `tenbyte-website`).
   Set to `visibility: "public"` and dated 2026-10-15 and published on 2026-10-15 at the owner's request (see the review follow-ups above). Keep factual claims grounded in existing case studies; no unconfirmed performance numbers or company code.
2. **Confirm existing factual questions:** June versus July 2025 Tenbyte start month (site/CV use July); delivery statuses and role wording; employer comfort with technical detail; Tenbyte/ViteLoop attribution for Sellorio. See `CONTENT-TODO.md`; do not resolve these by inference.
3. **Optional assets and outreach:** permission-cleared real product screenshots, custom domain, Search Console verification/sitemap submission, linking the portfolio from social profiles and pinning Onubad. These need an owner request, account access or supplied assets.
4. **Optional later work:** third note about the cross-tab refresh-token race, exact approved recommendations, Vercel Web Analytics, or making the public `CONTENT-TODO.md` private. Do not add dependencies, testimonials, telemetry or remove tracked documentation as an unsolicited follow-up.

When a new request arrives, first read the current files and Git status, then work only on that request while retaining the accepted design and factual safeguards.
