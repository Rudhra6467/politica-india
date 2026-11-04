"use client";

import { useState, useEffect, useCallback } from "react";
import { useVerification } from "./VerificationBanner";
import { useLocale } from "@/i18n/LocaleProvider";
import { useCommunity, postJson } from "@/components/community/CommunityProvider";

interface LocalComment {
  id: string;
  name: string;
  text: string;
  verified: boolean;
  createdAt: string;
}

type LiveComment = { id: string; body: string; status: "PENDING" | "APPROVED" | "REJECTED"; createdAt: string; author: string; mine: boolean };

function loadComments(promiseId: string): LocalComment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`politica-comments-${promiseId}`);
    if (raw) return JSON.parse(raw) as LocalComment[];
  } catch {
    // ignore
  }
  return [];
}

function saveComments(promiseId: string, comments: LocalComment[]) {
  try {
    localStorage.setItem(`politica-comments-${promiseId}`, JSON.stringify(comments));
  } catch {
    // ignore
  }
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

const inputCls = "w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40";
const postBtn = "rounded-lg bg-accent text-bg px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-bright disabled:opacity-40";

export default function CommentSection({ targetKey }: { targetKey: string }) {
  const { mode } = useCommunity();
  return mode === "live" ? <LiveComments targetKey={targetKey} /> : <PilotComments promiseId={targetKey.split(":")[1]} />;
}

function LiveComments({ targetKey }: { targetKey: string }) {
  const { t } = useLocale();
  const { user, openSignIn } = useCommunity();
  const [comments, setComments] = useState<LiveComment[] | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [reported, setReported] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    const res = await fetch(`/api/comments?key=${encodeURIComponent(targetKey)}`, { credentials: "same-origin" });
    if (res.ok) setComments(((await res.json()) as { comments: LiveComment[] }).comments);
    else setComments([]);
  }, [targetKey]);

  useEffect(() => {
    load();
  }, [load, user?.id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return openSignIn();
    setBusy(true);
    setErr(null);
    const r = await postJson<{ comment: LiveComment }>("/api/comments", { targetKey, body: text });
    setBusy(false);
    if (!r.ok) {
      setErr(r.data.error === "rate_limited" ? t.auth.errRateLimited : t.auth.errGeneric);
      if (r.status === 401) openSignIn();
      return;
    }
    setComments((c) => [r.data.comment, ...(c ?? [])]);
    setText("");
  };

  const report = async (id: string) => {
    const reason = "other";
    const r = await postJson(`/api/comments/${id}/report`, { reason });
    if (r.ok) setReported((s) => new Set(s).add(id));
  };

  return (
    <div className="space-y-3">
      {comments === null ? (
        <p className="text-xs text-muted">…</p>
      ) : comments.length > 0 ? (
        <ul className="space-y-2">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border border-line/60 bg-surface-2 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-ink">{c.author}</span>
                {c.status === "PENDING" && <span className="rounded bg-amber-500/25 px-1.5 py-0.5 text-[10px] font-medium text-amber-300">{t.auth.pendingReview}</span>}
                <span className="ml-auto text-[10px] text-muted">{fmtDate(c.createdAt)}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{c.body}</p>
              {!c.mine && c.status === "APPROVED" && (
                <button type="button" onClick={() => report(c.id)} disabled={reported.has(c.id)} className="mt-1 text-[11px] text-muted hover:text-rose-300 disabled:text-emerald-300">
                  {reported.has(c.id) ? t.auth.reported : t.auth.report}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      <form onSubmit={submit} className="space-y-2">
        <textarea
          placeholder={user ? t.comments.placeholder : t.auth.needSignInComment}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => !user && openSignIn()}
          rows={2}
          maxLength={600}
          className={inputCls}
        />
        {err && <p className="text-xs text-rose-400">{err}</p>}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] text-muted">{t.auth.moderationNote}</span>
          <button type="submit" disabled={busy || text.trim().length < 5} className={postBtn}>
            {t.comments.post}
          </button>
        </div>
      </form>
    </div>
  );
}

function PilotComments({ promiseId }: { promiseId: string }) {
  const { t } = useLocale();
  const { isVerified, hydrated, toggle } = useVerification();
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    setComments(loadComments(promiseId));
  }, [promiseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;
    const next = [{ id: `${Date.now()}`, name: name.trim(), text: text.trim(), verified: isVerified, createdAt: new Date().toISOString() }, ...comments];
    setComments(next);
    saveComments(promiseId, next);
    setText("");
  };

  if (!hydrated) return null;

  return (
    <div className="space-y-3">
      {comments.length > 0 && (
        <ul className="space-y-2">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border border-line/60 bg-surface-2 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-ink">{c.name}</span>
                {c.verified && <span className="rounded bg-emerald-500/25 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300">{t.comments.verified}</span>}
                <span className="ml-auto text-[10px] text-muted">{fmtDate(c.createdAt)}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{c.text}</p>
            </li>
          ))}
        </ul>
      )}

      {!isVerified ? (
        <div className="rounded-lg border border-dashed border-line bg-surface px-3 py-2.5 text-xs text-muted">
          <p>{t.comments.reserved}</p>
          <button type="button" onClick={toggle} className="mt-2 rounded-lg bg-accent text-bg px-3 py-1.5 text-xs font-medium text-white transition hover:bg-accent-bright">
            {t.comments.simulate}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px] text-muted">
            <span>
              {t.comments.postingAs} <span className="font-medium text-emerald-300">{t.comments.verified}</span> {t.comments.pilotMock}
            </span>
            <button type="button" onClick={toggle} className="text-muted hover:text-muted">
              {t.comments.remove}
            </button>
          </div>
          <input type="text" placeholder={t.comments.displayName} value={name} onChange={(e) => setName(e.target.value)} maxLength={40} className={inputCls} />
          <textarea placeholder={t.comments.placeholder} value={text} onChange={(e) => setText(e.target.value)} rows={2} maxLength={600} className={inputCls} />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted">{t.comments.storedLocally}</span>
            <button type="submit" disabled={!text.trim() || !name.trim()} className={postBtn}>
              {t.comments.post}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
