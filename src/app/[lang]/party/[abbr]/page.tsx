import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { pilotCandidates } from "@/data/pilot-candidates";
import { getPartyInfo } from "@/data/party-info";
import { LOCALES } from "@/i18n";
import PartyContent from "./PartyContent";

type Params = Promise<{ lang: string; abbr: string }>;

export function generateStaticParams() {
  const abbrs = Array.from(new Set(pilotCandidates.map((c) => c.partyAbbr)));
  return LOCALES.flatMap((lang) => abbrs.map((abbr) => ({ lang, abbr })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { abbr } = await params;
  const info = getPartyInfo(abbr);
  const name = info?.name ?? abbr;
  return {
    title: name,
    description: `${name} (${abbr}) · Politica India pilot: elected MPs and MLAs, affidavit facts and tracked promises.`,
    alternates: { languages: { en: `/party/${abbr}`, te: `/te/party/${abbr}`, hi: `/hi/party/${abbr}`, "x-default": `/party/${abbr}` } },
  };
}

export default async function PartyPage({ params }: { params: Params }) {
  const { abbr } = await params;
  if (!pilotCandidates.some((c) => c.partyAbbr === abbr)) notFound();
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-slate-500">…</div>}>
      <PartyContent abbr={abbr} />
    </Suspense>
  );
}
