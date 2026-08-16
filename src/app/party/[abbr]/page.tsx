"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  pilotCandidates,
  getCandidatesByPartyAndState,
  getOtherCandidatesInState,
} from "@/data/pilot-candidates";

export default function PartyPage({
  params,
}: {
  params: { abbr: string };
}) {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const abbr = params.abbr;

  // If state is provided → Local mode: party candidates in state + others grouped by party
  if (state) {
    const partyCandidates = getCandidatesByPartyAndState(abbr, state);
    const otherGroups = getOtherCandidatesInState(abbr, state);
    const partyName = partyCandidates[0]?.party || abbr;

    return (
      <div className="space-y-8">
        <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800">
          ← Back to home
        </Link>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">{partyName}</h1>
          <p className="text-slate-500 mt-1">
            Candidates in <span className="font-medium">{state}</span>
          </p>
        </div>

        {/* Party's candidates in this state */}
        <section>
          <h2 className="text-lg font-semibold mb-3">{abbr} candidates</h2>
          {partyCandidates.length === 0 ? (
            <p className="text-slate-500 text-sm">No candidates found for this party in {state}.</p>
          ) : (
            <div className="space-y-3">
              {partyCandidates.map((c) => (
                <CandidateCard key={c.id} candidate={c} />
              ))}
            </div>
          )}
        </section>

        {/* Other candidates in the state, grouped by party */}
        {otherGroups.length > 0 && (
          <section className="pt-4 border-t">
            <h2 className="text-lg font-semibold mb-4">Other candidates in {state}</h2>
            <div className="space-y-6">
              {otherGroups.map((group) => (
                <div key={group.partyAbbr}>
                  <h3 className="text-sm font-medium text-slate-500 mb-2">
                    {group.partyName} ({group.partyAbbr})
                  </h3>
                  <div className="space-y-3">
                    {group.candidates.map((c) => (
                      <CandidateCard key={c.id} candidate={c} />
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

  // National mode: all candidates of this party across states
  const allPartyCandidates = pilotCandidates.filter((c) => c.partyAbbr === abbr);
  const partyName = allPartyCandidates[0]?.party || abbr;

  return (
    <div className="space-y-8">
      <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800">
        ← Back to home
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">{partyName}</h1>
        <p className="text-slate-500 mt-1">All candidates (national view)</p>
      </div>

      <div className="space-y-3">
        {allPartyCandidates.map((c) => (
          <CandidateCard key={c.id} candidate={c} />
        ))}
      </div>
    </div>
  );
}

function CandidateCard({
  candidate,
}: {
  candidate: {
    id: string;
    name: string;
    partyAbbr: string;
    constituency: string;
    state: string;
    likes: number;
    dislikes: number;
    criminalCases: number;
  };
}) {
  return (
    <Link
      href={`/candidates/${candidate.id}`}
      className="block rounded-xl border bg-white p-4 shadow-sm hover:border-indigo-300 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold text-slate-900">{candidate.name}</div>
          <div className="text-sm text-slate-500 mt-0.5">
            {candidate.constituency}, {candidate.state}
          </div>
        </div>
        <div className="text-right text-sm">
          <div className="text-emerald-600">👍 {candidate.likes.toLocaleString()}</div>
          <div className="text-rose-600">👎 {candidate.dislikes.toLocaleString()}</div>
        </div>
      </div>
    </Link>
  );
}
