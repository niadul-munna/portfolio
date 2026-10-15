import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { CSSProperties, ReactNode } from "react";

/** Static TTF instances (Satori reads neither WOFF2 nor variable fonts); OFL licences sit beside them. */
const fontDir = join(process.cwd(), "assets/fonts");

const [regular, medium, mono] = await Promise.all([
  readFile(join(fontDir, "SchibstedGrotesk-Regular.ttf")),
  readFile(join(fontDir, "SchibstedGrotesk-Medium.ttf")),
  readFile(join(fontDir, "IBMPlexMono-Regular.ttf")),
]);

export const ogSize = { width: 1200, height: 630 };

export const ogFonts = [
  { name: "Schibsted Grotesk", data: regular, weight: 400 as const, style: "normal" as const },
  { name: "Schibsted Grotesk", data: medium, weight: 500 as const, style: "normal" as const },
  { name: "IBM Plex Mono", data: mono, weight: 400 as const, style: "normal" as const },
];

export const ogColors = {
  canvas: "#f7f7f4",
  ink: "#20221f",
  muted: "#666a63",
  line: "#daddd5",
  accent: "#4a6151",
};

/**
 * Shared frame: a metadata row, the body, and a hairline footer.
 * Each slot is a separate prop because Satori collapses a fragment's
 * children into one item, which defeats `space-between`.
 */
export function OgFrame({
  topLeft,
  topRight,
  footerLeft,
  footerRight,
  children,
}: {
  topLeft: ReactNode;
  topRight: ReactNode;
  footerLeft: ReactNode;
  footerRight: ReactNode;
  children: ReactNode;
}) {
  const row: CSSProperties = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "baseline",
    fontFamily: "IBM Plex Mono",
    fontSize: 22,
    color: ogColors.muted,
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px 56px",
        background: ogColors.canvas,
        color: ogColors.ink,
        fontFamily: "Schibsted Grotesk",
      }}
    >
      <div style={row}>
        <div style={{ display: "flex" }}>{topLeft}</div>
        <div style={{ display: "flex" }}>{topRight}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
      <div style={{ ...row, borderTop: `1px solid ${ogColors.line}`, paddingTop: 22 }}>
        <div style={{ display: "flex" }}>{footerLeft}</div>
        <div style={{ display: "flex" }}>{footerRight}</div>
      </div>
    </div>
  );
}

/**
 * Satori measures a word without kerning but draws it with kerning, which
 * leaves extra space after long words. Laying text out one character per
 * box keeps word spacing even; the lost kerning isn't visible at this size.
 */
export function OgText({ text, style }: { text: string; style: CSSProperties }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: "0.25em", ...style }}>
      {text.split(" ").map((word, wordIndex) => (
        <div key={wordIndex} style={{ display: "flex" }}>
          {[...word].map((character, index) => (
            <div key={index}>{character}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
