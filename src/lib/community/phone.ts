import { createHash, timingSafeEqual } from "node:crypto";
import { phonePepper } from "./env";

/** Normalise an Indian mobile number to E.164 (+91XXXXXXXXXX). Returns null if not a valid Indian mobile. */
export function normaliseIndianMobile(input: string): string | null {
  const digits = input.replace(/[^\d]/g, "");
  let national = digits;
  if (digits.length === 12 && digits.startsWith("91")) national = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) national = digits.slice(1);
  if (national.length !== 10) return null;
  if (!/^[6-9]\d{9}$/.test(national)) return null;
  return `+91${national}`;
}

export function hashPhone(e164: string): string {
  return createHash("sha256").update(`${phonePepper()}:${e164}`).digest("hex");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  return createHash("sha256").update(`${phonePepper()}:ip:${ip}`).digest("hex").slice(0, 32);
}

export function safeEqualHex(a: string, b: string): boolean {
  const ba = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}
