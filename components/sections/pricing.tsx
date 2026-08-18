"use client"

import { useState } from "react"
import { ArrowRight, Building2, Check, ShieldCheck, User, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ")
}

type Tier = {
  name: string
  Icon: LucideIcon
  desc: string
  monthly: string
  annual: string
  includes?: string
  features: string[]
  cta: string
  popular?: boolean
}

type CompareValue = boolean | string

type CompareRow = {
  label: string
  values: [CompareValue, CompareValue, CompareValue]
}

type CompareSection = {
  title: string
  rows: CompareRow[]
}

const COMPARE_PLANS = [
  { name: "Starter", price: "$350 / mo", popular: false },
  { name: "Growth", price: "$950 / mo", popular: true },
  { name: "Scale", price: "Custom", popular: false },
] as const

const COMPARE_SECTIONS: CompareSection[] = [
  {
    title: "Core features",
    rows: [
      { label: "AI-Powered ICP Builder", values: [true, true, true] },
      { label: "AI Lead Discovery", values: [true, true, true] },
      { label: "Smart Lead Matching", values: [true, true, true] },
      { label: "Contact Discovery", values: [false, true, true] },
      { label: "Personalized AI Outreach", values: [false, true, true] },
      { label: "Automated Sequences", values: [false, true, true] },
      { label: "Lead & Contact Management", values: [true, true, true] },
    ],
  },
  {
    title: "Limits",
    rows: [
      { label: "Matched leads / month", values: ["200", "1,000", "Unlimited"] },
      { label: "Seats", values: ["Unlimited", "Unlimited", "Unlimited"] },
      { label: "Custom integrations", values: [false, false, true] },
      { label: "SSO & advanced permissions", values: [false, false, true] },
    ],
  },
  {
    title: "Support",
    rows: [{ label: "Support level", values: ["Email", "Priority", "Dedicated manager"] }],
  },
]

const COMPARE_GRID_COLS = "grid-cols-[1.6fr_repeat(3,1fr)]"

function CompareCell({ value, tinted }: { value: CompareValue; tinted: boolean }) {
  return (
    <div className={cn("flex items-center justify-center px-4 py-4", tinted && "bg-brand/[0.05]")}>
      {typeof value === "boolean" ? (
        value ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/[0.12] text-ink">
            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-label="Included" />
          </span>
        ) : (
          <span className="h-px w-3 bg-black/15" aria-hidden="true" />
        )
      ) : (
        <span className="text-[14px] font-bold text-heading">{value}</span>
      )}
    </div>
  )
}

