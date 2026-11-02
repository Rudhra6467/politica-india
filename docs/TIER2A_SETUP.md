# Tier 2A — Database setup

## Goal

Load pilot candidates into Postgres with **stable IDs** (`ap-tdp-01`, etc.) so profile URLs stay valid.

## Steps

1. Create a Postgres database (Neon, Supabase, or local).
2. Copy `.env.example` → `.env` and set:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?schema=public"
```

3. From the repo root:

```bash
npm install
npm run db:setup
```

That runs `prisma generate` → `db push` → `seed`.

4. Confirm seed counts in the terminal. Expected for the current pilot: 2 states, 6 parties, 27 constituencies, 29 candidates, 29 affidavits, 35 promises, 71 sources, 71 promise-source links, 60 events. Re-running the seed is idempotent.

5. Optional: `npm run db:studio` to browse rows.

## Local Postgres without Docker

If you have the PostgreSQL 16 binaries but no service, a throwaway cluster works:

```bash
initdb -D ./pgdata -A trust -U postgres
pg_ctl -D ./pgdata -o '-p 5433' start
export DATABASE_URL="postgresql://postgres@localhost:5433/politica?schema=public"
createdb -h localhost -p 5433 -U postgres politica
npm run db:setup
```

## Important

- UI still uses `src/data/pilot-candidates.ts` until Tier **2B**.
- `src/lib/prisma.ts` is ready for server-side use.
- `DATA_SOURCE_MODE` in `src/lib/data-source.ts` stays `"pilot"` until pages are migrated.

## Vercel

Add `DATABASE_URL` in Project → Settings → Environment Variables before relying on DB in production. Build can still succeed without it while the app is pilot-backed.
