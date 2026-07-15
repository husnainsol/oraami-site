import LegalPage, { type LegalSection } from "@/components/legal-page"
import { createMeta } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Privacy Policy",
  description: "How Oraami collects, uses, and protects personal data.",
  path: "/privacy",
  breadcrumbs: [{ label: "Privacy Policy", href: "/privacy" }],
})
export const metadata = metadataExport

const SECTIONS: LegalSection[] = [
  {
    heading: "Information we collect",
    paras: ["We collect information you provide directly, information generated as you use Oraami, and information from third-party sources you connect."],
    list: [
      "Account details — name, work email, company and role.",
      "Usage data — how you interact with the product, including logs, device and browser information.",
      "Prospecting data — accounts and contacts you research, and the sources used to enrich them.",
      "Communications — messages you send us and support requests.",
    ],
  },
  {
    heading: "How we use information",
    paras: ["We use the information we collect to operate, maintain, and improve Oraami, and to communicate with you."],
    list: [
      "Provide, secure, and support the service.",
      "Research accounts and generate outreach on your behalf.",
      "Personalise and improve product features and models.",
      "Send service, security, and (where permitted) marketing communications.",
    ],
  },
  {
    heading: "Legal bases for processing",
    paras: ["Where the GDPR applies, we process personal data on the basis of contract performance, our legitimate interests in operating and improving the service, your consent (where required), and compliance with legal obligations."],
  },
  {
    heading: "Sharing and disclosure",
    paras: ["We do not sell personal data. We share it only with service providers that process data on our behalf under contract, with your instruction (for example, integrations you connect), and where required by law or to protect our rights."],
  },
  {
    heading: "Data retention",
    paras: ["We retain personal data for as long as your account is active or as needed to provide the service, then delete or anonymise it, unless a longer retention period is required by law."],
  },
  {
    heading: "Security",
    paras: ["We protect data with encryption in transit and at rest, multi-tenant isolation, role-based access, and audit logging. No method of transmission or storage is completely secure, but we work to protect your information and review our practices regularly."],
  },
  {
    heading: "Your rights",
    paras: ["Depending on where you live, you may have rights to access, correct, delete, or port your personal data, and to object to or restrict certain processing. To exercise these rights, contact us using the details below."],
  },
  {
    heading: "Cookies",
    paras: ["We use essential cookies to run the site and analytics cookies to understand usage. You can control cookies through your browser settings; disabling some cookies may affect functionality."],
  },
  {
    heading: "International transfers",
    paras: ["We may process and store data in countries other than your own. Where we transfer personal data internationally, we use appropriate safeguards such as standard contractual clauses."],
  },
  {
    heading: "Children's privacy",
    paras: ["Oraami is a business product not directed to children, and we do not knowingly collect personal data from anyone under 16."],
  },
  {
    heading: "Changes to this policy",
    paras: ["We may update this policy from time to time. We will post the updated version here and revise the “last updated” date. Material changes will be communicated where appropriate."],
  },
]

export default function PrivacyPage() {
  return (
    <>
      {jsonLd && <JsonLd schema={jsonLd} />}
      <LegalPage
        title="Privacy Policy"
        updated="15 July 2026"
        intro="This Privacy Policy explains how Oraami collects, uses, shares, and protects personal data when you use our website and services. By using Oraami, you agree to the practices described here."
        sections={SECTIONS}
      />
    </>
  )
}
