import { NextRequest, NextResponse } from "next/server";
import { dbCandidates } from "@/lib/db-candidates";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ data: [] });
  try {
    const data = await dbCandidates(q);
    return NextResponse.json({
      data: data.slice(0, 20).map(c => ({
        id: c.id, name: c.name, party: c.partyAbbr,
        constituency: c.constituency, state: c.state, type: "candidate",
      })),
      source: "database",
    });
  } catch (error) {
    console.error("GET /api/search failed", error);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
