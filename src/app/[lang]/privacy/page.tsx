import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n";
import LegalPage, { H2 } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy policy" };

const OPERATOR = process.env.NEXT_PUBLIC_OPERATOR_NAME ?? "Politica India (operator name to be published before accounts open)";
const CONTACT = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "privacy@politicaindia.in";

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  return (
    <LegalPage locale={locale} title="Privacy policy" updated="2 November 2026">
      <p>
        Politica India is operated by <strong>{OPERATOR}</strong> (“we”). This policy explains what personal data we process when you use the site, why, and the rights you have under the Digital Personal Data Protection Act, 2023 (DPDP Act).
      </p>

      <H2>The short version</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li>You can read everything on Politica without an account and without giving us any personal data.</li>
        <li>If you sign in to react or comment, we ask only for your mobile number, and we store it as a one-way hash plus its last four digits. We never store your name, address, Aadhaar, voter ID or any document.</li>
        <li>We do not sell data, show advertising, or share your data with political parties or candidates.</li>
      </ul>

      <H2>Data we process</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li><strong>Mobile number</strong> — to send a one-time code and to make sure each person has one account. Stored as a salted hash; the number itself is sent to our SMS provider only to deliver the code.</li>
        <li><strong>Display name</strong> — optional, chosen by you, shown with your comments.</li>
        <li><strong>Reactions and comments</strong> — the content you post, linked to your account.</li>
        <li><strong>Technical data</strong> — a hashed IP address kept for one hour to limit abuse of the sign-in flow; standard server logs; privacy-respecting, cookie-free page analytics (page views and country, no individual tracking).</li>
        <li><strong>Browser storage</strong> — your language, chosen state and, in the pilot, locally stored reactions. This stays on your device.</li>
      </ul>

      <H2>Why we process it (legal basis)</H2>
      <p>
        We process account data on the basis of your consent, which you give when you tick the box before requesting a sign-in code. You may withdraw consent at any time by deleting your account (below). Abuse-prevention data is processed for the legitimate purpose of keeping the service safe.
      </p>

      <H2>Retention</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li>One-time codes: deleted after 10 minutes or on use.</li>
        <li>Hashed IP addresses: 1 hour.</li>
        <li>Account, reactions and comments: until you delete your account. Rejected comments are deleted after 90 days.</li>
        <li>Server logs: 30 days.</li>
      </ul>

      <H2>Your rights</H2>
      <p>
        You can ask for a copy of your data, correct your display name, or delete your account and everything linked to it by writing to <a className="text-accent underline" href={`mailto:${CONTACT}`}>{CONTACT}</a> from a message that includes the last four digits of your number; we will confirm by SMS before acting. You can also complain to the Data Protection Board of India.
      </p>

      <H2>Children</H2>
      <p>Politica is for voters. You must be 18 or older to create an account.</p>

      <H2>Processors</H2>
      <p>
        Hosting: Vercel (site and functions). Database: a managed PostgreSQL provider. SMS delivery: an Indian SMS gateway used only to send codes. Each processes data on our instructions. We will list the current providers by name on this page before accounts open to the public.
      </p>

      <H2>Changes</H2>
      <p>We will post changes here with a new date. Material changes affecting account holders will be announced on the site.</p>
    </LegalPage>
  );
}
