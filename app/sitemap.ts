import type { MetadataRoute } from "next";
import { siteUrl, visibleProjects } from "@/lib/site";

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
  ];
}
