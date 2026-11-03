"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCommunity, postJson } from "@/components/community/CommunityProvider";
import { subscribe, publish, invalidateAll, type RatingSummary } from "@/components/community/ratings";

const EMPTY: RatingSummary = { count: 0, avg: null, dist: null, mine: 0 };

function loadLocal(key: string): number {
  try {
    const v = Number(localStorage.getItem(`politica-stars-${key}`));
    return v >= 1 && v <= 5 ? v : 0;
  } catch {
    return 0;
  }
}

/**
 * One hook behind every star row and verdict button.
 * Pilot mode: the rating lives in this browser only. Live mode: server-backed, batched reads.
 * If the person taps before signing in, the tap is remembered and applied right after sign-in.
 */
export function useRating(targetKey: string) {
  const { mode, user, openSignIn } = useCommunity();
  const live = mode === "live";
  const [summary, setSummary] = useState<RatingSummary>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [busy, setBusy] = useState(false);
  const pendingRef = useRef<number | null>(null);

  useEffect(() => {
    if (live) return;
    setSummary({ ...EMPTY, mine: loadLocal(targetKey) });
    setHydrated(true);
  }, [live, targetKey]);

  useEffect(() => {
    if (!live) return;
    const unsub = subscribe(targetKey, (r) => {
      setSummary(r);
      setHydrated(true);
    });
    return unsub;
  }, [live, targetKey]);

  useEffect(() => {
    if (live) invalidateAll();
  }, [live, user?.id]);

  const submit = useCallback(
    async (stars: number) => {
      if (!live) {
        try {
          if (stars === 0) localStorage.removeItem(`politica-stars-${targetKey}`);
          else localStorage.setItem(`politica-stars-${targetKey}`, String(stars));
        } catch {
          // ignore
        }
        setSummary((s) => ({ ...s, mine: stars }));
        return;
      }
      if (!user) {
        pendingRef.current = stars;
        openSignIn();
        return;
      }
      setBusy(true);
      setSummary((s) => ({ ...s, mine: stars })); // optimistic
      const r = await postJson<{ rating: RatingSummary }>("/api/rate", { targetKey, stars });
      setBusy(false);
      if (r.ok) publish(targetKey, r.data.rating);
      else if (r.status === 401) openSignIn();
    },
    [live, user, targetKey, openSignIn],
  );

  // Apply the tap that triggered sign-in, once the user exists.
  useEffect(() => {
    if (user && pendingRef.current != null) {
      const stars = pendingRef.current;
      pendingRef.current = null;
      void submit(stars);
    }
  }, [user, submit]);

  return { live, summary, hydrated, busy, submit, signedIn: Boolean(user) };
}
