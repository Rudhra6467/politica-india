import Link from "next/link";
import { pilotCandidates } from "@/data/pilot-candidates";

export default function CandidatesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Candidates
        </h1>
        <p className="mt-2 text-slate-600">
          Pilot set · Data attributed to ECI Form 26 affidavits where available.
          Promises are curated for demonstration.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pilotCandidates.map((c) => (
          <Link
            key={c.id}
            href={`/candidates/${c.id}`}
            className="block rounded-xl border bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-lg text-slate-900">{c.name}</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {c.partyAbbr} · {c.constituency}
                </p>
                <p className="text-xs text-slate-400 mt-1">{c.state} · {c.electionYear}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                {c.criminalCases === 0 ? "0 cases" : `${c.criminalCases} cases`}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="text-emerald-600 font-medium">👍 {c.likes.toLocaleString()}</span>
              <span className="text-rose-600 font-medium">👎 {c.dislikes.toLocaleString()}</span>
              <span className="text-slate-400">{c.promises.length} promises</span>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-sm text-slate-500 text-center pt-4">
        This is pilot data for demonstration. Real affidavit PDFs will be linked from the ECI portal.
      </p>
    </div>
  );
}
