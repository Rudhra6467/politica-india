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
      <div className="text-xs sm:text-sm text-muted leading-snug inline-flex items-center gap-1 sm:gap-1.5">
        <span className="hidden xs:inline sm:inline max-w-[9rem] sm:max-w-none truncate sm:whitespace-normal">
          Digital Accountability Starts Here
        </span>
        <span className="sm:hidden text-muted">Sources</span>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-line text-xs font-semibold text-muted hover:border-accent/60 hover:text-accent-bright hover:bg-accent/10 transition shrink-0"
          aria-label="About data sources"
          title="About data sources"
        >
          !
        </button>
      </div>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-line bg-surface p-4 text-left shadow-lg text-sm text-muted leading-relaxed">
          <p className="font-medium text-ink mb-2">Where this information comes from</p>
          <ul className="space-y-1.5 text-xs">
            <li>
              <span className="font-medium text-ink/85">Verified record</span> — Election
              Commission of India Form 26 affidavits (assets, liabilities, education, criminal
              cases).
            </li>
            <li>
              <span className="font-medium text-ink/85">Promises & announcements</span> — tracked
              from public statements and reported progress where available.
            </li>
            <li>
              <span className="font-medium text-ink/85">Community</span> — likes, dislikes and
              comments from users. Reaction only, not official data.
            </li>
          </ul>
          <p className="mt-3 text-[11px] text-muted">
            This platform reflects claims and citizen reaction. It does not rank or endorse
            candidates.
          </p>
          <Link
            href="/methodology"
            onClick={() => setOpen(false)}
            className="mt-3 inline-block text-xs font-medium text-accent hover:text-accent-bright"
          >
            Full methodology →
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-2 block text-xs text-muted hover:text-muted"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
