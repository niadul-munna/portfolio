import type { ReactNode } from "react";

type SectionHeaderProps = {
  id: string;
  number: string;
  title: string;
  children?: ReactNode;
};

/**
 * The left-hand spine of every homepage section: a number and a title in
 * columns 1–3, with an optional introduction from column 4.
 */
export function SectionHeader({ id, number, title, children }: SectionHeaderProps) {
  return (
    <header className="page-grid gap-y-3 pb-10 lg:pb-14">
      <div className="col-span-full flex items-baseline gap-4 lg:col-span-3">
        <span className="font-mono text-meta text-muted tabular-nums">{number}</span>
        <h2 id={id} className="text-ui font-medium tracking-[-0.005em] text-ink">
          {title}
        </h2>
      </div>
      {children ? (
        <div className="col-span-full max-w-[52ch] text-ui text-muted md:col-span-6 lg:col-span-5 lg:col-start-4">
          {children}
        </div>
      ) : null}
    </header>
  );
}
