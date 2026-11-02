import { pilotCandidates, type PilotCandidate, type PilotPromise } from "@/data/pilot-candidates";

export type PromiseWithCandidate = { candidate: PilotCandidate; promise: PilotPromise };

export function getAllPromises(): PromiseWithCandidate[] {
  return pilotCandidates.flatMap((candidate) => candidate.promises.map((promise) => ({ candidate, promise })));
}

export function getPromiseById(pid: string): PromiseWithCandidate | undefined {
  for (const candidate of pilotCandidates) {
    const promise = candidate.promises.find((p) => p.id === pid);
    if (promise) return { candidate, promise };
  }
  return undefined;
}
