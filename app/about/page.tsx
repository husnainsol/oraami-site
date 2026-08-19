import { ArrowRight, AudioLines, Target, User, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { WhyOraamiCta } from "@/components/sections/why-choose-us"
import { Button } from "@/components/ui/button"
import { createMeta } from "@/lib/seo"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "About",
  description:
    "Oraami is the quality-first AI BDR — deep research and trust-building outreach that books meetings, not spam. We measure booked meetings, not send volume.",
  path: "/about",
  about: "Oraami",
  breadcrumbs: [{ label: "About", href: "/about" }],
})
export const metadata = metadataExport

type Principle = { Icon: LucideIcon; title: string; desc: string }

const PRINCIPLES: Principle[] = [
  {
    Icon: Target,
    title: "Signal over noise",
    desc: "Every feature exists to narrow your list down to who matters, not to widen it.",
  },
  {
    Icon: AudioLines,
    title: "Built to be used, not configured",
    desc: "If getting value out of Oraami takes a setup call, we've done something wrong.",
  },
  {
    Icon: Zap,
    title: "You stay in control",
    desc: "Oraami ranks, drafts, and follows up — but the judgment calls stay with you.",
  },
  {
    Icon: User,
    title: "Personal, not generic",
    desc: "Automation should sound like a person who did their homework, not a mail merge.",
  },
]

const STEPS = [
  {
    n: "01",
    title: "Start from real signal",
    desc: "Every recommendation traces back to something true about your business and the prospect — not a generic list.",
  },
  {
    n: "02",
    title: "Automate the busywork",
    desc: "Research, drafting, and follow-up are the parts that don't need a human every single time — so we handle those.",
  },
  {
    n: "03",
    title: "Leave the judgment to you",
    desc: "Oraami surfaces the who and drafts the what. Deciding what actually goes out is always your call.",
  },
]

export default function AboutPage() {
  return (
    <main className="font-sf-pro overflow-hidden bg-white text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}

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
                Turning <span className="text-brand-deep">AI</span> Into a Smarter
                <span className="block">Way to Sell</span>
              </h1>

              <p className="mx-auto mt-7 max-w-[650px] text-[17px] leading-[1.62] text-white/65 sm:text-[18px]">
                Oraami is an AI-powered sales platform built to help teams find the right prospects, understand their ideal customers, and start better conversations. Instead of spending hours searching, researching, and qualifying leads manually, Oraami brings the process together in one intelligent workspace.
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

      <section className="bg-white">
        <div className="landing-container py-12 sm:py-14 lg:py-16">
          <h2 className="landing-section-title !font-bold">Why We Exist</h2>

          <div className="mt-4 space-y-4 text-[15px] leading-[1.65] text-muted sm:text-[16px]">
            <p>
              Sales teams rarely have a volume problem. They have a targeting problem — inboxes full of messages sent to the wrong person, at the wrong company, for the wrong reason. Everyone on the receiving end can tell.
            </p>
            <p>
              We built Oraami around a simpler idea: find the few people who are genuinely a fit, understand why they&apos;re a fit, and reach them like it. The lists, the templates, the guesswork in between — that&apos;s what we&apos;re trying to take off your plate.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="landing-container py-12 sm:py-14 lg:py-16">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-brand/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-brand-deep">
              What we Believe
            </span>
            <h2 className="landing-section-title !font-bold mt-5">
              The Principles Behind the Product
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(({ Icon, title, desc }) => (
              <article
                key={title}
                className="rounded-[15px] border border-black/[0.05] bg-white p-6 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.26)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand/[0.09] text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="landing-card-title !font-bold mt-4">{title}</h3>
                <p className="landing-card-description mt-2.5">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="landing-container py-12 sm:py-14 lg:py-16">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-brand/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-brand-deep">
              How We Work
            </span>
            <h2 className="landing-section-title !font-bold mt-5">
              The Approach, in Three Steps
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((step, index) => (
              <div
                key={step.n}
                className={index > 0 ? "sm:border-l sm:border-black/10 sm:pl-6" : ""}
              >
                <p className="text-[14px] font-bold text-brand">{step.n}</p>
                <h3 className="landing-card-title !font-bold mt-3">{step.title}</h3>
                <p className="landing-card-description mt-2.5">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyOraamiCta />
    </main>
  )
}
