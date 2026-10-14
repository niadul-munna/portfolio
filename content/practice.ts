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
    body: "A Go service that transcribes video into WebVTT subtitles and AI-generated chapters. Results go back to the main API through retried background jobs, so a failed delivery isn’t lost. The output format is versioned, so a format change can’t silently corrupt saved chapters.",
    status: "prototype",
    stack: ["Go", "Redis queues", "Object storage"],
  },
  {
    id: "commerce-backend",
    visibility: "public",
    area: "Data",
    title: "A commerce backend that fails safely",
    body: "For Sellorio: Postgres row-level security for tenant isolation, a stock ledger written in the same transaction as each change, and a Postgres-backed job queue with at-least-once delivery.",
    status: "in-progress",
    stack: ["Go", "PostgreSQL"],
  },
  {
    id: "promo-pipeline",
    visibility: "public",
    area: "Media",
    title: "Promo videos as code",
    body: "Sellorio’s promo videos, including a Bangla commercial, built in Remotion. The script generates the voiceover with word timings and fits the music and effects to it. A final check validates dimensions, codecs and loudness.",
    status: "shipped",
    stack: ["Remotion", "React", "FFmpeg"],
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
