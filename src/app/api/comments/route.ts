import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guard, json, error, isValidTargetKey } from "@/lib/community/http";
import { getSessionUser } from "@/lib/community/session";

const PER_USER_PER_HOUR = 5;

function shape(c: { id: string; body: string; status: string; createdAt: Date; user: { displayName: string | null; phoneLast4: string } }, mine: boolean) {
  return {
    id: c.id,
    body: c.body,
    status: c.status,
    createdAt: c.createdAt.toISOString(),
    author: c.user.displayName ?? `Citizen ···${c.user.phoneLast4}`,
    mine,
  };
}

/** GET /api/comments?key=promise:ap-p01 → approved comments, plus the caller's own pending ones. */
export async function GET(req: NextRequest) {
  const g = guard(req);
  if (g) return g;
  const key = req.nextUrl.searchParams.get("key") ?? "";
  if (!isValidTargetKey(key)) return error(400, "invalid_key");
  const user = await getSessionUser();
  const rows = await prisma.comment.findMany({
    where: {
      targetKey: key,
      OR: [{ status: "APPROVED" }, ...(user ? [{ userId: user.id, status: "PENDING" as const }] : [])],
    },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { user: { select: { displayName: true, phoneLast4: true } } },
  });
  return json({ comments: rows.map((c) => shape(c, !!user && c.userId === user.id)) });
}

const Body = z.object({ targetKey: z.string(), body: z.string().trim().min(5).max(600) });

export async function POST(req: NextRequest) {
  const g = guard(req, { requireJson: true });
  if (g) return g;
  const user = await getSessionUser();
  if (!user) return error(401, "unauthenticated");
  if (user.isBanned) return error(403, "banned");
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success || !isValidTargetKey(parsed.data.targetKey)) return error(400, "invalid_body", "Comment must be 5–600 characters.");

  const since = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await prisma.comment.count({ where: { userId: user.id, createdAt: { gte: since } } });
  if (recent >= PER_USER_PER_HOUR) return error(429, "rate_limited");

  const body = parsed.data.body.replace(/\s+/g, " ").replace(/[<>]/g, "");
  const created = await prisma.comment.create({
    data: { userId: user.id, targetKey: parsed.data.targetKey, body },
    include: { user: { select: { displayName: true, phoneLast4: true } } },
  });
  return json({ ok: true, comment: shape(created, true) }, { status: 201 });
}
