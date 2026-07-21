'use client'

import { useRef } from "react"
import { Database, KeyRound, Layers, Lock, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion"

const BADGES = ["SOC 2 Type II", "GDPR", "CCPA", "ISO 27001"]

type Capability = { Icon: LucideIcon; title: string; desc: string }

const CAPABILITIES: Capability[] = [
  {
    Icon: Layers,
    title: "Multi-tenant isolation",
    desc: "Every workspace is logically isolated — your prospects and research never mix with another tenant's data.",
  },
  {
    Icon: Lock,
    title: "Encrypted in transit & at rest",
    desc: "AES-256 at rest and TLS 1.3 in transit, across every record, message and integration.",
  },
  {
    Icon: KeyRound,
    title: "SSO & SAML",
    desc: "Enforce single sign-on with your identity provider and provision access by role.",
  },
  {
    Icon: ShieldCheck,
    title: "Role-based access & audit logs",
    desc: "Granular permissions plus a full, exportable trail of every action taken in your workspace.",
  },
  {
    Icon: Database,
    title: "Data residency & retention",
    desc: "Choose where your data lives and set retention windows to match your compliance policy.",
  },
]

const easeOut = [0.22, 1, 0.36, 1] as const

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: easeOut },
  }),
}

function BoxIcon({ Icon, active, delay, reduce }: { Icon: LucideIcon; active: boolean; delay: number; reduce: boolean }) {
  return (
    <motion.div
      className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/15 bg-canvas-soft"
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={active ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: reduce ? 0 : 0.38, delay, ease: easeOut }}
    >
      <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} aria-hidden="true" />
      <motion.span
        aria-hidden
        className="absolute -right-[5px] -top-[5px] h-2.5 w-2.5 bg-brand"
        initial={reduce ? false : { scale: 1, opacity: 1 }}
        animate={active ? { scale: [1, 1.4, 1], opacity: [1, 0.55, 1] } : undefined}
        transition={{ duration: reduce ? 0 : 0.42, delay: delay + 0.05, ease: easeOut }}
      />
    </motion.div>
  )
}

function CapabilityRow({
  capability,
  index,
  active,
  reduce,
}: {
  capability: Capability
  index: number
  active: boolean
  reduce: boolean
}) {
  const { Icon } = capability
  const order = CAPABILITIES.length - 1 - index
  const delay = 0.45 + order * 0.88

  return (
    <motion.div
      className={`group relative flex gap-5 py-7 ${index < CAPABILITIES.length - 1 ? "border-b border-dashed border-black/15" : ""}`}
      custom={delay}
      variants={itemVariants}
      initial={reduce ? false : "hidden"}
      animate={active ? "visible" : undefined}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-[22px] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/15 bg-brand/5"
        initial={reduce ? false : { opacity: 0, scale: 0.35 }}
        animate={active ? { opacity: 1, scale: [0.35, 1.25, 1] } : undefined}
        transition={{ duration: reduce ? 0 : 0.42, delay: delay + 0.08, ease: easeOut }}
      />

      <BoxIcon Icon={Icon} active={active} delay={delay + 0.1} reduce={reduce} />

      <div className="min-w-0">
        <motion.h3
          className="text-[19px] font-medium tracking-tight text-ink"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduce ? 0 : 0.34, delay: delay + 0.18, ease: easeOut }}
        >
          {capability.title}
        </motion.h3>
        <motion.p
          className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={active ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduce ? 0 : 0.34, delay: delay + 0.3, ease: easeOut }}
        >
          {capability.desc}
        </motion.p>
        <motion.span
          aria-hidden
          className="mt-7 block h-px origin-left border-t border-dashed border-black/15"
          initial={reduce ? false : { scaleX: 0 }}
          animate={active ? { scaleX: 1 } : undefined}
          transition={{ duration: reduce ? 0 : 0.35, delay: delay + 0.22, ease: easeOut }}
        />
      </div>
    </motion.div>
  )
}

export default function Security() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.35 })
  const reduce = useReducedMotion() ?? false

  return (
    <section ref={sectionRef} id="security" className="relative w-full border-b border-black/10 bg-canvas text-ink">
      <div className="site-container py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
              <span className="h-1.5 w-1.5 bg-brand" />
              Security
            </div>
            <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
              Enterprise-grade security
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
              Your data, your prospects, your reputation — protected at every layer. Oraami is built to pass procurement, not just demos.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 border border-black/12 bg-canvas-soft px-3.5 py-2.5 text-[12px] uppercase tracking-wider text-ink"
                >
                  <ShieldCheck className="h-4 w-4 text-brand" strokeWidth={2} aria-hidden="true" />
                  {b}
                </span>
              ))}
            </div>

            <p className="mt-6 text-[11px] uppercase tracking-wider text-faint">
              Independently audited · Reviewed annually
            </p>
          </div>

          <div className="relative border-t border-black/10">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-[22px] top-0 h-full w-[2px] overflow-visible"
              viewBox="0 0 20 1000"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M10 980 L10 20"
                fill="none"
                stroke="rgba(20,10,0,0.12)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M10 980 L10 20"
                fill="none"
                stroke="rgba(229,57,53,0.45)"
                strokeWidth="1.8"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? false : { pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : undefined}
                transition={{ duration: reduce ? 0 : 4.8, delay: reduce ? 0 : 0.25, ease: easeOut }}
              />
              <motion.circle
                cx="10"
                cy="980"
                r="7"
                fill="rgba(229,57,53,0.16)"
                initial={reduce ? false : { opacity: 0, cy: 980 }}
                animate={inView ? { opacity: [0, 1, 1, 0], cy: 20 } : undefined}
                transition={{ duration: reduce ? 0 : 4.8, delay: reduce ? 0 : 0.25, times: [0, 0.08, 0.92, 1], ease: easeOut }}
              />
              <motion.circle
                cx="10"
                cy="980"
                r="3.5"
                fill="#E53935"
                initial={reduce ? false : { opacity: 0, cy: 980 }}
                animate={inView ? { opacity: [0, 1, 1, 0], cy: 20 } : undefined}
                transition={{ duration: reduce ? 0 : 4.8, delay: reduce ? 0 : 0.25, times: [0, 0.08, 0.92, 1], ease: easeOut }}
              />
            </svg>

            {CAPABILITIES.map((capability, index) => {
              const active = reduce ? true : inView
              return (
                <CapabilityRow key={capability.title} capability={capability} index={index} active={active} reduce={reduce} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
