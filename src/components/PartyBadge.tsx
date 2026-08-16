/**
 * Reusable Party Badge
 * Shows ECI-style election symbol when available; falls back to colour abbr.
 * Attribution: symbol geometry based on Election Commission of India ballot marks.
 */

import PartySymbol, { PARTIES_WITH_SYMBOLS } from "./PartySymbol";

const PARTY_COLORS: Record<string, string> = {
  BJP: "bg-orange-500 text-white",
  INC: "bg-sky-600 text-white",
  TDP: "bg-yellow-500 text-black",
  YSRCP: "bg-blue-700 text-white",
  JSP: "bg-red-600 text-white",
  DMK: "bg-black text-white",
  AIADMK: "bg-orange-600 text-white",
  "JD(S)": "bg-green-700 text-white",
  BRS: "bg-pink-600 text-white",
  AITC: "bg-emerald-600 text-white",
  SP: "bg-red-600 text-white",
  AAP: "bg-blue-500 text-white",
};

const DEFAULT_COLOR = "bg-slate-600 text-white";

interface PartyBadgeProps {
  abbr: string;
  name?: string;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  /** Prefer symbol image/SVG over letter badge */
  preferSymbol?: boolean;
}

export default function PartyBadge({
  abbr,
  name,
  size = "md",
  showName = false,
  preferSymbol = true,
}: PartyBadgeProps) {
  const color = PARTY_COLORS[abbr] || DEFAULT_COLOR;
  const hasSymbol = preferSymbol && PARTIES_WITH_SYMBOLS.includes(abbr);

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-2.5 py-1",
  };

  const boxSize = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-11 w-11",
  };

  return (
    <span className="inline-flex items-center gap-1.5">
      {hasSymbol ? (
        <span
          className={`inline-flex items-center justify-center rounded-lg overflow-hidden border border-slate-100 bg-white shadow-sm ${boxSize[size]}`}
          title={name || abbr}
        >
          <PartySymbol abbr={abbr} size={size} />
        </span>
      ) : (
        <span
          className={`inline-flex items-center justify-center rounded font-bold tracking-wide ${color} ${sizeClasses[size]}`}
          title={name || abbr}
        >
          {abbr}
        </span>
      )}
      {showName && name && (
        <span className="text-sm text-slate-600">{name}</span>
      )}
    </span>
  );
}
