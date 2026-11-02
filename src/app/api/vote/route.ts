import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guard, json, error, isValidTargetKey } from "@/lib/community/http";
import { getSessionUser } from "@/lib/community/session";

const Body = z.object({ targetKey: z.string(), value: z.union([z.literal(1), z.literal(-1), z.literal(0)]) });

export async function POST(req: NextRequest) {
  const g = guard(req, { requireJson: true });
  if (g) return g;
  const user = await getSessionUser();
  if (!user) return error(401, "unauthenticated");
  if (user.isBanned) return error(403, "banned");
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !isValidTargetKey(parsed.data.targetKey)) return error(400, "invalid_body");
  const { targetKey, value } = parsed.data;

  if (value === 0) {
    await prisma.vote.deleteMany({ where: { userId: user.id, targetKey } });
  } else {
    await prisma.vote.upsert({
      where: { userId_targetKey: { userId: user.id, targetKey } },
      create: { userId: user.id, targetKey, value },
      update: { value },
    });
  }
  const [up, down] = await Promise.all([
    prisma.vote.count({ where: { targetKey, value: 1 } }),
    prisma.vote.count({ where: { targetKey, value: -1 } }),
  ]);
  return json({ ok: true, reaction: { up, down, mine: value } });
}
