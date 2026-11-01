import { ImageResponse } from "next/og";
import { getCandidateById, pilotCandidates, resultOf } from "@/data/pilot-candidates";

export const alt = "Politica India profile card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return pilotCandidates.map((c) => ({ id: c.id }));
}

function Stat({ label, value, color = "#0f172a", flex = 1 }: { label: string; value: string; color?: string; flex?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex, minWidth: 0 }}>
      <span style={{ fontSize: 18, textTransform: "uppercase", letterSpacing: 2, color: "#94a3b8" }}>{label}</span>
      <span style={{ color, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden" }}>{value}</span>
    </div>
  );
}

function initials(name: string) {
  return name
    .replace(/\./g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = getCandidateById(id);
  const name = c?.name ?? "Politica India";
  const role = c ? (c.electionType === "Lok Sabha" ? "MP" : "MLA") : "";
  const sub = c ? `${c.partyAbbr} · ${role} · ${c.constituency}, ${c.state}` : "Know who represents you.";
  const won = c ? resultOf(c) === "won" : false;

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
          padding: "56px 64px",
          fontFamily: "sans-serif",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700 }}>
          <div style={{ width: 14, height: 44, background: "#141414", borderRadius: 8, border: "2px solid #C41E3A" }} />
          <span>
            <span style={{ color: "#C41E3A" }}>P</span>olitica <span style={{ color: "#C41E3A" }}>I</span>ndia
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 36,
              background: "#4f46e5",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 72,
              fontWeight: 700,
            }}
          >
            {initials(name)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 820 }}>
            {c && (
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontSize: 22,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: won ? "#ecfdf5" : "#f1f5f9",
                  color: won ? "#047857" : "#475569",
                  border: `2px solid ${won ? "#a7f3d0" : "#e2e8f0"}`,
                }}
              >
                {won ? "Elected" : "Contested"} · {c.electionYear}
              </div>
            )}
            <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>{name}</div>
            <div style={{ fontSize: 30, color: "#475569" }}>{sub}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 32, fontSize: 26, color: "#475569" }}>
          {c ? (
            <>
              <Stat label="Declared assets" value={(c.totalAssets ?? "—").replace(/₹/g, "Rs ").replace(/\s*\(.*\)$/, "")} color="#047857" flex={2} />
              <Stat label="Declared cases" value={String(c.criminalCases)} color={c.criminalCases > 0 ? "#b45309" : "#0f172a"} />
              <Stat label="Promises" value={String(c.promises.length)} />
              <Stat label="Source" value={`ECI Form 26 · ${c.affidavitYear ?? c.electionYear}`} flex={2} />
            </>
          ) : (
            <span>Source-backed records. Nobody ranked.</span>
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
