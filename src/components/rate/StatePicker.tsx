"use client";

export default function StatePicker({ states, value, onChange, labelOf }: { states: string[]; value: string; onChange: (s: string) => void; labelOf?: (s: string) => string }) {
  return (
    <div className="inline-flex rounded-full border border-line bg-surface p-1 shadow-card" role="tablist">
      {states.map((s) => {
        const on = s === value;
        return (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(s)}
            className={"rounded-full px-4 py-1.5 text-sm font-semibold transition " + (on ? "bg-ink text-bg shadow-sm" : "text-muted hover:text-ink")}
          >
            {labelOf ? labelOf(s) : s}
          </button>
        );
      })}
    </div>
  );
}
