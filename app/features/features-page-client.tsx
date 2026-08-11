"use client"

import { useRef } from "react"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, BarChart3, Check, FileCheck2, Gauge, Network, Radar, Target } from "lucide-react"
import { useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useReducedMotionPreference } from "@/components/ui/use-reduced-motion-preference"
import { FEATURE_VISUALS } from "@/components/visuals/features"
import type { FeatureVisualId } from "@/components/visuals/types"

type AnimatedFeature = {
  id: FeatureVisualId
  title: string
  description: string
}

type Capability = {
  title: string
  description: string
  Icon: LucideIcon
}

const ANIMATED_FEATURES: AnimatedFeature[] = [
  {
    id: "icp",
    title: "Find accounts that actually fit",
    description: "Oraami filters broad markets into a focused list of high-fit accounts.",
  },
  {
    id: "research",
    title: "See the signals behind every lead",
    description: "Research brings company context and buying signals into one clear view.",
  },
  {
    id: "stakeholders",
    title: "Map the full buying committee",
    description: "Identify the people, roles, and route into each target account.",
  },
  {
    id: "sequences",
    title: "Build trust across every touch",
    description: "Turn verified context into a measured sequence that earns replies.",
  },
]

const CAPABILITIES: Capability[] = [
  {
    title: "Buying-signal detection",
    description: "Know when an account has a reason to engage.",
    Icon: Radar,
  },
  {
    title: "Proof matching",
    description: "Use the case study that best fits the prospect.",
    Icon: FileCheck2,
  },
  {
    title: "AI quality scoring",
    description: "Check relevance, tone, and timing before every send.",
    Icon: Gauge,
  },
  {
    title: "Analytics & reporting",
    description: "Connect research and replies to meetings and pipeline.",
    Icon: BarChart3,
  },
]

const RESEARCH_ROWS = [
  { label: "Account fit", value: "94%", Icon: Target },
  { label: "Buying signal", value: "Strong", Icon: Radar },
  { label: "Stakeholders", value: "6 mapped", Icon: Network },
] as const

function ResearchPreview() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-[480px] overflow-hidden rounded-[16px] border border-white/15 bg-white/[0.06] p-2.5 sm:rounded-[18px] sm:p-4 lg:justify-self-end">
      <div className="flex min-w-0 items-center justify-between gap-3 border-b border-white/10 px-1 pb-3">
        <div className="min-w-0">
          <p className="text-[12px] text-white/55">Account research</p>
          <p className="mt-0.5 truncate text-[15px] font-medium text-white">Northfield</p>
        </div>
        <span className="shrink-0 text-[12px] font-medium text-brand">Complete</span>
      </div>

      <div className="mt-2.5 min-w-0 rounded-[14px] border border-white/10 bg-[#17143f] p-3 sm:mt-3 sm:rounded-[15px] sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[12px] text-white/50">Target account</p>
            <p className="mt-1 truncate text-[18px] font-medium text-white">Northfield</p>
            <p className="mt-1 truncate text-[12px] text-white/55 sm:text-[13px]">B2B software · UK + EU</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[12px] text-white/50">Priority</p>
            <p className="mt-1 text-[14px] font-medium text-brand">High</p>
          </div>
        </div>

        <div className="mt-5 divide-y divide-white/10 rounded-[14px] border border-white/10">
          {RESEARCH_ROWS.map((row) => {
            const Icon = row.Icon
            return (
              <div key={row.label} className="flex min-w-0 items-center gap-2 px-2.5 py-3 sm:gap-3 sm:px-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand sm:h-8 sm:w-8">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-white/65 sm:text-[13px]">{row.label}</span>
                <span className="shrink-0 whitespace-nowrap text-[12px] font-medium text-white sm:text-[13px]">{row.value}</span>
                <Check className="h-3.5 w-3.5 shrink-0 text-brand sm:h-4 sm:w-4" strokeWidth={2.5} aria-hidden="true" />
              </div>
            )
          })}
        </div>

        <div className="mt-3 flex min-w-0 items-center justify-between gap-2 rounded-[12px] border border-brand/25 bg-brand/10 px-3 py-3 sm:px-4">
          <p className="min-w-0 text-[12px] font-medium leading-tight text-white sm:text-[13px]">Personalised outreach ready</p>
          <ArrowRight className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function FeaturesHero() {
  return (
    <section className="bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5">
      <div className="relative max-w-full overflow-hidden rounded-[16px] bg-heading text-white sm:rounded-[20px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_44%,rgba(255,87,2,0.12),transparent_28%),linear-gradient(135deg,#211c52_0%,#17143f_60%,#121032_100%)]"
        />
        <div className="landing-container relative">
          <div className="grid min-w-0 items-center gap-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-[minmax(0,0.54fr)_minmax(360px,0.46fr)] lg:gap-14 lg:py-16">
            <div className="min-w-0 max-w-[590px]">
              <h1 className="text-balance text-[clamp(1.9rem,9.5vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#eef2ff]">
                Research that turns into
                <span className="block text-brand">better conversations.</span>
              </h1>
              <p className="mt-5 max-w-[540px] text-[15px] leading-[1.6] text-white/70 sm:text-[16px]">
                Oraami finds the right accounts, understands the people behind them, and helps your team reach out with a clear reason.
              </p>
              <div className="mt-7">
                <Button href="#feature-showcase" variant="primary" size="md" icon={ArrowRight} className="w-full sm:w-auto">
                  See Oraami in action
                </Button>
              </div>
            </div>

            <ResearchPreview />
          </div>
        </div>
      </div>
    </section>
  )
}

