import Link from "next/link";
import { Suspense } from "react";
import { getAllStates } from "@/data/pilot-candidates";
import { getSiteStats } from "@/lib/stats";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { localeHref } from "@/i18n/href";
import RateFeed from "@/components/rate/RateFeed";
import InstallPrompt from "@/components/InstallPrompt";

/**
 * Home is the product: pick your state, see your leaders, tap the stars.
 * No hero copy to read, no statistics to admire. Facts are one tap away on every card.
 */
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const t = getDictionary(locale);
  const h = (p: string) => localeHref(locale, p);
  const states = getAllStates();
  const stats = getSiteStats();

  return (
    <div className="space-y-6">
      <InstallPrompt />
      <section className="text-center sm:text-left">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">{t.rate.tagline}</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:mx-0 sm:text-base">{t.rate.sub}</p>
      </section>

      <Suspense fallback={null}>
        <RateFeed states={states} />
      </Suspense>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href={h("/promises")} className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-card transition hover:border-indigo-200 hover:shadow-lift">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t.rate.navPromises}</span>
          <span className="mt-1 block text-lg font-bold text-slate-900 group-hover:text-indigo-700">{t.rate.promisesTitle} →</span>
          <span className="mt-0.5 block text-xs text-slate-500">{stats.promises} {t.home.statPromises.toLowerCase()}</span>
        </Link>
        <Link href={h("/mood")} className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-card transition hover:border-indigo-200 hover:shadow-lift">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t.rate.navMood}</span>
          <span className="mt-1 block text-lg font-bold text-slate-900 group-hover:text-indigo-700">{t.rate.mood} →</span>
          <span className="mt-0.5 block text-xs text-slate-500">{t.rate.moodSub}</span>
        </Link>
      </div>

      <p className="text-center text-[11px] text-slate-500">
        {t.home.lastUpdated} {stats.lastUpdated} · {t.home.footnote}{" "}
        <Link href={h("/methodology")} className="font-medium text-indigo-600 hover:text-indigo-800">
          {t.home.methodologyLink}
        </Link>
      </p>
    </div>
  );
}
