import type { ContactChannel, Position } from "./types";

const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    kind: "email",
    value: "niadulislammunna@gmail.com",
  },
  {
    label: "GitHub",
    kind: "url",
    value: "https://github.com/niadul-munna",
    display: "github.com/niadul-munna",
  },
  {
    label: "LinkedIn",
    kind: "url",
    value: "https://www.linkedin.com/in/niadul-munna/",
    display: "linkedin.com/in/niadul-munna",
  },
  {
    label: "CV",
    kind: "file",
    value: "/niadul-islam-munna-cv.pdf",
    display: "PDF, one page",
  },
];

export const profile = {
  name: "Niadul Islam",
  /** Full name as it appears on the CV. */
  fullName: "Niadul Islam Munna",
  shortName: "Niadul",
  cv: "/niadul-islam-munna-cv.pdf",
  role: "Frontend Developer",
  employer: "Tenbyte Cloud",
  employerUrl: "https://tenbyte.io",
  location: "Bangladesh",
  timezone: "GMT+6",
  /** Used for <title>, Open Graph and the meta description. */
  description:
    "Niadul Islam is a frontend developer at Tenbyte Cloud in Bangladesh, building React and Next.js interfaces for video and CDN products, and increasingly the services behind them.",

  /** The hero statement. Short enough to set large. */
  statement:
    "I build the interfaces of a video platform and a CDN, and increasingly the systems underneath them.",

  intro:
    "I’m Niadul Islam, a frontend developer at Tenbyte Cloud. Day to day that means React, Next.js and TypeScript: a video library, CDN analytics, auth that holds up across a stack of open tabs, a website in six languages. A growing share of my time goes to the other side of the API, in Go and Laravel services, Postgres and deploys, as I work toward product engineering.",

  focus: "React, Next.js, TypeScript; growing toward full-stack",

  photo: {
    alt: "Photo of Niadul Islam outdoors in a cap and sunglasses, against a cloudy sky.",
  },

  portrait: {
    alt: "Illustrated portrait of Niadul: curly hair, a short beard, earphones and a backpack, waving on a street with a rickshaw behind him.",
  },

  about: [
    "I joined Tenbyte Cloud in July 2025 as a junior frontend developer and became a frontend developer in 2026. The products I work on sit close to infrastructure: video hosting, a CDN, and the console customers use to run both.",
    "The work I like best is in the middle, where an interface meets a system that doesn’t behave quite the way the screen assumes. A date picker and a backend that disagree about midnight. Several tabs and one refresh token. A cache that can’t tell an HTML page from a server component payload. Fixing those means reading both sides, which is how I ended up spending more of my time on the other one.",
    "Outside work I build small tools I need myself. The latest is Onubad, a panel app on my Linux desktop that translates between English and Bangla. Next, I want to own product features end to end, from the data model to the last focus ring.",
  ],

  contact: {
    lead: "If you’re building something where the interface and the system have to agree, I’d like to hear about it.",
    note: "I’m open to frontend and product engineering roles. Email is the most reliable way to reach me.",
    channels: contactChannels,
  },
} as const;

export const experience: Position[] = [
  {
    organisation: "Tenbyte Cloud",
    description: "CDN, cloud and video infrastructure",
    period: "Jul 2025 — present",
    roles: [
      { title: "Frontend Developer", period: "2026 — present" },
      { title: "Junior Frontend Developer", period: "Jul 2025 — 2026" },
    ],
    summary: [
      "Tenbyte Console: built most of the original CDN screens, then the Vidinfra video library, session handling and the move from Next.js to TanStack Start.",
      "tenbyte.io: built and maintain the corporate website on Next.js and Payload CMS, in six languages.",
      "Support: a support desk application, and the server side of single sign-on into it from Tenbyte’s account service.",
    ],
  },
];

export const skills: Array<{ area: string; items: string }> = [
  {
    area: "Interface",
    items:
      "React, Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, accessible components, forms with React Hook Form and Zod",
  },
  {
    area: "Data and state",
    items:
      "TanStack Query, Router and Start, Zustand, URL state, auth and session handling, REST integration",
  },
  {
    area: "Web platform",
    items:
      "Server components and caching, SEO and structured data, internationalisation, Core Web Vitals",
  },
  {
    area: "Beyond the browser",
    items:
      "Node.js, Go, Laravel, PostgreSQL, MongoDB, Payload CMS, Linux, PM2, Nginx, Cloudflare, object storage",
  },
];
