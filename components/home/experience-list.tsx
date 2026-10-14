import type { Position } from "@/content/types";

export function ExperienceList({ positions }: { positions: Position[] }) {
  return (
    <ol>
      {positions.map((position) => (
        <li key={position.organisation} className="page-grid gap-y-4 border-t border-line py-7 last:border-b lg:py-8">
          <p className="col-span-full font-mono text-meta text-muted tabular-nums lg:col-span-3">
            {position.period}
          </p>
          <div className="col-span-full md:col-span-6 lg:col-span-6">
            <h3 className="text-[1.1875rem] leading-snug font-medium tracking-[-0.012em] text-ink">
              {position.organisation}
            </h3>
            <p className="mt-1 text-ui text-muted">{position.description}</p>

            <ol className="mt-5 grid gap-1.5" aria-label={`Roles at ${position.organisation}`}>
              {position.roles.map((role) => (
                <li key={role.title} className="flex flex-wrap items-baseline justify-between gap-x-6 text-ui">
                  <span className="text-ink">{role.title}</span>
                  <span className="font-mono text-meta text-muted tabular-nums">{role.period}</span>
                </li>
              ))}
            </ol>

            <ul className="mt-6 grid gap-3 text-ui text-ink-soft">
              {position.summary.map((line) => (
                <li key={line} className="grid grid-cols-[1rem_1fr]">
                  <span aria-hidden="true" className="text-muted">
                    –
                  </span>
                  <span className="max-w-[62ch]">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
