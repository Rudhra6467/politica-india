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
| **1.8** | Premium visitor experience | Done (Nov 2026) |
| **A** | Trust foundation (evidence, CI, SEO) | Done (Nov 2026) |
| **A.5** | **Installable app + Telugu/Hindi interface** | **Done (Nov 2026)** |
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
| Promises | 35 tracked; 33 carry dated, linked sources (71 sources). Any status other than “Unable to verify” requires at least one source |
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

## Phase A — Trust foundation (done Nov 2026)

- Evidence research on all 35 promises: 22 In progress with sources, 13 Unable to verify. 71 fetched, dated
  sources rendered on promise cards with publisher, date and a verbatim line.
- Structured `sources[]` on promises; data check refuses any sourced-less status other than Unable to verify.
- Three factual errors in the pilot set found and fixed: Pendurthi MLA (Panchakarla Ramesh Babu, not
  “R.R. Gopal Krishna”), Sanathnagar result (Talasani won, not lost), Vizianagaram LS candidate
  (Bellana Chandrasekhar, not “Y.S. Vijaya Lakshmi”). Affidavit figures re-sourced from MyNeta/ADR.
- `officeStatus` on candidates for post-election changes (Danam Nagender disqualification, sourced).
- GitHub Actions CI (lint, typecheck, data check, build) on every PR and push to main.
- Sitemap, robots, per-profile Open Graph images, security headers, Vercel Web Analytics.
- Methodology documents the status rules.

## Phase A.5 — Installable app and regional languages (done Nov 2026)

- Progressive Web App: manifest, icons, service worker with offline fallback, install card; Play Store
  path via Trusted Web Activity documented in `docs/PWA_AND_PLAY_STORE.md`.
- Telugu and Hindi interface. English stays at clean URLs (`/candidates/...`); regional pages live at
  `/te/...` and `/hi/...`, all pre-rendered (212 static pages). First visit follows Accept-Language; the
  choice is remembered in a cookie; `hreflang` alternates in metadata and sitemap. Script-aware fonts
  (Noto Sans Telugu / Devanagari) load only for those locales.
- Canonical data (names, promise titles, evidence notes) stays in the language it was recorded in; the
  methodology page is English-only for now and says so in Telugu/Hindi.
- 8 more licensed photos (24 of 29 now).
- Promise pages (`/p/<id>`) with their own share cards, so a single promise and its status travel on
  WhatsApp with the sources attached. Share link on every promise card.

## Performance and accessibility pass (Nov 2026)

- Client bundles no longer include the full dataset: server components build a compact index
  (`src/lib/index-rows.ts`) that search, the list and party pages use. Profile first-load JS 139 → 122 kB,
  total blocking time 620 → 210 ms (Lighthouse mobile, simulated).
- Lighthouse mobile on a profile: performance 80, accessibility 100, best practices 96, SEO 100.
- Small labels moved from slate-400 to slate-500 to pass contrast. Inter loads with `display: optional`
  so slow connections get the system font without a layout shift; Telugu/Devanagari fonts still swap in.

**Known content gaps:** promise titles are mostly broad focus areas (“Urban infrastructure and employment”)
rather than specific pledges, which caps how precise any status can be. Rewriting them into measurable
commitments from manifestos is the next content task. 5 candidates still lack licensed photos (Murugudu Lavanya, Panchakarla Ramesh Babu, Danam Nagender, Bellana Chandrasekhar, Raghunandan Rao — the last has a Commons file whose identity could not be confirmed).

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

- Rewrite vague promise titles into specific, dated manifesto pledges; split bundled promises
- Photos for the 13 candidates still on initials (PIB / Wikimedia licensed only)
- Translate methodology and promise titles into Telugu and Hindi
- Constituency pages once more than one election per seat is in the data

---

## Stack (solo)

Next.js 15 App Router + TypeScript + Prisma + PostgreSQL + Tailwind.
Density-first white UI. Aggressive depth over thin national coverage.
