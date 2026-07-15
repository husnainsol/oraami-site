import { ArrowRight, FileCheck2, Search, Send, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { createMeta } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Platform",
  description:
    "How Oraami works — from defining your ICP to deep research, case-study matching, and trust-building sequences. The four-step motion that turns a cold list into booked meetings.",
  path: "/platform",
  breadcrumbs: [{ label: "Platform", href: "/platform" }],
})
export const metadata = metadataExport

type Step = { n: string; label: string; Icon: LucideIcon; title: string; desc: string; details: string[] }

const STEPS: Step[] = [
  {
    n: "01",
    label: "Target",
    Icon: Target,
    title: "Define your ICP",
    desc: "We learn who you sell to and cap each ICP at 50 high-fit accounts worth pursuing — never a bloated list.",
    details: ["Learn your product & buyers", "Cap each ICP at 50 accounts", "Score every account for fit"],
  },
  {
    n: "02",
    label: "Research",
    Icon: Search,
    title: "Research every lead",
    desc: "5–10 minutes of deep AI research on each prospect and their full buying committee before a word is sent.",
    details: ["Autonomous per-prospect research", "Map 6–10 stakeholders", "Detect live buying signals"],
  },
  {
    n: "03",
    label: "Match",
    Icon: FileCheck2,
    title: "Match & personalise",
    desc: "We match your case studies and proof to each account, then craft a trust-building sequence tailored to it.",
    details: ["Match proof to context", "Personalise every message", "Quality-score before sending"],
  },
  {
    n: "04",
    label: "Engage",
    Icon: Send,
    title: "Engage & build trust",
    desc: "8–12 personalised emails over 6–12 weeks that turn cold leads into warm relationships — and booked meetings.",
    details: ["8–12 touches over 6–12 weeks", "Reply handling & follow-ups", "Booked meetings, not spam"],
  },
]

export default function PlatformPage() {
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
        <div className="relative mx-auto max-w-[1240px] px-6 pb-14 pt-32 sm:px-10 lg:px-12 lg:pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-faint">
              <span className="h-1.5 w-1.5 bg-brand" />
              Platform
            </div>
            <h1 className="mt-4 text-[34px] font-medium leading-[1.05] tracking-[-0.02em] text-heading sm:text-[44px] lg:text-[52px]">
              How Oraami works
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
              From a cold list to a warm relationship — the four-step motion Oraami runs for you, on autopilot.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-canvas">
        <div className="mx-auto max-w-[860px] px-6 py-16 sm:px-10 lg:px-0 lg:py-20">
          {STEPS.map((s, i) => {
            const { Icon } = s
            const last = i === STEPS.length - 1
            return (
              <div key={s.n} className="flex gap-6 sm:gap-8">
                <div className="flex flex-col items-center">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  {!last && <span aria-hidden className="mt-2 w-px flex-1 bg-black/10" />}
                </div>
                <div className={last ? "" : "pb-12"}>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-brand">Step {s.n}</span>
                    <span className="text-[11px] uppercase tracking-widest text-faint">{s.label}</span>
                  </div>
                  <h2 className="mt-2 text-[22px] font-medium tracking-tight text-ink sm:text-[26px]">{s.title}</h2>
                  <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-muted">{s.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.details.map((d) => (
                      <li key={d} className="rounded-lg border border-black/[0.08] bg-canvas-soft px-3 py-1.5 text-[13px] text-ink-mute">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="w-full border-t border-black/10 bg-canvas-soft">
        <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <h2 className="max-w-xl text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-heading sm:text-[36px]">
              Put the whole motion on autopilot
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
