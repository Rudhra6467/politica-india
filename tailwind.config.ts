import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        telugu: ["var(--font-telugu)", "var(--font-sans)", "system-ui", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Night palette. Everything in the UI reads from these names, never from raw greys.
        bg: "#0B0D12",
        surface: { DEFAULT: "#151821", 2: "#1E2230", 3: "#272C3C" },
        line: "#2A3040",
        ink: "#F3F4F8",
        muted: "#A3ABBF",
        faint: "#5C6579",
        accent: { DEFAULT: "#8AB4FF", bright: "#B4CDFF" },
        gold: { DEFAULT: "#FFC24B", deep: "#E0A322" },
        sindoor: {
          DEFAULT: "#FF4D6A",
          dark: "#D9304E",
          soft: "#2A1420",
        },
      },
      boxShadow: {
        card: "0 1px 0 0 rgb(255 255 255 / 0.03) inset, 0 1px 2px 0 rgb(0 0 0 / 0.4)",
        lift: "0 12px 32px -12px rgb(0 0 0 / 0.7)",
        glow: "0 0 0 1px rgb(255 194 75 / 0.35), 0 8px 24px -8px rgb(255 194 75 / 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
