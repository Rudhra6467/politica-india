import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, isLocale, type Locale } from "@/i18n";
import { localeHref } from "@/i18n/href";
import { getMethodology } from "@/i18n/methodology";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const m = getMethodology(isLocale(lang) ? lang : "en");
  return {
    title: m.metaTitle,
    description: m.metaDescription,
    alternates: { languages: { en: "/methodology", te: "/te/methodology", hi: "/hi/methodology", "x-default": "/methodology" } },
  };
}

export default async function MethodologyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const t = getDictionary(locale);
  const m = getMethodology(locale);

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-16">
      <div>
        <Link href={localeHref(locale, "/")} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
          <span aria-hidden>←</span> {t.party.home}
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{m.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.intro}</p>
      </div>

      {m.sections.map((s) => (
        <section key={s.heading} className="space-y-2.5">
          <h2 className="text-base font-semibold text-slate-900">{s.heading}</h2>
          {s.layers && (
            <div className="space-y-2.5">
              {s.layers.map((l) => (
                <div key={l.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${l.dot}`} />
                    <h3 className="text-sm font-semibold text-slate-800">{l.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{l.body}</p>
                </div>
              ))}
            </div>
          )}
          {s.paragraphs?.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-slate-600">
              {p}
            </p>
          ))}
          {s.bullets && (
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600">
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium leading-relaxed text-slate-700">{m.closing}</p>
      </section>
    </div>
  );
}
