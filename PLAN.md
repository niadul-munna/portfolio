# Plan: next improvements (written 2026-10-14)

Read `CLAUDE.md` first: stack, content rules, design rules, git rules. The owner approved Task A and Task B. Do them in that order.

Definition of done for every task:
- `pnpm verify` is green.
- A visual check at 375, 768 and 1440 (the Playwright MCP can save screenshots to `.playwright-mcp/`, which is gitignored).
- Ask before committing and again before pushing. No co-author trailer.
- Push with `git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push origin main`. Vercel deploys `main` to https://niadul.vercel.app.

## Current status (2026-10-14)

- Task A is implemented, with two draft posts awaiting the owner's text approval before publication.
- Task B is implemented: the About illustration is removed and the real hero photo is retained.
- Profile and experience updates include Dhaka, the May 2026 promotion and Nexail Ltd. The outdated experience note in `CONTENT-TODO.md` is corrected.
- The latest full `verify` script passed in normal production mode (54 tests) and with `SHOW_DRAFTS=1` (68 tests), following the UI/UX refinements. Both used `pnpm verify` directly in the current environment.
- `pnpm check:content` passed: public content has no pending facts.
- About and both note pages were visually reviewed at 375, 768 and 1440px in light and dark themes. Screenshots are in `.playwright-mcp/verification/playwright/`; no layout issues were found.
- The subsequent UI/UX audit is implemented and verified. It retains the editorial design, shortens the hero, links concise practice summaries to complete case-study detail, adds native case section navigation, displays project status in the work index, enlarges standalone controls and removes the footer colophon. All five public pages were captured at 375, 768, 1440 and 1920px in both themes before and after. Findings, file scope, screenshots and verification limits are in [`UI-AUDIT.md`](./UI-AUDIT.md).
- The normal production build is restored, excluding the draft notes. Next: review the two posts in `.playwright-mcp/notes-review.md`, approve their text and set publication dates before making them public. Commit and push approvals remain separate.

---

## Task A: Engineering notes (priority 1)

**Goal:** publish two short posts (600–900 words each) at `/notes/<slug>`. The homepage "Engineering notes" section already appears once `content/notes.ts` has entries (see `app/page.tsx`).

### Build

1. **Content model** in `content/types.ts`. Replace the current `Note` type (`title, date, summary, href`) with:
   ```ts
   type NoteBlock =
     | { kind: "p"; text: string }            // supports `backtick` code via RichText
     | { kind: "h2"; text: string }
     | { kind: "list"; items: string[] }
     | { kind: "code"; language: string; code: string };
   type Note = {
     slug: string; visibility: Visibility; title: string;
     date: string;            // ISO, e.g. "2026-10-20"
     summary: string;         // one or two sentences; also the meta description
     standfirst: string;      // Newsreader intro paragraph
     relatedProject?: string; // project slug, linked at the end
     body: NoteBlock[];
   };
   ```
   Use typed TS, not MDX, which would mean new dependencies. Code blocks are plain `<pre><code>` in JetBrains Mono, with no syntax-highlighting library.
2. **Visibility:** add `visibleNotes` and `getNote(slug)` in `lib/site.ts`, mirroring the projects helpers. New notes start as `visibility: "draft"` until the owner approves the text.
3. **Route:** `app/notes/[slug]/page.tsx`, with `generateStaticParams`, `export const dynamicParams = false` and `generateMetadata` (canonical `/notes/<slug>`, `openGraph.type: "article"`, `publishedTime`). Layout:
   - date and "Note" in the left spine (columns 1–3, mono);
   - title (`text-title`);
   - standfirst (Newsreader, `text-standfirst`);
   - body in columns 4–10, max 66ch, Geist `text-body`;
   - `h2` as `text-heading`;
   - a link back to the related case study, and a "← Selected work" link at the top like the case studies.
4. **OG image:** `app/notes/[slug]/opengraph-image.tsx` plus `twitter-image.tsx`, reusing `OgFrame` and `OgText` from `lib/og.tsx`. Keep the Satori gotchas in `CLAUDE.md` in mind.
5. **JSON-LD:** a `BlogPosting` on each note: headline, datePublished, author (Person "Niadul Islam", url siteUrl), and mainEntityOfPage. Use `components/json-ld.tsx`.
6. **Homepage:** the notes list in `app/page.tsx` currently links to `note.href`. Change it to `/notes/${note.slug}` and use `visibleNotes`.
7. **Sitemap:** add public notes to `app/sitemap.ts`.
8. **Tests:**
   - add note pages to the `pages` list in `tests/site.spec.ts`, which covers overflow at five widths and the h1/canonical/console checks;
   - in the sitemap test, expect public notes and exclude drafts;
   - in `tests/content.spec.ts`, check that every note has a non-empty body and unique slugs (the pending-facts test already walks public content; add notes to it).
