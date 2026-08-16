"use client";

import { useState } from "react";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";
import CommentSection from "@/components/CommentSection";
import type { PromiseStatus } from "@/data/pilot-candidates";

const statusStyles: Record<PromiseStatus, string> = {
  NOT_STARTED: "bg-slate-100 text-slate-600 border border-slate-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border border-amber-200",
  REPORTED_COMPLETED: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  VERIFIED_COMPLETED: "bg-emerald-100 text-emerald-800 border border-emerald-300",
  UNABLE_TO_VERIFY: "bg-slate-100 text-slate-500 border border-slate-200",
  EVIDENCE_CONFLICTING: "bg-orange-50 text-orange-700 border border-orange-200",
};

const statusLabel: Record<PromiseStatus, string> = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  REPORTED_COMPLETED: "Reported Completed",
  VERIFIED_COMPLETED: "Verified Completed",
  UNABLE_TO_VERIFY: "Unable to Verify",
  EVIDENCE_CONFLICTING: "Evidence Conflicting",
};

export interface PromiseCardData {
  id: string;
  title: string;
  sourceNote?: string;
  announcedDate?: string;
  status: PromiseStatus;
  evidenceNote?: string;
  lastChecked?: string;
  likes: number;
  dislikes: number;
}

export default function PromiseCard({ promise }: { promise: PromiseCardData }) {
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <span className={`inline-flex text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyles[promise.status]}`}>
              {statusLabel[promise.status]}
            </span>
            <h3 className="mt-2.5 text-base font-semibold text-slate-900 leading-snug">
              {promise.title}
            </h3>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              {promise.announcedDate && <span>Announced {promise.announcedDate}</span>}
              {promise.sourceNote && <span>Source · {promise.sourceNote}</span>}
              {promise.lastChecked && <span>Checked {promise.lastChecked}</span>}
            </div>

            {promise.evidenceNote && (
              <p className="mt-3 text-sm text-slate-600 bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-100">
                <span className="font-medium text-slate-700">Evidence · </span>
                {promise.evidenceNote}
              </p>
            )}
          </div>

          {/* Like / Dislike — right end */}
          <div className="shrink-0 pt-0.5">
            <LikeDislikeButtons
              id={promise.id}
              initialLikes={promise.likes}
              initialDislikes={promise.dislikes}
              size="sm"
            />
          </div>
        </div>

        {/* Comment toggle — bottom right */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setCommentsOpen(!commentsOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition"
          >
            <span>{commentsOpen ? "Hide comments" : "Comments"}</span>
            <span className="text-[10px]">{commentsOpen ? "▲" : "▼"}</span>
          </button>
        </div>

        {commentsOpen && (
          <div className="mt-3 pt-1">
            <CommentSection promiseId={promise.id} />
          </div>
        )}
      </div>
    </div>
  );
}
