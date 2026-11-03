import type { NextRequest } from "next/server";
import { guard, json, error, isValidTargetKey } from "@/lib/community/http";
import { getSessionUser } from "@/lib/community/session";
import { summarise } from "@/lib/community/ratings";

/** GET /api/ratings?keys=candidate:ap-tdp-01,promise:ap-p01 → count, average (once public), distribution, caller's own rating. */
export async function GET(req: NextRequest) {
  const g = guard(req);
  if (g) return g;
  const keys = (req.nextUrl.searchParams.get("keys") ?? "").split(",").map((k) => k.trim()).filter(Boolean);
  if (keys.length === 0 || keys.length > 60 || !keys.every(isValidTargetKey)) return error(400, "invalid_keys");
  const user = await getSessionUser();
  return json({ ratings: await summarise(keys, user?.id ?? null) });
}
