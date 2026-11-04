"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

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
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-xl border border-line bg-surface shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left hover:bg-surface-2/80 transition"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-ink">{t.profile.affidavitDetails}</div>
            <div className="text-[10px] text-muted truncate">
              ECI Form 26{affidavitYear ? ` · ${affidavitYear}` : ""}
              {lastUpdated ? ` · ${t.profile.updated} ${lastUpdated}` : ""}
            </div>
          </div>
        </div>
        <span className="text-[11px] font-medium text-accent shrink-0">
          {open ? t.profile.less : t.profile.details}
        </span>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2 border-t border-line/60 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {profession && (
              <div className="rounded-lg bg-surface-2 border border-line/60 px-2.5 py-2">
                <div className="text-[10px] uppercase tracking-wider text-muted">{t.profile.profession}</div>
                <div className="text-xs font-medium text-ink">{profession}</div>
              </div>
            )}
            {liabilities && (
              <div className="rounded-lg bg-surface-2 border border-line/60 px-2.5 py-2">
                <div className="text-[10px] uppercase tracking-wider text-muted">{t.profile.liabilities}</div>
                <div className="text-xs font-medium text-ink">{liabilities}</div>
              </div>
            )}
          </div>
          <p className="text-[10px] text-muted leading-snug">
            {t.profile.affidavitNote}
            <span className="text-faint"> · </span>
            {eciSource}
          </p>
          {affidavitPdfUrl && (
            <a
              href={affidavitPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-xs font-medium text-accent hover:text-accent-bright"
            >
              {t.profile.originalAffidavit}
            </a>
          )}
        </div>
      )}
    </section>
  );
}
