import Link from "next/link";

export const metadata = {
  title: "How Politica Works · Methodology",
  description:
    "How Politica India sources, tracks, and presents political information. What we do and what we do not do.",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
        >
          <span aria-hidden>←</span> Home
        </Link>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          How Politica Works
        </h1>
        <p className="mt-2 text-slate-600 text-sm leading-relaxed">
          Politica India is a source-backed political information system. It is
          designed to make public records and tracked claims easier to
          understand — not to tell anyone how to vote.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-900">Three layers of information</h2>
        <div className="space-y-2.5">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <h3 className="font-semibold text-slate-800 text-sm">Verified Record</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Facts from official or public records — primarily ECI Form 26
              affidavits (assets, liabilities, education, declared criminal cases),
              with source attribution and links where available.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <h3 className="font-semibold text-slate-800 text-sm">Tracked</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Promises and announcements with status and evidence notes.
              “Unable to verify” is preferred over unsupported certainty.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              <h3 className="font-semibold text-slate-800 text-sm">Community</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Likes and dislikes as reaction only — never an official fact, score,
              or ranking of candidates.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-slate-900">Pilot engagement (current site)</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          On this pilot, like and dislike counts are <strong>illustrative seeds</strong> so
          the interface can be reviewed before real accounts exist. They are derived
          from simple pilot rules (visibility / seat type), not from live citizen votes
          and not from an overall “Politica rating.” When real users ship, these seeds
          will be replaced by actual community reaction.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-slate-900">Photos & party marks</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Candidate photos use public-domain or clearly licensed sources (e.g.
          Wikimedia Commons) when available; otherwise initials placeholders.
          Party marks are simplified ECI-style election symbols for identification
          only — not official party trademark art.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-slate-900">What Politica does not do</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 leading-relaxed">
          <li>Does not endorse or oppose any candidate or party.</li>
          <li>Does not assign overall performance scores or rankings.</li>
          <li>Does not treat allegations as convictions.</li>
          <li>Does not convert likes into factual claims.</li>
          <li>Does not sell candidate visibility or store Aadhaar numbers.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-slate-900">Sources</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Primary declarations: Election Commission of India (Form 26), often via
          ADR / MyNeta with ECI as origin. Results from ECI publications. Promises
          from public statements with source and last-checked where possible.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-slate-900">Pilot status</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Focused pilot: Andhra Pradesh and Telangana. Depth before nationwide thin
          coverage. Real user accounts come after pilot completeness.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          Politica should make political information easier to understand, not
          make political decisions easier to outsource.
        </p>
      </section>
    </div>
  );
}
