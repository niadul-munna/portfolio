import { notes } from "@/content/notes";
import { practice } from "@/content/practice";
import { projects } from "@/content/projects";
import type { Visibility } from "@/content/types";

/**
 * Drafts are visible in development (with a banner) and left out of
 * production builds. Set SHOW_DRAFTS=1 to preview them in a production build.
 */
export const showDrafts =
  process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";

function isVisible(item: { visibility: Visibility }) {
  return item.visibility === "public" || showDrafts;
}

/**
 * Canonical origin, without a trailing slash. NEXT_PUBLIC_SITE_URL wins when
 * set. On Vercel, the project's production domain is used (Vercel sets
 * VERCEL_PROJECT_PRODUCTION_URL at build time, and it follows a custom domain
 * once one is assigned), so previews also point canonicals at production.
 * Locally, localhost.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl().replace(/\/+$/, "");

export const visibleProjects = projects.filter(isVisible);
export const visiblePractice = practice.filter(isVisible);
export const visibleNotes = notes.filter(isVisible);

export function getNote(slug: string) {
  return visibleNotes.find((note) => note.slug === slug);
}

export function getProject(slug: string) {
  return visibleProjects.find((project) => project.slug === slug);
}

/** Previous and next projects for case study navigation, wrapping around. */
export function getAdjacentProjects(slug: string) {
  const index = visibleProjects.findIndex((project) => project.slug === slug);
  const count = visibleProjects.length;
  if (index === -1 || count < 2) return { previous: undefined, next: undefined };
  return {
    previous: visibleProjects[(index - 1 + count) % count],
    next: visibleProjects[(index + 1) % count],
  };
}

/** Two-digit index used in the work list and case study headers. */
export function projectNumber(slug: string) {
  const index = visibleProjects.findIndex((project) => project.slug === slug);
  return String(index + 1).padStart(2, "0");
}

export const lastUpdated = "October 2026";
