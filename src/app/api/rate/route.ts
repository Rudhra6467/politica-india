import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guard, json, error, isValidTargetKey } from "@/lib/community/http";
import { getSessionUser } from "@/lib/community/session";
import { summarise } from "@/lib/community/ratings";

const Body = z.object({ targetKey: z.string(), stars: z.number().int().min(0).max(5) });

/** POST /api/rate {targetKey, stars}. stars 0 removes the rating. One per user per target. */
export async function POST(req: NextRequest) {
  const g = guard(req, { requireJson: true });
  if (g) return g;
  const user = await getSessionUser();
  if (!user) return error(401, "unauthenticated");
  if (user.isBanned) return error(403, "banned");
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !isValidTargetKey(parsed.data.targetKey)) return error(400, "invalid_body");
  const { targetKey, stars } = parsed.data;
  if (stars === 0) await prisma.rating.deleteMany({ where: { userId: user.id, targetKey } });
  else
    await prisma.rating.upsert({
      where: { userId_targetKey: { userId: user.id, targetKey } },
      create: { userId: user.id, targetKey, stars },
      update: { stars },
    });
  const s = await summarise([targetKey], user.id);
  return json({ ok: true, rating: s[targetKey] });
}
