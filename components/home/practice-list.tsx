import { StatusTag } from "@/components/status-tag";
import type { PracticeEntry } from "@/content/types";

export function PracticeList({ entries }: { entries: PracticeEntry[] }) {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id} className="page-grid gap-y-3 border-t border-line py-7 last:border-b lg:py-8">
          <div className="col-span-full flex flex-wrap items-baseline gap-x-5 gap-y-1 lg:col-span-3 lg:flex-col lg:gap-y-2">
            <span className="font-mono text-meta text-ink">{entry.area}</span>
            <StatusTag status={entry.status} />
            {entry.visibility === "draft" ? (
              <span className="rounded-[3px] border border-dashed border-line-strong px-1.5 font-mono text-meta text-muted">
                Draft, not published
              </span>
            ) : null}
          </div>
          <div className="col-span-full md:col-span-6 lg:col-span-6">
            <h3 className="text-[1.1875rem] leading-snug font-medium tracking-[-0.012em] text-ink">
              {entry.title}
            </h3>
            <p className="mt-2 max-w-[62ch] text-ui text-ink-soft">{entry.body}</p>
            {entry.link ? (
              <a
                href={entry.link.href}
                className="link mt-3 inline-block font-mono text-meta text-ink"
                target="_blank"
                rel="noopener"
              >
                {entry.link.label} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
          <p className="col-span-full font-mono text-meta text-muted md:col-span-2 lg:col-span-3">
            {entry.stack.join(", ")}
          </p>
        </li>
      ))}
    </ul>
  );
}
