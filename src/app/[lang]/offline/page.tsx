"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";

export default function OfflinePage() {
  const { t, href } = useLocale();
  return (
    <div className="mx-auto max-w-md space-y-4 py-20 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{t.offline.title}</h1>
      <p className="text-sm leading-relaxed text-slate-500">{t.offline.body}</p>
      <Link href={href("/")} className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
        {t.offline.home}
      </Link>
    </div>
  );
}
