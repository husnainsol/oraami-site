"use client"

import Image from "next/image"
import {
  animate,
  motion,
  useInView,
  type Variants,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { AlignLeft, ArrowRight, Check, Clock, Minus, Repeat2, X, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useReducedMotionPreference } from "@/components/ui/use-reduced-motion-preference"
import { QualityDotsVisual } from "@/components/visuals/quality-dots"

const EASE = [0.22, 1, 0.36, 1] as const

type Principle = {
  n: string
  label: string
  title: string
  desc: string
  alt?: string
}

const PRINCIPLES: Principle[] = [
  {
    n: "01",
    label: "QUALITY",
    title: "Quality over volume",
    desc: "We cap every ICP at 50 high-fit accounts, so your team works the leads that convert — never a bloated list.",
  },
  {
    n: "02",
    label: "ICP",
    title: "Built around your ICP",
    desc: "Oraami learns exactly who you sell to and shapes every play around your ideal customer, not a generic template.",
    alt: "Built around your ICP",
  },
  {
    n: "03",
    label: "RESEARCH",
    title: "Deep research, every lead",
    desc: "5–10 minutes of autonomous AI research on each prospect and their full buying committee before a word is sent.",
  },
  {
    n: "04",
    label: "TRUST",
    title: "Trust that compounds",
    desc: "8–12 personalised touches over 6–12 weeks turn cold accounts into warm relationships that keep paying off.",
  },
]

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: EASE,
    },
  },
}

function CopyBlock({
  n,
  label,
  title,
  desc,
  dark = false,
}: Pick<Principle, "n" | "label" | "title" | "desc"> & {
  dark?: boolean
}) {
  return (
    <div className={dark ? "text-white" : "text-[#101828]"}>
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand">
        {n} {label}
      </p>

      <h3
        className={[
          "landing-card-title mt-2.5",
          dark ? "text-white" : "text-[#101828]",
        ].join(" ")}
      >
        {title}
      </h3>

      <p
        className={[
          "landing-card-description mt-2.5",
          dark ? "text-white/72" : "text-[#667085]",
        ].join(" ")}
      >
        {desc}
      </p>
    </div>
  )
}

function WhiteImageCard({ principle }: { principle: Principle }) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[15px] border border-black/[0.05] bg-white p-4 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.26)]">
      <div className="relative aspect-[16/8] w-full shrink-0 overflow-hidden rounded-[11px] bg-[linear-gradient(180deg,#fafaf9_0%,#f3f3f1_100%)]">
        <QualityDotsVisual />
      </div>

      <div className="mt-4 min-w-0 flex-1">
        <CopyBlock
          n={principle.n}
          label={principle.label}
          title={principle.title}
          desc={principle.desc}
        />
      </div>
    </article>
  )
}

function NotchCard({ principle }: { principle: Principle }) {
  return (
    <article className="relative h-full w-full overflow-hidden">
      <Image
        src="/p2.svg"
        alt={principle.alt ?? principle.title}
        fill
        unoptimized
        sizes="(min-width: 1280px) 500px, (min-width: 640px) 50vw, 100vw"
        className="block object-contain object-center"
      />
    </article>
  )
}

function TrustCard({ principle }: { principle: Principle }) {
  return (
    <article className="h-full w-full overflow-hidden rounded-[15px] border border-brand/35 bg-white p-4 shadow-[0_12px_30px_-30px_rgba(245,73,0,0.3)]">
      <div className="max-w-[330px]">
        <CopyBlock
          n={principle.n}
          label={principle.label}
          title={principle.title}
          desc={principle.desc}
        />
      </div>
    </article>
  )
}

