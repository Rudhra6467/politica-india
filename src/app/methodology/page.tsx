import Link from "next/link";

export const metadata = {
  title: "How Politica Works · Methodology",
  description:
    "How Politica India sources, tracks, and presents political information. What we do and what we do not do.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-16">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
        >
          <span aria-hidden>←</span> Home
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
          How Politica Works
        </h1>
        <p className="mt-2 text-slate-600 leading-relaxed">
          Politica India is a source-backed political information system. It is
          designed to make public records and tracked claims easier to
          understand — not to tell anyone how to vote.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Three layers of information</h2>
        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <h3 className="font-semibold text-slate-800">Verified Record</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Facts drawn from official or public records — primarily Election
              Commission of India Form 26 affidavits (assets, liabilities,
              education, declared criminal cases). These are presented with
              source attribution and, where available, a link to the original
              record.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <h3 className="font-semibold text-slate-800">Tracked</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Promises and announcements attributed to candidates or parties,
              with status and evidence notes when available. Status can include
              In progress, Reported completed, Unable to verify, Evidence
              conflicting, and others. “Unable to verify” is a legitimate
              outcome — we prefer it over unsupported claims.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              <h3 className="font-semibold text-slate-800">Community</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Likes, dislikes, and comments from users. This is citizen reaction
              only. It is never treated as an official fact, a score, or a
              ranking of candidates.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Timeline</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Each candidate profile includes a short timeline built from election
          outcomes, Form 26 affidavits, and tracked announcements. It is a
          reading aid — not a complete political biography. When the evidence
          layer is fully wired, timeline entries will point at stored events and
          sources rather than only pilot fields.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">What Politica does</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 leading-relaxed">
          <li>Surfaces public election affidavit data with clear attribution.</li>
          <li>Tracks selected promises and announcements against available evidence.</li>
          <li>Shows election outcomes (won / lost) and opponents where data is available.</li>
          <li>Separates verified records from community reaction visually and in copy.</li>
          <li>Prefers “Unable to verify” when evidence is insufficient.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">What Politica does not do</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 leading-relaxed">
          <li>Does not endorse or oppose any candidate or party.</li>
          <li>Does not assign overall performance scores or rankings.</li>
          <li>Does not treat allegations as convictions.</li>
          <li>Does not convert likes or comments into factual claims.</li>
          <li>Does not sell candidate visibility or sponsored profiles.</li>
          <li>Does not store Aadhaar numbers or sell voter-level opinion data.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Sources</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Primary source for declarations: Election Commission of India (Form 26
          affidavits), often accessed via public compilations such as ADR /
          MyNeta with ECI cited as origin. Election results are drawn from ECI
          result publications and reputable public reporting. Promise tracking
          uses public statements and reported progress; each item should carry
          source and last-checked where possible.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Party marks shown in the product are simplified election-symbol style
          graphics for identification only, inspired by ECI ballot symbols — not
          official party trademark artwork.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Pilot status</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The current site is a focused pilot (primarily Andhra Pradesh and
          Telangana). Coverage is incomplete by design. Some fields remain under
          verification; we expand only when source quality is acceptable.
          Depth in a few states comes before thin coverage nationwide.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          Politica should make political information easier to understand, not
          make political decisions easier to outsource.
        </p>
      </section>

      <p className="text-xs text-slate-400 text-center">
        Questions or corrections: use in-product reporting as it becomes
        available, or contact the project maintainers via the repository.
      </p>
    </div>
  );
}
