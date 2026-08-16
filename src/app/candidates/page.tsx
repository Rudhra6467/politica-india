"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { pilotCandidates } from "@/data/pilot-candidates";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";

export default function CandidatesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return pilotCandidates;
    return pilotCandidates.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.party.toLowerCase().includes(q) ||
        c.partyAbbr.toLowerCase().includes(q) ||
        c.constituency.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Candidates</h1>
        <p className="mt-1 text-slate-600 text-sm">
          Pilot data · Affidavit fields attributed to ECI Form 26
        </p>
      </div>

      <div className="relative">
        <input
          type="search"
          placeholder="Search by name, party, constituency or state..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pl-11 text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <svg
          className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400"
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

      <p className="text-sm text-slate-500">
        Showing {filtered.length} of {pilotCandidates.length} candidates
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link
            key={c.id}
            href={`/candidates/${c.id}`}
            className="group block rounded-2xl border bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md active:scale-[0.99]"
          >
            <div className="flex items-start gap-3">
              <CandidateAvatar name={c.name} photoUrl={c.photoUrl} size="md" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-semibold text-slate-900 group-hover:text-indigo-700">
                  {c.name}
                </h2>
                <div className="mt-1">
                  <PartyBadge abbr={c.partyAbbr} size="sm" />
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {c.constituency}, {c.state}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="font-medium text-emerald-600">👍 {c.likes.toLocaleString()}</span>
              <span className="font-medium text-rose-600">👎 {c.dislikes.toLocaleString()}</span>
              <span className="text-slate-400">{c.promises.length} promises</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed py-12 text-center text-slate-500">
          No candidates match “{query}”
        </div>
      )}
    </div>
  );
}
