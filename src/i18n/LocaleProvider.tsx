"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary, Locale } from "./index";
import { localeHref } from "./href";

type Ctx = { locale: Locale; t: Dictionary; href: (path: string) => string };

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ locale, dict, children }: { locale: Locale; dict: Dictionary; children: ReactNode }) {
  const value: Ctx = { locale, t: dict, href: (p) => localeHref(locale, p) };
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Dictionary, locale and a locale-aware href builder for client components. */
export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
