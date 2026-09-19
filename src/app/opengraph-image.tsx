import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/seo";

export const alt = siteConfig.ogImageAlt.en;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #05070a 0%, #0c1512 45%, #1a3d32 100%)",
          color: "#f5f1e8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#e4c078",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(145deg, #12161a 0%, #1f4d40 125%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 40 40">
              <path
                d="M7 32 16.2 8h2.6L28 32h-3.1l-1.55-4.2h-9.7L12.1 32H7Zm6.35-6.9h7.3L17.5 14.6 13.35 25.1Z"
                fill="#f7f2e8"
              />
              <path d="M21.2 8h3.05v9.6L32.4 32h-3.35L21.2 18.4V8Z" fill="#e8c47a" />
              <path d="M29.4 8H32.5v24H29.4V8Z" fill="#e8c47a" />
            </svg>
          </div>
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: "#e4c078",
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.jobTitle.en}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(245,241,232,0.7)",
              maxWidth: 780,
              lineHeight: 1.4,
            }}
          >
            React · Next.js · TypeScript · Production UI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            color: "rgba(245,241,232,0.55)",
          }}
        >
          <span>{siteConfig.location.en}</span>
          <span style={{ color: "#e4c078" }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
