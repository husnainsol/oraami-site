import { Gem, Handshake, Search, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { createMeta } from "@/lib/seo"
import styles from "./about.module.css"

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

function SignalOrbit() {
  return (
    <div className={styles.orbitFrame} aria-hidden="true">
      <div className={styles.orbitGlow} />
      <div className={`${styles.orbitRing} ${styles.orbitRingOuter}`}>
        <span className={`${styles.orbitNode} ${styles.orbitNodeOne}`} />
        <span className={`${styles.orbitNode} ${styles.orbitNodeTwo}`} />
      </div>
      <div className={`${styles.orbitRing} ${styles.orbitRingMiddle}`}>
        <span className={`${styles.orbitNode} ${styles.orbitNodeThree}`} />
      </div>
      <div className={`${styles.orbitRing} ${styles.orbitRingInner}`} />
      <div className={styles.orbitAxisHorizontal} />
      <div className={styles.orbitAxisVertical} />
      <div className={styles.orbitCore}>
        <span className={styles.orbitMark} />
        <span className={styles.orbitCoreDot} />
      </div>
      <span className={`${styles.orbitCoordinate} ${styles.orbitCoordinateOne}`}>01 / FIT</span>
      <span className={`${styles.orbitCoordinate} ${styles.orbitCoordinateTwo}`}>02 / CONTEXT</span>
      <span className={`${styles.orbitCoordinate} ${styles.orbitCoordinateThree}`}>03 / TRUST</span>
      <span className={`${styles.orbitCoordinate} ${styles.orbitCoordinateFour}`}>04 / RELEVANCE</span>
      <span className={`${styles.orbitCoordinate} ${styles.orbitCoordinateFive}`}>05 / TIMING</span>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}

      <section className="bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5">
        <div className={`${styles.hero} relative min-h-[75svh] overflow-hidden rounded-[16px] bg-heading text-white sm:rounded-[20px]`}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroFlare} aria-hidden="true" />

          <div className="site-container relative z-10">
            <div className="grid min-h-[75svh] items-center gap-7 py-12 sm:gap-12 sm:py-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(390px,0.88fr)] lg:gap-16 lg:py-20">
              <div className={styles.heroCopy}>
                <h1 className="max-w-[780px] text-balance text-[38px] font-medium leading-[0.98] tracking-[-0.05em] text-[#f9f7ff] min-[420px]:text-[42px] sm:text-[clamp(3.25rem,6.1vw,5.65rem)] sm:tracking-[-0.055em]">
                  We measure what matters
                  <span className="block text-brand"> booked meetings.</span>
                </h1>
                <p className="mt-6 max-w-[610px] text-[15px] leading-[1.65] text-white/64 sm:mt-8 sm:text-[18px] sm:leading-[1.75]">
                  Oraami is the quality-first AI BDR. We replace spray-and-pray with deep research and trust-building outreach — so revenue teams win on relationships, not volume.
                </p>
              </div>

              <div className={`${styles.heroVisual} mx-auto w-full max-w-[520px] lg:justify-self-end`}>
                <SignalOrbit />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 lg:py-36">
        <div className="site-container">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
            <div>
              <p className="text-[34px] font-medium leading-[1.02] tracking-[-0.045em] text-heading sm:text-[clamp(2.35rem,4.2vw,4.5rem)]">
                Cold outreach forgot the person on the other side.
              </p>
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
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="site-container">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-24">
            <h2 className="max-w-[760px] text-[34px] font-medium leading-[0.98] tracking-[-0.05em] text-heading sm:text-[clamp(2.5rem,4.4vw,4.5rem)]">
              The standard behind every play.
            </h2>
            <p className="max-w-xl text-[16px] leading-[1.7] text-muted lg:justify-self-end lg:pb-1 sm:text-[17px]">
              Technology should make outreach more considered, not more disposable. These principles shape every account we select, every signal we study, and every message we send.
            </p>
          </div>

          <div className="mt-12 grid border-t border-heading/15 md:grid-cols-2 lg:mt-14">
            {PRINCIPLES.map((principle, index) => {
              const { Icon } = principle
              return (
                <article
                  key={principle.n}
                  className={`${styles.principle} border-b border-heading/15 py-7 md:min-h-[218px] md:px-8 md:py-7 lg:min-h-[230px] lg:px-10 lg:py-8 ${
                    index % 2 === 0 ? "md:border-r" : "md:pl-10 lg:pl-14"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[12px] tracking-[0.18em] text-heading/35">{principle.n}</span>
                    <span className={`${styles.principleIcon} flex h-10 w-10 items-center justify-center rounded-full border border-heading/15 bg-white text-heading transition-all duration-300 sm:h-11 sm:w-11`}>
                      <Icon className="h-[18px] w-[18px] sm:h-[19px] sm:w-[19px]" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-6 text-[22px] font-medium leading-tight tracking-[-0.03em] text-heading sm:mt-8 sm:text-[26px]">
                    {principle.title}
                  </h3>
                  <p className="mt-3 max-w-[490px] text-[15px] leading-[1.65] text-muted">
                    {principle.desc}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
