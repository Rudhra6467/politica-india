import type { Metadata } from "next";
import Link from "next/link";
import TrishulMark from "@/components/TrishulMark";
import "./globals.css";

export const metadata: Metadata = {
  title: "Politica India",
  description:
    "Digital accountability platform for elected representatives in India. Track promises, view affidavits, and engage with verified feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3.5 flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 hover:opacity-80 transition"
            >
              {/* Small Trishul — sits with the P */}
              <TrishulMark className="h-7 w-auto" />
              <span className="font-bold text-xl tracking-tight leading-none">
                <span className="text-[#C41E3A]">P</span>
                <span className="text-slate-900">olitica </span>
                <span className="text-[#C41E3A]">I</span>
                <span className="text-slate-900">ndia</span>
              </span>
            </Link>
            <nav className="text-sm text-slate-600 text-right leading-snug">
              Digital Accountability Starts Here
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t mt-16 py-8 text-center text-sm text-slate-500">
          <p>Source of truth for declarations: Election Commission of India (Form 26 affidavits).</p>
          <p className="mt-1">
            This platform reflects claims and citizen reaction. It does not rank or endorse candidates.
          </p>
        </footer>
      </body>
    </html>
  );
}
