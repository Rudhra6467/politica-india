import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n";
import LegalPage, { H2 } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of use" };

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  return (
    <LegalPage locale={locale} title="Terms of use" updated="2 November 2026">
      <H2>What Politica is</H2>
      <p>
        Politica India publishes public records about elected representatives and candidates (affidavits filed with the Election Commission of India, election results, and promises tracked against published sources) and lets verified citizens react and comment. It does not rank, score or endorse anyone.
      </p>

      <H2>Accuracy and corrections</H2>
      <p>
        We attribute every fact to its source and prefer “Unable to verify” over guessing. Affidavit figures are self-declared by candidates. Declared cases are allegations, not convictions. If you believe something is wrong, write to the grievance officer; we correct errors and record the change.
      </p>

      <H2>Your account</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li>One account per mobile number. You must be 18 or older.</li>
        <li>You are responsible for what you post. Comments appear only after review by a moderator.</li>
        <li>We may remove content and suspend accounts that break these rules, and we comply with lawful orders.</li>
      </ul>

      <H2>Community rules</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li>No abuse, threats, harassment, or content targeting caste, religion, gender or community.</li>
        <li>No false statements of fact presented as fact. Opinions should be recognisable as opinions.</li>
        <li>No campaigning, paid promotion, spam, or impersonation.</li>
        <li>No personal data about private individuals.</li>
      </ul>

      <H2>Content you post</H2>
      <p>You keep ownership of your comments and grant us a non-exclusive licence to display them on Politica. You may delete your account at any time, which removes your comments.</p>

      <H2>Intermediary status</H2>
      <p>
        For user-generated content, Politica acts as an intermediary under the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021. Our grievance officer’s details are published on the grievance page, and complaints are acknowledged within 24 hours and resolved within 15 days, or faster where the Rules require it.
      </p>

      <H2>Liability</H2>
      <p>The service is provided as is. To the extent permitted by law we are not liable for losses arising from reliance on the information published, which is drawn from public records and cited sources.</p>

      <H2>Governing law</H2>
      <p>These terms are governed by the laws of India. Courts in the operator’s registered city have jurisdiction.</p>
    </LegalPage>
  );
}
