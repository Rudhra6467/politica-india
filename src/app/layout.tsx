import type { Metadata } from "next";
import Link from "next/link";
import VelMark from "@/components/VelMark";
import HeaderTagline from "@/components/HeaderTagline";
import "./globals.css";

export const metadata: Metadata = {
  title: "Politica India",
  description:
    "Digital accountability for elected representatives in India. Source-backed records, tracked promises, citizen reaction — without rankings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200/80 bg-white sticky top-0 z-40">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 hover:opacity-80 transition"
            >
              <VelMark className="h-7 w-auto sm:h-8" />
              <span className="font-bold text-lg sm:text-xl tracking-tight leading-none">
                <span className="text-[#C41E3A]">P</span>
                <span className="text-slate-900">olitica </span>
                <span className="text-[#C41E3A]">I</span>
                <span className="text-slate-900">ndia</span>
              </span>
            </Link>
            <HeaderTagline />
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">{children}</main>
        <footer className="border-t border-slate-200 mt-12 sm:mt-16 py-8 text-center text-sm text-slate-500">
          <p>Source of truth for declarations: Election Commission of India (Form 26 affidavits).</p>
          <p className="mt-1 max-w-lg mx-auto px-4">
            This platform reflects claims and citizen reaction. It does not rank or endorse candidates.
          </p>
          <p className="mt-3">
            <Link href="/methodology" className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">
              Methodology
            </Link>
            <span className="text-slate-300 mx-2">·</span>
            <Link href="/candidates" className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">
              All candidates
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
