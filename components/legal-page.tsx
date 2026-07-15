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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(20,20,20,0.10) 1px, transparent 1.7px)",
            backgroundSize: "9px 9px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          }}
        />
        <div className="site-container relative pb-14 pt-28 lg:pb-20 lg:pt-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
              <span className="h-1.5 w-1.5 bg-brand" />
              Legal
            </div>
            <h1 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
              {title}
            </h1>
            <p className="mt-5 text-[12px] uppercase tracking-wider text-faint">Last updated · {updated}</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-canvas">
        <div className="mx-auto max-w-[820px] px-6 py-16 sm:px-10 lg:px-0 lg:py-24">
          <p className="text-[17px] leading-relaxed text-ink-mute">{intro}</p>

          <div className="mt-12 flex flex-col gap-11">
            {sections.map((s, i) => (
              <div key={s.heading}>
                <h2 className="flex items-baseline gap-3 text-[22px] font-medium tracking-tight text-heading">
                  <span className="text-[13px] text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                {s.paras?.map((p, j) => (
                  <p key={j} className="mt-4 text-[16px] leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2.5">
                    {s.list.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[16px] leading-relaxed text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <p className="mt-14 border-t border-dashed border-black/15 pt-8 text-[15px] leading-relaxed text-faint">
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
