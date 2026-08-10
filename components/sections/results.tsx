type Result = { start: number; end?: number; suffix?: string; label: string; desc: string }

const RESULTS: Result[] = [
  {
    start: 3,
    suffix: "X",
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
    label: "Trust Sequences",
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

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-[25px]">
          {RESULTS.map((r) => (
            <div
              key={r.label}
              className="result-card rounded-[10px] bg-[linear-gradient(135deg,#f54900_0%,rgba(245,73,0,0.45)_40%,rgba(245,73,0,0.06)_100%)] p-px"
            >
              <div className="flex h-full min-h-[156px] min-w-0 flex-col rounded-[9px] bg-[#35315f] p-5">
                <p className="text-[clamp(2.1rem,3.4vw,2.625rem)] font-bold leading-none tracking-[-0.02em] text-white">
                  {r.end != null
                    ? `${r.start}–${r.end}${r.suffix ?? ""}`
                    : `${r.start}${r.suffix ?? ""}`}
                </p>

                <p className="mt-4 text-[14px] font-semibold text-brand-deep">
                  {r.label}
                </p>

                <p className="mt-1.5 max-w-none text-[13px] leading-[1.45] text-white/65 sm:max-w-[18rem]">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
