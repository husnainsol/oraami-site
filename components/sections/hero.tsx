import { ArrowRight } from "lucide-react"
import HeroChat from "./hero-chat"
import { Button } from "@/components/ui/button"

function Stat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="px-5 py-7 sm:px-8">
      <p className="text-[16px] font-semibold text-ink">{top}</p>
      <p className="mt-1 text-[14px] text-muted">{bottom}</p>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col overflow-hidden bg-canvas text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(40,20,20,0.10) 1px, transparent 1.7px)",
          backgroundSize: "10px 10px",
          maskImage: "linear-gradient(to top, black 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 80%)",
        }}
      />

      <div className="relative z-10 flex flex-1 items-center px-5 pb-10 pt-28 sm:px-8">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <div className="hero-rise inline-flex items-center gap-2 rounded-full border border-black/10 bg-canvas-soft px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" style={{ animation: "hubPulse 1.6s ease-in-out infinite" }} />
              <span className="text-[12px] uppercase tracking-[0.14em] text-ink-mute">AI Lead Intelligence</span>
            </div>

            <h1
              className="hero-rise mt-6 text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.02em] text-ink sm:text-[56px] lg:text-[62px]"
              style={{ animationDelay: "0.06s" }}
            >
              Find customers
              <br />
              ready to buy
            </h1>

            <p
              className="hero-rise mt-6 max-w-md text-[17px] leading-relaxed text-muted"
              style={{ animationDelay: "0.12s" }}
            >
              Oraami&apos;s AI reads your website, learns who you sell to, and surfaces the accounts most likely to convert — just ask.
            </p>

            <div className="hero-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.18s" }}>
              <Button href="/contact" variant="primary" size="lg" icon={ArrowRight}>
                Start free
              </Button>
              <Button href="#features" variant="outline" size="lg">
                How it works
              </Button>
            </div>
          </div>

          <div className="hero-rise w-full lg:pl-4" style={{ animationDelay: "0.2s" }}>
            <div className="mb-3 hidden items-center justify-between text-[11px] uppercase tracking-[0.14em] text-muted lg:flex">
              <span>Live analysis engine</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Real-time
              </span>
            </div>
            <HeroChat />
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-black/10">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 divide-y divide-black/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Stat top="89% ICP match accuracy" bottom="on every account we surface" />
          <Stat top="200M+ verified contacts" bottom="enriched and kept current" />
          <Stat top="Website to qualified lead" bottom="in a single automated motion" />
        </div>
      </div>
    </section>
  )
}
