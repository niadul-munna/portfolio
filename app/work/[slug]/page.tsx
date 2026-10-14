import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CaseSection,
  Contributions,
  DashList,
  Decisions,
  Facts,
  Lessons,
  Outcomes,
  Pager,
  Paragraphs,
} from "@/components/case-study";
import { Container } from "@/components/container";
import { Plate } from "@/components/plate";
import { getAdjacentProjects, getProject, projectNumber, visibleProjects } from "@/lib/site";

// Every case study is known at build time; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return visibleProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} case study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
    twitter: { title, description: project.summary },
    ...(project.visibility === "draft" ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const number = projectNumber(project.slug);
  const { previous, next } = getAdjacentProjects(project.slug);
  const { caseStudy } = project;

  return (
    <article>
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-4 pt-8 font-mono text-meta text-muted lg:pt-10">
          <Link href="/#work" className="link -my-2 py-2 text-ink">
            <span aria-hidden="true">← </span>Selected work
          </Link>
          <span className="tabular-nums">
            Case study {number} of {String(visibleProjects.length).padStart(2, "0")}
          </span>
        </div>

        {project.visibility === "draft" ? (
          <p className="mt-8 rounded-[3px] border border-dashed border-line-strong px-4 py-3 font-mono text-meta text-muted">
            Draft. Visible in development only and left out of production builds until the open
            questions below are answered. See CONTENT-TODO.md.
          </p>
        ) : null}

        <header className="page-grid gap-y-6 pt-12 pb-12 lg:pt-20 lg:pb-16">
          <p className="col-span-full flex gap-4 font-mono text-meta text-muted lg:col-span-3 lg:flex-col lg:gap-1.5 lg:pt-4">
            <span className="text-ink tabular-nums">{number}</span>
            <span>{project.category}</span>
          </p>
          <div className="col-span-full lg:col-span-9">
            <h1 className="text-display text-ink">{project.title}</h1>
            <p className="mt-6 max-w-[38em] font-serif text-standfirst text-ink-soft lg:mt-8">
              {project.standfirst}
            </p>
          </div>
        </header>

        <Facts project={project} />

        <div className="grid gap-12 py-14 lg:py-20">
          {project.media.map((media, index) => (
            <Plate
              key={media.caption}
              media={media}
              label={`Fig. ${String(index + 1).padStart(2, "0")}`}
              detailed
              spread
              eager={index === 0}
            />
          ))}
        </div>

        <CaseSection id="background" title="Background">
          <Paragraphs items={caseStudy.background} />
        </CaseSection>
        <CaseSection id="problem" title="The problem">
          <Paragraphs items={caseStudy.problem} />
        </CaseSection>
        <CaseSection id="constraints" title="Constraints">
          <DashList items={caseStudy.constraints} />
        </CaseSection>
        <CaseSection id="contributions" title="What I did">
          <Contributions items={caseStudy.contributions} />
        </CaseSection>
        <CaseSection id="decisions" title="Decisions">
          <Decisions items={caseStudy.decisions} />
        </CaseSection>
        <CaseSection id="outcome" title="Outcome">
          <Outcomes items={caseStudy.outcomes} />
        </CaseSection>
        <CaseSection id="lessons" title="Lessons">
          <Lessons items={caseStudy.lessons} />
        </CaseSection>

        <Pager previous={previous} next={next} />
      </Container>
    </article>
  );
}
