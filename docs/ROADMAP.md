# Politica India — Roadmap (locked Aug 2026 · updated Nov 2026)

## Product constitution

Political **information infrastructure**, not a rating app.
Doctrine: **Fact → Claim → Opinion** (Verified / Tracked / Community).
No overall scores. Reflect, do not influence.

**North Star:** A citizen in Andhra Pradesh or Telangana can find their representative in one search, see
sourced affidavit facts and honestly-labelled promise status, and react — on any phone — before real
accounts exist.

---

## Phase overview

| Phase | Name | Status |
|-------|------|--------|
| **1** | Credibility | Done |
| **1.5** | Pilot Completeness (content depth) | Done for 29-candidate set |
| **1.8** | **Premium visitor experience** | **Done (Nov 2026)** — see below |
| **2** | Evidence & Canonical Data Layer | 2A scaffolded, 2B–2D next |
| **3** | Knowledge Graph | Later |
| **4** | Research Engine | Later |
| **5** | National depth-first | Later |
| **6** | Politica Data API | Later |
| **7** | Community verified (real users) | After Phase 2 |

---

## Phase 1 — Credibility (done)

- White-only trust UI; Candidate Profile as product anchor
- Three layers: Verified / Tracked / Community
- South pilot ~29 candidates (AP + TG), leader-first
- Real ECI/ADR affidavit figures on core leaders
- Opponents + margins on most seats
- Methodology page; party symbols; dense UI rules

## Phase 1.5 — Pilot Completeness (done)

| Workstream | State |
|------------|-------|
| Photos | 16 of 29 on licensed Wikimedia URLs; initials fallback elsewhere |
| Party symbols | 6 ECI-style marks (BJP, INC, TDP, YSRCP, BRS, JSP) |
| Promises | 35 tracked; **no promise is “In progress” without an evidence note** — otherwise “Unable to verify” |
| Engagement | Seeded likes/dislikes, labelled **Pilot engagement (illustrative)** |
| Verified record | Affidavit fields + source line; honest “Unable to verify” where missing |

Data integrity is now enforced by `npm run check:data` (unique IDs, resolvable opponents, status honesty,
minimum candidate count). This guards against the accidental truncations seen in Aug 2026 history.

## Phase 1.8 — Premium visitor experience (done Nov 2026)

Goal: make the pilot feel like a finished product for an ordinary citizen on a phone.

- Global search (header + hero) over candidates, parties and constituencies, with keyboard navigation
- Server-rendered homepage: hero, stats, leader strip, state explorer, “how to read” layers
- Representatives list with state / party / role / result filters, sort and URL-synced state
- Profile: pre-rendered (SSG) with per-candidate metadata, promise status summary, share button,
  related representatives, mobile-safe promise cards
- Party pages pre-rendered with metadata, stats and state switcher
- Photos served via Next.js image optimisation (CDN-cached; avoids Wikimedia hotlink 429s) with
  automatic initials fallback
- Inter typography, favicon, skip link, focus-visible styles, reduced-motion support
- Verification mock moved out of the homepage into the comment form where it belongs
- ESLint configured; `npm run check` = lint + typecheck + data check

**Not in 1.8:** real accounts, server-side votes, DB-backed pages, Hindi/Telugu UI.

---

## Phase 2 — Evidence & Canonical Data Layer (next)

| Batch | Work | Status |
|-------|------|--------|
| **2A** | Prisma schema + stable IDs + seed from pilot | Scaffolded (never run against a live DB yet) |
| **2B** | Source registry; affidavit & promise provenance; pages read from DB | Next |
| **2C** | DB-backed search + Event timeline | After 2B |
| **2D** | Read APIs, indexes | After 2C |

Needs `DATABASE_URL` (Neon/Supabase free tier). Exit test: 10 profiles reconstructable from the DB with
every material fact traceable to a Source row. See `docs/SCHEMA.md` and `docs/TIER2A_SETUP.md`.

## Phase 7 — Real users (after Phase 2)

Accounts (OTP/email), dual verification (offline Aadhaar e-KYC pattern), server-side likes and comments,
moderation. Seeded engagement is replaced, never mixed.

## Candidate next steps beyond the phases

- Promise evidence research pass for the 32 “Unable to verify” items (web sources, dated)
- Photos for the 13 candidates still on initials (PIB / Wikimedia licensed only)
- Telugu and Hindi UI strings (i18n scaffold)
- Constituency pages once more than one election per seat is in the data

---

## Stack (solo)

Next.js 15 App Router + TypeScript + Prisma + PostgreSQL + Tailwind.
Density-first white UI. Aggressive depth over thin national coverage.
