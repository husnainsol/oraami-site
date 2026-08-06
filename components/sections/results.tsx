type Result = { start: number; end?: number; suffix?: string; label: string; desc: string }

const RESULTS: Result[] = [
  {
    start: 3,
    suffix: "×",
    label: "Higher reply rates",
    desc: "Personalised, deeply-researched outreach that prospects actually reply to.",
  },
  {
    start: 50,
    label: "Leads per ICP",
    desc: "A laser-focused list of the accounts most worth pursuing — nothing more.",
  },
  {
    start: 30,
    suffix: "+",
    label: "Hours saved weekly",
    desc: "Reps stop researching by hand and focus on the meetings that close.",
  },
  {
    start: 6,
    end: 12,
    suffix: "wk",
    label: "Trust sequences",
    desc: "Relationships built over weeks of considered touches, not one-shot blasts.",
  },
]

export default function Results() {
  return (
    <section className="relative w-full border-b border-white/10 bg-oraami-accent-secondary text-white">
      <div className="mx-auto max-w-[1540px] px-5 py-16 sm:px-6 sm:py-20 xl:px-0">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-white/45">
            <span className="h-1.5 w-1.5 bg-brand" />
            Results
          </div>
          <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-[40px] lg:text-[44px]">
            Results of our work
          </h2>
          <p className="mt-6 max-w-[550px] text-[18.5px] leading-relaxed text-white/70">
            Quality-first prospecting that turns fewer, better-matched leads into real pipeline.
          </p>
        </div>

        <div className="mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {RESULTS.map((r) => (
            <div
              key={r.label}
              className="result-card flex h-full min-h-[208px] flex-col rounded-[18px] bg-[rgba(75,31,109,0.2)] px-5 py-5 shadow-[0_10px_24px_-20px_rgba(0,0,0,0.65)] sm:px-6 sm:py-6"
            >
              <p className="text-[clamp(2.75rem,10vw,4.6rem)] font-semibold leading-none tracking-[-0.04em] text-white/95">
                {r.end != null
                  ? `${r.start}–${r.end}${r.suffix ?? ""}`
                  : `${r.start}${r.suffix ?? ""}`}
              </p>

              <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.18em] text-brand">
                {r.label}
              </p>

              <p className="mt-3 max-w-[17rem] text-[14px] leading-[1.6] text-white/66">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
