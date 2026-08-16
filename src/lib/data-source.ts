/**
 * Where canonical political data is read from.
 *
 * Tier 2A: pilot TypeScript is still the live UI source.
 * After db:setup + 2B, switch USE_DATABASE to true (or gate on hasDatabaseUrl).
 */

export type DataSourceMode = "pilot" | "database";

/**
 * Forced pilot until 2B wires profile/list pages to Prisma.
 * Do not flip to "database" until seed is verified and pages are migrated.
 */
export const DATA_SOURCE_MODE: DataSourceMode = "pilot";

export function isPilotMode(): boolean {
  return DATA_SOURCE_MODE === "pilot";
}
