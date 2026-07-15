import { Check } from "lucide-react"

const SIGNALS = ["Opened 2 new SDR roles", "Series B · $40M raised", "Migrated to HubSpot", "New VP of Sales hired"]

type Person = { initials: string; name: string; role: string; tag?: string }

const COMMITTEE: Person[] = [
  { initials: "DW", name: "Dana Whitfield", role: "VP Sales", tag: "Decision maker" },
  { initials: "TA", name: "Tom Alvarez", role: "Chief Financial Officer", tag: "Economic buyer" },
  { initials: "RM", name: "Raj Malhotra", role: "Head of RevOps" },
  { initials: "EC", name: "Elena Cho", role: "Dir. Demand Gen" },
]

const LABEL = "text-[11px] uppercase tracking-widest text-faint"

export default function Dossier() {
  return (
    <section className="relative w-full border-b border-black/10 bg-canvas-alt text-ink">
      <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10 lg:px-12 lg:py-20">

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            The output
          </div>
          <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
            Anatomy of a researched lead
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            Before a single email goes out, Oraami compiles a complete dossier on every account — the signals, the people, the proof and the opening.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-xl border border-black/12 bg-canvas-soft shadow-[0_40px_90px_-60px_rgba(20,10,0,0.55)]">

          <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-dashed border-black/15 px-6 py-4 text-[12px] uppercase tracking-wider text-faint sm:px-8">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-brand" />
              Lead dossier · #A-2471
            </span>
            <span>Researched in 7m 20s · 14 sources</span>
          </div>

          <div className="grid lg:grid-cols-[1.75fr_1fr]">

            <div className="p-6 sm:p-8 lg:border-r lg:border-dashed lg:border-black/15 lg:p-10">

              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <h3 className="text-[26px] font-medium tracking-tight text-ink">Northwind Robotics</h3>
                  <p className="mt-1.5 text-[14px] text-faint">Industrial automation · 320 employees · San Francisco</p>
                </div>
                <div className="flex items-center gap-3 border border-brand/30 bg-brand/[0.06] px-4 py-2.5">
                  <span className="text-[28px] font-medium leading-none text-brand">
                    92<span className="text-[15px] text-brand-faded">/100</span>
                  </span>
                  <span className="text-[11px] uppercase leading-tight tracking-wider text-ink">
                    High
                    <br />
                    fit
                  </span>
                </div>
              </div>

              <div className="mt-9">
                <p className={LABEL}>Buying signals</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {SIGNALS.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-2 border border-black/12 bg-canvas-soft px-3 py-2 text-[13px] text-ink-soft"
                    >
                      <span className="h-1.5 w-1.5 bg-brand" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-9">
                <p className={LABEL}>Buying committee</p>
                <div className="mt-3.5 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  {COMMITTEE.map((p) => (
                    <div key={p.initials} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-black/15 bg-white text-[12px] text-ink">
                        {p.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-medium text-ink">{p.name}</p>
                        <p className="truncate text-[12px] text-faint">
                          {p.role}
                          {p.tag && <span className="ml-2 uppercase tracking-wider text-brand">· {p.tag}</span>}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-9">
                <p className={LABEL}>Matched proof</p>
                <div className="mt-3.5 flex items-center gap-3 border border-dashed border-black/20 bg-canvas-soft p-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-brand">
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <p className="text-[14px] text-ink-soft">
                    Case study <span className="font-medium text-ink">Solstice Cloud</span> → +38% qualified pipeline in 90 days
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-ink p-6 text-white sm:p-8 lg:p-10">
              <p className="text-[11px] uppercase tracking-widest text-white/45">Suggested opening</p>
              <p className="mt-4 text-[16px] leading-relaxed text-white/85">
                “Congrats on the Series B, Dana — as you scale the new SDR team, here&rsquo;s how Solstice hit 38% more qualified pipeline without adding headcount…”
              </p>

              <div className="mt-9 space-y-4 border-t border-dashed border-white/15 pt-7">
                <div className="flex items-end justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-white/45">Quality score</span>
                  <span className="text-[22px] font-medium leading-none">
                    4.8<span className="text-[13px] text-white/40">/5</span>
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-white/45">Personalisation</span>
                  <span className="text-[22px] font-medium leading-none text-brand">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
