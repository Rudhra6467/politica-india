"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { useCommunity, postJson } from "@/components/community/CommunityProvider";

type Row = { id: string; targetKey: string; body: string; status: string; createdAt: string; author: string; reports: number };

export default function ModerationQueue() {
  const { href } = useLocale();
  const { mode, user, loaded, openSignIn } = useCommunity();
  const [status, setStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">("PENDING");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/comments?status=${status}`, { credentials: "same-origin" });
    if (!res.ok) {
      setErr(res.status === 403 ? "Admin access required." : res.status === 401 ? "Sign in required." : "Could not load.");
      setRows([]);
      return;
    }
    setErr(null);
    setRows(((await res.json()) as { comments: Row[] }).comments);
  }, [status]);

  useEffect(() => {
    if (mode === "live" && loaded && user?.isAdmin) load();
  }, [mode, loaded, user?.isAdmin, load]);

  const act = async (id: string, action: "approve" | "reject" | "ban") => {
    if (action === "ban" && !confirm("Ban this user and reject all their pending comments?")) return;
    const r = await postJson("/api/admin/comments", { id, action });
    if (r.ok) setRows((rs) => (rs ?? []).filter((x) => x.id !== id));
  };

  if (mode !== "live") return <p className="py-16 text-center text-sm text-slate-500">Community features are not enabled on this deployment.</p>;
  if (!loaded) return <p className="py-16 text-center text-sm text-slate-500">…</p>;
  if (!user)
    return (
      <div className="py-16 text-center">
        <button type="button" onClick={openSignIn} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
          Sign in
        </button>
      </div>
    );
  if (!user.isAdmin) return <p className="py-16 text-center text-sm text-slate-500">Admin access required.</p>;

  const target = (key: string) => {
    const [type, id] = key.split(":");
    return type === "promise" ? href(`/p/${id}`) : href(`/candidates/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Moderation</h1>
          <p className="text-sm text-slate-500">Comments appear publicly only after approval. Most-reported first.</p>
        </div>
        <div className="flex rounded-xl border border-slate-200 bg-white p-0.5 text-xs">
          {(["PENDING", "APPROVED", "REJECTED"] as const).map((s) => (
            <button key={s} type="button" onClick={() => setStatus(s)} className={"rounded-lg px-3 py-1.5 font-medium " + (status === s ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50")}>
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>
      {err && <p className="text-sm text-rose-600">{err}</p>}
      {rows === null ? (
        <p className="text-sm text-slate-500">…</p>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-white py-10 text-center text-sm text-slate-500">Nothing here.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => (
            <li key={r.id} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-card">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-medium text-slate-800">{r.author}</span>
                <span>·</span>
                <Link href={target(r.targetKey)} className="text-indigo-600 hover:underline">
                  {r.targetKey}
                </Link>
                <span>·</span>
                <span>{new Date(r.createdAt).toLocaleString("en-IN")}</span>
                {r.reports > 0 && <span className="rounded bg-rose-100 px-1.5 py-0.5 font-medium text-rose-700">{r.reports} reports</span>}
              </div>
              <p className="mt-1.5 text-sm text-slate-800">{r.body}</p>
              <div className="mt-2 flex gap-2 text-xs">
                {status !== "APPROVED" && (
                  <button type="button" onClick={() => act(r.id, "approve")} className="rounded-lg bg-emerald-600 px-3 py-1.5 font-medium text-white hover:bg-emerald-700">
                    Approve
                  </button>
                )}
                {status !== "REJECTED" && (
                  <button type="button" onClick={() => act(r.id, "reject")} className="rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50">
                    Reject
                  </button>
                )}
                <button type="button" onClick={() => act(r.id, "ban")} className="ml-auto rounded-lg px-3 py-1.5 font-medium text-rose-600 hover:bg-rose-50">
                  Ban user
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
