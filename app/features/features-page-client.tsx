"use client"

import { useEffect, useRef, useState, useSyncExternalStore, type HTMLAttributes, type ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  FileCheck2,
  Gauge,
  Mail,
  Network,
  Radar,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import CountUp from "@/components/ui/count-up"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FeatureId = "icp" | "research" | "signals" | "stakeholders" | "proof" | "sequence" | "quality" | "reporting"

type Feature = {
  id: FeatureId
  n: string
  title: string
  short: string
  moment: string
  detail: string
  tags: readonly [string, string]
  icon: LucideIcon
  accent: string
}

type SentinelHook = {
  active: number
  register: (index: number) => (node: HTMLDivElement | null) => void
}

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

type PillProps = {
  children: ReactNode
  active?: boolean
  className?: string
}

const FEATURES: Feature[] = [
  {
    id: "icp",
    n: "01",
    title: "ICP research & targeting",
    short: "High-fit accounts first.",
    moment: "Best-fit account selected",
    detail: "Northfield ranks first after fit, growth and company data are verified.",
    tags: ["94% ICP fit", "Data verified"],
    icon: Target,
    accent: "94% fit",
  },
  {
    id: "research",
    n: "02",
    title: "Deep lead research",
    short: "Profile, tech stack, context.",
    moment: "Account context enriched",
    detail: "Company profile, technology and commercial context are ready for outreach.",
    tags: ["6 data fields", "Profile complete"],
    icon: Search,
    accent: "Verified data",
  },
  {
    id: "signals",
    n: "03",
    title: "Buying-signal detection",
    short: "Timing gets clearer.",
    moment: "Strong signal detected",
    detail: "A recent product launch changes account priority from medium to high.",
    tags: ["2 days ago", "High priority"],
    icon: Radar,
    accent: "Signal detected",
  },
  {
    id: "stakeholders",
    n: "04",
    title: "Multi-stakeholder mapping",
    short: "See the buying committee.",
    moment: "Buying committee mapped",
    detail: "Influence, likely role and outreach priority are clear across the account.",
    tags: ["6 stakeholders", "Champion found"],
    icon: Network,
    accent: "6 stakeholders",
  },
  {
    id: "proof",
    n: "05",
    title: "Case-study matching",
    short: "Relevant proof rises first.",
    moment: "Strongest proof selected",
    detail: "The closest industry, company-size and use-case match moves to the top.",
    tags: ["91% relevance", "Proof selected"],
    icon: FileCheck2,
    accent: "91% match",
  },
  {
    id: "sequence",
    n: "06",
    title: "Trust-building sequences",
    short: "A calm cadence builds trust.",
    moment: "Trust sequence assembled",
    detail: "Research and proof become a measured eight-week outreach cadence.",
    tags: ["5 touches", "8-week flow"],
    icon: Mail,
    accent: "8-week flow",
  },
  {
    id: "quality",
    n: "07",
    title: "AI quality scoring",
    short: "Quality checked before send.",
    moment: "Message approved",
    detail: "Fit, relevance, tone, proof and timing pass the quality review.",
    tags: ["96 quality", "Ready to send"],
    icon: Gauge,
    accent: "96 score",
  },
  {
    id: "reporting",
    n: "08",
    title: "Analytics & reporting",
    short: "Pipeline visibility, cleanly.",
    moment: "Pipeline impact visible",
    detail: "Research activity, replies, meetings and pipeline stay connected.",
    tags: ["Live reporting", "9 meetings"],
    icon: BarChart3,
    accent: "Real-time",
  },
]

const ICP_COMPANIES = [
  { name: "Northfield", fit: 94, meta: "B2B SaaS · 120-300 employees" },
  { name: "Cedar Lane", fit: 81, meta: "Services · 300-500 employees" },
  { name: "Harbor & Co", fit: 68, meta: "Retail tech · 50-120 employees" },
]

const RESEARCH_ROWS = [
  ["Industry", "B2B software"],
  ["Employees", "146"],
  ["Geography", "UK + EU"],
  ["Tech stack", "HubSpot, Segment, Notion"],
  ["Funding", "Series A"],
  ["Priority", "Pipeline creation"],
] as const

const SIGNAL_EVENTS = [
  ["Funding", "2 days ago"],
  ["Hiring", "RevOps lead"],
  ["Launch", "New platform"],
  ["Leadership", "VP Sales"],
  ["Expansion", "North America"],
  ["Change", "CRM migration"],
] as const

const STAKEHOLDERS = [
  { role: "Founder", note: "Champion" },
  { role: "Head of Sales", note: "Decision-maker" },
  { role: "Marketing Director", note: "Influencer" },
  { role: "Operations Lead", note: "Evaluator" },
  { role: "Finance", note: "Budget" },
  { role: "Technical", note: "Technical evaluator" },
] as const

const SEQUENCE_STEPS = [
  ["Week 1", "Context intro"],
  ["Week 2", "Relevant proof"],
  ["Week 4", "Pain point follow-up"],
  ["Week 6", "Low-pressure CTA"],
  ["Week 8", "Response recap"],
] as const

const QUALITY_CHECKS = ["ICP fit", "Personalisation", "Relevance", "Proof", "Tone", "Timing"] as const

const DASHBOARD_METRICS = [
  ["Leads researched", "248"],
  ["High-fit accounts", "73"],
  ["Positive replies", "18"],
  ["Meetings booked", "9"],
  ["Pipeline created", "$420k"],
] as const

const JOURNEY_INSIGHTS: Record<FeatureId, {
  metrics: readonly [readonly [string, string], readonly [string, string], readonly [string, string]]
  title: string
  reasons: readonly string[]
  action: string
}> = {
  icp: { metrics: [["Verified accounts", "3,247"], ["High outreach priority", "842"], ["Average ICP fit", "76%"]], title: "Why Northfield is a strong fit", reasons: ["Strong industry and size alignment", "High growth signals", "Active hiring in GTM roles", "Relevant technology stack"], action: "Explore account" },
  research: { metrics: [["Fields enriched", "24"], ["Sources verified", "8"], ["Research depth", "92%"]], title: "Research ready for personalisation", reasons: ["Current priorities identified", "Decision context is verified", "Technology stack mapped", "Two likely pain points found"], action: "Open dossier" },
  signals: { metrics: [["Signals this week", "17"], ["Priority accounts", "38"], ["Signal confidence", "92%"]], title: "Why priority moved to High", reasons: ["New funding announced", "GTM hiring increased 34%", "VP Sales joined this month", "North America launch detected"], action: "Review signals" },
  stakeholders: { metrics: [["Stakeholders", "6"], ["Influence coverage", "84%"], ["Suggested order", "1–6"]], title: "A clear route into the account", reasons: ["Founder is the likely champion", "Head of Sales owns the decision", "Technical evaluator identified", "Finance joins after validation"], action: "View stakeholder map" },
  proof: { metrics: [["Case studies", "46"], ["Top match", "91%"], ["Proof strength", "High"]], title: "Why this case study wins", reasons: ["Same B2B software category", "Comparable company size", "Matching pipeline challenge", "Strong measurable outcome"], action: "Use this proof" },
  sequence: { metrics: [["Active sequences", "128"], ["Open rate", "64%"], ["Positive replies", "18%"]], title: "Why this sequence feels human", reasons: ["Each touch adds new value", "Relevant proof arrives in week 3", "No generic repeated follow-ups", "Reply pauses remaining steps"], action: "Review sequence" },
  quality: { metrics: [["Messages reviewed", "1,420"], ["Approval rate", "89%"], ["Average score", "91"]], title: "Why this message is ready", reasons: ["Specific to the account context", "Proof supports the main claim", "Tone is direct and respectful", "Timing matches an active signal"], action: "Open message" },
  reporting: { metrics: [["Meetings booked", "29"], ["Positive replies", "64"], ["Pipeline generated", "$420k"]], title: "What is driving performance", reasons: ["High-fit accounts reply 2.4× more", "Signal-led outreach leads results", "Case-study touches lift meetings", "Reply trend is up this month"], action: "View report" },
}

function useSentinelIndex(count: number, reduceMotion: boolean): SentinelHook {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return

        const nextIndex = Number((visible.target as HTMLElement).dataset.index ?? 0)
        setActive(nextIndex)
      },
      {
        threshold: [0.32, 0.5, 0.72],
        rootMargin: "-20% 0px -35% 0px",
      },
    )

    refs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [count, reduceMotion])

  const register = (index: number) => (node: HTMLDivElement | null) => {
    refs.current[index] = node
  }

  return { active, register }
}

