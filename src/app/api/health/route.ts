import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ status: "degraded", database: "not_configured" }, { status: 503 });
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", database: "connected", timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Health check failed", error);
    return NextResponse.json({ status: "degraded", database: "unavailable" }, { status: 503 });
  }
}
