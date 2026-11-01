"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { pilotCandidates, resultOf, type PilotCandidate } from "@/data/pilot-candidates";
import PartyBadge from "@/components/PartyBadge";
import CandidateAvatar from "@/components/CandidateAvatar";

type SortKey = "role" | "name" | "cases";

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export default function CandidatesBrowser() {
  const router = useRouter();
  const sp = useSearchParams();

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
    router.replace(`/candidates${next.toString() ? `?${next}` : ""}`, { scroll: false });
  };

  const states = useMemo(() => Array.from(new Set(pilotCandidates.map((c) => c.state))).sort(), []);
  const parties = useMemo(() => {
    const pool = state ? pilotCandidates.filter((c) => c.state === state) : pilotCandidates;
    return Array.from(new Set(pool.map((c) => c.partyAbbr))).sort();
  }, [state]);

  const filtered = useMemo(() => {
    const nq = norm(q.trim());
    let list = pilotCandidates.filter((c) => {
      if (state && c.state !== state) return false;
      if (party && c.partyAbbr !== party) return false;
      if (role === "MP" && c.electionType !== "Lok Sabha") return false;
      if (role === "MLA" && c.electionType !== "Assembly") return false;
      if (result && resultOf(c) !== result) return false;
      if (nq) {
        const hay = norm(`${c.name} ${c.party} ${c.partyAbbr} ${c.constituency} ${c.state}`);
        if (!hay.includes(nq)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "cases") return b.criminalCases - a.criminalCases || a.name.localeCompare(b.name);
      const la = resultOf(a) === "lost" ? 1 : 0;
      const lb = resultOf(b) === "lost" ? 1 : 0;
      return la - lb || (a.sortOrder ?? 99) - (b.sortOrder ?? 99) || a.state.localeCompare(b.state);
    });
    return list;
  }, [q, state, party, role, result, sort]);

  const activeFilters = [state, party, role, result].filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Representatives</h1>
          <p className="mt-1 text-sm text-slate-500">
            MLAs and MPs in the pilot, with ECI Form 26 facts. Elected first, then candidates who lost.
          </p>
        </div>
        <label className="relative block w-full sm:w-72">
          <span className="sr-only">Filter by name, party or place</span>
          <input
            type="search"
            placeholder="Filter by name, party, place…"
            value={q}
            onChange={(e) => setParam("q", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2m1.7-4.3a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </label>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-card">
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          <ChipGroup
            label="State"
            value={state}
            options={states.map((s) => ({ value: s, label: s }))}
            onChange={(v) => {
              setParam("state", v);
              if (party && v && !pilotCandidates.some((c) => c.state === v && c.partyAbbr === party)) setParam("party", "");
            }}
          />
          <ChipGroup label="Party" value={party} options={parties.map((p) => ({ value: p, label: p }))} onChange={(v) => setParam("party", v)} />
          <ChipGroup
            label="Role"
            value={role}
            options={[
              { value: "MLA", label: "MLA" },
              { value: "MP", label: "MP" },
            ]}
            onChange={(v) => setParam("role", v)}
          />
          <ChipGroup
            label="Result"
            value={result}
            options={[
              { value: "won", label: "Elected" },
              { value: "lost", label: "Lost" },
            ]}
            onChange={(v) => setParam("result", v)}
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-xs text-slate-500">
          <span className="tabular">
            Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of {pilotCandidates.length}
            {activeFilters > 0 || q ? (
              <>
                {" · "}
                <Link href="/candidates" className="font-medium text-indigo-600 hover:underline">
                  Clear all
                </Link>
              </>
            ) : null}
          </span>
          <label className="inline-flex items-center gap-1.5">
            Sort
            <select
              value={sort}
              onChange={(e) => setParam("sort", e.target.value === "role" ? "" : e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 focus:border-indigo-400 focus:outline-none"
            >
              <option value="role">By role (CM first)</option>
              <option value="name">Name A–Z</option>
              <option value="cases">Declared cases</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center text-sm text-slate-500">
          No representative matches{q ? ` “${q}”` : ""}
          {state ? ` in ${state}` : ""}. The pilot covers Andhra Pradesh and Telangana only.
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

function ChipGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</span>
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? "" : o.value)}
            className={
              "rounded-full border px-2.5 py-1 text-xs font-medium transition " +
              (on
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-400")
            }
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function CandidateCard({ c }: { c: PilotCandidate }) {
  const won = resultOf(c) === "won";
  const roleLabel = c.electionType === "Lok Sabha" ? "MP" : "MLA";
  return (
    <Link
      href={`/candidates/${c.id}`}
      className="group flex h-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-card transition hover:border-indigo-200 hover:shadow-lift active:scale-[0.995]"
    >
      <CandidateAvatar name={c.name} photoUrl={c.photoUrl} size="md" partyAbbr={c.partyAbbr} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h2 className="truncate text-sm font-semibold leading-tight text-slate-900 group-hover:text-indigo-700">{c.name}</h2>
          {!won && (
            <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-1.5 py-px text-[9px] font-medium uppercase tracking-wide text-slate-500">
              Lost
            </span>
          )}
        </div>
        <p className="truncate text-[11px] text-slate-500">
          {roleLabel} · {c.constituency}, {c.state === "Andhra Pradesh" ? "AP" : "TG"}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] tabular text-slate-500">
          <span className="inline-flex items-center gap-1">
            <PartyBadge abbr={c.partyAbbr} size="sm" preferSymbol={false} />
          </span>
          <span className={c.criminalCases > 0 ? "font-medium text-amber-700" : ""}>
            {c.criminalCases} case{c.criminalCases === 1 ? "" : "s"}
          </span>
          <span>·</span>
          <span>{c.promises.length} promise{c.promises.length === 1 ? "" : "s"}</span>
        </div>
      </div>
      <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" aria-hidden>
        →
      </span>
    </Link>
  );
}
