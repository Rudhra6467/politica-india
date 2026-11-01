import type { Metadata } from "next";
import { Suspense } from "react";
import CandidatesBrowser from "./CandidatesBrowser";

export const metadata: Metadata = {
  title: "Representatives",
  description:
    "Browse MLAs and MPs in the Politica India pilot with ECI Form 26 affidavit facts, filterable by state, party, role and result.",
};

export default function CandidatesPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-slate-400">Loading…</div>}>
      <CandidatesBrowser />
    </Suspense>
  );
}
