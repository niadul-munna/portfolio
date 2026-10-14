import type { WorkStatus } from "@/content/types";

const labels: Record<WorkStatus, string> = {
  shipped: "Shipped",
  "in-review": "In review",
  "in-progress": "In progress",
  prototype: "Prototype",
  concept: "Concept",
  personal: "Personal",
};

/**
 * Status is always written out; the marker shape only reinforces it.
 * Filled: shipped. Ring: built but not released. Dashed ring: concept.
 */
export function StatusTag({
  status,
  variant = "meta",
  className = "",
}: {
  status: WorkStatus;
  /** `meta` for lists and annotations, `ui` where it sits among body-size facts. */
  variant?: "meta" | "ui";
  className?: string;
}) {
  const marker =
    status === "shipped" || status === "personal"
      ? "bg-accent"
      : status === "concept"
        ? "border border-dashed border-muted"
        : "border border-muted";

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap ${variant === "meta" ? "font-mono text-meta text-muted" : "gap-2 text-ui text-ink"} ${className}`}
    >
      <span aria-hidden="true" className={`size-[7px] shrink-0 rounded-full ${marker}`} />
      {labels[status]}
    </span>
  );
}
