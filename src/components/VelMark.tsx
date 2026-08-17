/** Vel + peacock — matte black, muted Sindoor rim. Clear peacock at header size. */
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
        opacity="0.9"
      />
      {/* Black Vel body */}
      <path
        d="M24 4C19 15 12 28 12 48C12 68 19 81 24 92C29 81 36 68 36 48C36 28 29 15 24 4Z"
        fill="#141414"
      />
      {/* Inner white hollow */}
      <path
        d="M24 14C20 26 17 34 17 48C17 62 20 72 24 82C28 72 31 62 31 48C31 34 28 26 24 14Z"
        fill="#ffffff"
      />

      {/* Peacock silhouette (readable) */}
      <g fill="#141414">
        {/* Tail fan with eye spots */}
        <path d="M22 52C16 50 12 46 10.5 40C13 45 17 49 21.5 51.5L22 52Z" />
        <path d="M21 53C15 55 12 60 11 66C14 61 17 57 21.5 54.5L21 53Z" />
        <path d="M23 54C20 58 18 64 17.5 71C20 66 22 60 24 56C26 60 28 66 30.5 71C30 64 28 58 25 54H23Z" />
        <path d="M26 53C31 55 34 60 35 66C32 61 29 57 26.5 54.5L26 53Z" />
        <path d="M26 52C32 50 36 46 37.5 40C35 45 31 49 26.5 51.5L26 52Z" />
        {/* Eye rings on fan */}
        <circle cx="14" cy="48" r="1.6" fill="#ffffff" />
        <circle cx="14" cy="48" r="0.7" fill="#141414" />
        <circle cx="34" cy="48" r="1.6" fill="#ffffff" />
        <circle cx="34" cy="48" r="0.7" fill="#141414" />
        <circle cx="18" cy="60" r="1.4" fill="#ffffff" />
        <circle cx="18" cy="60" r="0.6" fill="#141414" />
        <circle cx="30" cy="60" r="1.4" fill="#ffffff" />
        <circle cx="30" cy="60" r="0.6" fill="#141414" />
        <circle cx="24" cy="66" r="1.3" fill="#ffffff" />
        <circle cx="24" cy="66" r="0.55" fill="#141414" />

        {/* Body */}
        <ellipse cx="24" cy="46" rx="4.8" ry="8" />

        {/* Neck curve upward to head (peacock posture) */}
        <path d="M24 39C26 35 27.5 31 26.5 27.5C25.8 25.5 23.8 25 23 26.8C21.8 29.5 22.5 34 24 39Z" />

        {/* Head */}
        <ellipse cx="24.5" cy="25.8" rx="2.8" ry="2.5" />

        {/* Beak pointing right */}
        <path d="M27 26L31 25L27.2 27.5Z" />

        {/* Crown tuft */}
        <circle cx="22.2" cy="21.5" r="0.85" />
        <circle cx="24.2" cy="20.6" r="0.9" />
        <circle cx="26.2" cy="21.3" r="0.85" />
        <path
          d="M23 24.5L22.2 21.5M24.3 24.2L24.2 20.6M25.5 24.5L26.2 21.3"
          stroke="#141414"
          strokeWidth="1.05"
          strokeLinecap="round"
        />

        {/* Legs */}
        <path
          d="M21.5 53L20 59.5M26.5 53L28 59.5"
          stroke="#141414"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
