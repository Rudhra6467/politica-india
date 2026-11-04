"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { useRating } from "./useRating";

/** Kept / Partly / Not kept → stored as 5 / 3 / 1 stars on promise:<id>. One tap, one verdict. */
const VERDICTS = [
  { stars: 5, key: "kept", on: "border-emerald-500 bg-emerald-500 text-white", off: "border-line bg-surface text-ink/85 hover:border-emerald-500/50 hover:bg-emerald-500/15", dot: "bg-emerald-500" },
  { stars: 3, key: "partly", on: "border-amber-500 bg-amber-500 text-white", off: "border-line bg-surface text-ink/85 hover:border-amber-500/50 hover:bg-amber-500/15", dot: "bg-amber-500" },
  { stars: 1, key: "notKept", on: "border-rose-500 bg-rose-500 text-white", off: "border-line bg-surface text-ink/85 hover:border-rose-500/50 hover:bg-rose-500/15", dot: "bg-rose-500" },
] as const;

export default function VerdictButtons({ promiseId, compact = false }: { promiseId: string; compact?: boolean }) {
  const { t } = useLocale();
  const { live, summary, hydrated, busy, submit, signedIn } = useRating(`promise:${promiseId}`);
  const mine = summary.mine;
  const total = summary.count;

  return (
    <div>
      {!compact && <p className="mb-1.5 text-xs font-semibold text-ink">{t.rate.delivered}</p>}
      <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label={t.rate.delivered}>
        {VERDICTS.map((v) => {
          const on = mine === v.stars;
          const share = summary.dist ? Math.round((summary.dist[v.stars - 1] / Math.max(total, 1)) * 100) : null;
          return (
            <button
              key={v.key}
              type="button"
              role="radio"
              aria-checked={on}
              disabled={!hydrated || busy}
              onClick={() => submit(on ? 0 : v.stars)}
              className={
                "flex min-h-[44px] flex-col items-center justify-center rounded-xl border px-2 py-1.5 text-sm font-semibold transition active:scale-95 disabled:opacity-60 " +
                (on ? v.on : v.off)
              }
            >
              <span>{t.rate[v.key]}</span>
              {share != null && <span className={"text-[10px] font-medium tabular " + (on ? "text-white/90" : "text-muted")}>{share}%</span>}
            </button>
          );
        })}
      </div>
      <p className="mt-1 min-h-[1rem] text-[11px] text-muted">
        {!hydrated
          ? ""
          : mine
            ? `${t.rate.yourVerdict}: ${t.rate[mine === 5 ? "kept" : mine === 3 ? "partly" : "notKept"]} · ${t.rate.change}`
            : live && !signedIn
              ? t.rate.signInToCount
              : !live
                ? t.rate.pilotStars
                : total === 0
                  ? t.rate.beFirst
                  : total < 50
                    ? `${total.toLocaleString("en-IN")} ${total === 1 ? t.rate.rating : t.rate.ratings} · ${t.rate.needMore}`
                    : `${total.toLocaleString("en-IN")} ${t.rate.people}`}
      </p>
    </div>
  );
}
