import { ArrowRight, BarChart3, FileCheck2, Gauge, Mail, Network, Radar, Search, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type Area = { n: string; category: string; Icon: LucideIcon; title: string; desc: string; tags: string[] }

const AREAS: Area[] = [
  { n: "01", category: "TARGETING", Icon: Target, title: "ICP research & targeting", desc: "Every ICP is capped at 50 high-fit leads, so your team works a laser-focused list built around the accounts most likely to convert. Clear targeting criteria keep research focused and outreach relevant from the start. The result is a sharper prospect list with less time wasted on poor-fit accounts. Your team can prioritize every conversation with greater confidence.", tags: ["50 leads / ICP", "High-fit"] },
  { n: "02", category: "RESEARCH", Icon: Search, title: "Deep lead research", desc: "5–10 minutes of autonomous AI research on every prospect before you reach out.", tags: ["5–10 min", "Autonomous"] },
  { n: "03", category: "INTENT", Icon: Radar, title: "Buying-signal detection", desc: "Spot intent signals — hiring, funding, tech changes — the moment they happen.", tags: ["Hiring", "Funding"] },
  { n: "04", category: "CONTACTS", Icon: Network, title: "Multi-stakeholder mapping", desc: "Map 6–10 decision-makers per account, not just a single point of contact.", tags: ["6–10 people"] },
  { n: "05", category: "PERSONALIZATION", Icon: FileCheck2, title: "Case-study matching", desc: "Automatically match your portfolio and proof to each prospect's exact context. Surface the most relevant success story automatically so every conversation begins with credible evidence.", tags: ["Proof", "Context"] },
  { n: "06", category: "OUTREACH", Icon: Mail, title: "Trust-building sequences", desc: "8–12 personalised emails over 6–12 weeks that build genuine relationships.", tags: ["8–12 Touches", "6–12 Week's"] },
  { n: "07", category: "SCORING", Icon: Gauge, title: "AI quality scoring", desc: "Every lead and message is scored for fit and quality before it ever ships.", tags: ["Fit", "Quality"] },
  { n: "08", category: "ANALYTICS", Icon: BarChart3, title: "Analytics & reporting", desc: "Track replies, meetings and pipeline across every ICP in real time.", tags: ["Real-Time"] },
]

const BENTO_LAYOUT = [
  "lg:col-span-8 lg:row-span-2",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-3",
  "lg:col-span-6",
  "lg:col-span-6",
]

export default function Features() {
  return (
    <section id="features" className="relative w-full border-b border-black/10 bg-canvas text-ink">
      <div className="site-container py-20">
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

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[260px_260px_300px_260px]">
          {AREAS.map((a, index) => {
            const { Icon } = a
            const isLarge = index === 0
            const isMedium = index === 4 || index === 6 || index === 7
            const sizeClass = isLarge ? "automation-card--large p-7 lg:p-8" : isMedium ? "automation-card--medium p-6" : "automation-card--small p-5"
            return (
              <div
                key={a.n}
                className={`automation-card ${sizeClass} group flex min-w-0 flex-col rounded-2xl border border-black/[0.08] bg-canvas-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_52px_-26px_rgba(60,25,10,0.48)] ${BENTO_LAYOUT[index]}`}
              >
                <div className="relative z-[2] flex items-center justify-between">
                  <span className={`flex items-center justify-center rounded-xl bg-brand/10 text-brand transition-[color,background-color,transform] duration-200 group-hover:bg-brand group-hover:text-on-primary group-hover:scale-105 transform-gpu will-change-transform ${isLarge ? "h-14 w-14" : isMedium ? "h-11 w-11" : "h-10 w-10"}`}>
                    <Icon className={isLarge ? "h-[26px] w-[26px]" : isMedium ? "h-[22px] w-[22px]" : "h-5 w-5"} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-[12px] font-medium text-mute">{a.n}</span>
                    <span className="max-w-full truncate rounded-full bg-brand/[0.06] px-2.5 py-1 text-[11px] font-semibold uppercase leading-none tracking-[0.12em] text-brand">
                      {a.category}
                    </span>
                  </div>
                </div>
                <h3 className={`relative z-[2] font-semibold leading-snug text-ink ${isLarge ? "mt-7 text-[24px]" : isMedium ? "mt-6 text-[18px]" : "mt-4 text-[16px]"}`}>{a.title}</h3>
                <p className={`relative z-[2] flex-1 leading-relaxed text-muted ${isLarge ? "mt-4 text-[17px] lg:max-w-[68%]" : isMedium ? "mt-3 text-[15px]" : "mt-2 text-[14px]"}`}>{a.desc}</p>
                <div className={`relative z-[2] flex flex-wrap gap-1.5 ${isLarge ? "mt-7" : "mt-5"}`}>
                  {a.tags.map((t) => (
                    <span key={t} className="rounded-md bg-brand/[0.05] px-1.5 py-0.5 text-[12.5px] font-medium text-brand">
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