function WhyChooseUsDesktop({ active }: { active: boolean }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      className="hidden grid-cols-3 items-start gap-3 lg:grid"
    >
      <motion.div
        variants={itemVariants}
        className="h-[352px] min-w-0"
      >
        <WhiteImageCard principle={PRINCIPLES[0]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="h-[350px] min-w-0"
      >
        <NotchCard principle={PRINCIPLES[1]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid h-[340px] min-w-0 grid-rows-2 gap-3"
      >
        <TrustCard principle={PRINCIPLES[2]} />
        <TrustCard principle={PRINCIPLES[3]} />
      </motion.div>
    </motion.div>
  )
}

function WhyChooseUsResponsive({ active }: { active: boolean }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      className="grid gap-3 sm:grid-cols-2 lg:hidden"
    >
      <motion.div variants={itemVariants} className="min-w-0">
        <WhiteImageCard principle={PRINCIPLES[0]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="relative aspect-[433/360] min-w-0 overflow-hidden"
      >
        <NotchCard principle={PRINCIPLES[1]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="min-h-[180px] min-w-0"
      >
        <TrustCard principle={PRINCIPLES[2]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="min-h-[180px] min-w-0"
      >
        <TrustCard principle={PRINCIPLES[3]} />
      </motion.div>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotionPreference()
  const sectionRef = useRef<HTMLElement>(null)

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.22,
  })

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-ink"
    >
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: EASE,
          }}
        >
          <h2 className="landing-section-title">
            Why Choose Oraami
          </h2>
        </motion.div>

        <div className="mt-8">
          <WhyChooseUsDesktop active={inView} />
          <WhyChooseUsResponsive active={inView} />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Why Oraami: Hero ------------------------------ */

export function WhyOraamiHero() {
  return (
    <section className="bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5">
      <div className="relative isolate min-h-[55svh] overflow-hidden rounded-[20px] bg-oraami-accent-secondary text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_45%,color-mix(in_srgb,var(--color-brand)_8%,transparent),transparent_36%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[18%] top-1/2 h-[80%] w-[48%] -translate-y-1/2 rounded-full bg-brand/[0.04] blur-[110px]"
        />

        <div className="landing-container relative flex min-h-[55svh] items-center py-10 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-[880px] text-center">
            <h1 className="mx-auto max-w-[760px] text-balance text-[clamp(2.1rem,7.8vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-indigo-soft">
              Stop Guessing
              <span className="block">
                who&apos;s <span className="text-brand-deep">Worth Reaching.</span>
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-[650px] text-[17px] leading-[1.62] text-white/65 sm:text-[18px]">
              Most prospecting tools hand you a longer list.{" "}
              <span className="font-semibold text-white/90">Oraami</span> hands you the right person, ranked, profiled, and ready to message.
            </p>

            <div className="mt-9 flex items-center justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                icon={ArrowRight}
                className="px-5 transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Why Oraami: Problem ----------------------------- */

type ProblemCard = {
  Icon: LucideIcon
  title: string
  desc: string
}

const PROBLEM_CARDS: ProblemCard[] = [
  {
    Icon: Clock,
    title: "Hours lost to manual research",
    desc: "Your reps spend more time building lists in spreadsheets than having conversations with prospects.",
  },
  {
    Icon: AlignLeft,
    title: "Generic outreach that gets ignored",
    desc: "Copy-pasted templates land in trash. Buyers can spot a mass email in seconds — and they do.",
  },
  {
    Icon: Repeat2,
    title: "Prospects that never fit your ICP",
    desc: "Without a precise profile, teams chase every lead equally and waste quota on companies that will never convert.",
  },
  {
    Icon: X,
    title: "Scattered tools, broken workflows",
    desc: "Switching between lead databases, CRMs, and email tools means data falls through the cracks every single day.",
  },
]

const problemContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

const problemItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

export function WhyOraamiProblem() {
  const reduceMotion = useReducedMotionPreference()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.22 })

  return (
    <section ref={sectionRef} className="w-full bg-white text-ink">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
        >
          <span className="inline-flex items-center rounded-full bg-brand/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-brand-deep">
            The problem
          </span>

          <h2 className="landing-section-title !font-bold mt-5">
            Outbound is Broken, You Already Know it
          </h2>

          <p className="landing-section-description mt-4 max-w-[860px]">
            Sales teams are burning cycles on the wrong activities — researching leads manually, blasting generic copy, and juggling a patchwork of tools that don&apos;t talk to each other. The result: a pipeline full of noise and a team running on empty.
          </p>
        </motion.div>

        <motion.div
          variants={problemContainerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={inView ? "visible" : "hidden"}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROBLEM_CARDS.map(({ Icon, title, desc }) => (
            <motion.article
              key={title}
              variants={problemItemVariants}
              className="rounded-[15px] border border-brand/10 bg-brand/[0.04] p-5 shadow-[0_12px_30px_-30px_rgba(245,73,0,0.3)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-white text-brand">
                <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>

              <h3 className="mt-3.5 text-[15px] font-bold leading-[1.35] tracking-[-0.01em] text-heading">
                {title}
              </h3>
              <p className="landing-card-description mt-2">{desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ----------------------------- Why Oraami: Reasons ----------------------------- */

const REASONS = [
  {
    title: "Tell Oraami what you're looking for in a simple chat",
    desc: "Natural conversation that understands your goals and target audience.",
  },
  {
    title: "Oraami builds your ICP and finds matching companies",
    desc: "AI does the heavy lifting so you can focus on the right prospects.",
  },
  {
    title: "Leads come with match scores and key insights",
    desc: "Know instantly which prospects are the best fit for your business.",
  },
  {
    title: "Messages are written for each person and their company",
    desc: "Create personalized outreach that feels relevant, not templated.",
  },
  {
    title: "Everything lives in one organized workspace",
    desc: "Manage leads, contacts, and outreach without switching between tools.",
  },
]

const BOT_MESSAGES = [
  "What type of companies are you targeting?",
  "Got it. What's the job title of your ideal buyer?",
  "What pain point are they solving right now?",
]

const USER_MESSAGES = ["B2B SaaS companies, 50–500 employees", "VP of Sales or Head of Revenue"]

const ICP_STATS = [
  { label: "Est. Leads", value: "3,200" },
  { label: "AI Leads", value: "0" },
  { label: "Campaigns", value: "0" },
] as const

const CHAT_ITEMS = [
  { role: "bot", text: BOT_MESSAGES[0] },
  { role: "user", text: USER_MESSAGES[0] },
  { role: "bot", text: BOT_MESSAGES[1] },
  { role: "user", text: USER_MESSAGES[1] },
  { role: "bot", text: BOT_MESSAGES[2] },
] as const

const CHAT_MESSAGE_STAGGER = 0.45
const CHAT_MESSAGE_DELAY = 0.25
const CHAT_SCORE_TARGET = 88

const chatListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: CHAT_MESSAGE_STAGGER,
      delayChildren: CHAT_MESSAGE_DELAY,
    },
  },
}

const chatBubbleVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE },
  },
}

const reasonsItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

function BotBubble({ children }: { children: string }) {
  return (
    <div className="flex justify-start">
      <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2.5 text-[13px] leading-[1.5] text-white/85">
        {children}
      </p>
    </div>
  )
}

function UserBubble({ children }: { children: string }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 text-[13px] leading-[1.5] text-white">
        {children}
      </p>
    </div>
  )
}

