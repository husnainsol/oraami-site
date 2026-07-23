import { ArrowRight, Gem, Handshake, Search, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { createMeta } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "About",
  description:
    "Oraami is the quality-first AI BDR — deep research and trust-building outreach that books meetings, not spam. We measure booked meetings, not send volume.",
  path: "/about",
  about: "Oraami",
  breadcrumbs: [{ label: "About", href: "/about" }],
})
export const metadata = metadataExport

type Principle = { n: string; Icon: LucideIcon; title: string; desc: string }

const PRINCIPLES: Principle[] = [
  { n: "01", Icon: Gem, title: "Quality over volume", desc: "We cap every ICP at 50 high-fit accounts, so your team works the leads that convert — never a bloated list." },
  { n: "02", Icon: Target, title: "Built around your ICP", desc: "Oraami learns exactly who you sell to and shapes every play around your ideal customer, not a template." },
  { n: "03", Icon: Search, title: "Deep research, every lead", desc: "Minutes of autonomous AI research on each prospect and their full buying committee before a word is sent." },
  { n: "04", Icon: Handshake, title: "Trust that compounds", desc: "Personalised touches over weeks turn cold accounts into warm relationships that keep paying off." },
]

const STATS = [
  { stat: "3×", label: "Higher reply rate" },
  { stat: "50", label: "Leads per ICP" },
  { stat: "30+", label: "Hours saved weekly" },
  { stat: "200+", label: "Revenue teams" },
]

const LABEL = "text-[11px] uppercase tracking-widest text-faint"

function BoxIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/15 bg-canvas-soft">
      <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} aria-hidden="true" />
      <span aria-hidden className="absolute -right-[5px] -top-[5px] h-2.5 w-2.5 bg-brand" />
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}

      <section className="relative w-full overflow-hidden border-b border-black/10 bg-canvas">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(20,20,20,0.10) 1px, transparent 1.7px)",
            backgroundSize: "9px 9px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          }}
        />
        <div className="site-container relative pb-16 pt-28 lg:pb-16 lg:pt-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
              <span className="h-1.5 w-1.5 bg-brand" />
              About
            </div>
            <h1 className="mt-5 text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[44px] lg:text-[52px]">
              We measure booked meetings, not send volume.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              Oraami is the quality-first AI BDR. We replace spray-and-pray with deep research and trust-building outreach — so revenue teams win on relationships, not volume.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-canvas">
        <div className="site-container py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_1.1fr] lg:gap-20">
            <div>
              <p className={LABEL}>Why we built Oraami</p>
              <h2 className="mt-5 text-[32px] font-medium leading-tight tracking-[-0.02em] text-heading sm:text-[40px]">
                Cold outreach is broken. Quality fixes it.
              </h2>
            </div>
            <div className="space-y-5 text-[17px] leading-relaxed text-muted">
              <p>
                B2B prospecting became a numbers game — blast thousands of low-fit contacts, burn your domain, and hope a fraction reply. It buries reps in busywork and trains buyers to ignore you.
              </p>
              <p>
                We built Oraami on the opposite belief: fewer, better-matched leads beat blasting thousands. Every ICP is capped at 50 high-fit accounts. Every prospect gets minutes of autonomous AI research. Every message is personalised and scored for quality before it ships.
              </p>
              <p>
                The result is outreach prospects actually reply to — and a pipeline your team can trust. We measure success in booked meetings, not sends counted.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-y border-black/10 bg-canvas-alt">
        <div className="site-container py-20">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 ${LABEL}`}>
              <span className="h-1.5 w-1.5 bg-brand" />
              What we believe
            </div>
            <h2 className="mt-5 text-[30px] font-medium leading-[1.1] tracking-[-0.02em] text-heading sm:text-5xl">
              Four principles behind every play
            </h2>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => {
              const { Icon } = p
              return (
                <div key={p.n} className="flex flex-col rounded-xl border border-black/10 bg-canvas-soft p-7">
                  <div className="flex items-center justify-between">
                    <BoxIcon Icon={Icon} />
                    <span className="text-[12px] tracking-widest text-line-num">{p.n}</span>
                  </div>
                  <h3 className="mt-8 text-[18px] font-medium tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full border-y border-black/10 bg-canvas-alt text-ink">
        <div className="site-container py-16 lg:py-20">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-brand/15 bg-white px-5 py-6 shadow-[0_16px_36px_-30px_rgba(32,21,21,0.18)]">
                <p className="text-[clamp(2.5rem,4.5vw,3.75rem)] font-medium leading-none tracking-tight text-heading">{s.stat}</p>
                <p className="mt-4 text-[12px] uppercase tracking-widest text-brand">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-canvas">
        <div className="site-container py-20">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <h2 className="max-w-2xl text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[44px]">
              Ready to find customers ready to buy?
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
