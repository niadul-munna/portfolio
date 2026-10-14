# Niadul Islam — portfolio

Personal site and case studies. Next.js App Router, TypeScript (strict), Tailwind CSS v4. Every page is statically generated. The only client component is the theme toggle.

- Design decisions: [`DESIGN.md`](./DESIGN.md)
- Facts and assets still to confirm: [`CONTENT-TODO.md`](./CONTENT-TODO.md)

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
| `pnpm check:content` | List unconfirmed facts and drafts; exits 1 while any are pending      |

Stop `pnpm dev` before running `pnpm build` or `pnpm verify`, or restart it afterwards. They share `.next/`, and once a dev server kept serving stale CSS after a build ran alongside it.

## Editing content

All copy lives in typed files in `content/`; components in `components/` only render it.

| File                  | Contains                                                       |
| --------------------- | -------------------------------------------------------------- |
| `content/profile.ts`  | Name, statement, intro, About, contact channels, experience, skills |
| `content/projects.ts` | Selected work and the full case study for each project         |
| `content/practice.ts` | "Beyond the interface" entries                                 |
| `content/notes.ts`    | Engineering notes (the section is hidden while this is empty)  |
| `content/types.ts`    | The content model                                              |
| `assets/avatar.jpg`   | Hero photo (from the GitHub avatar), imported statically       |
| `assets/portrait.jpg` | About illustration, imported statically                        |
| `public/niadul-islam-munna-cv.pdf` | The CV linked from the hero, Contact and footer. Replace the file to update it; keep the name or change `profile.cv` and the CV channel |

Conventions:

- **Status on every claim.** Projects, contributions, outcomes and practice entries each carry a `status`: `shipped`, `in-review`, `in-progress`, `prototype`, `concept` or `personal`. It is always shown in words.
- **Unconfirmed facts.** Write `pending("what is missing")` instead of guessing. It renders as a dashed marker and is listed by `pnpm check:content`.
- **Drafts.** `visibility: "draft"` shows an item in development only. Production builds leave it out of the page, static params and the sitemap. Use `SHOW_DRAFTS=1 pnpm build` to preview drafts in a production build.
- **Inline code.** Wrap identifiers in backticks inside content strings, e.g. "`beforeLoad` checks".
- **Images.** Each project's first `media` item is its plate. Schematics are drawn in `components/schematics.tsx`. For a cleared screenshot, add `{ kind: "image", src: "/work/<slug>/name.png", alt, width, height, caption }` and put the file in `public/`.
- **Order.** The order of `projects` is the order of the index and of the previous/next links.

## Configuration

| Variable               | Purpose                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, e.g. `https://example.com`. Used for canonical URLs, Open Graph, sitemap and robots. **Required in production.** |
| `SHOW_DRAFTS`          | Set to `1` to include drafts in a production build.                                                     |

## Deployment

The output is fully static apart from Next's image optimiser, so it runs anywhere Next.js runs.

**Vercel:** import the repository, set `NEXT_PUBLIC_SITE_URL`, and deploy. No other configuration is needed.

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
- the work index: hover and keyboard focus reveal the right plate on desktop, plates are static on mobile, and transitions are removed under reduced motion;
- the skip link;
- the theme toggle: switching, persistence across reloads, clearing back to the system theme, and sync between open tabs;
- content guards: no cliché phrases, unique slugs, every case study section filled.

Locally the tests use the installed Google Chrome (`channel: "chrome"`) to avoid a browser download. In CI (`CI=1`), run `pnpm exec playwright install chromium` first.

## Structure

```
app/
  layout.tsx              fonts, metadata, header and footer
  page.tsx                home page and Person JSON-LD
  work/[slug]/page.tsx    case studies (static, unknown slugs 404)
  opengraph-image.tsx     Open Graph images, set in Geist
  sitemap.ts, robots.ts, icon.svg, not-found.tsx
  globals.css             tokens, type scale, base styles, work-index CSS
components/               presentation only
content/                  all copy and data
lib/site.ts               visibility, site URL, project lookups
lib/og.tsx                shared Open Graph frame and fonts
assets/                   images imported by components (photo, illustration)
scripts/check-content.mjs pending and draft report
tests/                    Playwright tests
```

## Notes on choices

- **Cache Components are off.** Next 16 enables them in new apps. All content here is known at build time, and classic static generation with `dynamicParams = false` returns a real 404 for unknown slugs, which Cache Components does not support.
- **Dependencies:** `next`, `react`, `react-dom`, and `geist` (the font, plus TTFs for Open Graph images). Newsreader and JetBrains Mono come through `next/font/google` and are self-hosted at build time. There is no icon library; the arrows are typographic.
