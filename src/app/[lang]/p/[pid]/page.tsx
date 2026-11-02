import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPromises, getPromiseById } from "@/lib/promises";
import { LOCALES, getDictionary, isLocale, type Locale } from "@/i18n";
import { localeHref } from "@/i18n/href";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";
import PromiseCard from "@/components/PromiseCard";
import ShareButton from "@/components/ShareButton";

type Params = Promise<{ lang: string; pid: string }>;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getAllPromises().map(({ promise }) => ({ lang, pid: promise.id })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, pid } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "en");
  const hit = getPromiseById(pid);
  if (!hit) return { title: t.notFound.title };
  const { candidate, promise } = hit;
  const status = t.promise.status[promise.status];
  const desc = `${status}. ${promise.evidenceNote ?? ""}`.trim();
  return {
    title: `${promise.title} · ${candidate.name}`,
    description: desc.slice(0, 200),
    alternates: { languages: { en: `/p/${pid}`, te: `/te/p/${pid}`, hi: `/hi/p/${pid}`, "x-default": `/p/${pid}` } },
    openGraph: { title: `${promise.title} · ${candidate.name}`, description: desc.slice(0, 200), type: "article" },
  };
}

export default async function PromisePage({ params }: { params: Params }) {
  const { lang, pid } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const t = getDictionary(locale);
  const h = (p: string) => localeHref(locale, p);
  const hit = getPromiseById(pid);
  if (!hit) notFound();
  const { candidate, promise } = hit;
  const role = candidate.electionType === "Lok Sabha" ? t.common.mp : t.common.mla;
  const profileHref = h(`/candidates/${candidate.id}`);

  return (
    <div className="mx-auto max-w-3xl space-y-4 pb-10">
      <nav className="flex items-center justify-between gap-2 text-sm" aria-label="Breadcrumb">
        <Link href={profileHref} className="inline-flex items-center gap-1 text-slate-500 transition hover:text-slate-800">
          <span aria-hidden>←</span> {candidate.name}
        </Link>
        <ShareButton title={`${promise.title} · ${candidate.name}`} text={`${t.promise.status[promise.status]} — ${candidate.name}, ${candidate.constituency}`} />
      </nav>

      <Link
        href={profileHref}
        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-card transition hover:border-indigo-200"
      >
        <CandidateAvatar name={candidate.name} photoUrl={candidate.photoUrl} size="md" partyAbbr={candidate.partyAbbr} priority />
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{t.promisePage.by}</div>
          <div className="truncate text-sm font-semibold text-slate-900">{candidate.name}</div>
          <div className="truncate text-[11px] text-slate-500">
            {role} · {candidate.constituency}, {candidate.state}
          </div>
        </div>
        <PartyBadge abbr={candidate.partyAbbr} size="md" />
      </Link>

      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{t.promisePage.eyebrow}</p>
      <PromiseCard promise={promise} showShare={false} />

      <section className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-card">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{t.promisePage.statusMeaning}</div>
        <p className="mt-1">
          <span className="font-medium text-slate-800">{t.promise.status[promise.status]}</span> — {t.promise.statusHint[promise.status]}
        </p>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <Link href={profileHref} className="font-medium text-indigo-600 hover:text-indigo-800">
          {t.promisePage.allPromises} {candidate.name} ({candidate.promises.length}) →
        </Link>
        <Link href={h("/methodology")} className="text-xs text-slate-500 hover:text-slate-800">
          {t.nav.methodology}
        </Link>
      </div>
    </div>
  );
}
