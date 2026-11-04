import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCandidateById, pilotCandidates, resultOf } from "@/data/pilot-candidates";
import { promiseStatusCounts } from "@/lib/stats";
import { LOCALES, getDictionary, isLocale, type Locale } from "@/i18n";
import { localeHref } from "@/i18n/href";
import StarRating from "@/components/rate/StarRating";
import Collapsible from "@/components/rate/Collapsible";
import CandidateAvatar from "@/components/CandidateAvatar";
import PartyBadge from "@/components/PartyBadge";
import PromiseCard, { StatusPill } from "@/components/PromiseCard";
import ProfileTimeline from "@/components/ProfileTimeline";
import VerifiedRecordBlock from "@/components/VerifiedRecordBlock";
import ShareButton from "@/components/ShareButton";

type Params = Promise<{ lang: string; id: string }>;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => pilotCandidates.map((c) => ({ lang, id: c.id })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id, lang } = await params;
  const c = getCandidateById(id);
  const t = getDictionary(isLocale(lang) ? lang : "en");
  if (!c) return { title: t.notFound.title };
  const role = c.electionType === "Lok Sabha" ? t.common.mp : t.common.mla;
  const desc = `${c.name} (${c.partyAbbr}), ${role} · ${c.constituency}, ${c.state}. ECI Form 26 ${c.affidavitYear ?? c.electionYear}: ${t.profile.assets} ${c.totalAssets ?? "—"}, ${t.profile.cases} ${c.criminalCases}. ${t.profile.trackedPromises}: ${c.promises.length}.`;
  return {
    title: `${c.name} · ${c.partyAbbr} · ${c.constituency}`,
    description: desc,
    alternates: {
      languages: { en: `/candidates/${c.id}`, te: `/te/candidates/${c.id}`, hi: `/hi/candidates/${c.id}`, "x-default": `/candidates/${c.id}` },
    },
    openGraph: { title: `${c.name} · Politica India`, description: desc, type: "profile" },
  };
}

