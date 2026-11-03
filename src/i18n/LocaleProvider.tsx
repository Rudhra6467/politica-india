"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { Dictionary, Locale } from "./index";
import type { DataIndex } from "@/lib/index-rows";
import { localeHref } from "./href";

type Ctx = { locale: Locale; t: Dictionary; href: (path: string) => string; index: DataIndex };

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ locale, dict, index, children }: { locale: Locale; dict: Dictionary; index: DataIndex; children: ReactNode }) {
  const value: Ctx = { locale, t: dict, href: (p) => localeHref(locale, p), index };
  // A rendered page is a real visit: remember its language for unprefixed URLs (middleware reads this).
  useEffect(() => {
    try {
      document.cookie = `politica-lang=${locale}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      // ignore
    }
  }, [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Dictionary, locale, locale-aware href builder and the compact data index for client components. */
export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
