import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { OgFrame, OgText, ogColors, ogFonts, ogSize } from "@/lib/og";

export const alt = `${profile.name}, ${profile.role.toLowerCase()} at ${profile.employer}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgFrame
        topLeft={
          <div style={{ color: ogColors.ink, fontFamily: "Geist", fontWeight: 500, fontSize: 28 }}>
            {profile.name}
          </div>
        }
        topRight={`${profile.role} · ${profile.employer}`}
        footerLeft={`${profile.location} · ${profile.timezone}`}
        footerRight="Selected work and case studies"
      >
        <OgText
          text={profile.statement}
          style={{ fontSize: 64, fontWeight: 500, lineHeight: 1.06, letterSpacing: -1.5, maxWidth: 1000 }}
        />
      </OgFrame>
    ),
    { ...size, fonts: ogFonts },
  );
}
