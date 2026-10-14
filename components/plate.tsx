import Image from "next/image";
import type { Media } from "@/content/types";
import { Schematic, schematicLegends } from "./schematics";

type PlateProps = {
  media: Media;
  /** Figure label, e.g. "Fig. 01". */
  label: string;
  /** Full caption with the callout legend, for case study pages. */
  detailed?: boolean;
  /** Decorative previews (the work index) are hidden from assistive tech. */
  decorative?: boolean;
  /** Load immediately instead of lazily, for images near the top of a page. */
  eager?: boolean;
  /** Case study layout: image in columns 4–12, caption in the left spine. */
  spread?: boolean;
  className?: string;
};

export function Plate({
  media,
  label,
  detailed,
  decorative,
  eager,
  spread,
  className = "",
}: PlateProps) {
  const isSchematic = media.kind === "schematic";

  return (
    <figure
      className={`${spread ? "page-grid gap-y-4" : ""} ${className}`}
      aria-hidden={decorative || undefined}
    >
      <div
        className={`overflow-hidden rounded-[3px] border border-line bg-panel ${spread ? "col-span-full lg:col-span-9 lg:col-start-4" : ""} ${spread && isSchematic ? "px-4 py-6 sm:px-10 sm:py-12" : ""}`}
      >
        {isSchematic ? (
          // Capped on case studies so annotation text stays near meta size.
          <div className={spread ? "mx-auto max-w-[36rem]" : undefined}>
            <Schematic id={media.schematic} title={decorative ? undefined : media.caption} />
          </div>
        ) : (
          <Image
            src={media.src}
            alt={decorative ? "" : media.alt}
            width={media.width}
            height={media.height}
            sizes="(min-width: 1024px) 66vw, 100vw"
            loading={eager ? "eager" : undefined}
            className="h-auto w-full"
          />
        )}
      </div>
      <figcaption
        className={`font-mono text-meta text-muted ${spread ? "col-span-full lg:col-span-3 lg:row-start-1 lg:self-end" : "mt-3"}`}
      >
        <span className="text-ink">{label}</span>
        {isSchematic ? (detailed ? " · Schematic, not a product screenshot" : " · Schematic, not a screenshot") : null}
        {detailed ? (
          <>
            <span className="mt-2 block max-w-[60ch] font-sans text-ui text-muted">
              {media.caption}
            </span>
            {isSchematic ? (
              <ol className="mt-3 grid gap-1">
                {schematicLegends[media.schematic].map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="w-4 shrink-0 tabular-nums text-ink">{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            ) : null}
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}
