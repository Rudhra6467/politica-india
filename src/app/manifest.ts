import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Politica India",
    short_name: "Politica",
    description:
      "Know who represents you. Official affidavit records, tracked promises and citizen reaction for India's elected representatives.",
    id: "/",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0B0D12",
    theme_color: "#0B0D12",
    lang: "en-IN",
    categories: ["news", "government", "education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Representatives", url: "/candidates", description: "Browse MLAs and MPs" },
      { name: "Andhra Pradesh", url: "/candidates?state=Andhra%20Pradesh" },
      { name: "Telangana", url: "/candidates?state=Telangana" },
    ],
  };
}
