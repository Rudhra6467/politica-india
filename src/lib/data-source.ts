/**
 * Where canonical political data is read from.
 *
 * Tier 2: Postgres is the preferred live source whenever DATABASE_URL is configured.
 * Pilot TypeScript remains a safe fallback for local/demo environments.
 */

export type DataSourceMode = "pilot" | "database";

/**
 * Server-side consumers should use this flag before querying Prisma.
 */
export const DATA_SOURCE_MODE: DataSourceMode = process.env.DATABASE_URL ? "database" : "pilot";

export function isPilotMode(): boolean {
  return DATA_SOURCE_MODE === "pilot";
}
