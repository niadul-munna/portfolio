import type { MetadataRoute } from "next";
import { siteUrl, visibleNotes, visibleProjects } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    ...visibleProjects
      .filter((project) => project.visibility === "public")
      .map((project) => ({
        url: `${siteUrl}/work/${project.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...visibleNotes
      .filter((note) => note.visibility === "public")
      .map((note) => ({
        url: `${siteUrl}/notes/${note.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  ];
}
