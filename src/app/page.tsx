export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Digital Accountability for<br />
          <span className="text-indigo-600">Elected Representatives</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600">
          View official affidavits, track campaign promises, and see public reaction.
          Built for India. Neutral by design.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <a
            href="#"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition"
          >
            Browse Candidates
          </a>
          <a
            href="#"
            className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            How it works
          </a>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-lg">Official Affidavits</h3>
          <p className="mt-2 text-sm text-slate-600">
            Assets, criminal cases, education and more from ECI Form 26 with direct links to original PDFs.
          </p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-lg">Promise Tracking</h3>
          <p className="mt-2 text-sm text-slate-600">
            Each announcement tracked separately with status and public like/dislike counts.
          </p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-lg">Verified Comments</h3>
          <p className="mt-2 text-sm text-slate-600">
            Basic users can like/dislike. Stronger verified users can comment on promises.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        <strong>MVP Status:</strong> This is an early public build. Data is being seeded for a pilot set of candidates.
        All affidavit data is attributed to the Election Commission of India.
      </section>
    </div>
  );
}
