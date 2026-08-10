"use client"

import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"

import { useReducedMotionPreference } from "@/components/ui/use-reduced-motion-preference"

const TESTIMONIALS = [
  {
    quote:
      "Oraami capped our list at the 50 accounts that actually mattered. Reply rates tripled because every email felt genuinely researched, not blasted.",
    initials: "PN",
    name: "Priya Natarajan",
    role: "Head Of Revenue, Solstice Cloud",
  },
  {
    quote:
      "The team stopped losing hours to manual research. Every conversation now starts with relevant account context and a clear reason to engage.",
    initials: "ML",
    name: "Marcus Lee",
    role: "VP Growth, Northstar Systems",
  },
  {
    quote:
      "Multi-stakeholder mapping changed how we approach complex accounts. We reach the right buying group instead of relying on one contact.",
    initials: "ER",
    name: "Elena Rossi",
    role: "Commercial Director, Vantage IT",
  },
] as const

const easeOut = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

export default function Testimonials() {
  const reduceMotion = useReducedMotionPreference()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.25 })

  return (
    <section ref={sectionRef} id="testimonials" className="w-full bg-white text-heading">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeOut }}
          className="max-w-2xl"
        >
          <h2 className="landing-section-title">What clients say</h2>
          <p className="landing-section-description mt-4 max-w-[540px]">
            Revenue teams that traded spray-and-pray for quality-first prospecting and the results that followed.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
          className="mt-8 grid grid-cols-1 gap-[22px] md:grid-cols-3"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.figure
              key={testimonial.name}
              variants={itemVariants}
              className="relative flex min-w-0 flex-col rounded-[12px] border border-brand-deep/40 bg-white p-6"
            >
              <span aria-hidden="true" className="pointer-events-none absolute right-6 top-2 font-serif text-[96px] leading-none text-[#ffe4d7]">
                ”
              </span>

              <blockquote className="relative mt-16 text-[16px] leading-[1.6] text-muted">
                “{testimonial.quote}”
              </blockquote>

              <hr className="mt-8 border-black/10" />

              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-heading text-[12px] font-medium text-white">
                  {testimonial.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold text-black">{testimonial.name}</p>
                  <p className="mt-0.5 truncate text-[13px] text-brand-deep">{testimonial.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
