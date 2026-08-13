import { JsonLd } from "@/components/json-ld"
import {
  WhyOraamiCta,
  WhyOraamiHero,
  WhyOraamiProblem,
  WhyOraamiReasons,
} from "@/components/sections/why-choose-us"
import { createMeta } from "@/lib/seo"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Why Choose Oraami",
  description:
    "See why revenue teams choose Oraami for quality-first prospecting, focused ICP targeting, deep account research, and trust-building outreach.",
  path: "/why-oraami",
  about: "Why revenue teams choose Oraami",
  breadcrumbs: [{ label: "Why Oraami", href: "/why-oraami" }],
})

export const metadata = metadataExport

export default function WhyOraamiPage() {
  return (
    <main className="font-sf-pro bg-white text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}
      <WhyOraamiHero />
      <WhyOraamiProblem />
      <WhyOraamiReasons />
      <WhyOraamiCta />
    </main>
  )
}
