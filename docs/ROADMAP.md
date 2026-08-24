# Politica India — Roadmap (locked Aug 2026, updated Aug 2026)

## Product constitution

Political **information infrastructure**, not a rating app.  
Doctrine: **Fact → Claim → Opinion** (Verified / Tracked / Community).  
No overall scores. Reflect, do not influence.

**North Star (current):** Finish pilot completeness so a real visitor sees real public records — photos (where licensed), party marks, Form 26 facts, sourced promises — before real user accounts.

---

## Phase overview

| Phase | Name | Status |
|-------|------|--------|
| **1** | Credibility | Done for pilot core UI |
| **1.5** | **Pilot Completeness (content depth)** | **Active now** |
| **2** | Evidence & Canonical Data Layer | Next (DB) |
| **3** | Knowledge Graph | Later |
| **4** | Research Engine | Later |
| **5** | National depth-first | Later |
| **6** | Politica Data API | Later |
| **7** | Community verified (real users) | After pilot looks real |

---

## Phase 1 — Credibility (done for pilot core)

- White-only trust UI; Candidate Profile as product anchor
- Three layers: Verified / Tracked / Community
- South pilot ~29 candidates (AP + TG), leader-first
- Real ECI/ADR affidavit figures on core leaders
- Opponents + margins on most seats
- Methodology page; party symbols; dense UI rules

---

## Phase 1.5 — Pilot Completeness (ACTIVE)

**Goal:** What a visitor sees should feel like a real information product, not a skeleton.

**Scope lock:** Andhra Pradesh + Telangana pilot set only (not all-India in this phase).

| Workstream | Definition of done |
|------------|-------------------|
| **Photos** | Public-domain / clearly licensed URLs on leaders; else initials + photo pending |
| **Party symbols** | Consistent ECI-style marks on list, party, profile |
| **Promises** | 1–5 sourced tracked items per major figure; Unable to verify when thin |
| **Engagement** | Seeded likes/dislikes for demo only; UI labeled **Pilot engagement (illustrative)** — never overall score or ranking |
| **Verified record** | Affidavit fields + source line; honest Unable to verify where missing |

**Not in 1.5:** Real signup, dual KYC, live community votes, national scrape, leaderboards.

**Exit test:** 10 leader profiles walkable with photo (or explicit placeholder), symbol, Form 26 summary, ≥1 sourced promise, labeled pilot engagement.

---

## Phase 2 — Evidence & Canonical Data Layer

**Goal:** Facts reconstructable from DB with provenance.

| Batch | Work |
|-------|------|
| **2A** | Prisma + stable IDs + seed from pilot |
| **2B** | Source registry; affidavit & promise provenance |
| **2C** | Search + Event timeline |
| **2D** | Read APIs |

Needs `DATABASE_URL` (Neon/Supabase free). Exit: 10 profiles reconstructable from DB.

---

## Phase 7 note (users later)

Real accounts, dual verification, and live likes/comments come **after** pilot completeness. Seeded engagement is temporary and labeled.

---

## Stack (solo)

Next.js App Router + TypeScript + Prisma + PostgreSQL + Tailwind.  
Density-first white UI. Aggressive depth over thin national coverage.
