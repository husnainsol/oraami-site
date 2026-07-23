'use client'

import { useEffect, useRef, useState } from "react"
import { Star } from "lucide-react"
import { animate, motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/components/ui/cn"

type Review = { name: string; role: string; quote: string; initials: string }

const REVIEWS: Review[] = [
  {
    name: "Priya Natarajan",
    role: "Head of Revenue, Solstice Cloud",
    quote:
      "Oraami capped our list at the 50 accounts that actually mattered. Reply rates tripled because every email felt genuinely researched not blasted.",
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

const FEATURED_QUOTE_LINES = [
  "Oraami capped our list at the 50 accounts that actually mattered.",
  "Reply rates tripled because every email felt genuinely researched not blasted",
 
]

const easeOut = [0.22, 1, 0.36, 1] as const

function AnimatedStars({
  className,
  reveal,
  delay = 0,
  reduce = false,
}: {
  className?: string
  reveal: boolean
  delay?: number
  reduce?: boolean
}) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={reduce || !reveal ? { opacity: 0, scale: 0.55, y: 7 } : false}
          animate={reveal ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ duration: reduce ? 0 : 0.34, delay: delay + i * 0.08, ease: easeOut }}
          className="inline-flex origin-center"
        >
          <Star className="h-4 w-4 fill-brand text-brand" />
        </motion.span>
      ))}
    </div>
  )
}

function Monogram({ initials, dark }: { initials: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center border text-[13px]",
        dark ? "border-white/20 bg-canvas/6 text-canvas" : "border-black/15 bg-canvas text-ink"
      )}
    >
      {initials}
    </span>
  )
}

function TestimonialCard({
  review,
  delay,
  reduce,
  entered,
}: {
  review: Review
  delay: number
  reduce: boolean
  entered: boolean
}) {
  return (
    <motion.figure
      className="group flex h-full flex-col rounded-xl border border-black/10 bg-white p-8 text-ink transition-colors duration-300 hover:border-brand/20 hover:shadow-[0_24px_50px_-28px_rgba(20,10,0,0.12)] sm:p-9"
      initial={reduce ? false : { opacity: 0, y: 35 }}
      animate={entered ? { opacity: 1, y: 0 } : undefined}
      whileHover={reduce ? undefined : { y: -5, scale: 1.01 }}
      transition={{ duration: reduce ? 0 : 0.55, delay, ease: easeOut }}
    >
      <AnimatedStars reveal={entered} delay={delay + 0.14} reduce={reduce} />
      <motion.blockquote
        className="mt-5 flex-1 text-[16px] leading-relaxed text-muted"
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={entered ? { opacity: 1, y: 0 } : undefined}
        whileHover={reduce ? undefined : { y: -2 }}
        transition={{ duration: reduce ? 0 : 0.35, delay: delay + 0.16, ease: easeOut }}
      >
        “{review.quote}”
      </motion.blockquote>
      <div className="mt-auto pt-5">
        <motion.span
          className="mb-5 block h-px w-full origin-left bg-brand/12"
          initial={reduce ? false : { scaleX: 0 }}
          animate={entered ? { scaleX: 1 } : undefined}
          whileHover={reduce ? undefined : { scaleX: 1.04 }}
          transition={{ duration: reduce ? 0 : 0.45, delay: delay + 0.26, ease: easeOut }}
        />
        <figcaption className="flex items-center gap-3">
          <motion.div
            initial={reduce ? false : { opacity: 0, rotate: 0 }}
            animate={entered ? { opacity: 1, rotate: 0 } : undefined}
            whileHover={reduce ? undefined : { rotate: 2 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: delay + 0.34, ease: easeOut }}
          >
            <Monogram initials={review.initials} />
          </motion.div>
          <div className="min-w-0">
            <motion.p
              className="text-[14px] font-medium text-ink"
              initial={reduce ? false : { opacity: 0, x: -10 }}
              animate={entered ? { opacity: 1, x: 0 } : undefined}
              whileHover={reduce ? undefined : { x: 3 }}
              transition={{ duration: reduce ? 0 : 0.3, delay: delay + 0.36, ease: easeOut }}
            >
              {review.name}
            </motion.p>
            <motion.p
              className="text-[12px] text-faint"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={entered ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduce ? 0 : 0.3, delay: delay + 0.42, ease: easeOut }}
            >
              {review.role}
            </motion.p>
          </div>
        </figcaption>
      </div>
    </motion.figure>
  )
}

