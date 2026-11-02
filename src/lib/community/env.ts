/**
 * Community feature flags. Everything is off ("pilot") unless configured,
 * so the static site keeps working with no database.
 */
export type CommunityMode = "pilot" | "live";

export function communityMode(): CommunityMode {
  return process.env.COMMUNITY_MODE === "live" && Boolean(process.env.DATABASE_URL) ? "live" : "pilot";
}

export function isLive(): boolean {
  return communityMode() === "live";
}

export function authSecret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set (32+ characters) when COMMUNITY_MODE=live");
  return s;
}

export function phonePepper(): string {
  const s = process.env.PHONE_PEPPER;
  if (!s || s.length < 16) throw new Error("PHONE_PEPPER must be set (16+ characters) when COMMUNITY_MODE=live");
  return s;
}

export function otpProvider(): "log" | "msg91" {
  return process.env.OTP_PROVIDER === "msg91" ? "msg91" : "log";
}

/** In log mode, the OTP is returned to the client only when this is set (local/preview testing). */
export function allowDevOtp(): boolean {
  return process.env.ALLOW_DEV_OTP === "true" && process.env.OTP_PROVIDER !== "msg91";
}

export function adminPhones(): string[] {
  return (process.env.ADMIN_PHONES ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
