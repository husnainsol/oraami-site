"use client"

import { useRef } from "react"
import { X } from "lucide-react"
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion"

const OLD = [
  "Blast thousands of low-fit contacts",
  "Generic templates, zero research",
  "~1% reply rate, mostly ignored",
  "Burned domains & sender reputation",
  "Reps buried in manual busywork",
]

const NEW = [
  "50 high-fit accounts per ICP",
  "5–10 min deep research per lead",
  "3× reply rate on personalised outreach",
  "Trust built over 6–12 week sequences",
  "Reps focused on booked meetings",
]

const ease = [0.22, 1, 0.36, 1] as const

const negativeRows: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.62, staggerChildren: 0.11 } },
}

const negativeRow: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease } },
}

const positiveRows: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 1.62, staggerChildren: 0.1 } },
}

const positiveRow: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease } },
}

function DrawnCheck() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
      <motion.path
        d="m3.5 9.5 3.25 3.25L14.5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { pathLength: { duration: 0.38, ease }, opacity: { duration: 0.15 } },
          },
        }}
      />
    </svg>
  )
}

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const entered = useInView(sectionRef, { once: true, margin: "0px 0px -22% 0px" })
  const state = reduceMotion || entered ? "visible" : "hidden"

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const cardY = useTransform(scrollYProgress, [0, 1], ["1%", "-3%"])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-b border-white/10 bg-[#1E1A4D] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_48%,rgba(255,79,0,0.07),transparent_34%)]"
      />

      <div className="site-container relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-[minmax(220px,0.78fr)_minmax(300px,1fr)_minmax(340px,1.08fr)] lg:gap-x-10 xl:gap-x-14">
          <div className="hidden lg:block" />

          <motion.h2
            initial={reduceMotion ? false : "hidden"}
            animate={state}
            variants={{
              hidden: { opacity: 0, y: 32, scale: 0.98, filter: "blur(8px)" },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease },
              },
            }}
            className="text-[36px] font-medium leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:col-span-2 lg:text-[56px]"
          >
            <span className="relative inline-block">
              Quality
              <span aria-hidden className="absolute -bottom-2 left-0 h-px w-12 bg-brand/80" />
            </span>{" "}
            over
            <br />
            volume
          </motion.h2>

          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={state}
            variants={{
              hidden: { opacity: 0, x: -24 },
              visible: { opacity: 1, x: 0, transition: { delay: 0.18, duration: 0.5, ease } },
            }}
            className="flex items-start lg:pt-12"
          >
            <p className="max-w-[17rem] text-[12px] font-medium uppercase leading-[1.75] tracking-[0.16em] text-white/75">
              Fewer, better-matched prospects beat blasting thousands — every time.
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate={state}
            variants={{
              hidden: {},
              visible: { opacity: 0.58, transition: { delay: 1.25, duration: 0.55, ease } },
            }}
            className="relative rounded-xl border border-white/[0.08] bg-white/20 p-6 sm:p-7 lg:self-start"
          >
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion || entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.46, duration: 0.35, ease }}
              className="text-[11px] uppercase tracking-[0.18em] text-[#b8aaa2]"
            >
              The spray &amp; pray way
            </motion.p>

            <motion.ul
              initial={reduceMotion ? false : "hidden"}
              animate={state}
              variants={negativeRows}
              className="mt-7 space-y-[18px]"
            >
              {OLD.map((text) => (
                <motion.li
                  key={text}
                  variants={negativeRow}
                  whileHover={reduceMotion ? undefined : { opacity: 0.9, x: 2 }}
                  className="flex items-start gap-3 text-[15px] leading-[1.45] text-[#c5b8b0] transition-colors duration-200"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-[#8f8179]" strokeWidth={1.35} aria-hidden="true" />
                  <span className="line-through decoration-[#9f8d83]/45 decoration-1">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <div className="relative lg:self-start">
            <motion.span
              aria-hidden
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={reduceMotion || entered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 1.18, duration: 0.75, ease }}
              className="pointer-events-none absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(255,79,0,0.13),transparent_68%)] blur-2xl"
            />

            <motion.div
              initial={reduceMotion ? false : "hidden"}
              animate={state}
              variants={{
                hidden: { opacity: 0, x: 64, scale: 0.96 },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { delay: 1.18, duration: 0.7, ease },
                },
              }}
              style={{ y: reduceMotion ? 0 : cardY }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.28, ease }}
              className="group relative overflow-hidden rounded-xl lg:flex lg:min-h-[420px] lg:flex-col border border-brand/25 bg-[#FAF8F6]/90 p-6 shadow-[0_24px_80px_rgba(255,80,20,0.08)] transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-[0_28px_90px_rgba(255,80,20,0.12)] sm:p-7"
            >
              <motion.span
                aria-hidden
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={reduceMotion || entered ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 1.28, duration: 0.65, ease }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-brand"
              />

              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">The Oraami way</p>

              <motion.ul
                initial={reduceMotion ? false : "hidden"}
                animate={state}
                variants={positiveRows}
                className="mt-7 space-y-[18px] lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:space-y-0"
              >
                {NEW.map((text) => (
                  <motion.li
                    key={text}
                    variants={positiveRow}
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    transition={{ duration: 0.25, ease }}
                    className="flex items-start gap-3 text-[15px] leading-[1.45] text-ink"
                  >
                    <motion.span variants={positiveRow} className="mt-0.5 shrink-0 text-brand transition-colors group-hover:text-[#ff6a29]">
                      <DrawnCheck />
                    </motion.span>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
