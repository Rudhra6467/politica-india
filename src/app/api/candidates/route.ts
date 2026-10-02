import { NextRequest, NextResponse } from "next/server";
import { dbCandidates } from "@/lib/db-candidates";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q") ?? undefined;
    const state = request.nextUrl.searchParams.get("state") ?? undefined;
    const candidates = await dbCandidates(q, state);
    const ids = candidates.map(c => c.id);
    const { prisma } = await import("@/lib/prisma");
    const [up, down] = await Promise.all([
      prisma.like.groupBy({ by: ["candidateId"], where: { candidateId: { in: ids }, isLike: true }, _count: { _all: true } }),
      prisma.like.groupBy({ by: ["candidateId"], where: { candidateId: { in: ids }, isLike: false }, _count: { _all: true } }),
    ]);
    const likes = new Map(up.map(x => [x.candidateId, x._count._all]));
    const dislikes = new Map(down.map(x => [x.candidateId, x._count._all]));
    return NextResponse.json({
      data: candidates.map(c => ({ ...c, likes: likes.get(c.id) ?? 0, dislikes: dislikes.get(c.id) ?? 0 })),
      source: "database",
    });
  } catch (error) {
    console.error("GET /api/candidates failed", error);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
