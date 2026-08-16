import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateById, resultOf } from "@/data/pilot-candidates";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";
import PromiseCard from "@/components/PromiseCard";
import ProfileTimeline from "@/components/ProfileTimeline";
import VerifiedRecordBlock from "@/components/VerifiedRecordBlock";

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
  const partyHref = "/party/" + candidate.partyAbbr + "?state=" + encodeURIComponent(candidate.state);

  return (
    <div className="space-y-3 pb-10">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition"
      >
        <span aria-hidden>←</span> {backLabel}
      </Link>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-3 sm:p-4">
          <div className="flex gap-3 items-start">
            <div className="shrink-0">
              <CandidateAvatar name={candidate.name} photoUrl={candidate.photoUrl} size="lg" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                <Link href={partyHref} className="hover:opacity-80 transition" title={candidate.party}>
                  <PartyBadge abbr={candidate.partyAbbr} size="sm" />
                </Link>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                  {role} · {candidate.electionYear}
                </span>
                <span
                  className={
                    "text-[11px] font-medium px-1.5 py-0.5 rounded-full " +
                    (won
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200")
                  }
                >
                  {won ? "Won" : "Lost"}
                </span>
              </div>

              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-snug">
                {candidate.name}
              </h1>
              <p className="text-xs text-slate-500">
                {candidate.constituency}, {candidate.state}
                <span className="text-slate-300"> · </span>
                <Link href={partyHref} className="text-indigo-600 hover:text-indigo-800 font-medium">
                  {candidate.partyAbbr}
                </Link>
              </p>

              <div className="mt-2">
                <LikeDislikeButtons
                  id={candidate.id}
                  initialLikes={candidate.likes}
                  initialDislikes={candidate.dislikes}
                />
              </div>
            </div>

            {hasOpponent && (
              <div className="hidden sm:flex shrink-0 w-[22%] max-w-[10rem] border-l border-slate-100 pl-2.5 flex-col justify-center">
                {opponentHref ? (
                  <Link href={opponentHref} className="group block text-right hover:opacity-90">
                    <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {opponentLabel}
                    </div>
                    <div className="mt-0.5 text-xs font-semibold text-indigo-700 group-hover:text-indigo-900 leading-snug">
                      {candidate.opponentName} →
                    </div>
                    {candidate.marginVotes != null && (
                      <div className="text-[10px] text-slate-400">
                        {candidate.marginVotes.toLocaleString()} votes
                      </div>
                    )}
                  </Link>
                ) : (
                  <div className="text-right">
                    <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {opponentLabel}
                    </div>
                    <div className="mt-0.5 text-xs font-semibold text-slate-800 leading-snug">
                      {candidate.opponentName}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {hasOpponent && (
            <div className="sm:hidden mt-2 pt-2 border-t border-slate-100">
              {opponentHref ? (
                <Link href={opponentHref} className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {opponentLabel}
                    </div>
                    <div className="text-xs font-semibold text-indigo-700">{candidate.opponentName}</div>
                  </div>
                  <span className="text-indigo-600 text-xs">View →</span>
                </Link>
              ) : (
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    {opponentLabel}
                  </div>
                  <div className="text-xs font-semibold text-slate-800">{candidate.opponentName}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <MetricCard label="Age" value={candidate.age?.toString() ?? "—"} source={eciSource} />
        <MetricCard label="Education" value={candidate.education ?? "—"} source={eciSource} />
        <MetricCard
          label="Assets"
          value={candidate.totalAssets ?? "—"}
          source={eciSource}
          accent
        />
        <MetricCard
          label="Cases"
          value={candidate.criminalCases.toString()}
          source={eciSource}
          warning={candidate.criminalCases > 0}
        />
      </div>

      <ProfileTimeline candidate={candidate} />

      <VerifiedRecordBlock
        profession={candidate.profession}
        liabilities={candidate.totalLiabilities}
        affidavitYear={candidate.affidavitYear}
        affidavitPdfUrl={candidate.affidavitPdfUrl}
        eciSource={eciSource}
        lastUpdated={candidate.lastUpdated}
      />

      <section>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          <h2 className="text-xs font-semibold text-slate-800 tracking-wide">Promises</h2>
          <span className="text-[10px] text-slate-400">{candidate.promises.length}</span>
        </div>

        {candidate.promises.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white py-8 text-center text-xs text-slate-400">
            No promises tracked yet.
          </div>
        ) : (
          <div className="space-y-2">
            {candidate.promises.map((p) => (
              <PromiseCard key={p.id} promise={p} />
            ))}
          </div>
        )}
      </section>

      <p className="text-center text-[10px] text-slate-400 leading-relaxed max-w-md mx-auto">
        Verified = official sources. Promises = tracked. Likes/comments = community only. No rankings.
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
    <div className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm">
      <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{label}</div>
      <div
        className={
          "mt-0.5 text-sm sm:text-base font-semibold leading-tight tracking-tight line-clamp-2 " +
          (warning ? "text-amber-600" : accent ? "text-emerald-600" : "text-slate-900")
        }
      >
        {value}
      </div>
      {source && <div className="mt-0.5 text-[9px] text-slate-400 leading-snug truncate">{source}</div>}
    </div>
  );
}
