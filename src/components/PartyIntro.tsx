"use client";

import { useState } from "react";
import type { PartyInfo } from "@/data/party-info";
import PartyBadge from "./PartyBadge";
import LikeDislikeButtons from "./LikeDislikeButtons";

export interface PartyMetrics {
  mps: number;
  mlas: number;
  states: number;
  alliances: number | null;
}

interface PartyIntroProps {
  info: PartyInfo;
  metrics?: PartyMetrics;
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 text-center px-1.5 py-1">
      <div className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-400">
        {label}
      </div>
      <div className="text-sm sm:text-base font-semibold text-slate-900 tabular-nums leading-tight">
        {value}
      </div>
    </div>
  );
}

export default function PartyIntro({ info, metrics }: PartyIntroProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <PartyBadge abbr={info.abbr} size="lg" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
            {/* Left: name + blurb */}
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl leading-tight">
                {info.name}
              </h1>
              <div className="mt-1.5 space-y-0.5 text-sm text-slate-600">
                {info.short.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            {/* Right empty space → four metrics */}
            {metrics && (
              <div className="sm:w-[42%] sm:max-w-xs shrink-0">
                <div className="grid grid-cols-4 gap-0.5 rounded-xl border border-slate-100 bg-slate-50/80 px-1 py-1.5">
                  <MiniMetric label="MPs" value={String(metrics.mps)} />
                  <MiniMetric label="MLAs" value={String(metrics.mlas)} />
                  <MiniMetric label="States" value={String(metrics.states)} />
                  <MiniMetric
                    label="Alliances"
                    value={metrics.alliances != null && metrics.alliances > 0 ? String(metrics.alliances) : "—"}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
            >
              {expanded ? "Show less" : "... more"}
            </button>

            <LikeDislikeButtons
              id={`party-${info.abbr}`}
              initialLikes={0}
              initialDislikes={0}
              size="sm"
            />
          </div>

          {expanded && (
            <div className="mt-3 space-y-2 border-t border-slate-100 pt-3 text-sm text-slate-600">
              {info.founded && (
                <p>
                  <span className="font-medium text-slate-800">Founded:</span> {info.founded}
                </p>
              )}
              {info.founder && (
                <p>
                  <span className="font-medium text-slate-800">Founder / Origin:</span> {info.founder}
                </p>
              )}
              {info.currentLeader && (
                <p>
                  <span className="font-medium text-slate-800">Current leadership:</span>{" "}
                  {info.currentLeader}
                </p>
              )}
              {info.more?.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
