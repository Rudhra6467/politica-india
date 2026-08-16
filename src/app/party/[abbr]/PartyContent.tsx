"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  pilotCandidates,
  getCandidatesByPartyAndState,
  getOtherCandidatesInState,
} from "@/data/pilot-candidates";
import { getPartyInfo } from "@/data/party-info";
import PartyBadge from "@/components/PartyBadge";
import PartyIntro from "@/components/PartyIntro";

const PARTY_COLORS: Record<string, string> = {
  BJP: "bg-orange-500 text-white",
  INC: "bg-sky-600 text-white",
  TDP: "bg-yellow-500 text-black",
  YSRCP: "bg-blue-700 text-white",
  JSP: "bg-red-600 text-white",
  DMK: "bg-black text-white",
  AIADMK: "bg-orange-600 text-white",
  "JD(S)": "bg-green-700 text-white",
  BRS: "bg-pink-600 text-white",
  AITC: "bg-emerald-600 text-white",
  SP: "bg-red-600 text-white",
  AAP: "bg-blue-500 text-white",
};

function roleLabel(electionType: string) {
  if (electionType === "Lok Sabha") return "MP";
  if (electionType === "Assembly") return "MLA";
  return electionType;
}

function CandidateRow({
  candidate,
}: {
  candidate: {
    id: string;
    name: string;
    partyAbbr: string;
    constituency: string;
    state: string;
    electionType: string;
    likes: number;
    dislikes: number;
  };
}) {
  const role = roleLabel(candidate.electionType);
  const color = PARTY_COLORS[candidate.partyAbbr] || "bg-slate-600 text-white";

  return (
    <Link
      href={`/candidates/${candidate.id}`}
      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3.5 py-3 shadow-sm hover:border-indigo-200 hover:shadow-md transition"
    >
      <div className={`shrink-0 h-10 w-10 rounded-xl flex items-center justify-center text-[11px] font-bold ${color}`}>
        {candidate.partyAbbr}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-semibold text-slate-900">{candidate.name}</div>
        <div className="truncate text-xs text-slate-500 mt-0.5">
          {role} · {candidate.constituency}
          {candidate.state ? ` · ${candidate.state}` : ""}
        </div>
      </div>
      <div className="shrink-0 text-right text-xs space-y-0.5">
        <div className="text-emerald-600 font-medium">👍 {candidate.likes.toLocaleString()}</div>
        <div className="text-rose-500 font-medium">👎 {candidate.dislikes.toLocaleString()}</div>
      </div>
    </Link>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 text-xl font-semibold text-slate-900 tracking-tight">{value}</div>
    </div>
  );
}

export default function PartyContent({ abbr }: { abbr: string }) {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const info = getPartyInfo(abbr);

  // Local mode
  if (state) {
    const partyCandidates = getCandidatesByPartyAndState(abbr, state);
    const otherGroups = getOtherCandidatesInState(abbr, state);
    const totalLikes = partyCandidates.reduce((s, c) => s + c.likes, 0);
    const totalPromises = partyCandidates.reduce((s, c) => s + c.promises.length, 0);

    return (
      <div className="space-y-5 pb-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
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

        {/* Party metrics */}
        <div className="grid grid-cols-3 gap-3">
          <MetricBox label="Candidates" value={partyCandidates.length.toString()} />
          <MetricBox label="Promises" value={totalPromises.toString()} />
          <MetricBox label="Total likes" value={totalLikes.toLocaleString()} />
        </div>

        <p className="text-xs text-slate-400">
          In <span className="font-medium text-slate-600">{state}</span>
        </p>

        <section>
          <h2 className="mb-2.5 text-sm font-semibold text-slate-800">{abbr} candidates</h2>
          {partyCandidates.length === 0 ? (
            <p className="text-sm text-slate-500">No candidates found for this party in {state}.</p>
          ) : (
            <div className="space-y-2">
              {partyCandidates.map((c) => (
                <CandidateRow key={c.id} candidate={c} />
              ))}
            </div>
          )}
        </section>

        {otherGroups.length > 0 && (
          <section className="border-t border-slate-100 pt-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">Other candidates in {state}</h2>
            <div className="space-y-5">
              {otherGroups.map((group) => (
                <div key={group.partyAbbr}>
                  <div className="mb-2 flex items-center gap-2">
                    <PartyBadge abbr={group.partyAbbr} size="sm" />
                    <span className="text-xs font-medium text-slate-500">{group.partyName}</span>
                  </div>
                  <div className="space-y-2">
                    {group.candidates.map((c) => (
                      <CandidateRow key={c.id} candidate={c} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // National mode
  const allPartyCandidates = pilotCandidates.filter((c) => c.partyAbbr === abbr);
  const totalLikes = allPartyCandidates.reduce((s, c) => s + c.likes, 0);
  const totalPromises = allPartyCandidates.reduce((s, c) => s + c.promises.length, 0);
  const statesCovered = new Set(allPartyCandidates.map((c) => c.state)).size;

  return (
    <div className="space-y-5 pb-10">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
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

      {/* Party metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricBox label="Candidates" value={allPartyCandidates.length.toString()} />
        <MetricBox label="Promises" value={totalPromises.toString()} />
        <MetricBox label="Total likes" value={totalLikes.toLocaleString()} />
        <MetricBox label="States" value={statesCovered.toString()} />
      </div>

      <p className="text-xs text-slate-400">All candidates · national view</p>

      <div className="space-y-2">
        {allPartyCandidates.map((c) => (
          <CandidateRow key={c.id} candidate={c} />
        ))}
      </div>
    </div>
  );
}
