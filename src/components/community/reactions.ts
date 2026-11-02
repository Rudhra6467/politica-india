"use client";

/**
 * Batched reaction counts: components register target keys; one request per
 * animation frame fetches all of them. Keeps a profile page at one round trip.
 */
export type Reaction = { up: number; down: number; mine: 1 | -1 | 0 };

type Listener = (r: Reaction) => void;

const cache = new Map<string, Reaction>();
const listeners = new Map<string, Set<Listener>>();
let pending = new Set<string>();
let scheduled = false;

async function flush() {
  scheduled = false;
  const keys = Array.from(pending);
  pending = new Set();
  if (keys.length === 0) return;
  try {
    const res = await fetch(`/api/reactions?keys=${encodeURIComponent(keys.join(","))}`, { credentials: "same-origin" });
    if (!res.ok) return;
    const data = (await res.json()) as { reactions: Record<string, Reaction> };
    for (const [k, r] of Object.entries(data.reactions)) publish(k, r);
  } catch {
    // leave cached values in place
  }
}

export function publish(key: string, r: Reaction) {
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

/** Drop cached values (e.g. after sign-in/out) so "mine" is refetched. */
export function invalidateAll() {
  const keys = Array.from(listeners.keys());
  cache.clear();
  for (const k of keys) pending.add(k);
  if (keys.length && !scheduled) {
    scheduled = true;
    setTimeout(flush, 0);
  }
}
