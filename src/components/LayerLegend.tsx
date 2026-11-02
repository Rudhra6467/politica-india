import type { Dictionary } from "@/i18n";

/** Explains the information layers used across Politica India. */
export default function LayerLegend({ dict, compact = false }: { dict: Dictionary; compact?: boolean }) {
  const layers = [
    { dot: "bg-blue-600", title: dict.layers.verified, body: dict.layers.verifiedBody },
    { dot: "bg-amber-500", title: dict.layers.tracked, body: dict.layers.trackedBody },
    { dot: "bg-violet-500", title: dict.layers.community, body: dict.layers.communityBody },
  ];

  if (compact) {
    return (
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        {layers.map((l) => (
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
      {layers.map((l) => (
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
