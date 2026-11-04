"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "politica-verified";
const DISMISS_KEY = "politica-verify-banner-dismissed";

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

interface VerificationBannerProps {
  /** When true, shows a close button; dismissed state persists in localStorage */
  dismissible?: boolean;
}

export default function VerificationBanner({ dismissible = false }: VerificationBannerProps) {
  const { isVerified, hydrated, toggle } = useVerification();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!dismissible) return;
    try {
      if (localStorage.getItem(DISMISS_KEY) === "true") {
        setDismissed(true);
      }
    } catch {
      // ignore
    }
  }, [dismissible]);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // ignore
    }
  };

  if (!hydrated) return null;
  if (dismissible && dismissed) return null;

  return (
    <div
      className={`relative rounded-xl border px-4 py-3 text-sm ${
        isVerified
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-line bg-surface-2 text-ink/85"
      }`}
    >
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 h-7 w-7 rounded-lg text-muted hover:bg-surface-3 hover:text-muted flex items-center justify-center transition"
          aria-label="Dismiss"
          title="Close"
        >
          ×
        </button>
      )}

      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${dismissible ? "pr-8" : ""}`}>
        <div>
          {isVerified ? (
            <>
              <span className="font-medium">You are marked as Verified</span>
              <span className="ml-2 text-accent">· Comments will show a Verified badge</span>
            </>
          ) : (
            <>
              <span className="font-medium">Basic user</span>
              <span className="ml-2 text-muted">
                · Like/dislike available. Simulate dual-verification to unlock comments.
              </span>
            </>
          )}
        </div>

        <button
          onClick={toggle}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
            isVerified
              ? "bg-surface border border-accent/40 text-accent hover:bg-accent/10"
              : "bg-accent text-bg text-white hover:bg-accent-bright"
          }`}
        >
          {isVerified ? "Remove verification" : "Simulate dual verification"}
        </button>
      </div>

      <p className="mt-2 text-xs opacity-80">
        Temporary mock for MVP. Real dual verification (offline Aadhaar e-KYC) will replace this later.
      </p>
    </div>
  );
}
