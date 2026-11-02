import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n";
import LegalPage, { H2 } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Grievance officer" };

const OFFICER = process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER ?? "To be appointed before public accounts open";
const CONTACT = process.env.NEXT_PUBLIC_GRIEVANCE_EMAIL ?? "grievance@politicaindia.in";

export default async function GrievancePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  return (
    <LegalPage locale={locale} title="Grievance officer" updated="2 November 2026">
      <p>
        In line with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, Politica India has a grievance officer for complaints about content on this site, including user comments, and for requests to correct published records.
      </p>
      <dl className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-[10rem_1fr]">
        <dt className="font-medium text-slate-900">Grievance officer</dt>
        <dd>{OFFICER}</dd>
        <dt className="font-medium text-slate-900">Email</dt>
        <dd>
          <a className="text-indigo-700 underline" href={`mailto:${CONTACT}`}>
            {CONTACT}
          </a>
        </dd>
        <dt className="font-medium text-slate-900">Acknowledgement</dt>
        <dd>Within 24 hours</dd>
        <dt className="font-medium text-slate-900">Resolution</dt>
        <dd>Within 15 days; within 72 hours for content of the kinds listed in Rule 3(2)(b)</dd>
      </dl>

      <H2>What to include</H2>
      <ul className="list-disc space-y-1 pl-5">
        <li>The link to the page or comment.</li>
        <li>What is wrong and, for factual records, the source that shows the correct information.</li>
        <li>How we can reach you.</li>
      </ul>

      <H2>How we handle corrections to records</H2>
      <p>
        Every record change is made in the open: the data file is versioned, the correction cites its source, and the profile shows its last-updated date. We do not remove public affidavit information at a candidate’s request, since it is a public record, but we correct errors promptly.
      </p>
    </LegalPage>
  );
}
