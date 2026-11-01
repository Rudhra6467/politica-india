"use client";

/**
 * Candidate avatar — licensed photo via Next.js image optimisation (CDN-cached,
 * avoids Wikimedia hotlink rate limits), else initials placeholder.
 * Falls back to initials automatically if the remote image fails.
 */

import Image from "next/image";
import { useState } from "react";
import PartySymbol, { PARTIES_WITH_SYMBOLS } from "./PartySymbol";

interface CandidateAvatarProps {
  name: string;
  photoUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl" | "profile";
  /** When set, shows a small party symbol overlay on the photo */
  partyAbbr?: string | null;
  /** Load eagerly (above the fold) */
  priority?: boolean;
}

const PX = { sm: 32, md: 44, lg: 64, xl: 96, profile: 128 } as const;

const SIZE_MAP = {
  sm: "h-8 w-8 text-xs rounded-lg",
  md: "h-11 w-11 text-sm rounded-xl",
  lg: "h-16 w-16 text-xl rounded-2xl",
  xl: "h-24 w-24 text-3xl rounded-2xl",
  profile: "h-24 w-24 sm:h-32 sm:w-32 text-2xl sm:text-3xl rounded-2xl",
};

const OVERLAY_SIZE = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
  profile: "h-7 w-7 sm:h-8 sm:w-8",
};

function getInitials(name: string) {
  return name
    .replace(/\./g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getColor(name: string) {
  const colors = [
    "bg-indigo-600",
    "bg-violet-600",
    "bg-blue-600",
    "bg-cyan-700",
    "bg-teal-600",
    "bg-emerald-600",
    "bg-orange-600",
    "bg-rose-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function CandidateAvatar({
  name,
  photoUrl,
  size = "md",
  partyAbbr,
  priority = false,
}: CandidateAvatarProps) {
  const [failed, setFailed] = useState(false);
  const classes = SIZE_MAP[size];
  const overlayClass = OVERLAY_SIZE[size];
  const showParty = partyAbbr && PARTIES_WITH_SYMBOLS.includes(partyAbbr);
  const px = PX[size];

  const content =
    photoUrl && !failed ? (
      <Image
        src={photoUrl}
        alt={name}
        width={px}
        height={px}
        sizes={`${px}px`}
        quality={82}
        priority={priority}
        onError={() => setFailed(true)}
        className={`${classes} object-cover object-top ring-2 ring-slate-200 shadow-sm bg-slate-100`}
      />
    ) : (
      <div
        className={`${classes} ${getColor(name)} flex items-center justify-center font-semibold text-white ring-2 ring-slate-200 shadow-sm select-none`}
        title={name}
        aria-label={name}
        role="img"
      >
        {getInitials(name)}
      </div>
    );

  if (!showParty) return content;

  return (
    <div className="relative shrink-0 inline-block">
      {content}
      <span
        className={`absolute -bottom-0.5 -right-0.5 ${overlayClass} rounded-md overflow-hidden border-2 border-white bg-white shadow-sm flex items-center justify-center`}
        title={partyAbbr || undefined}
      >
        <PartySymbol abbr={partyAbbr!} size="sm" />
      </span>
    </div>
  );
}
