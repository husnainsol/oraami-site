"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "framer-motion"
import CountUp from "@/components/ui/count-up"

const SPEC: [string, string][] = [
  ["Industry", "B2B SaaS"],
  ["Company size", "50–500"],
  ["Stage", "Series A–C"],
  ["Region", "North America"],
]

const LEADS: [string, number][] = [
  ["Acme Systems", 94],
  ["Orbit Labs", 91],
  ["Nova Freight", 88],
]

const block = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, transition: { duration: 0.15 } },
  transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] },
}

function Rule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  )
}

export default function HeroChat() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (reduce) return
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)))

    const run = async () => {
      while (!cancelled) {
        setCycle((c) => c + 1)
        setPhase(0)
        await wait(2300)
        if (cancelled) return
        setPhase(1)
        await wait(1500)
        if (cancelled) return
        setPhase(2)
        await wait(1500)
        if (cancelled) return
        setPhase(3)
        await wait(3400)
      }
    }
    run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [reduce])

  const scanning = !reduce && phase === 0
  const showIcp = reduce || phase >= 1
  const showMatch = reduce || phase >= 2
  const showLeads = reduce || phase >= 3

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative hero-rise" style={{ animationDelay: "0.25s" }}>
        <span aria-hidden className="absolute -left-2 -top-2 z-10 h-4 w-4 border-l-2 border-t-2 border-brand" />
        <span aria-hidden className="absolute -bottom-2 -right-2 z-10 h-4 w-4 border-b-2 border-r-2 border-brand" />

        <div className="overflow-hidden rounded-xl border border-white/10 bg-console font-mono shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]">

          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-[5px] border border-white/10 bg-white/[0.03]">
                <Image src="/O.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-white/55">
                Oraami <span className="text-white/25">{"//"}</span> Analysis Engine
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animation: "hubPulse 1.4s ease-in-out infinite" }} />
              Live
            </span>
          </div>

          <div className="relative h-[416px] overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(255,255,255,0.03) 0 1px, transparent 1px 40px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0 1px, transparent 1px 40px)",
              }}
            />
            {scanning && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-brand/15 to-transparent"
                initial={{ top: "-12%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2.2, ease: "linear" }}
              />
            )}
            <div className="relative z-10 flex h-full flex-col gap-3.5 p-5 text-[12px] leading-relaxed">

            <div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">
                  <span className="text-brand">$</span> {showIcp ? "scan complete" : "scanning acme.com"}
                </span>
                <span className={showIcp ? "text-emerald-400" : "text-white/50"}>
                  {showIcp ? "100%" : <CountUp key={cycle} end={100} suffix="%" duration={2000} />}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                <motion.div
                  key={cycle}
                  className="h-full rounded-full bg-brand"
                  initial={{ width: reduce ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: scanning ? 2.1 : 0, ease: "linear" }}
                />
              </div>
            </div>

            <AnimatePresence mode="popLayout">

              {showIcp && (
                <motion.div key="icp" {...block} className="space-y-2">
                  <Rule label="Ideal customer profile" />
                  <div className="space-y-1.5 pt-0.5">
                    {SPEC.map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between">
                        <span className="text-white/40">{k}</span>
                        <span className="text-white">{v}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {showMatch && (
                <motion.div key="match" {...block}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Match confidence</span>
                    <span className="font-semibold text-brand">
                      <CountUp end={88} suffix="%" duration={1100} />
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-brand-glow"
                      initial={{ width: 0 }}
                      animate={{ width: "88%" }}
                      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
                    />
                  </div>
                </motion.div>
              )}

              {showLeads && (
                <motion.div key="leads" {...block} className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Leads found</span>
                    <span className="flex items-baseline gap-1.5">
                      <span className="text-xl font-semibold text-white">
                        <CountUp end={612} duration={1400} />
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-emerald-400">▲ live</span>
                    </span>
                  </div>
                  <div className="space-y-1 pt-0.5">
                    {LEADS.map(([name, score]) => (
                      <div key={name} className="flex items-center justify-between border-t border-white/5 pt-1.5 text-[11px]">
                        <span className="text-white/70">{name}</span>
                        <span className="text-brand-glow">{score}% fit</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <span className="pt-1 text-white/30">
              <span className="text-brand">$</span>
              <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-white/40" style={{ animation: "hubPulse 1s steps(1) infinite" }} />
            </span>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
