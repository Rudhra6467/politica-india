"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";

export default function NotFound() {
  const { t, href } = useLocale();
  return (
    <div className="space-y-4 py-20 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-ink">{t.notFound.title}</h1>
      <p className="mx-auto max-w-sm text-sm text-muted">{t.notFound.body}</p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href={href("/")} className="rounded-xl bg-accent text-bg px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-bright">
          {t.notFound.home}
        </Link>
        <Link
          href={href("/candidates")}
          className="rounded-xl border border-line bg-surface px-4 py-2 text-sm font-medium text-ink/85 transition hover:bg-surface-2"
        >
          {t.nav.representatives}
        </Link>
        <Link href={href("/methodology")} className="text-sm font-medium text-accent hover:text-accent-bright">
          {t.nav.methodology}
        </Link>
      </div>
    </div>
  );
}
