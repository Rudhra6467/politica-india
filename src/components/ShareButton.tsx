"use client";

import { useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

export default function ShareButton({ title, text }: { title: string; text?: string }) {
  const { t } = useLocale();
  const [state, setState] = useState<"idle" | "copied" | "shared">("idle");

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text, url });
        setState("shared");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setState("copied");
      }
    } catch {
      // user cancelled or clipboard blocked — stay quiet
    }
    setTimeout(() => setState("idle"), 1800);
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-indigo-300 hover:text-indigo-700"
      aria-live="polite"
    >
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.7 13.5l6.6 3.8M15.3 6.7l-6.6 3.8M18 20a3 3 0 100-6 3 3 0 000 6zM18 10a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
      {state === "copied" ? t.profile.linkCopied : state === "shared" ? t.profile.shared : t.profile.share}
    </button>
  );
}
