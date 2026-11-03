"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/i18n/LocaleProvider";
import CandidateAvatar from "@/components/CandidateAvatar";
import { StatusPill } from "@/components/PromiseCard";
import VerdictButtons from "./VerdictButtons";
import StatePicker from "./StatePicker";
import { useChosenState } from "./useChosenState";
import type { PromiseStatus } from "@/data/pilot-candidates";

export type PromiseFeedRow = {
  id: string;
  title: string;
  status: PromiseStatus;
  sourceCount: number;
  lastChecked?: string;
  candidateId: string;
  candidateName: string;
  partyAbbr: string;
  photoUrl?: string;
  constituency: string;
  state: string;
};

/** Promises page. One promise, one verdict. The record's status sits small beside it, never above the citizen's tap. */
export default function PromiseFeed({ rows, states }: { rows: PromiseFeedRow[]; states: string[] }) {
  const { t, href } = useLocale();
  const params = useSearchParams();
  const leader = params.get("leader");
  const { state, setState } = useChosenState(states);
  const list = useMemo(() => (leader ? rows.filter((r) => r.candidateId === leader) : rows.filter((r) => r.state === state)), [rows, state, leader]);
  const labelOf = (s: string) => (s === "Andhra Pradesh" ? t.common.ap : s === "Telangana" ? t.common.tg : s);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{t.rate.promisesTitle}</h1>
          <p className="mt-0.5 text-xs text-slate-500">{t.rate.promisesSub}</p>
        </div>
        {leader ? (
          <Link href={href("/promises")} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900">
            {t.rate.seeAll} ✕
          </Link>
        ) : (
          <StatePicker states={states} value={state} onChange={setState} labelOf={labelOf} />
        )}
      </div>

      <ul className="mt-4 space-y-3">
        {list.map((p) => (
          <li key={p.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-card sm:p-5">
            <Link href={href(`/candidates/${p.candidateId}`)} className="flex items-center gap-2.5">
              <CandidateAvatar name={p.candidateName} photoUrl={p.photoUrl} size="sm" />
              <span className="min-w-0">
                <span className="block truncate text-xs font-semibold text-slate-800">{p.candidateName}</span>
                <span className="block truncate text-[10px] text-slate-500">
                  {p.partyAbbr} · {p.constituency}
                </span>
              </span>
            </Link>
            <h2 className="mt-2.5 text-base font-semibold leading-snug text-slate-900 sm:text-lg">{p.title}</h2>
            <div className="mt-3">
              <VerdictButtons promiseId={p.id} />
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-slate-100 pt-2.5 text-[11px] text-slate-500">
              <span>{t.rate.recordSays}</span>
              <StatusPill status={p.status} size="sm" />
              <Link href={href(`/p/${p.id}`)} className="font-medium text-indigo-600 hover:text-indigo-800">
                {p.sourceCount} {t.rate.sourcesShort} →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
