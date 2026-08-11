"use client"

import { useRef } from "react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { BarChart3, FileCheck2, Gauge, Radar } from "lucide-react"
import { useInView } from "framer-motion"
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

function FeaturesHero() {
  return (
    <section className="bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5">
      <div className="relative isolate min-h-[70svh] overflow-hidden rounded-[20px] bg-oraami-accent-secondary text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_45%,rgba(255,87,2,0.08),transparent_36%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[18%] top-1/2 h-[80%] w-[48%] -translate-y-1/2 rounded-full bg-brand/[0.04] blur-[110px]"
        />

        <div className="landing-container relative flex min-h-[70svh] items-center py-10 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-[880px] text-center">
            <h1 className="mx-auto max-w-[760px] text-balance text-[clamp(2.1rem,7.8vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#eef2ff]">
              Find the right prospects.
              <span className="block">
                Reach them <span className="text-brand-deep">before</span>
              </span>
              <span className="block">anyone else does.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-[650px] text-[17px] leading-[1.62] text-white/65 sm:text-[18px]">
              Oraami turns your website into a targeting engine — building your ideal customer profile, surfacing matching companies, and crafting the outreach that gets a reply.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex h-[50px] items-center justify-center rounded-full bg-gradient-to-r from-brand to-[#ff6b2b] px-7 text-[15px] font-semibold text-white shadow-[0_16px_32px_-16px_rgba(255,87,2,0.72)] transition-[transform,filter] hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-oraami-accent-secondary"
              >
                Build your ICP
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-[50px] items-center px-1 text-[15px] font-semibold text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                Talk to Sales
              </Link>
            </div>
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
