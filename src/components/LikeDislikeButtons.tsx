"use client";

import { useState, useEffect } from "react";

interface LikeDislikeButtonsProps {
  id: string;
  initialLikes: number;
  initialDislikes: number;
  size?: "sm" | "md";
  dark?: boolean;
  /** Show pilot-only label under counts */
  showPilotLabel?: boolean;
}

type StoredVote = {
  likes: number;
  dislikes: number;
  userVote: "like" | "dislike" | null;
};

function loadVote(id: string, initialLikes: number, initialDislikes: number): StoredVote {
  if (typeof window === "undefined") {
    return { likes: initialLikes, dislikes: initialDislikes, userVote: null };
  }
  try {
    const raw = localStorage.getItem(`politica-vote-${id}`);
    if (raw) return JSON.parse(raw) as StoredVote;
  } catch {
    // ignore
  }
  return { likes: initialLikes, dislikes: initialDislikes, userVote: null };
}

function saveVote(id: string, data: StoredVote) {
  try {
    localStorage.setItem(`politica-vote-${id}`, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export default function LikeDislikeButtons({
  id,
  initialLikes,
  initialDislikes,
  size = "md",
  dark = false,
  showPilotLabel = true,
}: LikeDislikeButtonsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadVote(id, initialLikes, initialDislikes);
    setLikes(stored.likes);
    setDislikes(stored.dislikes);
    setUserVote(stored.userVote);
    setHydrated(true);
  }, [id, initialLikes, initialDislikes]);

  const persist = (nextLikes: number, nextDislikes: number, nextVote: "like" | "dislike" | null) => {
    setLikes(nextLikes);
    setDislikes(nextDislikes);
    setUserVote(nextVote);
    saveVote(id, { likes: nextLikes, dislikes: nextDislikes, userVote: nextVote });
  };

  const handleLike = () => {
    if (userVote === "like") {
      persist(likes - 1, dislikes, null);
    } else {
      const newDislikes = userVote === "dislike" ? dislikes - 1 : dislikes;
      persist(likes + 1, newDislikes, "like");
    }
  };

  const handleDislike = () => {
    if (userVote === "dislike") {
      persist(likes, dislikes - 1, null);
    } else {
      const newLikes = userVote === "like" ? likes - 1 : likes;
      persist(newLikes, dislikes + 1, "dislike");
    }
  };

  const btnBase =
    size === "sm"
      ? "flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-sm transition"
      : "flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm transition";

  const label = showPilotLabel ? (
    <p className="text-[10px] text-slate-400 mt-1 leading-tight">
      Pilot engagement (illustrative) · not live citizen votes
    </p>
  ) : null;

  if (!hydrated) {
    return (
      <div>
        <div className="flex items-center gap-2.5 opacity-50">
          <div className={btnBase}>
            <span>👍</span>
            <span className="font-medium">{initialLikes.toLocaleString()}</span>
          </div>
          <div className={btnBase}>
            <span>👎</span>
            <span className="font-medium">{initialDislikes.toLocaleString()}</span>
          </div>
        </div>
        {label}
      </div>
    );
  }

  if (dark) {
    return (
      <div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleLike}
            className={`${btnBase} ${
              userVote === "like"
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                : "border-white/10 text-zinc-400 hover:bg-white/5 hover:border-white/20 hover:text-zinc-200"
            }`}
            title="Like"
          >
            <span>👍</span>
            <span className="font-medium">{likes.toLocaleString()}</span>
          </button>
          <button
            onClick={handleDislike}
            className={`${btnBase} ${
              userVote === "dislike"
                ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                : "border-white/10 text-zinc-400 hover:bg-white/5 hover:border-white/20 hover:text-zinc-200"
            }`}
            title="Dislike"
          >
            <span>👎</span>
            <span className="font-medium">{dislikes.toLocaleString()}</span>
          </button>
        </div>
        {label}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleLike}
          className={`${btnBase} ${
            userVote === "like"
              ? "bg-emerald-50 border-emerald-400 text-emerald-700"
              : "border-slate-200 hover:bg-emerald-50 hover:border-emerald-300"
          }`}
          title="Like"
        >
          <span>👍</span>
          <span className="font-medium">{likes.toLocaleString()}</span>
        </button>
        <button
          onClick={handleDislike}
          className={`${btnBase} ${
            userVote === "dislike"
              ? "bg-rose-50 border-rose-400 text-rose-700"
              : "border-slate-200 hover:bg-rose-50 hover:border-rose-300"
          }`}
          title="Dislike"
        >
          <span>👎</span>
          <span className="font-medium">{dislikes.toLocaleString()}</span>
        </button>
      </div>
      {label}
    </div>
  );
}
