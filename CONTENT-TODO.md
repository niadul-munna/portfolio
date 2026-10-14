# Content TODO

Facts and assets that still need a decision. Nothing on this list has been guessed into the site: an unconfirmed fact either renders as a dashed **Pending** marker or sits in a draft that production builds leave out.

Run `pnpm check:content` for the current list. It exits with 1 while public content has any `pending(...)`, so it can gate a deploy. Pending items inside drafts are reported but don't block.

How the copy was sourced: commit history and code in the project repositories (`frontend`, `tenbyte-cms`, `multi-tenant`, `sellorio`, `support-system`, the accounts service, `vidinfra-ai`, `translate-tool`). No internal hostnames, endpoints, environment values, customer names, vendor contracts or pricing were carried over.

## 1. Before publishing (blocking)

- [x] Email, GitHub (`niadul-munna`) and LinkedIn. Added on 2026-10-14.
- [x] CV published at `/niadul-islam-munna-cv.pdf`. Linked from the hero, Contact and footer.
- [x] Email: `niadulislammunna@gmail.com` on both the site and the CV. Settled on 2026-10-14.
- [ ] **Update the CV PDF before going live.** It says "Portfolio: in progress"; replace that with the site URL.
- [x] **Deployed** on Vercel at `https://niadul.vercel.app` on 2026-10-14. Canonical URLs follow Vercel's production domain; redeploy after any domain change.
- [ ] Optional: a custom domain, e.g. your name. Add it in Vercel → Project → Domains; canonicals switch to it on the next deploy.
- [ ] **Employer sign-off.** Confirm Tenbyte is comfortable with the level of detail in the three public case studies, especially the descriptions of session handling, caching and the support sign-in.

## 2. Facts to confirm

### Profile and experience
- [ ] Month of the promotion to Frontend Developer in 2026. The site and the CV both say "2026".
- [x] Earlier roles or education: the CV lists none, so the timeline has only Tenbyte Cloud.
- [x] "Open to frontend and product engineering roles" comes from the CV and is now in the Contact section.
- [x] "Niadul Islam Munna", the full name on the CV, is in the structured data as `alternateName`.
- [ ] "Tenbyte Cloud" as the employer name, with `tenbyte.io` as its site. Used in the structured data.
- [ ] Read the hero statement, intro and About paragraphs aloud. They were drafted from your work, not from interviews with you. Rewrite any line that doesn't sound like you.

### Vidinfra (`/work/vidinfra`)
- [ ] Which features are **live in production**, as opposed to only merged to `dev`. The site marks search/filter/sort, scroll restoration, token refresh, the TanStack Start migration and stale-deploy recovery as shipped.
- [ ] AI subtitles/chapters, cross-tab draft editing, localisation and dark mode were on unmerged branches at the time of writing. Only the AI panels are mentioned, marked "In review". Update the status if they have shipped.
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
- [x] **Portrait.** The street illustration (`assets/portrait.jpg`) is in About. The beach illustration you also sent isn't used, because one portrait is enough. Swap the file to change it.
- [x] **Photo.** Your GitHub avatar is in the hero (`assets/avatar.jpg`), added on 2026-10-14.

## 5. Optional

- [ ] **Engineering notes.** The section stays hidden until `content/notes.ts` has at least one entry linking to real writing.
- [ ] Stories that weren't used because the evidence wasn't precise enough:
  - masked storage credentials overwriting real secrets on save (product area unclear);
  - `git-mate`, which is a design spec, not code yet.
