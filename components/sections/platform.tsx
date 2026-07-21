"use client"

import { useEffect, useRef, useState } from "react"

function IconDefine() {
  return (
    <svg width="44" height="44" viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <path d="M6 12h34v22H6z" className="stroke-outline" strokeWidth="1.5" />
      <path d="M6 12l17 12 17-12" className="stroke-outline" strokeWidth="1.5" />
      <rect x="18" y="17" width="10" height="10" className="fill-brand" />
    </svg>
  )
}
function IconResearch() {
  return (
    <svg width="44" height="44" viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <circle cx="19" cy="19" r="12" className="stroke-outline" strokeWidth="1.5" />
      <path d="M28 28l10 10" className="stroke-outline" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="13" y="13" width="12" height="12" className="fill-brand" />
    </svg>
  )
}
function IconMatch() {
  return (
    <svg width="52" height="44" viewBox="0 0 56 48" fill="none" aria-hidden="true">
      <path d="M8 12h12l3 4h15v18H8z" className="stroke-outline" strokeWidth="1.5" />
      <rect x="16" y="20" width="12" height="10" className="fill-brand" />
      <circle cx="35" cy="18" r="1.4" className="fill-outline" />
      <circle cx="35" cy="24" r="1.4" className="fill-outline" />
    </svg>
  )
}
function IconEngage() {
  return (
    <svg width="52" height="44" viewBox="0 0 56 48" fill="none" aria-hidden="true">
      <path d="M8 23L38 9l-6 30-9-11z" className="stroke-outline" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="16" y="18" width="10" height="10" className="fill-brand" />
    </svg>
  )
}

type Step = { n: string; label: string; title: string; desc: string; Icon: () => React.JSX.Element }

const STEPS: Step[] = [
  { n: "01", label: "Target", Icon: IconDefine, title: "Define your ICP", desc: "We learn who you sell to and cap each ICP at 50 high-fit accounts worth pursuing." },
  { n: "02", label: "Research", Icon: IconResearch, title: "Research every lead", desc: "5–10 minutes of deep AI research on each prospect and their full buying committee." },
  { n: "03", label: "Match", Icon: IconMatch, title: "Match & personalise", desc: "We match your case studies and proof, then craft a trust-building sequence per account." },
  { n: "04", label: "Engage", Icon: IconEngage, title: "Engage & build trust", desc: "8–12 personalised emails over 6–12 weeks that turn cold leads into warm relationships." },
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
  const [started, setStarted] = useState(false)
  const [activeStep, setActiveStep] = useState(-1)
  const [beamStep, setBeamStep] = useState(0)
  const [revealedStep, setRevealedStep] = useState(-1)
  const [arrowSignal, setArrowSignal] = useState<string | null>(null)
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reducedMotion.matches) {
      setStarted(true)
      setBeamStep(3)
      setActiveStep(3)
      setRevealedStep(3)
      return
    }

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
  }, [])

  useEffect(() => {
    if (!started || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

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
  }, [started])

  return (
    <section ref={sectionRef} id="platform" className="relative w-full border-b border-black/10 bg-canvas text-ink">
      <div className="site-container py-20">

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            The process
          </div>
          <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
            How it works
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            From a cold list to a warm relationship — the four-step motion Oraami runs for you, on autopilot.
          </p>
        </div>

        <div className={"process-flow relative mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 " + (isResetting ? "is-resetting" : "")}>

          {STEPS.map((s, i) => {
            const { Icon } = s
            const isActive = activeStep === i
            const isRevealed = revealedStep >= i
            return (
              <div key={s.n} className={"process-step relative " + (isActive ? "is-active " : "") + (isRevealed ? "is-revealed" : "")}>
                {i < STEPS.length - 1 && (
                  <>
                    <span aria-hidden className={"process-mobile-track sm:hidden " + (beamStep > i ? "is-travelled" : "")}>
                      <ConnectorArrows segment={i} signal={arrowSignal} />
                    </span>
                    <span aria-hidden className={"process-desktop-segment hidden lg:block " + (beamStep > i ? "is-travelled" : "")}>
                      <ConnectorArrows segment={i} signal={arrowSignal} />
                    </span>
                  </>
                )}

                <div className="flex items-center justify-between">
                  <span className="process-number flex h-12 items-center rounded-md border border-black/20 bg-[#1E1A4D] px-4 text-[15px] text-[#FAF8F6]">
                    <span className="text-brand">.</span>
                    {s.n}
                  </span>
                </div>

                <div className="process-content mt-10">
                  <span className={"process-icon process-icon--" + (i + 1)}>
                    <Icon />
                  </span>
                  <p className="mt-7 text-[11px] uppercase tracking-widest text-brand">{s.label}</p>
                  <h3 className="mt-3 text-[20px] font-medium tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-3 max-w-[15rem] text-[15px] leading-relaxed text-muted">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
