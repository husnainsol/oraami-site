import CountUp from "./count-up"
import PlexusBackground from "./plexus-background"

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#08090b] px-4 py-28 text-white sm:px-8 lg:px-16">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_88%_78%_at_-8%_42%,rgba(255,90,31,0.5),rgba(255,90,31,0.22)_42%,transparent_78%),radial-gradient(ellipse_90%_80%_at_108%_28%,rgba(59,130,246,0.48),rgba(59,130,246,0.2)_44%,transparent_80%),linear-gradient(180deg,#08090b_0%,#0d0f13_100%)]" />
      <PlexusBackground />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(8,9,11,0.08)_0%,rgba(8,9,11,0.42)_68%,#08090b_100%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,9,11,0.44)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.72)_50%,#000_74%,#000_100%)]" />
      <div className="pointer-events-none absolute bottom-[-10px] left-[-12%] z-[2] h-36 w-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.44),rgba(255,90,31,0.16)_44%,transparent_74%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10px] right-[-12%] z-[2] h-36 w-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.46),rgba(59,130,246,0.17)_45%,transparent_76%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-20 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.22)_38%,#000_100%)]" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 font-mono text-xs tracking-[0.04em] text-white/70 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a1f] shadow-[0_0_12px_rgba(255,90,31,0.65)]" />
          AI-powered lead intelligence
        </span>

        <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.06] tracking-normal text-[#f3f3f1] sm:text-6xl lg:text-7xl">
          <span className="hero-entrance hero-entrance-delay-heading-1 block">Identify customers</span>
          <span className="hero-entrance hero-entrance-delay-heading-2 block">
            <span className="text-[#ff5a1f]">most likely</span> to convert
          </span>
        </h1>

        <p className="hero-entrance hero-entrance-delay-paragraph mt-7 max-w-2xl text-pretty text-base leading-8 text-white/62 sm:text-lg">
          Oraami analyzes your website, understands your product and audience, and surfaces the leads
          that match your ideal customer profile automatically.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <div className="relative inline-block w-full sm:w-auto">
            <span className="absolute left-1/2 top-0 z-20 h-[3px] w-2/3 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
            <div className="rounded-xl bg-gradient-to-r from-orange-500 via-black to-blue-500 p-[1px]">
              <a
                href="#"
                className="group relative flex h-12 items-center justify-center overflow-hidden rounded-[11px] bg-black px-6 text-sm font-medium text-white sm:min-w-60"
              >
                <span className="block transition-all duration-500 group-hover:-translate-y-6 group-hover:opacity-0">
                  Start free - no credit card
                </span>
                <span className="absolute inset-0 flex translate-y-6 items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Start free - no credit card
                </span>
              </a>
            </div>
          </div>

          <a
            href="#"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-white/15 bg-white/[0.03] px-6 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] sm:w-auto"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M4 3.2L11 7L4 10.8V3.2Z" fill="currentColor" />
            </svg>
            Watch 2-min demo
          </a>
        </div>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          <div className="border-white/10 px-3 sm:border-r">
            <div className="font-mono text-xl text-white sm:text-2xl">
              <CountUp end={200} suffix="M+" />
            </div>
            <div className="mt-1 text-xs text-white/42">Verified contacts</div>
          </div>
          <div className="px-3 sm:border-r sm:border-white/10">
            <div className="font-mono text-xl text-[#ff5a1f] sm:text-2xl">
              <CountUp end={89} suffix="%" />
            </div>
            <div className="mt-1 text-xs text-white/42">ICP match accuracy</div>
          </div>
          <div className="border-white/10 px-3 sm:border-r">
            <div className="font-mono text-xl text-white sm:text-2xl">
              <CountUp end={50} suffix="+" />
            </div>
            <div className="mt-1 text-xs text-white/42">Native integrations</div>
          </div>
          <div className="px-3">
            <div className="font-mono text-xl text-white sm:text-2xl">
              <CountUp end={14} suffix=" days" />
            </div>
            <div className="mt-1 text-xs text-white/42">Free trial</div>
          </div>
        </div>
      </div>
    </section>
  )
}
