import { createMeta } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import FeaturesPageClient from "./features-page-client"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Features",
  description:
    "Oraami researches the accounts, signals, stakeholders, proof, sequences, quality checks, and reporting that turn quality-first prospecting into qualified meetings.",
  path: "/features",
  breadcrumbs: [{ label: "Features", href: "/features" }],
  includeProduct: true,
  about: "Oraami feature workflow for quality-first B2B prospecting",
})

export const metadata = metadataExport

export default function FeaturesPage() {
  return (
    <main className="text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}
      <FeaturesPageClient />
    </main>
  )
}
