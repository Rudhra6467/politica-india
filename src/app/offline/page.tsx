import Link from "next/link";

export const metadata = { title: "Offline" };

export default function OfflinePage() {
  return (
    <div className="mx-auto max-w-md space-y-4 py-20 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">You are offline</h1>
      <p className="text-sm leading-relaxed text-slate-500">
        This page has not been saved on your device yet. Profiles you opened earlier are still available.
        Reconnect to see the latest sources and statuses.
      </p>
      <Link
        href="/"
        className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        Try the homepage
      </Link>
    </div>
  );
}
