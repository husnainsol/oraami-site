import LegalPage, { type LegalSection } from "@/components/legal-page"
import { createMeta } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Security",
  description: "How Oraami secures your data, infrastructure, and access to the platform.",
  path: "/security",
  breadcrumbs: [{ label: "Security", href: "/security" }],
})
export const metadata = metadataExport

const SECTIONS: LegalSection[] = [
  {
    heading: "Our approach to security",
    paras: ["Security is built into how we design, build, and operate Oraami — not treated as an afterthought. We apply industry-standard practices across our infrastructure, application, and internal processes to protect your data and keep the service trustworthy."],
  },
  {
    heading: "Data encryption",
    paras: ["All data is encrypted in transit using TLS and at rest using industry-standard encryption. Sensitive credentials and secrets are stored using dedicated secrets management, never in plaintext."],
  },
  {
    heading: "Infrastructure and hosting",
    paras: ["Oraami runs on reputable cloud infrastructure providers with strong physical and network security. Environments are isolated, access is restricted, and infrastructure changes go through review before deployment."],
  },
  {
    heading: "Multi-tenant isolation",
    paras: ["Customer data is logically isolated by account. Access controls and application-level checks ensure that one customer's data can never be viewed or modified by another."],
  },
  {
    heading: "Access controls",
    paras: ["Access to production systems and customer data is restricted to authorised personnel on a least-privilege basis. We support role-based access control within Oraami so you can control what your own team members can see and do."],
  },
  {
    heading: "Monitoring and audit logging",
    paras: ["We maintain audit logs of key account and system activity and monitor our infrastructure for unusual or unauthorised behaviour, so issues can be identified and addressed quickly."],
  },
  {
    heading: "Vulnerability management",
    paras: ["We regularly review our systems and dependencies for known vulnerabilities and apply security patches on an ongoing basis. Critical issues are prioritised and remediated promptly."],
  },
  {
    heading: "Incident response",
    paras: ["We maintain an incident response process to investigate, contain, and remediate security events. If an incident affects your data, we will notify you in line with our contractual and legal obligations."],
  },
  {
    heading: "Employee access and training",
    paras: ["Employee access to internal systems is granted on a least-privilege basis and reviewed periodically. Employees are trained on security and data-handling practices as part of onboarding and on an ongoing basis."],
  },
  {
    heading: "Third-party vendors",
    paras: ["Where we rely on third-party vendors and subprocessors to deliver the service, we review their security practices and require them to protect data to a standard consistent with our own commitments."],
  },
  {
    heading: "Compliance",
    paras: ["We align our practices with recognised industry standards and continue to evolve our security and compliance posture as the business grows. For specific compliance documentation or questionnaires, contact us using the details below."],
  },
  {
    heading: "Reporting a vulnerability",
    paras: ["If you believe you've found a security vulnerability in Oraami, please report it to us responsibly using the contact details below. We investigate all reports and appreciate the effort of the security research community."],
  },
  {
    heading: "Changes to this page",
    paras: ["We may update this page from time to time as our security practices evolve. We will post the updated version here and revise the “last updated” date."],
  },
]

export default function SecurityPage() {
  return (
    <>
      {jsonLd && <JsonLd schema={jsonLd} />}
      <LegalPage
        title="Security"
        updated="15 July 2026"
        intro="This page explains how Oraami protects your data and secures our platform. Security is core to how we build and operate the service for every customer."
        sections={SECTIONS}
      />
    </>
  )
}
