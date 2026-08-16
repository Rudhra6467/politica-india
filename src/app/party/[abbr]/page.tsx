import { Suspense } from "react";
import PartyContent from "./PartyContent";

export default async function PartyPage({
  params,
}: {
  params: Promise<{ abbr: string }>;
}) {
  const { abbr } = await params;

  return (
    <Suspense fallback={<div className="py-12 text-center text-slate-400">Loading...</div>}>
      <PartyContent abbr={abbr} />
    </Suspense>
  );
}
