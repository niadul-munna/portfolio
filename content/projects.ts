import type { Project } from "./types";

/**
 * Selected work, in display order. Sources: commit history and code in the
 * project repositories. Anything not confirmed is marked `pending(...)` and
 * listed in CONTENT-TODO.md.
 */
export const projects: Project[] = [
  {
    slug: "vidinfra",
    visibility: "public",
    title: "Vidinfra",
    category: "Video platform",
    summary:
      "The video library in Tenbyte’s console: search, filtering and playback, and the session handling underneath.",
    standfirst:
      "Vidinfra is Tenbyte’s video infrastructure product. Since July 2025 I’ve worked on its library, the part of the console where customers find, filter, organise and play back their videos, and on the auth and data layer the whole console depends on.",
    period: "Jul 2025 — present",
    role: "Frontend developer",
    context:
      "Employer work at Tenbyte Cloud, on a shared codebase with other frontend developers.",
    status: "shipped",
    stack: [
      "React 19",
      "TanStack Start and Router",
      "TanStack Query",
      "Zustand",
      "URL state with nuqs",
      "React Hook Form and Zod",
      "Tailwind CSS",
      "shadcn/ui",
      "hls.js",
      "Vitest",
    ],
    links: [],
    media: [
      {
        kind: "schematic",
        schematic: "library",
        caption:
          "The library view: folder tree, search scoped to the open folder, a status filter, and a grid that loads as you scroll.",
      },
    ],
    caseStudy: {
      background: [
        "Vidinfra sits inside the Tenbyte Console, next to the CDN, live streaming and webinars. Customers upload and transcode video there, organise it into folders, and embed or stream it elsewhere.",
        "The console started as a Next.js App Router application. In 2026 it became a client-rendered TanStack Start app. I carried out that migration.",
      ],
      problem: [
        "A video library looks simple until it holds thousands of items in nested folders. People need to search inside a folder, filter by processing state, sort, and keep their place when they come back from a video’s detail page.",
        "Underneath, session handling had a reliability problem. When an access token expired, several requests could fail at once and each start its own refresh. Refresh tokens rotate, so they can be used only once. The first refresh made the second one’s token invalid, and the user was logged out for no visible reason.",
      ],
      constraints: [
        "One codebase serves several products, so library changes couldn’t break CDN, live or webinar screens.",
        "Refresh tokens are single-use, so any concurrency mistake shows up as a logout.",
        "Customers keep the console open in several tabs, over long sessions, and across deploys.",
        "Folder, search, filter and sort live in the URL, so views can be shared and survive a reload.",
      ],
      contributions: [
        {
          title: "Search and filtering",
          body: "Search across videos and folders, scoped to the current folder. A status filter that includes an “isn’t” operator. Sorting from the toolbar. Infinite loading instead of a “load more” button. The first version of the filter missed videos inside folders. When a filter is active, the query now includes them.",
          status: "shipped",
        },
        {
          title: "Coming back to the same place",
          body: "The library scrolls inside an inner container, not the window, so the router’s scroll restoration never applied to it. I gave it a stable restoration key and lengthened the cache lifetime. Now returning from a video lands where you left off.",
          status: "shipped",
        },
        {
          title: "Token refresh without races",
          body: "Concurrent 401 responses now share a single refresh. The current token is read from a cookie, so every tab sees the newest one. Hidden tabs refresh when they become visible again. After an organisation switch or admin impersonation, a BroadcastChannel resyncs the other open tabs, with a visibility-change fallback. Vitest tests cover the cross-tab cases.",
          status: "shipped",
        },
        {
          title: "Next.js to TanStack Start",
          body: "Moved the console from the App Router to a client-rendered TanStack Start app. Route guards became `beforeLoad` checks instead of a wrapper component, and the project moved to pnpm.",
          status: "shipped",
        },
        {
          title: "Surviving a deploy",
          body: "A tab left open across a deploy tries to load code chunks that no longer exist. The app now catches Vite’s preload error and reloads once, with a guard so it can’t loop.",
          status: "shipped",
        },
        {
          title: "AI subtitles and chapters",
          body: "Panels to generate, poll and edit AI subtitles and chapters, plus a raw WebVTT editor with validation. They were built against the Vidinfra AI service and are waiting on review.",
          status: "in-review",
        },
        {
          title: "Subtitle and chapter processing service",
          body: "A Go service that transcribes video into WebVTT subtitles and AI-generated chapters. Results go back to the main API through retried background jobs, so a failed delivery isn’t lost. The output format is versioned, so a format change can’t silently corrupt saved chapters.",
          status: "prototype",
        },
      ],
      decisions: [
        {
          decision: "Keep the library’s state in the URL",
          why: "Folder, search, filter and sort are all query parameters. A view can be bookmarked, shared and restored after a reload.",
          tradeoff:
            "Every control has to serialise cleanly, and URL changes must not set off bursts of refetching.",
        },
        {
          decision: "Run one refresh at a time, shared by every request",
          why: "Refresh tokens are single-use, so two refreshes in parallel log the user out.",
          tradeoff:
            "Requests wait behind the refresh. A slow refresh delays everything briefly instead of failing some of it.",
        },
        {
          decision: "Render the console on the client",
          why: "Every screen is behind a login and depends on the user’s own data, so server rendering had no search traffic to serve.",
          tradeoff:
            "A heavier first load, handled with code splitting and caching rather than server-rendered HTML.",
        },
      ],
      outcomes: [
        {
          text: "Library search, status filtering, sorting and infinite loading are in the production console.",
          status: "shipped",
        },
        {
          text: "The token-refresh and cross-tab fixes shipped with automated tests for the cross-tab cases.",
          status: "shipped",
        },
        {
          text: "The AI subtitle and chapter interface is built and in review.",
          status: "in-review",
        },
      ],
      lessons: [
        "Many “random logout” reports were concurrency bugs. They only reproduce with more than one tab and a slow network.",
        "If the scrolling element isn’t the window, don’t assume anything the router does for scroll applies to it.",
        "Folder scope and filtering are separate questions. Answering both in one query is where the missing videos came from.",
      ],
    },
  },

  {
    slug: "tenbyte-cdn",
    visibility: "public",
    title: "Tenbyte CDN",
    category: "CDN console",
    summary:
      "The CDN side of the console: distributions, certificates, purge, and analytics that agree with the backend.",
    standfirst:
      "When I joined Tenbyte in July 2025, the CDN product needed a console. Over my first three months I built most of its screens. Later I came back to make its analytics agree with the backend about what a day is.",
    period: "Jul 2025 — present",
    role: "Frontend developer; built most of the original CDN screens",
    context:
      "Employer work at Tenbyte Cloud, in the same console as Vidinfra.",
    status: "shipped",
    stack: [
      "React 19",
      "TanStack Query",
      "TanStack Table",
      "React Hook Form and Zod",
      "Recharts",
      "Tailwind CSS",
      "shadcn/ui",
      "driver.js",
    ],
    links: [],
    media: [
      {
        kind: "schematic",
        schematic: "analytics",
        caption:
          "Traffic over a date range, requested in whole UTC days. The display time zone changes the labels, not the query.",
      },
    ],
    caseStudy: {
      background: [
        "Tenbyte’s CDN customers set up distributions, with origins, certificates, cache and access rules, and headers, then watch traffic, cache and security analytics. All of that happens in the Tenbyte Console.",
      ],
      problem: [
        "The first problem was breadth. A CDN has many settings, each with its own validation and failure modes, and customers configure them without a support call.",
        "The later problem was subtler. Analytics totals came in lower than the backend’s own figures. The date picker built ranges in the viewer’s local time, while the backend groups traffic into whole UTC days. Every range clipped a partial day at each end.",
      ],
      constraints: [
        "Settings forms describe real edge configuration, so client-side validation has to match what the backend will accept.",
        "Viewers are spread across time zones. The data is aggregated in UTC.",
        "New customers should be able to set up a first distribution without the documentation open in another tab.",
      ],
      contributions: [
        {
          title: "Distribution management",
          body: "Create-distribution forms with schema validation, DNS verification and distribution details, enabling and disabling distributions, cache purge, and a certificates table. Between July and September 2025 I wrote most of the original CDN screens.",
          status: "shipped",
        },
        {
          title: "Analytics on UTC boundaries",
          body: "Ranges now request whole UTC days, so totals match the backend. A display time-zone toggle changes how times are shown but stays out of the query key, so switching it doesn’t refetch anything. The same alignment went into the WAF analytics.",
          status: "shipped",
        },
        {
          title: "A better date range picker",
          body: "Redesigned with an hour-level picker for narrower investigations, plus custom analytics per distribution.",
          status: "shipped",
        },
        {
          title: "Guided setup",
          body: "A product tour and guided onboarding for CDN setup. Each step is spotlighted on the real interface, and completion is saved so returning users aren’t shown it again.",
          status: "shipped",
        },
      ],
      decisions: [
        {
          decision: "Treat UTC as the truth and local time as presentation",
          why: "The backend’s daily figures are UTC. A range that starts at local midnight always cuts a day in two.",
          tradeoff:
            "For a viewer in Bangladesh, a UTC day starts at 06:00 local time. The time-zone toggle has to make that obvious, not hide it.",
        },
        {
          decision: "Keep the display time zone out of the query key",
          why: "It only changes formatting. Refetching identical data because a label changed would waste requests and flash loading states.",
          tradeoff:
            "Times have to be formatted at render time everywhere they appear, not once when the data is fetched.",
        },
        {
          decision: "Teach on the real interface",
          why: "A guided overlay on the actual screens stays truthful longer than a separate wizard that describes them.",
          tradeoff:
            "Tour steps are tied to page structure. When a screen changes, its tour has to change with it.",
        },
      ],
      outcomes: [
        {
          text: "The CDN screens built in 2025 are still the basis of the console’s CDN section.",
          status: "shipped",
        },
        {
          text: "Analytics totals line up with the backend’s figures after the UTC change.",
          status: "shipped",
        },
      ],
      lessons: [
        "When two numbers disagree, check what time zone each one is in before checking anything else.",
        "A settings form is an API client with a UI. Validating in the same shape as the backend saves a round of confusing errors.",
      ],
    },
  },

  {
    slug: "tenbyte-website",
    visibility: "public",
    title: "tenbyte.io",
    category: "Corporate website",
    summary:
      "Tenbyte’s website on Next.js and Payload CMS: six languages, structured data, and caching that works with a CDN in front.",
    standfirst:
      "I started the Tenbyte website in an empty repository in October 2025 and have looked after it since. That covers the CMS and its page builder, six languages, search visibility, and the caching between Next.js and the CDN.",
    period: "Oct 2025 — present",
    role: "Lead developer; for most of the project, the only one",
    context:
      "Employer work at Tenbyte Cloud. Content is written and managed by the wider team.",
    status: "shipped",
    stack: [
      "Next.js App Router",
      "React Server Components",
      "Payload CMS 3",
      "MongoDB",
      "Tailwind CSS",
      "Cloudflare and R2",
      "PM2",
      "Vitest",
      "Playwright",
    ],
    links: [{ label: "tenbyte.io", href: "https://tenbyte.io" }],
    media: [
      {
        kind: "schematic",
        schematic: "edge",
        caption:
          "One URL, two responses. The edge has to keep HTML and server component payloads apart, and purge every locale when an editor saves.",
      },
    ],
    caseStudy: {
      background: [
        "For many people the website is their first contact with Tenbyte’s CDN, cloud and video products. Pages are built in Payload CMS from a library of blocks, so people who aren’t developers can compose and translate them.",
      ],
      problem: [
        "A marketing site has to be fast, easy to find and easy to edit, and those pull in different directions. Every new block risks adding client JavaScript that didn’t need to exist. Every language multiplies the URLs, sitemaps and cache entries that have to stay correct.",
        "Several of the hardest bugs only appeared once the CDN was in front. Next.js serves both an HTML page and a React Server Component payload from the same URL. A cache that keys on the URL alone can hand a crawler the wrong one.",
      ],
      constraints: [
        "Six locales: English at unprefixed URLs, plus Malay, Indonesian, Chinese, Vietnamese and Bangla.",
        "Content changes must reach visitors without a deploy.",
        "A CDN in front of the origin, with its own caching behaviour.",
        "Editors work without a developer, so the page builder has to make a good page the easy one to build.",
      ],
      contributions: [
        {
          title: "A page builder",
          body: "Close to ninety Payload blocks, including heroes, comparisons, pricing calculators and FAQs, with types generated from the CMS schema. Later I converted eleven blocks to server components to cut client JavaScript.",
          status: "shipped",
        },
        {
          title: "Six languages",
          body: "Locale routing with English unprefixed and hreflang alternates, plus per-locale fonts for Chinese and Bangla. Editors get an auto-translate tool in the admin. It sends one request per locale so it stays inside gateway timeouts. The same change moved the CMS database from SQLite to MongoDB.",
          status: "shipped",
        },
        {
          title: "Search visibility",
          body: "Sitemaps with one entry per page and its language alternates. Redirect and gone rules. JSON-LD for the organisation, products, articles, FAQs and partners. An llms.txt for AI crawlers.",
          status: "shipped",
        },
        {
          title: "Caching with a CDN in front",
          body: "Correct cache headers keep server component payloads out of shared caches. Saving a page purges it in all six locales. Prerendered pages revalidate on a schedule, and a CI test checks that every frontend route is revalidated.",
          status: "shipped",
        },
        {
          title: "Performance",
          body: "Server-rendered syntax highlighting, charts and the globe loaded only when needed, and responsive image sizes. A Partytown experiment for third-party scripts made pages slower once it actually ran. I measured it and took it out.",
          status: "shipped",
        },
        {
          title: "Operations",
          body: "PM2 deploys keep the previous build so a rollback is quick. HSTS, and a Content Security Policy rolled out in report-only mode before enforcing it. Media moved to Cloudflare R2. A secret scanner runs on every commit.",
          status: "shipped",
        },
      ],
      decisions: [
        {
          decision: "Server components by default, client code on purpose",
          why: "Most blocks are content. Only the calculators, charts and globe need the browser.",
          tradeoff:
            "Interactive parts have to be designed as small islands, and some UI kits assume everything runs on the client.",
        },
        {
          decision: "English at bare URLs, other languages prefixed",
          why: "Existing English URLs keep their history, and `/en/` paths redirect permanently to the bare canonical path.",
          tradeoff:
            "The default language has different cache keys from the rest, which is why English edits weren’t being purged until purge-on-save covered all six locales.",
        },
        {
          decision: "Keep an optimisation only if it measures well",
          why: "Moving third-party scripts off the main thread looked like a free win. In practice the work came back to the main thread as synchronous requests.",
          tradeoff:
            "Giving up something that looked good on paper. The cost of third-party scripts has to be managed some other way.",
        },
      ],
      outcomes: [
        {
          text: "Live at tenbyte.io in six languages.",
          status: "shipped",
        },
        {
          text: "Missing static files now return a 404 straight away. They used to be caught by the locale route and fail slowly with a 500.",
          status: "shipped",
        },
        {
          text: "The blog index is cached again after a forced-dynamic setting had quietly turned caching off.",
          status: "shipped",
        },
      ],
      lessons: [
        "Test caching with the CDN in the loop. Next.js behaves correctly on its own; the bugs live where its responses meet a shared cache.",
        "A default language without a prefix is nicer for readers and harder on caches.",
        "An optimisation isn’t one until it’s measured on the real page.",
      ],
    },
  },

  {
    slug: "sellorio",
    visibility: "public",
    title: "Sellorio",
    category: "Commerce platform",
    summary:
      "A multi-tenant commerce platform for online sellers in Bangladesh: a Go API, Postgres, and two TanStack Start apps.",
    standfirst:
      "Sellorio gives each merchant a store on its own subdomain and an admin to run it. Since July 2026 I’ve built the platform: the Go API, the Postgres schema, the merchant dashboard and the storefront.",
    period: "Jul 2026 — present",
    role: "Platform developer",
    context:
      "Employer product. I’m the main developer of the platform; the marketing site began as a colleague’s static build.",
    status: "in-progress",
    stack: [
      "Go",
      "chi",
      "pgx",
      "PostgreSQL",
      "TanStack Start",
      "React 19",
      "Tailwind CSS",
      "shadcn/ui",
      "Turborepo",
    ],
    links: [{ label: "sellorio.com", href: "https://www.sellorio.com" }],
    media: [
      {
        kind: "schematic",
        schematic: "tenants",
        caption:
          "Many storefronts, one application. Every query runs under the tenant resolved from the host name.",
      },
    ],
    caseStudy: {
      background: [
        "Sellorio is commerce software for online sellers in Bangladesh. Each merchant gets a storefront on a subdomain, and their team works from a shared admin dashboard.",
      ],
      problem: [
        "Multi-tenant commerce fails in expensive ways: one shop seeing another’s orders, a double click creating two orders, stock drifting away from reality.",
      ],
      constraints: [
        "Many shops share one database and one application.",
        "Cash on delivery is common, so fake orders are a real cost to merchants.",
        "Money is handled in whole taka.",
      ],
      contributions: [
        {
          title: "Tenant isolation in the database",
          body: "Tenants are resolved from the host name. Postgres row-level security is forced on, so a missing policy returns no rows instead of another shop’s data.",
          status: "in-progress",
        },
        {
          title: "Orders that can’t double",
          body: "The cart row is locked during checkout, so a double submit creates one order. Each order keeps a snapshot of its prices and fees.",
          status: "in-progress",
        },
        {
          title: "Stock with a ledger",
          body: "Every stock change is written to a ledger in the same transaction as the change itself.",
          status: "in-progress",
        },
        {
          title: "Storefront themes and a page builder",
          body: "Four storefront templates, and shop pages built from blocks.",
          status: "in-progress",
        },
        {
          title: "Marketing site",
          body: "Moved the static marketing site to TanStack Start without changing its output. Script hashes computed at build time keep a strict Content Security Policy. Screenshot baselines taken from the old site catch regressions.",
          status: "shipped",
        },
        {
          title: "Promo videos as code",
          body: "Sellorio’s promo videos, including a Bangla commercial, built in Remotion. The script generates the voiceover with word timings and fits the music and effects to it. A final check validates dimensions, codecs and loudness.",
          status: "shipped",
        },
      ],
      decisions: [
        {
          decision: "Enforce tenancy in the database, not only in handlers",
          why: "A forgotten `WHERE` clause shouldn’t be able to leak another merchant’s orders.",
          tradeoff:
            "Every connection has to carry its tenant, and migrations have to define policies alongside the tables.",
        },
        {
          decision: "A job queue in Postgres",
          why: "Background work gets at-least-once delivery without adding another piece of infrastructure.",
          tradeoff:
            "Jobs must be safe to run twice, and throughput is limited by the database.",
        },
      ],
      outcomes: [
        { text: "The marketing site is live.", status: "shipped" },
        {
          text: "The platform is in development and not yet in production.",
          status: "in-progress",
        },
      ],
      lessons: [
        "Put the guarantees you can’t afford to get wrong, like tenancy, stock and money, where a single forgotten line of code can’t break them.",
      ],
    },
  },
];
