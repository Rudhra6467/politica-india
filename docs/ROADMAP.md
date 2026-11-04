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
| **7 / C** | Community: accounts, live reactions, moderated comments | **Built (Nov 2026), off until configured** — see `docs/COMMUNITY_SETUP.md` |

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
- Canonical data (names, promise titles, evidence notes) stays in the language it was recorded in. The
  methodology page is fully translated into Telugu and Hindi (Nov 2026); legal pages remain English.
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

## Promise titles: from focus areas to pledges (Nov 2026)

A second research pass replaced 16 broad titles with the specific, sourced pledge behind them (manifesto
guarantee, campaign statement, or a commitment the office-holder owns), and added 10 new promises where the
pledge found was a different subject from the evidence already attached. Rule applied: a sharper title keeps its
status only when the existing evidence still supports it; otherwise the pledge is a new promise starting at
“Unable to verify”. Two promises moved to “Reported completed” (₹500 LPG + free bus travel; free sand policy),
one to “Not started” (₹2,500 Mahalakshmi payment).

A third pass (Nov 2026) checked the 17 unverified pledges of sitting representatives against sources dated after
the pledge. Result across all 45 promises: 26 in progress, 3 reported completed, 1 verified completed
(Bhogapuram airport, inaugurated 1 Aug 2026 per News On AIR, six weeks past its June target), 2 not started,
1 evidence conflicting, 12 unable to verify. 44 of 45 carry sources (131 in total). Opposition pledges are
never marked complete or not-started on the current government's account; the note says who delivered.

Still broad because no sourced constituency pledge was found: tg-p03, tg-p05, tg-p09, tg-p14, ap-p08, ap-p09,
ap-p10, ap-p13; and the original umbrella items ap-p02, ap-p04, ap-p11, ap-p14, ap-p23 kept alongside their
new specific pledges. 5 candidates still lack licensed photos (Murugudu Lavanya, Panchakarla Ramesh Babu, Danam Nagender, Bellana Chandrasekhar, Raghunandan Rao — the last has a Commons file whose identity could not be confirmed).

---

## Phase 2 — Evidence & Canonical Data Layer (next)

| Batch | Work | Status |
|-------|------|--------|
| **2A** | Prisma schema + stable IDs + seed from pilot | Done, verified on Postgres 16 (Nov 2026) |
| **2B** | Source registry; affidavit & promise provenance | Seed done: every evidence source and office-status change is a row with provenance. Pages still read the TS file by design (see Phase B reasoning) |
| **2C** | DB-backed search + Event timeline | After 2B |
| **2D** | Read APIs, indexes | After 2C |

Needs `DATABASE_URL` (Neon/Supabase free tier). Exit test: 10 profiles reconstructable from the DB with
every material fact traceable to a Source row. See `docs/SCHEMA.md` and `docs/TIER2A_SETUP.md`.

## Phase C — Community (built Nov 2026; enabled per deployment)

- Mobile-number sign-in with SMS code; the number is stored only as a peppered hash plus last four digits.
- Live reactions (one per account per target) and pre-moderated comments with reports and a moderation queue.
- Privacy policy, terms and grievance-officer pages (English, with te/hi notes).
- Verified end to end on a local Postgres: sign-in, vote, comment, approve, public visibility, report,
  rate limits (429 on the 4th code in an hour), origin check (403).
- When `COMMUNITY_MODE=live`, seeded pilot counts are no longer shown; counts start from zero and are labelled
  as live citizen reaction. Seeded engagement is replaced, never mixed.
- Not yet: DigiLocker-based stronger verification (the `VERIFIED` tier exists in the schema), account
  deletion self-service (handled by email request for now), push notifications.

## Candidate next steps beyond the phases

- Quarterly re-check of every promise status (the lastChecked date is shown on each card)
- Photos for the 13 candidates still on initials (PIB / Wikimedia licensed only)
- Translate promise titles and evidence notes into Telugu and Hindi
- Constituency pages once more than one election per seat is in the data

---

## Stack (solo)

Next.js 15 App Router + TypeScript + Prisma + PostgreSQL + Tailwind.
Density-first white UI. Aggressive depth over thin national coverage.

## Phase D — Rating-first redesign (done)

The product is no longer a reference site with reactions bolted on. Citizens already know their leaders;
they come to rate. Everything else is one tap deeper.

- **Home = the feed.** Pick a state (remembered on the device), see every tracked leader as a large card
  with a five-star row. One tap rates. Winners first, then editorial sort order.
- **Promises page.** One promise, one verdict: Kept / Partly / Not kept (stored as 5 / 3 / 1 stars on
  `promise:<id>`). The sourced record status sits small beside the buttons with a link to the sources.
- **Mood board** (`/mood`). Leaders rated in the last 7 days, sorted by *how many* rated, never by score.
  Averages and distributions are hidden until 50 ratings (`MIN_PUBLIC_RATINGS`) so a handful of accounts
  cannot paint a number.
- **Profile.** Stars directly under the name; affidavit facts, record and timeline collapsed under
  "Facts & record"; each promise card carries the verdict buttons.
- **Sign-in only at the first tap.** The tap that opened the dialog is applied automatically after OTP,
  so the person never has to find the card again.
- **Phone tab bar** (Rate · Promises · Mood · Search · Me) under `md`; desktop keeps the header nav.
- **Data:** `Rating` model (`userId`, `targetKey`, `stars`, unique per user+target), `GET /api/ratings`,
  `POST /api/rate`. Thumbs up/down (`Vote`, `/api/vote`) stay in the schema for now but are unused in UI.
- Doctrine unchanged: ratings are displayed as citizen opinion next to the record, never as an
  editorial score or ranking. Run `npm run db:push` (or `db:setup`) in production to add the table.

**Next:** usability test with five citizens on phones, MSG91 SMS, then widen coverage beyond the 29 pilot leaders.

## Phase D.1 — Visual makeover (done)

A new identity on top of the rating-first structure: night palette (`bg`, `surface`, `line`, `ink`,
`muted`, `faint`, `accent`, `gold` in `tailwind.config.ts`), gold stars with a soft glow, photo-forward
leader tiles with the name set on the photo, Bricolage Grotesque for headlines (Latin only; Telugu and
Hindi headlines keep their script face). Every component reads colours from the semantic names, never
from raw greys, so the next palette change is a config edit.

All four fonts are now self-hosted variable woff2 files under `src/fonts/` (OFL licences alongside),
which removes the Google Fonts fetch that intermittently broke `next build` in CI and locally.
Service worker cache bumped to v4 so installed PWAs pick up the new look on next open.
