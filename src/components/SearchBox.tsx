"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchAll, type SearchResult } from "@/lib/search";
import CandidateAvatar from "./CandidateAvatar";
import PartyBadge from "./PartyBadge";

interface SearchBoxProps {
  variant?: "header" | "hero";
  placeholder?: string;
  autoFocus?: boolean;
}

const TYPE_LABEL: Record<SearchResult["type"], string> = {
  candidate: "Representative",
  party: "Party",
  constituency: "Constituency",
};

export default function SearchBox({
  variant = "header",
  placeholder = "Search a leader, party or constituency",
  autoFocus = false,
}: SearchBoxProps) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = q.trim() ? searchAll(q, 8) : [];

  // "/" focuses the header search from anywhere on the page
  useEffect(() => {
    if (variant !== "header") return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [variant]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const go = (r: SearchResult) => {
    setOpen(false);
    setQ("");
    router.push(r.href);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) {
      if (e.key === "Enter" && q.trim()) {
        setOpen(false);
        router.push(`/candidates?q=${encodeURIComponent(q.trim())}`);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active] ?? results[0]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const isHero = variant === "hero";

  return (
    <div ref={wrapRef} className={"relative " + (isHero ? "w-full" : "w-full max-w-md")}>
      <label htmlFor={listId + "-input"} className="sr-only">
        Search
      </label>
      <svg
        className={
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-400 " +
          (isHero ? "left-4 h-5 w-5" : "left-3 h-4 w-4")
        }
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2m1.7-4.3a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        id={listId + "-input"}
        ref={inputRef}
        type="search"
        autoComplete="off"
        autoFocus={autoFocus}
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        placeholder={placeholder}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className={
          "w-full rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 " +
          (isHero ? "pl-11 pr-4 py-3.5 text-base sm:text-lg" : "pl-9 pr-8 py-2 text-sm")
        }
      />
      {!isHero && !q && (
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-slate-50 px-1.5 text-[10px] font-medium text-slate-400 sm:block">
          /
        </kbd>
      )}

      {open && q.trim() && (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift"
        >
          {results.length === 0 ? (
            <div className="px-4 py-4 text-sm text-slate-500">
              No match for <span className="font-medium text-slate-700">“{q}”</span> in the pilot set.
            </div>
          ) : (
            <ul className="max-h-[22rem] overflow-y-auto py-1">
              {results.map((r, i) => (
                <li key={r.type + r.id} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r)}
                    className={
                      "flex w-full items-center gap-3 px-3 py-2 text-left transition " +
                      (i === active ? "bg-indigo-50" : "hover:bg-slate-50")
                    }
                  >
                    {r.type === "candidate" ? (
                      <CandidateAvatar name={r.candidate.name} photoUrl={r.candidate.photoUrl} size="sm" />
                    ) : r.type === "party" ? (
                      <PartyBadge abbr={r.id} size="md" />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500" aria-hidden>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-900">{r.title}</span>
                      <span className="block truncate text-xs text-slate-500">{r.subtitle}</span>
                    </span>
                    <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {TYPE_LABEL[r.type]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-slate-100 bg-slate-50 px-3 py-1.5 text-[10px] text-slate-400">
            ↑↓ to move · Enter to open · Esc to close
          </div>
        </div>
      )}
    </div>
  );
}
