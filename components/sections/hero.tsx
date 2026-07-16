"use client"

import { ArrowDown, ArrowRight, Database, ScanSearch, Target } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import HeroChat from "./hero-chat"
import TrustBar from "./trustbar"
import { Button } from "@/components/ui/button"
import CountUp from "@/components/ui/count-up"

type StatProps = {
  icon: typeof Target
  value?: number
  suffix?: string
  phrase: string
  label: string
}

function Stat({ icon: Icon, value, suffix = "", phrase, label }: StatProps) {
  return (
    <article className="group flex h-full min-h-[98px] items-start gap-4 rounded-2xl border border-black/[0.08] bg-canvas px-5 py-5 shadow-[0_10px_30px_-24px_rgba(32,21,21,0.35)] transition-[transform,background-color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-black/[0.12] hover:bg-canvas-soft hover:shadow-[0_16px_34px_-24px_rgba(32,21,21,0.42)] sm:px-6">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/[0.08] text-brand transition-transform duration-200 group-hover:-translate-y-0.5">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div>
        <p className="text-[16px] font-medium leading-snug text-ink">
          {value != null ? (
            <span className="text-[20px] font-semibold tracking-[-0.02em]">
              <CountUp end={value} suffix={suffix} duration={1400} />
            </span>
          ) : (
            <span className="text-[18px] font-semibold tracking-[-0.02em]">{phrase}</span>
          )}
          {value != null && <span> {phrase}</span>}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">{label}</p>
      </div>
    </article>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const float = reduceMotion ? undefined : { y: [0, -7, 0] }

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-canvas text-ink">
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

      <div className="relative z-10 pb-7 pt-28 sm:pt-32 lg:pb-5 lg:pt-30">
        <div className="site-container grid max-w-[74rem] items-center gap-14 lg:grid-cols-[0.94fr_1.06fr] lg:gap-12 xl:gap-16">
          <div className="max-w-[34rem] lg:pb-1">
            <div className="hero-rise inline-flex items-center gap-2 rounded-full border border-black/10 bg-canvas-soft px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" style={{ animation: "hubPulse 1.6s ease-in-out infinite" }} />
              <span className="text-[12px] uppercase tracking-[0.14em] text-ink-mute">AI Lead Intelligence</span>
            </div>

            <div className="hero-rise mt-5 flex items-center gap-2.5" style={{ animationDelay: "0.04s" }} aria-hidden="true">
              <span className="h-px w-10 bg-brand" />
              <span className="h-1 w-1 rounded-full bg-brand/50" />
            </div>

            <h1
              className="hero-rise mt-4 text-balance text-[44px] font-medium leading-[1.02] tracking-[-0.025em] text-ink sm:text-[56px] lg:text-[60px] xl:text-[64px]"
              style={{ animationDelay: "0.06s" }}
            >
              Find customers
              <br />
              ready to buy
            </h1>

            <p className="hero-rise mt-5 max-w-[32rem] text-[17px] leading-[1.7] text-muted" style={{ animationDelay: "0.12s" }}>
              Oraami's AI reads your website, learns who you sell to, and surfaces the accounts most likely to convert — just ask.
            </p>

            <div className="hero-rise mt-7 flex flex-wrap gap-3.5" style={{ animationDelay: "0.18s" }}>
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="h-[54px] px-7 shadow-[0_12px_30px_-14px_rgba(255,79,0,0.8)] transition-[color,background-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-14px_rgba(255,79,0,0.9)] active:translate-y-0"
              >
                Start free
              </Button>
              <Button
                href="#features"
                variant="outline"
                size="lg"
                className="h-[54px] px-7 transition-[color,background-color,border-color,transform] hover:-translate-y-0.5 active:translate-y-0"
              >
                How it works
              </Button>
            </div>

            <div className="hero-rise mt-7" style={{ animationDelay: "0.22s" }}>
              <TrustBar />
            </div>
          </div>

          <div className="hero-rise relative mx-auto w-full max-w-[42rem] lg:max-w-none" style={{ animationDelay: "0.2s" }}>
            <div className="mb-3 hidden items-center justify-between px-1 text-[11px] uppercase tracking-[0.14em] text-muted lg:flex">
              <span>Live analysis engine</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" style={{ animation: "hubPulse 1.5s ease-in-out infinite" }} />
                Real-time
              </span>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 rounded-[3rem] opacity-70 blur-2xl"
                style={{ background: "radial-gradient(circle at 50% 55%, rgba(255,122,51,0.16), transparent 68%)" }}
              />

              <motion.div
                animate={float}
                transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
                className="relative z-10 drop-shadow-[0_34px_55px_rgba(60,30,20,0.14)]"
              >
                <HeroChat />
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 hidden h-12 items-center justify-center lg:flex">
        <motion.a
          href="#features"
          className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-faint transition-colors hover:text-ink focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
        >
          Scroll to explore
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </motion.a>
      </div>

      <div className="relative z-10 pb-5">
        <div className="site-container grid max-w-[68rem] grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <Stat icon={Target} value={89} suffix="%" phrase="ICP match accuracy" label="on every account we surface" />
          </div>
          <div>
            <Stat icon={Database} value={200} suffix="M+" phrase="verified contacts" label="enriched and kept current" />
          </div>
          <div>
            <Stat icon={ScanSearch} phrase="Website to qualified lead" label="in a single automated motion" />
          </div>
        </div>
      </div>
    </section>
  )
}
