import { RichText } from "@/components/rich-text";
import type { NoteBlock } from "@/content/types";

export function NoteBody({ blocks }: { blocks: NoteBlock[] }) {
  return (
    <div className="grid min-w-0 max-w-[66ch] gap-5 text-body text-ink-soft">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "p":
            return (
              <p key={index}>
                <RichText text={block.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={index} className="mt-7 text-heading text-ink">{block.text}</h2>
            );
          case "list":
            return (
              <ul key={index} className="grid gap-3">
                {block.items.map((item) => (
                  <li key={item} className="grid grid-cols-[1.25rem_minmax(0,1fr)]">
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
          case "code":
            return (
              <pre key={index} className="min-w-0 overflow-x-auto rounded-[3px] border border-line bg-panel p-5 font-mono text-ui leading-relaxed text-ink">
                <code className={`language-${block.language} bg-transparent p-0 text-[1em]`}>{block.code}</code>
              </pre>
            );
        }
      })}
    </div>
  );
}
