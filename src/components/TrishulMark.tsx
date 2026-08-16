/** Small matte Trishul mark — Sindoor edge + black body */
export default function TrishulMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer prongs — muted Sindoor edge */}
      <path
        d="M8 28 C6 18 4 12 8 4 C10 10 12 18 14 26 C12 28 10 28 8 28Z"
        fill="#9F1239"
        opacity="0.85"
      />
      <path
        d="M32 28 C34 18 36 12 32 4 C30 10 28 18 26 26 C28 28 30 28 32 28Z"
        fill="#9F1239"
        opacity="0.85"
      />
      {/* Main black body */}
      <path
        d="M20 2 L22.5 22 C24 24 26 25 28 26 L30 28 C28 30 24 31 20 32 C16 31 12 30 10 28 L12 26 C14 25 16 24 17.5 22 L20 2Z"
        fill="#1a1a1a"
      />
      {/* Center spike tip — soft red */}
      <path d="M20 2 L21.2 14 L18.8 14 Z" fill="#9F1239" opacity="0.7" />
      {/* Neck */}
      <path
        d="M16 32 C17 33 19 34 20 34 C21 34 23 33 24 32 L24 36 C23 37 21 38 20 38 C19 38 17 37 16 36 Z"
        fill="#1a1a1a"
      />
      {/* Shaft */}
      <rect x="18.5" y="36" width="3" height="24" rx="1" fill="#1a1a1a" />
      {/* Point */}
      <path d="M18.5 60 L20 64 L21.5 60 Z" fill="#1a1a1a" />
      {/* Side prongs black overlay for depth */}
      <path
        d="M10 28 C9 22 8 14 10 6 C11 12 12.5 20 13.5 26 C12 27.5 11 28 10 28Z"
        fill="#1a1a1a"
      />
      <path
        d="M30 28 C31 22 32 14 30 6 C29 12 27.5 20 26.5 26 C28 27.5 29 28 30 28Z"
        fill="#1a1a1a"
      />
      {/* Soft Sindoor rim on side curves */}
      <path
        d="M10 8 C9 14 9.5 22 11 28"
        stroke="#9F1239"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
      <path
        d="M30 8 C31 14 30.5 22 29 28"
        stroke="#9F1239"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
        fill="none"
      />
    </svg>
  );
}
