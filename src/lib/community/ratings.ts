import { prisma } from "@/lib/prisma";

/** Averages are shown only once this many people have rated, so a handful of accounts cannot paint a number. */
export const MIN_PUBLIC_RATINGS = 50;

export type RatingSummary = {
  count: number;
  /** Average stars, null until MIN_PUBLIC_RATINGS is reached */
  avg: number | null;
  /** Distribution by stars 1..5 (index 0 = 1 star), null until public */
  dist: number[] | null;
  mine: number; // 0 when the caller has not rated
};

export async function summarise(keys: string[], userId: string | null): Promise<Record<string, RatingSummary>> {
  const grouped = await prisma.rating.groupBy({ by: ["targetKey", "stars"], where: { targetKey: { in: keys } }, _count: { _all: true } });
  const mine = userId ? await prisma.rating.findMany({ where: { userId, targetKey: { in: keys } }, select: { targetKey: true, stars: true } }) : [];
  const out: Record<string, RatingSummary> = {};
  const acc: Record<string, number[]> = {};
  for (const k of keys) acc[k] = [0, 0, 0, 0, 0];
  for (const g of grouped) if (acc[g.targetKey] && g.stars >= 1 && g.stars <= 5) acc[g.targetKey][g.stars - 1] = g._count._all;
  for (const k of keys) {
    const dist = acc[k];
    const count = dist.reduce((a, b) => a + b, 0);
    const sum = dist.reduce((a, n, i) => a + n * (i + 1), 0);
    const isPublic = count >= MIN_PUBLIC_RATINGS;
    out[k] = { count, avg: isPublic ? Math.round((sum / count) * 10) / 10 : null, dist: isPublic ? dist : null, mine: 0 };
  }
  for (const m of mine) if (out[m.targetKey]) out[m.targetKey].mine = m.stars;
  return out;
}
