"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "politica-user-verified";

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

export default function VerificationBanner() {
  const { isVerified, hydrated, toggle } = useVerification();

  if (!hydrated) return null;

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
