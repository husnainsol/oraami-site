import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  CheckCircle2,
  ContactRound,
  Database,
  PencilLine,
  Search,
  Target,
  Zap,
} from "lucide-react"
import { createMeta } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { WhyOraamiCta } from "@/components/sections/why-choose-us"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Features",
  description:
    "Oraami researches the accounts, signals, stakeholders, proof, sequences, quality checks, and reporting that turn quality-first prospecting into qualified meetings.",
  path: "/features",
  breadcrumbs: [{ label: "Features", href: "/features" }],
  includeProduct: true,
  about: "Oraami feature workflow for quality-first B2B prospecting",
})

export const metadata = metadataExport

function FeaturesHero() {
  return (
    <section className="bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5">
      <div className="relative isolate min-h-[70svh] overflow-hidden rounded-[20px] bg-oraami-accent-secondary text-white">
        <div
          aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_45%,color-mix(in_srgb,var(--color-brand)_8%,transparent),transparent_36%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[18%] top-1/2 h-[80%] w-[48%] -translate-y-1/2 rounded-full bg-brand/[0.04] blur-[110px]"
        />

        <div className="landing-container relative flex min-h-[70svh] items-center py-10 sm:py-12 lg:py-14">
          <div className="mx-auto max-w-[880px] text-center">
            <h1 className="mx-auto max-w-[760px] text-balance text-[clamp(2.1rem,7.8vw,3.25rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-indigo-soft">
              Find the <span className="text-brand-deep">Right Prospects.</span>
              <span className="block">Reach them Before Anyone</span>
              <span className="block">Else Does.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-[650px] text-[17px] leading-[1.62] text-white/65 sm:text-[18px]">
              Oraami turns your website into a targeting engine — building your ideal customer profile, surfacing matching companies, and crafting the outreach that gets a reply.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                className="inline-flex h-[50px] items-center justify-center rounded-full bg-gradient-to-r from-brand to-orange px-7 text-[15px] font-semibold text-white shadow-[0_16px_32px_-16px_color-mix(in_srgb,var(--color-brand)_72%,transparent)] transition-[transform,filter] hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-oraami-accent-secondary"
              >
                Build your ICP
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-[50px] items-center rounded-full border border-brand px-5 text-[15px] font-semibold text-white/85 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
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

type FeatureCardProps = {
  title: string
  description: string
  Icon: LucideIcon
  children: ReactNode
  spaced?: boolean
}

function FeatureCard({ title, description, Icon, children, spaced = false }: FeatureCardProps) {
  return (
    <article
      className="flex h-full min-w-0 flex-col rounded-[15px] border border-black/[0.07] bg-white p-[18px] sm:p-5"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-brand/[0.09] text-brand">
        <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
      </span>
      <h3 className="landing-card-title mt-3.5 !text-[22px] !font-bold">{title}</h3>
      <p className="landing-card-description mt-2.5 max-w-[36rem] !text-[16.5px]">{description}</p>
      <div className={spaced ? "mt-auto pt-8" : "mt-auto pt-5"}>{children}</div>
    </article>
  )
}

const Panel = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`w-full rounded-[12px] border border-black/[0.045] bg-gray-soft p-3.5 sm:p-4 ${className}`}>
    {children}
  </div>
)

function IcpBuilderPreview() {
  const chips = ["B2B SaaS", "50–200 employees", "North America", "Series A–B"]

  return (
    <Panel className="bg-gray-blue-light p-4 sm:p-5">
      <p className="text-[13px] font-semibold text-heading">Your ICP, from one input</p>
      <div className="mt-3 flex h-12 items-center rounded-[9px] border border-black/[0.07] bg-white px-3.5 text-[13px] text-muted">
        <span className="mr-2 text-brand">↳</span>
        yourcompany.com
      </div>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {chips.map((chip) => (
          <span key={chip} className="rounded-full bg-brand/[0.08] px-3.5 py-1.5 text-[12px] font-medium text-brand-deep">
            {chip}
          </span>
        ))}
      </div>
    </Panel>
  )
}

const companies = [
  { initials: "NA", name: "Northwind Analytics", detail: "Data Infrastructure · 80 employees", color: "bg-lavender-soft text-purple" },
  { initials: "FR", name: "Fenwick Robotics", detail: "Industrial hardware · 140 employees", color: "bg-blue-soft text-blue" },
  { initials: "CH", name: "Cedar Health", detail: "Healthtech · 65 employees", color: "bg-mint-soft text-teal" },
] as const

