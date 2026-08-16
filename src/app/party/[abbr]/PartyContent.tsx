"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  pilotCandidates,
  getCandidatesByPartyAndState,
  getOtherCandidatesInState,
  type PilotCandidate,
} from "@/data/pilot-candidates";
import { getPartyInfo } from "@/data/party-info";
import PartyBadge from "@/components/PartyBadge";
import PartyIntro from "@/components/PartyIntro";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";

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

function ExpandableCandidate({
  candidate,
  index,
}: {
  candidate: PilotCandidate;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const role = roleLabel(candidate.electionType);
  const color = PARTY_COLORS[candidate.partyAbbr] || "bg-slate-600 text-white";
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-4 py-4 text-left hover:bg-slate-50/80 transition"
      >
        <span className="text-2xl font-bold text-slate-200 tabular-nums w-10 shrink-0">{num}</span>
        <div className={`shrink-0 h-10 w-10 rounded-xl flex items-center justify-center text-[11px] font-bold ${color}`}>
          {candidate.partyAbbr}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-slate-900 text-[15px]">{candidate.name}</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {role} · {candidate.constituency}
            {candidate.state ? ` · ${candidate.state}` : ""}
          </div>
        </div>
        <span className="text-slate-400 text-sm shrink-0">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-slate-100">
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {candidate.education && (
                <div className="rounded-xl bg-slate-50 px-3 py-2 border border-slate-100">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Education</div>
                  <div className="font-medium text-slate-800 mt-0.5">{candidate.education}</div>
                </div>
              )}
              <div className="rounded-xl bg-slate-50 px-3 py-2 border border-slate-100">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Cases</div>
                <div className="font-medium text-slate-800 mt-0.5">{candidate.criminalCases}</div>
              </div>
              {candidate.totalAssets && (
                <div className="rounded-xl bg-slate-50 px-3 py-2 border border-slate-100 col-span-2">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Assets</div>
                  <div className="font-medium text-slate-800 mt-0.5">{candidate.totalAssets}</div>
                </div>
              )}
            </div>

            {candidate.promises.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">Promises</div>
                <ul className="space-y-1">
                  {candidate.promises.map((p) => (
                    <li key={p.id} className="text-sm text-slate-700">· {p.title}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-1">
              <LikeDislikeButtons
                id={candidate.id}
                initialLikes={candidate.likes}
                initialDislikes={candidate.dislikes}
                size="sm"
              />
              <Link
                href={`/candidates/${candidate.id}`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Full profile →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CollapsibleRoleSection({
  title,
  subtitle,
  candidates,
  defaultOpen = true,
}: {
  title: string;
  subtitle: string;
  candidates: PilotCandidate[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (candidates.length === 0) return null;

  return (
    <div className="space-y-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left hover:bg-slate-100 transition"
      >
        <div>
          <div className="text-sm font-semibold text-slate-800">{title}</div>
          <div className="text-xs text-slate-500 mt-0.5">
            {subtitle} · {candidates.length} candidate{candidates.length > 1 ? "s" : ""}
          </div>
        </div>
        <span className="text-slate-500 text-sm font-medium shrink-0">
          {open ? "Minimize −" : "Expand +"}
        </span>
      </button>

      {open && (
        <div className="space-y-2">
          {candidates.map((c, i) => (
            <ExpandableCandidate key={c.id} candidate={c} index={i} />
          ))}
        </div>
      )}
    </div>
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

  const candidates = state
    ? getCandidatesByPartyAndState(abbr, state)
    : pilotCandidates.filter((c) => c.partyAbbr === abbr);

  const mps = candidates.filter((c) => c.electionType === "Lok Sabha");
  const mlas = candidates.filter((c) => c.electionType === "Assembly");

  const otherGroups = state ? getOtherCandidatesInState(abbr, state) : [];
  const totalLikes = candidates.reduce((s, c) => s + c.likes, 0);
  const totalPromises = candidates.reduce((s, c) => s + c.promises.length, 0);
  const statesCovered = new Set(candidates.map((c) => c.state)).size;

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

      <div className={`grid gap-3 ${state ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
        <MetricBox label="Candidates" value={candidates.length.toString()} />
        <MetricBox label="Promises" value={totalPromises.toString()} />
        <MetricBox label="Total likes" value={totalLikes.toLocaleString()} />
        {!state && <MetricBox label="States" value={statesCovered.toString()} />}
      </div>

      {state && (
        <p className="text-xs text-slate-400">
          In <span className="font-medium text-slate-600">{state}</span>
        </p>
      )}

      {/* MPs first, then MLAs — each section minimizable */}
      <section className="space-y-4">
        {candidates.length === 0 ? (
          <p className="text-sm text-slate-500">No candidates found.</p>
        ) : (
          <>
            <CollapsibleRoleSection
              title="Members of Parliament (MPs)"
              subtitle="Lok Sabha"
              candidates={mps}
              defaultOpen={true}
            />
            <CollapsibleRoleSection
              title="Members of Legislative Assembly (MLAs)"
              subtitle="State Assembly"
              candidates={mlas}
              defaultOpen={true}
            />
          </>
        )}
      </section>

      {otherGroups.length > 0 && (
        <section className="border-t border-slate-100 pt-5 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Other candidates in {state}
          </h2>
          {otherGroups.map((group) => {
            const groupMps = group.candidates.filter((c) => c.electionType === "Lok Sabha");
            const groupMlas = group.candidates.filter((c) => c.electionType === "Assembly");
            return (
              <div key={group.partyAbbr} className="space-y-3">
                <div className="flex items-center gap-2">
                  <PartyBadge abbr={group.partyAbbr} size="sm" />
                  <span className="text-xs font-medium text-slate-500">{group.partyName}</span>
                </div>
                <CollapsibleRoleSection
                  title="MPs"
                  subtitle="Lok Sabha"
                  candidates={groupMps}
                  defaultOpen={false}
                />
                <CollapsibleRoleSection
                  title="MLAs"
                  subtitle="State Assembly"
                  candidates={groupMlas}
                  defaultOpen={false}
                />
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
