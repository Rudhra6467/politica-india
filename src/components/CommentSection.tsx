"use client";

import { useState, useEffect } from "react";

interface Comment {
  id: string;
  name: string;
  text: string;
  verified: boolean;
  createdAt: string;
}

interface CommentSectionProps {
  promiseId: string;
  dark?: boolean;
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

function isVerified(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("politica-verified") === "true";
}

export default function CommentSection({ promiseId, dark = false }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [verified, setVerified] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setComments(loadComments(promiseId));
    setVerified(isVerified());
    setHydrated(true);
  }, [promiseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;

    const newComment: Comment = {
      id: `${Date.now()}`,
      name: name.trim(),
      text: text.trim(),
      verified,
      createdAt: new Date().toISOString(),
    };

    const next = [newComment, ...comments];
    setComments(next);
    saveComments(promiseId, next);
    setText("");
  };

  if (!hydrated) return null;

  if (dark) {
    return (
      <div className="space-y-4">
        {comments.length > 0 && (
          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="rounded-xl bg-zinc-950/50 border border-white/5 px-3.5 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-300">{c.name}</span>
                  {c.verified && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Verified
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            type="text"
            placeholder="Display name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
          />
          <textarea
            placeholder={verified ? "Write a comment…" : "Comments require dual verification (mock toggle available on page)"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            disabled={!verified}
            className="w-full rounded-xl border border-white/10 bg-zinc-950/60 px-3.5 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!verified || !text.trim() || !name.trim()}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2 text-sm font-medium text-white transition"
          >
            Post comment
          </button>
        </form>
      </div>
    );
  }

  // Light mode (default)
  return (
    <div className="space-y-3">
      {comments.length > 0 && (
        <div className="space-y-2">
          {comments.map((c) => (
            <div key={c.id} className="rounded-lg bg-slate-50 border px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-800">{c.name}</span>
                {c.verified && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                    Verified
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-slate-600">{c.text}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Display name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          placeholder={verified ? "Write a comment…" : "Comments require dual verification"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          disabled={!verified}
          className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!verified || !text.trim() || !name.trim()}
          className="rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 px-4 py-2 text-sm font-medium text-white"
        >
          Post comment
        </button>
      </form>
    </div>
  );
}