const EASE = [0.22, 1, 0.36, 1] as const

const subscribeToReducedMotion = (onChange: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)")
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

const getReducedMotionSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
const getReducedMotionServerSnapshot = () => false

function useHydratedReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot)
}

function Panel({ children, className, ...props }: PanelProps) {
  return (
    <div
      className={cn("rounded-[28px] border border-black/10 bg-white shadow-[0_24px_54px_-34px_rgba(34,18,12,0.28)]", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function Pill({ children, active = false, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors",
        active ? "border-brand/25 bg-brand/10 text-brand" : "border-black/10 bg-white text-ink-mute",
        className,
      )}
    >
      {children}
    </span>
  )
}

function ScoreRing({ value }: { value: number }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="h-32 w-32 rounded-full bg-[conic-gradient(var(--brand)_0deg,var(--brand)_calc(var(--score)*1%),rgba(30,26,77,0.10)_calc(var(--score)*1%),rgba(30,26,77,0.10)_360deg)] [--score:0.94]" style={{ background: `conic-gradient(var(--color-brand) ${value * 3.6}deg, rgba(30,26,77,0.10) ${value * 3.6}deg)` }}>
        <div className="m-[12px] flex h-[calc(100%-24px)] w-[calc(100%-24px)] flex-col items-center justify-center rounded-full border border-black/10 bg-white">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted">ICP fit</span>
          <span className="mt-1 text-[34px] font-medium tracking-[-0.04em] text-heading">
            <CountUp end={value} duration={1600} suffix="%" />
          </span>
        </div>
      </div>
    </div>
  )
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="max-w-2xl"
    >
      <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-faint">
        <span className="h-1.5 w-1.5 bg-brand" />
        {eyebrow}
      </div>
      <h2 className="mt-4 text-balance text-[32px] font-medium leading-[1.05] tracking-[-0.025em] text-heading sm:text-[40px] lg:text-[46px]">{title}</h2>
      <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">{description}</p>
    </motion.div>
  )
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-canvas-soft px-3 py-2.5">
      <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">{label}</p>
      <p className="mt-1 text-[14px] font-medium text-heading">{value}</p>
    </div>
  )
}

