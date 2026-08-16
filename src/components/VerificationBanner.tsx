"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "politica-verified";

export function useVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setIsVerified(stored === "true");
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const toggle = () => {
    const next = !isVerified;
    setIsVerified(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // ignore
    }
  };

  return { isVerified, hydrated, toggle };
}

export default function VerificationBanner({ dark = false }: { dark?: boolean }) {
  const { isVerified, hydrated, toggle } = useVerification();

  if (!hydrated) return null;

  if (dark) {
    return (
      <div
        className={`rounded-2xl border px-4 py-3.5 text-sm ${
          isVerified
            ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-200"
            : "border-white/10 bg-zinc-900/60 text-zinc-400"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            {isVerified ? (
              <>
                <span className="font-medium text-indigo-200">You are marked as Verified</span>
                <span className="ml-2 text-indigo-300/70">· Comments will show a Verified badge</span>
              </>
            ) : (
              <>
                <span className="font-medium text-zinc-300">Basic user</span>
                <span className="ml-2 text-zinc-500">
                  · Like/dislike available. Toggle to simulate dual-verification for comments.
                </span>
              </>
            )}
          </div>

          <button
            onClick={toggle}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition ${
              isVerified
                ? "bg-zinc-800 border border-white/10 text-zinc-300 hover:bg-zinc-700"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            {isVerified ? "Remove verification" : "Simulate dual verification"}
          </button>
        </div>

        <p className="mt-2 text-xs text-zinc-500">
          Temporary mock for MVP. Real dual verification (offline Aadhaar e-KYC) will replace this later.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm ${
        isVerified
          ? "border-indigo-200 bg-indigo-50 text-indigo-800"
          : "border-slate-200 bg-slate-50 text-slate-700"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          {isVerified ? (
            <>
              <span className="font-medium">You are marked as Verified</span>
              <span className="ml-2 text-indigo-600">· Comments will show a Verified badge</span>
            </>
          ) : (
            <>
              <span className="font-medium">Basic user</span>
              <span className="ml-2 text-slate-500">
                · You can like/dislike. Toggle below to simulate dual-verification for comments.
              </span>
            </>
          )}
        </div>

        <button
          onClick={toggle}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
            isVerified
              ? "bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-50"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {isVerified ? "Remove verification" : "Simulate dual verification"}
        </button>
      </div>

      <p className="mt-2 text-xs opacity-80">
        This is a temporary mock for the MVP. Real dual verification (offline Aadhaar e-KYC or equivalent) will replace this later.
      </p>
    </div>
  );
}
