import type { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { guard, json, error } from "@/lib/community/http";
import { getSessionUser } from "@/lib/community/session";

export async function GET(req: NextRequest) {
  const g = guard(req);
  if (g) return g;
  const user = await getSessionUser();
  return json({ user });
}

const Body = z.object({ displayName: z.string().trim().min(2).max(40) });

export async function PATCH(req: NextRequest) {
  const g = guard(req, { requireJson: true });
  if (g) return g;
  const user = await getSessionUser();
  if (!user) return error(401, "unauthenticated");
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return error(400, "invalid_body", "Display name must be 2–40 characters.");
  const name = parsed.data.displayName.replace(/[<>]/g, "");
  const updated = await prisma.user.update({ where: { id: user.id }, data: { displayName: name } });
  return json({ user: { ...user, displayName: updated.displayName } });
}
