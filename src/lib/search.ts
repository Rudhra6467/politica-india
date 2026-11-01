/**
 * Lightweight in-memory search over canonical pilot entities.
 * Searches candidates, parties and constituencies — never UI strings.
 * Replace with a DB-backed query in Tier 2C.
 */
import { pilotCandidates, type PilotCandidate } from "@/data/pilot-candidates";
import { partyInfoMap } from "@/data/party-info";

export type SearchResult =
  | {
      type: "candidate";
      id: string;
      title: string;
      subtitle: string;
      href: string;
      candidate: PilotCandidate;
    }
  | { type: "party"; id: string; title: string; subtitle: string; href: string }
  | { type: "constituency"; id: string; title: string; subtitle: string; href: string };

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function score(haystack: string, q: string): number {
  const h = norm(haystack);
  if (!h) return 0;
  if (h === q) return 100;
  if (h.startsWith(q)) return 80;
  if (h.split(" ").some((w) => w.startsWith(q))) return 60;
  if (h.includes(q)) return 40;
  return 0;
}

export function searchAll(query: string, limit = 8): SearchResult[] {
  const q = norm(query);
  if (q.length < 1) return [];

  const scored: { s: number; r: SearchResult }[] = [];

  for (const c of pilotCandidates) {
    const s = Math.max(
      score(c.name, q),
      score(c.constituency, q) - 5,
      score(c.partyAbbr, q) - 20,
      score(c.party, q) - 25,
    );
    if (s > 0) {
      const role = c.electionType === "Lok Sabha" ? "MP" : "MLA";
      scored.push({
        s: s + (c.sortOrder != null ? Math.max(0, 6 - c.sortOrder) : 0),
        r: {
          type: "candidate",
          id: c.id,
          title: c.name,
          subtitle: `${c.partyAbbr} · ${role} · ${c.constituency}, ${c.state}`,
          href: `/candidates/${c.id}`,
          candidate: c,
        },
      });
    }
  }

  const partiesSeen = new Set<string>();
  for (const c of pilotCandidates) {
    if (partiesSeen.has(c.partyAbbr)) continue;
    partiesSeen.add(c.partyAbbr);
    const s = Math.max(score(c.partyAbbr, q), score(c.party, q) - 5);
    if (s > 0) {
      const info = partyInfoMap[c.partyAbbr];
      scored.push({
        s: s + 5,
        r: {
          type: "party",
          id: c.partyAbbr,
          title: info?.name ?? c.party,
          subtitle: `Party · ${c.partyAbbr}`,
          href: `/party/${c.partyAbbr}`,
        },
      });
    }
  }

  const seatsSeen = new Set<string>();
  for (const c of pilotCandidates) {
    const key = `${c.constituency}|${c.state}`;
    if (seatsSeen.has(key)) continue;
    seatsSeen.add(key);
    const s = score(c.constituency, q);
    if (s > 0) {
      scored.push({
        s: s - 10,
        r: {
          type: "constituency",
          id: key,
          title: c.constituency,
          subtitle: `${c.electionType === "Lok Sabha" ? "Lok Sabha seat" : "Assembly seat"} · ${c.state}`,
          href: `/candidates?q=${encodeURIComponent(c.constituency)}`,
        },
      });
    }
  }

  return scored
    .sort((a, b) => b.s - a.s || a.r.title.localeCompare(b.r.title))
    .slice(0, limit)
    .map((x) => x.r);
}
