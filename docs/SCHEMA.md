# Politica India — Canonical Data Model (Tier 2 locked)

**Tier 2 name:** Evidence & Canonical Data Layer  
**Purpose:** Take Politica from a convincing political-information UI to a system whose important facts can be **traced, searched, updated, and reconstructed**.

Pilot data in `src/data/pilot-candidates.ts` is a **flattened projection**. After Tier 2A, Postgres is the source of truth; the TS file is migration input only.

---

## Doctrine

- **Fact → Claim → Opinion** maps to **Verified Record → Tracked → Community**
- No overall politician score
- Prefer `Unable to verify` over unsupported status
- Every material fact must answer: *Where did this come from?*

---

## Five pillars

| Pillar | Purpose |
|--------|---------|
| Canonical data | Stable political entities and relationships |
| Provenance | Every important fact knows its source |
| Promises | Structured commitments (Claim table deferred to Tier 3) |
| Search | Find canonical entities (not UI strings) |
| Temporal history | Events + timestamped promise status |

---

## Tier 2 invariants

1. No canonical candidate exists without a **stable ID**.
2. No important factual record exists without **provenance** (or explicit “pending source”).
3. Promises are **structured records**, not UI text.
4. Promise status has a **timestamp** (`statusAsOf` / `lastCheckedAt`).
5. **Sources** are first-class entities.
6. **Events** have dates and sources where applicable.
7. Search operates against **canonical entities**, not UI strings.
8. The **frontend never owns** canonical political data.
9. Historical information is **append/update-aware** (not blindly overwritten).
10. **Prisma schema and this document stay synchronized.**

---

## Exit test (Tier 2 complete)

Pick **10 real pilot candidates**. For each:

> Can we reconstruct their profile entirely from the database and follow every important factual assertion back to a source?

If the UI still hardcodes political facts → Tier 2 is not finished.

---

## Explicitly out of Tier 2

| Deferred | Why |
|----------|-----|
| Full **Claim** entity (Claim → Promise → Outcome) | Tier 3 graph; optional `claimText` on Promise is enough now |
| **Observation** table | Fold into Event |
| **PromiseStatusHistory** table | Design for it via `statusAsOf`; table comes later |
| Dual Aadhaar/PAN verification architecture | Must not contaminate Tier 2 |
| Rankings, national expansion, monetization, Elasticsearch | Later phases |

---

## Core entities (Tier 2)

### Identity layer

**State**  
`id`, `name`, `aliases[]`, timestamps

**Party**  
`id`, `name`, `abbr`, `aliases[]`, `symbolNote?`, timestamps

**Constituency**  
`id`, `name`, `stateId`, `type` (`AC` | `PC`), `aliases[]`, timestamps

**Candidate**  
`id` (stable, e.g. pilot `ap-tdp-01`), `canonicalName`, `aliases[]`,  
`partyId`, `constituencyId`, `stateId`,  
`externalIds` (JSON: `eciCandidateId?`, `mynetaId?`),  
`electionType`, `electionYear`, `electionResult`, `marginVotes?`, `opponentId?`,  
`age?`, `education?`, `profession?`,  
`totalAssets?`, `totalLiabilities?`, `criminalCases`,  
`photoUrl?`, `sortOrder?`,  
`createdAt`, `updatedAt`

> Affidavit-sensitive fields may stay denormalized on Candidate for 2A; Affidavit + Source is the provenance path.

### Provenance

**Source**  
`id`, `publisher`, `title?`, `url?`,  
`sourceType` (`OFFICIAL` | `ELECTION_RECORD` | `AFFIDAVIT` | `GOVERNMENT` | `COURT` | `PARTY` | `NEWS` | `OTHER`),  
`publishedAt?`, `retrievedAt?`,  
`reliabilityClass` (`OFFICIAL` | `REPUTABLE` | `CONFLICTING` | `UNVERIFIED`),  
`contentHash?`, `archivedUrl?`,  
`createdAt`, `updatedAt`

**Affidavit**  
`id`, `candidateId`, `electionYear`, `sourceId?`,  
`totalAssets?`, `totalLiabilities?`, `criminalCases?`, `education?`, `profession?`,  
`pdfUrl?`, `lastCheckedAt?`, timestamps

### Tracked commitments

**Promise**  
`id`, `candidateId`, `title`,  
`sourceNote?`, `sourceId?`,  
`announcedDate?`,  
`status` (`NOT_STARTED` | `IN_PROGRESS` | `REPORTED_COMPLETED` | `VERIFIED_COMPLETED` | `UNABLE_TO_VERIFY` | `EVIDENCE_CONFLICTING`),  
`statusAsOf?`, `lastCheckedAt?`, `evidenceNote?`,  
timestamps  

> Future: `PromiseStatusHistory` without rewriting Promise.

### Temporal history

**Event**  
`id`, `candidateId?`, `electionYear?`,  
`type` (`ELECTION` | `AFFIDAVIT` | `PROMISE` | `ANNOUNCEMENT` | `OFFICE` | `OTHER`),  
`title`, `description?`, `occurredAt`, `sourceId?`, timestamps

### Community (minimal in Tier 2)

**User** — basic; dual verification later  
**Like** / **Comment** — entity-linked; not the focus of 2A–2C

---

## Relationships

```
State ← Constituency ← Candidate → Party
Candidate → opponent → Candidate
Candidate → Affidavit → Source
Candidate → Promise → Source?
Candidate → Event → Source?
```

---

## Implementation batches

| Batch | Scope |
|-------|--------|
| **2A Foundation** | Prisma + stable IDs + relationships + migrate pilot |
| **2B Evidence** | Source registry + affidavit/promise provenance + temporal status |
| **2C Discovery** | Search (entities + aliases + type) + Event timeline on profile |
| **2D Harden** | Read APIs, indexes, community persistence if needed |

---

## Non-goals

- Overall rating / score columns
- Sponsored visibility
- Storing Aadhaar numbers or biometrics
- Full knowledge graph (Tier 3)
