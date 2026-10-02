import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [states, parties, constituencies, candidates, affidavits, promises, claims, sources, events] =
      await Promise.all([
        prisma.state.count(), prisma.party.count(), prisma.constituency.count(),
        prisma.candidate.count(), prisma.affidavit.count(), prisma.promise.count(),
        prisma.claim.count(), prisma.source.count(), prisma.event.count(),
      ]);
    return NextResponse.json({
      data: { states, parties, constituencies, candidates, affidavits, promises, claims, sources, events },
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("GET /api/stats failed", error);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
