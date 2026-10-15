# Content TODO

Facts and assets that still need a decision. Nothing on this list has been guessed into the site: an unconfirmed fact either renders as a dashed **Pending** marker or sits in a draft that production builds leave out.

Run `pnpm check:content` for the current list. It exits with 1 while public content has any `pending(...)`, so it can gate a deploy. Pending items inside drafts are reported but don't block.

How the copy was sourced: commit history and code in the project repositories (`frontend`, `tenbyte-cms`, `multi-tenant`, `sellorio`, `support-system`, the accounts service, `vidinfra-ai`, `translate-tool`). No internal hostnames, endpoints, environment values, customer names, vendor contracts or pricing were carried over.

## 1. Before publishing (blocking)

- [x] Email, GitHub (`niadul-munna`), LinkedIn and X (`Niadul_Munna`). Added on 2026-10-14; X supplied by the owner.
- [x] CV published at `/niadul-islam-munna-cv.pdf`. Linked from the hero, Contact and footer.
- [x] Email: `niadulislammunna@gmail.com` on both the site and the CV. Settled on 2026-10-14.
- [x] CV PDF updated on 2026-10-14. It links to `https://niadul.vercel.app` and its email matches the site.
- [x] **Deployed** on Vercel at `https://niadul.vercel.app` on 2026-10-14. Canonical URLs follow Vercel's production domain; redeploy after any domain change.
- [ ] Optional: a custom domain, e.g. your name. Add it in Vercel → Project → Domains; canonicals switch to it on the next deploy.
- [ ] **Employer sign-off.** Confirm Tenbyte is comfortable with the level of detail in the three public case studies, especially the descriptions of session handling, caching and the support sign-in.

## 2. Facts to confirm

### Profile and experience
- [x] Promotion to Frontend Developer: May 2026 (from LinkedIn). Previous role added: Frontend Developer at Nexail Ltd, Dec 2024 – Jul 2025, full-time and remote.
- [ ] Tenbyte start month: LinkedIn says Jun 2025; the site, CV and first commit say Jul 2025. The hero and Experience read it from `tenbyteStart` in `content/profile.ts`; case study periods and prose in `content/projects.ts` (Vidinfra, Tenbyte CDN) are written out separately.
- [x] Motion (Framer Motion) added to the Interface skills, confirmed by the owner on 2026-10-15. Listed as a skill only; the site still uses no animation library.
- [x] Earlier experience: Nexail Ltd is included in the timeline based on LinkedIn. The CV lists no earlier roles or education.
- [x] Nexail responsibilities: built the company website and made it responsive, confirmed by the owner on 2026-10-14. Added to the experience summary.
- [x] "Open to frontend and product engineering roles" comes from the CV and is now in the Contact section.
- [x] "Niadul Islam Munna", the full name on the CV, is in the structured data as `alternateName`.
- [ ] "Tenbyte Cloud" as the employer name, with `tenbyte.io` as its site. Used in the structured data.
- [ ] Read the hero statement, intro and About paragraphs aloud. They were drafted from your work, not from interviews with you. Rewrite any line that doesn't sound like you.

### Vidinfra (`/work/vidinfra`)
- [ ] Which features are **live in production**, as opposed to only merged to `dev`. The site marks search/filter/sort, scroll restoration, token refresh, the TanStack Start migration and stale-deploy recovery as shipped.
- [ ] AI subtitles/chapters, cross-tab draft editing, localisation and dark mode were on unmerged branches at the time of writing. The AI panels are marked "In review"; their separate processing service is marked "Prototype" and described in the case study as well as Beyond the interface. Update these statuses if they have shipped.
- [ ] Decision D3 ("Render the console on the client"): the reasoning is a reasonable reading of the code, not something written down. Confirm or correct it.
- [ ] Optional: a public product URL, and any reliability or usage numbers you are allowed to share. None are claimed, and nothing is shown until you add them.

### Tenbyte CDN (`/work/tenbyte-cdn`)
- [ ] "Built most of the original CDN screens" (Jul–Sep 2025). Commit history supports it (about 200 of 310 commits to those routes), but confirm the wording with your team.
- [ ] Guided onboarding is live.
- [ ] Optional: a public product URL, and any adoption numbers you can share.

### tenbyte.io (`/work/tenbyte-website`)
- [ ] Role wording: "Lead developer; for most of the project, the only one."
- [ ] All six locales (en, ms, id, zh, vi, bn) are live.
- [ ] Optional numbers your commits recorded, if you want to add them: the blog index's response time before the ISR fix, and Partytown's measured regression. They were left out because they weren't verified for publication.
- [ ] Vendor names were generalised except Cloudflare and R2. Keep or generalise those too.

### Beyond the interface (`content/practice.ts`)
- [ ] **Support SSO**: the description of the handoff (short-lived, single-use, hashed, atomic redemption) is a security design. Confirm it is fine to describe publicly. The status is "In review", because the branch was pushed but not merged.
- [ ] **Support desk**: the status is "In progress". Update it once it's in production.
- [ ] **Subtitles and chapters service**: the status is "Prototype", per its README. Update it if it has been validated end to end.
- [x] **Onubad**: linked to `github.com/niadul-munna/onubad`, which is public. The copy now follows its README (English↔Bangla, auto-detect, swap, history).

## 3. Sellorio

- [x] Published on 2026-10-14 at your request, together with the "Commerce backend" and "Promo videos as code" entries. It links to `www.sellorio.com`.
- [ ] Optional: refine the attribution. The product doc names Tenbyte as owner, while the marketing site's legal pages name ViteLoop. The case study currently says "Employer product".
- [ ] The platform is marked "In progress", not in production. Update it when it launches.

The draft mechanism stays available. `visibility: "draft"` keeps any item out of production builds, static params and the sitemap.

## 4. Assets

- [ ] **Screenshots.** None are used. Every project shows a labelled schematic instead. If screenshots are cleared, put them in `public/work/<slug>/` and add them to the project's `media` as `{ kind: "image", src, alt, width, height, caption }`. They render with `next/image`. Crop out customer data, internal hostnames and account details.
- [x] **Image style.** Keep the real hero photo. The About illustration was removed on 2026-10-14; About now uses paragraphs and skills only.
- [x] **Photo.** Your GitHub avatar is in the hero (`assets/avatar.jpg`), added on 2026-10-14.

## 5. Optional

- [x] **Engineering notes.** Both notes in `content/notes.ts` were published on 2026-10-15 at the owner's request, dated 2026-10-15.
- [ ] Stories that weren't used because the evidence wasn't precise enough:
  - masked storage credentials overwriting real secrets on save (product area unclear);
  - `git-mate`, which is a design spec, not code yet.
