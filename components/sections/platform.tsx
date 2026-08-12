"use client"

import { useEffect, useRef, useState, type ComponentType } from "react"
import { Mail, Network, Search, Target } from "lucide-react"
import { useReducedMotionPreference } from "@/components/ui/use-reduced-motion-preference"

type Step = { n: string; label: string; title: string; desc: string; Icon: ComponentType<{ className?: string; strokeWidth?: number }>}

const STEPS: Step[] = [
  { n: "01", label: "Target", Icon: Target, title: "Define your ICP", desc: "We learn who you sell to and cap each ICP at 50 high-fit accounts worth pursuing." },
  { n: "02", label: "Research", Icon: Search, title: "Research every lead", desc: "5–10 minutes of deep AI research on each prospect and their full buying committee." },
  { n: "03", label: "Match", Icon: Network, title: "Match & personalise", desc: "We match your case studies and proof, then craft a trust-building sequence per account." },
  { n: "04", label: "Engage", Icon: Mail, title: "Engage & build trust", desc: "8–12 personalised emails over 6–12 weeks that turn cold leads into warm relationships." },
]

type ConnectorArrowsProps = { segment: number; signal: string | null }

function ConnectorArrows({ segment, signal }: ConnectorArrowsProps) {
  return (
    <>
      <span className={"process-connector-arrow process-connector-arrow--1 " + (signal === segment + "-0" ? "is-signalled" : "")} />
      <span className={"process-connector-arrow process-connector-arrow--2 " + (signal === segment + "-1" ? "is-signalled" : "")} />
    </>
  )
}

export default function Platform() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotionPreference()
  const [started, setStarted] = useState(false)
  const [activeStep, setActiveStep] = useState(-1)
  const [beamStep, setBeamStep] = useState(0)
  const [revealedStep, setRevealedStep] = useState(-1)
  const [arrowSignal, setArrowSignal] = useState<string | null>(null)
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (!started || reducedMotion) return

    const timers: number[] = []
    let stopped = false
    const schedule = (delay: number, action: () => void) => {
      timers.push(window.setTimeout(action, delay))
    }
    const activate = (step: number) => {
      setActiveStep(step)
      setRevealedStep((current) => Math.max(current, step))
    }
    const runCycle = (): void => {
      if (stopped) return
      setIsResetting(false)
      setBeamStep(0)
      setArrowSignal(null)
      activate(0)

      schedule(650, () => setBeamStep(1))
      schedule(920, () => setArrowSignal("0-0"))
      schedule(1220, () => setArrowSignal("0-1"))
      schedule(1550, () => { setArrowSignal(null); activate(1) })

      schedule(2150, () => setBeamStep(2))
      schedule(2420, () => setArrowSignal("1-0"))
      schedule(2720, () => setArrowSignal("1-1"))
      schedule(3050, () => { setArrowSignal(null); activate(2) })

      schedule(3650, () => setBeamStep(3))
      schedule(3920, () => setArrowSignal("2-0"))
      schedule(4220, () => setArrowSignal("2-1"))
      schedule(4550, () => { setArrowSignal(null); activate(3) })

      schedule(6050, () => setIsResetting(true))
      schedule(6350, () => { setBeamStep(0); setArrowSignal(null); setActiveStep(-1) })
      schedule(6600, runCycle)
    }

    schedule(250, runCycle)
    return () => {
      stopped = true
      timers.forEach(window.clearTimeout)
    }
  }, [reducedMotion, started])

  const displayedActiveStep = reducedMotion ? 3 : activeStep
  const displayedBeamStep = reducedMotion ? 4 : beamStep
  const displayedRevealedStep = reducedMotion ? 3 : revealedStep

  return (
    <section ref={sectionRef} id="platform" className="relative w-full bg-canvas text-ink">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.24em] text-[#a8a69d]">
            <span aria-hidden="true" className="h-2 w-2 bg-brand-deep" />
            The Process
          </p>
          <h2 className="landing-section-title mt-3">
            How it works
          </h2>
          <p className="landing-section-description mt-4 max-w-xl">
            From a cold list to a warm relationship — the four-step motion Oraami runs for you, on autopilot.
          </p>
        </div>

        <div className={"process-flow relative mt-8 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-x-7 " + (isResetting ? "is-resetting" : "")}>
          {STEPS.map((s, i) => {
            const { Icon } = s
            const isActive = displayedActiveStep === i
            const isRevealed = displayedRevealedStep >= i
            return (
              <div key={s.n} className={"process-step relative min-w-0 sm:rounded-[16px] sm:border sm:border-black/[0.06] sm:bg-white sm:p-4 xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0 " + (isActive ? "is-active " : "") + (isRevealed ? "is-revealed" : "") }>
                <div className="relative sm:hidden pl-12">
                  {i < STEPS.length - 1 && (
                    <span aria-hidden className={"process-mobile-track " + (displayedBeamStep > i ? "is-travelled" : "")}>
                      <ConnectorArrows segment={i} signal={arrowSignal} />
                    </span>
                  )}

                  <div className="pb-1">
                    <div className="flex items-center justify-between">
                      <span className="process-number flex h-10 items-center rounded-md border border-black/20 bg-oraami-accent-secondary px-3 text-[14px] text-cream">
                        <span className="text-brand-deep">.</span>
                        {s.n}
                      </span>
                    </div>

                    <div className="process-content mt-7">
                      <span className={"process-icon process-icon--" + (i + 1)}>
                        <Icon className="h-5 w-5 text-brand-deep" strokeWidth={1.75} />
                      </span>
                      <p className="mt-6 text-[11px] uppercase tracking-widest text-brand-deep">{s.label}</p>
                      <h3 className="mt-3 text-[19px] font-medium tracking-tight text-ink">{s.title}</h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-muted">{s.desc}</p>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block">
                  {i < STEPS.length - 1 && (
                    <span aria-hidden className={"process-desktop-segment hidden xl:block " + (displayedBeamStep > i ? "is-travelled" : "")}>
                      <ConnectorArrows segment={i} signal={arrowSignal} />
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                  <span className="process-number flex h-10 items-center rounded-md border border-black/15 bg-oraami-accent-secondary px-3 text-[14px] text-cream">
                    <span className="text-brand-deep">.</span>
                    {s.n}
                  </span>
                  </div>

                  <div className="process-content mt-5 xl:mt-8">
                  <span className={"process-icon process-icon--" + (i + 1)}>
                    <Icon className="h-5 w-5 text-brand-deep" strokeWidth={1.75} />
                  </span>
                  <p className="mt-5 text-[10px] uppercase tracking-widest text-brand-deep">{s.label}</p>
                  <h3 className="landing-card-title mt-2">{s.title}</h3>
                  <p className="landing-card-description mt-2 max-w-none xl:max-w-[15rem]">{s.desc}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
