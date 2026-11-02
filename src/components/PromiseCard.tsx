"use client";

import { useState } from "react";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";
import CommentSection from "@/components/CommentSection";
import type { PromiseStatus, EvidenceSource } from "@/data/pilot-candidates";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";

export const STATUS_STYLE: Record<PromiseStatus, string> = {
  NOT_STARTED: "bg-slate-100 text-slate-600 border-slate-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border-amber-200",
  REPORTED_COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  VERIFIED_COMPLETED: "bg-emerald-100 text-emerald-800 border-emerald-300",
  UNABLE_TO_VERIFY: "bg-slate-50 text-slate-500 border-slate-200",
  EVIDENCE_CONFLICTING: "bg-orange-50 text-orange-700 border-orange-200",
};

export interface PromiseCardData {
  id: string;
  title: string;
  sourceNote?: string;
  announcedDate?: string;
  status: PromiseStatus;
  evidenceNote?: string;
  lastChecked?: string;
  sources?: EvidenceSource[];
  likes: number;
  dislikes: number;
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function SourceList({ sources }: { sources: EvidenceSource[] }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const shown = open ? sources : sources.slice(0, 2);
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
        {t.promise.evidenceSources} · {sources.length}
      </div>
      <ol className="mt-1.5 space-y-1.5">
        {shown.map((s, i) => (
          <li key={s.url + i} className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-medium text-indigo-700 hover:text-indigo-900 hover:underline"
            >
              {s.title}
              <span aria-hidden> ↗</span>
            </a>
            <div className="mt-0.5 text-[11px] text-slate-500">
              {s.publisher} · <span className="tabular">{s.date}</span> · {hostOf(s.url)}
            </div>
            {s.quote && (
              <blockquote className="mt-1 border-l-2 border-slate-200 pl-2 text-[12px] italic leading-snug text-slate-600">
                “{s.quote}”
              </blockquote>
            )}
          </li>
        ))}
      </ol>
      {sources.length > 2 && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="mt-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800"
        >
          {open ? t.promise.fewerSources : `${t.promise.allSources} ${sources.length} ${t.promise.sources}`}
        </button>
      )}
    </div>
  );
}

export function StatusPill({ status, size = "md" }: { status: PromiseStatus; size?: "sm" | "md" }) {
  const { t } = useLocale();
  return (
    <span
      title={t.promise.statusHint[status]}
      className={
        "inline-flex items-center rounded-full border font-medium " +
        (size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-[11px]") +
        " " +
        STATUS_STYLE[status]
      }
    >
      {t.promise.status[status]}
    </span>
  );
}

export default function PromiseCard({ promise, showShare = true }: { promise: PromiseCardData; showShare?: boolean }) {
  const { t, href } = useLocale();
  const [commentsOpen, setCommentsOpen] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <StatusPill status={promise.status} />
          {promise.announcedDate && (
            <span className="text-xs text-slate-500">{t.promise.announced} {promise.announcedDate}</span>
          )}
          {promise.lastChecked && (
            <span className="text-xs text-slate-400">{t.promise.checked} {promise.lastChecked}</span>
          )}
        </div>

        <h3 className="mt-2 text-base font-semibold leading-snug text-slate-900 sm:text-[17px]">
          {promise.title}
        </h3>

        {promise.sourceNote && (
          <p className="mt-1 text-xs text-slate-500">
            <span className="font-medium text-slate-600">{t.promise.source}</span> · {promise.sourceNote}
          </p>
        )}

        {promise.evidenceNote && (
          <p className="mt-3 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm leading-relaxed text-slate-600">
            <span className="font-medium text-slate-700">{t.promise.evidenceShows} · </span>
            {promise.evidenceNote}
          </p>
        )}

        {promise.sources && promise.sources.length > 0 && <SourceList sources={promise.sources} />}

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-slate-100 pt-3">
          <LikeDislikeButtons
            id={promise.id}
            initialLikes={promise.likes}
            initialDislikes={promise.dislikes}
            size="sm"
          />
          <div className="flex items-center gap-4">
          {showShare && (
            <Link
              href={href(`/p/${promise.id}`)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-indigo-600"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.7 13.5l6.6 3.8M15.3 6.7l-6.6 3.8M18 20a3 3 0 100-6 3 3 0 000 6zM18 10a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              {t.profile.share}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCommentsOpen(!commentsOpen)}
            aria-expanded={commentsOpen}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-indigo-600"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z" />
            </svg>
            {commentsOpen ? t.promise.hideComments : t.promise.comments}
          </button>
          </div>
        </div>

        {commentsOpen && (
          <div className="mt-3">
            <CommentSection promiseId={promise.id} />
          </div>
        )}
      </div>
    </article>
  );
}
