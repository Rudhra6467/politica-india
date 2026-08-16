"use client";

import { useState } from "react";
import type { PartyInfo } from "@/data/party-info";
import PartyBadge from "./PartyBadge";

interface PartyIntroProps {
  info: PartyInfo;
}

export default function PartyIntro({ info }: PartyIntroProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <PartyBadge abbr={info.abbr} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{info.name}</h1>

          {/* Always-visible short lines */}
          <div className="mt-2 space-y-0.5 text-sm text-slate-600">
            {info.short.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* Expand / collapse */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            {expanded ? "Show less" : "... more"}
          </button>

          {expanded && (
            <div className="mt-3 space-y-2 border-t pt-3 text-sm text-slate-600">
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
