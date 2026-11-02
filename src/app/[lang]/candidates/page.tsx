import type { Metadata } from "next";
import { Suspense } from "react";
import { getDictionary, isLocale } from "@/i18n";
import CandidatesBrowser from "./CandidatesBrowser";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "en");
  return { title: t.list.title, description: t.list.subtitle };
}

export default function CandidatesPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-slate-400">…</div>}>
      <CandidatesBrowser />
    </Suspense>
  );
}
