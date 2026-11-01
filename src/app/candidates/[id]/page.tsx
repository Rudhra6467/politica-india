import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateById, pilotCandidates, resultOf } from "@/data/pilot-candidates";
import { promiseStatusCounts } from "@/lib/stats";
import LikeDislikeButtons from "@/components/LikeDislikeButtons";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";
import PromiseCard, { StatusPill } from "@/components/PromiseCard";
import ProfileTimeline from "@/components/ProfileTimeline";
import VerifiedRecordBlock from "@/components/VerifiedRecordBlock";
import ShareButton from "@/components/ShareButton";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return pilotCandidates.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const c = getCandidateById(id);
  if (!c) return { title: "Not found" };
  const role = c.electionType === "Lok Sabha" ? "MP" : "MLA";
  const desc = `${c.name} (${c.partyAbbr}), ${role} candidate for ${c.constituency}, ${c.state}. ECI Form 26 ${c.affidavitYear ?? c.electionYear}: assets ${c.totalAssets ?? "n/a"}, ${c.criminalCases} declared case${c.criminalCases === 1 ? "" : "s"}. ${c.promises.length} tracked promise${c.promises.length === 1 ? "" : "s"}.`;
  return {
    title: `${c.name} · ${c.partyAbbr} · ${c.constituency}`,
    description: desc,
    openGraph: { title: `${c.name} · Politica India`, description: desc, type: "profile" },
  };
}

