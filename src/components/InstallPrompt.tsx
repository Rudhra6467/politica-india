"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "politica-install-dismissed";

/** One-line "Add to home screen" card once the browser reports the app is installable. */
export default function InstallPrompt() {
  const { t } = useLocale();
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "true") return;
    } catch {
      // ignore
    }
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!visible || !deferred) return null;

  const install = async () => {
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setVisible(false);
  };

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // ignore
    }
  };

  return (
    <div role="region" aria-label={t.install.install} className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-accent/10 px-4 py-3 text-sm text-accent shadow-card">
      <span className="flex-1">{t.install.text}</span>
      <button type="button" onClick={install} className="shrink-0 rounded-lg bg-accent text-bg px-3 py-1.5 text-xs font-medium text-white transition hover:bg-accent-bright">
        {t.install.install}
      </button>
      <button type="button" onClick={dismiss} aria-label={t.install.dismiss} className="shrink-0 rounded-lg px-2 py-1 text-xs text-accent hover:bg-indigo-100">
        ×
      </button>
    </div>
  );
}
