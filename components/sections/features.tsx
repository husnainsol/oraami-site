"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  ChartColumn,
  DatabaseZap,
  Gauge,
  Mail,
  Network,
  Search,
  ShieldCheck,
  Target,
  TimerReset,
  Workflow,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type FeaturePoint = {
  Icon: LucideIcon
  title: string
  desc: string
}

type Feature = {
  n: string
  id: string
  category: string
  Icon: LucideIcon
  title: string
  desc: string
  metric: string
  metricLabel: string
  tags: string[]
  points: FeaturePoint[]
}

const FEATURES: Feature[] = [
  {
    n: "01",
    id: "icp",
    category: "Targeting",
    Icon: Target,
    title: "ICP research & targeting",
    desc:
      "Every ICP is capped at 50 high-fit leads, so your team works a laser-focused list built around the accounts most likely to convert.",
    metric: "50",
    metricLabel: "accounts per ICP",
    tags: ["50 leads / ICP", "High-fit", "Focused list"],
    points: [
      { Icon: Target, title: "Clear targeting criteria", desc: "Keeps research focused and outreach relevant from the start." },
      { Icon: BadgeCheck, title: "High-fit accounts only", desc: "Prioritises the prospects most likely to convert." },
      { Icon: TimerReset, title: "Less wasted time", desc: "Reduces effort spent on poor-fit accounts." },
    ],
  },
  {
    n: "02",
    id: "research",
    category: "Research",
    Icon: Search,
    title: "Deep lead research",
    desc: "5-10 minutes of autonomous AI research on every prospect before you reach out.",
    metric: "5-10",
    metricLabel: "minutes per lead",
    tags: ["Autonomous", "Enrichment", "Pre-outreach"],
    points: [
      { Icon: Search, title: "Deep company context", desc: "Pulls the intelligence needed to personalise with confidence." },
      { Icon: BrainCircuit, title: "Autonomous research", desc: "Runs before outreach so reps start with context, not guesswork." },
      { Icon: DatabaseZap, title: "Stakeholder details", desc: "Surfaces decision-makers and account signals in one pass." },
    ],
  },
  {
    n: "03",
    id: "stakeholders",
    category: "Contacts",
    Icon: Network,
    title: "Multi-stakeholder mapping",
    desc: "Map 6-10 decision-makers per account, not just a single point of contact.",
    metric: "6-10",
    metricLabel: "people per account",
    tags: ["Buying committee", "Roles", "Coverage"],
    points: [
      { Icon: Network, title: "Full committee view", desc: "Makes it easier to see who influences the deal." },
      { Icon: Workflow, title: "Role clarity", desc: "Helps reps understand decision, technical, and economic buyers." },
      { Icon: BadgeCheck, title: "Complete coverage", desc: "Keeps the team from relying on a single contact." },
    ],
  },
  {
    n: "04",
    id: "sequences",
    category: "Outreach",
    Icon: Mail,
    title: "Trust-building sequences",
    desc: "8-12 personalised emails over 6-12 weeks that build genuine relationships.",
    metric: "6-12",
    metricLabel: "week window",
    tags: ["8-12 touches", "Trust", "Follow-up"],
    points: [
      { Icon: Mail, title: "Sequenced touches", desc: "Keeps outreach paced and relevant over time." },
      { Icon: TimerReset, title: "Longer trust window", desc: "Supports a 6-12 week relationship-building motion." },
      { Icon: ShieldCheck, title: "Human cadence", desc: "Helps each touch feel deliberate, not automated." },
    ],
  },
  {
    n: "05",
    id: "analytics",
    category: "Analytics",
    Icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Track replies, meetings, and pipeline performance across every ICP in real time.",
    metric: "Live",
    metricLabel: "reporting view",
    tags: ["Real-Time", "Reporting", "Pipeline"],
    points: [
      { Icon: ChartColumn, title: "Real-time tracking", desc: "Keeps performance visible across active ICPs." },
      { Icon: BadgeCheck, title: "Reply and meeting visibility", desc: "Shows how outreach is converting into conversations." },
      { Icon: Workflow, title: "Pipeline progress", desc: "Surfaces movement from lead activity to booked meetings." },
    ],
  },
]

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease },
  },
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
}

