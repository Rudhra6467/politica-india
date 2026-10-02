import { NextResponse } from "next/server";
import { dbCandidateById } from "@/lib/db-candidates";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const candidate = await dbCandidateById(id);
    if (!candidate) return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    return NextResponse.json({ data: candidate, source: "database" });
  } catch (error) {
    console.error("GET /api/candidates/[id] failed", error);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
