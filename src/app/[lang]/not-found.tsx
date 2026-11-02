"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";

export default function NotFound() {
  const { t, href } = useLocale();
  return (
    <div className="space-y-4 py-20 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t.notFound.title}</h1>
      <p className="mx-auto max-w-sm text-sm text-slate-500">{t.notFound.body}</p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href={href("/")} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
          {t.notFound.home}
        </Link>
        <Link
          href={href("/candidates")}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          {t.nav.representatives}
        </Link>
        <Link href={href("/methodology")} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
          {t.nav.methodology}
        </Link>
      </div>
    </div>
  );
}