function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-black/10 bg-[#FCFCFA] shadow-[0_20px_55px_-34px_rgba(32,21,21,0.5)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,79,0,0.06),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(252,252,250,1))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(32,21,21,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(32,21,21,0.08)_1px,transparent_1px)] [background-size:88px_88px]"
      />
      <div className="relative p-4 sm:p-5">{children}</div>
    </div>
  )
}

function FeatureVisual({ feature, reduce }: { feature: Feature; reduce: boolean }) {
  const motionProps = reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }

  if (feature.id === "icp") {
    return (
      <PreviewFrame>
        <motion.div className="grid gap-4 sm:grid-cols-[1.08fr_0.92fr]" {...motionProps} transition={{ duration: 0.45, ease }}>
          <div className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-faint">ICP filters</p>
                <p className="mt-1 text-[15px] font-medium text-ink">50 high-fit leads selected</p>
              </div>
              <div className="rounded-full bg-brand/10 px-3 py-1 text-[12px] font-medium text-brand">High-fit only</div>
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["Northfield", "92 fit", "Enterprise SaaS"],
                ["Solstice Cloud", "89 fit", "Security"],
                ["Cascade Health", "86 fit", "Healthcare"],
              ].map(([company, score, industry], index) => (
                <div key={company} className="rounded-2xl border border-black/10 bg-[#FCFCFA] px-3 py-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-medium text-ink">{company}</p>
                      <p className="text-[12px] text-muted">{industry}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-semibold text-brand">{score}</p>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-faint">fit</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-black/5">
                    <motion.div
                      className="h-full rounded-full bg-brand"
                      initial={reduce ? { width: "72%" } : { width: "0%" }}
                      animate={{ width: `${72 + index * 6}%` }}
                      transition={{ duration: 0.55, delay: 0.12 + index * 0.08, ease }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-black/10 bg-[#FCFCFA] p-4">
            <div className="rounded-2xl border border-brand/15 bg-brand/5 px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-brand">Lead score</p>
              <p className="mt-2 text-[28px] font-medium leading-none text-ink">92</p>
              <p className="mt-1 text-[12px] text-muted">Clear fit for the current ICP</p>
            </div>
            <div className="space-y-2.5">
              {[
                ["Industry match", "Strong"],
                ["Target fit", "High"],
                ["List size", "50 accounts"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-black/10 bg-white px-3 py-3">
                  <p className="text-[12px] text-muted">{label}</p>
                  <p className="text-[13px] font-medium text-ink">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-black/10 bg-white px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-faint">Account summary</p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                High-fit accounts stay visible at a glance without the noise of extra widgets.
              </p>
            </div>
          </div>
        </motion.div>
      </PreviewFrame>
    )
  }

  if (feature.id === "research") {
    return (
      <PreviewFrame>
        <motion.div className="grid gap-4 sm:grid-cols-[0.92fr_1.08fr]" {...motionProps} transition={{ duration: 0.45, ease }}>
          <div className="rounded-2xl border border-black/10 bg-white p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Research timeline</p>
            <div className="mt-4 space-y-4">
              {[
                ["01", "Scan the account", "Signals and context are gathered first"],
                ["02", "Resolve the lead", "Company and contact data are enriched"],
                ["03", "Draft the angle", "Research is ready for outreach"],
              ].map(([step, title, desc], index) => (
                <div key={step} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-brand/10 text-[12px] font-semibold text-brand">
                    {step}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-ink">{title}</p>
                    <p className="text-[12px] leading-relaxed text-muted">{desc}</p>
                    {index < 2 && <div className="mt-3 ml-4 h-5 w-px bg-brand/15" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-black/10 bg-[#FCFCFA] p-4">
            <div className="rounded-2xl border border-black/10 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Lead intelligence</p>
                  <p className="mt-1 text-[16px] font-medium text-ink">Northfield Systems</p>
                </div>
                <div className="rounded-full bg-brand/10 px-3 py-1 text-[12px] font-medium text-brand">5-10 min</div>
              </div>
              <div className="mt-4 rounded-2xl border border-brand/15 bg-brand/5 px-4 py-4">
                <p className="text-[12px] uppercase tracking-[0.16em] text-brand">Research complete</p>
                <p className="mt-1 text-[15px] font-medium leading-relaxed text-ink">
                  Company context, role detail, and the latest signal are ready in one view.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Recent signal", "Hiring for RevOps"],
                ["Decision maker", "VP Revenue Operations"],
                ["Stack", "CRM + enrichment"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-black/10 bg-white px-3 py-3">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-faint">{label}</p>
                  <p className="mt-1 text-[13px] font-medium text-ink">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </PreviewFrame>
    )
  }

  if (feature.id === "stakeholders") {
    return (
      <PreviewFrame>
        <motion.div className="grid gap-4 sm:grid-cols-[1fr_0.98fr]" {...motionProps} transition={{ duration: 0.45, ease }}>
          <div className="rounded-2xl border border-black/10 bg-white p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Buying committee</p>
            <div className="mt-4 space-y-3">
              {[
                ["RevOps", "Decision maker", "92 coverage"],
                ["Sales", "Champion", "84 coverage"],
                ["IT", "Influencer", "76 coverage"],
                ["Finance", "Approver", "81 coverage"],
              ].map(([role, title, coverage], index) => (
                <div key={role} className="flex items-center justify-between rounded-2xl border border-black/10 bg-[#FCFCFA] px-3 py-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-ink">{role}</p>
                    <p className="text-[12px] text-muted">{title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-medium text-brand">{coverage}</p>
                    <motion.div
                      className="mt-2 h-1.5 rounded-full bg-brand/15"
                      initial={reduce ? { width: "100%" } : { width: 0 }}
                      animate={{ width: index % 2 === 0 ? "92%" : "78%" }}
                      transition={{ duration: 0.45, delay: 0.12 + index * 0.06, ease }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-2xl border border-black/10 bg-[#FCFCFA] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Coverage map</p>
                <p className="mt-1 text-[16px] font-medium text-ink">Northfield buying committee</p>
              </div>
              <Network className="h-5 w-5 text-brand" aria-hidden="true" />
            </div>
            <div className="relative mt-4 flex min-h-[248px] items-center justify-center rounded-2xl border border-black/10 bg-white">
              <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,rgba(255,79,0,0.06),transparent_42%)]" />
              <div className="relative z-10 rounded-2xl border border-brand/15 bg-brand/5 px-4 py-3 text-center">
                <p className="text-[12px] uppercase tracking-[0.16em] text-brand">Account</p>
                <p className="mt-1 text-[14px] font-medium text-ink">Northfield</p>
              </div>
              <div className="absolute left-6 top-8 rounded-2xl border border-black/10 bg-[#FCFCFA] px-3 py-3 shadow-[0_10px_24px_-20px_rgba(32,21,21,0.45)]">
                <p className="text-[12px] font-medium text-ink">RevOps</p>
                <p className="text-[11px] text-muted">Decision maker</p>
              </div>
              <div className="absolute right-6 top-8 rounded-2xl border border-black/10 bg-[#FCFCFA] px-3 py-3 shadow-[0_10px_24px_-20px_rgba(32,21,21,0.45)]">
                <p className="text-[12px] font-medium text-ink">Sales</p>
                <p className="text-[11px] text-muted">Champion</p>
              </div>
              <div className="absolute left-6 bottom-8 rounded-2xl border border-black/10 bg-[#FCFCFA] px-3 py-3 shadow-[0_10px_24px_-20px_rgba(32,21,21,0.45)]">
                <p className="text-[12px] font-medium text-ink">IT</p>
                <p className="text-[11px] text-muted">Influencer</p>
              </div>
              <div className="absolute right-6 bottom-8 rounded-2xl border border-black/10 bg-[#FCFCFA] px-3 py-3 shadow-[0_10px_24px_-20px_rgba(32,21,21,0.45)]">
                <p className="text-[12px] font-medium text-ink">Finance</p>
                <p className="text-[11px] text-muted">Approver</p>
              </div>
            </div>
          </div>
        </motion.div>
      </PreviewFrame>
    )
  }

  if (feature.id === "sequences") {
    return (
      <PreviewFrame>
        <motion.div className="grid gap-4 sm:grid-cols-[0.94fr_1.06fr]" {...motionProps} transition={{ duration: 0.45, ease }}>
          <div className="rounded-2xl border border-black/10 bg-white p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Sequence timeline</p>
            <div className="mt-4 space-y-4">
              {[
                ["Week 01", "Intro + relevance", "Initial personal outreach"],
                ["Week 02", "Signal follow-up", "Tie the message to context"],
                ["Week 04", "Proof + case study", "Build trust with evidence"],
                ["Week 08", "Final nudge", "Stay present without noise"],
              ].map(([week, title, desc], index) => (
                <div key={week} className="flex gap-3 rounded-2xl border border-black/10 bg-[#FCFCFA] px-3 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/20 bg-brand/10 text-[11px] font-semibold text-brand">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] uppercase tracking-[0.14em] text-faint">{week}</p>
                    <p className="mt-0.5 text-[13px] font-medium text-ink">{title}</p>
                    <p className="text-[12px] text-muted">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-[#FCFCFA] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Cadence</p>
                <p className="mt-1 text-[16px] font-medium text-ink">6-12 week trust window</p>
              </div>
              <Mail className="h-5 w-5 text-brand" aria-hidden="true" />
            </div>
            <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4">
              <div className="flex items-center justify-between text-[12px] text-muted">
                <span>Sequence progress</span>
                <span className="font-medium text-ink">8 touches</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="rounded-2xl border border-brand/10 bg-[#FCFCFA] px-3 py-3"
                    initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.08 + index * 0.05, ease }}
                  >
                    <div className="h-1.5 rounded-full bg-brand/20" />
                    <p className="mt-3 text-[12px] font-medium text-ink">Touch {index + 1}</p>
                    <p className="text-[11px] text-muted">Personalised</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-black/10 bg-white px-3 py-3 text-[12px] text-muted">
              Outreach stays paced and human across the full relationship window.
            </div>
          </div>
        </motion.div>
      </PreviewFrame>
    )
  }

  return (
    <PreviewFrame>
      <motion.div className="grid gap-4 sm:grid-cols-[1fr_1.02fr]" {...motionProps} transition={{ duration: 0.45, ease }}>
        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Pipeline analytics</p>
          <div className="mt-4 rounded-2xl border border-brand/15 bg-brand/5 p-4">
            <div className="flex items-center justify-between text-[12px] text-muted">
              <span>Conversion rate</span>
              <span className="font-medium text-ink">24%</span>
            </div>
            <div className="mt-3 flex h-24 items-end gap-2">
              {[42, 58, 36, 72, 64, 84].map((height, index) => (
                <div key={index} className="flex-1">
                  <motion.div
                    className="rounded-t-xl bg-brand"
                    initial={reduce ? { height: `${height}%` } : { height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: 0.08 + index * 0.05, ease }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Replies", "128"],
              ["Meetings", "34"],
              ["Pipeline", "$420k"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-black/10 bg-[#FCFCFA] px-3 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-faint">{label}</p>
                <p className="mt-1 text-[14px] font-medium text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-black/10 bg-[#FCFCFA] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Reporting view</p>
              <p className="mt-1 text-[16px] font-medium text-ink">Performance by ICP</p>
            </div>
            <Gauge className="h-5 w-5 text-brand" aria-hidden="true" />
          </div>
          <div className="mt-4 space-y-3 rounded-2xl border border-black/10 bg-white p-4">
            {[
              ["ICP A", 92],
              ["ICP B", 78],
              ["ICP C", 64],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="flex items-center justify-between text-[12px] text-muted">
                  <span>{label}</span>
                  <span>{value}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-black/5">
                  <motion.div
                    className="h-full rounded-full bg-brand"
                    initial={reduce ? { width: `${value}%` } : { width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.45, ease }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-black/10 bg-white px-3 py-3">
            <p className="text-[12px] text-muted">Replies, meetings, and pipeline progress stay visible in one clean reporting screen.</p>
          </div>
        </div>
      </motion.div>
    </PreviewFrame>
  )
}

function FeatureTab({
  feature,
  index,
  active,
  onSelect,
  reduce,
  registerTabRef,
}: {
  feature: Feature
  index: number
  active: boolean
  onSelect: (index: number) => void
  reduce: boolean
  registerTabRef: (index: number, node: HTMLButtonElement | null) => void
}) {
  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`feature-panel-${feature.id}`}
      id={`feature-tab-${feature.id}`}
      tabIndex={active ? 0 : -1}
      onClick={() => onSelect(index)}
      ref={(node) => {
        registerTabRef(index, node)
      }}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      className="relative flex h-[120px] flex-[0_0_auto] min-w-[184px] max-w-[220px] items-start gap-3 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-[transform,box-shadow,border-color,background-color] duration-200 sm:min-w-[190px] lg:min-w-[196px]"
      animate={active ? { borderColor: "rgba(255,79,0,0.28)" } : { borderColor: "rgba(32,21,21,0.10)" }}
      style={{ backgroundColor: active ? "#1E1A4D" : "#FCFCFA" }}
    >
      {active && (
        <motion.span
          layoutId="features-active-indicator"
          className="absolute inset-0 rounded-2xl border border-brand/20 bg-[#1E1A4D] shadow-[0_16px_36px_-28px_rgba(32,21,21,0.55)]"
          transition={{ duration: reduce ? 0 : 0.45, ease }}
        />
      )}
      <span className="relative z-10 flex items-center gap-3 pt-0.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white/10 text-[12px] font-semibold text-brand">
          {feature.n}
        </span>
        <span className="flex items-center justify-center rounded-xl bg-white p-2 text-brand shadow-[0_10px_24px_-20px_rgba(32,21,21,0.5)]">
          <feature.Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
        </span>
      </span>
      <span className="relative z-10 min-w-0 flex-1">
        <span className={`block text-[11px] uppercase tracking-[0.16em] ${active ? "text-[#FCFCFA]/55" : "text-faint"}`}>
          {feature.category}
        </span>
        <span className={`mt-1 block min-h-[2.6rem] break-normal text-[14px] font-medium leading-snug ${active ? "text-[#FCFCFA]" : "text-ink"}`}>
          {feature.title}
        </span>
      </span>
      {active && (
        <motion.span
          layoutId="features-active-underline"
          className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-brand"
          transition={{ duration: reduce ? 0 : 0.35, ease }}
        />
      )}
    </motion.button>
  )
}

function FeatureDetails({ feature, reduce }: { feature: Feature; reduce: boolean }) {
  return (
    <motion.div
      key={feature.id}
      className="grid gap-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-10"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: reduce ? 0 : 0.45, ease }}
    >
      <motion.div className="space-y-8" initial={false} animate={reduce ? { opacity: 1 } : { opacity: 1 }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3.5 py-1.5 text-[12px] font-medium text-brand">
          <feature.Icon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
          {feature.category}
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.18em] text-faint">{feature.n}</p>
          <h3 className="mt-3 text-[30px] font-medium leading-[1.04] tracking-[-0.03em] text-heading sm:text-[36px] lg:text-[40px]">
            {feature.title}
          </h3>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.78] text-muted sm:text-[17px]">{feature.desc}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {feature.points.map((point, pointIndex) => (
            <motion.div
              key={point.title}
              className="rounded-[22px] border border-black/10 bg-white p-4 shadow-[0_10px_24px_-24px_rgba(32,21,21,0.4)]"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.32, delay: 0.12 + pointIndex * 0.06, ease }}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <point.Icon className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] font-medium leading-tight text-ink">{point.title}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted">{point.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {feature.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="rounded-full border border-brand/15 bg-brand/5 px-2.5 py-1.5 text-[11px] font-medium text-brand"
              initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduce ? 0 : 0.3, delay: 0.22 + tagIndex * 0.05, ease }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="rounded-[22px] border border-black/10 bg-white px-5 py-5 shadow-[0_14px_32px_-28px_rgba(32,21,21,0.45)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Outcome</p>
              <p className="mt-2 text-[22px] font-medium tracking-[-0.02em] text-ink">{feature.metric}</p>
              <p className="mt-1 text-[14px] text-muted">{feature.metricLabel}</p>
            </div>
            <div className="inline-flex rounded-full bg-brand/10 px-3 py-1.5 text-[12px] font-medium text-brand">
              Quality-first motion
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="lg:pt-1"
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.52, delay: 0.08, ease }}
      >
        <FeatureVisual feature={feature} reduce={reduce} />
      </motion.div>
    </motion.div>
  )
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() ?? false
  const entered = useInView(sectionRef, { once: true, amount: 0.18 })
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeFeature = FEATURES[activeIndex]

  const registerTabRef = (index: number, node: HTMLButtonElement | null) => {
    tabRefs.current[index] = node
  }

  const handleSelect = (nextIndex: number) => {
    setActiveIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    })
  }, [activeIndex, reduce])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = FEATURES.length - 1
    let nextIndex = activeIndex

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1
        break
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = lastIndex
        break
      default:
        return
    }

    event.preventDefault()
    handleSelect(nextIndex)
  }

  return (
    <section ref={sectionRef} id="features" className="relative w-full overflow-hidden border-b border-black/10 bg-canvas text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,79,0,0.04),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,79,0,0.03),transparent_28%)]"
      />

      <div className="site-container relative py-20 sm:py-24">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={entered ? "visible" : "hidden"}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            What we automate
          </div>
          <h2 className="mt-4 text-[32px] font-medium leading-[1.05] tracking-[-0.02em] text-heading sm:text-[40px] lg:text-[44px]">
            What Oraami automates
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            From ICP definition to trust-building sequences, the full quality-first BDR motion is handled end to end.
          </p>
        </motion.div>

        <motion.div
          role="tablist"
          aria-label="Oraami features"
          initial={false}
          animate={entered ? "visible" : "hidden"}
          variants={listVariants}
          className="relative mt-12 rounded-[28px] border border-black/10 bg-[#FCFCFA] p-3 shadow-[0_20px_55px_-40px_rgba(32,21,21,0.45)]"
          onKeyDown={handleKeyDown}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 rounded-l-[28px] bg-gradient-to-r from-[#FCFCFA] to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 rounded-r-[28px] bg-gradient-to-l from-[#FCFCFA] to-transparent" />
          <div className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-2 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FEATURES.map((feature, index) => (
              <motion.div key={feature.id} variants={fadeUp} className="shrink-0">
                <FeatureTab
                  feature={feature}
                  index={index}
                  active={index === activeIndex}
                  onSelect={handleSelect}
                  reduce={reduce}
                  registerTabRef={registerTabRef}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 rounded-[30px] border border-black/10 bg-[#FCFCFA] p-4 shadow-[0_22px_60px_-42px_rgba(32,21,21,0.55)] sm:p-5 lg:min-h-[720px] lg:p-6"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={entered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduce ? 0 : 0.55, ease }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <FeatureDetails key={activeFeature.id} feature={activeFeature} reduce={reduce} />
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={entered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduce ? 0 : 0.5, delay: 0.2, ease }}
          className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <p className="text-[15px] leading-relaxed text-muted">
            Multi-tenant security and more, built into the same quality-first motion.
          </p>
          <Button href="#platform" variant="secondary" icon={ArrowRight} className="shrink-0">
            Explore all features
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
