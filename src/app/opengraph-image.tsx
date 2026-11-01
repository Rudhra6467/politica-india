import { ImageResponse } from "next/og";
import { getSiteStats } from "@/lib/stats";

export const alt = "Politica India — Know who represents you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const stats = getSiteStats();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "64px",
          fontFamily: "sans-serif",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 700 }}>
          <div style={{ width: 14, height: 46, background: "#141414", borderRadius: 8, border: "2px solid #C41E3A" }} />
          <span>
            <span style={{ color: "#C41E3A" }}>P</span>olitica <span style={{ color: "#C41E3A" }}>I</span>ndia
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 86, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>Know who represents you.</div>
          <div style={{ fontSize: 34, color: "#475569", maxWidth: 1000 }}>
            Official affidavit records, tracked promises and citizen reaction. Every fact attributed. Nobody ranked.
          </div>
        </div>
        <div style={{ display: "flex", gap: 56, fontSize: 28, color: "#475569" }}>
          <span>
            <b style={{ color: "#0f172a" }}>{stats.candidates}</b> representatives
          </span>
          <span>
            <b style={{ color: "#0f172a" }}>{stats.promises}</b> promises tracked
          </span>
          <span>
            <b style={{ color: "#0f172a" }}>{stats.states}</b> states · pilot
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