export default async function CandidatePage({ params, searchParams }: { params: Params; searchParams: Promise<{ from?: string }> }) {
  const { id, lang } = await params;
  const { from } = await searchParams;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const t = getDictionary(locale);
  const h = (p: string) => localeHref(locale, p);
  const candidate = getCandidateById(id);
  if (!candidate) notFound();

  const role = candidate.electionType === "Lok Sabha" ? t.common.mp : t.common.mla;
  const won = resultOf(candidate) === "won";
  const sourceYear = candidate.affidavitYear ?? String(candidate.electionYear);
  const eciSource = "ECI Form 26 · " + sourceYear;
  const statusCounts = promiseStatusCounts(candidate);

  const backHref = from && from.startsWith("/") ? from : h("/candidates");
  const backLabel = from && from.includes("/party/") ? t.profile.backParty : t.profile.backAll;

  const opponent = candidate.opponentId ? getCandidateById(candidate.opponentId) : undefined;
  const opponentHref = candidate.opponentId ? h(`/candidates/${candidate.opponentId}?from=${encodeURIComponent(h("/candidates/" + candidate.id))}`) : null;
  const hasOpponent = Boolean(candidate.opponentName || candidate.opponentId);
  const partyHref = h(`/party/${candidate.partyAbbr}?state=${encodeURIComponent(candidate.state)}`);

  const peers = pilotCandidates
    .filter((c) => c.id !== candidate.id && c.partyAbbr === candidate.partyAbbr && c.state === candidate.state)
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99))
    .slice(0, 4);

  return (
    <div className="space-y-4 pb-10">
      <nav className="flex items-center justify-between gap-2 text-sm" aria-label="Breadcrumb">
        <Link href={backHref} className="inline-flex items-center gap-1 text-muted transition hover:text-ink">
          <span aria-hidden>←</span> {backLabel}
        </Link>
        <ShareButton title={`${candidate.name} · Politica India`} text={`${candidate.name}, ${candidate.partyAbbr} — ${candidate.constituency}`} />
      </nav>

      <section className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4 sm:gap-6">
            <CandidateAvatar name={candidate.name} photoUrl={candidate.photoUrl} size="profile" partyAbbr={candidate.partyAbbr} priority />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Link href={partyHref} className="transition hover:opacity-80" title={candidate.party}>
                  <PartyBadge abbr={candidate.partyAbbr} size="sm" />
                </Link>
                <span className="text-[11px] font-medium uppercase tracking-wide text-muted">
                  {role} · {candidate.electionType} {candidate.electionYear}
                </span>
                <span className={"rounded-full border px-1.5 py-0.5 text-[11px] font-medium " + (won ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-300" : "border-line bg-surface-2 text-muted")}>
                  {won ? t.profile.elected : t.profile.lost}
                </span>
              </div>

              <h1 className="mt-1 text-xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">{candidate.name}</h1>
              <p className="mt-1 text-sm text-muted">
                {candidate.constituency}, {candidate.state}
                <span className="text-faint"> · </span>
                <Link href={partyHref} className="font-medium text-accent hover:text-accent-bright">
                  {candidate.party}
                </Link>
              </p>

              <div className="mt-3">
                <StarRating targetKey={`candidate:${candidate.id}`} />
              </div>
            </div>

            {hasOpponent && (
              <div className="hidden w-[24%] max-w-[11rem] shrink-0 flex-col justify-center self-stretch border-l border-line/60 pl-4 sm:flex">
                <OpponentBlock
                  label={won ? t.profile.wonAgainst : t.profile.lostTo}
                  name={candidate.opponentName ?? opponent?.name ?? ""}
                  party={candidate.opponentParty ?? opponent?.partyAbbr}
                  margin={candidate.marginVotes}
                  marginLabel={t.profile.voteMargin}
                  sourceLabel={t.profile.eciResult}
                  href={opponentHref}
                  align="right"
                />
              </div>
            )}
          </div>

          {hasOpponent && (
            <div className="mt-3 border-t border-line/60 pt-3 sm:hidden">
              <OpponentBlock
                label={won ? t.profile.wonAgainst : t.profile.lostTo}
                name={candidate.opponentName ?? opponent?.name ?? ""}
                party={candidate.opponentParty ?? opponent?.partyAbbr}
                margin={candidate.marginVotes}
                marginLabel={t.profile.voteMargin}
                sourceLabel={t.profile.eciResult}
                href={opponentHref}
              />
            </div>
          )}
        </div>
      </section>

      {candidate.officeStatus && (
        <section aria-label={t.profile.officeChanged} className="rounded-2xl border border-amber-500/35 bg-amber-500/15 px-4 py-3 shadow-card">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            <h2 className="text-xs font-semibold tracking-wide text-amber-300">{t.profile.officeChanged}</h2>
            <span className="text-[10px] tabular text-amber-300">
              {t.profile.asOf} {candidate.officeStatus.asOf}
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-amber-300">{candidate.officeStatus.summary}</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {candidate.officeStatus.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-accent hover:underline">
                  {s.publisher} · {s.date} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Collapsible title={t.rate.facts} hint={eciSource}>
      <section aria-labelledby="verified-heading">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          <h2 id="verified-heading" className="text-xs font-semibold tracking-wide text-ink">
            {t.profile.verifiedRecord}
          </h2>
          <span className="text-[10px] text-muted">{eciSource}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          <MetricCard label={t.profile.age} value={candidate.age?.toString() ?? "—"} />
          <MetricCard label={t.profile.education} value={candidate.education ?? "—"} />
          <MetricCard label={t.profile.assets} value={candidate.totalAssets ?? "—"} accent />
          <MetricCard label={t.profile.cases} value={candidate.criminalCases.toString()} warning={candidate.criminalCases > 0} hint={candidate.criminalCases > 0 ? t.profile.casesHint : undefined} />
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
      </Collapsible>

      <section aria-labelledby="promises-heading">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <h2 id="promises-heading" className="text-xs font-semibold tracking-wide text-ink">
              {t.profile.trackedPromises}
            </h2>
            <span className="text-[10px] tabular text-muted">{candidate.promises.length}</span>
          </div>
          {statusCounts.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {statusCounts.map((s) => (
                <span key={s.status} className="inline-flex items-center gap-1">
                  <StatusPill status={s.status} size="sm" />
                  <span className="text-[10px] tabular text-muted">×{s.count}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {candidate.promises.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-surface py-8 text-center text-xs text-muted">{t.profile.noPromises}</div>
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
            <h2 id="peers-heading" className="text-xs font-semibold tracking-wide text-ink">
              {t.profile.moreFrom} {candidate.partyAbbr} · {candidate.state}
            </h2>
            <Link href={partyHref} className="text-xs font-medium text-accent hover:text-accent-bright">
              {t.profile.partyPage}
            </Link>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {peers.map((p) => (
              <li key={p.id}>
                <Link
                  href={h(`/candidates/${p.id}?from=${encodeURIComponent(h("/candidates/" + candidate.id))}`)}
                  className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-2.5 py-2 shadow-card transition hover:border-accent/60"
                >
                  <CandidateAvatar name={p.name} photoUrl={p.photoUrl} size="sm" />
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-ink">{p.name}</span>
                    <span className="block truncate text-[10px] text-muted">{p.constituency}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mx-auto max-w-md text-center text-[10px] leading-relaxed text-muted">{t.profile.footnote}</p>
    </div>
  );
}

function OpponentBlock({
  label, name, party, margin, marginLabel, sourceLabel, href, align = "left",
}: {
  label: string; name: string; party?: string; margin?: number; marginLabel: string; sourceLabel: string; href: string | null; align?: "left" | "right";
}) {
  const inner = (
    <>
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted">{label}</div>
      <div className={"mt-0.5 text-sm font-semibold leading-snug " + (href ? "text-accent" : "text-ink")}>
        {name}
        {href ? " →" : ""}
      </div>
      <div className="text-[11px] tabular text-muted">
        {party ? party : ""}
        {party && margin != null ? " · " : ""}
        {margin != null ? `${margin.toLocaleString("en-IN")} ${marginLabel}` : ""}
      </div>
      <div className="text-[10px] text-muted">{sourceLabel}</div>
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

function MetricCard({ label, value, accent, warning, hint }: { label: string; value: string; accent?: boolean; warning?: boolean; hint?: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-card" title={hint}>
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted">{label}</div>
      <div className={"mt-0.5 line-clamp-2 text-sm font-semibold leading-tight tracking-tight sm:text-base " + (warning ? "text-amber-300" : accent ? "text-emerald-300" : "text-ink")}>
        {value}
      </div>
    </div>
  );
}
