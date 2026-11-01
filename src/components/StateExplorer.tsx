"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PartyBadge from "./PartyBadge";

type PartyRow = { abbr: string; name: string; count: number; won: number };

interface StateExplorerProps {
  states: string[];
  partiesByState: Record<string, PartyRow[]>;
  allParties: { abbr: string; name: string; count: number; states: string[] }[];
}

const STATE_KEY = "politica-selected-state";

export default function StateExplorer({ states, partiesByState, allParties }: StateExplorerProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [mode, setMode] = useState<"state" | "all">("all");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STATE_KEY);
      if (stored && states.includes(stored)) {
        setSelected(stored);
        setMode("state");
      }
    } catch {
      // ignore
    }
  }, [states]);

  const choose = (s: string) => {
    setSelected(s);
    setMode("state");
    try {
      localStorage.setItem(STATE_KEY, s);
    } catch {
      // ignore
    }
  };

  const showState = mode === "state" && selected;
  const rows = showState ? partiesByState[selected] ?? [] : [];

  return (
    <section id="parties" className="scroll-mt-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            {showState ? `Parties in ${selected}` : "Parties in the pilot"}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            {showState
              ? "Elected representatives first, then candidates who lost."
              : "Choose your state to see who represents you."}
          </p>
        </div>
        <div className="flex rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm" role="tablist">
          <button
            role="tab"
            aria-selected={mode === "state"}
            onClick={() => setMode("state")}
            className={
              "rounded-lg px-3 py-1.5 text-sm font-medium transition " +
              (mode === "state" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50")
            }
          >
            My state
          </button>
          <button
            role="tab"
            aria-selected={mode === "all"}
            onClick={() => setMode("all")}
            className={
              "rounded-lg px-3 py-1.5 text-sm font-medium transition " +
              (mode === "all" ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50")
            }
          >
            All
          </button>
        </div>
      </div>

      {mode === "state" && (
        <div className="mt-3 flex flex-wrap gap-2">
          {states.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => choose(s)}
              aria-pressed={selected === s}
              className={
                "rounded-full border px-3.5 py-1.5 text-sm font-medium shadow-sm transition " +
                (selected === s
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50")
              }
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {mode === "state" && !selected && (
        <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
          Pick a state above. The pilot currently covers Andhra Pradesh and Telangana; more states follow depth-first.
        </div>
      )}

      {showState && (
        <>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {rows.map((p) => (
              <Link
                key={p.abbr}
                href={`/party/${p.abbr}?state=${encodeURIComponent(selected)}`}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-card transition hover:border-indigo-200 hover:shadow-lift"
              >
                <PartyBadge abbr={p.abbr} size="lg" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900 group-hover:text-indigo-700">{p.name}</div>
                  <div className="mt-0.5 text-[11px] text-slate-500">
                    {p.won} elected{p.count - p.won > 0 ? ` · ${p.count - p.won} lost` : ""}
                  </div>
                </div>
                <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-3 text-center">
            <Link
              href={`/candidates?state=${encodeURIComponent(selected)}`}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              All representatives in {selected} →
            </Link>
          </div>
        </>
      )}

      {mode === "all" && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {allParties.map((p) => (
            <Link
              key={p.abbr}
              href={`/party/${p.abbr}`}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-card transition hover:border-indigo-200 hover:shadow-lift"
            >
              <PartyBadge abbr={p.abbr} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-slate-900 group-hover:text-indigo-700">{p.name}</div>
                <div className="mt-0.5 truncate text-[11px] text-slate-500">
                  {p.count} in pilot · {p.states.join(", ")}
                </div>
              </div>
              <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
