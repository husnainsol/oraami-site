import { Gem, Handshake, Search, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { createMeta } from "@/lib/seo"

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
    desc: "Oraami learns exactly who you sell to and shapes every play around your ideal customer, not a template.",
  },
  {
    n: "03",
    Icon: Search,
    title: "Deep research, every lead",
    desc: "Minutes of autonomous AI research on each prospect and their full buying committee before a word is sent.",
  },
  {
    n: "04",
    Icon: Handshake,
    title: "Trust that compounds",
    desc: "Personalised touches over weeks turn cold accounts into warm relationships that keep paying off.",
  },
]

const COORDINATES = [
  { label: "01 / FIT", position: "bottom-[19%] left-[3%]" },
  { label: "02 / CONTEXT", position: "right-0 top-[17%]" },
  { label: "03 / TRUST", position: "bottom-[6%] right-[5%]" },
  { label: "04 / RELEVANCE", position: "left-[10%] top-[14%]" },
  { label: "05 / TIMING", position: "bottom-0 left-1/2 -translate-x-1/2" },
]

function SignalOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[410px]" aria-hidden="true">
      <div className="absolute inset-[22%] rounded-full bg-brand/15 blur-3xl" />
      <div className="absolute inset-[3%] rounded-full border border-dashed border-white/15 [animation:spin_34s_linear_infinite] motion-reduce:animate-none">
        <span className="absolute left-[13%] top-[13%] h-2.5 w-2.5 rounded-full border-2 border-brand bg-heading shadow-[0_0_0_6px_rgba(255,87,2,0.09),0_0_20px_rgba(255,87,2,0.5)]" />
        <span className="absolute bottom-[24%] right-[6%] h-2.5 w-2.5 rounded-full border-2 border-brand bg-heading shadow-[0_0_0_6px_rgba(255,87,2,0.09),0_0_20px_rgba(255,87,2,0.5)]" />
      </div>
      <div className="absolute inset-[15%] rounded-full border border-brand/40 [animation:spin_24s_linear_infinite_reverse] motion-reduce:animate-none">
        <span className="absolute right-0 top-[44%] h-2 w-2 rounded-full border-2 border-white/80 bg-heading shadow-[0_0_0_5px_rgba(255,255,255,0.06)]" />
      </div>
      <div className="absolute inset-[27.5%] rounded-full border border-white/25" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent" />

      <div className="absolute left-1/2 top-1/2 grid aspect-square w-[29%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-heading/85 shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur">
        <span className="aspect-square w-[46%] rotate-[-35deg] rounded-full border-[6px] border-brand border-r-white/90" />
        <span className="absolute right-[24%] top-[24%] h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_18px_rgba(255,87,2,0.7)]" />
      </div>

      {COORDINATES.map((coordinate) => (
        <span
          key={coordinate.label}
          className={`absolute font-mono text-[7px] tracking-[0.14em] text-white/40 sm:text-[8px] ${coordinate.position}`}
        >
          {coordinate.label}
        </span>
      ))}
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}

      <section className="bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5">
        <div className="relative overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_78%_45%,rgba(255,87,2,0.12),transparent_30%),linear-gradient(135deg,#211c52_0%,#17143f_55%,#121032_100%)] text-white">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:72px_72px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-[12%] -top-[30%] aspect-square w-[52%] rounded-full bg-brand/10 blur-[100px]" aria-hidden="true" />

          <div className="landing-container relative">
            <div className="grid items-center gap-8 py-12 sm:py-14 lg:grid-cols-[minmax(0,0.56fr)_minmax(350px,0.44fr)] lg:gap-12 lg:py-16">
              <div>
                <h1 className="max-w-[570px] text-balance text-[clamp(2.1rem,7.8vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#eef2ff]">
                  We measure what matters
                  <span className="block text-brand">booked meetings.</span>
                </h1>
                <p className="mt-5 max-w-[540px] text-[15px] leading-[1.6] text-white/70 sm:text-[16px]">
                  Oraami is the quality-first AI BDR. We replace spray-and-pray with deep research and trust-building outreach — so revenue teams win on relationships, not volume.
                </p>
              </div>

              <SignalOrbit />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="landing-container py-12 sm:py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h2 className="landing-section-title max-w-lg">
              Cold outreach forgot the person on the other side.
            </h2>

            <div className="border-l border-brand/30 pl-5 sm:pl-7">
              <div className="space-y-4 text-[15px] leading-[1.65] text-muted sm:text-[16px]">
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

            <div className="border-l border-brand/30 pl-6 sm:pl-9 lg:pt-2">
              <div className="space-y-6 text-[16px] leading-[1.8] text-muted sm:text-[18px]">
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

          <div className="mt-14 border-y border-heading/10 py-8 sm:mt-28 sm:py-12">
            <p className="max-w-[1100px] text-[27px] font-medium leading-[1.08] tracking-[-0.04em] text-heading sm:text-[clamp(1.8rem,3.5vw,3.75rem)]">
              Fewer accounts. <span className="text-brand">Deeper research.</span> Better conversations.
            </p>
          </div>

          <p className="landing-section-title mt-10 border-y border-black/10 py-7 sm:mt-12">
            Fewer accounts. <span className="text-brand">Deeper research.</span> Better conversations.
          </p>
        </div>
      </section>

      <section className="bg-canvas">
        <div className="landing-container py-12 sm:py-14 lg:py-16">
          <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
            <h2 className="landing-section-title max-w-xl">The standard behind every play.</h2>
            <p className="landing-section-description max-w-xl lg:justify-self-end">
              Technology should make outreach more considered, not more disposable. These principles shape every account we select, every signal we study, and every message we send.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => {
              const { Icon } = principle
              return (
                <article
                  key={principle.n}
                  className="group rounded-[15px] border border-black/[0.06] bg-white p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_20px_45px_-36px_rgba(30,26,77,0.4)] sm:p-6"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-faint">{principle.n}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-heading/15 bg-white text-heading transition-colors group-hover:border-brand/35 group-hover:text-brand">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="landing-card-title mt-5">{principle.title}</h3>
                  <p className="landing-card-description mt-2.5 max-w-[490px]">{principle.desc}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
