import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guard, json, error } from "@/lib/community/http";
import { getSessionUser } from "@/lib/community/session";

const Body = z.object({ reason: z.enum(["abuse", "false", "spam", "other"]) });

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const g = guard(req, { requireJson: true });
  if (g) return g;
  const { id } = await ctx.params;
  const user = await getSessionUser();
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return error(400, "invalid_body");
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) return error(404, "not_found");
  await prisma.$transaction([
    prisma.report.create({ data: { commentId: id, userId: user?.id ?? null, reason: parsed.data.reason } }),
    prisma.comment.update({ where: { id }, data: { reportCount: { increment: 1 } } }),
  ]);
  return json({ ok: true });
}
