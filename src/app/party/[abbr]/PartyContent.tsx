"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  pilotCandidates,
  getCandidatesByPartyAndState,
  resultOf,
  type PilotCandidate,
} from "@/data/pilot-candidates";
import { getPartyInfo } from "@/data/party-info";
import PartyBadge from "@/components/PartyBadge";
import PartyIntro from "@/components/PartyIntro";

function roleLabel(electionType: string) {
  if (electionType === "Lok Sabha") return "MP";
  if (electionType === "Assembly") return "MLA";
  return electionType;
}

function CandidateRow({
  candidate,
  index,
  backHref,
}: {
  candidate: PilotCandidate;
  index: number;
  backHref: string;
}) {
  const role = roleLabel(candidate.electionType);
  const num = String(index + 1).padStart(2, "0");
  const profileHref =
    "/candidates/" + candidate.id + "?from=" + encodeURIComponent(backHref);

  return (
    <Link
      href={profileHref}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm hover:border-indigo-200 hover:shadow-md transition"
    >
      <span className="text-lg font-bold text-slate-200 tabular-nums w-8 shrink-0">{num}</span>
      <PartyBadge abbr={candidate.partyAbbr} size="md" />
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-slate-900 text-[15px]">{candidate.name}</div>
        <div className="text-xs text-slate-500 mt-0.5">
          {role} · {candidate.constituency}
          {candidate.state ? " · " + candidate.state : ""}
        </div>
      </div>
      <span className="text-slate-300 text-lg shrink-0" aria-hidden>
        →
      </span>
    </Link>
  );
}

function CollapsibleRoleSection({
  title,
  subtitle,
  candidates,
  backHref,
  defaultOpen = true,
}: {
  title: string;
  subtitle: string;
  candidates: PilotCandidate[];
  backHref: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (candidates.length === 0) return null;

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:bg-slate-100 transition"
      >
        <div>
          <div className="text-sm font-semibold text-slate-800">{title}</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {subtitle} · {candidates.length}{" "}
            {candidates.length > 1 ? "candidates" : "candidate"}
          </div>
        </div>
        <span className="text-slate-500 text-sm font-medium shrink-0">
          {open ? "Minimize -" : "Expand +"}
        </span>
      </button>

      {open && (
        <div className="space-y-2">
          {candidates.map((c, i) => (
            <CandidateRow key={c.id} candidate={c} index={i} backHref={backHref} />
          ))}
        </div>
      )}
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm text-center">
      <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-0.5 text-lg font-semibold text-slate-900 tabular-nums">{value}</div>
    </div>
  );
}

/** Pilot alliance counts — informational only until curated */
const ALLIANCE_HINT: Record<string, number> = {
  TDP: 2,
  JSP: 2,
  BJP: 2,
  YSRCP: 0,
  BRS: 0,
  INC: 1,
};

export default function PartyContent({ abbr }: { abbr: string }) {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const info = getPartyInfo(abbr);

  const allForParty = state
    ? getCandidatesByPartyAndState(abbr, state)
    : pilotCandidates
        .filter((c) => c.partyAbbr === abbr)
        .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));

  const winners = allForParty.filter((c) => resultOf(c) === "won");
  const losers = allForParty.filter((c) => resultOf(c) === "lost");

  const mps = winners.filter((c) => c.electionType === "Lok Sabha");
  const mlas = winners.filter((c) => c.electionType === "Assembly");
  const statesCovered = new Set(allForParty.map((c) => c.state)).size;
  const alliances = ALLIANCE_HINT[abbr] ?? 0;

  const backHref = state
    ? "/party/" + abbr + "?state=" + encodeURIComponent(state)
    : "/party/" + abbr;

  return (
    <div className="space-y-4 pb-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
      >
        <span aria-hidden>←</span> Back to home
      </Link>

      {info ? (
        <PartyIntro info={info} />
      ) : (
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <PartyBadge abbr={abbr} size="lg" />
          <h1 className="text-2xl font-bold text-slate-900">{abbr}</h1>
        </div>
      )}

      {/* Header metrics: MPs · MLAs · States · Alliances */}
      <div className="grid grid-cols-4 gap-2">
        <MetricBox label="MPs" value={String(mps.length)} />
        <MetricBox label="MLAs" value={String(mlas.length)} />
        <MetricBox label="States" value={String(statesCovered)} />
        <MetricBox label="Alliances" value={alliances > 0 ? String(alliances) : "—"} />
      </div>

      {state && (
        <p className="text-xs text-slate-400">
          Showing candidates in <span className="font-medium text-slate-600">{state}</span>
        </p>
      )}

      <section className="space-y-4">
        {allForParty.length === 0 ? (
          <p className="text-sm text-slate-500">No candidates found.</p>
        ) : (
          <>
            <CollapsibleRoleSection
              title="Members of Parliament (MPs)"
              subtitle="Lok Sabha · won"
              candidates={mps}
              backHref={backHref}
              defaultOpen={true}
            />
            <CollapsibleRoleSection
              title="Members of Legislative Assembly (MLAs)"
              subtitle="State Assembly · won"
              candidates={mlas}
              backHref={backHref}
              defaultOpen={true}
            />
            <CollapsibleRoleSection
              title="Lost the election"
              subtitle="Contested and did not win"
              candidates={losers}
              backHref={backHref}
              defaultOpen={losers.length > 0 && mps.length + mlas.length === 0}
            />
          </>
        )}
      </section>
    </div>
  );
}