9. **Docs:** add a "Notes" section to `DESIGN.md`, and add `content/notes.ts` to the README's content table.

### Write: the two notes

Write in the owner's voice: first person, concrete, plain, with no clichés. The banned-phrase test applies. **Use only facts already in `content/projects.ts`.** Anything new must be confirmed by the owner or marked `pending(...)` (the note stays a draft until it's resolved). No internal hostnames, endpoints, customer names or vendors except Cloudflare.

**Note 1:** "When two numbers disagree, check the time zone" (related: `tenbyte-cdn`)
- Symptom: CDN analytics totals came in lower than the backend's own figures.
- Cause: the date picker built ranges at local midnight, while the backend groups traffic into whole UTC days. In Bangladesh (UTC+6), a UTC day starts at 06:00 local time, so every range clipped a partial day at each end.
- Fix: request whole UTC days. Add a display time-zone toggle that changes labels only and stays out of the TanStack Query key, so switching it doesn't refetch. The same alignment went into the WAF analytics.
- Trade-off: times are formatted at render time everywhere.
- Lesson: check the time zone of both numbers first.
- An optional small code block: a query key that includes the UTC range but not the display time zone. Keep it illustrative, not copied from company code.
- Don't state "~10% low". It's in commit history but unconfirmed for publication. Ask the owner.

**Note 2:** "One URL, two responses: caching Next.js behind a CDN" (related: `tenbyte-website`)
- Next.js serves both HTML and an RSC payload from the same URL. A shared cache keyed on the URL alone can serve a crawler the RSC payload.
- Fix: correct `Cache-Control`/`Vary` handling so RSC payloads stay out of shared caches.
- Second bug: English is unprefixed, so its cache key differs from the other five locales, and edits to English pages weren't purged. Fix: purge all six locales on save.
- Smaller ones: missing static files were caught by the `[locale]` route and returned a slow 500, now a 404. A forced-dynamic setting had quietly disabled caching on the blog index.
- Lesson: test caching with the CDN in the loop.
- No response-time numbers unless the owner confirms them.

A possible third note later: the refresh-token race across tabs (related: `vidinfra`).

---

## Task B: One image style (priority 2)

**Decision (the owner agreed to the recommendation):** keep the real photo in the hero (`assets/avatar.jpg`) and remove the cartoon illustration from About.

1. In `components/home/about.tsx`, remove the `<figure>` and the `portrait` import. Lay About out as paragraphs in columns 4–9 (`lg:col-span-6 lg:col-start-4`, `md:col-span-6`) and skills in columns 10–12 (`lg:col-span-3`, full width below md).
2. Delete `assets/portrait.jpg`, and `profile.portrait` in `content/profile.ts`.
3. Update the docs: the "Photo and portrait" section of `DESIGN.md` (hero photo only), the assets table in the README, and the `assets/` line in `CLAUDE.md`.
4. Visual check of About at 375, 768 and 1440 in light and dark, then `pnpm verify`.

---

## Backlog (owner actions or later)

- **Screenshots** (owner provides, with permission): one per case study, with customer data and hostnames cropped out. Add to `media` as `{ kind: "image", src: "/work/<slug>/x.png", alt, width, height, caption }`, with the file in `public/work/<slug>/`.
- **Review the refined hero and About in the owner's own words.** The UI/UX audit shortened the hero and removed repeated career dates from About; full before/after copy and reasoning are in `UI-AUDIT.md`.
- **Custom domain**, e.g. `niadul.dev`: add it in Vercel → Project → Domains, then redeploy. Canonicals follow `VERCEL_PROJECT_PRODUCTION_URL` automatically.
- **Google Search Console:** verify the site and submit `https://niadul.vercel.app/sitemap.xml` (owner).
- **Link the site** from LinkedIn, the GitHub profile and its README; pin `onubad` on GitHub (owner).
- **`CONTENT-TODO.md` is public** in the repo, with internal notes such as the ViteLoop question and Tenbyte sign-off. To remove it, run `git rm --cached CONTENT-TODO.md`, add it to `.gitignore`, and update the references in `CLAUDE.md`, `README.md` and `DESIGN.md`. Needs approval.
- **Tenbyte start month:** LinkedIn says Jun 2025; the site and CV say Jul 2025. Confirm with the owner.
- **Sellorio attribution:** Tenbyte or ViteLoop. Update `context` in `content/projects.ts`.
- **Recommendations** only with the person's permission, quoted exactly. Never write placeholders.
- **Optional Vercel Web Analytics:** `pnpm add @vercel/analytics`, then `import { Analytics } from "@vercel/analytics/next"` in `app/layout.tsx` next to `<SpeedInsights />`. Tests already ignore `/_vercel/*`.
