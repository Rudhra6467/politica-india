# Community features (Phase C): accounts, reactions, comments

Everything here is **off by default**. With no `COMMUNITY_MODE=live`, the site is fully static and shows the
labelled pilot engagement counts. Turning it on needs a database, two secrets and (for real users) an SMS
provider.

## What it does

| Feature | Behaviour |
|---------|-----------|
| Sign-in | Indian mobile number + 6-digit SMS code. No password, no name, no ID document. |
| Data kept | A salted SHA-256 hash of the number, its last 4 digits, an optional display name, consent timestamp. |
| Reactions | One like/dislike per account per candidate or promise; counts are live, starting from zero. |
| Comments | Pre-moderated. Appear only after a moderator approves. Authors see their own pending comments. |
| Reports | Anyone can report an approved comment; most-reported comments rise to the top of the queue. |
| Moderation | `/admin/moderation` for phone numbers listed in `ADMIN_PHONES`: approve, reject, ban (bans also revoke sessions and reject the user's pending comments). |
| Abuse limits | 3 codes per number per hour, 12 per IP per hour, 5 wrong attempts per code, 5 comments per user per hour. Same-origin checks on every write. |

## Turn it on (about 20 minutes)

1. **Database.** Create a free Postgres on [Neon](https://neon.tech) (Mumbai/Singapore region). Copy the
   connection string.
2. **Apply the schema and seed** from your machine:
   ```bash
   export DATABASE_URL="postgresql://…"
   npm run db:setup
   ```
3. **Secrets.** Generate two random strings:
   ```bash
   openssl rand -base64 48   # AUTH_SECRET
   openssl rand -base64 24   # PHONE_PEPPER  (never rotate casually: it invalidates all accounts)
   ```
4. **Vercel → Project → Settings → Environment Variables** (Production and Preview):
   - `DATABASE_URL`, `COMMUNITY_MODE=live`, `AUTH_SECRET`, `PHONE_PEPPER`
   - `ADMIN_PHONES=+91XXXXXXXXXX` (your number; comma-separate more)
   - `OTP_PROVIDER=log` and `ALLOW_DEV_OTP=true` **on Preview only** to test without SMS (the code is shown in
     the dialog). Never set `ALLOW_DEV_OTP` on Production.
   - Legal page fields: `NEXT_PUBLIC_OPERATOR_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_GRIEVANCE_OFFICER`,
     `NEXT_PUBLIC_GRIEVANCE_EMAIL`.
5. **SMS (Production).** Create an [MSG91](https://msg91.com) account, complete DLT registration (required in
   India for transactional SMS), create an OTP template with `##OTP##`, then set `OTP_PROVIDER=msg91`,
   `MSG91_AUTH_KEY`, `MSG91_TEMPLATE_ID`. Cost is roughly ₹0.15–0.25 per SMS.
6. Redeploy. The header shows **Sign in**; profiles show live counts; `/admin/moderation` works for admins.

## Before opening to the public

- Appoint a grievance officer and publish the name (IT Rules 2021 require it for user-generated content).
- Name the legal operator on the privacy page.
- Decide the moderation rota: pending comments are invisible until someone approves them.

## Local testing

Use a local Postgres (see `docs/TIER2A_SETUP.md`) and:
```bash
export DATABASE_URL=… COMMUNITY_MODE=live AUTH_SECRET=$(openssl rand -base64 48) \
  PHONE_PEPPER=local-pepper OTP_PROVIDER=log ALLOW_DEV_OTP=true ADMIN_PHONES=+919876543210
npm run build && npm start
```
Codes also print to the server log as `[otp] code for +91******3210: 123456`.

## API summary

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/otp/request` | POST | `{phone, consent:true}` → sends code |
| `/api/auth/otp/verify` | POST | `{phone, code}` → sets session cookie |
| `/api/auth/logout` | POST | revokes session |
| `/api/me` | GET / PATCH | current user / set display name |
| `/api/reactions?keys=…` | GET | counts + caller's vote for up to 60 targets |
| `/api/vote` | POST | `{targetKey, value: 1 \| -1 \| 0}` (legacy thumbs; UI no longer uses it) |
| `/api/ratings?keys=…` | GET | star summaries for up to 60 targets: `count`, `avg` and `dist` (null until 50 ratings), caller's `mine` |
| `/api/rate` | POST | `{targetKey, stars: 0–5}` — one rating per user per target; promises use 5 = Kept, 3 = Partly, 1 = Not kept; 0 removes |
| `/api/comments?key=…` | GET / POST | approved comments (+ own pending) / post |
| `/api/comments/:id/report` | POST | `{reason}` |
| `/api/admin/comments` | GET / POST | queue / approve, reject, ban |

All routes return `503 community_disabled` when `COMMUNITY_MODE` is not `live`.
