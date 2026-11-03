"use client";

import { useState, type ReactNode } from "react";

/** Facts live one tap deeper on the profile. Open by default on wide screens, closed on phones. */
export default function Collapsible({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-card">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5">
        <span>
          <span className="block text-sm font-bold text-slate-900">{title}</span>
          {hint && <span className="block text-[11px] text-slate-500">{hint}</span>}
        </span>
        <span className={"text-slate-400 transition " + (open ? "rotate-180" : "")} aria-hidden>▾</span>
      </button>
      <div className={(open ? "block" : "hidden") + " space-y-4 border-t border-slate-100 px-4 py-4 sm:px-5"}>{children}</div>
    </section>
  );
}
