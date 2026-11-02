import { ImageResponse } from "next/og";
import { getAllPromises, getPromiseById } from "@/lib/promises";
import { LOCALES, getDictionary, isLocale } from "@/i18n";

export const alt = "Politica India promise card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getAllPromises().map(({ promise }) => ({ lang, pid: promise.id })));
}

const STATUS_COLOR: Record<string, { bg: string; fg: string; border: string }> = {
  NOT_STARTED: { bg: "#f1f5f9", fg: "#475569", border: "#e2e8f0" },
  IN_PROGRESS: { bg: "#fffbeb", fg: "#b45309", border: "#fde68a" },
  REPORTED_COMPLETED: { bg: "#ecfdf5", fg: "#047857", border: "#a7f3d0" },
  VERIFIED_COMPLETED: { bg: "#d1fae5", fg: "#065f46", border: "#6ee7b7" },
  UNABLE_TO_VERIFY: { bg: "#f8fafc", fg: "#64748b", border: "#e2e8f0" },
  EVIDENCE_CONFLICTING: { bg: "#fff7ed", fg: "#c2410c", border: "#fed7aa" },
};

export default async function Image({ params }: { params: Promise<{ lang: string; pid: string }> }) {
  const { lang, pid } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "en");
  const hit = getPromiseById(pid);
  const title = (hit?.promise.title ?? "Politica India").replace(/₹/g, "Rs ");
  const who = hit ? `${hit.candidate.name} · ${hit.candidate.partyAbbr} · ${hit.candidate.constituency}` : "";
  const status = hit?.promise.status ?? "UNABLE_TO_VERIFY";
  const c = STATUS_COLOR[status];
  const sources = hit?.promise.sources?.length ?? 0;
  const checked = hit?.promise.lastChecked ?? "";
  // Use the English status label in the image: OG fonts are Latin-only here.
  const statusLabel = getDictionary("en").promise.status[status];
  const sourcesLabel = getDictionary("en").promisePage.sourcesCount;
  const checkedLabel = getDictionary("en").promise.checked;
  void t;

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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, fontWeight: 700 }}>
            <div style={{ width: 14, height: 44, background: "#141414", borderRadius: 8, border: "2px solid #C41E3A" }} />
            <span>
              <span style={{ color: "#C41E3A" }}>P</span>olitica <span style={{ color: "#C41E3A" }}>I</span>ndia
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              padding: "10px 22px",
              borderRadius: 999,
              background: c.bg,
              color: c.fg,
              border: `3px solid ${c.border}`,
            }}
          >
            {statusLabel}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 22, textTransform: "uppercase", letterSpacing: 3, color: "#94a3b8" }}>Tracked promise</div>
          <div style={{ fontSize: title.length > 60 ? 48 : 58, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#475569" }}>{who}</div>
        </div>

        <div style={{ display: "flex", gap: 40, fontSize: 24, color: "#64748b" }}>
          <div style={{ display: "flex", gap: 8 }}>
            <b style={{ color: "#0f172a" }}>{sources}</b>
            <span>{sourcesLabel}</span>
          </div>
          {checked ? (
            <div style={{ display: "flex", gap: 8 }}>
              <span>{checkedLabel}</span>
              <b style={{ color: "#0f172a" }}>{checked}</b>
            </div>
          ) : null}
          <span style={{ marginLeft: "auto" }}>Every fact attributed. Nobody ranked.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
