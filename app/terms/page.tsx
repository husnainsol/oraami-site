import LegalPage, { type LegalSection } from "@/components/legal-page"
import { createMeta } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Terms of Service",
  description: "The terms that govern your use of Oraami.",
  path: "/terms",
  breadcrumbs: [{ label: "Terms of Service", href: "/terms" }],
})
export const metadata = metadataExport

const SECTIONS: LegalSection[] = [
  {
    heading: "Agreement to terms",
    paras: ["These Terms of Service govern your access to and use of Oraami. By creating an account or using the service, you agree to these terms. If you are using Oraami on behalf of an organisation, you agree on its behalf."],
  },
  {
    heading: "The service",
    paras: ["Oraami provides AI-assisted prospecting — research, ideal-customer-profile targeting, and trust-building outreach. We may update, improve, or change features over time to keep the service secure and useful."],
  },
  {
    heading: "Accounts and eligibility",
    paras: ["You must provide accurate account information and keep your credentials secure. You are responsible for all activity under your account. You must be able to form a binding contract to use Oraami."],
  },
  {
    heading: "Acceptable use",
    paras: ["You agree to use Oraami lawfully and responsibly. You may not:"],
    list: [
      "Send unsolicited messages in violation of anti-spam or privacy laws.",
      "Upload unlawful, infringing, or harmful content.",
      "Attempt to disrupt, reverse-engineer, or gain unauthorised access to the service.",
      "Use the service to harass, deceive, or harm others.",
    ],
  },
  {
    heading: "Customer data and responsibilities",
    paras: ["You retain ownership of the data you provide. You are responsible for ensuring you have the necessary rights and lawful basis to process the contacts and accounts you research and contact through Oraami, and for complying with applicable outreach regulations."],
  },
  {
    heading: "Fees and payment",
    paras: ["Paid plans are billed in advance on the interval you select. Fees are non-refundable except where required by law. We may change pricing with reasonable notice; changes apply to the next billing period."],
  },
  {
    heading: "Intellectual property",
    paras: ["Oraami and its software, branding, and content are owned by us and protected by law. We grant you a limited, non-exclusive, non-transferable right to use the service in accordance with these terms."],
  },
  {
    heading: "Third-party services",
    paras: ["Oraami integrates with third-party tools you choose to connect. Your use of those services is governed by their own terms, and we are not responsible for third-party services."],
  },
  {
    heading: "Disclaimers",
    paras: ["The service is provided “as is” without warranties of any kind. We do not guarantee specific results, uninterrupted availability, or that the service will be error-free."],
  },
  {
    heading: "Limitation of liability",
    paras: ["To the maximum extent permitted by law, Oraami will not be liable for indirect, incidental, or consequential damages, and our total liability will not exceed the amounts you paid us in the twelve months before the claim."],
  },
  {
    heading: "Termination",
    paras: ["You may stop using Oraami at any time. We may suspend or terminate access if you breach these terms or to protect the service. On termination, your right to use the service ends and we may delete your data in line with our Privacy Policy."],
  },
  {
    heading: "Changes to these terms",
    paras: ["We may update these terms from time to time. We will post the updated version here and revise the “last updated” date. Continued use after changes take effect constitutes acceptance."],
  },
  {
    heading: "Governing law",
    paras: ["These terms are governed by the laws of the jurisdiction in which Oraami operates, without regard to conflict-of-law principles."],
  },
]

export default function TermsPage() {
  return (
    <>
      {jsonLd && <JsonLd schema={jsonLd} />}
      <LegalPage
        title="Terms of Service"
        updated="15 July 2026"
        intro="These Terms of Service set out the rules for using Oraami. Please read them carefully — they form a binding agreement between you and Oraami."
        sections={SECTIONS}
      />
    </>
  )
}
