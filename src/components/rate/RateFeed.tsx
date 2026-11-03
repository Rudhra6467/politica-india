"use client";

import { useMemo } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { useChosenState } from "./useChosenState";
import StatePicker from "./StatePicker";
import LeaderCard from "./LeaderCard";

/** Home. One state, its leaders, five stars each. Winners first, then by the editorial sort order already in the data. */
export default function RateFeed({ states }: { states: string[] }) {
  const { t, index } = useLocale();
  const { state, setState, ready } = useChosenState(states);
  const rows = useMemo(
    () => index.candidates.filter((c) => c.state === state).sort((a, b) => Number(b.won) - Number(a.won) || a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)),
    [index, state],
  );
  const labelOf = (s: string) => (s === "Andhra Pradesh" ? t.common.ap : s === "Telangana" ? t.common.tg : s);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          {t.rate.feedTitle} {state}
        </h2>
        <StatePicker states={states} value={state} onChange={setState} labelOf={labelOf} />
      </div>
      <div className={"mt-4 grid gap-3 sm:grid-cols-2 " + (ready ? "" : "opacity-60")}>
        {rows.map((c, i) => (
          <LeaderCard key={c.id} c={c} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}
