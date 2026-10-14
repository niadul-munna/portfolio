import type { Pending } from "@/content/types";

/**
 * A visible placeholder for a fact that hasn't been confirmed. Deliberately
 * looks unfinished so it can't be mistaken for real content.
 * Run `pnpm check:content` to list every one.
 */
export function PendingMark({ item, className = "" }: { item: Pending; className?: string }) {
  return (
    <span
      className={`inline-block rounded-[3px] border border-dashed border-line-strong px-1.5 py-px font-mono text-meta text-muted ${className}`}
      title="Pending: not yet confirmed. See CONTENT-TODO.md"
    >
      Pending: {item.note}
    </span>
  );
}
