"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { useCommunity } from "./CommunityProvider";

export default function AccountButton() {
  const { t, href } = useLocale();
  const { mode, user, loaded, openSignIn, signOut } = useCommunity();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  if (mode !== "live") return null;

  if (!user) {
    return (
      <button
        type="button"
        onClick={openSignIn}
        disabled={!loaded}
        className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700 disabled:opacity-50"
      >
        {t.auth.signIn}
      </button>
    );
  }

  const label = user.displayName ?? `···${user.phoneLast4}`;
  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:border-slate-400"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">{label.slice(0, 1).toUpperCase()}</span>
        <span className="max-w-[7rem] truncate">{label}</span>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-1.5 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-lift">
          <div className="px-3 py-1.5 text-[11px] text-slate-500">
            {t.auth.signedInAs} ···{user.phoneLast4}
          </div>
          {user.isAdmin && (
            <Link role="menuitem" href={href("/admin/moderation")} className="block px-3 py-1.5 text-slate-700 hover:bg-slate-50" onClick={() => setOpen(false)}>
              Moderation
            </Link>
          )}
          <button
            role="menuitem"
            type="button"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="block w-full px-3 py-1.5 text-left text-slate-700 hover:bg-slate-50"
          >
            {t.auth.signOut}
          </button>
        </div>
      )}
    </div>
  );
}
