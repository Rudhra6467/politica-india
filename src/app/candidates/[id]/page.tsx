import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateById, type PromiseStatus } from "@/data/pilot-candidates";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";
import CommentSection from "@/components/CommentSection";
import VerificationBanner from "@/components/VerificationBanner";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";

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
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/candidates"
        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
      >
        ← All candidates
      </Link>

      {/* Verification mock */}
      <VerificationBanner />

      {/* ========== HERO ========== */}
      <section className="rounded-2xl border bg-white overflow-hidden shadow-sm">
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-indigo-600 to-violet-500" />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              <CandidateAvatar name={candidate.name} photoUrl={candidate.photoUrl} size="xl" />
            </div>

            {/* Identity */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {candidate.name}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <PartyBadge abbr={candidate.partyAbbr} name={candidate.party} showName size="md" />
              </div>

              <p className="mt-2 text-slate-600">
                {candidate.constituency}, {candidate.state}
              </p>
              <p className="text-sm text-slate-400">
                {candidate.electionType} · {candidate.electionYear}
              </p>

              {/* Like / Dislike */}
              <div className="mt-5">
                <LikeDislikeButtons
                  id={candidate.id}
                  initialLikes={candidate.likes}
                  initialDislikes={candidate.dislikes}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VERIFIED RECORD ========== */}
      <section className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Verified Record</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Sourced from Election Commission of India · Form 26 Affidavit
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Age</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{candidate.age ?? "—"}</div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Education</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{candidate.education ?? "—"}</div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Declared Assets</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{candidate.totalAssets ?? "—"}</div>
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Criminal Cases</div>
              <div className={`mt-1 text-lg font-semibold ${candidate.criminalCases > 0 ? "text-amber-600" : "text-slate-900"}`}>
                {candidate.criminalCases}
              </div>
            </div>
          </div>

          {candidate.profession && (
            <div className="mt-6 pt-5 border-t">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Profession</div>
              <div className="mt-1 text-slate-800">{candidate.profession}</div>
            </div>
          )}

          {candidate.affidavitPdfUrl && (
            <div className="mt-6">
              <a
                href={candidate.affidavitPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View original ECI Affidavit (Form 26)
                <span aria-hidden>→</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ========== PROMISES ========== */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Promises & Announcements</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tracked individually · Status and public reaction shown separately
          </p>
        </div>

        <div className="space-y-4">
          {candidate.promises.map((p) => (
            <div key={p.id} className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <span
                      className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[p.status]}`}
                    >
                      {statusLabel[p.status]}
                    </span>
                    <h3 className="mt-2.5 font-medium text-slate-900 leading-snug">{p.title}</h3>
                    {p.sourceNote && (
                      <p className="mt-1.5 text-sm text-slate-500">Source: {p.sourceNote}</p>
                    )}
                  </div>

                  <div className="shrink-0">
                    <LikeDislikeButtons
                      id={p.id}
                      initialLikes={p.likes}
                      initialDislikes={p.dislikes}
                      size="sm"
                    />
                  </div>
                </div>

                <CommentSection promiseId={p.id} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neutrality footer */}
      <p className="text-center text-xs text-slate-400 pb-6">
        This page shows declared data and public reaction. It does not rank or endorse any candidate.
      </p>
    </div>
  );
}
