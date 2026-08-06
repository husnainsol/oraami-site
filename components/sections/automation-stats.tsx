const METRICS = [
  { value: "200M+", label: "Verified contacts" },
  { value: "89%", label: "ICP match accuracy" },
  { value: "50+", label: "Native integrations" },
  { value: "14 days", label: "Free trial" },
] as const

export default function AutomationStats() {
  return (
    <section className="w-full bg-canvas text-ink">
      <div className="mx-auto grid max-w-[1540px] grid-cols-2 gap-x-8 gap-y-10 px-5 pt-12 sm:grid-cols-2 sm:px-6 sm:pt-14 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12 lg:pt-20 xl:px-0">
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
