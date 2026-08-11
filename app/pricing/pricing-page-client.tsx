"use client"

import { useState } from "react"
import { ArrowRight, Building2, Check, ChevronDown, Rocket, ShieldCheck, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import styles from "./pricing.module.css"

type Plan = {
  name: string
  Icon: LucideIcon
  eyebrow: string
  description: string
  monthly: string
  annual: string
  featureLead: string
  features: string[]
  popular?: boolean
  custom?: boolean
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    Icon: Rocket,
    eyebrow: "Build your first play",
    description: "For founders and lean teams building a quality-first outbound motion.",
    monthly: "350",
    annual: "290",
    featureLead: "Everything you need to launch",
    features: [
      "1 ICP · 50 researched leads / mo",
      "Deep AI research for every lead",
      "Trust-building outreach sequences",
      "Analytics dashboard",
      "Email support",
    ],
  },
  {
    name: "Growth",
    Icon: Sparkles,
    eyebrow: "Scale what converts",
    description: "For revenue teams scaling qualified pipeline across segments.",
    monthly: "950",
    annual: "790",
    featureLead: "Everything in Starter, plus",
    features: [
      "5 ICPs · 250 researched leads / mo",
      "Multi-stakeholder mapping",
      "Case-study and proof matching",
      "AI quality scoring",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Scale",
    Icon: Building2,
    eyebrow: "Expand with control",
    description: "For established teams expanding quality outreach into new markets.",
    monthly: "2,300",
    annual: "1,900",
    featureLead: "Everything in Growth, plus",
    features: [
      "Unlimited ICPs and leads",
      "Custom integrations",
      "Advanced analytics",
      "Shared success plan",
      "Priority onboarding",
    ],
  },
  {
    name: "Enterprise",
    Icon: ShieldCheck,
    eyebrow: "Built around your team",
    description: "For organizations that need tailored delivery, security, and governance.",
    monthly: "Custom",
    annual: "Custom",
    featureLead: "Everything in Scale, plus",
    features: [
      "Dedicated strategist",
      "SSO and audit logs",
      "Custom security review",
      "Role-based access",
      "Contractual SLA",
    ],
    custom: true,
  },
]

const FAQS = [
  {
    question: "What counts as a researched lead?",
    answer:
      "A researched lead is a high-fit account enriched with company context, relevant signals, stakeholder mapping, and the information needed to create considered outreach.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can move between plans as your pipeline goals change. We will help you preserve your active ICPs and outreach context during the transition.",
  },
  {
    question: "Do you offer a custom setup?",
    answer:
      "Yes. Enterprise plans can include tailored volumes, governance, security review, SSO, audit logs, dedicated strategy, and contractual SLAs.",
  },
]

export default function PricingPageClient() {
  const [annual, setAnnual] = useState(true)

  return (
    <>
      <section className="bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5">
        <div className={`${styles.pricingShell} overflow-hidden rounded-[16px] sm:rounded-[20px]`}>
          <div className={`${styles.pricingContainer} site-container py-12 sm:py-14 lg:py-16`}>
            <div className="mx-auto max-w-[760px] text-center">
              <h1 className="text-balance text-[38px] font-medium leading-[1.02] tracking-[-0.048em] text-heading sm:text-[clamp(2.8rem,4.8vw,4.5rem)]">
                Choose the right plan for your pipeline.
              </h1>
              <p className="mx-auto mt-4 max-w-[610px] text-[15px] leading-[1.7] text-muted sm:text-[16px]">
                Start with the volume you need. Every plan includes deep account research and quality-first outreach.
              </p>
            </div>

            <div className="mx-auto mt-7 flex w-fit items-center rounded-xl border border-heading/10 bg-white p-1 shadow-[0_12px_30px_-22px_rgba(30,26,77,0.3)]">
              <button
                type="button"
                aria-pressed={!annual}
                onClick={() => setAnnual(false)}
                className={cn(
                  "h-9 rounded-lg px-4 text-[12px] font-medium transition-colors sm:px-5",
                  !annual ? "bg-heading text-white" : "text-muted hover:text-heading",
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                aria-pressed={annual}
                onClick={() => setAnnual(true)}
                className={cn(
                  "flex h-9 items-center gap-2 rounded-lg px-4 text-[12px] font-medium transition-colors sm:px-5",
                  annual ? "bg-heading text-white" : "text-muted hover:text-heading",
                )}
              >
                Annual
                <span className={cn("rounded-md px-1.5 py-1 text-[9px] font-semibold uppercase tracking-wide", annual ? "bg-white/12 text-brand" : "bg-brand/10 text-brand")}>
                  Save 17%
                </span>
              </button>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-2 lg:mt-10 2xl:grid-cols-4 2xl:items-stretch">
            {PLANS.map((plan) => {
              const { Icon } = plan
              return (
                <article
                  key={plan.name}
                  className={cn(
                    styles.planCard,
                    "relative flex min-w-0 flex-col overflow-hidden rounded-[18px] border p-5 sm:p-6",
                    plan.popular
                      ? "border-brand/35 bg-[#fff8f4] text-heading shadow-[0_28px_60px_-42px_rgba(255,87,2,0.4)]"
                      : "border-heading/10 bg-white text-heading shadow-[0_24px_55px_-44px_rgba(30,26,77,0.28)]",
                  )}
                >
                  <div className="relative z-10 flex items-start justify-between gap-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-heading/40">
                        {plan.eyebrow}
                      </p>
                      <h2 className="mt-2.5 text-[25px] font-medium tracking-[-0.035em]">{plan.name}</h2>
                    </div>
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
                        plan.popular ? "border-brand/25 bg-brand/10 text-brand" : "border-heading/12 bg-heading/[0.035] text-heading",
                      )}
                    >
                      <Icon className="h-[19px] w-[19px]" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </div>

                  {plan.popular && (
                    <span className="absolute right-5 top-[69px] rounded-full bg-brand px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white sm:right-6">
                      Most popular
                    </span>
                  )}

                  <p className="relative z-10 mt-4 min-h-[46px] text-[13px] leading-[1.6] text-muted sm:text-[14px] 2xl:min-h-[66px]">
                    {plan.description}
                  </p>

                  <div className="relative z-10 mt-5 flex items-end gap-2 border-b border-current/10 pb-5">
                    {!plan.custom && <span className="text-[17px] font-medium opacity-60">$</span>}
                    <span className={cn("font-medium leading-[0.88] tracking-[-0.05em]", plan.custom ? "text-[38px] sm:text-[40px]" : "text-[43px] sm:text-[46px]")}>
                      {annual ? plan.annual : plan.monthly}
                    </span>
                    {!plan.custom && <span className="pb-0.5 text-[11px] text-heading/42">/ month</span>}
                  </div>

                  <div className="relative z-10 mt-5 flex-1">
                    <p className="text-[11px] font-medium text-heading/70">
                      {plan.featureLead}
                    </p>
                    <ul className="mt-3.5 grid gap-x-5 gap-y-2.5 lg:grid-cols-2 2xl:grid-cols-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-2.5 text-[12px] leading-[1.5] text-muted sm:text-[13px]">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                            <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    href="/contact"
                    fullWidth
                    size="lg"
                    variant={plan.popular ? "primary" : "outline"}
                    icon={ArrowRight}
                    className={cn(
                      "relative z-10 mt-6",
                      !plan.popular && "border-heading/15 text-heading hover:border-brand hover:bg-brand/[0.04]",
                    )}
                  >
                    {plan.custom ? "Talk to sales" : `Choose ${plan.name}`}
                  </Button>
                  <p className="relative z-10 mt-3 text-center text-[10px] text-heading/35">
                    {plan.custom ? "Tailored agreement · Priority onboarding" : `${annual ? "Billed annually" : "Billed monthly"} · Onboarding included`}
                  </p>
                </article>
              )
            })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <h2 className="text-[32px] font-medium leading-[1.02] tracking-[-0.045em] text-heading sm:text-[42px]">
                A few clear answers.
              </h2>
              <p className="mt-4 max-w-sm text-[14px] leading-[1.7] text-muted">
                Need something specific? We can shape a plan around your team, markets, and workflow.
              </p>
            </div>

            <div className="border-t border-heading/12">
              {FAQS.map((faq) => (
                <details key={faq.question} className={`${styles.faq} group border-b border-heading/12`}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-[16px] font-medium text-heading sm:py-6 sm:text-[18px]">
                    {faq.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-heading/12 bg-white text-heading/60 transition-transform group-open:rotate-180">
                      <ChevronDown className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="max-w-[720px] pb-6 pr-10 text-[14px] leading-[1.75] text-muted sm:text-[15px]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
