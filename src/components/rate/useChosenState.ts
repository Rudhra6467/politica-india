"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const KEY = "politica-state";

/** The state a citizen cares about, remembered on this device. URL ?state= wins when present. */
export function useChosenState(states: string[]) {
  const params = useSearchParams();
  const fromUrl = params.get("state");
  const [state, setStateRaw] = useState<string>(fromUrl && states.includes(fromUrl) ? fromUrl : states[0]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (fromUrl && states.includes(fromUrl)) {
      setStateRaw(fromUrl);
    } else {
      try {
        const saved = localStorage.getItem(KEY);
        if (saved && states.includes(saved)) setStateRaw(saved);
      } catch {
        // ignore
      }
    }
    setReady(true);
  }, [fromUrl, states]);

  const setState = useCallback((s: string) => {
    setStateRaw(s);
    try {
      localStorage.setItem(KEY, s);
    } catch {
      // ignore
    }
  }, []);

  return { state, setState, ready };
}
