import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "@/i18n";

const COOKIE = "politica-lang";
const ONE_YEAR = 60 * 60 * 24 * 365;

/** Paths that are not pages and must never be rewritten. */
function isStatic(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/.well-known/") ||
    pathname === "/sw.js" ||
    pathname === "/manifest.webmanifest" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/icon.svg" ||
    pathname === "/opengraph-image" ||
    /\.[a-z0-9]+$/i.test(pathname)
  );
}

function preferredFromHeader(accept: string | null): Locale | null {
  if (!accept) return null;
  const langs = accept
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of langs) {
    const base = tag.split("-")[0];
    if (base === "te" || base === "hi") return base;
    if (base === "en") return "en";
  }
  return null;
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (isStatic(pathname)) return NextResponse.next();

  const first = pathname.split("/")[1];

  // /te/... or /hi/... : serve as-is and remember the choice.
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    const res = NextResponse.next();
    res.cookies.set(COOKIE, first, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    return res;
  }

  // /en/... : English is canonical without a prefix.
  if (first === DEFAULT_LOCALE) {
    const rest = pathname.slice(("/" + DEFAULT_LOCALE).length) || "/";
    const url = req.nextUrl.clone();
    url.pathname = rest;
    const res = NextResponse.redirect(url, 308);
    res.cookies.set(COOKIE, DEFAULT_LOCALE, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    return res;
  }

  // Unprefixed path: decide whether this visitor should see a regional language.
  const cookie = req.cookies.get(COOKIE)?.value;
  let target: Locale | null = null;
  if (isLocale(cookie)) {
    target = cookie === DEFAULT_LOCALE ? null : cookie;
  } else {
    const pref = preferredFromHeader(req.headers.get("accept-language"));
    if (pref && pref !== DEFAULT_LOCALE) target = pref;
  }

  if (target) {
    const url = req.nextUrl.clone();
    url.pathname = `/${target}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    const res = NextResponse.redirect(url, 307);
    res.cookies.set(COOKIE, target, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
    return res;
  }

  // Serve English from the [lang] tree while keeping the clean URL.
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  const res = NextResponse.rewrite(url);
  if (!cookie) res.cookies.set(COOKIE, DEFAULT_LOCALE, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
  return res;
}

export const config = {
  // Everything except Next internals and files with an extension.
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};

export { LOCALES };
