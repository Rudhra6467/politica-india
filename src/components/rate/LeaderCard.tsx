"use client";

import Link from "next/link";
import Image from "next/image";
import PartyBadge from "@/components/PartyBadge";
import StarRating from "./StarRating";
import { useLocale } from "@/i18n/LocaleProvider";
import type { CandidateRow } from "@/lib/index-rows";

function initials(name: string) {
  return name.replace(/\./g, " ").split(/\s+/).filter(Boolean).map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

/**
 * Photo-forward card: the leader fills the frame, the name sits on the photo, the stars sit under it.
 * The whole photo links to the record; the stars never leave the page.
 */
export default function LeaderCard({ c, priority = false }: { c: CandidateRow; priority?: boolean }) {
  const { t, href } = useLocale();
  const role = c.role === "MP" ? t.common.mp : t.common.mla;
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-card transition hover:border-faint hover:shadow-lift">
      <Link href={href(`/candidates/${c.id}`)} className="relative block aspect-[4/3] overflow-hidden bg-surface-2 sm:aspect-[5/4]" aria-label={c.name}>
        {c.photoUrl ? (
          <Image
            src={c.photoUrl}
            alt={c.name}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-3 to-surface font-display text-6xl font-bold text-faint">{initials(c.name)}</div>
        )}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <PartyBadge abbr={c.partyAbbr} size="sm" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {role} · {c.constituency}
              {!c.won && <span className="normal-case tracking-normal"> · {t.profile.lost}</span>}
            </span>
          </div>
          <h3 className="mt-1 font-display text-2xl font-bold leading-[1.05] text-ink drop-shadow sm:text-[1.75rem]">{c.name}</h3>
        </div>
      </Link>
      <div className="px-4 pb-4 pt-3 sm:px-5">
        {c.officeSummary && <p className="mb-2 line-clamp-2 text-[11px] leading-snug text-amber-300">{c.officeSummary}</p>}
        <StarRating targetKey={`candidate:${c.id}`} align="center" />
        <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-3 text-xs">
          <Link href={href(`/candidates/${c.id}`)} className="font-semibold text-accent hover:text-accent-bright">
            {t.rate.facts} →
          </Link>
          <Link href={href(`/promises?leader=${c.id}`)} className="text-muted hover:text-ink">
            {c.promiseCount} {t.rate.promises.toLowerCase()}
          </Link>
        </div>
      </div>
    </article>
  );
}
