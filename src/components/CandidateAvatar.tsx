/**
 * Candidate avatar — real photo when photoUrl is set (public/licensed),
 * else initials placeholder. White theme: soft slate ring.
 * Optional partyAbbr shows a small ECI-style symbol at bottom-right of the photo.
 */

import PartySymbol, { PARTIES_WITH_SYMBOLS } from "./PartySymbol";

interface CandidateAvatarProps {
  name: string;
  photoUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl" | "profile";
  /** When set, shows a small party symbol overlay on the photo */
  partyAbbr?: string | null;
}

const SIZE_MAP = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-xl",
  xl: "h-24 w-24 text-3xl",
  /* Profile hero: fills the identity block (matches user-marked box) */
  profile: "h-24 w-24 sm:h-28 sm:w-28 text-2xl",
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
    .split(" ")
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
    "bg-cyan-600",
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
}: CandidateAvatarProps) {
  const classes = SIZE_MAP[size];
  const overlayClass = OVERLAY_SIZE[size];
  const showParty =
    partyAbbr && PARTIES_WITH_SYMBOLS.includes(partyAbbr);

  const content = photoUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoUrl}
      alt={name}
      className={`${classes} rounded-2xl object-cover ring-2 ring-slate-200 shadow-sm bg-slate-100`}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  ) : (
    <div
      className={`${classes} ${getColor(name)} rounded-2xl flex items-center justify-center font-semibold text-white ring-2 ring-slate-200 shadow-sm`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );

  if (!showParty) {
    return content;
  }

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
