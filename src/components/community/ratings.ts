"use client";

/** Batched rating summaries, same pattern as reactions.ts: one request per page tick. */
export type RatingSummary = { count: number; avg: number | null; dist: number[] | null; mine: number };

type Listener = (r: RatingSummary) => void;
const cache = new Map<string, RatingSummary>();
const listeners = new Map<string, Set<Listener>>();
let pending = new Set<string>();
let scheduled = false;

async function flush() {
  scheduled = false;
  const keys = Array.from(pending);
  pending = new Set();
  if (keys.length === 0) return;
  for (let i = 0; i < keys.length; i += 60) {
    const chunk = keys.slice(i, i + 60);
    try {
      const res = await fetch(`/api/ratings?keys=${encodeURIComponent(chunk.join(","))}`, { credentials: "same-origin" });
      if (!res.ok) continue;
      const data = (await res.json()) as { ratings: Record<string, RatingSummary> };
      for (const [k, r] of Object.entries(data.ratings)) publish(k, r);
    } catch {
      // keep cached values
    }
  }
}

export function publish(key: string, r: RatingSummary) {
  cache.set(key, r);
  listeners.get(key)?.forEach((l) => l(r));
}

export function subscribe(key: string, l: Listener): () => void {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(l);
  const cached = cache.get(key);
  if (cached) l(cached);
  else {
    pending.add(key);
    if (!scheduled) {
      scheduled = true;
      setTimeout(flush, 0);
    }
  }
  return () => listeners.get(key)?.delete(l);
}

export function invalidateAll() {
  const keys = Array.from(listeners.keys());
  cache.clear();
  for (const k of keys) pending.add(k);
  if (keys.length && !scheduled) {
    scheduled = true;
    setTimeout(flush, 0);
  }
}
