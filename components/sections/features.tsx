import { ArrowRight, BarChart3, FileCheck2, Gauge, Mail, Network, Radar, Search, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type Area = { n: string; Icon: LucideIcon; title: string; desc: string; tags: string[] }

const AREAS: Area[] = [
  { n: "01", Icon: Target, title: "ICP research & targeting", desc: "Every ICP is capped at 50 high-fit leads, so your team works a laser-focused list.", tags: ["50 leads / ICP", "high-fit"] },
  { n: "02", Icon: Search, title: "Deep lead research", desc: "5–10 minutes of autonomous AI research on every prospect before you reach out.", tags: ["5–10 min", "autonomous"] },
  { n: "03", Icon: Radar, title: "Buying-signal detection", desc: "Spot intent signals — hiring, funding, tech changes — the moment they happen.", tags: ["hiring", "funding"] },
  { n: "04", Icon: Network, title: "Multi-stakeholder mapping", desc: "Map 6–10 decision-makers per account, not just a single point of contact.", tags: ["6–10 people"] },
  { n: "05", Icon: FileCheck2, title: "Case-study matching", desc: "Automatically match your portfolio and proof to each prospect's exact context.", tags: ["proof", "context"] },
  { n: "06", Icon: Mail, title: "Trust-building sequences", desc: "8–12 personalised emails over 6–12 weeks that build genuine relationships.", tags: ["8–12 touches", "6–12 wks"] },
  { n: "07", Icon: Gauge, title: "AI quality scoring", desc: "Every lead and message is scored for fit and quality before it ever ships.", tags: ["fit", "quality"] },
  { n: "08", Icon: BarChart3, title: "Analytics & reporting", desc: "Track replies, meetings and pipeline across every ICP in real time.", tags: ["real-time"] },
]

export default function Features() {
  return (
    <section id="features" className="relative w-full border-b border-black/10 bg-canvas text-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10 lg:px-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            What we automate
          </div>
          <h2 className="mt-4 text-[32px] font-medium leading-[1.05] tracking-[-0.02em] text-heading sm:text-[40px] lg:text-[44px]">
            What Oraami automates
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            From ICP definition to trust-building sequences — the entire quality-first BDR motion, handled end to end.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[15px] leading-relaxed text-muted">
            Multi-tenant security and more — the entire quality-first BDR motion, handled end to end.
          </p>
          <Button href="#platform" variant="secondary" icon={ArrowRight} className="shrink-0">
            Explore all features
          </Button>
        </div>
      </div>
    </section>
  )
}
