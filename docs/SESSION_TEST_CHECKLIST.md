# Session test checklist — 2026-08-16 (Tier 1 close + Tier 2A)

Use the live site: https://politica-qn61.vercel.app  
Hard-refresh (or clear cache) after deploy.

---

## 1. Homepage layout

- [ ] Tagline row: **For the people of India.** on the left; **My State | National** on the right (same band, not a full row below).
- [ ] Verified / Tracked dots under the title on the left.
- [ ] **Change state** appears under the toggle when a state is selected and My State is active.
- [ ] Header: only **P** and **I** in Sindoor red; Vel/peacock mark left of wordmark.
- [ ] **!** on tagline opens / links to methodology (sources explanation).
- [ ] White theme only — no dark cards on home.

## 2. My State / National behaviour

- [ ] Select a state (e.g. Andhra Pradesh) → parties list for that state.
- [ ] Party cards show ECI-style symbols (not only letter badges).
- [ ] **National** shows national party list + states chips.
- [ ] State choice survives refresh (localStorage).

## 3. Party page

- [ ] Expandable party intro (2 lines + more).
- [ ] Sections: **MPs (won)** · **MLAs (won)** · **Lost the election** (collapsible).
- [ ] Candidate row → **full profile** (not an inline expand on the party page).
- [ ] Back from profile returns to party when navigated from party.

## 4. Candidate profile — verified layer

Pick: **Jagan**, **KTR**, **CBN**, **Nadendla Manohar**, **Danam Nagender**.

- [ ] Metric cards show **ECI Form 26 · year** under Age / Education / Assets / Cases.
- [ ] Opponent block when known (name, party, margin) + “ECI election result”.
- [ ] Danam Nagender party shows **BRS** for 2023 (not INC).
- [ ] White metric cards; no black theme.

## 5. Opponents (sample)

| Profile | Expect opponent |
|---------|-----------------|
| Jagan (Pulivendula) | B.Tech Ravi (TDP), margin ~61,687 |
| KTR (Sircilla) | K.K. Mahender Reddy (INC), ~29,687 |
| Manohar (Tenali) | Annabathuni Siva Kumar (YSRCP), ~48,112 |
| Kollu Ravindra | Perni Krishnamurthy (Kittu), ~50,242 |
| Bandi Sanjay | Velchala Rajender Rao (INC), ~2,25,209 |

## 6. Promises (Tracked layer)

- [ ] Status badges include **Unable to Verify** where enriched (e.g. thin coastal/urban promises).
- [ ] Evidence note visible when present.
- [ ] Like/dislike on the right; comments expand at bottom.

## 7. Methodology & trust

- [ ] `/methodology` loads; Fact → Claim → Opinion / what we do & don’t.
- [ ] Footer / home attribution mentions ECI Form 26 and simplified party marks.

## 8. Tier 2A (repo / local — not yet live UI)

- [ ] `docs/SCHEMA.md` and `docs/ROADMAP.md` present on GitHub.
- [ ] `prisma/schema.prisma` has State, Party, Constituency, Candidate, Source, Affidavit, Promise, Event.
- [ ] `prisma/seed.ts` and `npm run db:setup` documented in `docs/TIER2A_SETUP.md`.
- [ ] Without `DATABASE_URL`, site still works on pilot data.
- [ ] After you add `DATABASE_URL` and run setup: seed counts look sane in terminal / Studio.

## 9. Ops portfolio

- [ ] https://github.com/Rudhra6467/vamsi-ops exists (private).
- [ ] Folders for ananta, agent-ananta, politica-india with STATUS files.

---

## Report back

For anything that fails: screenshot + page URL + expected vs actual. We patch from that list only.
