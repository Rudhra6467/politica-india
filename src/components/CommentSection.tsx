"use client";

import { useState, useEffect } from "react";
import { useVerification } from "./VerificationBanner";
import { useLocale } from "@/i18n/LocaleProvider";

interface Comment {
  id: string;
  name: string;
  text: string;
  verified: boolean;
  createdAt: string;
}

function loadComments(promiseId: string): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`politica-comments-${promiseId}`);
    if (raw) return JSON.parse(raw) as Comment[];
  } catch {
    // ignore
  }
  return [];
}

function saveComments(promiseId: string, comments: Comment[]) {
  try {
    localStorage.setItem(`politica-comments-${promiseId}`, JSON.stringify(comments));
  } catch {
    // ignore
  }
}

export default function CommentSection({ promiseId }: { promiseId: string }) {
  const { t } = useLocale();
  const { isVerified, hydrated, toggle } = useVerification();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    setComments(loadComments(promiseId));
  }, [promiseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;
    const next = [
      { id: `${Date.now()}`, name: name.trim(), text: text.trim(), verified: isVerified, createdAt: new Date().toISOString() },
      ...comments,
    ];
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
            <li key={c.id} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-800">{c.name}</span>
                {c.verified && (
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                    {t.comments.verified}
                  </span>
                )}
                <span className="ml-auto text-[10px] text-slate-400">
                  {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-slate-600">{c.text}</p>
            </li>
          ))}
        </ul>
      )}

      {!isVerified ? (
        <div className="rounded-lg border border-dashed border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-500">
          <p>{t.comments.reserved}</p>
          <button
            type="button"
            onClick={toggle}
            className="mt-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700"
          >
            {t.comments.simulate}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>
              {t.comments.postingAs} <span className="font-medium text-emerald-700">{t.comments.verified}</span> {t.comments.pilotMock}
            </span>
            <button type="button" onClick={toggle} className="text-slate-400 hover:text-slate-600">
              {t.comments.remove}
            </button>
          </div>
          <input
            type="text"
            placeholder={t.comments.displayName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <textarea
            placeholder={t.comments.placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            maxLength={600}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400">{t.comments.storedLocally}</span>
            <button
              type="submit"
              disabled={!text.trim() || !name.trim()}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-40"
            >
              {t.comments.post}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
