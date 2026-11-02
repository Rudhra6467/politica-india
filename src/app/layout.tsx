import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import VelMark from "@/components/VelMark";
import SearchBox from "@/components/SearchBox";
import { Analytics } from "@vercel/analytics/react";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://politica-qn61.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Politica India — Know who represents you",
    template: "%s · Politica India",
  },
  description:
    "Source-backed records for India's elected representatives: ECI Form 26 affidavits, tracked promises and citizen reaction. Attributed, never ranked.",
  applicationName: "Politica India",
  keywords: ["India", "politics", "MLA", "MP", "affidavit", "ECI", "Form 26", "promises", "accountability"],
  openGraph: {
    type: "website",
    siteName: "Politica India",
    title: "Politica India — Know who represents you",
    description:
      "Official affidavit records, tracked promises and citizen reaction for India's elected representatives.",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Politica" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const NAV = [
  { href: "/candidates", label: "Representatives" },
  { href: "/#parties", label: "Parties" },
  { href: "/methodology", label: "Methodology" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow-lift"
        >
          Skip to content
        </a>

        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:gap-5">
            <Link href="/" className="flex shrink-0 items-center gap-2 transition hover:opacity-80" aria-label="Politica India home">
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
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Political information infrastructure for Indian citizens. We reflect public records and claims; we
                do not rank, score or endorse anyone.
              </p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Explore</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/candidates" className="text-slate-600 hover:text-indigo-700">All representatives</Link></li>
                <li><Link href="/candidates?state=Andhra%20Pradesh" className="text-slate-600 hover:text-indigo-700">Andhra Pradesh</Link></li>
                <li><Link href="/candidates?state=Telangana" className="text-slate-600 hover:text-indigo-700">Telangana</Link></li>
                <li><Link href="/#parties" className="text-slate-600 hover:text-indigo-700">Parties</Link></li>
                <li><Link href="/methodology" className="text-slate-600 hover:text-indigo-700">Methodology</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sources &amp; trust</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  Declarations: Election Commission of India Form 26 affidavits, often via ADR / MyNeta.
                </li>
                <li>Results and margins: ECI published results.</li>
                <li>Photos: Wikimedia Commons where licensed. Party marks are simplified ECI-style symbols.</li>
                <li className="text-slate-400">Allegations are not convictions. Pilot engagement counts are illustrative.</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
            Pilot · Andhra Pradesh + Telangana · Built for the people of India
          </div>
        </footer>
        <Analytics />
        <PwaRegister />
      </body>
    </html>
  );
}
