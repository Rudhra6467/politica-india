"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function HeaderTagline() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div className="relative text-right" ref={ref}>
      <div className="text-sm text-slate-600 leading-snug inline-flex items-center gap-1.5">
        <span>Digital Accountability Starts Here</span>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
          aria-label="About data sources"
          title="About data sources"
        >
          !
        </button>
      </div>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-lg text-sm text-slate-600 leading-relaxed">
          <p className="font-medium text-slate-800 mb-2">Where this information comes from</p>
          <ul className="space-y-1.5 text-xs">
            <li>
              <span className="font-medium text-slate-700">Verified record</span> — Election
              Commission of India Form 26 affidavits (assets, liabilities, education, criminal
              cases).
            </li>
            <li>
              <span className="font-medium text-slate-700">Promises & announcements</span> — tracked
              from public statements and reported progress where available.
            </li>
            <li>
              <span className="font-medium text-slate-700">Community</span> — likes, dislikes and
              comments from users. Reaction only, not official data.
            </li>
          </ul>
          <p className="mt-3 text-[11px] text-slate-400">
            This platform reflects claims and citizen reaction. It does not rank or endorse
            candidates.
          </p>
          <Link
            href="/methodology"
            onClick={() => setOpen(false)}
            className="mt-3 inline-block text-xs font-medium text-indigo-600 hover:text-indigo-800"
          >
            Full methodology →
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-2 block text-xs text-slate-400 hover:text-slate-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
