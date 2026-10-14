/**
 * Content model for the site. Everything a reader sees is defined in
 * /content and rendered by /components; nothing here knows about layout.
 */

/** A fact that hasn't been confirmed yet. Renders as a visible marker. */
export type Pending = { readonly pending: true; readonly note: string };

export function pending(note: string): Pending {
  return { pending: true, note };
}

export function isPending(value: unknown): value is Pending {
  return typeof value === "object" && value !== null && "pending" in value;
}

/**
 * How far a piece of work got. Shown next to every claim so readers can tell
 * shipped work from work still waiting on review.
 */
export type WorkStatus =
  | "shipped" // merged and live in production
  | "in-review" // built, waiting on review or merge
  | "in-progress" // under active development, not yet released
  | "prototype" // working, but not validated end to end
  | "concept" // designed, not built
  | "personal"; // a personal tool, outside employer work

/**
 * `draft` items render in development with a banner and are left out of
 * production builds, the sitemap and static params. Use it for work whose
 * public attribution or disclosure hasn't been confirmed.
 */
export type Visibility = "public" | "draft";

export type SchematicId = "library" | "analytics" | "edge" | "tenants";

export type Media =
  | {
      kind: "schematic";
      schematic: SchematicId;
      caption: string;
    }
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption: string;
    };

export type ExternalLink = { label: string; href: string };

export type Contribution = {
  title: string;
  body: string;
  status: WorkStatus;
};

export type Decision = {
  decision: string;
  why: string;
  tradeoff: string;
};

export type Outcome = {
  text: string;
  status: WorkStatus;
};

export type Project = {
  slug: string;
  visibility: Visibility;
  title: string;
  /** Short category shown in the index, e.g. "Video platform". */
  category: string;
  /** One line for the index row. */
  summary: string;
  /** Opening paragraph of the case study, set as a standfirst. */
  standfirst: string;
  period: string;
  role: string;
  /** Who owns the work and who else was involved. */
  context: string;
  status: WorkStatus;
  stack: string[];
  links: Array<ExternalLink | Pending>;
  media: Media[];
  /** Pending facts specific to this project, shown in its meta block. */
  openQuestions?: Pending[];
  caseStudy: {
    background: string[];
    problem: string[];
    constraints: string[];
    contributions: Contribution[];
    decisions: Decision[];
    outcomes: Array<Outcome | Pending>;
    lessons: string[];
  };
};

export type PracticeEntry = {
  id: string;
  visibility: Visibility;
  area: string;
  title: string;
  body: string;
  status: WorkStatus;
  stack: string[];
  link?: ExternalLink;
};

export type Role = {
  title: string;
  period: string;
};

export type Position = {
  organisation: string;
  description: string;
  period: string;
  roles: Role[];
  summary: string[];
};

export type ContactChannel = {
  label: string;
  kind: "email" | "url" | "file";
  /** An email address, a full URL, or a path to a file in /public. */
  value: string | Pending;
  /** Shown instead of the raw URL, e.g. "github.com/handle". */
  display?: string;
};

export type Note = {
  title: string;
  /** ISO date, e.g. "2026-10-14". */
  date: string;
  summary: string;
  /** Where the note is published: an external URL or an internal path. */
  href: string;
};
