# Politica India — Production Build Plan

This branch turns the Tier 2A schema into the first database-backed application layer.

## Current implementation

- PostgreSQL/Prisma remains the canonical data store.
- Candidate read repository: `src/lib/db-candidates.ts`.
- Candidate API: `GET /api/candidates`.
- Candidate detail API: `GET /api/candidates/:id`.
- Entity search API: `GET /api/search?q=...`.
- Existing pilot data remains available as migration/fallback input.

## Environment

Set:

`DATABASE_URL=postgresql://...`

Then:

`npm run db:setup`

For production, prefer Prisma migrations over `db push` after the schema is stabilized.

## Data quality rule

A production record is not considered verified merely because it exists in Postgres. Material facts require provenance. The UI must distinguish:

1. Verified Record — official/primary evidence.
2. Tracked — documented claim or promise whose status is being monitored.
3. Community — user reactions and comments.

## Next ingestion milestones

1. ECI election-result registry.
2. ECI Form 26 affidavit registry.
3. Constituency master data.
4. Party registry and symbols.
5. Candidate identity reconciliation.
6. Promise/claim source registry.
7. Recurring source refresh jobs.
8. Conflict and correction workflow.

## Exit criterion

The pilot should be able to render candidate pages entirely from Postgres, with every material factual section linked to a Source or explicit pending-verification state.
