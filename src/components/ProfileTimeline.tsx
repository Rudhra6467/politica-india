"use client";

/**
 * Dense Timeline v1 — summary rows; expand for detail.
 * Space-first: collapsed by default shows year + type + one line.
 */

import { useState } from "react";
import type { PilotCandidate } from "@/data/pilot-candidates";
import { resultOf } from "@/data/pilot-candidates";

type TimelineItem = {
  id: string;
  year: string;
  type: "ELECTION" | "AFFIDAVIT" | "PROMISE";
  title: string;
  detail?: string;
  source: string;
};

function buildTimeline(c: PilotCandidate): TimelineItem[] {
  const items: TimelineItem[] = [];
  const result = resultOf(c);
  const role = c.electionType === "Lok Sabha" ? "MP" : "MLA";

  items.push({
    id: `el-${c.id}`,
    year: String(c.electionYear),
    type: "ELECTION",
    title: `${c.electionType} · ${result === "won" ? "Won" : result === "lost" ? "Lost" : "Contested"}`,
    detail: [
      `${role} · ${c.constituency}`,
      c.marginVotes != null ? `Margin ${c.marginVotes.toLocaleString()}` : null,
      c.opponentName ? `vs ${c.opponentName}` : null,
    ]
      .filter(Boolean)
      .join(" · "),
    source: "ECI election result",
  });

  const affYear = c.affidavitYear ?? String(c.electionYear);
  items.push({
    id: `af-${c.id}`,
    year: affYear,
    type: "AFFIDAVIT",
    title: "Form 26 affidavit",
    detail: [
      c.totalAssets ? `Assets ${c.totalAssets}` : null,
      `Cases ${c.criminalCases}`,
    ]
      .filter(Boolean)
      .join(" · "),
    source: "ECI Form 26",
  });

  for (const p of c.promises) {
    items.push({
      id: p.id,
      year: p.announcedDate ?? String(c.electionYear),
      type: "PROMISE",
      title: p.title,
      detail: p.status.replace(/_/g, " "),
      source: p.sourceNote ?? "Tracked",
    });
  }

  return items.sort((a, b) => String(b.year).localeCompare(String(a.year)));
}

const typeLabel: Record<TimelineItem["type"], string> = {
  ELECTION: "El.",
  AFFIDAVIT: "Aff.",
  PROMISE: "Pr.",
};

export default function ProfileTimeline({ candidate }: { candidate: PilotCandidate }) {
  const items = buildTimeline(candidate);
  const [open, setOpen] = useState(false);
  const preview = items.slice(0, 2);
  const shown = open ? items : preview;

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50/80 text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
          <span className="text-xs font-semibold text-slate-800">Timeline</span>
          <span className="text-[10px] text-slate-400 tabular-nums">{items.length}</span>
        </div>
        <span className="text-[11px] font-medium text-slate-500 shrink-0">
          {open ? "Less" : "All"}
        </span>
      </button>

      <ul className="divide-y divide-slate-50">
        {shown.map((item) => (
          <li key={item.id} className="px-3 py-2 flex gap-2 items-start">
            <span className="text-[11px] font-semibold text-slate-500 tabular-nums w-10 shrink-0 pt-0.5">
              {item.year}
            </span>
            <span className="text-[10px] font-medium text-slate-400 w-7 shrink-0 pt-0.5">
              {typeLabel[item.type]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-900 leading-snug line-clamp-2">{item.title}</p>
              {open && item.detail && (
                <p className="mt-0.5 text-[10px] text-slate-500 leading-snug">{item.detail}</p>
              )}
              {open && (
                <p className="mt-0.5 text-[10px] text-slate-400">{item.source}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
