"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useRating } from "./useRating";

export function Star({ filled, half = false, className = "" }: { filled: boolean; half?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {half && (
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8L12 2.5z"
        fill={half ? "url(#half-star)" : filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Compact read-only stars with the average, for lists and boards. */
export function StarMeter({ avg, count, size = "sm" }: { avg: number | null; count: number; size?: "sm" | "md" }) {
  const { t } = useLocale();
  const cls = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  if (avg == null) {
    return <span className="text-[11px] text-slate-500">{count === 0 ? t.rate.beFirst : `${count.toLocaleString("en-IN")} ${count === 1 ? t.rate.rating : t.rate.ratings} · ${t.rate.needMore}`}</span>;
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex text-amber-500">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} filled={avg >= i - 0.25} half={avg < i - 0.25 && avg >= i - 0.75} className={cls} />
        ))}
      </span>
      <span className="text-xs font-semibold tabular text-slate-800">{avg.toFixed(1)}</span>
      <span className="text-[11px] tabular text-slate-500">({count.toLocaleString("en-IN")})</span>
    </span>
  );
}

/**
 * The core gesture of the product: five big stars you tap once.
 * Big hit areas (44px+), instant feedback, the count beside it, no editorial score anywhere.
 */
export default function StarRating({ targetKey, size = "lg", align = "left" }: { targetKey: string; size?: "md" | "lg"; align?: "left" | "center" }) {
  const { t } = useLocale();
  const { live, summary, hydrated, busy, submit, signedIn } = useRating(targetKey);
  const [hover, setHover] = useState(0);
  const mine = summary.mine;
  const shown = hover || mine;
  const starCls = size === "lg" ? "h-10 w-10 sm:h-11 sm:w-11" : "h-8 w-8";
  const btnCls = size === "lg" ? "h-12 w-12 sm:h-13 sm:w-13" : "h-10 w-10";

  const caption = !hydrated
    ? ""
    : mine
      ? `${t.rate.yourRating}: ${mine}/5 · ${t.rate.change}`
      : live && !signedIn
        ? t.rate.signInToCount
        : t.rate.rateThis;

  return (
    <div className={align === "center" ? "flex flex-col items-center" : ""}>
      <div
        role="radiogroup"
        aria-label={t.rate.rateThis}
        className={"flex items-center " + (size === "lg" ? "-ml-1.5 gap-0" : "-ml-1 gap-0")}
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((i) => {
          const active = shown >= i;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={mine === i}
              aria-label={`${i}/5`}
              disabled={!hydrated || busy}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(0)}
              onClick={() => submit(mine === i ? 0 : i)}
              className={
                `flex ${btnCls} items-center justify-center rounded-full transition active:scale-90 disabled:opacity-60 ` +
                (active ? "text-amber-500" : "text-slate-300 hover:text-amber-400")
              }
            >
              <Star filled={active} className={starCls + " drop-shadow-sm"} />
            </button>
          );
        })}
      </div>
      <p className={"mt-0.5 min-h-[1rem] text-[11px] leading-tight " + (mine ? "font-medium text-amber-700" : "text-slate-500")}>
        {caption}
        {!live && hydrated && <span className="text-slate-400"> · {t.rate.pilotStars}</span>}
      </p>
      {live && hydrated && (
        <p className="mt-0.5 text-[11px] text-slate-500">
          {summary.avg != null ? (
            <StarMeter avg={summary.avg} count={summary.count} />
          ) : summary.count === 0 ? (
            t.rate.beFirst
          ) : (
            `${summary.count.toLocaleString("en-IN")} ${summary.count === 1 ? t.rate.rating : t.rate.ratings} · ${t.rate.needMore}`
          )}
        </p>
      )}
    </div>
  );
}
