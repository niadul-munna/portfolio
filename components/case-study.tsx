import Link from "next/link";
import type { ReactNode } from "react";
import { PendingMark } from "@/components/pending-mark";
import { RichText } from "@/components/rich-text";
import { StatusTag } from "@/components/status-tag";
import { isPending, type Project } from "@/content/types";

/* A row of the case study: heading in the left spine, content from col 4. */
export function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="page-grid gap-y-5 border-t border-line pt-6 pb-14 lg:pb-20">
      <h2 id={id} tabIndex={-1} className="col-span-full scroll-mt-6 text-ui font-medium text-ink lg:col-span-3">
        {title}
      </h2>
      <div className="col-span-full md:col-span-7 lg:col-span-7">{children}</div>
    </section>
  );
}

export function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="grid max-w-[66ch] gap-5 text-body text-ink-soft">
      {items.map((item) => (
        <p key={item}>
          <RichText text={item} />
        </p>
      ))}
    </div>
  );
}

export function DashList({ items }: { items: string[] }) {
  return (
    <ul className="grid max-w-[66ch] gap-3 text-body text-ink-soft">
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[1.25rem_1fr]">
          <span aria-hidden="true" className="text-muted">
            –
          </span>
          <span>
            <RichText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Facts({ project }: { project: Project }) {
  const rows: Array<{ term: string; detail: ReactNode }> = [
    { term: "Role", detail: project.role },
    { term: "Context", detail: project.context },
    { term: "Period", detail: project.period },
    { term: "Status", detail: <StatusTag status={project.status} variant="ui" /> },
  ];

  return (
    <div className="page-grid gap-y-6 border-t border-line pt-5">
      <dl className="col-span-full grid gap-x-gap gap-y-5 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
        {rows.map((row) => (
          <div key={row.term}>
            <dt className="font-mono text-meta text-muted">{row.term}</dt>
            <dd className="mt-1 max-w-[36ch] text-ui text-ink">{row.detail}</dd>
          </div>
        ))}
      </dl>
      <dl className="col-span-full grid gap-y-4 border-t border-line pt-5 lg:col-span-12 lg:grid-cols-12 lg:gap-x-gap">
        <dt className="font-mono text-meta text-muted lg:col-span-3">Stack</dt>
        <dd className="text-ui text-ink lg:col-span-9">{project.stack.join(", ")}</dd>
        {project.links.length ? (
          <>
            <dt className="font-mono text-meta text-muted lg:col-span-3">Links</dt>
            <dd className="flex flex-wrap gap-x-5 gap-y-2 text-ui lg:col-span-9">
              {project.links.map((link) =>
                isPending(link) ? (
                  <PendingMark key={link.note} item={link} />
                ) : (
                  <a key={link.href} href={link.href} className="link text-ink" target="_blank" rel="noopener">
                    {link.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ),
              )}
            </dd>
          </>
        ) : null}
        {project.openQuestions?.length ? (
          <>
            <dt className="font-mono text-meta text-muted lg:col-span-3">Open questions</dt>
            <dd className="flex flex-col items-start gap-2 lg:col-span-9">
              {project.openQuestions.map((item) => (
                <PendingMark key={item.note} item={item} />
              ))}
            </dd>
          </>
        ) : null}
      </dl>
    </div>
  );
}

export function Contributions({ items }: { items: Project["caseStudy"]["contributions"] }) {
  return (
    <ol className="grid gap-8">
      {items.map((item) => (
        <li key={item.title} className="max-w-[66ch]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-[1.125rem] leading-snug font-medium tracking-[-0.01em] text-ink">
              {item.title}
            </h3>
            <StatusTag status={item.status} />
          </div>
          <p className="mt-2 text-body text-ink-soft">
            <RichText text={item.body} />
          </p>
        </li>
      ))}
    </ol>
  );
}

export function Decisions({ items }: { items: Project["caseStudy"]["decisions"] }) {
  return (
    <ol className="grid gap-10">
      {items.map((item, index) => (
        <li key={item.decision}>
          <h3 className="flex gap-3 text-[1.125rem] leading-snug font-medium tracking-[-0.01em] text-ink">
            <span className="font-mono text-meta leading-[1.9] text-muted tabular-nums">
              D{index + 1}
            </span>
            <span>
              <RichText text={item.decision} />
            </span>
          </h3>
          <dl className="mt-4 grid gap-5 border-l border-line pl-5 md:grid-cols-2 md:gap-x-gap">
            <div>
              <dt className="font-mono text-meta text-muted">Why</dt>
              <dd className="mt-1 text-ui text-ink-soft">
                <RichText text={item.why} />
              </dd>
            </div>
            <div>
              <dt className="font-mono text-meta text-muted">Trade-off</dt>
              <dd className="mt-1 text-ui text-ink-soft">
                <RichText text={item.tradeoff} />
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ol>
  );
}

export function Outcomes({ items }: { items: Project["caseStudy"]["outcomes"] }) {
  return (
    <ul className="grid max-w-[66ch] gap-4">
      {items.map((item) =>
        isPending(item) ? (
          <li key={item.note}>
            <PendingMark item={item} />
          </li>
        ) : (
          <li key={item.text} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-x-6">
            <span className="text-body text-ink-soft">{item.text}</span>
            <StatusTag status={item.status} className="sm:pt-1.5" />
          </li>
        ),
      )}
    </ul>
  );
}

export function Lessons({ items }: { items: string[] }) {
  return (
    <ol className="grid max-w-[38em] gap-5">
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[2rem_1fr]">
          <span className="pt-1.5 font-mono text-meta text-muted tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-serif text-[1.1875rem] leading-[1.5] text-ink md:text-[1.3125rem]">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function Pager({ previous, next }: { previous?: Project; next?: Project }) {
  if (!previous || !next) return null;
  return (
    <nav aria-label="More case studies" className="page-grid border-t border-line">
      <Link
        href={`/work/${previous.slug}`}
        className="group col-span-2 py-6 md:col-span-4 lg:col-span-6"
      >
        <span className="font-mono text-meta text-muted">
          <span aria-hidden="true">← </span>Previous
        </span>
        <span className="mt-2 block text-heading text-ink transition-colors duration-200 group-hover:text-accent">
          {previous.title}
        </span>
      </Link>
      <Link
        href={`/work/${next.slug}`}
        className="group col-span-2 py-6 text-right md:col-span-4 lg:col-span-6"
      >
        <span className="font-mono text-meta text-muted">
          Next<span aria-hidden="true"> →</span>
        </span>
        <span className="mt-2 block text-heading text-ink transition-colors duration-200 group-hover:text-accent">
          {next.title}
        </span>
      </Link>
    </nav>
  );
}
