import { Star } from "lucide-react"
import { cn } from "@/components/ui/cn"

type Review = { name: string; role: string; quote: string; initials: string }

const REVIEWS: Review[] = [
  {
    name: "Priya Natarajan",
    role: "Head of Revenue, Solstice Cloud",
    quote:
      "Oraami capped our list at the 50 accounts that actually mattered. Reply rates tripled because every email felt genuinely researched — not blasted.",
    initials: "PN",
  },
  {
    name: "Marcus Bellweather",
    role: "Founder & CEO, Northfield",
    quote:
      "The deep research per lead is the difference. Prospects reply saying it feels like we already understand their business.",
    initials: "MB",
  },
  {
    name: "Aisha Osei",
    role: "RevOps Lead, Cascade Health",
    quote:
      "We stopped spraying and started building relationships. Fewer leads, far better meetings, and a pipeline we actually trust.",
    initials: "AO",
  },
  {
    name: "Daniel Kessler",
    role: "Director of Growth, Ledgerline",
    quote:
      "Trust-building sequences over 6–12 weeks turned cold accounts into inbound conversations. It changed how our team sells.",
    initials: "DK",
  },
]

function Stars({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-brand text-brand" />
      ))}
    </div>
  )
}

function Monogram({ initials, dark }: { initials: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center border text-[13px]",
        dark ? "border-white/20 bg-white/5 text-white" : "border-black/15 bg-canvas-soft text-ink"
      )}
    >
      {initials}
    </span>
  )
}

export default function Testimonials() {
  const [featured, ...rest] = REVIEWS

  return (
    <section id="testimonials" className="relative w-full border-b border-black/10 bg-canvas-alt text-ink">
      <div className="site-container py-20">

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
              <span className="h-1.5 w-1.5 bg-brand" />
              Testimonials
            </div>
            <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
              What clients say
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              Revenue teams that traded spray-and-pray for quality-first prospecting — and the results that followed.
            </p>
          </div>

          <div className="shrink-0 lg:text-right">
            <p className="flex items-baseline gap-1 text-[52px] font-medium leading-none tracking-tight text-ink lg:justify-end">
              4.9<span className="text-lg text-faint">/5</span>
            </p>
            <Stars className="mt-3 lg:justify-end" />
            <p className="mt-3 text-[12px] uppercase tracking-wider text-faint">Based on 200+ revenue teams</p>
          </div>
        </div>

        <figure className="relative mt-14 overflow-hidden border border-black/10 bg-surface-dark p-8 text-white sm:p-12">
          <span aria-hidden className="pointer-events-none absolute -right-4 -top-10 select-none font-serif text-[220px] leading-none text-brand/15">
            &rdquo;
          </span>
          <Stars />
          <blockquote className="relative mt-6 max-w-3xl text-[22px] font-medium leading-snug tracking-tight text-white sm:text-[28px]">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Monogram initials={featured.initials} dark />
            <div>
              <p className="text-[15px] font-medium text-white">{featured.name}</p>
              <p className="text-[13px] text-white/50">{featured.role}</p>
            </div>
          </figcaption>
        </figure>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {rest.map((r) => (
            <figure
              key={r.name}
              className="group flex flex-col rounded-xl border border-black/10 bg-canvas-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-28px_rgba(20,10,0,0.4)]"
            >
              <Stars />
              <blockquote className="mt-5 flex-1 text-[16px] leading-relaxed text-ink-soft">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-dashed border-black/15 pt-5">
                <Monogram initials={r.initials} />
                <div>
                  <p className="text-[14px] font-medium text-ink">{r.name}</p>
                  <p className="text-[12px] text-faint">{r.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
