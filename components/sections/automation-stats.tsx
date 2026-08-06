const METRICS = [
  { value: "200M+", label: "Verified contacts" },
  { value: "89%", label: "ICP match accuracy" },
  { value: "50+", label: "Native integrations" },
  { value: "14 days", label: "Free trial" },
] as const

export default function AutomationStats() {
  return (
    <section className="w-full bg-canvas text-ink">
      <div className="mx-auto max-w-[1540px] px-5 pt-12 sm:px-6 sm:pt-14 xl:px-0 lg:pt-20">
        <div className="flex flex-wrap gap-x-10 gap-y-10 lg:flex-nowrap lg:justify-between">
          {METRICS.map((metric) => (
            <div key={metric.label} className="min-w-0 shrink-0">
              <p className="text-[40px] font-semibold leading-[0.95] tracking-[-0.04em] text-[#1a2140]">
                {metric.value}
              </p>
              <p className="mt-4 text-[13px] font-medium leading-[1.2] text-[#757d98]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}