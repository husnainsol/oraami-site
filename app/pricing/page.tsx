import { JsonLd } from "@/components/json-ld"
import Pricing from "@/components/sections/pricing"
import { createMeta } from "@/lib/seo"

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
      <h1 className="sr-only">Oraami pricing</h1>
      <Pricing page />
    </main>
  )
}
