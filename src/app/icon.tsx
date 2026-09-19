import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #12161a 0%, #1f4d40 125%)",
          borderRadius: 8,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 40 40">
          <path
            d="M7 32 16.2 8h2.6L28 32h-3.1l-1.55-4.2h-9.7L12.1 32H7Zm6.35-6.9h7.3L17.5 14.6 13.35 25.1Z"
            fill="#f7f2e8"
          />
          <path d="M21.2 8h3.05v9.6L32.4 32h-3.35L21.2 18.4V8Z" fill="#e8c47a" />
          <path d="M29.4 8H32.5v24H29.4V8Z" fill="#e8c47a" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
