/** Vel + peacock mark — matte black body, muted Sindoor rim. Peacock must read clearly at header size. */
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
        d="M24 2C18 14 10 28 10 48C10 68 18 82 24 94C30 82 38 68 38 48C38 28 30 14 24 2Z"
        fill="none"
        stroke="#9F1239"
        strokeWidth="1.75"
        opacity="0.85"
      />
      {/* Black leaf / Vel body */}
      <path
        d="M24 4C19 15 12 28 12 48C12 68 19 81 24 92C29 81 36 68 36 48C36 28 29 15 24 4Z"
        fill="#141414"
      />
      {/* Inner white hollow */}
      <path
        d="M24 16C20.5 26 17.5 34 17.5 48C17.5 62 20.5 70 24 80C27.5 70 30.5 62 30.5 48C30.5 34 27.5 26 24 16Z"
        fill="#ffffff"
      />

      {/* Peacock — readable silhouette */}
      <g fill="#141414">
        {/* Tail fan (behind body) — classic peacock arc */}
        <path d="M24 58C18 56 13 52 11 46C14 50 18 53 22 55C20 58 18 62 17 67C19 63 21 60 24 58Z" opacity="0.95" />
        <path d="M24 58C30 56 35 52 37 46C34 50 30 53 26 55C28 58 30 62 31 67C29 63 27 60 24 58Z" opacity="0.95" />
        <path d="M22 56C19 59 16 64 15 70C18 66 21 62 24 59C27 62 30 66 33 70C32 64 29 59 26 56H22Z" />
        {/* Eye spots suggestion on fan */}
        <circle cx="16.5" cy="52" r="1.1" fill="#141414" />
        <circle cx="31.5" cy="52" r="1.1" fill="#141414" />
        <circle cx="19" cy="62" r="1" fill="#141414" />
        <circle cx="29" cy="62" r="1" fill="#141414" />

        {/* Body */}
        <ellipse cx="24" cy="48" rx="5" ry="7.2" />

        {/* Neck */}
        <path d="M24 42C25.2 38 26 34.5 25.2 31.5C24.6 29.8 23.2 29.2 22.6 30.6C21.8 33 22.6 37 24 42Z" />

        {/* Head */}
        <ellipse cx="24.2" cy="29.2" rx="2.6" ry="2.4" />

        {/* Beak */}
        <path d="M26.5 29.4L30 28.6L26.8 30.8Z" />

        {/* Crown / crest (peacock tuft) */}
        <path
          d="M22.8 27.2L21.6 23.2M24 26.8L24.1 22.4M25.4 27L26.8 23.4M23.4 26.6L22.2 24"
          stroke="#141414"
          strokeWidth="1.15"
          strokeLinecap="round"
          fill="none"
        />

        {/* Legs */}
        <path
          d="M21.8 54.5L20.5 60M26.2 54.5L27.5 60"
          stroke="#141414"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
