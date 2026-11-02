"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import SignInDialog from "./SignInDialog";

export type CommunityUser = {
  id: string;
  displayName: string | null;
  phoneLast4: string;
  tier: "BASIC" | "VERIFIED";
  isAdmin: boolean;
};

type Ctx = {
  mode: "pilot" | "live";
  user: CommunityUser | null;
  loaded: boolean;
  openSignIn: () => void;
  signOut: () => Promise<void>;
  setUser: (u: CommunityUser | null) => void;
};

const CommunityContext = createContext<Ctx | null>(null);

export function CommunityProvider({ mode, children }: { mode: "pilot" | "live"; children: ReactNode }) {
  const [user, setUser] = useState<CommunityUser | null>(null);
  const [loaded, setLoaded] = useState(mode !== "live");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (mode !== "live") return;
    let cancelled = false;
    fetch("/api/me", { credentials: "same-origin" })
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((d) => {
        if (!cancelled) setUser(d.user ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [mode]);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => {});
    setUser(null);
  }, []);

  const value = useMemo<Ctx>(
    () => ({ mode, user, loaded, openSignIn: () => setDialogOpen(true), signOut, setUser }),
    [mode, user, loaded, signOut],
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
      {mode === "live" && dialogOpen && <SignInDialog onClose={() => setDialogOpen(false)} />}
    </CommunityContext.Provider>
  );
}

export function useCommunity(): Ctx {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error("useCommunity must be used inside CommunityProvider");
  return ctx;
}

/** Small helper for JSON POSTs to the community API. */
export async function postJson<T = unknown>(url: string, body: unknown, method = "POST"): Promise<{ ok: boolean; status: number; data: T & { error?: string } }> {
  const res = await fetch(url, {
    method,
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  return { ok: res.ok, status: res.status, data };
}
