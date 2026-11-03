import type { MetadataRoute } from "next";
import { pilotCandidates } from "@/data/pilot-candidates";
import { getAllPromises } from "@/lib/promises";
import { LOCALES } from "@/i18n";
import { localeHref } from "@/i18n/href";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://politica-qn61.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const parties = Array.from(new Set(pilotCandidates.map((c) => c.partyAbbr)));
  const states = Array.from(new Set(pilotCandidates.map((c) => c.state)));
  const now = new Date();
  const alt = (path: string) => ({
    languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${localeHref(l, path)}`])),
  });
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1, alternates: alt("/") },
    { url: `${SITE_URL}/candidates`, lastModified: now, changeFrequency: "weekly", priority: 0.9, alternates: alt("/candidates") },
    ...states.map((s) => ({
      url: `${SITE_URL}/candidates?state=${encodeURIComponent(s)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/promises`, lastModified: now, changeFrequency: "weekly", priority: 0.9, alternates: alt("/promises") },
    { url: `${SITE_URL}/mood`, lastModified: now, changeFrequency: "daily", priority: 0.8, alternates: alt("/mood") },
    { url: `${SITE_URL}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.5, alternates: alt("/methodology") },
    ...parties.map((p) => ({
      url: `${SITE_URL}/party/${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: alt(`/party/${p}`),
    })),
    ...pilotCandidates.map((c) => ({
      url: `${SITE_URL}/candidates/${c.id}`,
      lastModified: c.lastUpdated ? new Date(c.lastUpdated) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      alternates: alt(`/candidates/${c.id}`),
    })),
    ...getAllPromises().map(({ promise }) => ({
      url: `${SITE_URL}/p/${promise.id}`,
      lastModified: promise.lastChecked ? new Date(promise.lastChecked) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
      alternates: alt(`/p/${promise.id}`),
    })),
  ];
}
