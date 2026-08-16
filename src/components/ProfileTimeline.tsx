/**
 * Thin Timeline v1 — derived from pilot fields.
 * Later: Event rows from Postgres (Tier 2C).
 */

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
    title: `${c.electionType} ${c.electionYear} · ${result === "won" ? "Won" : result === "lost" ? "Lost" : "Contested"}`,
    detail: [
      `${role} · ${c.constituency}`,
      c.marginVotes != null ? `Margin ${c.marginVotes.toLocaleString()} votes` : null,
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
    title: "Form 26 affidavit filed",
    detail: [
      c.totalAssets ? `Assets ${c.totalAssets}` : null,
      `Cases declared ${c.criminalCases}`,
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
      detail: p.status.replace(/_/g, " ").toLowerCase(),
      source: p.sourceNote ?? "Tracked announcement",
    });
  }

  // Newest first roughly by year string
  return items.sort((a, b) => String(b.year).localeCompare(String(a.year)));
}

const typeStyle: Record<TimelineItem["type"], string> = {
  ELECTION: "bg-indigo-50 text-indigo-700 border-indigo-100",
  AFFIDAVIT: "bg-blue-50 text-blue-700 border-blue-100",
  PROMISE: "bg-amber-50 text-amber-800 border-amber-100",
};

const typeLabel: Record<TimelineItem["type"], string> = {
  ELECTION: "Election",
  AFFIDAVIT: "Affidavit",
  PROMISE: "Promise",
};

export default function ProfileTimeline({ candidate }: { candidate: PilotCandidate }) {
  const items = buildTimeline(candidate);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100 bg-slate-50/80">
        <span className="h-2 w-2 rounded-full bg-violet-500" />
        <div>
          <h2 className="text-sm font-semibold text-slate-800 tracking-wide">Timeline</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Key events from election, affidavit and tracked announcements
          </p>
        </div>
      </div>

      <ol className="p-4 sm:p-5 space-y-0">
        {items.map((item, i) => (
          <li key={item.id} className="flex gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
              {i < items.length - 1 && <div className="w-px flex-1 bg-slate-100 min-h-[2rem]" />}
            </div>
            <div className={`pb-4 min-w-0 flex-1 ${i === items.length - 1 ? "pb-0" : ""}`}>
              <div className="flex flex-wrap items-center gap-2 gap-y-1">
                <span className="text-xs font-semibold text-slate-500 tabular-nums">{item.year}</span>
                <span
                  className={
                    "text-[10px] font-medium px-1.5 py-0.5 rounded-md border " + typeStyle[item.type]
                  }
                >
                  {typeLabel[item.type]}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-900 leading-snug">{item.title}</p>
              {item.detail && (
                <p className="mt-0.5 text-xs text-slate-500 leading-relaxed capitalize">{item.detail}</p>
              )}
              <p className="mt-1 text-[10px] text-slate-400">{item.source}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
