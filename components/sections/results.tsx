type Result = { stat: string; label: string; desc: string }

const RESULTS: Result[] = [
  {
    stat: "3×",
    label: "Higher reply rates",
    desc: "Personalised, deeply-researched outreach that prospects actually reply to.",
  },
  {
    stat: "50",
    label: "Leads per ICP",
    desc: "A laser-focused list of the accounts most worth pursuing — nothing more.",
  },
  {
    stat: "30+",
    label: "Hours saved weekly",
    desc: "Reps stop researching by hand and focus on the meetings that close.",
  },
  {
    stat: "6–12wk",
    label: "Trust sequences",
    desc: "Relationships built over weeks of considered touches, not one-shot blasts.",
  },
]

export default function Results() {
  return (
    <section className="relative w-full border-b border-black/10 bg-canvas-alt text-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10 lg:px-12 lg:py-20">

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            Results
          </div>
          <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
            Results of our work
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            Quality-first prospecting that turns fewer, better-matched leads into real pipeline.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {RESULTS.map((r) => (
            <div key={r.stat} className="border-t-2 border-ink pt-7">
              <p className="text-[clamp(3.25rem,6vw,5rem)] font-medium leading-none tracking-tight text-ink">
                {r.stat}
              </p>
              <p className="mt-6 text-[12px] uppercase tracking-widest text-brand">{r.label}</p>
              <p className="mt-3 max-w-[15rem] text-[15px] leading-relaxed text-muted">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
