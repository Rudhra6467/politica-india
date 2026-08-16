"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getAllStates,
  getNationalParties,
  getPartiesInState,
} from "@/data/pilot-candidates";
import PartyBadge from "@/components/PartyBadge";
import LayerLegend from "@/components/LayerLegend";

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
    <div className="space-y-6">
      {/* Product framing */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Politica India
        </h1>
        <p className="text-slate-600 max-w-2xl text-[15px] leading-snug">
          For the people of India. All information from Electoral Commission and Announcements.
        </p>
      </div>

      <LayerLegend compact />

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
        <div className="space-y-5">
          {!selectedState ? (
            <div className="rounded-xl border border-dashed bg-white p-8 text-center">
              <p className="text-slate-600 mb-4">Select your state</p>
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
                <h2 className="text-xl font-bold text-slate-900">{selectedState}</h2>
              </div>

              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
                  Parties
                </h3>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {localParties.map((p) => (
                    <Link
                      key={p.abbr}
                      href={`/party/${p.abbr}?state=${encodeURIComponent(selectedState)}`}
                      className="flex items-center justify-between rounded-xl border bg-white p-3.5 shadow-sm hover:border-indigo-300 hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-3">
                        <PartyBadge abbr={p.abbr} size="md" />
                        <div>
                          <div className="font-semibold text-slate-900">{p.name}</div>
                          <div className="text-xs text-slate-400">
                            {p.count} candidate{p.count > 1 ? "s" : ""}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <div className="text-center pt-1">
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
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">National</h2>
          </div>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
              Parties
            </h3>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {nationalParties.map((p) => (
                <Link
                  key={p.abbr}
                  href={`/party/${p.abbr}`}
                  className="flex items-center justify-between rounded-xl border bg-white p-3.5 shadow-sm hover:border-indigo-300 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <PartyBadge abbr={p.abbr} size="md" />
                    <div>
                      <div className="font-semibold text-slate-900">{p.name}</div>
                      <div className="text-xs text-slate-400">
                        {p.count} candidate{p.count > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-2">
              States
            </h3>
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
