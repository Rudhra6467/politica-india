import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guard, json, error, clientIp } from "@/lib/community/http";
import { normaliseIndianMobile, hashPhone } from "@/lib/community/phone";
import { requestOtp } from "@/lib/community/otp";

const Body = z.object({ phone: z.string().min(10).max(20), consent: z.literal(true) });

export async function POST(req: NextRequest) {
  const g = guard(req, { requireJson: true });
  if (g) return g;
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return error(400, "invalid_body", "Phone number and consent are required.");
  const e164 = normaliseIndianMobile(parsed.data.phone);
  if (!e164) return error(400, "invalid_phone", "Enter a valid Indian mobile number.");
  const phoneHash = hashPhone(e164);
  const banned = await prisma.user.findUnique({ where: { phoneHash }, select: { isBanned: true } });
  if (banned?.isBanned) return error(403, "banned");
  const r = await requestOtp(e164, phoneHash, clientIp(req));
  if (!r.ok) return error(r.reason === "rate_limited" ? 429 : 502, r.reason);
  return json({ ok: true, devCode: r.devCode });
}
