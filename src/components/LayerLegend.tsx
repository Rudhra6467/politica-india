/**
 * Explains the information layers used across Politica India.
 */

const LAYERS = [
  {
    dot: "bg-blue-600",
    title: "Verified record",
    body: "Facts from official sources, mainly Election Commission of India Form 26 affidavits. Always attributed with year.",
  },
  {
    dot: "bg-amber-500",
    title: "Tracked promises",
    body: "Commitments we follow, each with a source, a status and a last-checked date. “Unable to verify” beats guessing.",
  },
  {
    dot: "bg-violet-500",
    title: "Community",
    body: "Likes, dislikes and comments from citizens. Reaction only. Never converted into a fact, score or ranking.",
  },
];

export default function LayerLegend({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        {LAYERS.map((l) => (
          <span key={l.title} className="inline-flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${l.dot}`} />
            {l.title}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-2.5 sm:grid-cols-3">
      {LAYERS.map((l) => (
        <div key={l.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${l.dot}`} />
            <h3 className="text-sm font-semibold text-slate-900">{l.title}</h3>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{l.body}</p>
        </div>
      ))}
    </div>
  );
}
