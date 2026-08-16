"use client";

import { useState } from "react";

interface LikeDislikeButtonsProps {
  initialLikes: number;
  initialDislikes: number;
  size?: "sm" | "md";
}

export default function LikeDislikeButtons({
  initialLikes,
  initialDislikes,
  size = "md",
}: LikeDislikeButtonsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => {
    if (userVote === "like") {
      // Undo like
      setLikes((v) => v - 1);
      setUserVote(null);
    } else {
      if (userVote === "dislike") {
        setDislikes((v) => v - 1);
      }
      setLikes((v) => v + 1);
      setUserVote("like");
    }
  };

  const handleDislike = () => {
    if (userVote === "dislike") {
      // Undo dislike
      setDislikes((v) => v - 1);
      setUserVote(null);
    } else {
      if (userVote === "like") {
        setLikes((v) => v - 1);
      }
      setDislikes((v) => v + 1);
      setUserVote("dislike");
    }
  };

  const btnBase =
    size === "sm"
      ? "flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm transition"
      : "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition";

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleLike}
        className={`${btnBase} ${
          userVote === "like"
            ? "bg-emerald-50 border-emerald-400 text-emerald-700"
            : "hover:bg-emerald-50 hover:border-emerald-300"
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
            : "hover:bg-rose-50 hover:border-rose-300"
        }`}
        title="Dislike"
      >
        <span>👎</span>
        <span className="font-medium">{dislikes.toLocaleString()}</span>
      </button>
    </div>
  );
}
