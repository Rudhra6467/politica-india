"use client";

import Link from "next/link";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";
import StarRating from "./StarRating";
import { useLocale } from "@/i18n/LocaleProvider";
import type { CandidateRow } from "@/lib/index-rows";

/** One leader, one star row. The photo and name link to the full record; the stars never leave the page. */
export default function LeaderCard({ c, priority = false }: { c: CandidateRow; priority?: boolean }) {
  const { t, href } = useLocale();
  const role = c.role === "MP" ? t.common.mp : t.common.mla;
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-card transition hover:shadow-lift sm:p-5">
      <div className="flex items-start gap-3.5 sm:gap-4">
        <Link href={href(`/candidates/${c.id}`)} className="shrink-0" aria-label={c.name}>
          <CandidateAvatar name={c.name} photoUrl={c.photoUrl} size="xl" partyAbbr={c.partyAbbr} priority={priority} />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <PartyBadge abbr={c.partyAbbr} size="sm" />
            <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
              {role}
              {!c.won && <span className="normal-case"> · {t.profile.lost}</span>}
            </span>
          </div>
          <Link href={href(`/candidates/${c.id}`)} className="mt-1 block">
            <h3 className="text-lg font-bold leading-tight tracking-tight text-slate-900 hover:text-indigo-700 sm:text-xl">{c.name}</h3>
          </Link>
          <p className="mt-0.5 truncate text-sm text-slate-500">{c.constituency}</p>
          {c.officeSummary && <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-amber-800">{c.officeSummary}</p>}
          <div className="mt-2.5">
            <StarRating targetKey={`candidate:${c.id}`} />
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
        <Link href={href(`/candidates/${c.id}`)} className="font-medium text-indigo-600 hover:text-indigo-800">
          {t.rate.facts} →
        </Link>
        <Link href={href(`/promises?leader=${c.id}`)} className="text-slate-500 hover:text-slate-800">
          {c.promiseCount} {t.rate.promises.toLowerCase()}
        </Link>
      </div>
    </article>
  );
}
