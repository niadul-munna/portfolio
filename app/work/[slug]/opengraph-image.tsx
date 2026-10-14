import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { OgFrame, OgText, ogColors, ogFonts, ogSize } from "@/lib/og";
import { getProject, projectNumber, visibleProjects } from "@/lib/site";

export const alt = `Case study by ${profile.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return visibleProjects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? profile.name;

  return new ImageResponse(
    (
      <OgFrame
        topLeft={project ? `${projectNumber(project.slug)} · ${project.category}` : "Case study"}
        topRight={project?.period ?? ""}
        footerLeft={<div style={{ color: ogColors.ink }}>{profile.name}</div>}
        footerRight="Case study"
      >
        <OgText text={title} style={{ fontSize: 112, fontWeight: 500, letterSpacing: -3, lineHeight: 1 }} />
        {project ? (
          <OgText
            text={project.summary}
            style={{ marginTop: 28, fontSize: 32, lineHeight: 1.35, color: ogColors.muted, maxWidth: 940 }}
          />
        ) : null}
      </OgFrame>
    ),
    { ...size, fonts: ogFonts },
  );
}
