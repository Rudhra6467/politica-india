"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CandidateRow } from "@/lib/index-rows";
import { useLocale } from "@/i18n/LocaleProvider";
import PartyBadge from "@/components/PartyBadge";
import CandidateAvatar from "@/components/CandidateAvatar";

type SortKey = "role" | "name" | "cases";

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export default function CandidatesBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const { t, href, index } = useLocale();
  const all = index.candidates;

  const q = sp.get("q") ?? "";
  const state = sp.get("state") ?? "";
  const party = sp.get("party") ?? "";
  const role = sp.get("role") ?? "";
  const result = sp.get("result") ?? "";
  const sort = (sp.get("sort") as SortKey) || "role";

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}${next.toString() ? `?${next}` : ""}`, { scroll: false });
  };

  const states = useMemo(() => Array.from(new Set(all.map((c) => c.state))).sort(), [all]);
  const parties = useMemo(() => {
    const pool = state ? all.filter((c) => c.state === state) : all;
    return Array.from(new Set(pool.map((c) => c.partyAbbr))).sort();
  }, [state, all]);

  const filtered = useMemo(() => {
    const nq = norm(q.trim());
    let list = all.filter((c) => {
      if (state && c.state !== state) return false;
      if (party && c.partyAbbr !== party) return false;
      if (role && c.role !== role) return false;
      if (result === "won" && !c.won) return false;
      if (result === "lost" && c.won) return false;
      if (nq) {
        const hay = norm(`${c.name} ${c.party} ${c.partyAbbr} ${c.constituency} ${c.state}`);
        if (!hay.includes(nq)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "cases") return b.criminalCases - a.criminalCases || a.name.localeCompare(b.name);
      const la = a.won ? 0 : 1;
      const lb = b.won ? 0 : 1;
      return la - lb || a.sortOrder - b.sortOrder || a.state.localeCompare(b.state);
    });
    return list;
  }, [q, state, party, role, result, sort, all]);

  const activeFilters = [state, party, role, result].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{t.list.title}</h1>
          <p className="mt-1 text-sm text-muted">{t.list.subtitle}</p>
        </div>
        <label className="relative block w-full sm:w-72">
          <span className="sr-only">{t.list.filterPlaceholder}</span>
          <input
            type="search"
            placeholder={t.list.filterPlaceholder}
            value={q}
            onChange={(e) => setParam("q", e.target.value)}
            className="w-full rounded-xl border border-line bg-surface py-2 pl-9 pr-3 text-sm shadow-sm focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/40"
          />
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2m1.7-4.3a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </label>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-3 shadow-card">
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          <ChipGroup
            label={t.list.state}
            value={state}
            options={states.map((s) => ({ value: s, label: s }))}
            onChange={(v) => {
              setParam("state", v);
              if (party && v && !all.some((c) => c.state === v && c.partyAbbr === party)) setParam("party", "");
            }}
          />
          <ChipGroup label={t.list.party} value={party} options={parties.map((p) => ({ value: p, label: p }))} onChange={(v) => setParam("party", v)} />
          <ChipGroup
            label={t.list.role}
            value={role}
            options={[
              { value: "MLA", label: t.common.mla },
              { value: "MP", label: t.common.mp },
            ]}
            onChange={(v) => setParam("role", v)}
          />
          <ChipGroup
            label={t.list.result}
            value={result}
            options={[
              { value: "won", label: t.list.elected },
              { value: "lost", label: t.list.lost },
            ]}
            onChange={(v) => setParam("result", v)}
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-2.5 text-xs text-muted">
          <span className="tabular">
            {t.list.showing} <span className="font-semibold text-ink">{filtered.length}</span> {t.list.of} {all.length}
            {activeFilters > 0 || q ? (
              <>
                {" · "}
                <Link href={href("/candidates")} className="font-medium text-accent hover:underline">
                  {t.list.clearAll}
                </Link>
              </>
            ) : null}
          </span>
          <label className="inline-flex items-center gap-1.5">
            {t.list.sort}
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value === "role" ? "" : e.target.value)}
              className="rounded-lg border border-line bg-surface px-2 py-1 text-xs text-ink/85 focus:border-gold focus:outline-none"
            >
              <option value="role">{t.list.sortRole}</option>
              <option value="name">{t.list.sortName}</option>
              <option value="cases">{t.list.sortCases}</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line bg-surface py-12 text-center text-sm text-muted">
          {t.list.noMatch}
          {q ? ` “${q}”` : ""}
          {state ? ` · ${state}` : ""}. {t.list.pilotOnly}
        </div>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <li key={c.id}>
              <CandidateCard c={c} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ChipGroup({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</span>
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? "" : o.value)}
            className={"rounded-full border px-2.5 py-1 text-xs font-medium transition " + (on ? "border-ink bg-ink text-bg" : "border-line bg-surface text-muted hover:border-faint")}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function CandidateCard({ c }: { c: CandidateRow }) {
  const { t, href } = useLocale();
  const won = c.won;
  const roleLabel = c.role === "MP" ? t.common.mp : t.common.mla;
  return (
    <Link
      href={href(`/candidates/${c.id}`)}
      className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-card transition hover:border-accent/60 hover:shadow-lift active:scale-[0.995]"
    >
      <CandidateAvatar name={c.name} photoUrl={c.photoUrl} size="md" partyAbbr={c.partyAbbr} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h2 className="truncate text-sm font-semibold leading-tight text-ink group-hover:text-accent-bright">{c.name}</h2>
          {!won && (
            <span className="shrink-0 rounded-full border border-line bg-surface-2 px-1.5 py-px text-[9px] font-medium uppercase tracking-wide text-muted">
              {t.list.lost}
            </span>
          )}
          {c.officeSummary && (
            <span title={c.officeSummary} className="shrink-0 rounded-full border border-amber-500/35 bg-amber-500/15 px-1.5 py-px text-[9px] font-medium uppercase tracking-wide text-amber-300">
              {t.list.statusChanged}
            </span>
          )}
        </div>
        <p className="truncate text-[11px] text-muted">
          {roleLabel} · {c.constituency}, {c.state === "Andhra Pradesh" ? t.common.ap : t.common.tg}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] tabular text-muted">
          <PartyBadge abbr={c.partyAbbr} size="sm" preferSymbol={false} />
          <span className={c.criminalCases > 0 ? "font-medium text-amber-300" : ""}>
            {c.criminalCases} {c.criminalCases === 1 ? t.list.case : t.list.cases}
          </span>
          <span>·</span>
          <span>
            {c.promiseCount} {c.promiseCount === 1 ? t.list.promise : t.list.promises}
          </span>
        </div>
      </div>
      <span className="text-faint transition group-hover:translate-x-0.5 group-hover:text-accent-bright" aria-hidden>
        →
      </span>
    </Link>
  );
}
