import { ArrowRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import Pricing from "@/components/sections/pricing"
import { Button } from "@/components/ui/button"
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
    <main className="font-sf-pro overflow-hidden bg-white text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}

      <section className="bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5">
        <div className="relative isolate min-h-[55svh] overflow-hidden rounded-[20px] bg-oraami-accent-secondary text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_45%,color-mix(in_srgb,var(--color-brand)_8%,transparent),transparent_36%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[18%] top-1/2 h-[80%] w-[48%] -translate-y-1/2 rounded-full bg-brand/[0.04] blur-[110px]"
          />

          <div className="landing-container relative flex min-h-[55svh] items-center py-10 sm:py-12 lg:py-14">
            <div className="mx-auto max-w-[880px] text-center">
              <h1 className="mx-auto max-w-[760px] text-balance text-[clamp(2.1rem,7.8vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-indigo-soft">
                Find the Right Plan For Your <span className="text-brand-deep">Growth</span>
              </h1>

              <p className="mx-auto mt-7 max-w-[650px] text-[17px] leading-[1.62] text-white/65 sm:text-[18px]">
                Flexible plans designed to help you discover, qualify, and engage with the prospects that matter most.
              </p>

              <div className="mt-9 flex items-center justify-center">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  className="px-5 transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pricing page />
    </main>
  )
}
