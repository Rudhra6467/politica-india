"use client";

import { useState } from "react";
import type { PartyInfo } from "@/data/party-info";
import PartyBadge from "./PartyBadge";
import LikeDislikeButtons from "./LikeDislikeButtons";

interface PartyIntroProps {
  info: PartyInfo;
}

export default function PartyIntro({ info }: PartyIntroProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <PartyBadge abbr={info.abbr} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{info.name}</h1>

          <div className="mt-2 space-y-0.5 text-sm text-slate-600">
            {info.short.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* More + like/dislike on the same row — no wasted bottom bar */}
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
