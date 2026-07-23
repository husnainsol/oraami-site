"use client"

import { animate, motion, useInView, useMotionValue, useReducedMotion, type Variants } from "framer-motion"
import { Gem, Handshake, Search, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useEffect, useRef } from "react"

type Value = { n: string; label: string; Icon: LucideIcon; title: string; desc: string }
const VALUES: Value[] = [
  { n: "01", label: "QUALITY", Icon: Gem, title: "Quality over volume", desc: "We cap every ICP at 50 high-fit accounts, so your team works the leads that convert — never a bloated list." },
  { n: "02", label: "ICP", Icon: Target, title: "Built around your ICP", desc: "Oraami learns exactly who you sell to and shapes every play around your ideal customer, not a generic template." },
  { n: "03", label: "RESEARCH", Icon: Search, title: "Deep research, every lead", desc: "5–10 minutes of autonomous AI research on each prospect and their full buying committee before a word is sent." },
  { n: "04", label: "TRUST", Icon: Handshake, title: "Trust that compounds", desc: "8–12 personalised touches over 6–12 weeks turn cold accounts into warm relationships that keep paying off." },
]
const DESKTOP_PATH = "M 67 117 C 178 117, 246 288, 367 288 S 546 117, 667 117 S 846 288, 967 288"
const MOBILE_PATH = "M 57 94 C 57 170, 75 240, 57 364 S 39 560, 57 634 S 75 830, 57 904"
const ease = [0.22, 1, 0.36, 1] as const

function Connector({ path, viewBox, active, reduce }: { path: string; viewBox: string; active: boolean; reduce: boolean }) {
  const pathRef = useRef<SVGPathElement>(null)
  const cx = useMotionValue(0)
  const cy = useMotionValue(0)
  const wide = viewBox.startsWith("0 0 1200")
  const suffix = wide ? "wide" : "mobile"

  useEffect(() => {
    const line = pathRef.current
    if (!line) return
    const first = line.getPointAtLength(0)
    cx.set(first.x)
    cy.set(first.y)
    if (!active || reduce) return
    const length = line.getTotalLength()
    const controls = animate(0, 1, {
      duration: 5.35,
      delay: 0.72,
      ease: "linear",
      onUpdate: (progress) => {
        const point = line.getPointAtLength(length * progress)
        cx.set(point.x)
        cy.set(point.y)
      },
    })
    return () => controls.stop()
  }, [active, cx, cy, path, reduce])

  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={viewBox} preserveAspectRatio="none">
      <defs>
        <filter id={`journey-glow-${suffix}`} x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="8" /></filter>
        <linearGradient id={`journey-line-${suffix}`} x1="0" x2="1">
          <stop offset="0" stopColor="var(--color-oraami-accent-21)" stopOpacity="0.35" />
          <stop offset="0.48" stopColor="var(--color-oraami-accent-21)" />
          <stop offset="1" stopColor="var(--color-oraami-accent-22)" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path ref={pathRef} d={path} fill="none" stroke="rgba(24,22,20,0.08)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#journey-line-${suffix})`}
        strokeLinecap="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={active ? { pathLength: 1 } : undefined}
        transition={{ duration: reduce ? 0 : 5.35, delay: reduce ? 0 : 0.72, ease: "linear" }}
      />
      {!reduce && <>
        <motion.circle cx={cx} cy={cy} r="16" fill="var(--color-oraami-accent-21)" opacity="0" filter={`url(#journey-glow-${suffix})`} initial={{ opacity: 0 }} animate={active ? { opacity: [0, 0.42, 0.42, 0] } : undefined} transition={{ duration: 5.5, delay: 0.65, times: [0, 0.08, 0.86, 1], ease: "easeInOut" }} />
        <motion.circle cx={cx} cy={cy} r="5" fill="var(--color-oraami-accent-23)" stroke="var(--color-oraami-accent-21)" strokeWidth="2" vectorEffect="non-scaling-stroke" initial={{ opacity: 0 }} animate={active ? { opacity: [0, 1, 1, 0] } : undefined} transition={{ duration: 5.5, delay: 0.65, times: [0, 0.06, 0.9, 1], ease: "easeInOut" }} />
      </>}
    </svg>
  )
}

