/**
 * Simplified ECI-style election symbols (geometry inspired by public ballot symbols).
 * Attribution: shapes based on Election Commission of India party symbols (public ballot marks).
 * Not official trademark artwork — for civic information UI only.
 */

const SIZE = {
  sm: 20,
  md: 28,
  lg: 40,
};

export default function PartySymbol({
  abbr,
  size = "md",
  className = "",
}: {
  abbr: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const px = SIZE[size];
  const common = {
    width: px,
    height: px,
    viewBox: "0 0 48 48",
    className,
    "aria-hidden": true as const,
  };

  switch (abbr) {
    case "BJP":
      // Lotus
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="22" fill="#FFF7ED" />
          <path
            d="M24 10 C20 16 16 20 14 26 C16 24 20 22 24 22 C28 22 32 24 34 26 C32 20 28 16 24 10Z"
            fill="#EA580C"
          />
          <path
            d="M12 28 C14 22 18 18 24 16 C30 18 34 22 36 28 C32 26 28 26 24 28 C20 26 16 26 12 28Z"
            fill="#F97316"
          />
          <path
            d="M18 32 C20 28 22 26 24 26 C26 26 28 28 30 32 C28 34 26 36 24 38 C22 36 20 34 18 32Z"
            fill="#C2410C"
          />
          <circle cx="24" cy="26" r="3" fill="#FDBA74" />
        </svg>
      );

    case "INC":
      // Open palm / hand
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="22" fill="#EFF6FF" />
          <path
            d="M18 38 V22 C18 20 19 19 20 19 C21 19 22 20 22 22 V16 C22 14.5 23 13.5 24 13.5 C25 13.5 26 14.5 26 16 V22 C26 20 27 19 28 19 C29 19 30 20 30 22 V24 C30 22.5 31 21.5 32 21.5 C33 21.5 34 22.5 34 24 V32 C34 36 30 40 24 40 C20 40 18 38 18 38Z"
            fill="#0284C7"
          />
          <path d="M16 28 C14 28 13 29 13 31 V34 C13 36 15 37 17 36" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case "TDP":
      // Bicycle
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="22" fill="#FEFCE8" />
          <circle cx="14" cy="30" r="7" stroke="#CA8A04" strokeWidth="2.5" fill="none" />
          <circle cx="34" cy="30" r="7" stroke="#CA8A04" strokeWidth="2.5" fill="none" />
          <path d="M14 30 L22 18 L30 18 L34 30" stroke="#A16207" strokeWidth="2" fill="none" strokeLinejoin="round" />
          <path d="M22 18 L22 14" stroke="#A16207" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="26" r="2.5" fill="#CA8A04" />
          <path d="M22 18 L24 26 L30 18" stroke="#A16207" strokeWidth="1.5" fill="none" />
        </svg>
      );

    case "YSRCP":
      // Ceiling fan
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="22" fill="#EFF6FF" />
          <circle cx="24" cy="24" r="4" fill="#1D4ED8" />
          <ellipse cx="24" cy="12" rx="5" ry="10" fill="#3B82F6" transform="rotate(0 24 24)" />
          <ellipse cx="24" cy="12" rx="5" ry="10" fill="#2563EB" transform="rotate(120 24 24)" />
          <ellipse cx="24" cy="12" rx="5" ry="10" fill="#1D4ED8" transform="rotate(240 24 24)" />
          <circle cx="24" cy="24" r="2.5" fill="#93C5FD" />
        </svg>
      );

    case "BRS":
      // Car
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="22" fill="#FDF2F8" />
          <path
            d="M10 28 L12 22 C13 19 15 18 18 18 H30 C33 18 35 19 36 22 L38 28 V32 H34 V30 H14 V32 H10 V28Z"
            fill="#DB2777"
          />
          <circle cx="16" cy="32" r="3.5" fill="#9D174D" />
          <circle cx="32" cy="32" r="3.5" fill="#9D174D" />
          <rect x="20" y="20" width="8" height="5" rx="1" fill="#FBCFE8" />
        </svg>
      );

    case "JSP":
      // Star (party emblem style)
      return (
        <svg {...common} fill="none">
          <circle cx="24" cy="24" r="22" fill="#FEF2F2" />
          <path
            d="M24 8 L27.5 18 L38 18 L29.5 24.5 L33 35 L24 29 L15 35 L18.5 24.5 L10 18 L20.5 18 Z"
            fill="#DC2626"
          />
          <circle cx="24" cy="23" r="3" fill="#FECACA" />
        </svg>
      );

    default:
      return null;
  }
}

export const PARTIES_WITH_SYMBOLS = ["BJP", "INC", "TDP", "YSRCP", "BRS", "JSP"];
