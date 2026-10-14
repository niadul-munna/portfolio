@AGENTS.md

# Portfolio: context for AI agents

Personal portfolio for **Niadul Islam** (full name on CV: Niadul Islam Munna), Frontend Developer at Tenbyte Cloud, Bangladesh. Live at **https://niadul.vercel.app** (Vercel, deploys automatically from `main` on github.com/niadul-munna/portfolio, a public repo).

Read before changing anything: `DESIGN.md` (design system and its reasons), `README.md` (scripts, deploy, testing), `CONTENT-TODO.md` (open facts and decisions).

## Stack

- Next.js 16.4 App Router, React 19, TypeScript strict (`noUncheckedIndexedAccess` on), Tailwind CSS v4 (CSS-first, `@theme` in `app/globals.css`), pnpm 11.
- **Cache Components and Partial Prefetching are deliberately OFF** in `next.config.ts`. Everything is static, and `export const dynamicParams = false` on `app/work/[slug]` gives real 404s. Don't re-enable them without a reason.
- Fonts: Geist (`geist` package, also the TTFs for OG images), Newsreader and JetBrains Mono via `next/font/google`.
- Runtime dependencies: `next`, `react`, `react-dom`, `geist`. Dev dependency: `@playwright/test`. Don't add libraries casually: no icon library (arrows are typographic), no animation library.
- The only client component is `components/theme-toggle.tsx`. Everything else is a Server Component. Keep it that way.

## Commands

```
pnpm dev               # http://localhost:3000
pnpm verify            # lint → typecheck → build → Playwright (run before every commit)
pnpm check:content     # lists pending facts; exits 1 if any are in public content
```

- Stop `pnpm dev` before `pnpm build`/`pnpm verify`, or restart it afterwards. They share `.next/`, and the dev server has served stale CSS after a build ran alongside it.
- Playwright runs against `pnpm start` on port 3100 and uses the system Google Chrome (`channel: "chrome"`) locally. In CI, run `pnpm exec playwright install chromium` first.

## Layout

```
app/                    routes: page.tsx (home), work/[slug] (case studies), OG images, sitemap, robots, not-found
components/             presentation only; components/home/* are the homepage sections
content/                ALL copy and data, typed (types.ts). Edit content here, never in components
lib/site.ts             visibility filtering, siteUrl, project lookups
lib/og.tsx              Open Graph frame (Satori)
assets/                 avatar.jpg (hero photo), portrait.jpg (About illustration)
public/                 niadul-islam-munna-cv.pdf
scripts/check-content.mjs, tests/ (site.spec.ts, content.spec.ts)
```

## Content rules (most important)

- **Never invent facts**: no metrics, outcomes, clients, dates, URLs, testimonials or years of experience. Copy came from the repos' commit history. Unconfirmed facts use `pending("...")` from `content/types.ts`, which renders a dashed marker. A test fails if `pending` appears in public content.
- Every claim carries a `WorkStatus`: `shipped | in-review | in-progress | prototype | concept | personal`. Unmerged work is "in-review", not "shipped".
- `visibility: "draft"` hides an item from production builds, static params and the sitemap (it shows in `pnpm dev`). Everything is public right now.
- Tone: a thoughtful engineer in his own voice. Banned clichés are enforced by `tests/content.spec.ts`: passionate, seamless, pixel-perfect, cutting-edge, leverage, and others.
- Don't publish internal hostnames, endpoints, env values, customer names or vendor contracts. Cloudflare and R2 may be named.
- Contact: niadulislammunna@gmail.com, github.com/niadul-munna, linkedin.com/in/niadul-munna.

## Design rules

- Swiss editorial: a 12-column grid (`page-grid` utility) with the left "spine" in columns 1–3 and content from column 4. Hairlines, few panels.
- Tokens live in `app/globals.css`. **The dark tokens appear twice**, under `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` and under `:root[data-theme="dark"]`. Keep the two blocks identical.
- Muted text is `#666a63`. The brief's `#777b74` failed WCAG AA. Check contrast for any new colour.
- Type roles: Geist for structure. Newsreader only for long personal text (standfirsts, About, lessons), never headings. JetBrains Mono only for metadata, in sentence case, with no wide tracking.
- Motion: 150–250 ms feedback only, and honour `prefers-reduced-motion`. No entrance animations or scroll effects.
- The signature work index (`components/work-index.tsx` plus `.work-*` CSS) is **pure CSS** (`:hover`, `:focus-within`, `:has()`). The plates are static below 1024px or without a fine pointer.
- Schematics (`components/schematics.tsx`) are labelled "Schematic, not a screenshot". Never pass a mock-up off as a real screenshot. Real screenshots go in `media` as `{ kind: "image" }`.
- Never: gradients, glass, glow, blobs, grain, card grids of icons, skill bars, counters, typing effects, carousels.

## Gotchas

- OG images (Satori): a Fragment passed as a prop collapses into one item, so use explicit slot props. Text uses per-character layout (`OgText`) because Satori measures words without kerning and leaves gaps. A `<div>` with more than one child needs `display: flex`.
- `next/image`: `priority` is deprecated in Next 16. Use `loading="eager"` or `preload`.
- Theme: an inline script in `app/layout.tsx` `<head>` sets `data-theme` before paint (`suppressHydrationWarning` on `<html>`). Choosing the system's own theme clears the stored override.
- `siteUrl` (`lib/site.ts`): `NEXT_PUBLIC_SITE_URL`, then `https://$VERCEL_PROJECT_PRODUCTION_URL`, then localhost. Canonicals are baked in at build time, so redeploy after a domain change.
- `AGENTS.md` is regenerated by `next dev`. Leave it alone.

## Git rules (the owner's global preferences)

- **Never commit or push without explicit approval of that specific commit or push.** Approving a commit is not approving a push.
- **Never add a `Co-Authored-By` trailer.**
- Pushing over HTTPS: git has no credential helper configured. Use `git -c credential.helper= -c 'credential.helper=!gh auth git-credential' push`, and don't change the global git config.

## Language

The owner sometimes writes in Banglish. Reply in Banglish then, in Latin script only, and **never Bengali script** (his terminal can't render it). Otherwise reply in English.

## Open items (see CONTENT-TODO.md)

- Promotion month in 2026 is unknown, so the site says "2026".
- The CV PDF still says "Portfolio: in progress". Replace it with https://niadul.vercel.app.
- Optional: a custom domain, real product screenshots (only with permission), and refining Sellorio's attribution (the product doc says Tenbyte owns it; the legal pages name ViteLoop).