function JourneyStep({ value, index, active, reduce, mobile = false }: { value: Value; index: number; active: boolean; reduce: boolean; mobile?: boolean }) {
  const { Icon } = value
  const delay = 0.72 + index * 1.68
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay + 0.16, ease } },
    hover: { opacity: 1, y: reduce ? 0 : -5, borderColor: "rgba(28,25,23,0.17)", boxShadow: "0 18px 42px rgba(43,28,21,0.08)", transition: { duration: reduce ? 0 : 0.28, ease } },
  }

  return (
    <motion.article
      className={mobile
        ? "absolute left-[25%] right-1 rounded-2xl border border-brand/16 bg-white px-5 pb-5 pt-12 shadow-[0_16px_40px_-34px_rgba(43,28,21,0.16)]"
        : "absolute w-[22.5%] rounded-2xl border border-brand/16 bg-white px-6 pb-6 pt-11 shadow-[0_16px_40px_-34px_rgba(43,28,21,0.16)] backdrop-blur-[2px] lg:px-7 lg:pb-7"}
      style={mobile ? { top: `${index * 25 + 5}%` } : { left: `${index * 25 + 1.25}%`, top: index % 2 === 0 ? "20%" : "49%" }}
      variants={variants}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      whileHover="hover"
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-10 -z-10 select-none text-[84px] font-medium leading-none tracking-[-0.08em] text-brand/10"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
        animate={active ? { opacity: 0.032, scale: 1 } : undefined}
        variants={{ hover: { opacity: 0.055 } }}
        transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay + 0.05, ease }}
      >{value.n}</motion.span>

      <motion.div
        className={mobile ? "absolute -left-[23%] top-3" : "absolute left-6 top-[-29px] lg:left-7"}
        initial={{ opacity: 0, scale: reduce ? 1 : 0.45 }}
        animate={active ? { opacity: 1, scale: [0.45, 1.14, 0.96, 1], y: [0, 0, -3, 0] } : undefined}
        variants={{ hover: { scale: 1.08 } }}
        transition={{ duration: reduce ? 0 : 0.72, delay: reduce ? 0 : delay, times: [0, 0.48, 0.72, 1], ease }}
      >
        <motion.div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-brand/25 bg-brand/[0.08] text-brand shadow-[0_8px_24px_rgba(229,57,53,0.12)]" variants={{ hover: { backgroundColor: "var(--color-brand)", color: "var(--color-on-primary)", borderColor: "var(--color-brand)" } }} transition={{ duration: reduce ? 0 : 0.28, ease }}>
          <motion.span aria-hidden="true" className="absolute inset-[-6px] rounded-full border border-brand/20" initial={{ opacity: 0, scale: 0.8 }} animate={active && !reduce ? { opacity: [0, 0.65, 0], scale: [0.82, 1.25, 1.4] } : { opacity: 0 }} transition={{ duration: 1.1, delay, ease: "easeOut" }} />
          <motion.span initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : undefined} transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : delay + 0.18 }}>
            <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          </motion.span>
        </motion.div>
      </motion.div>

      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">{value.n} {value.label}</span>
      <h3 className="mt-3 text-[18px] font-medium leading-tight tracking-[-0.025em] text-ink lg:text-[20px]">{value.title}</h3>
      <p className="mt-3 text-[13px] leading-[1.7] text-muted lg:text-[14px]">{value.desc}</p>
    </motion.article>
  )
}

export default function WhyChooseUs() {
  const reduce = Boolean(useReducedMotion())
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.18 })

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden border-b border-black/10 bg-canvas text-ink">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] h-80 w-[70%] -translate-x-1/2 rounded-full bg-brand/[0.025] blur-3xl" />
      <div className="site-container relative py-20 sm:py-24 lg:py-28">
        <motion.div className="mx-auto max-w-2xl text-center" initial={{ opacity: 0, y: reduce ? 0 : 22 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: reduce ? 0 : 0.7, ease }}>
          <div className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-faint"><span className="h-1.5 w-1.5 bg-brand" />Why Oraami</div>
          <h2 className="mt-5 text-[34px] font-medium leading-[1.02] tracking-[-0.035em] text-heading sm:text-[42px] lg:text-[48px]">Why choose us</h2>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.75] text-muted sm:text-[17px]">Four principles that make Oraami a quality-first BDR — we measure booked meetings, not send volume.</p>
        </motion.div>

        <div className="relative mt-14 hidden h-[590px] sm:block lg:mt-16">
          <Connector path={DESKTOP_PATH} viewBox="0 0 1200 590" active={inView} reduce={reduce} />
          {VALUES.map((value, index) => <JourneyStep key={value.n} value={value} index={index} active={inView} reduce={reduce} />)}
        </div>
        <div className="relative mx-auto mt-12 h-[1080px] max-w-md sm:hidden">
          <Connector path={MOBILE_PATH} viewBox="0 0 360 1080" active={inView} reduce={reduce} />
          {VALUES.map((value, index) => <JourneyStep key={value.n} value={value} index={index} active={inView} reduce={reduce} mobile />)}
        </div>
      </div>
    </section>
  )
}
