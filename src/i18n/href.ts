import { DEFAULT_LOCALE, type Locale } from "./index";

/** Prefix an app path for a locale. English stays unprefixed (canonical). */
export function localeHref(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path}`;
  return `/${locale}${path}`;
}

/** Strip a locale prefix from a pathname, returning the canonical app path. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const m = pathname.match(/^\/(te|hi|en)(?=\/|$)/);
  if (!m) return { locale: DEFAULT_LOCALE, path: pathname || "/" };
  const rest = pathname.slice(m[0].length) || "/";
  return { locale: m[1] as Locale, path: rest };
}
