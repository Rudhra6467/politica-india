# Politica India

India-only digital accountability platform for elected representatives and candidates.

## Core Idea

- Candidate profiles with official ECI Form 26 affidavit data (assets, criminal cases, education) + link to original PDF
- **Promises / Announcements** as first-class feature with separate like/dislike counts and comments
- Basic users (OTP/email): likes & dislikes only
- Stronger verified users: can also comment
- Neutral posture: reflect claims and citizen reaction. No overall rankings or good/bad labels.

## Stack

- Next.js 15 (App Router) + TypeScript
- Prisma + PostgreSQL
- Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

The site runs entirely on the pilot dataset in `src/data/pilot-candidates.ts`; no database is needed.
For the Tier 2A database scaffold, see `docs/TIER2A_SETUP.md`.

## Checks

```bash
npm run check        # lint + typecheck + data integrity
npm run check:data   # data integrity only (unique IDs, opponents resolve, status honesty)
```

## Current state

- Pilot: 29 representatives across Andhra Pradesh and Telangana, 35 tracked promises
- Global search, filterable list, pre-rendered profiles and party pages
- Roadmap and phase status: `docs/ROADMAP.md`

## Data Rules

- Source of truth for declarations: Election Commission of India Affidavit Portal
- Always attribute and link to original Form 26 PDFs
- Promises are manually curated for the MVP with source links

## Legal Posture

- Public domain election data with attribution
- DPDP compliant (minimal data, consent, deletion rights)
- Prefer offline Aadhaar e-KYC patterns
- IT Act intermediary safe-harbour practices
