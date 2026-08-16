# Politica India — Roadmap (locked Aug 2026)

## Product constitution

Political **information infrastructure**, not a rating app.  
Doctrine: **Fact → Claim → Opinion** (Verified / Tracked / Community).  
No overall scores. Reflect, do not influence.

---

## Phase overview

| Phase | Name | Status |
|-------|------|--------|
| **1** | Credibility | Largely complete (pilot core) |
| **2** | Evidence & Canonical Data Layer | **In progress — starting 2A** |
| **3** | Knowledge Graph | Later |
| **4** | Research Engine | Later |
| **5** | National depth-first | Later |
| **6** | Politica Data API | Later |
| **7** | Community verified | Later |

---

## Phase 1 — Credibility (done for pilot core)

- White-only trust UI; Candidate Profile as product anchor
- Three layers: Verified / Tracked / Community
- South pilot ~30 candidates (AP + TG), leader-first
- Real ECI/ADR affidavit figures on core leaders
- Opponents + margins on most seats
- Methodology page (`/methodology`)
- Source lines on metric cards
- Party pages: MPs / MLAs / Lost; ECI-style symbols

---

## Phase 2 — Evidence & Canonical Data Layer

**Goal:** Important facts can be traced, searched, updated, and reconstructed from the database.

### Pillars

1. Canonical data  
2. Provenance  
3. Structured promises  
4. Search  
5. Temporal history (events + status timestamps)

### Batches

| Batch | Work |
|-------|------|
| **2A** | Prisma schema + stable IDs + relationships + seed from pilot |
| **2B** | Source registry wired; affidavit & promise provenance; temporal status fields |
| **2C** | Search (name/alias/party/constituency/state + entity type); Event timeline on profile |
| **2D** | Read APIs, indexes, optional community persistence |

### Exit test

10 pilot candidates fully reconstructable from DB with source trail for every important fact.

### Not in Phase 2

- Claim entity / Observation table / full status history table  
- Dual KYC architecture  
- Rankings, national scale, monetization, Elasticsearch

See `docs/SCHEMA.md` for invariants and entity definitions.

---

## Phase 3+ (sketch only)

- **3 Knowledge Graph:** Claim separate from Promise; evidence graph; Observation if needed  
- **4 Research Engine:** careful analytics without scores-as-product  
- **5 National depth-first:** more states with same evidence discipline  
- **6 Data API:** licensed structured access  
- **7 Community verified:** dual verification, moderated contribution

---

## Stack (solo)

Next.js App Router + TypeScript + Prisma + PostgreSQL + Tailwind.  
Aggressive timeline; schema docs stay in sync with Prisma.
