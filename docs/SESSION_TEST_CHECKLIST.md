# QA checklist — Phase A (Nov 2026)

Use the Vercel preview URL on the pull request, or the live site after merge. Test on a phone first.

## Home
- [ ] Hero search finds a leader by partial name (try `rev`), a party (`brs`) and a constituency (`kuppam`).
- [ ] `/` key focuses the header search on desktop; arrow keys and Enter work in the dropdown.
- [ ] Stats strip shows 29 representatives and 35 promises.
- [ ] "My state" remembers the chosen state after refresh.

## Representatives list
- [ ] State, party, role and result chips filter; the count updates; "Clear all" resets.
- [ ] Filters survive refresh (they live in the URL).
- [ ] Danam Nagender shows a "Status changed" badge.

## Profile
- [ ] Every promise with a status other than "Unable to verify" shows at least one dated source with a link.
- [ ] Source links open the publisher page in a new tab.
- [ ] Danam Nagender's profile shows the disqualification notice with two sources.
- [ ] Panchakarla Ramesh Babu (Pendurthi) shows ~₹16.1 Cr assets, 0 cases, margin 81,870.
- [ ] Talasani Srinivas Yadav (Sanathnagar) shows as Elected, margin 41,827.
- [ ] Share button copies the link (desktop) or opens the share sheet (phone).
- [ ] On a 390px wide phone, promise cards keep full-width text; like/dislike sit below.

## Party pages
- [ ] BJP page offers All states / Andhra Pradesh / Telangana switch.
- [ ] Counts of MPs and MLAs match the rows shown.

## SEO and sharing
- [ ] `/sitemap.xml` lists every profile; `/robots.txt` points to it.
- [ ] Pasting a profile link into WhatsApp shows a preview card with the name and party.
- [ ] Browser tab shows the Vel favicon.

## Methodology
- [ ] "How a promise gets its status" section is present and matches what profiles show.

## Report back
Anything failing: screenshot + page URL + expected vs actual. We patch from that list only.
