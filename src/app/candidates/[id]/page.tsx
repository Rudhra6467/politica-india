import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateById, type PromiseStatus } from "@/data/pilot-candidates";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";
import CommentSection from "@/components/CommentSection";
import VerificationBanner from "@/components/VerificationBanner";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";

const statusStyles: Record<PromiseStatus, string> = {
  NOT_STARTED: "bg-zinc-800 text-zinc-300 border border-zinc-700",
  IN_PROGRESS: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  REPORTED_COMPLETED: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  VERIFIED_COMPLETED: "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40",
  UNABLE_TO_VERIFY: "bg-zinc-800 text-zinc-400 border border-zinc-700",
  EVIDENCE_CONFLICTING: "bg-orange-500/15 text-orange-300 border border-orange-500/30",
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
    <div className="-mx-4 -mt-8 min-h-screen bg-[#0b0d12] text-zinc-100 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-6 space-y-6">
        {/* Back */}
        <Link
          href="/candidates"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition"
        >
          <span aria-hidden>←</span> All candidates
        </Link>

        <VerificationBanner />

        {/* ========== HERO ========== */}
        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="shrink-0">
                <CandidateAvatar name={candidate.name} photoUrl={candidate.photoUrl} size="xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <PartyBadge abbr={candidate.partyAbbr} name={candidate.party} showName size="md" />
                  <span className="text-xs font-medium text-zinc-500 tracking-wide uppercase">
                    {role} · {candidate.electionYear}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  {candidate.name}
                </h1>
                <p className="mt-1.5 text-zinc-400">
                  {candidate.constituency}, {candidate.state}
                </p>

                <div className="mt-6">
                  <LikeDislikeButtons
                    id={candidate.id}
                    initialLikes={candidate.likes}
                    initialDislikes={candidate.dislikes}
                    dark
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== METRIC CARDS ========== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard label="Age" value={candidate.age?.toString() ?? "—"} />
          <MetricCard label="Education" value={candidate.education ?? "—"} />
          <MetricCard label="Declared Assets" value={candidate.totalAssets ?? "—"} accent />
          <MetricCard
            label="Criminal Cases"
            value={candidate.criminalCases.toString()}
            warning={candidate.criminalCases > 0}
          />
        </div>

        {/* ========== LAYER 1: VERIFIED RECORD ========== */}
        <section className="rounded-2xl border border-white/5 bg-zinc-900/60 overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
              <div>
                <h2 className="text-sm font-semibold text-zinc-100 tracking-wide">Verified Record</h2>
                <p className="text-[11px] text-zinc-500 mt-0.5">Election Commission of India · Form 26</p>
              </div>
            </div>
            {candidate.lastUpdated && (
              <span className="text-[11px] text-zinc-500 shrink-0">Updated {candidate.lastUpdated}</span>
            )}
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {candidate.profession && (
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Profession</div>
                <div className="mt-1 text-zinc-200">{candidate.profession}</div>
              </div>
            )}

            {candidate.totalLiabilities && (
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Liabilities</div>
                <div className="mt-1 text-zinc-200">{candidate.totalLiabilities}</div>
              </div>
            )}

            <div className="rounded-xl bg-zinc-950/80 border border-white/5 px-4 py-3.5">
              <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Source</div>
              <div className="mt-1 text-sm text-zinc-300">
                Election Commission of India · Form 26 Affidavit
                {candidate.affidavitYear ? ` · ${candidate.affidavitYear}` : ""}
              </div>
              {candidate.affidavitPdfUrl && (
                <a
                  href={candidate.affidavitPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition"
                >
                  View original affidavit
                  <span aria-hidden>→</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ========== LAYER 2: TRACKED PROMISES ========== */}
        <section>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <h2 className="text-sm font-semibold text-zinc-100 tracking-wide">Promises & Announcements</h2>
          </div>
          <p className="text-xs text-zinc-500 mb-4 pl-4.5">
            Tracked information · Source, status and last-checked where available
          </p>

          {candidate.promises.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-zinc-900/40 py-12 text-center text-sm text-zinc-500">
              No promises tracked yet for this candidate.
            </div>
          ) : (
            <div className="space-y-4">
              {candidate.promises.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-white/5 bg-zinc-900/60 overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <span className={`inline-flex text-[11px] font-medium px-2.5 py-1 rounded-full ${statusStyles[p.status]}`}>
                          {statusLabel[p.status]}
                        </span>
                        <h3 className="mt-3 text-base font-medium text-zinc-100 leading-snug">{p.title}</h3>

                        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                          {p.announcedDate && <span>Announced {p.announcedDate}</span>}
                          {p.sourceNote && <span>Source · {p.sourceNote}</span>}
                          {p.lastChecked && <span>Checked {p.lastChecked}</span>}
                        </div>

                        {p.evidenceNote && (
                          <p className="mt-3 text-sm text-zinc-400 bg-zinc-950/60 rounded-xl px-3.5 py-2.5 border border-white/5">
                            <span className="font-medium text-zinc-300">Evidence · </span>
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
                          dark
                        />
                      </div>
                    </div>

                    {/* Community layer */}
                    <div className="mt-5 pt-5 border-t border-white/5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                          Community
                        </span>
                      </div>
                      <CommentSection promiseId={p.id} dark />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="text-center text-[11px] text-zinc-600 leading-relaxed max-w-lg mx-auto pt-4">
          Verified Record comes from official sources. Promises are tracked with available evidence.
          Likes and comments are community reaction only. This platform does not rank or endorse candidates.
        </p>
      </div>
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
    <div className="rounded-2xl border border-white/5 bg-zinc-900/70 px-4 py-4 sm:px-5 sm:py-5">
      <div className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">{label}</div>
      <div
        className={`mt-2 text-lg sm:text-xl font-semibold leading-tight tracking-tight ${
          warning ? "text-amber-400" : accent ? "text-emerald-400" : "text-zinc-100"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
