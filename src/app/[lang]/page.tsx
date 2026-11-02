import Link from "next/link";
import { getAllStates, getFeaturedLeaders } from "@/data/pilot-candidates";
import { getSiteStats, getPartiesByState, getAllParties } from "@/lib/stats";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { localeHref } from "@/i18n/href";
import SearchBox from "@/components/SearchBox";
import StateExplorer from "@/components/StateExplorer";
import CandidateAvatar from "@/components/CandidateAvatar";
import LayerLegend from "@/components/LayerLegend";
import InstallPrompt from "@/components/InstallPrompt";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const t = getDictionary(locale);
  const h = (p: string) => localeHref(locale, p);

  const states = getAllStates();
  const stats = getSiteStats();
  const partiesByState = getPartiesByState();
  const allParties = getAllParties();
  const featured = getFeaturedLeaders(10);

  return (
    <div className="space-y-10 sm:space-y-12">
      <InstallPrompt />
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 py-8 shadow-card sm:px-10 sm:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-sindoor-soft to-indigo-50 opacity-80 blur-2xl"
        />
        <div className="relative max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {t.home.pilot}
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl">{t.home.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{t.home.subtitle}</p>
          <div className="mt-6">
            <SearchBox variant="hero" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">{t.home.try}</span>
            {states.map((s) => (
              <Link
                key={s}
                href={h(`/candidates?state=${encodeURIComponent(s)}`)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-700"
              >
                {s}
              </Link>
            ))}
            <Link
              href={h("/candidates")}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-700"
            >
              {t.home.allRepresentatives}
            </Link>
          </div>
        </div>

        <dl className="relative mt-8 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4">
          <Stat value={stats.candidates} label={t.home.statRepresentatives} />
          <Stat value={stats.promises} label={t.home.statPromises} />
          <Stat value={stats.parties} label={t.home.statParties} />
          <Stat value="Form 26" label={t.home.statSource} />
        </dl>
      </section>

      {/* Leaders */}
      <section>
        <div className="mb-3 flex items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{t.home.openProfile}</h2>
            <p className="mt-0.5 text-xs text-slate-500">{t.home.openProfileSub}</p>
          </div>
          <Link href={h("/candidates")} className="shrink-0 text-sm font-medium text-indigo-600 hover:text-indigo-800">
            {t.home.all} →
          </Link>
        </div>
        <div className="scrollbar-thin -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {featured.map((c, i) => (
            <Link
              key={c.id}
              href={h(`/candidates/${c.id}`)}
              className="group flex w-[6.5rem] shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-2 shadow-card transition hover:border-indigo-200 hover:shadow-lift"
            >
              <CandidateAvatar name={c.name} photoUrl={c.photoUrl} size="lg" partyAbbr={c.partyAbbr} priority={i < 4} />
              <span className="line-clamp-2 w-full text-center text-[11px] font-medium leading-tight text-slate-800 group-hover:text-indigo-700">
                {c.name.replace(/^[A-Z]\.(\s?[A-Z]\.)*\s*/, "")}
              </span>
              <span className="text-[10px] text-slate-500">
                {c.state === "Andhra Pradesh" ? t.common.ap : t.common.tg} · {c.partyAbbr}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <StateExplorer states={states} partiesByState={partiesByState} allParties={allParties} />

      {/* How to read */}
      <section>
        <div className="mb-3">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{t.home.howToRead}</h2>
          <p className="mt-0.5 text-xs text-slate-500">{t.home.howToReadSub}</p>
        </div>
        <LayerLegend dict={t} />
        <p className="mt-3 text-sm text-slate-500">
          {t.home.readFull}{" "}
          <Link href={h("/methodology")} className="font-medium text-indigo-600 hover:text-indigo-800">
            {t.home.methodologyLink}
          </Link>
          {t.home.readFullTail}
        </p>
      </section>

      <p className="text-center text-[11px] text-slate-500">
        {t.home.lastUpdated} {stats.lastUpdated} · {t.home.footnote}
      </p>
    </div>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-2xl font-bold tabular tracking-tight text-slate-900 sm:text-3xl">{value}</dd>
    </div>
  );
}
