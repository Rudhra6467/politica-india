/**
 * Lightweight in-memory search over compact candidate rows.
 * Pure: takes the index as input so it runs on the client without the full dataset.
 */
import type { CandidateRow, DataIndex } from "./index-rows";

export type SearchResult =
  | { type: "candidate"; id: string; title: string; href: string; candidate: CandidateRow }
  | { type: "party"; id: string; title: string; href: string; abbr: string }
  | { type: "constituency"; id: string; title: string; href: string; seatType: "AC" | "PC"; state: string };

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

export function searchAll(index: DataIndex, query: string, limit = 8): SearchResult[] {
  const q = norm(query);
  if (q.length < 1) return [];

  const scored: { s: number; r: SearchResult }[] = [];

  for (const c of index.candidates) {
    const s = Math.max(score(c.name, q), score(c.constituency, q) - 5, score(c.partyAbbr, q) - 20, score(c.party, q) - 25);
    if (s > 0) {
      scored.push({
        s: s + Math.max(0, 6 - c.sortOrder),
        r: { type: "candidate", id: c.id, title: c.name, href: `/candidates/${c.id}`, candidate: c },
      });
    }
  }

  for (const p of index.parties) {
    const s = Math.max(score(p.abbr, q), score(p.name, q) - 5);
    if (s > 0) scored.push({ s: s + 5, r: { type: "party", id: p.abbr, title: p.name, href: `/party/${p.abbr}`, abbr: p.abbr } });
  }

  const seatsSeen = new Set<string>();
  for (const c of index.candidates) {
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
          href: `/candidates?q=${encodeURIComponent(c.constituency)}`,
          seatType: c.role === "MP" ? "PC" : "AC",
          state: c.state,
        },
      });
    }
  }

  return scored
    .sort((a, b) => b.s - a.s || a.r.title.localeCompare(b.r.title))
    .slice(0, limit)
    .map((x) => x.r);
}
