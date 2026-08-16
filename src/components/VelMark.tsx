/** Vel + peacock mark — matte black, muted Sindoor edge */
export default function VelMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Sindoor rim */}
      <path
        d="M24 2 C18 14 10 28 10 48 C10 68 18 82 24 94 C30 82 38 68 38 48 C38 28 30 14 24 2Z"
        fill="none"
        stroke="#9F1239"
        strokeWidth="1.6"
        opacity="0.9"
      />
      {/* Black leaf body */}
      <path
        d="M24 4 C19 15 12 28 12 48 C12 68 19 81 24 92 C29 81 36 68 36 48 C36 28 29 15 24 4Z"
        fill="#141414"
      />
      {/* Inner white hollow (spear opening) */}
      <path
        d="M24 18 C21 26 18 34 18 48 C18 62 21 70 24 78 C27 70 30 62 30 48 C30 34 27 26 24 18Z"
        fill="#ffffff"
      />
      {/* Peacock silhouette */}
      <g fill="#141414" transform="translate(0,2)">
        {/* Body */}
        <ellipse cx="25" cy="46" rx="4.2" ry="6.5" />
        {/* Neck + head */}
        <path d="M25 40 C26 36 27 33 26.5 30 C26 28.5 24.5 28 24 29.5 C23.5 31 24.2 34 25 40Z" />
        {/* Beak */}
        <path d="M26.5 30 L29 29.5 L26.8 31.2Z" />
        {/* Crown tuft */}
        <path d="M24.2 28.5 L23.5 25.5 M25 28 L25.2 24.8 M25.8 28.2 L26.8 25.2" stroke="#141414" strokeWidth="0.9" strokeLinecap="round" fill="none" />
        {/* Tail feathers */}
        <path d="M22 50 C18 54 16 60 17 66 C19 62 21 58 23 54" />
        <path d="M23 52 C20 58 19 64 20 70 C21.5 65 23 60 24.5 56" />
        <path d="M24 53 C23 60 23.5 66 25 72 C25.5 66 25.5 60 25.5 55" />
        {/* Legs */}
        <path d="M23.5 52 L22.5 56 M26 52 L27 56" stroke="#141414" strokeWidth="1" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
