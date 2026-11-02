/**
 * Compact, serialisable rows derived from the pilot dataset for client-side
 * search, filtering and lists. Server components build these and pass them
 * down, so the full dataset (promises, sources, notes) never ships to the browser.
 */
import { pilotCandidates } from "@/data/pilot-candidates";
import { partyInfoMap } from "@/data/party-info";

export type CandidateRow = {
  id: string;
  name: string;
  party: string;
  partyAbbr: string;
  constituency: string;
  state: string;
  role: "MP" | "MLA";
  electionType: string;
  won: boolean;
  sortOrder: number;
  photoUrl?: string;
  criminalCases: number;
  promiseCount: number;
  officeSummary?: string;
};

export type PartyRow = { abbr: string; name: string };

export type DataIndex = { candidates: CandidateRow[]; parties: PartyRow[] };

let cached: DataIndex | null = null;

export function getDataIndex(): DataIndex {
  if (cached) return cached;
  const candidates: CandidateRow[] = pilotCandidates.map((c) => ({
    id: c.id,
    name: c.name,
    party: c.party,
    partyAbbr: c.partyAbbr,
    constituency: c.constituency,
    state: c.state,
    role: c.electionType === "Lok Sabha" ? "MP" : "MLA",
    electionType: c.electionType,
    won: (c.electionResult ?? "won") === "won",
    sortOrder: c.sortOrder ?? 99,
    photoUrl: c.photoUrl,
    criminalCases: c.criminalCases,
    promiseCount: c.promises.length,
    officeSummary: c.officeStatus?.summary,
  }));
  const seen = new Map<string, PartyRow>();
  for (const c of pilotCandidates) {
    if (!seen.has(c.partyAbbr)) seen.set(c.partyAbbr, { abbr: c.partyAbbr, name: partyInfoMap[c.partyAbbr]?.name ?? c.party });
  }
  cached = { candidates, parties: Array.from(seen.values()) };
  return cached;
}