export default async function CandidatePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;
  const candidate = getCandidateById(id);
  if (!candidate) notFound();

  const role = candidate.electionType === "Lok Sabha" ? "MP" : "MLA";
  const won = resultOf(candidate) === "won";
  const sourceYear = candidate.affidavitYear ?? String(candidate.electionYear);
  const eciSource = "ECI Form 26 · " + sourceYear;
  const statusCounts = promiseStatusCounts(candidate);

  const backHref = from && from.startsWith("/") ? from : "/candidates";
  const backLabel = from && from.startsWith("/party/") ? "Back to party" : "All representatives";

  const opponent = candidate.opponentId ? getCandidateById(candidate.opponentId) : undefined;
  const opponentHref = candidate.opponentId
    ? `/candidates/${candidate.opponentId}?from=${encodeURIComponent("/candidates/" + candidate.id)}`
    : null;
  const hasOpponent = Boolean(candidate.opponentName || candidate.opponentId);
  const partyHref = `/party/${candidate.partyAbbr}?state=${encodeURIComponent(candidate.state)}`;

  const peers = pilotCandidates
    .filter((c) => c.id !== candidate.id && c.partyAbbr === candidate.partyAbbr && c.state === candidate.state)
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99))
    .slice(0, 4);

  return (
    <div className="space-y-4 pb-10">
      <nav className="flex items-center justify-between gap-2 text-sm" aria-label="Breadcrumb">
        <Link href={backHref} className="inline-flex items-center gap-1 text-slate-500 transition hover:text-slate-800">
          <span aria-hidden>←</span> {backLabel}
        </Link>
        <ShareButton title={`${candidate.name} · Politica India`} text={`${candidate.name}, ${candidate.partyAbbr} — ${candidate.constituency}`} />
      </nav>

      {/* Identity */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <CandidateAvatar
              name={candidate.name}
              photoUrl={candidate.photoUrl}
              size="profile"
              partyAbbr={candidate.partyAbbr}
              priority
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Link href={partyHref} className="transition hover:opacity-80" title={candidate.party}>
                  <PartyBadge abbr={candidate.partyAbbr} size="sm" />
                </Link>
                <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {role} · {candidate.electionType} {candidate.electionYear}
                </span>
                <span
                  className={
                    "rounded-full border px-1.5 py-0.5 text-[11px] font-medium " +
                    (won
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-100 text-slate-600")
                  }
                >
                  {won ? "Elected" : "Lost"}
                </span>
              </div>

              <h1 className="mt-1 text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                {candidate.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {candidate.constituency}, {candidate.state}
                <span className="text-slate-300"> · </span>
                <Link href={partyHref} className="font-medium text-indigo-600 hover:text-indigo-800">
                  {candidate.party}
                </Link>
              </p>

              <div className="mt-3">
                <LikeDislikeButtons id={candidate.id} initialLikes={candidate.likes} initialDislikes={candidate.dislikes} />
              </div>
            </div>

            {hasOpponent && (
              <div className="hidden w-[24%] max-w-[11rem] shrink-0 flex-col justify-center self-stretch border-l border-slate-100 pl-4 sm:flex">
                <OpponentBlock
                  label={won ? "Won against" : "Lost to"}
                  name={candidate.opponentName ?? opponent?.name ?? ""}
                  party={candidate.opponentParty ?? opponent?.partyAbbr}
                  margin={candidate.marginVotes}
                  href={opponentHref}
                  align="right"
                />
              </div>
            )}
          </div>

          {hasOpponent && (
            <div className="mt-3 border-t border-slate-100 pt-3 sm:hidden">
              <OpponentBlock
                label={won ? "Won against" : "Lost to"}
                name={candidate.opponentName ?? opponent?.name ?? ""}
                party={candidate.opponentParty ?? opponent?.partyAbbr}
                margin={candidate.marginVotes}
                href={opponentHref}
              />
            </div>
          )}
        </div>
      </section>

      {/* Verified metrics */}
      <section aria-labelledby="verified-heading">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          <h2 id="verified-heading" className="text-xs font-semibold tracking-wide text-slate-800">
            Verified record
          </h2>
          <span className="text-[10px] text-slate-400">{eciSource}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <MetricCard label="Age" value={candidate.age?.toString() ?? "—"} />
          <MetricCard label="Education" value={candidate.education ?? "—"} />
          <MetricCard label="Declared assets" value={candidate.totalAssets ?? "—"} accent />
          <MetricCard
            label="Declared cases"
            value={candidate.criminalCases.toString()}
            warning={candidate.criminalCases > 0}
            hint={candidate.criminalCases > 0 ? "Pending cases as self-declared. Allegations are not convictions." : undefined}
          />
        </div>
      </section>

      <VerifiedRecordBlock
        profession={candidate.profession}
        liabilities={candidate.totalLiabilities}
        affidavitYear={candidate.affidavitYear}
        affidavitPdfUrl={candidate.affidavitPdfUrl}
        eciSource={eciSource}
        lastUpdated={candidate.lastUpdated}
      />

      <ProfileTimeline candidate={candidate} />

      {/* Promises */}
      <section aria-labelledby="promises-heading">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <h2 id="promises-heading" className="text-xs font-semibold tracking-wide text-slate-800">
              Tracked promises
            </h2>
            <span className="text-[10px] tabular text-slate-400">{candidate.promises.length}</span>
          </div>
          {statusCounts.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {statusCounts.map((s) => (
                <span key={s.status} className="inline-flex items-center gap-1">
                  <StatusPill status={s.status} size="sm" />
                  <span className="text-[10px] tabular text-slate-500">×{s.count}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {candidate.promises.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-8 text-center text-xs text-slate-400">
            No promises tracked yet for this candidate.
          </div>
        ) : (
          <div className="space-y-2.5">
            {candidate.promises.map((p) => (
              <PromiseCard key={p.id} promise={p} />
            ))}
          </div>
        )}
      </section>

      {peers.length > 0 && (
        <section aria-labelledby="peers-heading">
          <div className="mb-2 flex items-center justify-between">
            <h2 id="peers-heading" className="text-xs font-semibold tracking-wide text-slate-800">
              More from {candidate.partyAbbr} · {candidate.state}
            </h2>
            <Link href={partyHref} className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
              Party page →
            </Link>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {peers.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/candidates/${p.id}?from=${encodeURIComponent("/candidates/" + candidate.id)}`}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-card transition hover:border-indigo-200"
                >
                  <CandidateAvatar name={p.name} photoUrl={p.photoUrl} size="sm" />
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-slate-900">{p.name}</span>
                    <span className="block truncate text-[10px] text-slate-500">{p.constituency}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mx-auto max-w-md text-center text-[10px] leading-relaxed text-slate-400">
        Verified = official sources. Promises = tracked claims. Likes and comments = community reaction only. No
        rankings, no scores.
      </p>
    </div>
  );
}

function OpponentBlock({
  label,
  name,
  party,
  margin,
  href,
  align = "left",
}: {
  label: string;
  name: string;
  party?: string;
  margin?: number;
  href: string | null;
  align?: "left" | "right";
}) {
  const inner = (
    <>
      <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{label}</div>
      <div className={"mt-0.5 text-sm font-semibold leading-snug " + (href ? "text-indigo-700" : "text-slate-800")}>
        {name}
        {href ? " →" : ""}
      </div>
      <div className="text-[11px] tabular text-slate-500">
        {party ? party : ""}
        {party && margin != null ? " · " : ""}
        {margin != null ? `${margin.toLocaleString("en-IN")} vote margin` : ""}
      </div>
      <div className="text-[10px] text-slate-400">ECI election result</div>
    </>
  );
  const cls = align === "right" ? "text-right" : "";
  return href ? (
    <Link href={href} className={`block ${cls} hover:opacity-90`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function MetricCard({
  label,
  value,
  accent,
  warning,
  hint,
}: {
  label: string;
  value: string;
  accent?: boolean;
  warning?: boolean;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-card" title={hint}>
      <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{label}</div>
      <div
        className={
          "mt-0.5 line-clamp-2 text-sm font-semibold leading-tight tracking-tight sm:text-base " +
          (warning ? "text-amber-700" : accent ? "text-emerald-700" : "text-slate-900")
        }
      >
        {value}
      </div>
    </div>
  );
}
