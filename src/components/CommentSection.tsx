"use client";

import { useState, useEffect } from "react";
import { useVerification } from "./VerificationBanner";

interface Comment {
  id: string;
  name: string;
  text: string;
  createdAt: string;
  isVerified: boolean;
}

interface CommentSectionProps {
  promiseId: string;
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

export default function CommentSection({ promiseId }: CommentSectionProps) {
  const { isVerified } = useVerification();
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setComments(loadComments(promiseId));
    setHydrated(true);
  }, [promiseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
      isVerified: isVerified,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    saveComments(promiseId, updated);
    setText("");
    setShowForm(false);
  };

  if (!hydrated) {
    return (
      <div className="mt-4 pt-4 border-t text-sm text-slate-400">
        Loading comments...
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-slate-700">
          Comments ({comments.length})
        </h4>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            + Add comment
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 space-y-3 rounded-xl bg-slate-50 p-4">
          {!isVerified && (
            <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              You are currently a <strong>basic user</strong>. Toggle “Simulate dual verification” at the top of the page to post as a verified user and receive the Verified badge.
            </div>
          )}

          {isVerified && (
            <div className="text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2">
              Posting as <strong>Verified</strong> user. Your comment will show a Verified badge.
            </div>
          )}

          <input
            type="text"
            placeholder="Your display name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />

          <textarea
            placeholder="Write a factual comment about this promise..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            maxLength={500}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            required
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Post comment
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Comment list */}
      {comments.length === 0 ? (
        <p className="text-sm text-slate-400">No comments yet. Be the first.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="rounded-lg bg-slate-50 px-3 py-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="font-medium text-slate-700">{c.name}</span>
                {c.isVerified && (
                  <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-medium text-indigo-700">
                    Verified
                  </span>
                )}
                <span>·</span>
                <span>{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-slate-800 whitespace-pre-wrap">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
