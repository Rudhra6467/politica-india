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
import CandidateAvatar from "@/components/CandidateAvatar";

function roleLabel(electionType: string) {
  if (electionType === "Lok Sabha") return "MP";
  if (electionType === "Assembly") return "MLA";
  return electionType;
}

function CandidateRow({
  candidate,
  backHref,
}: {
  candidate: PilotCandidate;
  backHref: string;
}) {
  const role = roleLabel(candidate.electionType);
  const profileHref =
    "/candidates/" + candidate.id + "?from=" + encodeURIComponent(backHref);
  const won = resultOf(candidate) === "won";

  return (
    <Link
      href={profileHref}
      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm hover:border-indigo-200 hover:shadow-md transition"
    >
      <CandidateAvatar
        name={candidate.name}
        photoUrl={candidate.photoUrl}
        size="sm"
      />
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-slate-900 text-sm leading-snug truncate">
          {candidate.name}
        </div>
        <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-1.5">
          <span>{role}</span>
          <span className="text-slate-300">·</span>
          <span className={"truncate"}>{candidate.constituency}</span>
          {!won && (
            <>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400">Lost</span>
            </>
          )}
        </div>
      </div>
      <span className="text-slate-300 text-base shrink-0" aria-hidden>
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
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left hover:bg-slate-100 transition"
      >
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-800">{title}</div>
          <div className="text-[11px] text-slate-500">
            {subtitle} · {candidates.length}
          </div>
        </div>
        <span className="text-slate-400 text-xs font-medium shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="space-y-1.5">
          {candidates.map((c) => (
            <CandidateRow key={c.id} candidate={c} backHref={backHref} />
          ))}
        </div>
      )}
    </div>
  );
}

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

  const backHref = state
    ? "/party/" + abbr + "?state=" + encodeURIComponent(state)
    : "/party/" + abbr;

  const shortLine = info?.short?.[0];

  return (
    <div className="space-y-4 pb-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
      >
        <span aria-hidden>←</span> Back to home
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <PartyBadge abbr={abbr} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {info?.name || abbr}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {mps.length} MP · {mlas.length} MLA · {statesCovered} state
              {statesCovered > 1 ? "s" : ""} · pilot
            </p>
          </div>
        </div>
        {shortLine && (
          <p className="text-sm text-slate-600 mt-3 leading-snug">{shortLine}</p>
        )}
      </div>

      <CollapsibleRoleSection
        title="MPs (won)"
        subtitle="Lok Sabha"
        candidates={mps}
        backHref={backHref}
      />
      <CollapsibleRoleSection
        title="MLAs (won)"
        subtitle="Assembly"
        candidates={mlas}
        backHref={backHref}
      />
      <CollapsibleRoleSection
        title="Lost the election"
        subtitle="For context only"
        candidates={losers}
        backHref={backHref}
        defaultOpen={false}
      />
    </div>
  );
}
