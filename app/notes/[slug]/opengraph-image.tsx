import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { OgFrame, OgText, ogColors, ogFonts, ogSize } from "@/lib/og";
import { getNote, visibleNotes } from "@/lib/site";

export const alt = `Engineering note by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";
export const dynamicParams = false;

export function generateStaticParams() {
  return visibleNotes.map((note) => ({ slug: note.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return new ImageResponse(
    (
      <OgFrame
        topLeft="Engineering note"
        topRight={note.date}
        footerLeft={<div style={{ color: ogColors.ink }}>{profile.name}</div>}
        footerRight="Notes"
      >
        <OgText text={note.title} style={{ fontSize: 68, fontWeight: 500, letterSpacing: -1.5, lineHeight: 1.1 }} />
        <OgText
          text={note.summary}
          style={{ marginTop: 28, fontSize: 28, lineHeight: 1.35, color: ogColors.muted, maxWidth: 940 }}
        />
      </OgFrame>
    ),
    { ...size, fonts: ogFonts },
  );
}
