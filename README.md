# Niadul Islam — portfolio

Personal site and case studies. Next.js App Router, TypeScript (strict), Tailwind CSS v4. Every page is statically generated. The only client component is the theme toggle.

- Agent entry point: [`AGENTS.md`](./AGENTS.md), then [`CLAUDE.md`](./CLAUDE.md) and the completed-session handoff in [`PLAN.md`](./PLAN.md).
- Design decisions: [`DESIGN.md`](./DESIGN.md)
- Facts and assets still to confirm: [`CONTENT-TODO.md`](./CONTENT-TODO.md)
- UI/UX audit, responsive evidence and refinement verification: [`UI-AUDIT.md`](./UI-AUDIT.md)

## Getting started

Requires Node 20.9+ (developed on Node 24) and pnpm.

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

Draft content is visible in development with a "Draft, not published" label.

## Scripts

| Command              | What it does                                                          |
| -------------------- | --------------------------------------------------------------------- |
| `pnpm dev`           | Development server                                                    |
| `pnpm build`         | Production build; drafts are excluded                                 |
| `pnpm start`         | Serve the production build                                            |
| `pnpm lint`          | ESLint (Next.js core-web-vitals and TypeScript rules)                 |
| `pnpm typecheck`     | Generate route types, then `tsc --noEmit`                             |
| `pnpm test`          | Playwright tests against the production build (run `pnpm build` first) |
| `pnpm verify`        | lint → typecheck → build → test                                       |
| `pnpm check:content` | List unconfirmed facts and drafts; exits 1 for pending public facts    |

Stop `pnpm dev` before running `pnpm build` or `pnpm verify`, or restart it afterwards. They share `.next/`, and once a dev server kept serving stale CSS after a build ran alongside it.

## Editing content

All copy lives in typed files in `content/`; components in `components/` only render it.

| File                  | Contains                                                       |
| --------------------- | -------------------------------------------------------------- |
| `content/profile.ts`  | Name, statement, intro, About, contact channels, experience, skills |
| `content/projects.ts` | Selected work and the full case study for each project         |
| `content/practice.ts` | "Beyond the interface" entries                                 |
| `content/notes.ts`    | Engineering notes: draft/public visibility, metadata and typed body blocks |
| `content/types.ts`    | The content model                                              |
| `assets/avatar.jpg`   | Hero photo (from the GitHub avatar), imported statically       |
| `public/niadul-islam-munna-cv.pdf` | The CV linked from the hero, Contact and footer. Replace the file to update it; keep the name or change `profile.cv` and the CV channel |

Conventions:

- **Status on every claim.** Projects, contributions, outcomes and practice entries each carry a `status`: `shipped`, `in-review`, `in-progress`, `prototype`, `concept` or `personal`. It is always shown in words.
- **Unconfirmed facts.** Write `pending("what is missing")` instead of guessing. It renders as a dashed marker and is listed by `pnpm check:content`.
- **Drafts.** `visibility: "draft"` shows an item in development only. Production builds leave it out of the page, static params and the sitemap. Use `SHOW_DRAFTS=1 pnpm build` to preview drafts in a production build.
- **Inline code.** Wrap identifiers in backticks inside content strings, e.g. "`beforeLoad` checks".
- **Notes.** Add a unique slug, ISO date, summary, standfirst and body blocks (`p`, `h2`, `list`, `code`) in `content/notes.ts`. An optional `relatedProject` links to a case study. Keep new writing as `visibility: "draft"` until its text is approved; set the date to the publication date when publishing. Notes render at `/notes/<slug>`, and the homepage section appears when there are visible notes. Preview with `SHOW_DRAFTS=1 pnpm build`, then `SHOW_DRAFTS=1 pnpm test` to check the note pages as well as the public site.
- **Images.** Each project's first `media` item is its plate. Schematics are drawn in `components/schematics.tsx`. For a cleared screenshot, add `{ kind: "image", src: "/work/<slug>/name.png", alt, width, height, caption }` and put the file in `public/`.
- **Order.** The order of `projects` is the order of the index and of the previous/next links.
- **Related practice.** Set a practice entry's optional `relatedProject` to a project slug to link its short homepage summary to the complete case study. Public entries must reference public projects.

