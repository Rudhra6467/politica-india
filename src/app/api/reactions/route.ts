import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { guard, json, error, isValidTargetKey } from "@/lib/community/http";
import { getSessionUser } from "@/lib/community/session";

/** GET /api/reactions?keys=candidate:ap-tdp-01,promise:ap-p01 → counts and the caller's own vote. */
export async function GET(req: NextRequest) {
  const g = guard(req);
  if (g) return g;
  const keys = (req.nextUrl.searchParams.get("keys") ?? "").split(",").map((k) => k.trim()).filter(Boolean);
  if (keys.length === 0 || keys.length > 60 || !keys.every(isValidTargetKey)) return error(400, "invalid_keys");

  const [grouped, user] = await Promise.all([
    prisma.vote.groupBy({ by: ["targetKey", "value"], where: { targetKey: { in: keys } }, _count: { _all: true } }),
    getSessionUser(),
  ]);
  const mine = user ? await prisma.vote.findMany({ where: { userId: user.id, targetKey: { in: keys } }, select: { targetKey: true, value: true } }) : [];

  const out: Record<string, { up: number; down: number; mine: 1 | -1 | 0 }> = {};
  for (const k of keys) out[k] = { up: 0, down: 0, mine: 0 };
  for (const row of grouped) {
    const slot = out[row.targetKey];
    if (!slot) continue;
    if (row.value === 1) slot.up = row._count._all;
    else if (row.value === -1) slot.down = row._count._all;
  }
  for (const m of mine) if (out[m.targetKey]) out[m.targetKey].mine = m.value as 1 | -1;
  return json({ reactions: out });
}
