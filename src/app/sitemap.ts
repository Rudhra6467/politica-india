import type { MetadataRoute } from "next";
import { pilotCandidates } from "@/data/pilot-candidates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://politica-qn61.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const parties = Array.from(new Set(pilotCandidates.map((c) => c.partyAbbr)));
  const states = Array.from(new Set(pilotCandidates.map((c) => c.state)));
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/candidates`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...states.map((s) => ({
      url: `${SITE_URL}/candidates?state=${encodeURIComponent(s)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...parties.map((p) => ({
      url: `${SITE_URL}/party/${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...pilotCandidates.map((c) => ({
      url: `${SITE_URL}/candidates/${c.id}`,
      lastModified: c.lastUpdated ? new Date(c.lastUpdated) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
