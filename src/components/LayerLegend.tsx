/**
 * Explains the information layers used across Politica India.
 */

export default function LayerLegend({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-4 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          Verified
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Tracked
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
        How to read this information
      </div>
      <div className="space-y-2.5 text-sm">
        <div className="flex gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
          <div>
            <div className="font-medium text-slate-800">Verified Record</div>
            <div className="text-slate-500 text-xs">
              From authoritative sources (mainly Election Commission of India). Always attributed.
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
          <div>
            <div className="font-medium text-slate-800">Tracked / Reported</div>
            <div className="text-slate-500 text-xs">
              Promises and announcements we are following. Includes source, status and last-checked date when available.
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
          <div>
            <div className="font-medium text-slate-800">Community</div>
            <div className="text-slate-500 text-xs">
              Likes, dislikes and comments from users. This is public reaction, not official information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