function ChatMockup() {
  const reduceMotion = useReducedMotionPreference()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!inView) return

    if (reduceMotion) {
      setScore(CHAT_SCORE_TARGET)
      return
    }

    const scoreStartDelay =
      (CHAT_MESSAGE_DELAY + CHAT_ITEMS.length * CHAT_MESSAGE_STAGGER) * 1000

    const timeout = setTimeout(() => {
      animate(0, CHAT_SCORE_TARGET, {
        duration: 1.1,
        ease: EASE,
        onUpdate: (value) => setScore(Math.round(value)),
      })
    }, scoreStartDelay)

    return () => clearTimeout(timeout)
  }, [inView, reduceMotion])

  return (
    <div
      ref={ref}
      className="flex h-full flex-col rounded-[20px] bg-oraami-accent-secondary p-6 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.26)] sm:p-7"
    >
      <div className="flex items-center justify-between">
        <div className="shrink-0">
          <Image src="/icon2.svg" alt="Oraami" width={99} height={38} className="h-9 w-auto" />
        </div>
        <span className="flex items-center gap-1.5 text-[12px] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
          Building your ICP
        </span>
      </div>

      <motion.div
        variants={chatListVariants}
        initial={reduceMotion ? false : "hidden"}
        animate={inView ? "visible" : "hidden"}
        className="mt-6 flex flex-col gap-3"
      >
        {CHAT_ITEMS.map((item, index) => (
          <motion.div key={index} variants={chatBubbleVariants}>
            {item.role === "bot" ? <BotBubble>{item.text}</BotBubble> : <UserBubble>{item.text}</UserBubble>}
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4 rounded-[14px] border border-brand/30 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[14px] font-semibold text-white">ICP: B2B SaaS VP Sales</p>
          <span className="shrink-0 rounded-full bg-green-soft px-2.5 py-1 text-[11px] font-medium text-green-deep">
            Active
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between text-[12px]">
          <span className="text-white/50">Specificity Score</span>
          <span className="font-semibold text-brand-deep">{score} / 100</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-brand" style={{ width: `${score}%` }} />
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          {ICP_STATS.map((stat) => (
            <p key={stat.label} className="text-[11px] text-white/50">
              {stat.label}: <span className="font-semibold text-white">{stat.value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WhyOraamiReasons() {
  const reduceMotion = useReducedMotionPreference()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section ref={sectionRef} className="w-full bg-canvas text-ink">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
          className="landing-section-title !font-bold"
        >
          Reasons Teams Switch
          <span className="block">to Oraami</span>
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          <motion.div
            variants={reasonsItemVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={inView ? "visible" : "hidden"}
            className="rounded-[16px] border border-l-4 border-black/[0.06] border-l-brand bg-white p-6 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.26)] sm:p-7"
          >
            <p className="text-[17px] font-bold text-brand">The Oraami way</p>

            <ul className="mt-4">
              {REASONS.map((reason, index) => (
                <li
                  key={reason.title}
                  className={`flex gap-3 py-4 ${index < REASONS.length - 1 ? "border-b border-black/[0.06]" : ""} ${index === 0 ? "pt-2" : ""}`}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/[0.09] text-brand">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14.5px] font-bold leading-[1.3] tracking-[-0.01em] text-heading">{reason.title}</p>
                    <p className="landing-card-description mt-1">{reason.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={reasonsItemVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={inView ? "visible" : "hidden"}
          >
            <ChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------- Why Oraami: Comparison --------------------------- */

const COMPARISON_ROWS = [
  {
    label: "Account selection",
    oraami: "High-fit accounts capped by ICP",
    software: "Large uploaded or purchased lists",
    agency: "Broad lists set by campaign volume",
  },
  {
    label: "Research depth",
    oraami: "Minutes of AI research for every lead",
    software: "Basic enrichment fields",
    agency: "Varies by rep and workload",
  },
  {
    label: "Personalisation",
    oraami: "Account, signal, and stakeholder context",
    software: "Templates and merge fields",
    agency: "Manual and difficult to scale",
  },
  {
    label: "Buying committees",
    oraami: "Multiple stakeholders mapped per account",
    software: "Usually one contact at a time",
    agency: "Dependent on individual rep process",
  },
  {
    label: "Primary success metric",
    oraami: "Qualified conversations and meetings",
    software: "Emails sent and tasks completed",
    agency: "Activity volume and meetings booked",
  },
]

export function CompetitorComparison() {
  return (
    <section className="bg-canvas text-ink">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <div className="max-w-2xl">
          <h2 className="landing-section-title">Quality-first outreach, side by side</h2>
          <p className="landing-section-description mt-4 max-w-xl">
            See how Oraami differs from volume-led prospecting software and traditional outsourced SDR teams.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[16px] border border-black/10 bg-white">
          <div className="hidden grid-cols-[0.72fr_repeat(3,minmax(0,1fr))] border-b border-black/10 bg-[#f6f6f6] md:grid">
            <div className="p-4 lg:p-5" />
            <div className="border-l border-brand/20 bg-brand/[0.06] p-4 lg:p-5">
              <p className="text-[13px] font-semibold text-heading">Oraami</p>
              <p className="mt-1 text-[11px] text-muted">Quality-first AI BDR</p>
            </div>
            <div className="border-l border-black/10 p-4 lg:p-5">
              <p className="text-[13px] font-semibold text-heading">Competitor</p>
              <p className="mt-1 text-[11px] text-muted">Volume-led tools</p>
            </div>
            <div className="border-l border-black/10 p-4 lg:p-5">
              <p className="text-[13px] font-semibold text-heading">Competitor</p>
              <p className="mt-1 text-[11px] text-muted">Traditional service</p>
            </div>
          </div>

          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.label}
              className="grid gap-3 border-b border-black/10 p-5 last:border-b-0 md:grid-cols-[0.72fr_repeat(3,minmax(0,1fr))] md:gap-0 md:p-0"
            >
              <p className="self-center text-[12px] font-semibold text-heading md:p-4 lg:p-5">{row.label}</p>
              <div className="flex gap-2.5 rounded-xl bg-brand/[0.06] p-3 md:rounded-none md:border-l md:border-brand/20 md:p-4 lg:p-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden="true" />
                <div>
                  <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-brand md:hidden">Oraami</span>
                  <p className="text-[12px] leading-[1.5] text-heading sm:text-[13px]">{row.oraami}</p>
                </div>
              </div>
              <div className="flex gap-2.5 p-3 md:border-l md:border-black/10 md:p-4 lg:p-5">
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
                <div>
                  <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-faint md:hidden">Competitor</span>
                  <p className="text-[12px] leading-[1.5] text-muted sm:text-[13px]">{row.software}</p>
                </div>
              </div>
              <div className="flex gap-2.5 p-3 md:border-l md:border-black/10 md:p-4 lg:p-5">
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
                <div>
                  <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-faint md:hidden">Competitor</span>
                  <p className="text-[12px] leading-[1.5] text-muted sm:text-[13px]">{row.agency}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Why Oraami: Final CTA ---------------------------- */

export function WhyOraamiCta() {
  return (
    <section className="w-full bg-white text-ink">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <div className="relative overflow-hidden rounded-[24px] bg-oraami-accent-secondary p-8 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/16"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-brand/16"
          />

          <div className="relative max-w-xl">
            <h2 className="text-[28px] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[34px] lg:text-[40px]">
              See <span className="text-brand">Oraami</span> in action.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85 sm:text-[16px]">
              Set up your ICP, discover your first leads, and send personalized outreach — all in your first session.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                icon={ArrowRight}
                className="bg-white text-brand hover:bg-brand hover:text-white focus-visible:ring-white/50 focus-visible:ring-offset-oraami-accent-secondary"
              >
                Get Started
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="md"
                icon={ArrowRight}
                className="border-white bg-transparent text-white hover:border-brand hover:bg-white/10 focus-visible:ring-white/50 focus-visible:ring-offset-oraami-accent-secondary"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
