"use client";

import { useState } from "react";

/** Dense verified block — one-line summary; expand for profession/liabilities/source. */

export default function VerifiedRecordBlock({
  profession,
  liabilities,
  affidavitYear,
  affidavitPdfUrl,
  eciSource,
  lastUpdated,
}: {
  profession?: string;
  liabilities?: string;
  affidavitYear?: string;
  affidavitPdfUrl?: string;
  eciSource: string;
  lastUpdated?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left hover:bg-slate-50/80 transition"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-slate-800">Verified Record</div>
            <div className="text-[10px] text-slate-500 truncate">
              ECI Form 26{affidavitYear ? ` · ${affidavitYear}` : ""}
              {lastUpdated ? ` · Updated ${lastUpdated}` : ""}
            </div>
          </div>
        </div>
        <span className="text-[11px] font-medium text-indigo-600 shrink-0">
          {open ? "Less" : "Details"}
        </span>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2 border-t border-slate-100 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {profession && (
              <div className="rounded-lg bg-slate-50 border border-slate-100 px-2.5 py-2">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Profession</div>
                <div className="text-xs font-medium text-slate-800">{profession}</div>
              </div>
            )}
            {liabilities && (
              <div className="rounded-lg bg-slate-50 border border-slate-100 px-2.5 py-2">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Liabilities</div>
                <div className="text-xs font-medium text-slate-800">{liabilities}</div>
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Assets, education and declared cases from public affidavit. Allegations are not convictions.
            <span className="text-slate-300"> · </span>
            {eciSource}
          </p>
          {affidavitPdfUrl && (
            <a
              href={affidavitPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-xs font-medium text-indigo-600 hover:text-indigo-800"
            >
              Original affidavit →
            </a>
          )}
        </div>
      )}
    </section>
  );
}
