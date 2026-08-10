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

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="relative w-full overflow-hidden bg-canvas text-ink">
      <div className="landing-container py-12 sm:py-14 lg:py-16">

        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-10 h-40 w-40 rounded-full bg-brand/[0.08] blur-3xl" />
            <h2 className="landing-section-title">
              Simple, transparent pricing
            </h2>
            <p className="landing-section-description mt-4 max-w-xl">
              Pick the plan that matches your pipeline goals — every tier includes deep research and trust-building sequences.
            </p>
          </div>

          <div className="shrink-0">
            <div className="flex w-fit rounded-xl border border-black/10 bg-canvas-soft p-1">
              <Button
                type="button"
                onClick={() => setAnnual(true)}
                variant={annual ? "primary" : "ghost"}
                size="sm"
                className="h-8 rounded-lg px-3 text-[11px] uppercase tracking-wider sm:h-8"
              >
                Annual
              </Button>
              <Button
                type="button"
                onClick={() => setAnnual(false)}
                variant={!annual ? "primary" : "ghost"}
                size="sm"
                className="h-8 rounded-lg px-3 text-[11px] uppercase tracking-wider sm:h-8"
              >
                Monthly
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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
                  <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-[10px] uppercase tracking-widest text-white shadow-[0_10px_22px_-14px_rgba(245,73,0,0.55)]">
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
  )
}
