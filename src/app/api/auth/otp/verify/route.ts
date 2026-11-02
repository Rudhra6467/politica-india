import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guard, json, error } from "@/lib/community/http";
import { normaliseIndianMobile, hashPhone } from "@/lib/community/phone";
import { verifyOtp } from "@/lib/community/otp";
import { createSession, sessionCookieOptions } from "@/lib/community/session";
import { adminPhones } from "@/lib/community/env";

const Body = z.object({ phone: z.string().min(10).max(20), code: z.string().regex(/^\d{6}$/) });

export async function POST(req: NextRequest) {
  const g = guard(req, { requireJson: true });
  if (g) return g;
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return error(400, "invalid_body");
  const e164 = normaliseIndianMobile(parsed.data.phone);
  if (!e164) return error(400, "invalid_phone");
  const phoneHash = hashPhone(e164);

  const v = await verifyOtp(phoneHash, parsed.data.code);
  if (!v.ok) return error(v.reason === "too_many_attempts" ? 429 : 400, v.reason);

  const isAdmin = adminPhones().includes(e164);
  const user = await prisma.user.upsert({
    where: { phoneHash },
    create: { phoneHash, phoneLast4: e164.slice(-4), consentAt: new Date(), isAdmin },
    update: { lastSeenAt: new Date(), ...(isAdmin ? { isAdmin: true } : {}) },
  });
  if (user.isBanned) return error(403, "banned");

  const jwt = await createSession(user.id);
  const res = json({
    ok: true,
    user: { id: user.id, displayName: user.displayName, phoneLast4: user.phoneLast4, tier: user.tier, isAdmin: user.isAdmin },
  });
  const opts = sessionCookieOptions();
  res.cookies.set(opts.name, jwt, opts);
  return res;
}