function PricingCompare() {
  return (
    <section className="bg-slate-50">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <div className="text-center">
          <h2 className="font-sf-pro landing-section-title !font-bold">Compare all features</h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-[20px] border border-black/[0.05] bg-white shadow-[0_16px_40px_-36px_rgba(15,23,42,0.26)]">
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className={`grid ${COMPARE_GRID_COLS} items-end gap-4 bg-gray-soft px-6 pb-5 pt-6 sm:px-8`}>
                <div />
                {COMPARE_PLANS.map((plan) => (
                  <div key={plan.name} className="text-center">
                    <p className={`flex items-center justify-center gap-2 text-[17px] font-bold ${plan.popular ? "text-brand" : "text-heading"}`}>
                      {plan.name}
                      {plan.popular && (
                        <span className="whitespace-nowrap rounded-full bg-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                          Popular
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-[12px] uppercase tracking-wide text-faint">{plan.price}</p>
                  </div>
                ))}
              </div>

              {COMPARE_SECTIONS.map((section) => (
                <div key={section.title}>
                  <div className={`grid ${COMPARE_GRID_COLS} border-t border-black/10`}>
                    <div className="px-6 py-3 sm:px-8">
                      <p className="text-[11px] font-semibold tracking-[0.15em] text-heading">
                        {section.title}
                      </p>
                    </div>
                    <div aria-hidden="true" />
                    <div className="bg-brand/[0.05]" aria-hidden="true" />
                    <div aria-hidden="true" />
                  </div>

                  {section.rows.map((row) => (
                    <div
                      key={row.label}
                      className={`grid ${COMPARE_GRID_COLS} items-stretch border-t border-black/[0.06]`}
                    >
                      <div className="flex items-center px-6 py-4 sm:px-8">
                        <p className="text-[14px] text-heading">{row.label}</p>
                      </div>
                      {row.values.map((value, index) => (
                        <CompareCell key={index} value={value} tinted={index === 1} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    Icon: User,
    desc: "For founders and small teams testing quality outreach.",
    monthly: "350",
    annual: "290",
    features: ["1 ICP · 50 leads / mo", "Deep AI research per lead", "Trust-building sequences", "Analytics dashboard", "Email support"],
    cta: "Get started",
  },
  {
    name: "Growth",
    Icon: Users,
    desc: "For revenue teams scaling quality pipeline across segments.",
    monthly: "950",
    annual: "790",
    includes: "Everything in Starter, plus",
    features: ["5 ICPs · 250 leads / mo", "Multi-stakeholder mapping", "Case-study matching", "AI quality scoring", "Priority support"],
    cta: "Get started",
    popular: true,
  },
  {
    name: "Scale",
    Icon: Building2,
    desc: "For established teams expanding outreach across multiple markets.",
    monthly: "2,300",
    annual: "1,900",
    includes: "Everything in Growth, plus",
    features: ["Unlimited ICPs & leads", "Custom integrations", "Advanced analytics", "Shared success plan", "Priority onboarding"],
    cta: "Get started",
  },
  {
    name: "Enterprise",
    Icon: ShieldCheck,
    desc: "For complex organizations requiring governance, security, and tailored delivery.",
    monthly: "Custom",
    annual: "Custom",
    includes: "Everything in Scale, plus",
    features: ["Dedicated strategist", "SSO & audit logs", "Custom security review", "Role-based access", "Contractual SLA"],
    cta: "Talk to sales",
  },
]

export default function Pricing({ page = false }: { page?: boolean }) {
  const [annual, setAnnual] = useState(false)

  return (
    <>
    <section id="pricing" className="relative w-full overflow-hidden bg-canvas text-ink">
      <div className="landing-container py-12 sm:py-14 lg:py-16">

        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-10 h-40 w-40 rounded-full bg-brand/[0.08] blur-3xl" />
            <h2 className="landing-section-title !font-bold">
              Simple, Transparent Pricing
            </h2>
            <p className="landing-section-description mt-5 max-w-xl">
              Pick the plan that matches your pipeline goals — every tier includes deep research and trust-building sequences.
            </p>
          </div>

          <div className="shrink-0">
            <div className={cn("flex w-fit rounded-xl border border-black/10 p-1", page ? "bg-[#f6f6f6]" : "bg-canvas-soft")}>
              <Button
                type="button"
                onClick={() => setAnnual(true)}
                variant={annual ? "primary" : "ghost"}
                size="sm"
                className="h-8 rounded-lg px-3 text-[11px] tracking-wider sm:h-8"
              >
                Annual
              </Button>
              <Button
                type="button"
                onClick={() => setAnnual(false)}
                variant={!annual ? "primary" : "ghost"}
                size="sm"
                className="h-8 rounded-lg px-3 text-[11px] tracking-wider sm:h-8"
              >
                Monthly
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-11 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((t) => {
            const { Icon } = t
            return (
              <div
                key={t.name}
                className={cn(
                  "relative flex min-w-0 flex-col rounded-[16px] p-4",
                  t.popular
                    ? "border border-brand/30 bg-brand/[0.06] shadow-[0_32px_70px_-48px_rgba(255,90,31,0.3)]"
                    : "border border-black/10 bg-white shadow-[0_18px_40px_-34px_rgba(32,21,21,0.14)]"
                )}
              >
                {t.popular && (
                  <span className={cn(
                    "absolute -top-3 rounded-full bg-brand px-3 py-1 text-[10px] uppercase tracking-widest text-white shadow-[0_10px_22px_-14px_rgba(245,73,0,0.55)]",
                    page ? "left-1/2 -translate-x-1/2" : "left-8",
                  )}>
                    Most popular
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg border", t.popular ? "border-brand/20 bg-brand/[0.09]" : "border-oraami-accent-secondary/15 bg-oraami-accent-secondary/[0.04]")}>
                    <Icon className={cn("h-[18px] w-[18px]", t.popular ? "text-brand" : "text-oraami-accent-secondary")} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <span className="text-[12px] uppercase tracking-widest text-faint">{t.name}</span>
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-[clamp(2rem,3vw,2.55rem)] font-medium leading-none tracking-tight text-heading">{annual ? (t.annual === "Custom" ? t.annual : `$${t.annual}`) : (t.monthly === "Custom" ? t.monthly : `$${t.monthly}`)}</span>
                  {t.monthly !== "Custom" && <span className="text-[11px] text-faint">/ mo</span>}
                </div>
                <p className="mt-2 text-[11px] uppercase tracking-wider text-faint">
                  {t.monthly === "Custom" ? "Tailored agreement" : `Billed ${annual ? "annually" : "monthly"}`}
                </p>

                <p className="landing-card-description mt-3">{t.desc}</p>

                <Button
                  href="/contact"
                  fullWidth
                  variant={t.popular ? "primary" : "outline"}
                  size="sm"
                  icon={ArrowRight}
                  className={cn(
                    "mt-4",
                    !t.popular && "border-oraami-accent-secondary/20 bg-transparent text-oraami-accent-secondary hover:border-brand/35 hover:bg-brand/[0.06] hover:text-brand"
                  )}
                >
                  {t.cta}
                </Button>

                <div className="mt-4 border-t border-dashed border-black/10 pt-4">
                  {t.includes && (
                    <p className="mb-3 text-[10px] uppercase tracking-wider text-faint">{t.includes}</p>
                  )}
                  <ul className="space-y-2">
                    {t.features.map((f) => (
                      <li key={f} className="flex gap-2 text-[12px] leading-[1.5] text-muted sm:text-[13px]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>

    {page && <PricingCompare />}
    </>
  )
}
