"use client";

import { useState, useEffect } from "react";

interface LikeDislikeButtonsProps {
  id: string;
  initialLikes: number;
  initialDislikes: number;
  size?: "sm" | "md";
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

function ThumbIcon({ down = false }: { down?: boolean }) {
  return (
    <svg
      className={"h-4 w-4 " + (down ? "rotate-180" : "")}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 11v9H4a1 1 0 01-1-1v-7a1 1 0 011-1h3zm0 0l3.5-7.5A2 2 0 0112.3 2h.2a2 2 0 012 2v5h4.6a2 2 0 012 2.3l-1.1 7a2 2 0 01-2 1.7H7"
      />
    </svg>
  );
}

export default function LikeDislikeButtons({
  id,
  initialLikes,
  initialDislikes,
  size = "md",
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
    if (userVote === "like") persist(likes - 1, dislikes, null);
    else persist(likes + 1, userVote === "dislike" ? dislikes - 1 : dislikes, "like");
  };

  const handleDislike = () => {
    if (userVote === "dislike") persist(likes, dislikes - 1, null);
    else persist(userVote === "like" ? likes - 1 : likes, dislikes + 1, "dislike");
  };

  const btnBase =
    "inline-flex items-center gap-1.5 rounded-lg border font-medium tabular transition disabled:cursor-default " +
    (size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm");

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleLike}
          disabled={!hydrated}
          aria-pressed={userVote === "like"}
          className={
            btnBase +
            " " +
            (userVote === "like"
              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700")
          }
          title="Like"
        >
          <ThumbIcon />
          {likes.toLocaleString("en-IN")}
        </button>
        <button
          type="button"
          onClick={handleDislike}
          disabled={!hydrated}
          aria-pressed={userVote === "dislike"}
          className={
            btnBase +
            " " +
            (userVote === "dislike"
              ? "border-rose-400 bg-rose-50 text-rose-700"
              : "border-slate-200 bg-white text-slate-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700")
          }
          title="Dislike"
        >
          <ThumbIcon down />
          {dislikes.toLocaleString("en-IN")}
        </button>
      </div>
      {showPilotLabel && (
        <p className="mt-1 text-[10px] leading-tight text-slate-400">
          Pilot engagement (illustrative) · not live citizen votes
        </p>
      )}
    </div>
  );
}
