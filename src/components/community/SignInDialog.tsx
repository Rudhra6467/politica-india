"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { postJson, useCommunity, type CommunityUser } from "./CommunityProvider";

type Step = "phone" | "code" | "name";

export default function SignInDialog({ onClose }: { onClose: () => void }) {
  const { t, href } = useLocale();
  const { setUser } = useCommunity();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInput.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  const mapError = (code?: string) => {
    switch (code) {
      case "invalid_phone":
        return t.auth.errInvalidPhone;
      case "rate_limited":
      case "too_many_attempts":
        return t.auth.errRateLimited;
      case "invalid":
        return t.auth.errInvalidCode;
      case "expired":
        return t.auth.errExpired;
      case "banned":
        return t.auth.banned;
      default:
        return t.auth.errGeneric;
    }
  };

  const sendCode = async () => {
    setBusy(true);
    setErr(null);
    const r = await postJson<{ devCode?: string }>("/api/auth/otp/request", { phone, consent: true });
    setBusy(false);
    if (!r.ok) return setErr(mapError(r.data.error));
    setDevCode(r.data.devCode);
    setStep("code");
  };

  const verify = async () => {
    setBusy(true);
    setErr(null);
    const r = await postJson<{ user: CommunityUser }>("/api/auth/otp/verify", { phone, code });
    setBusy(false);
    if (!r.ok) return setErr(mapError(r.data.error));
    setUser(r.data.user);
    if (r.data.user.displayName) onClose();
    else setStep("name");
  };

  const saveName = async () => {
    if (!name.trim()) return onClose();
    setBusy(true);
    const r = await postJson<{ user: CommunityUser }>("/api/me", { displayName: name.trim() }, "PATCH");
    setBusy(false);
    if (r.ok) setUser(r.data.user);
    onClose();
  };

  const input =
    "w-full rounded-xl border border-line px-3 py-2.5 text-base text-ink shadow-sm focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/40";
  const primary =
    "w-full rounded-xl bg-accent text-bg px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-bright disabled:opacity-50";

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="signin-title">
      <div className="w-full max-w-md rounded-t-3xl bg-surface p-5 shadow-lift sm:rounded-3xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 id="signin-title" className="text-lg font-bold tracking-tight text-ink">
            {step === "name" ? t.auth.nameTitle : t.auth.title}
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg px-2 py-1 text-muted hover:bg-surface-2">
            ×
          </button>
        </div>

        {step === "phone" && (
          <form
            className="mt-3 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (consent) sendCode();
            }}
          >
            <p className="text-sm leading-relaxed text-muted">{t.auth.intro}</p>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-ink/85">{t.auth.phoneLabel}</span>
              <div className="flex items-stretch gap-2">
                <span className="inline-flex items-center rounded-xl border border-line bg-surface-2 px-3 text-sm text-muted">+91</span>
                <input ref={firstInput} className={input} inputMode="numeric" autoComplete="tel-national" placeholder={t.auth.phonePlaceholder} value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))} />
              </div>
            </label>
            <label className="flex items-start gap-2 text-xs text-muted">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
              <span>
                {t.auth.consent}{" "}
                <Link href={href("/privacy")} className="text-accent underline" target="_blank">
                  {t.legal.privacy}
                </Link>{" "}
                ·{" "}
                <Link href={href("/terms")} className="text-accent underline" target="_blank">
                  {t.legal.terms}
                </Link>
              </span>
            </label>
            {err && <p className="text-sm text-rose-400">{err}</p>}
            <button type="submit" disabled={busy || !consent || phone.length !== 10} className={primary}>
              {t.auth.sendCode}
            </button>
          </form>
        )}

        {step === "code" && (
          <form
            className="mt-3 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              verify();
            }}
          >
            <p className="text-sm text-muted">
              {t.auth.codeSentTo} <span className="font-medium text-ink">+91 {phone}</span>
            </p>
            {devCode && (
              <p className="rounded-lg border border-amber-500/35 bg-amber-500/15 px-3 py-2 text-xs text-amber-300">
                {t.auth.devCode} <b className="tabular">{devCode}</b>
              </p>
            )}
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-ink/85">{t.auth.codeLabel}</span>
              <input ref={firstInput} className={input + " tracking-[0.3em]"} inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/[^\d]/g, "").slice(0, 6))} />
            </label>
            {err && <p className="text-sm text-rose-400">{err}</p>}
            <button type="submit" disabled={busy || code.length !== 6} className={primary}>
              {t.auth.verify}
            </button>
            <div className="flex justify-between text-xs">
              <button type="button" onClick={() => setStep("phone")} className="text-muted hover:text-ink">
                {t.auth.change}
              </button>
              <button type="button" onClick={sendCode} disabled={busy} className="text-accent hover:text-accent-bright">
                {t.auth.resend}
              </button>
            </div>
          </form>
        )}

        {step === "name" && (
          <form
            className="mt-3 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              saveName();
            }}
          >
            <p className="text-sm leading-relaxed text-muted">{t.auth.nameHint}</p>
            <input ref={firstInput} className={input} maxLength={40} value={name} onChange={(e) => setName(e.target.value)} placeholder={t.comments.displayName} />
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-ink/85 hover:bg-surface-2">
                {t.auth.skip}
              </button>
              <button type="submit" disabled={busy} className={primary + " flex-1"}>
                {t.auth.nameSave}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
