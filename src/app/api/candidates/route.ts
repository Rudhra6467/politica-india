import { NextRequest, NextResponse } from "next/server";
import { dbCandidates } from "@/lib/db-candidates";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q") ?? undefined;
    const state = request.nextUrl.searchParams.get("state") ?? undefined;
    const candidates = await dbCandidates(q, state);
    return NextResponse.json({ data: candidates, source: "database" });
  } catch (error) {
    console.error("GET /api/candidates failed", error);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
