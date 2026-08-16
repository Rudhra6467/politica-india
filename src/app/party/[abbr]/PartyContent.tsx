"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  pilotCandidates,
  getCandidatesByPartyAndState,
  getOtherCandidatesInState,
} from "@/data/pilot-candidates";
import { getPartyInfo } from "@/data/party-info";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";
import PartyIntro from "@/components/PartyIntro";

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
    photoUrl?: string;
  };
}) {
  const role = roleLabel(candidate.electionType);
  // Truncate long combined text for mobile
  const meta = `${role} · ${candidate.constituency}`;

  return (
    <Link
      href={`/candidates/${candidate.id}`}
      className="flex items-center gap-3 rounded-xl border bg-white p-3.5 shadow-sm hover:border-indigo-300 hover:shadow-md transition"
    >
      <CandidateAvatar name={candidate.name} photoUrl={candidate.photoUrl} size="md" />
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold text-slate-900">{candidate.name}</div>
        <div className="truncate text-sm text-slate-500">
          {meta}
          {candidate.state ? ` · ${candidate.state}` : ""}
        </div>
      </div>
      <div className="shrink-0 text-right text-xs">
        <div className="text-emerald-600">👍 {candidate.likes.toLocaleString()}</div>
        <div className="text-rose-600">👎 {candidate.dislikes.toLocaleString()}</div>
      </div>
    </Link>
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

    return (
      <div className="space-y-6">
        <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800">
          ← Back to home
        </Link>

        {info ? (
          <PartyIntro info={info} />
        ) : (
          <div className="flex items-center gap-3">
            <PartyBadge abbr={abbr} size="lg" />
            <h1 className="text-2xl font-bold text-slate-900">{abbr}</h1>
          </div>
        )}

        <p className="text-sm text-slate-500">
          Showing candidates in <span className="font-medium text-slate-700">{state}</span>
        </p>

        <section>
          <h2 className="mb-3 text-lg font-semibold">{abbr} candidates</h2>
          {partyCandidates.length === 0 ? (
            <p className="text-sm text-slate-500">No candidates found for this party in {state}.</p>
          ) : (
            <div className="space-y-2.5">
              {partyCandidates.map((c) => (
                <CandidateRow key={c.id} candidate={c} />
              ))}
            </div>
          )}
        </section>

        {otherGroups.length > 0 && (
          <section className="border-t pt-5">
            <h2 className="mb-4 text-lg font-semibold">Other candidates in {state}</h2>
            <div className="space-y-5">
              {otherGroups.map((group) => (
                <div key={group.partyAbbr}>
                  <div className="mb-2 flex items-center gap-2">
                    <PartyBadge abbr={group.partyAbbr} size="sm" />
                    <span className="text-sm font-medium text-slate-600">{group.partyName}</span>
                  </div>
                  <div className="space-y-2.5">
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

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800">
        ← Back to home
      </Link>

      {info ? (
        <PartyIntro info={info} />
      ) : (
        <div className="flex items-center gap-3">
          <PartyBadge abbr={abbr} size="lg" />
          <h1 className="text-2xl font-bold text-slate-900">{abbr}</h1>
        </div>
      )}

      <p className="text-sm text-slate-500">All candidates (national view)</p>

      <div className="space-y-2.5">
        {allPartyCandidates.map((c) => (
          <CandidateRow key={c.id} candidate={c} />
        ))}
      </div>
    </div>
  );
}
