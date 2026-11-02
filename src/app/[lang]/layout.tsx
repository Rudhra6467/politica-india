import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Telugu, Noto_Sans_Devanagari } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import VelMark from "@/components/VelMark";
import SearchBox from "@/components/SearchBox";
import PwaRegister from "@/components/PwaRegister";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LOCALES, getDictionary, isLocale, type Locale } from "@/i18n";
import { localeHref } from "@/i18n/href";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getDataIndex } from "@/lib/index-rows";
import { communityMode } from "@/lib/community/env";
import { CommunityProvider } from "@/components/community/CommunityProvider";
import AccountButton from "@/components/community/AccountButton";
import "../globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "optional" });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], variable: "--font-telugu", display: "swap", weight: ["400", "500", "600", "700"] });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-devanagari", display: "swap", weight: ["400", "500", "600", "700"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://politica-qn61.vercel.app";

type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.siteTitle, template: "%s · Politica India" },
    description: t.meta.siteDescription,
    applicationName: "Politica India",
    keywords: ["India", "politics", "MLA", "MP", "affidavit", "ECI", "Form 26", "promises", "accountability"],
    alternates: {
      languages: { en: "/", te: "/te", hi: "/hi", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: "Politica India",
      title: t.meta.siteTitle,
      description: t.meta.siteDescription,
      locale: locale === "en" ? "en_IN" : locale === "te" ? "te_IN" : "hi_IN",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    manifest: "/manifest.webmanifest",
    appleWebApp: { capable: true, statusBarStyle: "default", title: "Politica" },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const t = getDictionary(locale);
  const h = (p: string) => localeHref(locale, p);
  const index = getDataIndex();
  const mode = communityMode();

  const NAV = [
    { href: h("/candidates"), label: t.nav.representatives },
    { href: h("/#parties"), label: t.nav.parties },
    { href: h("/methodology"), label: t.nav.methodology },
  ];

  const fontClass =
    locale === "te" ? `${inter.variable} ${telugu.variable} font-telugu` : locale === "hi" ? `${inter.variable} ${devanagari.variable} font-devanagari` : `${inter.variable}`;

  return (
    <html lang={locale === "en" ? "en-IN" : locale} className={fontClass}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <LocaleProvider locale={locale} dict={t} index={index}>
        <CommunityProvider mode={mode}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow-lift"
          >
            {t.nav.skip}
          </a>

          <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:gap-5">
              <Link href={h("/")} className="flex shrink-0 items-center gap-2 transition hover:opacity-80" aria-label={t.nav.home}>
                <VelMark className="h-7 w-auto sm:h-8" />
                <span className="hidden text-lg font-bold leading-none tracking-tight sm:inline sm:text-xl">
                  <span className="text-sindoor">P</span>
                  <span className="text-slate-900">olitica </span>
                  <span className="text-sindoor">I</span>
                  <span className="text-slate-900">ndia</span>
                </span>
              </Link>

              <div className="min-w-0 flex-1">
                <SearchBox variant="header" />
              </div>

              <nav className="hidden shrink-0 items-center gap-1 md:flex" aria-label="Primary">
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>

              <Suspense fallback={null}>
                <LanguageSwitcher compact />
              </Suspense>
              <AccountButton />
            </div>
          </header>

          <main id="main" className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
            {children}
          </main>

          <footer className="mt-12 border-t border-slate-200 bg-white sm:mt-16">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
              <div>
                <div className="flex items-center gap-2">
                  <VelMark className="h-6 w-auto" />
                  <span className="font-bold tracking-tight">
                    <span className="text-sindoor">P</span>olitica <span className="text-sindoor">I</span>ndia
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{t.footer.tagline}</p>
                <div className="mt-4">
                  <Suspense fallback={null}>
                    <LanguageSwitcher />
                  </Suspense>
                </div>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t.footer.explore}</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><Link href={h("/candidates")} className="text-slate-600 hover:text-indigo-700">{t.footer.allRepresentatives}</Link></li>
                  <li><Link href={h("/candidates?state=Andhra%20Pradesh")} className="text-slate-600 hover:text-indigo-700">Andhra Pradesh</Link></li>
                  <li><Link href={h("/candidates?state=Telangana")} className="text-slate-600 hover:text-indigo-700">Telangana</Link></li>
                  <li><Link href={h("/#parties")} className="text-slate-600 hover:text-indigo-700">{t.nav.parties}</Link></li>
                  <li><Link href={h("/methodology")} className="text-slate-600 hover:text-indigo-700">{t.nav.methodology}</Link></li>
                  <li><Link href={h("/privacy")} className="text-slate-600 hover:text-indigo-700">{t.legal.privacy}</Link></li>
                  <li><Link href={h("/terms")} className="text-slate-600 hover:text-indigo-700">{t.legal.terms}</Link></li>
                  <li><Link href={h("/grievance")} className="text-slate-600 hover:text-indigo-700">{t.legal.grievance}</Link></li>
                </ul>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t.footer.sourcesTrust}</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>{t.footer.declarations}</li>
                  <li>{t.footer.results}</li>
                  <li>{t.footer.photos}</li>
                  <li className="text-slate-500">{t.footer.disclaimer}</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">{t.footer.bottom}</div>
          </footer>
          <Analytics />
          <PwaRegister />
        </CommunityProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
