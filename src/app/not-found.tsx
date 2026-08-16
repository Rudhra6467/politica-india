import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Page not found</h1>
      <p className="text-sm text-slate-500 max-w-sm mx-auto">
        This page does not exist, or this candidate is not in the pilot set yet.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
        >
          Home
        </Link>
        <Link
          href="/candidates"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
        >
          All candidates
        </Link>
        <Link
          href="/methodology"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          Methodology
        </Link>
      </div>
    </div>
  );
}
