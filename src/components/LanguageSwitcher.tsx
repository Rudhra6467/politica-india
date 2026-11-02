"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LOCALES, LOCALE_LABEL, type Locale } from "@/i18n";
import { localeHref, stripLocale } from "@/i18n/href";
import { useLocale } from "@/i18n/LocaleProvider";

/** Three compact pills. Switching keeps the current page and query string. */
export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const sp = useSearchParams();
  const { path } = stripLocale(pathname);
  const qs = sp.toString();

  const target = (l: Locale) => {
    // English links must go through the /en redirect so the cookie is reset.
    const base = l === "en" ? `/en${path === "/" ? "" : path}` : localeHref(l, path);
    return qs ? `${base}?${qs}` : base;
  };

  return (
    <nav aria-label={t.nav.language} className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 text-xs">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={target(l)}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={
            "rounded-md px-2 py-1 font-medium transition " +
            (l === locale ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100")
          }
        >
          {compact ? l.toUpperCase() : LOCALE_LABEL[l]}
        </Link>
      ))}
    </nav>
  );
}
