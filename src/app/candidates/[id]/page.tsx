import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateById, resultOf } from "@/data/pilot-candidates";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";
import PromiseCard from "@/components/PromiseCard";
import ProfileTimeline from "@/components/ProfileTimeline";

export default async function CandidatePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;
  const candidate = getCandidateById(id);

  if (!candidate) {
    notFound();
  }

  const role = candidate.electionType === "Lok Sabha" ? "MP" : "MLA";
  const result = resultOf(candidate);
  const won = result === "won";
  const sourceYear = candidate.affidavitYear ?? String(candidate.electionYear);
  const eciSource = "ECI Form 26 · " + sourceYear;

  const backHref = from && from.startsWith("/") ? from : "/candidates";
  const backLabel =
    from && from.startsWith("/party/") ? "Back to party" : "All candidates";

  const opponentHref = candidate.opponentId
    ? "/candidates/" +
      candidate.opponentId +
      "?from=" +
      encodeURIComponent("/candidates/" + candidate.id)
    : null;

  const opponentLabel = won ? "Won against" : "Lost to";
  const hasOpponent = Boolean(candidate.opponentName || candidate.opponentId);

  return (
    <div className="space-y-4 pb-12">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition"
      >
        <span aria-hidden>←</span> {backLabel}
      </Link>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5">
          <div className="flex gap-3 sm:gap-4 items-start">
            <div className="shrink-0">
              <CandidateAvatar name={candidate.name} photoUrl={candidate.photoUrl} size="lg" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <PartyBadge abbr={candidate.partyAbbr} size="sm" />
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  {role} · {candidate.electionYear}
                </span>
                <span
                  className={
                    "text-[11px] font-medium px-2 py-0.5 rounded-full " +
                    (won
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200")
                  }
                >
                  {won ? "Won" : "Lost"}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug">
                {candidate.name}
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                {candidate.constituency}, {candidate.state}
              </p>

              <div className="mt-3">
                <LikeDislikeButtons
                  id={candidate.id}
                  initialLikes={candidate.likes}
                  initialDislikes={candidate.dislikes}
                />
              </div>
            </div>

            {hasOpponent && (
              <div className="hidden sm:flex shrink-0 w-[22%] max-w-[11rem] border-l border-slate-100 pl-3 flex-col justify-center min-h-[4.5rem]">
                {opponentHref ? (
                  <Link href={opponentHref} className="group block text-right hover:opacity-90">
                    <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {opponentLabel}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-indigo-700 group-hover:text-indigo-900 leading-snug">
                      {candidate.opponentName}
                      <span className="ml-0.5" aria-hidden>
                        →
                      </span>
                    </div>
                    {candidate.marginVotes != null && (
                      <div className="mt-0.5 text-[10px] text-slate-400">
                        Margin {candidate.marginVotes.toLocaleString()}
                      </div>
                    )}
                  </Link>
                ) : (
                  <div className="text-right">
                    <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {opponentLabel}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-800 leading-snug">
                      {candidate.opponentName}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {hasOpponent && (
            <div className="sm:hidden mt-3 pt-3 border-t border-slate-100">
              {opponentHref ? (
                <Link href={opponentHref} className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {opponentLabel}
                    </div>
                    <div className="text-sm font-semibold text-indigo-700">{candidate.opponentName}</div>
                  </div>
                  <span className="text-indigo-600 text-sm">View →</span>
                </Link>
              ) : (
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    {opponentLabel}
                  </div>
                  <div className="text-sm font-semibold text-slate-800">{candidate.opponentName}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <MetricCard label="Age" value={candidate.age?.toString() ?? "—"} source={eciSource} />
        <MetricCard label="Education" value={candidate.education ?? "—"} source={eciSource} />
        <MetricCard
          label="Declared Assets"
          value={candidate.totalAssets ?? "—"}
          source={eciSource}
          accent
        />
        <MetricCard
          label="Criminal Cases"
          value={candidate.criminalCases.toString()}
          source={eciSource}
          warning={candidate.criminalCases > 0}
        />
      </div>

      <ProfileTimeline candidate={candidate} />

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50/80">
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

        <div className="p-4 sm:p-5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {candidate.profession && (
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-2.5">
                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Profession</div>
                <div className="mt-1 text-sm font-medium text-slate-800">{candidate.profession}</div>
                <div className="mt-1 text-[10px] text-slate-400">{eciSource}</div>
              </div>
            )}
            {candidate.totalLiabilities && (
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-2.5">
                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Liabilities</div>
                <div className="mt-1 text-sm font-medium text-slate-800">{candidate.totalLiabilities}</div>
                <div className="mt-1 text-[10px] text-slate-400">{eciSource}</div>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-3">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Source</div>
            <div className="mt-1 text-sm text-slate-700">
              Election Commission of India · Form 26 Affidavit
              {candidate.affidavitYear ? " · " + candidate.affidavitYear : ""}
            </div>
            <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
              Assets, liabilities, education and declared cases are taken from the candidate&apos;s
              public affidavit. Allegations are not treated as convictions.
            </p>
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

      <section>
        <div className="flex items-center gap-2.5 mb-1">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <h2 className="text-sm font-semibold text-slate-800 tracking-wide">Promises & Announcements</h2>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Tracked information · Like/dislike on the right · Comments expand below
        </p>

        {candidate.promises.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center text-sm text-slate-400">
            No promises tracked yet for this candidate.
          </div>
        ) : (
          <div className="space-y-3">
            {candidate.promises.map((p) => (
              <PromiseCard key={p.id} promise={p} />
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
  source,
  accent,
  warning,
}: {
  label: string;
  value: string;
  source?: string;
  accent?: boolean;
  warning?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-sm">
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{label}</div>
      <div
        className={
          "mt-1 text-base sm:text-lg font-semibold leading-tight tracking-tight " +
          (warning ? "text-amber-600" : accent ? "text-emerald-600" : "text-slate-900")
        }
      >
        {value}
      </div>
      {source && <div className="mt-1 text-[10px] text-slate-400 leading-snug">{source}</div>}
    </div>
  );
}
