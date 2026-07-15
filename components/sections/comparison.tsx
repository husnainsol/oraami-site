import { Check, X } from "lucide-react"

const OLD = [
  "Blast thousands of low-fit contacts",
  "Generic templates, zero research",
  "~1% reply rate, mostly ignored",
  "Burned domains & sender reputation",
  "Reps buried in manual busywork",
]

const NEW = [
  "50 high-fit accounts per ICP",
  "5–10 min deep research per lead",
  "3× reply rate on personalised outreach",
  "Trust built over 6–12 week sequences",
  "Reps focused on booked meetings",
]

export default function Comparison() {
  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-surface-dark text-white">

      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">

        <div className="grid lg:grid-cols-[minmax(300px,1fr)_2fr]">
          <div className="hidden lg:block" />
          <div className="pt-16 lg:pl-12 lg:pt-24">
            <h2 className="text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[54px]">
              Quality over
              <br />
              volume
            </h2>
          </div>
        </div>

        <div className="grid gap-12 pb-16 lg:grid-cols-[minmax(300px,1fr)_2fr] lg:gap-0 lg:pb-16">

          <div className="flex items-center py-8 lg:pr-12">
            <p className="max-w-[16rem] text-[13px] uppercase leading-relaxed tracking-wider text-white">
              Fewer, better-matched prospects beat blasting thousands — every time.
            </p>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2">

            <div className="border-b border-dashed border-white/15 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <p className="text-[11px] uppercase tracking-widest text-white/45">The spray &amp; pray way</p>
              <ul className="mt-8 space-y-5">
                {OLD.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[16px] leading-snug text-white/55">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-white/30" aria-hidden="true" />
                    <span className="line-through decoration-white/20">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative bg-brand/[0.06] p-6 sm:p-8">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-brand" />
              <p className="text-[11px] uppercase tracking-widest text-brand">The Oraami way</p>
              <ul className="mt-8 space-y-5">
                {NEW.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[16px] leading-snug text-white">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