## Configuration

| Variable               | Purpose                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, e.g. `https://example.com`. Used for canonical URLs, Open Graph, sitemap and robots. Optional on Vercel, which falls back to the project's production domain (`VERCEL_PROJECT_PRODUCTION_URL`). **Required anywhere else.** |
| `SHOW_DRAFTS`          | Set to `1` to include drafts in a production build.                                                     |

## Deployment

The output is fully static apart from Next's image optimiser, so it runs anywhere Next.js runs.

**Vercel:** import the repository and deploy. Canonical URLs use the project's production domain automatically; set `NEXT_PUBLIC_SITE_URL` only to override it. Per-deployment URLs sit behind Vercel's Deployment Protection by default; share the production domain.

**Self-hosted Node (Linux, PM2, Nginx):**

```bash
pnpm install --frozen-lockfile
NEXT_PUBLIC_SITE_URL=https://example.com pnpm build
pm2 start "pnpm start --port 3000" --name portfolio
```

Point Nginx at `127.0.0.1:3000`. Requests under `/_next/static/` are content-hashed, so they can be cached for a year as `immutable`.

Before deploying, run `pnpm check:content`. It should print nothing pending.

## Testing

`pnpm test` runs Playwright (`tests/`) against `pnpm start` on port 3100. It checks:

- no horizontal overflow at 320, 375, 768, 1440 and 1920px on every page;
- one `h1`, a canonical link, an `og:image` and no console errors on every page;
- every internal link resolves; unknown slugs and drafts return 404; the sitemap excludes drafts;
- Person JSON-LD on the home page;
- note visibility, article metadata, BlogPosting JSON-LD and generated social images (including drafts when testing a `SHOW_DRAFTS=1` build);
- the work index: hover and keyboard focus reveal the right plate on desktop, plates are static on mobile, and transitions are removed under reduced motion;
- Beyond the interface: three independent stories stay visible, related case-study summaries remain available in a native disclosure, and the disclosure opens with the keyboard;
- the skip link;
- keyboard section jumps on every case study, same-tab practice links, and 44px mobile targets in the header, hero and footer;
- the theme toggle: switching, persistence across reloads, clearing back to the system theme, and sync between open tabs;
- content guards: no cliché phrases, unique slugs, valid practice references, every case study section filled.

Locally the tests use the installed Google Chrome (`channel: "chrome"`) to avoid a browser download. In CI (`CI=1`), run `pnpm exec playwright install chromium` first.

## Structure

```
app/
  layout.tsx              fonts, metadata, header and footer
  page.tsx                home page and Person JSON-LD
  work/[slug]/page.tsx    case studies (static, unknown slugs 404)
  notes/[slug]/page.tsx   engineering notes (static, drafts excluded by default)
  opengraph-image.tsx     Open Graph images, set in Geist
  sitemap.ts, robots.ts, icon.svg, not-found.tsx
  globals.css             tokens, type scale, base styles, work-index CSS
components/               presentation only
content/                  all copy and data
lib/site.ts               visibility, site URL, project lookups
lib/og.tsx                shared Open Graph frame and fonts
assets/                   hero photo imported by the component
scripts/check-content.mjs pending and draft report
tests/                    Playwright tests
```

## Notes on choices

- **Cache Components are off.** Next 16 enables them in new apps. All content here is known at build time, and classic static generation with `dynamicParams = false` returns a real 404 for unknown slugs, which Cache Components does not support.
- **Dependencies:** `next`, `react`, `react-dom`, `geist` (the font, plus TTFs for Open Graph images), and `@vercel/speed-insights` (real-visitor Core Web Vitals on Vercel; enable it under Project → Speed Insights). Newsreader and JetBrains Mono come through `next/font/google` and are self-hosted at build time. There is no icon library; the arrows are typographic.
