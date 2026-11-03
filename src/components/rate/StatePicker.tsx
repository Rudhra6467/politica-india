"use client";

export default function StatePicker({ states, value, onChange, labelOf }: { states: string[]; value: string; onChange: (s: string) => void; labelOf?: (s: string) => string }) {
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-card" role="tablist">
      {states.map((s) => {
        const on = s === value;
        return (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(s)}
            className={"rounded-full px-4 py-1.5 text-sm font-semibold transition " + (on ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900")}
          >
            {labelOf ? labelOf(s) : s}
          </button>
        );
      })}
    </div>
  );
}
