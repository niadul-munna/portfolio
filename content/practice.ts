import type { PracticeEntry } from "./types";

/**
 * "Beyond the interface": real work outside the browser, each with an honest
 * status. Kept short; the case studies carry the detail.
 */
export const practice: PracticeEntry[] = [
  {
    id: "support-sso",
    visibility: "public",
    area: "Identity",
    title: "Signing in across services",
    body: "The server side of single sign-on from Tenbyte’s account service into its support app. Handoff tickets are short-lived and single-use, stored only as hashes, and redeemed in one atomic update so two attempts can’t both succeed. Alongside it, I tightened authorisation checks in the same service.",
    status: "in-review",
    stack: ["Go", "Gin", "JWT"],
  },
  {
    id: "support-desk",
    visibility: "public",
    area: "Product",
    title: "A support desk, end to end",
    body: "Tenbyte’s ticketing app. Email becomes tickets after sender checks against DKIM. Agents can reply from Telegram and Discord. SLA warnings fire before a reply is late. Live presence warns an agent before they answer over a colleague.",
    status: "in-progress",
    stack: ["Laravel", "Inertia", "React", "PostgreSQL", "Redis"],
  },
  {
    id: "vidinfra-ai",
    visibility: "public",
    area: "Pipelines",
    title: "Subtitles and chapters from speech",
    body: "A prototype Go service for WebVTT subtitles and AI-generated chapters, with retried delivery to the main API.",
    status: "prototype",
    stack: ["Go", "Redis queues", "Object storage"],
    relatedProject: "vidinfra",
  },
  {
    id: "commerce-backend",
    visibility: "public",
    area: "Data",
    title: "A commerce backend that fails safely",
    body: "Tenant isolation, transactional stock updates and a Postgres-backed job queue for Sellorio.",
    status: "in-progress",
    stack: ["Go", "PostgreSQL"],
    relatedProject: "sellorio",
  },
  {
    id: "promo-pipeline",
    visibility: "public",
    area: "Media",
    title: "Promo videos as code",
    body: "Sellorio’s promo videos, built in Remotion with timed voiceover and automated delivery checks.",
    status: "shipped",
    stack: ["Remotion", "React", "FFmpeg"],
    relatedProject: "sellorio",
  },
  {
    id: "onubad",
    visibility: "public",
    area: "Tools",
    title: "Onubad",
    body: "A small English–Bangla translator that lives in the Linux desktop panel: a global hotkey translates whatever is on the clipboard, with language auto-detection, a swap control and a local history. Python and GTK, with no third-party dependencies.",
    status: "personal",
    stack: ["Python", "GTK"],
    link: { label: "github.com/niadul-munna/onubad", href: "https://github.com/niadul-munna/onubad" },
  },
];
