import { Gem, Handshake, Search, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/components/ui/cn"

type Value = { n: string; Icon: LucideIcon; title: string; desc: string }

const VALUES: Value[] = [
  {
    n: "01",
    Icon: Gem,
    title: "Quality over volume",
    desc: "We cap every ICP at 50 high-fit accounts, so your team works the leads that convert — never a bloated list.",
  },
  {
    n: "02",
    Icon: Target,
    title: "Built around your ICP",
    desc: "Oraami learns exactly who you sell to and shapes every play around your ideal customer, not a generic template.",
  },
  {
    n: "03",
    Icon: Search,
    title: "Deep research, every lead",
    desc: "5–10 minutes of autonomous AI research on each prospect and their full buying committee before a word is sent.",
  },
  {
    n: "04",
    Icon: Handshake,
    title: "Trust that compounds",
    desc: "8–12 personalised touches over 6–12 weeks turn cold accounts into warm relationships that keep paying off.",
  },
]

function BoxIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/15 bg-canvas-soft">
      <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} aria-hidden="true" />
      <span aria-hidden className="absolute -right-[5px] -top-[5px] h-2.5 w-2.5 bg-brand" />
    </div>
  )
}

function NumberBox({ n }: { n: string }) {
  return (
    <div className="inline-flex w-fit items-center rounded-md border border-black/20 bg-white px-3.5 py-2 text-[15px] text-ink">
      <span className="text-brand">.</span>
      {n}
    </div>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden border-b border-black/10 bg-canvas text-ink">

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[46%] w-[42%]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(20,20,20,0.12) 1px, transparent 1.7px)",
          backgroundSize: "9px 9px",
          maskImage: "radial-gradient(120% 120% at 0% 100%, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 120% at 0% 100%, black 10%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 py-20 sm:px-10 lg:px-12 lg:py-20">

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            Why Oraami
          </div>
          <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
            Why choose us
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            Four principles that make Oraami a quality-first BDR — we measure booked meetings, not send volume.
          </p>
        </div>

        <div className="mt-14 grid rounded-xl border border-black/10 bg-canvas-soft/60 sm:grid-cols-2">
          {VALUES.map((v, i) => {
            const { Icon } = v
            return (
              <div
                key={v.n}
                className={cn(
                  "flex flex-col p-8 lg:p-10",
                  i % 2 === 0 && "sm:border-r sm:border-dashed sm:border-black/15",
                  i < 2 && "border-b border-dashed border-black/15",
                  i === 2 && "max-sm:border-b max-sm:border-dashed max-sm:border-black/15"
                )}
              >
                <div className="flex items-center justify-between">
                  <NumberBox n={v.n} />
                  <BoxIcon Icon={Icon} />
                </div>
                <h3 className="mt-10 text-[22px] font-medium tracking-tight text-ink">{v.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
