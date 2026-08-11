import { JsonLd } from "@/components/json-ld"
import { createMeta } from "@/lib/seo"
import PricingPageClient from "./pricing-page-client"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Pricing",
  description:
    "Simple, transparent Oraami pricing for quality-first AI prospecting, deep account research, and trust-building outreach.",
  path: "/pricing",
  breadcrumbs: [{ label: "Pricing", href: "/pricing" }],
  includeProduct: true,
  about: "Oraami pricing plans",
})

export const metadata = metadataExport

export default function PricingPage() {
  return (
    <main className="overflow-hidden bg-white text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}
      <PricingPageClient />
    </main>
  )
}
