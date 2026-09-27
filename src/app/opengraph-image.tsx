import { ImageResponse } from "next/og";

export const alt = "VIIV by Varman — Graduated. Still looking for the right job?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0c11",
          color: "#faf8f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: -2 }}>VIIV</span>
          <span style={{ fontSize: 56, fontWeight: 800, color: "#ff6b1a", marginLeft: -14 }}>.</span>
          <span style={{ fontSize: 24, color: "#a4a8b5" }}>by Varman</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>Graduated.</span>
          <span style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            Still looking for the right job?
          </span>
          <span style={{ fontSize: 34, marginTop: 24, color: "#ff8a4c" }}>Your career options are bigger than you think.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a4a8b5", letterSpacing: 4 }}>
          DISCOVER · LEARN · PRACTICE · PROVE · LAUNCH
        </div>
      </div>
    ),
    size,
  );
}
