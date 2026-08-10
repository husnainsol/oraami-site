const METRICS = [
  { value: "200M+", label: "Verified contacts" },
  { value: "89%", label: "ICP match accuracy" },
  { value: "50+", label: "Native integrations" },
  { value: "Live", label: "Performance reporting" },
] as const

export default function AutomationStats() {
  return (
    <section className="w-full bg-canvas text-ink">
      <div className="landing-container grid grid-cols-2 gap-x-8 gap-y-10 pt-12 sm:grid-cols-2 sm:pt-14 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12 lg:pt-20">
        {METRICS.map((metric) => (
          <div key={metric.label} className="min-w-0">
            <p className="text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-[#1a2140]">
              {metric.value}
            </p>
            <p className="mt-4 text-[12px] font-medium leading-[1.2] text-[#757d98]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
