import { NextResponse, type NextRequest } from "next/server";
import { isLive, communityMissing } from "./env";

export function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, { ...init, headers: { "Cache-Control": "no-store", ...(init?.headers ?? {}) } });
}

export function error(status: number, code: string, message?: string) {
  return json({ error: code, message }, { status });
}

/** Guard for every community API route: feature flag, JSON body, same-origin. */
export function guard(req: NextRequest, opts: { requireJson?: boolean } = {}): NextResponse | null {
  if (!isLive()) {
    return json(
      { error: "community_disabled", message: "Community features are not enabled on this deployment.", missing: communityMissing() },
      { status: 503 },
    );
  }
  if (opts.requireJson) {
    const ct = req.headers.get("content-type") ?? "";
    if (!ct.includes("application/json")) return error(415, "json_required");
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host) {
      try {
        if (new URL(origin).host !== host) return error(403, "bad_origin");
      } catch {
        return error(403, "bad_origin");
      }
    }
  }
  return null;
}

export function clientIp(req: NextRequest): string | null {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}

export function isValidTargetKey(key: string): boolean {
  return /^(candidate|promise):[a-z0-9-]{3,40}$/.test(key);
}