function AnimatedFeatureCard({ feature }: { feature: AnimatedFeature }) {
  const cardRef = useRef<HTMLElement>(null)
  const inView = useInView(cardRef, { amount: 0.2, margin: "0px 0px -10% 0px" })
  const reduceMotion = useReducedMotionPreference()
  const Visual = FEATURE_VISUALS[feature.id]

  return (
    <article ref={cardRef} className="overflow-hidden rounded-[18px] border border-black/[0.07] bg-white">
      <div className="p-5 sm:p-6">
        <h3 className="landing-card-title">{feature.title}</h3>
        <p className="landing-card-description mt-2.5 max-w-[34rem]">{feature.description}</p>
      </div>
      <div className="bg-[#f6f6f6] p-3 sm:p-4 [&_*]:!shadow-none [&>div]:!mx-0 [&>div]:!h-[260px] [&>div]:!max-w-none sm:[&>div]:!h-[300px]">
        <Visual play={inView} reduceMotion={reduceMotion} />
      </div>
    </article>
  )
}

function FeatureShowcase() {
  return (
    <section id="feature-showcase" className="scroll-mt-24 bg-white text-ink">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end lg:gap-16">
          <h2 className="landing-section-title max-w-lg">See the research process in action</h2>
          <p className="landing-section-description max-w-xl lg:justify-self-end">
            From account selection to trusted outreach, each step stays connected.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {ANIMATED_FEATURES.map((feature) => (
            <AnimatedFeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilitiesSection() {
  return (
    <section className="bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5">
      <div className="relative overflow-hidden rounded-[20px] border border-black/[0.06] bg-white text-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,87,2,0.045),transparent_24%),radial-gradient(circle_at_88%_70%,rgba(30,26,77,0.035),transparent_22%)]"
        />
        <div className="landing-container relative py-12 sm:py-14 lg:py-16">
          <div className="max-w-2xl">
            <h2 className="landing-section-title">More intelligence in the same workflow</h2>
            <p className="landing-section-description mt-4 max-w-xl">
              The essential checks and insights your team needs before outreach begins.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((capability) => {
              const Icon = capability.Icon
              return (
                <article
                  key={capability.title}
                  className="group min-h-[180px] rounded-[15px] border border-black/[0.07] bg-[#f6f6f6] p-5 transition-colors duration-200 hover:border-brand/35 hover:bg-white sm:p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-brand transition-colors group-hover:border-brand/35 group-hover:bg-brand/[0.07]">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="landing-card-title mt-5">{capability.title}</h3>
                  <p className="landing-card-description mt-2.5">{capability.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function FeaturesPageClient() {
  return (
    <>
      <FeaturesHero />
      <FeatureShowcase />
      <CapabilitiesSection />
    </>
  )
}
