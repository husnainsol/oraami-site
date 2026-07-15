"use client"

import { useState } from "react"
import { ArrowRight, Building2, Check, User, Users } from "lucide-react"
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
    desc: "For larger orgs with advanced GTM and compliance needs.",
    monthly: "2,300",
    annual: "1,900",
    includes: "Everything in Growth, plus",
    features: ["Unlimited ICPs & leads", "Custom integrations", "Dedicated strategist", "SSO & audit logs", "SLA support"],
    cta: "Talk to sales",
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  return (
    <section id="pricing" className="relative w-full overflow-hidden border-b border-white/10 bg-surface-dark text-white">
      <div className="site-container py-20">

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-white/45">
              <span className="h-1.5 w-1.5 bg-brand" />
              Pricing
            </div>
            <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[40px] lg:text-[44px]">
              Simple, transparent pricing
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/60">
              Pick the plan that matches your pipeline goals — every tier includes deep research and trust-building sequences.
            </p>
          </div>

          <div className="shrink-0">
            <div className="flex w-fit border border-white/20 text-[12px] uppercase tracking-widest">
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={cn("px-5 py-2.5 transition-colors", annual ? "bg-white text-surface-dark" : "text-white/70 hover:text-white")}
              >
                Annual
              </button>
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={cn("px-5 py-2.5 transition-colors", !annual ? "bg-white text-surface-dark" : "text-white/70 hover:text-white")}
              >
                Monthly
              </button>
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-wider text-brand lg:text-right">
              Save ~2 months on annual
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {TIERS.map((t) => {
            const { Icon } = t
            return (
              <div
                key={t.name}
                className={cn(
                  "relative flex flex-col p-8",
                  t.popular
                    ? "rounded-xl border border-brand/60 bg-white/[0.05] shadow-[0_40px_90px_-50px_rgba(255,90,31,0.5)] lg:-my-3 lg:py-11"
                    : "rounded-xl border border-white/12 bg-white/[0.015]"
                )}
              >
                {t.popular && (
                  <span className="absolute -top-3 left-8 bg-brand px-3 py-1 text-[10px] uppercase tracking-widest text-white">
                    Most popular
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-white/75" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <span className="text-[12px] uppercase tracking-widest text-white/60">{t.name}</span>
                </div>

                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-[56px] font-medium leading-none tracking-tight text-white">${annual ? t.annual : t.monthly}</span>
                  <span className="text-[13px] text-white/50">/ mo</span>
                </div>
                <p className="mt-2 text-[11px] uppercase tracking-wider text-white/40">
                  Billed {annual ? "annually" : "monthly"}
                </p>

                <p className="mt-5 text-[15px] leading-relaxed text-white/60">{t.desc}</p>

                <Button
                  href="/contact"
                  fullWidth
                  variant={t.popular ? "primary" : "outline"}
                  icon={ArrowRight}
                  className={cn(
                    "mt-8",
                    !t.popular && "border-white/25 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  {t.cta}
                </Button>

                <div className="mt-8 border-t border-dashed border-white/15 pt-7">
                  {t.includes && (
                    <p className="mb-4 text-[11px] uppercase tracking-wider text-white/40">{t.includes}</p>
                  )}
                  <ul className="space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[15px] leading-relaxed text-white/75">
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

        <p className="mt-8 text-center text-[12px] uppercase tracking-wider text-white/40">
          No setup fees · Cancel anytime · 14-day quality guarantee
        </p>
      </div>
    </section>
  )
}
