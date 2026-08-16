import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateById, type PromiseStatus } from "@/data/pilot-candidates";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";
import CommentSection from "@/components/CommentSection";
import VerificationBanner from "@/components/VerificationBanner";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";

const statusStyles: Record<PromiseStatus, string> = {
  NOT_STARTED: "bg-slate-100 text-slate-600 border border-slate-200",
  IN_PROGRESS: "bg-amber-50 text-amber-700 border border-amber-200",
  REPORTED_COMPLETED: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  VERIFIED_COMPLETED: "bg-emerald-100 text-emerald-800 border border-emerald-300",
  UNABLE_TO_VERIFY: "bg-slate-100 text-slate-500 border border-slate-200",
  EVIDENCE_CONFLICTING: "bg-orange-50 text-orange-700 border border-orange-200",
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

  const role = candidate.electionType === "Lok Sabha" ? "MP" : "MLA";

  return (
    <div className="space-y-5 pb-12">
      <Link
        href="/candidates"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition"
      >
        <span aria-hidden>←</span> All candidates
      </Link>

      <VerificationBanner />

      {/* ========== HERO ========== */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500" />
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-7">
            <div className="shrink-0">
              <CandidateAvatar name={candidate.name} photoUrl={candidate.photoUrl} size="xl" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <PartyBadge abbr={candidate.partyAbbr} name={candidate.party} showName size="md" />
                <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
                  {role} · {candidate.electionYear}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {candidate.name}
              </h1>
              <p className="mt-1 text-slate-500">
                {candidate.constituency}, {candidate.state}
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

      {/* ========== METRIC CARDS ========== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Age" value={candidate.age?.toString() ?? "—"} />
        <MetricCard label="Education" value={candidate.education ?? "—"} />
        <MetricCard label="Declared Assets" value={candidate.totalAssets ?? "—"} accent />
        <MetricCard
          label="Criminal Cases"
          value={candidate.criminalCases.toString()}
          warning={candidate.criminalCases > 0}
        />
      </div>

      {/* ========== VERIFIED RECORD ========== */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <div>
              <h2 className="text-sm font-semibold text-slate-800 tracking-wide">Verified Record</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Election Commission of India · Form 26</p>
            </div>
          </div>
          {candidate.lastUpdated && (
            <span className="text-[11px] text-slate-400 shrink-0">Updated {candidate.lastUpdated}</span>
          )}
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {candidate.profession && (
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Profession</div>
                <div className="mt-1 text-sm font-medium text-slate-800">{candidate.profession}</div>
              </div>
            )}
            {candidate.totalLiabilities && (
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Liabilities</div>
                <div className="mt-1 text-sm font-medium text-slate-800">{candidate.totalLiabilities}</div>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3.5">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Source</div>
            <div className="mt-1 text-sm text-slate-700">
              Election Commission of India · Form 26 Affidavit
              {candidate.affidavitYear ? ` · ${candidate.affidavitYear}` : ""}
            </div>
            {candidate.affidavitPdfUrl && (
              <a
                href={candidate.affidavitPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                View original affidavit
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ========== PROMISES ========== */}
      <section>
        <div className="flex items-center gap-2.5 mb-1">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <h2 className="text-sm font-semibold text-slate-800 tracking-wide">Promises & Announcements</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Tracked information · Source, status and last-checked where available
        </p>

        {candidate.promises.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center text-sm text-slate-400">
            No promises tracked yet for this candidate.
          </div>
        ) : (
          <div className="space-y-3">
            {candidate.promises.map((p) => (
              <div key={p.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span className={`inline-flex text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyles[p.status]}`}>
                        {statusLabel[p.status]}
                      </span>
                      <h3 className="mt-2.5 text-base font-medium text-slate-900 leading-snug">{p.title}</h3>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                        {p.announcedDate && <span>Announced {p.announcedDate}</span>}
                        {p.sourceNote && <span>Source · {p.sourceNote}</span>}
                        {p.lastChecked && <span>Checked {p.lastChecked}</span>}
                      </div>

                      {p.evidenceNote && (
                        <p className="mt-3 text-sm text-slate-600 bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-100">
                          <span className="font-medium text-slate-700">Evidence · </span>
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

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
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

      <p className="text-center text-[11px] text-slate-400 leading-relaxed max-w-lg mx-auto pt-2">
        Verified Record comes from official sources. Promises are tracked with available evidence.
        Likes and comments are community reaction only. This platform does not rank or endorse candidates.
      </p>
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent,
  warning,
}: {
  label: string;
  value: string;
  accent?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{label}</div>
      <div
        className={`mt-1.5 text-lg sm:text-xl font-semibold leading-tight tracking-tight ${
          warning ? "text-amber-600" : accent ? "text-emerald-600" : "text-slate-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
