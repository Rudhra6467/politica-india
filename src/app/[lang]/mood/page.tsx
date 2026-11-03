import type { Metadata } from "next";
import Link from "next/link";
import { getCandidateById } from "@/data/pilot-candidates";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { localeHref } from "@/i18n/href";
import { isLive } from "@/lib/community/env";
import { prisma } from "@/lib/prisma";
import { MIN_PUBLIC_RATINGS } from "@/lib/community/ratings";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";
import { StarMeter } from "@/components/rate/StarRating";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "en");
  return { title: t.rate.mood, description: t.rate.moodSub, alternates: { languages: { en: "/mood", te: "/te/mood", hi: "/hi/mood", "x-default": "/mood" } } };
}

type Row = { id: string; count: number; avg: number | null };

/** Who is being rated, sorted by how many people rated. Averages appear only once MIN_PUBLIC_RATINGS is reached. */
async function loadBoard(): Promise<Row[]> {
  if (!isLive()) return [];
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000);
  try {
    const recent = await prisma.rating.groupBy({
      by: ["targetKey"],
      where: { targetKey: { startsWith: "candidate:" }, updatedAt: { gte: since } },
      _count: { _all: true },
      orderBy: { _count: { targetKey: "desc" } },
      take: 30,
    });
    const keys = recent.map((r) => r.targetKey);
    if (keys.length === 0) return [];
    const all = await prisma.rating.groupBy({ by: ["targetKey"], where: { targetKey: { in: keys } }, _count: { _all: true }, _avg: { stars: true } });
    const byKey = new Map(all.map((a) => [a.targetKey, a]));
    return recent.map((r) => {
      const a = byKey.get(r.targetKey);
      const count = a?._count._all ?? 0;
      return { id: r.targetKey.slice("candidate:".length), count, avg: count >= MIN_PUBLIC_RATINGS && a?._avg.stars != null ? Math.round(a._avg.stars * 10) / 10 : null };
    });
  } catch {
    return [];
  }
}

export default async function MoodPage({ params }: { params: Params }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const t = getDictionary(locale);
  const h = (p: string) => localeHref(locale, p);
  const rows = (await loadBoard()).map((r) => ({ ...r, c: getCandidateById(r.id) })).filter((r) => r.c);

  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{t.rate.mood}</h1>
      <p className="mt-0.5 text-xs text-slate-500">{t.rate.moodSub}</p>

      {rows.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center">
          <p className="text-sm text-slate-600">{t.rate.moodEmpty}</p>
          <Link href={h("/")} className="mt-3 inline-block rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white">
            {t.rate.navRate} →
          </Link>
        </div>
      ) : (
        <ol className="mt-4 space-y-2">
          {rows.map((r, i) => (
            <li key={r.id}>
              <Link href={h(`/candidates/${r.c!.id}`)} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-card transition hover:border-indigo-200">
                <span className="w-5 text-center text-xs font-bold tabular text-slate-400">{i + 1}</span>
                <CandidateAvatar name={r.c!.name} photoUrl={r.c!.photoUrl} size="md" partyAbbr={r.c!.partyAbbr} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-semibold text-slate-900">{r.c!.name}</span>
                    <PartyBadge abbr={r.c!.partyAbbr} size="sm" />
                  </span>
                  <span className="block truncate text-[11px] text-slate-500">{r.c!.constituency}</span>
                </span>
                <span className="shrink-0 text-right">
                  <StarMeter avg={r.avg} count={r.count} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
