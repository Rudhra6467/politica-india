import { pilotCandidates, type PilotCandidate, type PromiseStatus } from "@/data/pilot-candidates";

export function getSiteStats() {
  const states = new Set(pilotCandidates.map((c) => c.state));
  const parties = new Set(pilotCandidates.map((c) => c.partyAbbr));
  const promises = pilotCandidates.reduce((n, c) => n + c.promises.length, 0);
  const photos = pilotCandidates.filter((c) => c.photoUrl).length;
  const lastUpdated = pilotCandidates
    .map((c) => c.lastUpdated ?? "")
    .filter(Boolean)
    .sort()
    .at(-1);
  return {
    candidates: pilotCandidates.length,
    states: states.size,
    parties: parties.size,
    promises,
    photos,
    lastUpdated,
  };
}

export const STATUS_LABEL: Record<PromiseStatus, string> = {
  NOT_STARTED: "Not started",
  IN_PROGRESS: "In progress",
  REPORTED_COMPLETED: "Reported completed",
  VERIFIED_COMPLETED: "Verified completed",
  UNABLE_TO_VERIFY: "Unable to verify",
  EVIDENCE_CONFLICTING: "Evidence conflicting",
};

export const STATUS_ORDER: PromiseStatus[] = [
  "VERIFIED_COMPLETED",
  "REPORTED_COMPLETED",
  "IN_PROGRESS",
  "NOT_STARTED",
  "EVIDENCE_CONFLICTING",
  "UNABLE_TO_VERIFY",
];

export function promiseStatusCounts(c: PilotCandidate): { status: PromiseStatus; count: number }[] {
  const m = new Map<PromiseStatus, number>();
  for (const p of c.promises) m.set(p.status, (m.get(p.status) ?? 0) + 1);
  return STATUS_ORDER.filter((s) => m.has(s)).map((s) => ({ status: s, count: m.get(s)! }));
}

export function getPartiesByState(): Record<string, { abbr: string; name: string; count: number; won: number }[]> {
  const out: Record<string, Map<string, { abbr: string; name: string; count: number; won: number }>> = {};
  for (const c of pilotCandidates) {
    out[c.state] ??= new Map();
    const m = out[c.state];
    const e = m.get(c.partyAbbr) ?? { abbr: c.partyAbbr, name: c.party, count: 0, won: 0 };
    e.count += 1;
    if ((c.electionResult ?? "won") === "won") e.won += 1;
    m.set(c.partyAbbr, e);
  }
  const result: Record<string, { abbr: string; name: string; count: number; won: number }[]> = {};
  for (const [state, m] of Object.entries(out)) {
    result[state] = Array.from(m.values()).sort((a, b) => b.won - a.won || b.count - a.count);
  }
  return result;
}

export function getAllParties() {
  const m = new Map<string, { abbr: string; name: string; count: number; states: Set<string> }>();
  for (const c of pilotCandidates) {
    const e = m.get(c.partyAbbr) ?? { abbr: c.partyAbbr, name: c.party, count: 0, states: new Set<string>() };
    e.count += 1;
    e.states.add(c.state);
    m.set(c.partyAbbr, e);
  }
  return Array.from(m.values())
    .map((e) => ({ abbr: e.abbr, name: e.name, count: e.count, states: Array.from(e.states).sort() }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
