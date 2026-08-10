const STATS = [
  { value: "200M+", label: "Verified contacts" },
  { value: "89%", label: "ICP match accuracy" },
  { value: "5–10 min", label: "Deep research per lead" },
  { value: "6–10", label: "Stakeholders mapped per account" },
] as const

export default function StatsStrip() {
  return (
    <section className="w-full bg-white text-ink">
      <div className="landing-container grid grid-cols-2 gap-x-6 gap-y-8 pb-10 pt-12 sm:pt-14 lg:flex lg:justify-between lg:pb-9 lg:pt-20">
        {STATS.map((stat) => (
          <div key={stat.label} className="min-w-0">
            <p className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
              {stat.value}
            </p>
            <p className="mt-3 text-[14px] leading-[1.4] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
