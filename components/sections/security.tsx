import { Database, KeyRound, Layers, Lock, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const BADGES = ["SOC 2 Type II", "GDPR", "CCPA", "ISO 27001"]

type Capability = { Icon: LucideIcon; title: string; desc: string }

const CAPABILITIES: Capability[] = [
  {
    Icon: Layers,
    title: "Multi-tenant isolation",
    desc: "Every workspace is logically isolated — your prospects and research never mix with another tenant's data.",
  },
  {
    Icon: Lock,
    title: "Encrypted in transit & at rest",
    desc: "AES-256 at rest and TLS 1.3 in transit, across every record, message and integration.",
  },
  {
    Icon: KeyRound,
    title: "SSO & SAML",
    desc: "Enforce single sign-on with your identity provider and provision access by role.",
  },
  {
    Icon: ShieldCheck,
    title: "Role-based access & audit logs",
    desc: "Granular permissions plus a full, exportable trail of every action taken in your workspace.",
  },
  {
    Icon: Database,
    title: "Data residency & retention",
    desc: "Choose where your data lives and set retention windows to match your compliance policy.",
  },
]

function BoxIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/15 bg-canvas-soft">
      <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} aria-hidden="true" />
      <span aria-hidden className="absolute -right-[5px] -top-[5px] h-2.5 w-2.5 bg-brand" />
    </div>
  )
}

export default function Security() {
  return (
    <section id="security" className="relative w-full border-b border-black/10 bg-canvas text-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10 lg:px-12 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_1.25fr] lg:gap-20">

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
              <span className="h-1.5 w-1.5 bg-brand" />
              Security
            </div>
            <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
              Enterprise-grade security
            </h2>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
              Your data, your prospects, your reputation — protected at every layer. Oraami is built to pass procurement, not just demos.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 border border-black/12 bg-canvas-soft px-3.5 py-2.5 text-[12px] uppercase tracking-wider text-ink"
                >
                  <ShieldCheck className="h-4 w-4 text-brand" strokeWidth={2} aria-hidden="true" />
                  {b}
                </span>
              ))}
            </div>

            <p className="mt-6 text-[11px] uppercase tracking-wider text-faint">
              Independently audited · Reviewed annually
            </p>
          </div>

          <div className="border-t border-black/10">
            {CAPABILITIES.map((c, i) => {
              const { Icon } = c
              return (
                <div
                  key={c.title}
                  className={`group flex gap-5 py-7 ${i < CAPABILITIES.length - 1 ? "border-b border-dashed border-black/15" : ""}`}
                >
                  <BoxIcon Icon={Icon} />
                  <div>
                    <h3 className="text-[19px] font-medium tracking-tight text-ink">{c.title}</h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted">{c.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
