import { Check, Minus } from "lucide-react"

const COMPARISON_ROWS = [
  {
    label: "Account selection",
    oraami: "High-fit accounts capped by ICP",
    software: "Large uploaded or purchased lists",
    agency: "Broad lists set by campaign volume",
  },
  {
    label: "Research depth",
    oraami: "Minutes of AI research for every lead",
    software: "Basic enrichment fields",
    agency: "Varies by rep and workload",
  },
  {
    label: "Personalisation",
    oraami: "Account, signal, and stakeholder context",
    software: "Templates and merge fields",
    agency: "Manual and difficult to scale",
  },
  {
    label: "Buying committees",
    oraami: "Multiple stakeholders mapped per account",
    software: "Usually one contact at a time",
    agency: "Dependent on individual rep process",
  },
  {
    label: "Primary success metric",
    oraami: "Qualified conversations and meetings",
    software: "Emails sent and tasks completed",
    agency: "Activity volume and meetings booked",
  },
]

export default function CompetitorComparison() {
  return (
    <section className="bg-canvas text-ink">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <div className="max-w-2xl">
          <h2 className="landing-section-title">Quality-first outreach, side by side</h2>
          <p className="landing-section-description mt-4 max-w-xl">
            See how Oraami differs from volume-led prospecting software and traditional outsourced SDR teams.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[16px] border border-black/10 bg-white">
          <div className="hidden grid-cols-[0.72fr_repeat(3,minmax(0,1fr))] border-b border-black/10 bg-[#f6f6f6] md:grid">
            <div className="p-4 lg:p-5" />
            <div className="border-l border-brand/20 bg-brand/[0.06] p-4 lg:p-5">
              <p className="text-[13px] font-semibold text-heading">Oraami</p>
              <p className="mt-1 text-[11px] text-muted">Quality-first AI BDR</p>
            </div>
            <div className="border-l border-black/10 p-4 lg:p-5">
              <p className="text-[13px] font-semibold text-heading">Competitor</p>
              <p className="mt-1 text-[11px] text-muted">Volume-led tools</p>
            </div>
            <div className="border-l border-black/10 p-4 lg:p-5">
              <p className="text-[13px] font-semibold text-heading">Competitor</p>
              <p className="mt-1 text-[11px] text-muted">Traditional service</p>
            </div>
          </div>

          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.label}
              className="grid gap-3 border-b border-black/10 p-5 last:border-b-0 md:grid-cols-[0.72fr_repeat(3,minmax(0,1fr))] md:gap-0 md:p-0"
            >
              <p className="self-center text-[12px] font-semibold text-heading md:p-4 lg:p-5">{row.label}</p>
              <div className="flex gap-2.5 rounded-xl bg-brand/[0.06] p-3 md:rounded-none md:border-l md:border-brand/20 md:p-4 lg:p-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} aria-hidden="true" />
                <div>
                  <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-brand md:hidden">Oraami</span>
                  <p className="text-[12px] leading-[1.5] text-heading sm:text-[13px]">{row.oraami}</p>
                </div>
              </div>
              <div className="flex gap-2.5 p-3 md:border-l md:border-black/10 md:p-4 lg:p-5">
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
                <div>
                  <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-faint md:hidden">Competitor</span>
                  <p className="text-[12px] leading-[1.5] text-muted sm:text-[13px]">{row.software}</p>
                </div>
              </div>
              <div className="flex gap-2.5 p-3 md:border-l md:border-black/10 md:p-4 lg:p-5">
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-faint" aria-hidden="true" />
                <div>
                  <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-faint md:hidden">Competitor</span>
                  <p className="text-[12px] leading-[1.5] text-muted sm:text-[13px]">{row.agency}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
