"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { pilotCandidates, getCandidatesByPartyAndState, resultOf, type PilotCandidate } from "@/data/pilot-candidates";
import { getPartyInfo } from "@/data/party-info";
import { useLocale } from "@/i18n/LocaleProvider";
import PartyBadge from "@/components/PartyBadge";
import CandidateAvatar from "@/components/CandidateAvatar";

function CandidateRow({ candidate, backHref }: { candidate: PilotCandidate; backHref: string }) {
  const { t, href } = useLocale();
  const role = candidate.electionType === "Lok Sabha" ? t.common.mp : t.common.mla;
  const profileHref = href(`/candidates/${candidate.id}?from=${encodeURIComponent(backHref)}`);
  const won = resultOf(candidate) === "won";

  return (
    <Link href={profileHref} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-card transition hover:border-indigo-200 hover:shadow-lift">
      <CandidateAvatar name={candidate.name} photoUrl={candidate.photoUrl} size="md" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold leading-snug text-slate-900 group-hover:text-indigo-700">{candidate.name}</div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11px] text-slate-500">
          <span>{role}</span>
          <span className="text-slate-300">·</span>
          <span className="truncate">{candidate.constituency}</span>
          <span className="text-slate-300">·</span>
          <span className="tabular">{candidate.state === "Andhra Pradesh" ? t.common.ap : t.common.tg}</span>
          {!won && (
            <>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400">{t.list.lost}</span>
            </>
          )}
          {candidate.officeStatus && (
            <>
              <span className="text-slate-300">·</span>
              <span className="text-amber-700">{t.list.statusChanged}</span>
            </>
          )}
        </div>
      </div>
      <div className="hidden shrink-0 text-right text-[11px] tabular text-slate-500 sm:block">
        <div className={candidate.criminalCases > 0 ? "font-medium text-amber-700" : ""}>
          {candidate.criminalCases} {candidate.criminalCases === 1 ? t.list.case : t.list.cases}
        </div>
        <div>
          {candidate.promises.length} {candidate.promises.length === 1 ? t.list.promise : t.list.promises}
        </div>
      </div>
      <span className="shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" aria-hidden>
        →
      </span>
    </Link>
  );
}

function CollapsibleRoleSection({ title, subtitle, candidates, backHref, defaultOpen = true }: { title: string; subtitle: string; candidates: PilotCandidate[]; backHref: string; defaultOpen?: boolean }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(defaultOpen);
  if (candidates.length === 0) return null;

  return (
    <section className="space-y-1.5">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-left transition hover:bg-slate-100">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-800">{title}</div>
          <div className="text-[11px] text-slate-500">
            {subtitle} · {candidates.length}
          </div>
        </div>
        <span className="shrink-0 text-xs font-medium text-slate-400">{open ? t.party.hide : t.party.showSection}</span>
      </button>
      {open && (
        <div className="space-y-1.5">
          {candidates.map((c) => (
            <CandidateRow key={c.id} candidate={c} backHref={backHref} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function PartyContent({ abbr }: { abbr: string }) {
  const { t, href } = useLocale();
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const info = getPartyInfo(abbr);
  const [moreOpen, setMoreOpen] = useState(false);

  const allForParty = state ? getCandidatesByPartyAndState(abbr, state) : pilotCandidates.filter((c) => c.partyAbbr === abbr).sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
  const winners = allForParty.filter((c) => resultOf(c) === "won");
  const losers = allForParty.filter((c) => resultOf(c) === "lost");
  const mps = winners.filter((c) => c.electionType === "Lok Sabha");
  const mlas = winners.filter((c) => c.electionType === "Assembly");
  const statesCovered = Array.from(new Set(pilotCandidates.filter((c) => c.partyAbbr === abbr).map((c) => c.state))).sort();

  const backHref = href(state ? `/party/${abbr}?state=${encodeURIComponent(state)}` : `/party/${abbr}`);
  const partyName = info?.name || allForParty[0]?.party || abbr;
  const chip = (on: boolean) => "rounded-full border px-2.5 py-1 font-medium " + (on ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-400");

  return (
    <div className="space-y-4 pb-10">
      <nav className="text-sm" aria-label="Breadcrumb">
        <Link href={href("/")} className="inline-flex items-center gap-1.5 text-slate-500 transition hover:text-slate-800">
          <span aria-hidden>←</span> {t.party.home}
        </Link>
      </nav>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-card sm:p-6">
        <div className="flex items-start gap-4">
          <PartyBadge abbr={abbr} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{partyName}</h1>
            <p className="mt-0.5 text-xs text-slate-500">
              {abbr}
              {info?.founded ? ` · ${t.party.founded} ${info.founded}` : ""}
              {info?.currentLeader ? ` · ${info.currentLeader}` : ""}
            </p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 sm:max-w-md">
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{t.party.mps}</dt>
            <dd className="text-xl font-bold tabular text-slate-900">{mps.length}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{t.party.mlas}</dt>
            <dd className="text-xl font-bold tabular text-slate-900">{mlas.length}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{t.party.statesInPilot}</dt>
            <dd className="text-xl font-bold tabular text-slate-900">{statesCovered.length}</dd>
          </div>
        </dl>

        {info?.short && (
          <div className="mt-4 text-sm leading-relaxed text-slate-600">
            <p>{info.short.join(" ")}</p>
            {moreOpen && info.more && <p className="mt-2">{info.more.join(" ")}</p>}
            {moreOpen && info.founder && (
              <p className="mt-2 text-xs text-slate-500">
                <span className="font-medium text-slate-600">{t.party.founder} · </span>
                {info.founder}
              </p>
            )}
            {(info.more || info.founder) && (
              <button type="button" onClick={() => setMoreOpen(!moreOpen)} className="mt-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800">
                {moreOpen ? t.party.less : t.party.more}
              </button>
            )}
          </div>
        )}

        {statesCovered.length > 1 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400">{t.party.show}</span>
            <Link href={href(`/party/${abbr}`)} className={chip(!state)}>
              {t.party.allStates}
            </Link>
            {statesCovered.map((s) => (
              <Link key={s} href={href(`/party/${abbr}?state=${encodeURIComponent(s)}`)} className={chip(state === s)}>
                {s}
              </Link>
            ))}
          </div>
        )}
      </section>

      {allForParty.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-10 text-center text-sm text-slate-500">
          {t.party.none} {abbr} · {state}
        </div>
      ) : (
        <>
          <CollapsibleRoleSection title={t.party.mpsTitle} subtitle={t.party.mpsSub} candidates={mps} backHref={backHref} />
          <CollapsibleRoleSection title={t.party.mlasTitle} subtitle={t.party.mlasSub} candidates={mlas} backHref={backHref} />
          <CollapsibleRoleSection title={t.party.lostTitle} subtitle={t.party.lostSub} candidates={losers} backHref={backHref} defaultOpen={false} />
        </>
      )}
    </div>
  );
}
