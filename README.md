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

## Aggressive Timeline (Solo)

- **Week 1**: Scaffold + data models + seed pilot candidates & promises
- **Week 2**: Profiles + like/dislike interaction + public deploy
- **Week 3**: Verification lite + comments + basic moderation
- **Week 4**: Polish, more data, public MVP

## Getting Started

```bash
npm install
cp .env.example .env
# set DATABASE_URL
npx prisma db push
npm run dev
```

## Data Rules

- Source of truth for declarations: Election Commission of India Affidavit Portal
- Always attribute and link to original Form 26 PDFs
- Promises are manually curated for the MVP with source links

## Legal Posture

- Public domain election data with attribution
- DPDP compliant (minimal data, consent, deletion rights)
- Prefer offline Aadhaar e-KYC patterns
- IT Act intermediary safe-harbour practices
