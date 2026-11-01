import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { pilotCandidates } from "@/data/pilot-candidates";
import { getPartyInfo } from "@/data/party-info";
import PartyContent from "./PartyContent";

type Params = Promise<{ abbr: string }>;

export function generateStaticParams() {
  return Array.from(new Set(pilotCandidates.map((c) => c.partyAbbr))).map((abbr) => ({ abbr }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { abbr } = await params;
  const info = getPartyInfo(abbr);
  const name = info?.name ?? abbr;
  return {
    title: name,
    description: `${name} (${abbr}) representatives in the Politica India pilot: elected MPs and MLAs, affidavit facts and tracked promises.`,
  };
}

export default async function PartyPage({ params }: { params: Params }) {
  const { abbr } = await params;
  if (!pilotCandidates.some((c) => c.partyAbbr === abbr)) notFound();

  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-slate-400">Loading…</div>}>
      <PartyContent abbr={abbr} />
    </Suspense>
  );
}
