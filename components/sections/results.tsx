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
    <section className="relative w-full bg-oraami-accent-secondary text-white">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <div className="max-w-2xl">
          <h2 className="landing-section-title !text-white">
            Results of our work
          </h2>
          <p className="landing-section-description mt-4 max-w-[550px] !text-white/68">
            Quality-first prospecting that turns fewer, better-matched leads into real pipeline.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {RESULTS.map((r) => (
            <div
              key={r.label}
              className="result-card flex h-full min-h-[156px] min-w-0 flex-col rounded-[15px] bg-[rgba(75,31,109,0.1)] p-5 shadow-[0_10px_24px_-20px_rgba(0,0,0,0.55)] sm:min-h-[164px]"
            >
              <p className="text-[clamp(2.4rem,7vw,3.5rem)] font-medium leading-none tracking-[-0.04em] text-white/95">
                {r.end != null
                  ? `${r.start}–${r.end}${r.suffix ?? ""}`
                  : `${r.start}${r.suffix ?? ""}`}
              </p>

              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-brand">
                {r.label}
              </p>

              <p className="mt-2.5 max-w-none text-[13px] leading-[1.55] text-white/66 sm:max-w-[18rem]">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
