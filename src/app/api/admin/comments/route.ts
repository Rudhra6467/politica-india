import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guard, json, error } from "@/lib/community/http";
import { getSessionUser } from "@/lib/community/session";

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) return { user: null, res: error(401, "unauthenticated") };
  if (!user.isAdmin) return { user: null, res: error(403, "forbidden") };
  return { user, res: null };
}

/** GET /api/admin/comments?status=PENDING */
export async function GET(req: NextRequest) {
  const g = guard(req);
  if (g) return g;
  const { res } = await requireAdmin();
  if (res) return res;
  const status = (req.nextUrl.searchParams.get("status") ?? "PENDING").toUpperCase();
  if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) return error(400, "invalid_status");
  const rows = await prisma.comment.findMany({
    where: { status: status as "PENDING" | "APPROVED" | "REJECTED" },
    orderBy: [{ reportCount: "desc" }, { createdAt: "asc" }],
    take: 100,
    include: { user: { select: { displayName: true, phoneLast4: true } }, _count: { select: { reports: true } } },
  });
  return json({
    comments: rows.map((c) => ({
      id: c.id,
      targetKey: c.targetKey,
      body: c.body,
      status: c.status,
      createdAt: c.createdAt.toISOString(),
      author: c.user.displayName ?? `Citizen ···${c.user.phoneLast4}`,
      reports: c._count.reports,
    })),
  });
}

const Body = z.object({ id: z.string(), action: z.enum(["approve", "reject", "ban"]), note: z.string().max(200).optional() });

export async function POST(req: NextRequest) {
  const g = guard(req, { requireJson: true });
  if (g) return g;
  const { user, res } = await requireAdmin();
  if (res || !user) return res;
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return error(400, "invalid_body");
  const { id, action, note } = parsed.data;
  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment) return error(404, "not_found");
  if (action === "ban") {
    await prisma.$transaction([
      prisma.user.update({ where: { id: comment.userId }, data: { isBanned: true } }),
      prisma.comment.updateMany({ where: { userId: comment.userId, status: "PENDING" }, data: { status: "REJECTED", reviewedAt: new Date(), reviewedBy: user.id, reviewNote: "banned" } }),
      prisma.session.deleteMany({ where: { userId: comment.userId } }),
    ]);
    return json({ ok: true });
  }
  await prisma.comment.update({
    where: { id },
    data: { status: action === "approve" ? "APPROVED" : "REJECTED", reviewedAt: new Date(), reviewedBy: user.id, reviewNote: note ?? null },
  });
  return json({ ok: true });
}
