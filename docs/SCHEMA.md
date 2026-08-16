# Politica India — Canonical Data Model (Tier 2 prep)

This document freezes the **intended** knowledge model before a Postgres/Prisma backend.
Pilot data in `src/data/pilot-candidates.ts` is a flattened projection of this model.

## Doctrine

- **Fact → Claim → Opinion** maps to **Verified Record → Tracked → Community**
- No overall politician score
- Prefer `Unable to verify` over unsupported status
- Every material fact should eventually answer: *Where did this come from?*

## Core entities

### Candidate
- id, name, partyId, constituencyId, state
- electionType (Assembly | Lok Sabha), electionYear
- electionResult (won | lost), marginVotes?
- opponentCandidateId?
- bio fields: age, education, profession
- affidavit summary: totalAssets, totalLiabilities, criminalCasesDeclared
- sortOrder (leader-first display)

### Party
- id, name, abbr, symbolNote
- state presence (many-to-many with states)

### Election
- id, year, type (Assembly | Lok Sabha), state?
- constituencyId, winnerCandidateId, runnerUpCandidateId?, marginVotes?

### Constituency
- id, name, state, type (AC | PC)

### Affidavit
- id, candidateId, electionYear
- sourceUrl, sourcePublisher (ECI)
- retrievedDate, lastChecked
- fields: assets, liabilities, education, cases, profession

### Promise (Tracked claim)
- id, candidateId?, partyId?
- title (what was said)
- sourceNote / sourceUrl
- announcedDate
- scope (National | State | Constituency)
- responsibleEntity (Candidate | Party | Government)
- status:
  - NOT_STARTED
  - IN_PROGRESS
  - REPORTED_COMPLETED
  - VERIFIED_COMPLETED
  - UNABLE_TO_VERIFY
  - EVIDENCE_CONFLICTING
  - DELAYED (future)
  - ABANDONED (future)
- evidenceNote
- lastChecked

### Source
- id, type (official | secondary | media | other)
- publisher, title, url
- publishedDate, retrievedDate
- reliabilityClass (official | reputable | conflicting | unverified)
- relatedClaimIds[]

### Event (Timeline)
- id, candidateId?
- date, type (election | affidavit | announcement | status_change | other)
- title, summary
- sourceId?

### Reaction (Community)
- entityType (candidate | promise | party)
- entityId
- likes, dislikes (aggregated; later: one per verified user)

### Comment
- id, promiseId / candidateId
- authorDisplayName
- body
- verifiedTier (basic | dual)
- createdAt, moderated?

## Relationships (graph sketch)

```
Candidate ──< Elections >── Constituency
Candidate ── Party
Candidate ── Affidavits
Candidate ── Promises ── Sources
Candidate ── Events
Candidate ── opponent ── Candidate
Promise ── Reactions / Comments
```

## Implementation notes

1. **Pilot now:** TypeScript arrays flatten Candidate + Affidavit summary + Promise + opponent fields.
2. **Next backend:** Prisma models matching this doc; migrate pilot rows 1:1.
3. **Source registry** can start as optional fields on Affidavit/Promise before a full Source table.
4. **Timeline v1** = Event rows derived from election + affidavit year + major promise dates only.

## Non-goals in schema

- Overall rating / score columns
- Sponsored visibility flags
- Storing Aadhaar numbers or biometrics
