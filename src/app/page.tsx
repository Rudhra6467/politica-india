"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAllStates,
  getNationalParties,
  getPartiesInState,
} from "@/data/pilot-candidates";
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
    return <div className="py-20 text-center text-slate-400">Loading...</div>;
  }

  const states = getAllStates();
  const nationalParties = getNationalParties();
  const localParties = selectedState ? getPartiesInState(selectedState) : [];

  return (
    <div className="space-y-8">
      {/* View switcher */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex rounded-xl border bg-white p-1 shadow-sm">
          <button
            onClick={() => setView("local")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              view === "local"
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            My State
          </button>
          <button
            onClick={() => setView("national")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              view === "national"
                ? "bg-indigo-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            National
          </button>
        </div>

        {selectedState && view === "local" && (
          <button
            onClick={clearState}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Change state
          </button>
        )}
      </div>

      {/* LOCAL VIEW */}
      {view === "local" && (
        <div className="space-y-8">
          {!selectedState ? (
            <div className="rounded-xl border border-dashed bg-white p-8 text-center">
              <p className="text-slate-600 mb-4">
                Select your state to see local parties and candidates
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {states.map((s) => (
                  <button
                    key={s}
                    onClick={() => chooseState(s)}
                    className="rounded-full border px-4 py-2 text-sm font-medium hover:border-indigo-400 hover:bg-indigo-50 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{selectedState}</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Parties and candidates in your state
                </p>
              </div>

              <section>
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Parties</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {localParties.map((p) => (
                    <Link
                      key={p.abbr}
                      href={`/party/${p.abbr}?state=${encodeURIComponent(selectedState)}`}
                      className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm hover:border-indigo-300 hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-3">
                        <PartyBadge abbr={p.abbr} size="md" />
                        <div>
                          <div className="font-semibold text-slate-900">{p.name}</div>
                          <div className="text-xs text-slate-400">{p.count} candidate{p.count > 1 ? "s" : ""}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <div className="text-center">
                <Link
                  href={`/candidates?state=${encodeURIComponent(selectedState)}`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View all candidates in {selectedState} →
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      {/* NATIONAL VIEW */}
      {view === "national" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">National</h1>
            <p className="text-sm text-slate-500 mt-1">Major parties and all states</p>
          </div>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Parties</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {nationalParties.map((p) => (
                <Link
                  key={p.abbr}
                  href={`/party/${p.abbr}`}
                  className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm hover:border-indigo-300 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <PartyBadge abbr={p.abbr} size="md" />
                    <div>
                      <div className="font-semibold text-slate-900">{p.name}</div>
                      <div className="text-xs text-slate-400">{p.count} candidate{p.count > 1 ? "s" : ""}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">States</h2>
            <div className="flex flex-wrap gap-2">
              {states.map((s) => (
                <button
                  key={s}
                  onClick={() => chooseState(s)}
                  className="rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-indigo-400 hover:bg-indigo-50 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      <p className="text-center text-xs text-slate-400 pt-4">
        Pilot data · Source attribution: Election Commission of India (Form 26)
      </p>
    </div>
  );
}
