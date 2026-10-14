import Link from "next/link";
import type { Project } from "@/content/types";
import { Plate } from "./plate";

/**
 * The selected-work index. See DESIGN.md: rows are plain links; on wide
 * screens with a fine pointer, CSS in globals.css turns each row's plate into
 * a hover/focus preview. Everywhere else the plate is a static thumbnail.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  return (
    <div className="work-index page-grid">
      <ol className="work-list col-span-full">
        {projects.map((project, index) => {
          const number = String(index + 1).padStart(2, "0");
          const [cover] = project.media;
          return (
            <li key={project.slug} className="work-row border-t border-line last:border-b">
              <Link
                href={`/work/${project.slug}`}
                className="work-link grid grid-cols-4 gap-x-gap gap-y-4 py-7 md:grid-cols-8 lg:grid-cols-12 lg:py-9"
              >
                <span className="work-meta col-span-full flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-meta text-muted lg:col-span-3 lg:flex-col lg:gap-y-1.5">
                  <span className="text-ink tabular-nums">{number}</span>
                  <span>{project.category}</span>
                  <span>{project.period}</span>
                  {project.visibility === "draft" ? (
                    <span className="rounded-[3px] border border-dashed border-line-strong px-1.5 text-muted">
                      Draft, not published
                    </span>
                  ) : null}
                </span>

                <span className="work-text col-span-full md:col-span-5 lg:col-span-6">
                  <span className="work-title block text-title text-ink">
                    {project.title}
                    <span className="work-arrow ml-3 font-normal text-accent" aria-hidden="true">
                      →
                    </span>
                  </span>
                  <span className="mt-3 block max-w-[48ch] text-ui text-muted">
                    {project.summary}
                  </span>
                </span>

                {cover ? (
                  <Plate
                    media={cover}
                    label={`Fig. ${number}`}
                    decorative
                    className="work-plate col-span-full md:col-span-3 lg:col-span-3"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
