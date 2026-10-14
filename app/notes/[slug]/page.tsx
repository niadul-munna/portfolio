import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { NoteBody } from "@/components/note-body";
import { profile } from "@/content/profile";
import { getNote, getProject, siteUrl, visibleNotes } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return {
    title: note.title,
    description: note.summary,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      type: "article",
      title: note.title,
      description: note.summary,
      url: `/notes/${note.slug}`,
      publishedTime: note.date,
    },
    twitter: { title: note.title, description: note.summary },
    ...(note.visibility === "draft" ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const related = note.relatedProject ? getProject(note.relatedProject) : undefined;

  return (
    <article>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: note.title,
        description: note.summary,
        datePublished: note.date,
        author: { "@type": "Person", name: profile.name, url: siteUrl },
        mainEntityOfPage: `${siteUrl}/notes/${note.slug}`,
      }} />
      <Container>
        <div className="pt-8 font-mono text-meta lg:pt-10">
          <Link href="/#work" className="link -my-2 inline-block py-2 text-ink">
            <span aria-hidden="true">← </span>Selected work
          </Link>
        </div>

        {note.visibility === "draft" ? (
          <p className="mt-8 rounded-[3px] border border-dashed border-line-strong px-4 py-3 font-mono text-meta text-muted">
            Draft, not published. Awaiting review.
          </p>
        ) : null}

        <header className="page-grid gap-y-6 pt-12 pb-12 lg:pt-20 lg:pb-16">
          <p className="col-span-full flex gap-4 font-mono text-meta text-muted lg:col-span-3 lg:flex-col lg:gap-1.5 lg:pt-2">
            <span className="text-ink">Note</span>
            <time dateTime={note.date} className="tabular-nums">{note.date}</time>
          </p>
          <div className="col-span-full md:col-span-7 lg:col-span-7">
            <h1 className="text-title text-ink">{note.title}</h1>
            <p className="mt-6 max-w-[38em] font-serif text-standfirst text-ink-soft lg:mt-8">
              {note.standfirst}
            </p>
          </div>
        </header>

        <div className="page-grid border-t border-line pt-8 pb-14 lg:pt-10 lg:pb-20">
          <div className="col-span-full min-w-0 md:col-span-7 lg:col-span-7 lg:col-start-4">
            <NoteBody blocks={note.body} />
          </div>
        </div>

        {related ? (
          <footer className="page-grid gap-y-3 border-t border-line pt-6 pb-14 lg:pb-20">
            <p className="col-span-full font-mono text-meta text-muted lg:col-span-3">Related work</p>
            <Link href={`/work/${related.slug}`} className="link col-span-full w-fit text-ui text-ink md:col-span-7 lg:col-span-7">
              {related.title} case study <span aria-hidden="true">→</span>
            </Link>
          </footer>
        ) : null}
      </Container>
    </article>
  );
}
