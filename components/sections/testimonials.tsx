"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useReducedMotionPreference } from "@/components/ui/use-reduced-motion-preference"

const TESTIMONIALS = [
  {
    quote: "Oraami capped our list at the 50 accounts that actually mattered. Reply rates tripled because every email felt genuinely researched, not blasted.",
    initials: "PN",
    name: "Priya Natarajan",
    role: "Head of Revenue, Solstice Cloud",
    metrics: [{ value: "3×", label: "Reply rate" }, { value: "50", label: "Priority accounts" }],
  },
  {
    quote: "The team stopped losing hours to manual research. Every conversation now starts with relevant account context and a clear reason to engage.",
    initials: "ML",
    name: "Marcus Lee",
    role: "VP Growth, Northstar Systems",
    metrics: [{ value: "30+", label: "Hours saved" }, { value: "2.4×", label: "Meetings booked" }],
  },
  {
    quote: "Multi-stakeholder mapping changed how we approach complex accounts. We reach the right buying group instead of relying on one contact.",
    initials: "ER",
    name: "Elena Rossi",
    role: "Commercial Director, Vantage IT",
    metrics: [{ value: "6–10", label: "Mapped roles" }, { value: "42%", label: "Faster qualification" }],
  },
] as const

const easeOut = [0.22, 1, 0.36, 1] as const

export default function Testimonials() {
  const reduceMotion = useReducedMotionPreference()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.25 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = TESTIMONIALS[activeIndex]

  useEffect(() => {
    if (reduceMotion || paused) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % TESTIMONIALS.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [paused, reduceMotion])

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section ref={sectionRef} id="testimonials" className="w-full bg-white text-heading">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeOut }}
          className="flex items-end justify-between gap-5"
        >
          <div>
            <h2 className="landing-section-title">What clients say</h2>
            <p className="landing-section-description mt-3 max-w-[540px]">
              The result of replacing spray-and-pray activity with focused, research-led prospecting.
            </p>
          </div>

          <div className="hidden shrink-0 gap-2 sm:flex">
            <Button variant="outline" size="sm" className="w-10 px-0" onClick={() => move(-1)} aria-label="Previous testimonial">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="sm" className="w-10 px-0" onClick={() => move(1)} aria-label="Next testimonial">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={active.name}
              initial={reduceMotion ? false : { opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -14 }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: easeOut }}
              className="mt-7 grid overflow-hidden rounded-[16px] border border-brand/20 bg-[linear-gradient(135deg,rgba(255,79,0,0.035),rgba(255,255,255,0)_48%)] shadow-[0_20px_48px_-44px_rgba(32,21,21,0.3)] lg:grid-cols-[minmax(0,1fr)_250px]"
            >
              <div className="p-5 sm:p-6 lg:p-7">
                <p className="max-w-[760px] text-[clamp(1.125rem,1.7vw,1.35rem)] font-medium leading-[1.5] tracking-[-0.02em] text-ink">
                  {active.quote}
                </p>

                <div className="mt-5 flex items-center gap-3 pt-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-oraami-accent-secondary text-[11px] font-medium text-white">
                    {active.initials}
                  </span>
                  <div>
                    <p className="text-[13px] font-medium text-heading">{active.name}</p>
                    <p className="mt-0.5 text-[11px] text-muted">{active.role}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 bg-canvas-soft lg:grid-cols-1">
                {active.metrics.map((metric, index) => (
                  <div key={metric.label} className={`flex flex-col justify-center p-4 sm:p-5 ${index === 1 ? "border-l border-black/[0.06] lg:border-l-0 lg:border-t" : ""}`}>
                    <strong className={`text-[30px] font-medium leading-none tracking-[-0.04em] ${index === 0 ? "text-brand" : "text-heading"}`}>{metric.value}</strong>
                    <span className="mt-2 text-[10px] uppercase tracking-[0.15em] text-muted">{metric.label}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-between sm:justify-start">
            <div className="flex gap-1.5" aria-label="Select testimonial">
              {TESTIMONIALS.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-6 bg-brand" : "w-1.5 bg-black/15 hover:bg-black/30"}`}
                />
              ))}
            </div>
            <div className="flex gap-2 sm:hidden">
              <Button variant="outline" size="sm" className="w-9 px-0" onClick={() => move(-1)} aria-label="Previous testimonial"><ArrowLeft className="h-4 w-4" aria-hidden="true" /></Button>
              <Button variant="outline" size="sm" className="w-9 px-0" onClick={() => move(1)} aria-label="Next testimonial"><ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
