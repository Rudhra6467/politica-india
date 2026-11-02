import Link from "next/link";
import type { Locale } from "@/i18n";
import { localeHref } from "@/i18n/href";

const NOTE: Record<Locale, string | null> = {
  en: null,
  te: "ఈ పేజీ ప్రస్తుతం ఇంగ్లీషులో మాత్రమే ఉంది.",
  hi: "यह पेज अभी केवल अंग्रेज़ी में है।",
};

export default function LegalPage({ locale, title, updated, children }: { locale: Locale; title: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="prose-sm mx-auto max-w-3xl space-y-5 pb-16 text-sm leading-relaxed text-slate-700">
      <nav className="text-sm">
        <Link href={localeHref(locale, "/")} className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800">
          <span aria-hidden>←</span> Home
        </Link>
      </nav>
      {NOTE[locale] && <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">{NOTE[locale]}</p>}
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        <p className="mt-1 text-xs text-slate-500">Last updated {updated}</p>
      </header>
      {children}
    </article>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-6 text-base font-semibold text-slate-900">{children}</h2>;
}
