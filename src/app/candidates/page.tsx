"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { pilotCandidates } from "@/data/pilot-candidates";
import PartyBadge from "@/components/PartyBadge";

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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mb-2"
          >
            <span aria-hidden>←</span> Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Candidates</h1>
          <p className="mt-0.5 text-slate-500 text-sm">
            {stateFilter ? (
              <>
                <span className="font-medium text-slate-700">{stateFilter}</span>
                <span className="text-slate-400"> · </span>
              </>
            ) : null}
            Pilot data · ECI Form 26
          </p>
        </div>

        <div className="relative w-full sm:w-72 shrink-0">
          <input
            type="search"
            placeholder="Search name, party, place…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pl-10 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <svg
            className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      <p className="text-xs text-slate-400">
        Showing {filtered.length} of {baseList.length}
        {stateFilter ? (
          <>
            {" · "}
            <Link href="/candidates" className="text-indigo-600 hover:underline">
              Clear state filter
            </Link>
          </>
        ) : null}
      </p>

      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link
            key={c.id}
            href={`/candidates/${c.id}`}
            className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-2.5 shadow-sm transition hover:border-indigo-200 hover:shadow-md active:scale-[0.99]"
          >
            <PartyBadge abbr={c.partyAbbr} name={c.party} size="lg" />
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-[15px] font-semibold text-slate-900 group-hover:text-indigo-700 leading-tight">
                {c.name}
              </h2>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {c.constituency}, {c.state}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs">
                <span className="text-emerald-600 font-medium">👍 {c.likes.toLocaleString()}</span>
                <span className="text-rose-500 font-medium">👎 {c.dislikes.toLocaleString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white py-12 text-center text-slate-500 text-sm">
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
