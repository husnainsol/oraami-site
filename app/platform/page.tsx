import { createMeta } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import PlatformPageClient from "./platform-page-client"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Platform",
  description:
    "How Oraami works — from defining your ICP to deep research, case-study matching, and trust-building sequences that create qualified conversations.",
  path: "/platform",
  breadcrumbs: [{ label: "Platform", href: "/platform" }],
})

export const metadata = metadataExport

export default function PlatformPage() {
  return (
    <main className="text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}
      <PlatformPageClient />
    </main>
  )
}
