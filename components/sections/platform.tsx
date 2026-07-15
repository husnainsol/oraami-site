

function IconDefine() {
  return (
    <svg width="44" height="44" viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <path d="M6 12h34v22H6z" className="stroke-outline" strokeWidth="1.5" />
      <path d="M6 12l17 12 17-12" className="stroke-outline" strokeWidth="1.5" />
      <rect x="18" y="17" width="10" height="10" className="fill-brand" />
    </svg>
  )
}
function IconResearch() {
  return (
    <svg width="44" height="44" viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <circle cx="19" cy="19" r="12" className="stroke-outline" strokeWidth="1.5" />
      <path d="M28 28l10 10" className="stroke-outline" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="13" y="13" width="12" height="12" className="fill-brand" />
    </svg>
  )
}
function IconMatch() {
  return (
    <svg width="52" height="44" viewBox="0 0 56 48" fill="none" aria-hidden="true">
      <path d="M8 12h12l3 4h15v18H8z" className="stroke-outline" strokeWidth="1.5" />
      <rect x="16" y="20" width="12" height="10" className="fill-brand" />
      <circle cx="35" cy="18" r="1.4" className="fill-outline" />
      <circle cx="35" cy="24" r="1.4" className="fill-outline" />
    </svg>
  )
}
function IconEngage() {
  return (
    <svg width="52" height="44" viewBox="0 0 56 48" fill="none" aria-hidden="true">
      <path d="M8 23L38 9l-6 30-9-11z" className="stroke-outline" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="16" y="18" width="10" height="10" className="fill-brand" />
    </svg>
  )
}

type Step = { n: string; label: string; title: string; desc: string; Icon: () => React.JSX.Element }

const STEPS: Step[] = [
  { n: "01", label: "Target", Icon: IconDefine, title: "Define your ICP", desc: "We learn who you sell to and cap each ICP at 50 high-fit accounts worth pursuing." },
  { n: "02", label: "Research", Icon: IconResearch, title: "Research every lead", desc: "5–10 minutes of deep AI research on each prospect and their full buying committee." },
  { n: "03", label: "Match", Icon: IconMatch, title: "Match & personalise", desc: "We match your case studies and proof, then craft a trust-building sequence per account." },
  { n: "04", label: "Engage", Icon: IconEngage, title: "Engage & build trust", desc: "8–12 personalised emails over 6–12 weeks that turn cold leads into warm relationships." },
]

export default function Platform() {
  return (
    <section id="platform" className="relative w-full border-b border-black/10 bg-canvas text-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10 lg:px-12 lg:py-20">

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            The process
          </div>
          <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
            How it works
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            From a cold list to a warm relationship — the four-step motion Oraami runs for you, on autopilot.
          </p>
        </div>

        <div className="relative mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">

          <div aria-hidden className="absolute left-6 right-6 top-6 hidden border-t border-dashed border-black/20 lg:block" />

          {STEPS.map((s, i) => {
            const { Icon } = s
            return (
              <div key={s.n} className="relative">

                <div className="flex items-center justify-between">
                  <span className="flex h-12 items-center rounded-md border border-black/20 bg-white px-4 text-[15px] text-ink">
                    <span className="text-brand">.</span>
                    {s.n}
                  </span>
                  {i < STEPS.length - 1 && (
                    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-1 hidden bg-white text-line-num lg:block">
                      <path d="M2 8h12m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                <div className="mt-10">
                  <Icon />
                  <p className="mt-7 text-[11px] uppercase tracking-widest text-brand">{s.label}</p>
                  <h3 className="mt-3 text-[20px] font-medium tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-3 max-w-[15rem] text-[15px] leading-relaxed text-muted">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
