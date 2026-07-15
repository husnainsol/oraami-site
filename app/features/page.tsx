import { ArrowRight, BarChart3, FileCheck2, Gauge, Mail, Network, Radar, Search, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { createMeta } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Features",
  description:
    "Everything Oraami automates — ICP research and targeting, deep lead research, buying-signal detection, multi-stakeholder mapping, case-study matching, trust-building sequences, AI quality scoring, and analytics.",
  path: "/features",
  breadcrumbs: [{ label: "Features", href: "/features" }],
})
export const metadata = metadataExport

type Area = { n: string; Icon: LucideIcon; title: string; desc: string; tags: string[] }

const AREAS: Area[] = [
  { n: "01", Icon: Target, title: "ICP research & targeting", desc: "Every ICP is capped at 50 high-fit leads, so your team works a laser-focused list instead of a bloated one.", tags: ["50 leads / ICP", "high-fit"] },
  { n: "02", Icon: Search, title: "Deep lead research", desc: "5–10 minutes of autonomous AI research on every prospect and their company before you reach out.", tags: ["5–10 min", "autonomous"] },
  { n: "03", Icon: Radar, title: "Buying-signal detection", desc: "Spot intent signals — hiring, funding, tech changes — the moment they happen, and act on them.", tags: ["hiring", "funding"] },
  { n: "04", Icon: Network, title: "Multi-stakeholder mapping", desc: "Map 6–10 decision-makers per account, with each stakeholder's role in the buying committee.", tags: ["6–10 people"] },
  { n: "05", Icon: FileCheck2, title: "Case-study matching", desc: "Automatically match your portfolio and proof to each prospect's exact industry and context.", tags: ["proof", "context"] },
  { n: "06", Icon: Mail, title: "Trust-building sequences", desc: "8–12 personalised emails over 6–12 weeks that build genuine relationships, not one-shot blasts.", tags: ["8–12 touches", "6–12 wks"] },
  { n: "07", Icon: Gauge, title: "AI quality scoring", desc: "Every lead and message is scored for fit and quality before it ever ships to a prospect.", tags: ["fit", "quality"] },
  { n: "08", Icon: BarChart3, title: "Analytics & reporting", desc: "Track replies, meetings and pipeline across every ICP in real time, in one dashboard.", tags: ["real-time"] },
]

export default function FeaturesPage() {
  return (
    <main className="text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}

      <section className="relative w-full overflow-hidden border-b border-black/10 bg-canvas">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(40,20,20,0.08) 1px, transparent 1.7px)",
            backgroundSize: "10px 10px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          }}
        />
        <div className="site-container relative pb-14 pt-32 lg:pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-faint">
              <span className="h-1.5 w-1.5 bg-brand" />
              Features
            </div>
            <h1 className="mt-4 text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-heading sm:text-[44px] lg:text-[52px]">
              Everything Oraami automates
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
              From ICP definition to trust-building sequences — the entire quality-first BDR motion, handled end to end so your team focuses on booked meetings.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-canvas">
        <div className="site-container py-16 lg:py-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map((a) => {
              const { Icon } = a
              return (
                <div
                  key={a.n}
                  className="group flex flex-col rounded-2xl border border-black/[0.08] bg-canvas-soft p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_20px_44px_-26px_rgba(60,25,10,0.4)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-on-primary">
                      <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="text-[12px] font-medium text-mute">{a.n}</span>
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold leading-snug text-ink">{a.title}</h3>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-muted">{a.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <span key={t} className="rounded-md bg-brand/[0.08] px-2 py-1 text-[11px] font-medium text-brand">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full border-t border-black/10 bg-canvas-soft">
        <div className="site-container py-16 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <h2 className="max-w-xl text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-heading sm:text-[36px]">
              See what Oraami researches for your ICP
            </h2>
            <Button href="/contact" variant="primary" size="lg" icon={ArrowRight} className="shrink-0">
              Book a call
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
