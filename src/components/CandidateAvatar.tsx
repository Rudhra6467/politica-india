/**
 * Candidate avatar — real photo when photoUrl is set (public/licensed),
 * else initials placeholder. White theme: soft slate ring.
 */

interface CandidateAvatarProps {
  name: string;
  photoUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
}

const SIZE_MAP = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-xl",
  xl: "h-24 w-24 text-3xl",
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
}: CandidateAvatarProps) {
  const classes = SIZE_MAP[size];

  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={name}
        className={`${classes} rounded-2xl object-cover ring-2 ring-slate-200 shadow-sm bg-slate-100`}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div
      className={`${classes} ${getColor(name)} rounded-2xl flex items-center justify-center font-semibold text-white ring-2 ring-slate-200 shadow-sm`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}
