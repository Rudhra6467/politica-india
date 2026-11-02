import { randomInt, createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { allowDevOtp, otpProvider } from "./env";
import { hashIp, safeEqualHex } from "./phone";

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const PER_PHONE_PER_HOUR = 3;
const PER_IP_PER_HOUR = 12;

function codeHash(phoneHash: string, code: string) {
  return createHash("sha256").update(`${phoneHash}:${code}`).digest("hex");
}

export type OtpRequestResult =
  | { ok: true; devCode?: string }
  | { ok: false; reason: "rate_limited" | "send_failed" };

export async function requestOtp(e164: string, phoneHash: string, ip: string | null): Promise<OtpRequestResult> {
  const since = new Date(Date.now() - 60 * 60 * 1000);
  const ipHash = hashIp(ip);
  const [byPhone, byIp] = await Promise.all([
    prisma.otpCode.count({ where: { phoneHash, createdAt: { gte: since } } }),
    ipHash ? prisma.otpCode.count({ where: { ipHash, createdAt: { gte: since } } }) : Promise.resolve(0),
  ]);
  if (byPhone >= PER_PHONE_PER_HOUR || byIp >= PER_IP_PER_HOUR) return { ok: false, reason: "rate_limited" };

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await prisma.otpCode.create({
    data: { phoneHash, ipHash, codeHash: codeHash(phoneHash, code), expiresAt: new Date(Date.now() + OTP_TTL_MS) },
  });

  const sent = await sendOtp(e164, code);
  if (!sent) return { ok: false, reason: "send_failed" };
  return { ok: true, devCode: allowDevOtp() ? code : undefined };
}

export type OtpVerifyResult = { ok: true } | { ok: false; reason: "invalid" | "expired" | "too_many_attempts" };

export async function verifyOtp(phoneHash: string, code: string): Promise<OtpVerifyResult> {
  const latest = await prisma.otpCode.findFirst({
    where: { phoneHash, consumedAt: null },
    orderBy: { createdAt: "desc" },
  });
  if (!latest) return { ok: false, reason: "invalid" };
  if (latest.expiresAt.getTime() < Date.now()) return { ok: false, reason: "expired" };
  if (latest.attempts >= MAX_ATTEMPTS) return { ok: false, reason: "too_many_attempts" };

  const matches = /^\d{6}$/.test(code) && safeEqualHex(latest.codeHash, codeHash(phoneHash, code));
  if (!matches) {
    await prisma.otpCode.update({ where: { id: latest.id }, data: { attempts: { increment: 1 } } });
    return { ok: false, reason: "invalid" };
  }
  await prisma.otpCode.update({ where: { id: latest.id }, data: { consumedAt: new Date() } });
  return { ok: true };
}

async function sendOtp(e164: string, code: string): Promise<boolean> {
  if (otpProvider() === "msg91") return sendViaMsg91(e164, code);
  // Log provider: visible in server logs only. Never log the phone number in full.
  console.info(`[otp] code for ${e164.slice(0, 3)}******${e164.slice(-4)}: ${code}`);
  return true;
}

/** MSG91 OTP API (India). Set MSG91_AUTH_KEY and MSG91_TEMPLATE_ID. */
async function sendViaMsg91(e164: string, code: string): Promise<boolean> {
  const authKey = process.env.MSG91_AUTH_KEY;
  const template = process.env.MSG91_TEMPLATE_ID;
  if (!authKey || !template) {
    console.error("[otp] MSG91_AUTH_KEY / MSG91_TEMPLATE_ID missing");
    return false;
  }
  try {
    const res = await fetch("https://control.msg91.com/api/v5/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json", authkey: authKey },
      body: JSON.stringify({ template_id: template, mobile: e164.replace("+", ""), otp: code, otp_expiry: 10 }),
    });
    if (!res.ok) {
      console.error("[otp] msg91 error", res.status, (await res.text()).slice(0, 200));
      return false;
    }
    return true;
  } catch (e) {
    console.error("[otp] msg91 request failed", e);
    return false;
  }
}
