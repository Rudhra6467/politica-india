"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAllStates,
  getNationalParties,
  getPartiesInState,
} from "@/data/pilot-candidates";
import LayerLegend from "@/components/LayerLegend";
import VerificationBanner from "@/components/VerificationBanner";
import PartyBadge from "@/components/PartyBadge";

type ViewMode = "local" | "national";

const STATE_KEY = "politica-selected-state";

export default function HomePage() {
  const [view, setView] = useState<ViewMode>("national");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STATE_KEY);
      if (stored) {
        setSelectedState(stored);
        setView("local");
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const chooseState = (state: string) => {
    setSelectedState(state);
    try {
      localStorage.setItem(STATE_KEY, state);
    } catch {
      // ignore
    }
    setView("local");
  };

  const clearState = () => {
    setSelectedState(null);
    try {
      localStorage.removeItem(STATE_KEY);
    } catch {
      // ignore
    }
    setView("national");
  };

  if (!hydrated) {
    return <div className="py-16 text-center text-slate-400 text-sm">Loading…</div>;
  }

  const states = getAllStates();
  const nationalParties = getNationalParties();
  const localParties = selectedState ? getPartiesInState(selectedState) : [];

  return (
    <div className="space-y-5">
      <VerificationBanner dismissible />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1.5">
          <p className="text-slate-600 text-[15px] leading-snug">For the people of India.</p>
          <LayerLegend compact />
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1.5">
          <div className="flex rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm">
            <button
              onClick={() => setView("local")}
              className={
                "rounded-lg px-3 py-1.5 text-sm font-medium transition " +
                (view === "local"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-50")
              }
            >
              My State
            </button>
            <button
              onClick={() => setView("national")}
              className={
                "rounded-lg px-3 py-1.5 text-sm font-medium transition " +
                (view === "national"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-50")
              }
            >
              National
            </button>
          </div>
          {selectedState && view === "local" && (
            <button onClick={clearState} className="text-xs text-slate-500 hover:text-slate-700">
              Change state
            </button>
          )}
        </div>
      </div>

      {view === "local" && (
        <div className="space-y-5">
          {!selectedState ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 sm:p-8 text-center">
              <p className="text-slate-600 mb-4 text-sm">Select your state</p>
              <div className="flex flex-wrap justify-center gap-2">
                {states.map((s) => (
                  <button
                    key={s}
                    onClick={() => chooseState(s)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-indigo-400 hover:bg-indigo-50 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{selectedState}</h2>

              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                  Parties
                </h3>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {localParties.map((p) => (
                    <Link
                      key={p.abbr}
                      href={"/party/" + p.abbr + "?state=" + encodeURIComponent(selectedState)}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3.5 py-3 shadow-sm hover:border-indigo-200 hover:shadow-md transition"
                    >
                      <PartyBadge abbr={p.abbr} size="lg" />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-900 text-[15px] leading-tight truncate">
                          {p.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {p.count} candidate{p.count > 1 ? "s" : ""}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <div className="text-center pt-1">
                <Link
                  href={"/candidates?state=" + encodeURIComponent(selectedState)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View all candidates in {selectedState} →
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {view === "national" && (
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">National</h2>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              Parties
            </h3>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {nationalParties.map((p) => (
                <Link
                  key={p.abbr}
                  href={"/party/" + p.abbr}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3.5 py-3 shadow-sm hover:border-indigo-200 hover:shadow-md transition"
                >
                  <PartyBadge abbr={p.abbr} size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-900 text-[15px] leading-tight truncate">
                      {p.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {p.count} candidate{p.count > 1 ? "s" : ""}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
              States
            </h3>
            <div className="flex flex-wrap gap-2">
              {states.map((s) => (
                <button
                  key={s}
                  onClick={() => chooseState(s)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-indigo-400 hover:bg-indigo-50 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          <div className="text-center pt-1">
            <Link href="/candidates" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View all candidates →
            </Link>
          </div>
        </div>
      )}

      <p className="text-center text-xs text-slate-400 pt-4 leading-relaxed max-w-md mx-auto">
        Pilot data · Source: Election Commission of India (Form 26).
        Party marks are simplified ECI-style election symbols for identification only.
      </p>
    </div>
  );
}
