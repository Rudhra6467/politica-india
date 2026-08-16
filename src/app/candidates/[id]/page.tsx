import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateById, type PromiseStatus } from "@/data/pilot-candidates";

const statusStyles: Record<PromiseStatus, string> = {
  NOT_STARTED: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-amber-100 text-amber-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  DISPUTED: "bg-rose-100 text-rose-800",
};

const statusLabel: Record<PromiseStatus, string> = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  DISPUTED: "Disputed",
};

export default async function CandidatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = getCandidateById(id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/candidates"
        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
      >
        ← All candidates
      </Link>

      {/* Header */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{candidate.name}</h1>
            <p className="mt-1 text-lg text-slate-600">
              {candidate.party} ({candidate.partyAbbr})
            </p>
            <p className="mt-1 text-slate-500">
              {candidate.constituency}, {candidate.state} · {candidate.electionType} {candidate.electionYear}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{candidate.likes.toLocaleString()}</div>
              <div className="text-xs text-slate-500">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">{candidate.dislikes.toLocaleString()}</div>
              <div className="text-xs text-slate-500">Dislikes</div>
            </div>
          </div>
        </div>

        {/* Affidavit summary */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t pt-6">
          <div>
            <div className="text-xs text-slate-500">Age</div>
            <div className="font-medium">{candidate.age ?? "—"}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Education</div>
            <div className="font-medium">{candidate.education ?? "—"}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Declared Assets</div>
            <div className="font-medium">{candidate.totalAssets ?? "—"}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Criminal Cases</div>
            <div className="font-medium">{candidate.criminalCases}</div>
          </div>
        </div>

        {candidate.affidavitPdfUrl && (
          <div className="mt-4 text-sm">
            <a
              href={candidate.affidavitPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              View original ECI Affidavit (Form 26) →
            </a>
            <span className="ml-2 text-slate-400">Source: Election Commission of India</span>
          </div>
        )}
      </section>

      {/* Promises */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Promises & Announcements
        </h2>

        <div className="space-y-4">
          {candidate.promises.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[p.status]}`}
                    >
                      {statusLabel[p.status]}
                    </span>
                  </div>
                  <h3 className="font-medium text-slate-900">{p.title}</h3>
                  {p.sourceNote && (
                    <p className="mt-1 text-sm text-slate-500">Source: {p.sourceNote}</p>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <button
                    className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm hover:bg-emerald-50 hover:border-emerald-300 transition"
                    title="Like (login required in full version)"
                  >
                    <span>👍</span>
                    <span className="font-medium">{p.likes.toLocaleString()}</span>
                  </button>
                  <button
                    className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm hover:bg-rose-50 hover:border-rose-300 transition"
                    title="Dislike (login required in full version)"
                  >
                    <span>👎</span>
                    <span className="font-medium">{p.dislikes.toLocaleString()}</span>
                  </button>
                </div>
              </div>

              {/* Placeholder for comments */}
              <div className="mt-4 pt-4 border-t text-sm text-slate-400">
                Comments available for verified users only. (Coming in next iteration)
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-slate-400 text-center">
        Neutrality note: This platform shows declared data and public reaction counts.
        It does not rank or endorse any candidate.
      </p>
    </div>
  );
}
