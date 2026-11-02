import { randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { authSecret } from "./env";
import { hashToken } from "./phone";

export const SESSION_COOKIE = "politica_session";
const SESSION_DAYS = 90;

function key() {
  return new TextEncoder().encode(authSecret());
}

export type SessionUser = {
  id: string;
  displayName: string | null;
  phoneLast4: string;
  tier: "BASIC" | "VERIFIED";
  isAdmin: boolean;
  isBanned: boolean;
};

export async function createSession(userId: string): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const ua = (await headers()).get("user-agent")?.slice(0, 200) ?? null;
  await prisma.session.create({ data: { tokenHash: hashToken(token), userId, expiresAt, userAgent: ua } });
  const jwt = await new SignJWT({ t: token })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(key());
  return jwt;
}

export function sessionCookieOptions(expires?: Date) {
  return {
    name: SESSION_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires: expires ?? new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000),
  };
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  let token: string;
  try {
    const { payload } = await jwtVerify(raw, key(), { algorithms: ["HS256"] });
    token = String(payload.t ?? "");
  } catch {
    return null;
  }
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true },
  });
  if (!session || session.expiresAt.getTime() < Date.now()) return null;
  const u = session.user;
  return { id: u.id, displayName: u.displayName, phoneLast4: u.phoneLast4, tier: u.tier, isAdmin: u.isAdmin, isBanned: u.isBanned };
}

export async function revokeCurrentSession(): Promise<void> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return;
  try {
    const { payload } = await jwtVerify(raw, key(), { algorithms: ["HS256"] });
    const token = String(payload.t ?? "");
    if (token) await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  } catch {
    // ignore
  }
}
