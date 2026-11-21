import { ImageResponse } from "next/og";

// Default social preview for every page that doesn't set its own image
// (blog posts and destinations use their hero image instead).
export const alt = "The Halal Explorer: halal travel guides for Muslim travellers";
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
          background: "linear-gradient(135deg, #0F1923 0%, #1D6A5B 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 6, textTransform: "uppercase", color: "#F59E0B" }}>
          The Halal Explorer
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>Halal travel guides</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>for Muslim travellers</div>
        </div>
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.8)" }}>
          Halal food · Mosques & prayer times · Umrah guides · thehalalexplorer.com
        </div>
      </div>
    ),
    size
  );
}
