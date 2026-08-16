"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { pilotCandidates } from "@/data/pilot-candidates";

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
    <div className="space-y-5">
      {/* Header: title left, search right */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Candidates</h1>
          <p className="mt-0.5 text-slate-500 text-sm">
            Pilot data · ECI Form 26 affidavits
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
        Showing {filtered.length} of {pilotCandidates.length}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => {
          const partyColor = PARTY_COLORS[c.partyAbbr] || "bg-slate-600 text-white";
          return (
            <Link
              key={c.id}
              href={`/candidates/${c.id}`}
              className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3.5 py-3 shadow-sm transition hover:border-indigo-200 hover:shadow-md active:scale-[0.99]"
            >
              {/* Party as primary visual — replaces initials avatar */}
              <div
                className={`shrink-0 h-11 w-11 rounded-xl flex items-center justify-center text-xs font-bold tracking-wide ${partyColor}`}
                title={c.party}
              >
                {c.partyAbbr}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-[15px] font-semibold text-slate-900 group-hover:text-indigo-700 leading-tight">
                  {c.name}
                </h2>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {c.constituency}, {c.state}
                </p>
                <div className="mt-1.5 flex items-center gap-3 text-xs">
                  <span className="text-emerald-600 font-medium">👍 {c.likes.toLocaleString()}</span>
                  <span className="text-rose-500 font-medium">👎 {c.dislikes.toLocaleString()}</span>
                  <span className="text-slate-400">{c.promises.length} promises</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed py-12 text-center text-slate-500 text-sm">
          No candidates match “{query}”
        </div>
      )}
    </div>
  );
}
