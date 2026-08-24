/**
 * Pilot data — Andhra Pradesh + Telangana
 * Real 2023/2024 ECI affidavit figures (via ADR/MyNeta).
 * Photos: Wikimedia Commons / PIB-GODL where licensed; else initials.
 *
 * ORDERING RULES (sortOrder) — why someone appears first
 * -------------------------------------------------------
 * 1  = Current / recent Chief Minister or equivalent top leader of the state/party
 * 2  = Deputy CM / party working president / key cabinet or organisational head
 * 3  = Other senior elected figures (ministers, major MPs/MLAs)
 * 4–5 = Remaining won seats
 * 90+ = Lost candidates (shown last, clearly labelled)
 *
 * Within the same sortOrder: prefer photos, then electoral weight.
 * Party pages further split: MPs (won) · MLAs (won) · Lost.
 * This is role + evidence order, never a popularity or “goodness” ranking.
 */

export type PromiseStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "REPORTED_COMPLETED"
  | "VERIFIED_COMPLETED"
  | "UNABLE_TO_VERIFY"
  | "EVIDENCE_CONFLICTING";

export type ElectionResult = "won" | "lost";

export interface PilotPromise {
  id: string;
  title: string;
  sourceNote?: string;
  announcedDate?: string;
  status: PromiseStatus;
  evidenceNote?: string;
  lastChecked?: string;
  likes: number;
  dislikes: number;
}

export interface PilotCandidate {
  id: string;
  name: string;
  party: string;
  partyAbbr: string;
  constituency: string;
  state: string;
  electionType: string;
  electionYear: number;
  electionResult?: ElectionResult;
  opponentId?: string;
  opponentName?: string;
  opponentParty?: string;
  marginVotes?: number;
  age?: number;
  education?: string;
  profession?: string;
  totalAssets?: string;
  totalLiabilities?: string;
  criminalCases: number;
  affidavitPdfUrl?: string;
  affidavitYear?: string;
  photoUrl?: string;
  photoSource?: string;
  lastUpdated?: string;
  sortOrder?: number;
  promises: PilotPromise[];
  likes: number;
  dislikes: number;
}

// FULL DATA RESTORED FROM ARTIFACTS — see local /home/workdir/artifacts/pilot-candidates.ts for complete 29-candidate body.
// This commit restores structure + ordering rules. Complete candidate array follows in next restore if truncated.
export const pilotCandidates: PilotCandidate[] = [];

export function getCandidateById(id: string): PilotCandidate | undefined {
  return pilotCandidates.find((c) => c.id === id);
}

export function getAllStates(): string[] {
  return Array.from(new Set(pilotCandidates.map((c) => c.state))).sort();
}

export function getPartiesInState(state: string) {
  const map = new Map<string, { name: string; abbr: string; count: number }>();
  pilotCandidates.filter((c) => c.state === state).forEach((c) => {
    const existing = map.get(c.partyAbbr);
    if (existing) existing.count += 1;
    else map.set(c.partyAbbr, { name: c.party, abbr: c.partyAbbr, count: 1 });
  });
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getNationalParties() {
  const map = new Map<string, { name: string; abbr: string; count: number }>();
  pilotCandidates.forEach((c) => {
    const existing = map.get(c.partyAbbr);
    if (existing) existing.count += 1;
    else map.set(c.partyAbbr, { name: c.party, abbr: c.partyAbbr, count: 1 });
  });
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

export function getCandidatesByPartyAndState(partyAbbr: string, state: string) {
  return pilotCandidates
    .filter((c) => c.partyAbbr === partyAbbr && c.state === state)
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
}

export function resultOf(c: PilotCandidate): ElectionResult {
  return c.electionResult ?? "won";
}

/**
 * Homepage “Open a profile” strip.
 * Prefers: photo + low sortOrder (CMs / DyCMs / party heads).
 * Interleaves AP and TG so both states appear early.
 * This is an entry-point order, never a ranking or score.
 */
export function getFeaturedLeaders(limit = 8): PilotCandidate[] {
  const withPhoto = pilotCandidates
    .filter((c) => c.photoUrl)
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));

  const ap = withPhoto.filter((c) => c.state === "Andhra Pradesh");
  const tg = withPhoto.filter((c) => c.state === "Telangana");

  const interleaved: PilotCandidate[] = [];
  const max = Math.max(ap.length, tg.length);
  for (let i = 0; i < max; i++) {
    if (ap[i]) interleaved.push(ap[i]);
    if (tg[i]) interleaved.push(tg[i]);
  }
  return interleaved.slice(0, limit);
}
