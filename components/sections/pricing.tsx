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
    <section id="pricing" className="relative w-full overflow-hidden border-b border-black/10 bg-canvas text-ink">
      <div className="site-container py-20">

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-10 h-40 w-40 rounded-full bg-brand/[0.08] blur-3xl" />
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
              <span className="h-1.5 w-1.5 bg-brand" />
              Pricing
            </div>
            <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
              Simple, transparent pricing
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              Pick the plan that matches your pipeline goals — every tier includes deep research and trust-building sequences.
            </p>
          </div>

          <div className="shrink-0">
            <div className="flex w-fit rounded-full border border-black/10 bg-canvas-soft p-1 text-[12px] uppercase tracking-widest">
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={cn("rounded-full px-5 py-2.5 transition-colors", annual ? "bg-brand text-on-primary shadow-[0_10px_24px_-18px_rgba(255,79,0,0.55)]" : "text-muted hover:text-ink") }
              >
                Annual
              </button>
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={cn("rounded-full px-5 py-2.5 transition-colors", !annual ? "bg-white text-ink shadow-[0_10px_24px_-18px_rgba(32,21,21,0.18)]" : "text-muted hover:text-ink") }
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
                  "relative flex flex-col rounded-[22px] p-8",
                  t.popular
                    ? "border border-brand/30 bg-brand/[0.06] shadow-[0_40px_90px_-50px_rgba(255,90,31,0.28)] lg:-my-3 lg:py-11"
                    : "border border-black/10 bg-white shadow-[0_18px_40px_-34px_rgba(32,21,21,0.14)]"
                )}
              >
                {t.popular && (
                  <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-[10px] uppercase tracking-widest text-white shadow-[0_10px_22px_-14px_rgba(255,79,0,0.55)]">
                    Most popular
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl border", t.popular ? "border-brand/20 bg-brand/[0.09]" : "border-oraami-accent-secondary/15 bg-oraami-accent-secondary/[0.04]")}>
                    <Icon className={cn("h-5 w-5", t.popular ? "text-brand" : "text-oraami-accent-secondary")} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <span className="text-[12px] uppercase tracking-widest text-faint">{t.name}</span>
                </div>

                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-[56px] font-medium leading-none tracking-tight text-heading">${annual ? t.annual : t.monthly}</span>
                  <span className="text-[13px] text-faint">/ mo</span>
                </div>
                <p className="mt-2 text-[11px] uppercase tracking-wider text-faint">
                  Billed {annual ? "annually" : "monthly"}
                </p>

                <p className="mt-5 text-[15px] leading-relaxed text-muted">{t.desc}</p>

                <Button
                  href="/contact"
                  fullWidth
                  variant={t.popular ? "primary" : "outline"}
                  icon={ArrowRight}
                  className={cn(
                    "mt-8",
                    !t.popular && "border-oraami-accent-secondary/20 bg-transparent text-oraami-accent-secondary hover:border-brand/35 hover:bg-brand/[0.06] hover:text-brand"
                  )}
                >
                  {t.cta}
                </Button>

                <div className="mt-8 border-t border-dashed border-black/10 pt-7">
                  {t.includes && (
                    <p className="mb-4 text-[11px] uppercase tracking-wider text-faint">{t.includes}</p>
                  )}
                  <ul className="space-y-3">
                    {t.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[15px] leading-relaxed text-muted">
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

        <p className="mt-8 text-center text-[12px] uppercase tracking-wider text-faint">
          No setup fees · Cancel anytime · 14-day quality guarantee
        </p>
      </div>
    </section>
  )
}
