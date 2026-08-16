/**
 * Reusable Candidate Avatar
 * Uses initials + consistent color as placeholder.
 * Later we can pass a real photoUrl and it will render the image instead.
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
      <img
        src={photoUrl}
        alt={name}
        className={`${classes} rounded-2xl object-cover ring-2 ring-white/10 shadow-lg`}
      />
    );
  }

  return (
    <div
      className={`${classes} ${getColor(name)} rounded-2xl flex items-center justify-center font-semibold text-white ring-2 ring-white/10 shadow-lg`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
}
