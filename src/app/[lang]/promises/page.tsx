import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllStates } from "@/data/pilot-candidates";
import { getAllPromises } from "@/lib/promises";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import PromiseFeed, { type PromiseFeedRow } from "@/components/rate/PromiseFeed";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "en");
  return {
    title: t.rate.promisesTitle,
    description: t.rate.promisesSub,
    alternates: { languages: { en: "/promises", te: "/te/promises", hi: "/hi/promises", "x-default": "/promises" } },
  };
}

export default async function PromisesPage({ params }: { params: Params }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  void locale;
  const rows: PromiseFeedRow[] = getAllPromises().map(({ candidate, promise }) => ({
    id: promise.id,
    title: promise.title,
    status: promise.status,
    sourceCount: promise.sources?.length ?? 0,
    lastChecked: promise.lastChecked,
    candidateId: candidate.id,
    candidateName: candidate.name,
    partyAbbr: candidate.partyAbbr,
    photoUrl: candidate.photoUrl,
    constituency: candidate.constituency,
    state: candidate.state,
  }));
  return (
    <Suspense fallback={null}>
      <PromiseFeed rows={rows} states={getAllStates()} />
    </Suspense>
  );
}
