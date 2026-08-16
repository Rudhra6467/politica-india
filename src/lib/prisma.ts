/**
 * Prisma client singleton (Tier 2A).
 * Safe to import only on the server. Do not import from client components.
 *
 * Until DATABASE_URL is set and seed has run, the UI still reads
 * src/data/pilot-candidates.ts. This client is for seed, scripts, and 2B+.
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.length > 10);
}
