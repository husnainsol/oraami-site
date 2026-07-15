import { ArrowRight, Briefcase, Building2, Landmark, LineChart, Monitor, Server } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type Industry = { name: string; Icon: LucideIcon; items: string[] }

const INDUSTRIES: Industry[] = [
  { name: "SaaS", Icon: Monitor, items: ["ICP definition", "Lead scoring", "Trust sequences", "Meeting booking"] },
  { name: "Agencies", Icon: LineChart, items: ["Prospect research", "Case-study matching", "Warm intros", "Pipeline reporting"] },
  { name: "Consulting", Icon: Briefcase, items: ["Account mapping", "Stakeholder outreach", "Nurture sequences", "Follow-ups"] },
  { name: "IT services", Icon: Server, items: ["Lead qualification", "Deep research", "Personalised email", "Enrichment"] },
  { name: "Professional services", Icon: Building2, items: ["ICP targeting", "Stakeholder mapping", "Trust building", "Reporting"] },
  { name: "Fintech", Icon: Landmark, items: ["Account research", "Compliant outreach", "Sequenced touches", "Clean handoffs"] },
]

function IndustryIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-black/15">
      <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} aria-hidden="true" />
      <span aria-hidden className="absolute -right-[5px] -top-[5px] h-2.5 w-2.5 bg-brand" />
    </div>
  )
}

export default function Solutions() {
  return (
    <section className="relative w-full border-b border-black/10 bg-canvas text-ink">
      <div className="site-container py-20">

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            Industries
          </div>
          <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
            Solutions by industry
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            Industry-specific prospecting plays for every B2B service team — tuned to how each market actually buys.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => {
            const { Icon } = ind
            return (
              <div
                key={ind.name}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-black/10 bg-canvas-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-28px_rgba(20,10,0,0.4)]"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex items-center gap-4">
                  <IndustryIcon Icon={Icon} />
                  <h3 className="text-[15px] font-medium uppercase leading-snug tracking-wide text-ink">
                    {ind.name}
                  </h3>
                </div>
                <ul className="mt-6 space-y-2.5 border-t border-dashed border-black/15 pt-6">
                  {ind.items.map((t) => (
                    <li key={t} className="flex gap-2 text-[15px] leading-relaxed text-muted">
                      <span className="text-brand">&gt;</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[15px] leading-relaxed text-muted">Not listed? We adapt to any B2B motion.</p>
          <Button href="/contact" variant="secondary" icon={ArrowRight} className="shrink-0">
            Book a call
          </Button>
        </div>
      </div>
    </section>
  )
}
