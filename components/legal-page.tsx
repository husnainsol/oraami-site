export type LegalSection = { heading: string; paras?: string[]; list?: string[] }

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <main className="text-ink">

      <section className="relative w-full overflow-hidden border-b border-black/10 bg-canvas">
        <div className="site-container relative pb-8 pt-11 lg:pb-11 lg:pt-16">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2rem,_calc(2rem_+_0.9375vw),_2.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-heading">
              {title}
            </h1>
            <p className="mt-5 text-[clamp(0.6875rem,_calc(0.6875rem_+_0.08vw),_0.75rem)] uppercase tracking-wider text-faint">Last updated · {updated}</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-canvas">
        <div className="site-container max-w-[820px] py-16 lg:py-24">
          <p className="text-[clamp(0.9375rem,_calc(0.9375rem_+_0.156vw),_1.0625rem)] leading-relaxed text-ink-mute">{intro}</p>

          <div className="mt-12 flex flex-col gap-11">
            {sections.map((s, i) => (
              <div key={s.heading}>
                <h2 className="flex items-baseline gap-3 text-[clamp(1.125rem,_calc(1.125rem_+_0.3125vw),_1.375rem)] font-medium tracking-tight text-heading">
                  <span className="text-[clamp(0.6875rem,_calc(0.6875rem_+_0.156vw),_0.8125rem)] text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                {s.paras?.map((p, j) => (
                  <p key={j} className="mt-4 text-[clamp(0.875rem,_calc(0.875rem_+_0.156vw),_1rem)] leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2.5">
                    {s.list.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[clamp(0.875rem,_calc(0.875rem_+_0.156vw),_1rem)] leading-relaxed text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <p className="mt-14 border-t border-dashed border-black/15 pt-8 text-[clamp(0.8125rem,_calc(0.8125rem_+_0.156vw),_0.9375rem)] leading-relaxed text-faint">
            Questions about this policy? Email{" "}
            <a href="mailto:hello@oraami.com" className="text-ink underline decoration-brand underline-offset-4 transition-colors hover:text-brand">
              hello@oraami.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
