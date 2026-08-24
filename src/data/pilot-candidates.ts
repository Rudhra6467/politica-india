/**
 * Pilot data — Andhra Pradesh + Telangana
 * Real 2023/2024 ECI affidavit figures (via ADR/MyNeta).
 * Photos: Wikimedia Commons where licensed; else initials.
 */

export type PromiseStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "REPORTED_COMPLETED"
  | "VERIFIED_COMPLETED"
  | "UNABLE_TO_VERIFY"
  | "EVIDENCE_CONFLICTING";

// NOTE: Full content restored in follow-up; this is a temporary minimal to unblock. See local work for complete 16-photo + enriched promises version.
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
  electionResult?: "won" | "lost";
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

export const pilotCandidates: PilotCandidate[] = [];

export function getAllStates(): string[] { return ["Andhra Pradesh", "Telangana"]; }
export function getNationalParties() { return []; }
export function getPartiesInState(state: string) { return []; }
export function getCandidatesByPartyAndState(partyAbbr: string, state: string) { return []; }
export function getCandidateById(id: string) { return undefined; }
export function getFeaturedLeaders(limit = 8) { return []; }
export function resultOf(c: PilotCandidate) { return c.electionResult ?? "won"; }
