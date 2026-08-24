"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { pilotCandidates } from "@/data/pilot-candidates";
import PartyBadge from "@/components/PartyBadge";
import CandidateAvatar from "@/components/CandidateAvatar";

function CandidatesContent() {
  const searchParams = useSearchParams();
  const stateFilter = searchParams.get("state");
  const [query, setQuery] = useState("");

  const baseList = useMemo(() => {
    if (!stateFilter) return pilotCandidates;
    return pilotCandidates.filter((c) => c.state === stateFilter);
  }, [stateFilter]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return baseList;
    return baseList.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.party.toLowerCase().includes(q) ||
        c.partyAbbr.toLowerCase().includes(q) ||
        c.constituency.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
    );
  }, [query, baseList]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2.5">
        <div className="min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-1"
          >
            <span aria-hidden>←</span> Home
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Candidates</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            {stateFilter ? (
              <>
                <span className="font-medium text-slate-700">{stateFilter}</span>
                <span className="text-slate-300"> · </span>
              </>
            ) : null}
            Pilot · ECI Form 26
          </p>
        </div>

        <div className="relative w-full sm:w-72 shrink-0">
          <input
            type="search"
            placeholder="Search name, party, place…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 pl-9 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <svg
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            width={16}
            height={16}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <p className="text-[11px] text-slate-400">
        Showing {filtered.length} of {baseList.length}
        {stateFilter ? (
          <>
            {" · "}
            <Link href="/candidates" className="text-indigo-600 hover:underline">
              Clear filter
            </Link>
          </>
        ) : null}
      </p>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link
            key={c.id}
            href={`/candidates/${c.id}`}
            className="group flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-2.5 py-2 shadow-sm transition hover:border-indigo-200 hover:shadow-md active:scale-[0.99]"
          >
            <div className="relative shrink-0">
              <CandidateAvatar name={c.name} photoUrl={c.photoUrl} size="md" />
              <div className="absolute -bottom-1 -right-1 scale-75 origin-bottom-right">
                <PartyBadge abbr={c.partyAbbr} name={c.party} size="sm" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-slate-900 group-hover:text-indigo-700 leading-tight">
                {c.name}
              </h2>
              <p className="truncate text-[11px] text-slate-500">
                {c.constituency}, {c.state}
              </p>
              <div className="mt-0.5 flex items-center gap-2.5 text-[11px]">
                <span className="text-emerald-600 font-medium">👍 {c.likes.toLocaleString()}</span>
                <span className="text-rose-500 font-medium">👎 {c.dislikes.toLocaleString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white py-10 text-center text-slate-500 text-sm">
          No candidates match{query ? ` “${query}”` : ""}
          {stateFilter ? ` in ${stateFilter}` : ""}.
        </div>
      )}
    </div>
  );
}

export default function CandidatesPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-slate-400 text-sm">Loading…</div>}>
      <CandidatesContent />
    </Suspense>
  );
}
