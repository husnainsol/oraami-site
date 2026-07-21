"use client"

import { useRef } from "react"
import { ArrowRight, Briefcase, Building2, Landmark, LineChart, Monitor, Server } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion"
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

const ease = [0.22, 1, 0.36, 1] as const

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index < 3 ? index * 0.09 : 0.15 + (index - 3) * 0.09,
      ease,
    },
  }),
}

function IndustryIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-black/10 bg-white/10 ring-1 ring-black/5 transition-colors duration-300 group-hover:border-brand/25 group-hover:bg-brand">
      <Icon
        className="h-5 w-5 text-brand transition-colors duration-300 ease-out group-hover:text-on-primary"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <span
        aria-hidden
        className="absolute -right-[5px] -top-[5px] h-2.5 w-2.5 bg-brand transition-transform duration-300 ease-out group-hover:scale-[1.15]"
      />
    </div>
  )
}

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const entered = useInView(sectionRef, { once: true, margin: "0px 0px -20% 0px" })
  const animationState = reduceMotion || entered ? "visible" : "hidden"

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden border-b border-black/10 bg-canvas text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_58%,rgba(255,79,0,0.025),transparent_42%)]"
      />

      <div className="site-container relative py-20">
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

        <div className="mt-16 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-7 lg:px-[30px]">
          {INDUSTRIES.map((ind, index) => {
            const { Icon } = ind
            const rowOffset = index < 3 ? "lg:-translate-x-[30px]" : "lg:translate-x-[30px]"

            return (
              <div key={ind.name} className={rowOffset}>
                <motion.div
                  custom={index}
                  initial={reduceMotion ? false : "hidden"}
                  animate={animationState}
                  variants={cardVariants}
                  transition={{ duration: 0.27, ease }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/14 bg-[#1E1A4D] p-7 transition-colors duration-[275ms] ease-out hover:border-brand/30"
                >

                  <div className="flex items-center gap-4">
                    <IndustryIcon Icon={Icon} />
                    <h3 className="text-[15px] font-medium uppercase leading-snug tracking-wide text-[#FCFCFA]">
                      {ind.name}
                    </h3>
                  </div>

                  <ul className="mt-6 space-y-2.5 border-t border-dashed border-white/14 pt-6">
                    {ind.items.map((text, itemIndex) => (
                      <li
                        key={text}
                        style={{ transitionDelay: `${itemIndex * 40}ms` }}
                        className="flex gap-2 text-[15px] leading-relaxed text-[#FCFCFA]/68 transition-transform duration-200 ease-out group-hover:translate-x-1"
                      >
                        <span className="text-brand">&gt;</span>
                        {text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[15px] leading-relaxed text-muted">Not listed? We adapt to any B2B motion.</p>
          <Button href="/contact" variant="secondary" icon={ArrowRight} className="shrink-0">
            Book a call
          </Button>
        </div>
      </div>
    </section>
  )
}
