import type { NextRequest } from "next/server";
import { guard, json } from "@/lib/community/http";
import { revokeCurrentSession, sessionCookieOptions } from "@/lib/community/session";

export async function POST(req: NextRequest) {
  const g = guard(req);
  if (g) return g;
  await revokeCurrentSession();
  const res = json({ ok: true });
  const opts = sessionCookieOptions(new Date(0));
  res.cookies.set(opts.name, "", opts);
  return res;
}
