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
  REPORTED_COMPLETED: "bg-emerald-100 text-emerald-800",
  VERIFIED_COMPLETED: "bg-emerald-200 text-emerald-900",
  UNABLE_TO_VERIFY: "bg-slate-200 text-slate-600",
  EVIDENCE_CONFLICTING: "bg-orange-100 text-orange-800",
};

const statusLabel: Record<PromiseStatus, string> = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  REPORTED_COMPLETED: "Reported Completed",
  VERIFIED_COMPLETED: "Verified Completed",
  UNABLE_TO_VERIFY: "Unable to Verify",
  EVIDENCE_CONFLICTING: "Evidence Conflicting",
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
    <div className="space-y-6 pb-10">
      <Link
        href="/candidates"
        className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
      >
        ← All candidates
      </Link>

      <VerificationBanner />

      {/* ========== HERO ========== */}
      <section className="rounded-2xl border bg-white overflow-hidden shadow-sm">
        <div className="h-2 bg-gradient-to-r from-indigo-600 to-violet-500" />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="shrink-0">
              <CandidateAvatar name={candidate.name} photoUrl={candidate.photoUrl} size="xl" />
            </div>
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
                {candidate.electionType === "Lok Sabha" ? "MP" : "MLA"} · {candidate.electionYear}
              </p>

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

      {/* ========== LAYER 1: VERIFIED FACT ========== */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50 px-5 py-3.5 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-blue-600" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
                Verified Record
              </h2>
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              Authoritative source · Election Commission of India
            </p>
          </div>
          {candidate.lastUpdated && (
            <div className="text-xs text-slate-400 shrink-0">
              Updated {candidate.lastUpdated}
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Age</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{candidate.age ?? "—"}</div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Education</div>
              <div className="mt-1 text-lg font-semibold text-slate-900 leading-snug">{candidate.education ?? "—"}</div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Declared Assets</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{candidate.totalAssets ?? "—"}</div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Criminal Cases</div>
              <div className={`mt-1 text-lg font-semibold ${candidate.criminalCases > 0 ? "text-amber-600" : "text-slate-900"}`}>
                {candidate.criminalCases}
              </div>
            </div>
          </div>

          {candidate.profession && (
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Profession</div>
              <div className="mt-1 text-slate-800">{candidate.profession}</div>
            </div>
          )}

          {/* Source block */}
          <div className="mt-5 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
            <div className="text-xs font-medium text-slate-700">Source</div>
            <div className="mt-1 text-sm text-slate-600">
              Election Commission of India · Form 26 Affidavit
              {candidate.affidavitYear ? ` · ${candidate.affidavitYear}` : ""}
            </div>
            {candidate.affidavitPdfUrl && (
              <a
                href={candidate.affidavitPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View original affidavit
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ========== LAYER 2: TRACKED / REPORTED ========== */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
            Promises & Announcements
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Tracked information · Each item carries source, status and last-checked date where available
        </p>

        {candidate.promises.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-white py-10 text-center text-sm text-slate-400">
            No promises tracked yet for this candidate.
          </div>
        ) : (
          <div className="space-y-4">
            {candidate.promises.map((p) => (
              <div key={p.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[p.status]}`}>
                        {statusLabel[p.status]}
                      </span>
                      <h3 className="mt-2.5 font-medium text-slate-900 leading-snug">{p.title}</h3>

                      {/* Meta row */}
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                        {p.announcedDate && <span>Announced: {p.announcedDate}</span>}
                        {p.sourceNote && <span>Source: {p.sourceNote}</span>}
                        {p.lastChecked && <span>Last checked: {p.lastChecked}</span>}
                      </div>

                      {p.evidenceNote && (
                        <p className="mt-2 text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
                          <span className="font-medium text-slate-700">Evidence: </span>
                          {p.evidenceNote}
                        </p>
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

                  {/* LAYER 3: COMMUNITY (nested under each promise) */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Community
                      </span>
                    </div>
                    <CommentSection promiseId={p.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="text-center text-xs text-slate-400">
        Verified Record comes from official sources. Promises are tracked with available evidence.
        Likes and comments are community reaction only. This platform does not rank or endorse candidates.
      </p>
    </div>
  );
}