function HeroResearchFlow() {
  const reduceMotion = useHydratedReducedMotion()
  const stages = [
    { label: "Account fit", value: "94%", icon: Target },
    { label: "Buying signal", value: "Detected", icon: Radar },
    { label: "Buying group", value: "6 people", icon: Network },
  ] as const

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: 20, scale: 0.985 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
      className="relative mx-auto w-full max-w-[34rem] lg:mx-0 lg:ml-auto"
      aria-label="Oraami account research example"
    >
      <div aria-hidden className="absolute -inset-4 rounded-[38px] bg-brand/[0.045] blur-2xl" />
      <Panel className="relative overflow-hidden p-3 sm:p-4">
        <div className="flex items-center justify-between border-b border-black/10 px-2 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-oraami-accent-secondary text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-faint">Oraami research engine</p>
              <p className="text-[13px] font-medium text-heading">Northfield account</p>
            </div>
          </div>
          <Pill active>Researching</Pill>
        </div>

        <div className="relative mt-3 overflow-hidden rounded-[24px] border border-white/10 bg-oraami-accent-secondary p-4 text-white sm:p-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">Target account</p>
              <p className="mt-1 text-[19px] font-medium">Northfield</p>
              <p className="mt-1 text-[12px] text-white/60">B2B software · UK + EU</p>
            </div>
            <div className="rounded-2xl border border-brand/25 bg-brand/10 px-3 py-2 text-right">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/55">Priority</p>
              <p className="mt-0.5 text-[14px] font-medium text-white">High</p>
            </div>
          </div>

          <div className="relative mt-5 space-y-2.5">
            {stages.map((stage) => {
              const Icon = stage.icon
              return (
                <motion.div
                  key={stage.label}
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/12 text-brand">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 text-[13px] text-white/70">{stage.label}</span>
                  <span className="text-[13px] font-medium text-white">{stage.value}</span>
                  <CheckCircle2 className="h-4 w-4 text-brand" aria-hidden="true" />
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-3 flex items-center justify-between rounded-2xl border border-brand/25 bg-brand/10 px-4 py-3"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.17em] text-white/55">Next best action</p>
              <p className="mt-1 text-[13px] font-medium text-white">Personalised outreach ready</p>
            </div>
            <ArrowRight className="h-4 w-4 text-brand" aria-hidden="true" />
          </motion.div>
        </div>
      </Panel>
    </motion.div>
  )
}

function FeatureVisual({ feature }: { feature: Feature }) {
  const reduceMotion = useHydratedReducedMotion()

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={feature.id}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 24, y: 6, scale: 0.985, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -18, y: -4, scale: 0.985, filter: "blur(6px)" }}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease: EASE }}
        className="relative h-full overflow-hidden will-change-transform"
      >
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[22%] bg-[linear-gradient(90deg,transparent,rgba(245,73,0,0.07),transparent)]"
            initial={{ left: "-25%", opacity: 0 }}
            animate={{ left: "110%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.95, ease: EASE }}
          />
        )}
        {feature.id === "icp" && (
          <Panel className="flex h-full flex-col p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{feature.n} / {feature.title}</p>
                <p className="mt-1 text-[18px] font-medium text-heading">Find the accounts that actually fit.</p>
              </div>
              <Pill active>{feature.accent}</Pill>
            </div>
            <div className="mt-4 grid min-h-0 flex-1 gap-3 xl:grid-cols-[0.96fr_1.04fr]">
              <div className="flex min-h-0 flex-col justify-between gap-3">
                {ICP_COMPANIES.map((company, index) => (
                  <motion.article
                    key={company.name}
                    initial={false}
                    animate={index === 0 ? { y: 0, opacity: 1 } : { y: 0, opacity: 0.66 }}
                    className={cn(
                      "rounded-[22px] border p-4 transition-shadow",
                      index === 0 ? "border-brand/25 bg-brand/[0.04] shadow-[0_12px_28px_-18px_rgba(245,73,0,0.35)]" : "border-black/10 bg-white",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[15px] font-medium text-heading">{company.name}</p>
                        <p className="mt-1 text-[13px] text-muted">{company.meta}</p>
                      </div>
                      <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-medium text-brand">{company.fit}%</span>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${company.fit}%` }} />
                    </div>
                  </motion.article>
                ))}
              </div>
              <div className="flex flex-col justify-between rounded-[24px] border border-black/10 bg-oraami-accent-secondary p-5 text-white">
                <div className="flex items-center justify-between">
                  <Pill active className="border-white/10 bg-white/10 text-white">Verified account data</Pill>
                  <Pill className="border-white/10 bg-white/5 text-white/75">High outreach priority</Pill>
                </div>
                <div className="mt-4 flex justify-center">
                  <ScoreRing value={94} />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <MiniMetric label="Industry" value="B2B software" />
                  <MiniMetric label="Size" value="146 employees" />
                  <MiniMetric label="Growth" value="Series A" />
                  <MiniMetric label="Need" value="Pipeline creation" />
                </div>
              </div>
            </div>
          </Panel>
        )}

        {feature.id === "research" && (
          <Panel className="flex h-full flex-col overflow-hidden p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{feature.n} / {feature.title}</p>
                <p className="mt-1 text-[18px] font-medium text-heading">Research context fills in cleanly.</p>
              </div>
              <Pill active>{feature.accent}</Pill>
            </div>
            <div className="mt-4 grid min-h-0 flex-1 gap-3 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="rounded-[24px] border border-black/10 bg-canvas-soft p-4">
                <div className="flex items-center gap-3 rounded-[20px] border border-black/10 bg-white p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-heading">Northfield profile</p>
                    <p className="text-[13px] text-muted">Research panel with verified enrichment</p>
                  </div>
                </div>
                <div className="mt-4 grid min-h-0 flex-1 gap-3 sm:grid-cols-2">
                  {RESEARCH_ROWS.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-black/10 bg-white px-3 py-3.5">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</p>
                      <p className="mt-1 text-[14px] font-medium text-heading">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] border border-black/10 bg-oraami-accent-secondary p-4 text-white">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">What Oraami adds</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Verified company data",
                    "Technology stack",
                    "Growth indicators",
                    "Business priorities",
                  ].map((tag) => (
                    <Pill key={tag} active className="border-white/10 bg-white/10 text-white">
                      {tag}
                    </Pill>
                  ))}
                </div>
                <div className="mt-5 space-y-3 rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-center justify-between text-[13px] text-white/80">
                    <span>Deep lead research</span>
                    <span className="text-white">Complete</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div className="h-full w-[92%] rounded-full bg-brand" />
                  </div>
                  <p className="text-[13px] leading-relaxed text-white/70">Enough context to personalise without bloating the list.</p>
                </div>
              </div>
            </div>
          </Panel>
        )}

        {feature.id === "signals" && (
          <Panel className="flex h-full flex-col p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{feature.n} / {feature.title}</p>
                <p className="mt-1 text-[18px] font-medium text-heading">Reach accounts when timing is strongest.</p>
              </div>
              <Pill active>{feature.accent}</Pill>
            </div>
            <div className="mt-4 grid min-h-0 flex-1 gap-3 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[22px] border border-black/10 bg-oraami-accent-secondary p-3 text-white">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Signal timeline</p>
                <div className="mt-3 space-y-2">
                  {SIGNAL_EVENTS.map(([label, value], index) => (
                    <div key={label} className={cn("flex items-center gap-3 rounded-2xl border px-3 py-2", index === 2 ? "border-brand/20 bg-brand/10" : "border-white/10 bg-white/[0.05]")}>
                      <span className={cn("h-2.5 w-2.5 rounded-full", index === 2 ? "bg-brand" : "bg-white/20")} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[14px] font-medium text-white">{label}</p>
                          <p className="text-[12px] text-white/60">{value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 rounded-[24px] border border-black/10 bg-canvas-soft p-4">
                <div className="rounded-[20px] border border-black/10 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Priority</p>
                  <p className="mt-2 text-[24px] font-medium text-heading">High</p>
                  <p className="mt-1 text-[13px] text-muted">Strong buying signal detected.</p>
                </div>
                <div className="rounded-[20px] border border-black/10 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Recommended action</p>
                  <p className="mt-2 text-[15px] font-medium text-heading">Personalised outreach</p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <MiniMetric label="Relevance" value="High" />
                    <MiniMetric label="Recency" value="2 days ago" />
                    <MiniMetric label="Confidence" value="92%" />
                    <MiniMetric label="Timing" value="Immediate" />
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        )}

        {feature.id === "stakeholders" && (
          <Panel className="flex h-full flex-col p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{feature.n} / {feature.title}</p>
                <p className="mt-1 text-[18px] font-medium text-heading">Understand the full buying committee.</p>
              </div>
              <Pill active>{feature.accent}</Pill>
            </div>
            <div className="mt-3 grid min-h-0 flex-1 gap-3 min-[1180px]:grid-cols-[1.18fr_0.82fr]">
              <div className="relative h-full min-h-0 overflow-hidden rounded-[22px] border border-black/10 bg-canvas-soft">
                <svg aria-hidden="true" viewBox="0 0 600 340" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
                  {["M300 170 L90 65", "M300 170 L510 65", "M300 170 L84 170", "M300 170 L516 170", "M300 170 L130 285", "M300 170 L470 285"].map((path, index) => (
                    <motion.path key={path} d={path} stroke={index < 2 ? "rgba(245,73,0,0.5)" : "rgba(30,26,77,0.2)"} strokeWidth="2" fill="none" initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.65, delay: index * 0.07, ease: EASE }} />
                  ))}
                </svg>
                <div className="absolute left-1/2 top-1/2 z-10 flex h-[72px] w-[112px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[18px] border border-brand/30 bg-oraami-accent-secondary text-center text-white shadow-[0_18px_38px_-22px_rgba(30,26,77,0.65)]">
                  <p className="text-[8px] uppercase tracking-[0.16em] text-white/50">Target account</p><p className="mt-1 text-[13px] font-medium">Northfield</p>
                </div>
                {[
                  { x: "15%", y: "19%", stakeholder: STAKEHOLDERS[0] }, { x: "85%", y: "19%", stakeholder: STAKEHOLDERS[1] },
                  { x: "14%", y: "50%", stakeholder: STAKEHOLDERS[2] }, { x: "86%", y: "50%", stakeholder: STAKEHOLDERS[3] },
                  { x: "22%", y: "84%", stakeholder: STAKEHOLDERS[4] }, { x: "78%", y: "84%", stakeholder: STAKEHOLDERS[5] },
                ].map(({ x, y, stakeholder }, index) => (
                  <motion.div key={stakeholder.role} style={{ left: x, top: y }} initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.38, delay: 0.1 + index * 0.07, ease: EASE }} className={cn("absolute z-10 w-[88px] -translate-x-1/2 -translate-y-1/2 rounded-[13px] border bg-white px-2 py-2 text-center shadow-[0_12px_24px_-18px_rgba(30,26,77,0.55)]", index < 2 ? "border-brand/30" : "border-black/10")}>
                    <p className="truncate text-[9px] font-medium text-heading">{stakeholder.role}</p><p className={cn("mt-0.5 truncate text-[7px]", index < 2 ? "text-brand" : "text-muted")}>{stakeholder.note}</p>
                  </motion.div>
                ))}
              </div>
              <div className="flex h-full min-h-0 flex-col gap-2 rounded-[22px] border border-black/10 bg-oraami-accent-secondary p-3 text-white">
                <div className="rounded-[16px] border border-white/10 bg-white/[0.06] p-3">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/50">Role quality</p>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">{[["Champion", "Founder"], ["Decision-maker", "Head of Sales"], ["Evaluator", "Technical"], ["Coverage", "84%"]].map(([label, value]) => <div key={label} className="rounded-xl bg-white/[0.055] px-2 py-1.5"><p className="text-[7px] uppercase tracking-[0.1em] text-white/40">{label}</p><p className="mt-0.5 truncate text-[9px] font-medium text-white/80">{value}</p></div>)}</div>
                </div>
                <div className="flex-1 rounded-[16px] border border-white/10 bg-white/[0.06] p-3">
                  <p className="text-[9px] uppercase tracking-[0.15em] text-white/50">Suggested outreach order</p>
                  <div className="mt-2 space-y-1">{["Founder", "Head of Sales", "Technical", "Operations"].map((role, index) => <div key={role} className="flex items-center gap-2 rounded-xl bg-white/[0.055] px-2 py-1.5"><span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand/15 text-[8px] font-semibold text-brand">{index + 1}</span><span className="text-[9px] text-white/75">{role}</span></div>)}</div>
                </div>
              </div>
            </div>
          </Panel>
        )}

        {feature.id === "proof" && (
          <Panel className="flex h-full flex-col p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{feature.n} / {feature.title}</p>
                <p className="mt-1 text-[18px] font-medium text-heading">Turn context into relevant proof.</p>
              </div>
              <Pill active>{feature.accent}</Pill>
            </div>
            <div className="mt-3 grid min-h-0 flex-1 gap-3 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="h-full rounded-[20px] border border-black/10 bg-canvas-soft p-3">
                <p className="text-[9px] uppercase tracking-[0.15em] text-muted">Prospect context</p>
                <div className="mt-3 rounded-[16px] border border-brand/20 bg-white p-3">
                  <div className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand"><Building2 className="h-4 w-4" /></span><div><p className="text-[13px] font-medium text-heading">Northfield</p><p className="text-[9px] text-muted">B2B software · 146 employees</p></div></div>
                  <p className="mt-3 text-[10px] leading-relaxed text-muted">Needs a more reliable outbound pipeline without adding manual research.</p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">{["Industry match", "Problem match", "Company-size match", "Proof strength"].map((tag) => <span key={tag} className="rounded-xl border border-black/[0.07] bg-white px-2 py-2 text-center text-[8px] font-medium text-muted">{tag}</span>)}</div>
              </div>
              <div className="h-full rounded-[20px] border border-black/10 bg-oraami-accent-secondary p-3 text-white">
                <div className="flex items-center justify-between"><p className="text-[9px] uppercase tracking-[0.15em] text-white/50">Recommended case studies</p><span className="text-[8px] text-white/35">Ranked by relevance</span></div>
                <div className="mt-3 rounded-[15px] border border-brand/35 bg-brand/10 p-3">
                  <div className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white"><FileCheck2 className="h-4 w-4" /></span><div className="min-w-0 flex-1"><p className="text-[12px] font-medium">Flowbase pipeline expansion</p><p className="text-[9px] text-white/55">B2B software · Same problem</p></div><span className="text-[17px] font-medium text-brand">91%</span></div>
                  <div className="mt-3 grid grid-cols-4 gap-1.5">{[["Industry", "98"], ["Problem", "94"], ["Size", "86"], ["Proof", "91"]].map(([label, value]) => <div key={label} className="rounded-lg bg-white/[0.06] px-1 py-1.5 text-center"><p className="text-[7px] text-white/35">{label}</p><p className="text-[9px] font-medium text-white/75">{value}</p></div>)}</div>
                </div>
                <div className="mt-2 space-y-2">{[["Arc Systems", "Enterprise SaaS · Growth", "78%"], ["Nimble Labs", "Services · Sales efficiency", "66%"]].map(([name, context, score]) => <div key={name} className="flex items-center gap-2 rounded-[13px] border border-white/[0.08] bg-white/[0.04] px-3 py-2"><FileCheck2 className="h-3.5 w-3.5 text-white/35" /><span className="min-w-0 flex-1"><span className="block text-[9px] font-medium text-white/70">{name}</span><span className="block truncate text-[7px] text-white/35">{context}</span></span><span className="text-[10px] text-white/50">{score}</span></div>)}</div>
              </div>
            </div>
          </Panel>
        )}

        {feature.id === "sequence" && (
          <Panel className="flex h-full flex-col p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{feature.n} / {feature.title}</p>
                <p className="mt-1 text-[18px] font-medium text-heading">A calm sequence that builds trust.</p>
              </div>
              <Pill active>{feature.accent}</Pill>
            </div>
            <div className="mt-4 grid min-h-0 flex-1 gap-3 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[22px] border border-black/10 bg-oraami-accent-secondary p-3 text-white">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Cadence</p>
                <div className="mt-3 space-y-2">
                  {SEQUENCE_STEPS.map(([week, label], index) => (
                    <div key={week} className={cn("rounded-2xl border px-3 py-2", index === 1 ? "border-brand/20 bg-brand/10" : "border-white/10 bg-white/[0.05]")}>
                      <p className="text-[9px] uppercase tracking-[0.14em] text-white/55">{week}</p>
                      <p className="mt-0.5 text-[11px] font-medium text-white">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] border border-black/10 bg-canvas-soft p-4">
                <div className="rounded-[22px] border border-black/10 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Generated email</p>
                  <div className="mt-4 space-y-2 text-[14px] leading-relaxed text-heading">
                    <p>Hi Alex,</p>
                    <p>We noticed the team is expanding in North America and recently moved CRM stacks.</p>
                    <p>Here is the case study that best matches your context.</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
                    { ["Scheduled", "Sent", "Opened", "Replied"].map((status, index) => (
                      <span key={status} className={cn("rounded-full px-3 py-1 font-medium", index === 1 ? "bg-brand/10 text-brand" : "bg-black/[0.04] text-muted")}>
                        {status}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        )}

        {feature.id === "quality" && (
          <Panel className="flex h-full flex-col p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{feature.n} / {feature.title}</p>
                <p className="mt-1 text-[18px] font-medium text-heading">Quality checked before send.</p>
              </div>
              <Pill active>{feature.accent}</Pill>
            </div>
            <div className="mt-4 grid min-h-0 flex-1 gap-3 lg:grid-cols-[0.94fr_1.06fr]">
              <div className="rounded-[22px] border border-black/10 bg-oraami-accent-secondary p-3 text-white">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Quality score</p>
                <div className="mt-4 flex justify-center">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                    <div className="text-center">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Score</p>
                      <p className="mt-1 text-[34px] font-medium tracking-[-0.04em] text-white"><CountUp end={96} duration={1500} /> </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-[16px] border border-white/10 bg-white/[0.06] p-3">
                  <p className="text-[13px] text-white/75">Approved</p>
                </div>
              </div>
              <div className="grid grid-cols-2 content-start gap-2 rounded-[24px] border border-black/10 bg-canvas-soft p-3">
                {QUALITY_CHECKS.map((check, index) => (
                  <div key={check} className="rounded-[16px] border border-black/10 bg-white p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl", "bg-brand/10 text-brand")}>
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[14px] font-medium text-heading">{check}</p>
                          <p className="text-[12px] text-muted">Improved for quality</p>
                        </div>
                      </div>
                      <Pill active={index < 4}>{index < 4 ? "Pass" : "Pass"}</Pill>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        )}

        {feature.id === "reporting" && (
          <Panel className="flex h-full flex-col p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{feature.n} / {feature.title}</p>
                <p className="mt-1 text-[18px] font-medium text-heading">Pipeline visibility, cleanly.</p>
              </div>
              <Pill active>{feature.accent}</Pill>
            </div>
            <div className="mt-4 grid min-h-0 flex-1 gap-3 lg:grid-cols-[1fr_0.96fr]">
              <div className="rounded-[22px] border border-black/10 bg-oraami-accent-secondary p-3 text-white">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">Dashboard</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {DASHBOARD_METRICS.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">{label}</p>
                      <p className="mt-1 text-[20px] font-medium text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 rounded-[24px] border border-black/10 bg-canvas-soft p-4">
                <div className="rounded-[20px] border border-black/10 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Trend line</p>
                  <svg viewBox="0 0 240 120" className="mt-3 h-28 w-full" aria-hidden="true">
                    <path d="M12 92 C 44 84, 62 78, 84 74 S 126 54, 154 42 S 198 28, 228 20" fill="none" stroke="rgba(245,73,0,0.75)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M12 92 C 44 84, 62 78, 84 74 S 126 54, 154 42 S 198 28, 228 20" fill="none" stroke="rgba(30,26,77,0.12)" strokeWidth="10" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="rounded-[20px] border border-black/10 bg-white p-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Activity</p>
                  <div className="mt-3 flex items-end gap-2">
                    {[34, 42, 58, 50, 66, 74, 62].map((height, index) => (
                      <div key={index} className="flex-1 rounded-t-full bg-brand/20" style={{ height: `${height}px` }}>
                        <div className="h-full rounded-t-full bg-brand" style={{ height: `${Math.max(height - 10, 10)}px`, marginTop: `${Math.min(10, height / 2)}px` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

function JourneyInsights({ feature, reduceMotion }: { feature: Feature; reduceMotion: boolean }) {
  const content = JOURNEY_INSIGHTS[feature.id]
  return (
    <Panel className="flex h-[clamp(470px,64svh,600px)] flex-col p-3.5">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={feature.id} initial={reduceMotion ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: reduceMotion ? 0 : 0.48, ease: EASE }} className="flex h-full flex-col">
          <div className="space-y-2">
            {content.metrics.map(([label, value], index) => (
              <motion.div key={label} initial={reduceMotion ? false : { opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.07, duration: 0.4 }} className="flex min-h-[58px] items-center gap-3 rounded-[14px] border border-black/[0.07] bg-canvas-soft/70 px-3 py-2.5">
                <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] text-white", index === 1 ? "bg-brand" : "bg-oraami-accent-secondary")}>
                  {index === 0 ? <CheckCircle2 className="h-4 w-4" /> : index === 1 ? <Target className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                </span>
                <span className="min-w-0 flex-1"><span className="block text-[9px] uppercase leading-tight tracking-[0.1em] text-faint">{label}</span><span className="mt-0.5 block text-[18px] font-medium leading-none text-heading">{value}</span></span>
              </motion.div>
            ))}
          </div>
          <div className="my-3 h-px bg-black/[0.07]" />
          <h3 className="text-[14px] font-medium leading-snug text-heading">{content.title}</h3>
          <ul className="mt-2.5 space-y-2">
            {content.reasons.map((reason) => <li key={reason} className="flex items-start gap-2.5 text-[10px] leading-[1.4] text-muted"><span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-brand/25 text-brand"><CheckCircle2 className="h-2.5 w-2.5" /></span>{reason}</li>)}
          </ul>
          <button type="button" className="mt-auto flex w-full items-center justify-between rounded-[12px] border border-brand/25 bg-brand/[0.045] px-3.5 py-2.5 text-left text-[11px] font-medium text-brand outline-none transition-colors hover:bg-brand/[0.09] focus-visible:ring-2 focus-visible:ring-brand">{content.action}<ArrowRight className="h-3.5 w-3.5" /></button>
        </motion.div>
      </AnimatePresence>
    </Panel>
  )
}

function HeroFeatures() {
  const reduceMotion = useHydratedReducedMotion()
  return (
    <section className="relative w-full overflow-hidden border-b border-black/10 bg-canvas">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,73,0,0.07),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(30,26,77,0.08),transparent_32%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(40,20,20,0.08) 1px, transparent 1.7px)",
          backgroundSize: "10px 10px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      />

      <div className="site-container relative grid items-center gap-10 pb-14 pt-28 sm:pb-16 sm:pt-32 lg:min-h-[700px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-16 lg:pt-28 xl:gap-16">
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="max-w-[39rem]"
        >
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            Features
          </div>
          <h1 className="mt-4 text-balance text-[43px] font-medium leading-[0.98] tracking-[-0.035em] text-ink sm:text-[56px] lg:text-[58px] xl:text-[64px]">
            Everything Oraami researches.
            <span className="mt-1 block text-heading">One intelligent growth engine.</span>
          </h1>
          <p className="mt-5 max-w-[35rem] text-[16px] leading-[1.65] text-muted sm:text-[17px]">
            From defining your ICP to detecting buying signals, mapping decision-makers and building trust, Oraami runs the complete research process so your team can focus on qualified conversations.
          </p>
          <div className="mt-6 flex flex-wrap gap-3.5">
            <Button href="#journey" variant="primary" size="lg" icon={ArrowRight} className="h-[54px] px-7 shadow-[0_12px_30px_-14px_rgba(245,73,0,0.8)] transition-[color,background-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-14px_rgba(245,73,0,0.9)] active:translate-y-0">
              Explore the workflow
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="h-[54px] px-7 transition-[color,background-color,border-color,transform] hover:-translate-y-0.5 active:translate-y-0">
              Book a call
            </Button>
          </div>
          <p className="mt-6 text-[12px] uppercase tracking-[0.18em] text-faint">Research. Prioritise. Personalise. Convert.</p>
        </motion.div>
        <HeroResearchFlow />
      </div>
    </section>
  )
}

function JourneySection() {
  const reduceMotion = useHydratedReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [desktop, setDesktop] = useState(false)
  const [desktopActive, setDesktopActive] = useState(0)
  const { active: mobileActive, register } = useSentinelIndex(FEATURES.length, reduceMotion)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1180px)")
    const update = () => setDesktop(query.matches && !reduceMotion)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [reduceMotion])


  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!desktop) return
    setDesktopActive(Math.min(FEATURES.length - 1, Math.floor(progress * FEATURES.length)))
  })

  const active = desktop ? desktopActive : mobileActive
  const activeFeature = FEATURES[active] ?? FEATURES[0]
  const windowStart = active < 4 ? 0 : 4

  const selectFeature = (index: number) => {
    if (!desktop || !trackRef.current) {
      document.getElementById(`journey-feature-${FEATURES[index].id}`)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" })
      return
    }

    const trackTop = trackRef.current.getBoundingClientRect().top + window.scrollY
    const scrollRange = Math.max(trackRef.current.offsetHeight - window.innerHeight, 1)
    window.scrollTo({
      top: trackTop + (index / (FEATURES.length - 1)) * scrollRange,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }

  const featureBar = (
    <div className="rounded-[24px] border border-black/10 bg-white/80 p-2 shadow-[0_20px_50px_-38px_rgba(32,21,21,0.4)] backdrop-blur-sm">
      <div className="overflow-x-auto [scrollbar-width:none] min-[1180px]:overflow-hidden [&::-webkit-scrollbar]:hidden">
        <motion.div
          className="flex min-w-max gap-2 min-[1180px]:w-[200%] min-[1180px]:min-w-0"
          animate={desktop ? { x: `-${windowStart * 12.5}%` } : { x: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            const activeTab = index === active
            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => selectFeature(index)}
                onKeyDown={(event) => {
                  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
                  event.preventDefault()
                  if (event.key === 'Home') selectFeature(0)
                  else if (event.key === 'End') selectFeature(FEATURES.length - 1)
                  else selectFeature((index + (event.key === 'ArrowRight' ? 1 : -1) + FEATURES.length) % FEATURES.length)
                }}
                role="tab"
                aria-selected={activeTab}
                aria-controls={"journey-panel-" + feature.id}
                tabIndex={activeTab ? 0 : -1}
                className={cn(
                  "group flex min-h-[62px] w-[13rem] shrink-0 items-center gap-2.5 rounded-[17px] border px-3 py-2.5 text-left outline-none transition-[border-color,background-color,color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 min-[1180px]:w-[calc(12.5%_-_0.4375rem)]",
                  activeTab
                    ? "border-brand/25 bg-brand/[0.055] text-heading shadow-[0_12px_28px_-24px_rgba(245,73,0,0.7)]"
                    : "border-transparent bg-canvas-soft/80 text-muted hover:border-black/10 hover:bg-white",
                )}
              >
                <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-colors", activeTab ? "border-brand/15 bg-brand/10 text-brand" : "border-black/10 bg-white text-muted")}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className={cn("text-[10px] uppercase tracking-[0.16em]", activeTab ? "text-brand" : "text-faint")}>{feature.n}</p>
                  <p className="mt-0.5 text-[12px] font-medium leading-[1.2]">{feature.title}</p>
                </div>
              </button>
            )
          })}
        </motion.div>
      </div>
      <div className="mx-1 mt-2.5 flex items-center gap-3">
        <div className="h-[4px] min-w-0 flex-1 overflow-hidden rounded-full bg-black/[0.08]">
          <motion.div className="h-full origin-left rounded-full bg-brand" style={{ scaleX: desktop ? scrollYProgress : (active + 1) / FEATURES.length }} />
        </div>
        <span className="shrink-0 text-[10px] font-semibold tracking-[0.12em] text-muted">{String(active + 1).padStart(2, "0")} / 08</span>
        <motion.div animate={{ opacity: active === 0 ? 1 : 0.42 }} className="hidden shrink-0 items-center gap-1.5 text-[8px] uppercase tracking-[0.11em] text-faint xl:flex">
          <span className="flex h-5 w-3.5 items-start justify-center rounded-full border border-black/20 p-[3px]"><motion.span className="h-1 w-1 rounded-full bg-brand" animate={reduceMotion || active === FEATURES.length - 1 ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} /></span>
          {active === FEATURES.length - 1 ? "Journey complete" : "Scroll to reveal next capability"}
        </motion.div>
      </div>
    </div>
  )

  const stackIndexes = [
    active,
    ...FEATURES.map((_, index) => index).filter((index) => index > active),
    ...FEATURES.map((_, index) => index).filter((index) => index < active).reverse(),
  ].slice(0, 3)

  const stackCards = (
    <div className="relative h-[clamp(470px,64svh,600px)] overflow-hidden">
      {stackIndexes.map((index, depth) => {
        const feature = FEATURES[index]
        const Icon = feature.icon
        return (
          <motion.article
            key={feature.id}
            layout="position"
            initial={false}
            animate={{ y: depth * 24, x: depth * 12, scale: 1 - depth * 0.04, opacity: depth === 0 ? 1 : depth === 1 ? 0.72 : 0.58, zIndex: 10 - depth }}
            transition={{ duration: reduceMotion ? 0 : 0.67, ease: EASE }}
            className={cn("absolute inset-x-0 top-0 min-h-[314px] overflow-hidden rounded-[21px] border bg-white p-5 shadow-[0_26px_58px_-34px_rgba(32,21,21,0.55)]", depth === 0 ? "border-brand/30" : "border-black/10")}
          >
            <div className="flex items-start justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-brand/15 bg-brand/[0.07] text-brand"><Icon className="h-[18px] w-[18px]" aria-hidden="true" /></span><span className="text-[10px] font-semibold tracking-[0.14em] text-brand">{feature.n}</span></div>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">{feature.title}</p>
            <h3 className="mt-2 text-[22px] font-medium leading-[1.1] tracking-[-0.025em] text-heading">{feature.moment}</h3>
            <p className="mt-3 text-[12px] leading-[1.55] text-muted">{feature.detail}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">{feature.tags.map((tag, tagIndex) => <Pill key={tag} active={tagIndex === 0} className="px-2.5 py-1 text-[9px]">{tag}</Pill>)}</div>
          </motion.article>
        )
      })}
    </div>
  )

  return (
    <section id="journey" className="relative w-full overflow-clip border-b border-black/10 bg-canvas text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(245,73,0,0.05),transparent_26%),radial-gradient(circle_at_80%_15%,rgba(30,26,77,0.05),transparent_28%)]"
      />
      <div className="site-container relative pt-14 sm:pt-16 lg:hidden">
        <SectionIntro
          eyebrow="FEATURE JOURNEY"
          title="Oraami in action"
          description="Scroll through the capabilities that help revenue teams find the right accounts, understand their context, and reach them at the right time."
        />
      </div>

      <div id="journey-stage" ref={trackRef} className={cn("relative", desktop ? "h-[330vh]" : "h-auto")}>
        <div style={desktop ? { maxWidth: "90rem" } : undefined} className={cn("site-container relative", desktop && "sticky top-16 flex h-[calc(100svh-4rem)] min-h-[640px] flex-col justify-center py-3")}>
          <div className={cn(desktop ? "w-full" : "py-10 sm:py-12")}>
            {desktop ? (
              <div className="grid grid-cols-[250px_minmax(0,1fr)] items-end gap-4 xl:grid-cols-[270px_minmax(0,1fr)]">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">Feature journey</p>
                  <h2 className="mt-2 text-[31px] font-medium leading-none tracking-[-0.03em] text-heading">Oraami in action</h2>
                  <p className="mt-3 max-w-[260px] text-[12px] leading-[1.55] text-muted">Scroll through the capabilities that help revenue teams find the right accounts, understand their context, and reach them at the right time.</p>
                </div>
                <div>
                  {featureBar}
                </div>
              </div>
            ) : featureBar}

            {desktop ? (
              <div className="mt-3 grid items-start gap-4 grid-cols-[250px_minmax(0,1fr)_250px] xl:grid-cols-[270px_minmax(0,1fr)_270px]">
                {stackCards}
                <div id={"journey-panel-" + activeFeature.id} role="tabpanel" className="min-w-0 h-[clamp(470px,64svh,600px)]"><FeatureVisual feature={activeFeature} /></div>
                <JourneyInsights feature={activeFeature} reduceMotion={reduceMotion} />
              </div>
            ) : (
              <div className="mt-7 space-y-12">
                {FEATURES.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={feature.id} id={`journey-feature-${feature.id}`} ref={register(index)} data-index={index} className="scroll-mt-28">
                      <article className="rounded-[24px] border border-black/10 bg-white p-5 shadow-[0_22px_54px_-40px_rgba(32,21,21,0.3)]">
                        <div className="flex items-start justify-between gap-4">
                          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-oraami-accent-secondary text-white">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <Pill active>{feature.accent}</Pill>
                        </div>
                        <p className="mt-5 text-[11px] uppercase tracking-[0.17em] text-faint">{feature.n} / {feature.title}</p>
                        <h3 className="mt-2 text-[22px] font-medium leading-tight text-heading">{feature.moment}</h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-muted">{feature.detail}</p>
                      </article>
                      <div id={"journey-panel-" + feature.id} role="tabpanel" className="mt-4">
                        <FeatureVisual feature={feature} />
                      </div>
                      <div className="mt-4"><JourneyInsights feature={feature} reduceMotion={reduceMotion} /></div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


const FEATURE_COPY_BLOCKS = [
  {
    title: "Research that starts from fit",
    body: "Oraami keeps teams focused on accounts that match your ICP, show useful context, and have a clear reason to reach out now.",
  },
  {
    title: "Signals translated into action",
    body: "Funding, hiring, launches, leadership changes, and buying-group context become practical next steps for sales outreach.",
  },
  {
    title: "Outreach built to earn trust",
    body: "Each sequence uses verified research, relevant proof, and quality checks so messages feel specific, timely, and considered.",
  },
] as const

function FeatureTextSection() {
  const reduceMotion = useHydratedReducedMotion()

  return (
    <section className="relative w-full overflow-hidden border-b border-black/10 bg-white text-ink">
      <div className="site-container py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reduceMotion ? 0 : 1.5, ease: EASE }}
            className="max-w-xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">Feature depth</p>
            <h2 className="mt-3 text-balance text-[32px] font-medium leading-[1.05] tracking-[-0.025em] text-heading sm:text-[42px]">Built for precise, useful prospecting</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted">
              The feature set is designed around the full motion from account selection to a message your team can confidently send.
            </p>
          </motion.div>

          <div className="grid gap-8 border-t border-black/10 pt-8 sm:grid-cols-3 lg:gap-10">
            {FEATURE_COPY_BLOCKS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: reduceMotion ? 0 : 1.5, delay: reduceMotion ? 0 : index * 0.09, ease: EASE }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">0{index + 1}</p>
                <h3 className="mt-3 text-[22px] font-medium leading-tight tracking-[-0.015em] text-heading">{item.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function FeaturesPageClient() {
  return (
    <>
      <HeroFeatures />
      <JourneySection />
      <FeatureTextSection />
    </>
  )
}