function LeadDiscoveryPreview() {
  return (
    <Panel>
      <p className="text-[12px] font-medium tracking-[0.075em] text-faint">COMPANIES MATCHING YOUR ICP</p>
      <div className="mt-2.5 divide-y divide-black/[0.055] px-1">
        {companies.map((company) => (
          <div key={company.name} className="flex min-w-0 items-center gap-3.5 py-3.5">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] text-[10px] font-semibold ${company.color}`}>
              {company.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[15px] font-semibold text-heading">{company.name}</span>
              <span className="mt-0.5 block truncate text-[12px] text-faint">{company.detail}</span>
            </span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-brand/75" aria-label="Matched" />
          </div>
        ))}
      </div>
    </Panel>
  )
}

function LeadMatchingPreview() {
  const scores = [
    { score: "92%", label: "High fit", ring: "border-brand", text: "text-brand" },
    { score: "74%", label: "Good fit", ring: "border-tan", text: "text-copper" },
    { score: "58%", label: "Low fit", ring: "border-black/15", text: "text-muted" },
  ]

  return (
    <Panel className="py-6">
      <div className="flex items-start justify-around gap-2">
        {scores.map((item) => (
          <div key={item.label} className="text-center">
            <div className={`mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-full border-[3px] bg-white ${item.ring}`}>
              <span className={`text-[13px] font-semibold ${item.text}`}>{item.score}</span>
            </div>
            <p className="mt-2.5 text-[11px] font-medium text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function ContactDiscoveryPreview() {
  return (
    <Panel>
      <div className="mx-auto max-w-[340px] rounded-[10px] border border-black/[0.055] bg-white p-5">
        <div className="flex items-center gap-2.5">
          <Image src="/img.svg" alt="Priya Anand" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full object-cover" />
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1 text-[13px] font-semibold text-heading">
              Priya Anand
              <CheckCircle2 className="h-3 w-3 shrink-0 fill-green text-white" strokeWidth={2.5} aria-label="Verified" />
            </span>
            <span className="mt-0.5 block truncate text-[11px] text-faint">VP of Sales, Cedar Health</span>
          </span>
        </div>
        <div className="mt-4 truncate rounded-[8px] border border-black/[0.06] bg-gray-light px-3.5 py-3 text-[12px] text-muted">
          priya.anand@cedarhealth.com
        </div>
      </div>
    </Panel>
  )
}

function OutreachPreview() {
  return (
    <Panel>
      <p className="text-[12px] font-semibold text-heading">Drafting for Cedar Health</p>
      <div className="mt-3 min-h-[106px] rounded-[9px] border border-black/[0.06] bg-white p-3.5 text-[11px] leading-[1.55] text-muted">
        <p className="max-w-0 overflow-hidden whitespace-nowrap border-r border-brand text-[13px] motion-reduce:max-w-full motion-reduce:border-r-0 motion-reduce:whitespace-normal motion-reduce:animate-none animate-[outreachTextFlow_10s_steps(150,end)_infinite]" aria-label="Hi Priya, noticed Cedar Health is scaling its sales team. Oraami helps teams find high-fit accounts and reach the right decision-makers with relevant, timely outreach.">
          Hi Priya, noticed Cedar Health is scaling its sales team. Oraami helps teams find high-fit accounts and reach the right decision-makers with relevant, timely outreach.
        </p>
      </div>
    </Panel>
  )
}

const sequenceSteps = [
  { label: "Email 1", accent: true },
  { label: "LinkedIn touch", accent: false },
  { label: "Email 2", accent: false },
  { label: "Break-up email", accent: false },
] as const

function AutomatedSequencesPreview() {
  const connectors = ["wait 2d", "wait 3d", "no reply"]

  return (
    <Panel className="overflow-hidden bg-gray-blue-light py-6">
      <div className="hidden min-w-0 items-center md:flex">
        {sequenceSteps.map((step, index) => (
          <div key={step.label} className="contents">
            <div
                className={`flex min-h-[42px] min-w-0 flex-1 items-center justify-center rounded-[9px] border px-2 text-center text-[11px] font-normal ${
                step.accent ? "border-brand bg-brand text-white" : "border-black/[0.07] bg-white text-heading"
              }`}
            >
              {step.label}
            </div>
            {index < connectors.length && (
              <div className="flex shrink-0 flex-col items-center px-1.5">
                <span className="whitespace-nowrap text-[9px] text-faint">{connectors[index]}</span>
                <span className="mt-1 h-px w-4 bg-black/10" aria-hidden="true" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-2 md:hidden">
        {sequenceSteps.map((step, index) => (
          <div key={step.label} className="contents">
            <div
                className={`rounded-[8px] border px-2 py-2 text-center text-[10px] font-normal ${
                step.accent ? "border-brand bg-brand text-white" : "border-black/[0.07] bg-white text-heading"
              }`}
            >
              {step.label}
            </div>
            {index < connectors.length ? (
              <>
                <span className="text-[8px] text-faint">{connectors[index]}</span>
                <div className="h-px bg-black/10" aria-hidden="true" />
              </>
            ) : (
              <><span /><span /></>
            )}
          </div>
        ))}
      </div>
    </Panel>
  )
}

const managedLeads = [
  { name: "Northwind Analytics", status: "New", className: "bg-lavender-light text-purple" },
  { name: "Fenwick Robotics", status: "Contacted", className: "bg-amber-soft text-amber-deep" },
  { name: "Cedar Health", status: "Replied", className: "bg-green-soft text-green-deep" },
] as const

function LeadManagementPreview() {
  return (
    <Panel className="bg-gray-blue-light">
      <div className="divide-y divide-black/[0.055] px-1">
        {managedLeads.map((lead) => (
          <div key={lead.name} className="flex min-w-0 items-center gap-3 py-4">
            <span className="min-w-0 flex-1 truncate text-[16px] font-semibold text-heading">{lead.name}</span>
            <span className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium ${lead.className}`}>{lead.status}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function FeaturesGrid() {
  return (
    <section id="feature-showcase" className="scroll-mt-24 bg-white text-ink">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <div className="max-w-[580px]">
          <h2 className="landing-section-title !font-bold">Everything Oraami Does</h2>
          <p className="mt-2.5 text-[18px] leading-[1.6] text-muted">
            Everything you need to find the right prospects, connect with the right people, and turn quality leads into meaningful conversations.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1.06fr_0.94fr]">
          <FeatureCard
            title="AI-Powered ICP Builder"
            description="Give Oraami your website or a short description of your business. It reads it and builds your Ideal Customer Profile — the industries, sizes, and regions that best match your audience."
            Icon={Target}
            spaced
          >
            <IcpBuilderPreview />
          </FeatureCard>

          <FeatureCard
            title="AI Lead Discovery"
            description="Oraami searches for companies that match your ICP so you don't have to check platform after platform by hand."
            Icon={Search}
          >
            <LeadDiscoveryPreview />
          </FeatureCard>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Smart Lead Matching"
            description="See how closely each prospect matches your ICP at a glance, so you know who to prioritize before you send a single message."
            Icon={BarChart3}
          >
            <LeadMatchingPreview />
          </FeatureCard>

          <FeatureCard
            title="Contact Discovery"
            description="Find the right decision-makers inside each target company and get the contact details you need to reach them."
            Icon={ContactRound}
          >
            <ContactDiscoveryPreview />
          </FeatureCard>

          <FeatureCard
            title="Personalized AI Outreach"
            description="Oraami writes outreach messages using what it knows about each prospect and company, so you're never starting from a blank page."
            Icon={PencilLine}
          >
            <OutreachPreview />
          </FeatureCard>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1.06fr_0.94fr]">
          <FeatureCard
            title="Automated Sequences"
            description="Set up multi-step outreach that follows up on its own, with different messaging depending on how each prospect responds."
            Icon={Zap}
            spaced
          >
            <AutomatedSequencesPreview />
          </FeatureCard>

          <FeatureCard
            title="Lead & Contact Management"
            description="Every prospect and contact lives in one workspace, so you can review details, track status, and manage outreach without switching tools."
            Icon={Database}
          >
            <LeadManagementPreview />
          </FeatureCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function FeaturesPage() {
  return (
    <main className="text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}
      <div className="features-page">
        <FeaturesHero />
        <FeaturesGrid />
        <WhyOraamiCta />
      </div>
    </main>
  )
}