export default function Testimonials() {
  const [featured, ...rest] = REVIEWS
  const reduce = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement | null>(null)
  const entered = useInView(sectionRef, { once: true, amount: 0.3 })
  const [rating, setRating] = useState(() => (reduce ? 4.9 : 0))

  useEffect(() => {

    if (!entered) return

    const controls = animate(0, 4.9, {
      duration: 1.05,
      delay: 0.55,
      ease: easeOut,
      onUpdate(value) {
        setRating(Number(value.toFixed(1)))
      },
    })

    return () => controls.stop()
  }, [entered, reduce])

  return (
    <section ref={sectionRef} id="testimonials" className="relative w-full border-b border-black/10 bg-canvas text-ink">
      <div className="site-container py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <motion.div
            className="max-w-2xl"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduce ? 0 : 0.55, delay: 0.02, ease: easeOut }}
          >
            <motion.div
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={entered ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduce ? 0 : 0.45, delay: 0.02, ease: easeOut }}
            >
              <span className="h-1.5 w-1.5 bg-brand" />
              Testimonials
            </motion.div>
            <motion.h2
              className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={entered ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduce ? 0 : 0.55, delay: 0.14, ease: easeOut }}
            >
              What clients say
            </motion.h2>
            <motion.p
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={entered ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduce ? 0 : 0.55, delay: 0.26, ease: easeOut }}
            >
              Revenue teams that traded spray-and-pray for quality-first prospecting and the results that followed.
            </motion.p>
          </motion.div>

          <motion.div
            className="shrink-0 justify-self-start lg:justify-self-end lg:text-right"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={entered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduce ? 0 : 0.55, delay: 0.36, ease: easeOut }}
          >
            <motion.p className="flex items-baseline gap-1 text-[52px] font-medium leading-none tracking-tight text-heading lg:justify-end">
              <span>{rating.toFixed(1)}</span>
              <span className="text-lg text-faint">/5</span>
            </motion.p>
            <AnimatedStars className="mt-3 lg:justify-end" reveal={entered} delay={0.9} reduce={reduce} />
            <motion.p
              className="mt-3 text-[12px] uppercase tracking-wider text-faint"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={entered ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduce ? 0 : 0.35, delay: 1.3, ease: easeOut }}
            >
              Based on 200+ revenue teams
            </motion.p>
          </motion.div>
        </div>

        <motion.figure
          className="relative mt-14 overflow-hidden rounded-[28px] border border-brand/12 bg-gradient-to-br from-brand/[0.06] via-white to-canvas-alt p-8 text-ink shadow-[0_24px_60px_-42px_rgba(255,79,0,0.22)] sm:p-10 lg:p-11"
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
          animate={entered ? { opacity: 1, y: 0, scale: 1 } : undefined}
          whileHover={reduce ? undefined : { y: -5, scale: 1.01 }}
          transition={{ duration: reduce ? 0 : 0.65, delay: 1.55, ease: easeOut }}
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-10 select-none font-serif text-[220px] leading-none text-brand/15 sm:-right-2 sm:-top-12 sm:text-[240px]"
            initial={reduce ? false : { opacity: 0, x: 18, y: 8 }}
            animate={entered ? { opacity: 1, x: 0, y: 0 } : undefined}
            whileHover={reduce ? undefined : { x: 10, y: -4, opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.8, delay: 1.72, ease: easeOut }}
          >
            &rdquo;
          </motion.span>

          <motion.span
            aria-hidden="true"
            className="absolute left-8 top-8 h-[calc(100%-4rem)] w-px origin-top bg-brand/60 sm:left-10"
            initial={reduce ? false : { scaleY: 0 }}
            animate={entered ? { scaleY: 1 } : undefined}
            whileHover={reduce ? undefined : { scaleY: 1.06 }}
            transition={{ duration: reduce ? 0 : 0.7, delay: 1.7, ease: easeOut }}
          />

          <div className="relative pl-6 sm:pl-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={entered ? { opacity: 1, scale: 1 } : undefined}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              transition={{ duration: reduce ? 0 : 0.35, delay: 1.82, ease: easeOut }}
            >
              <AnimatedStars reveal={entered} delay={1.86} reduce={reduce} />
            </motion.div>

            <blockquote className="mt-6 max-w-[40ch] text-[22px] font-medium leading-[1.42] tracking-tight text-ink sm:text-[26px] lg:text-[28px]">
              {FEATURED_QUOTE_LINES.map((line, index) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={entered ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: reduce ? 0 : 0.45, delay: 2.05 + index * 0.16, ease: easeOut }}
                >
                  {line}
                </motion.span>
              ))}
            </blockquote>

            <motion.figcaption
              className="mt-8 flex items-center gap-4"
              initial={reduce ? false : { opacity: 0, x: -18 }}
              animate={entered ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: reduce ? 0 : 0.45, delay: 2.56, ease: easeOut }}
            >
              <Monogram initials={featured.initials} />
              <div>
                <p className="text-[15px] font-medium text-ink">{featured.name}</p>
                <p className="text-[13px] text-muted">{featured.role}</p>
              </div>
            </motion.figcaption>
          </div>
        </motion.figure>

        <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:items-stretch">
          {rest.map((review, index) => (
            <TestimonialCard
              key={review.name}
              review={review}
              delay={3.1 + index * 0.18}
              reduce={reduce}
              entered={entered}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
