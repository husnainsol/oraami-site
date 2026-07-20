"use client"

import { useLayoutEffect, useRef, type PointerEvent } from "react"
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CircleCheck,
  Landmark,
  RefreshCcw,
  Sparkles,
  UserRoundPlus,
  type LucideIcon,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type Signal = { label: string; icon: LucideIcon }

const SIGNALS: Signal[] = [
  { label: "Opened 2 new SDR roles", icon: BriefcaseBusiness },
  { label: "Series B · $40M raised", icon: Landmark },
  { label: "Migrated to HubSpot", icon: RefreshCcw },
  { label: "New VP of Sales hired", icon: UserRoundPlus },
]

type Person = { initials: string; name: string; role: string; tag?: string; tone: string }

const COMMITTEE: Person[] = [
  { initials: "DW", name: "Dana Whitfield", role: "VP Sales", tag: "Decision maker", tone: "bg-[#f4e8df]" },
  { initials: "TA", name: "Tom Alvarez", role: "Chief Financial Officer", tag: "Economic buyer", tone: "bg-[#ece9df]" },
  { initials: "RM", name: "Raj Malhotra", role: "Head of RevOps", tone: "bg-[#eee4e1]" },
  { initials: "EC", name: "Elena Cho", role: "Dir. Demand Gen", tone: "bg-[#e7ebe5]" },
]

const SCORES = [
  { label: "Quality score", value: "4.8", suffix: "/5", kind: "quality" },
  { label: "Personalisation", value: "100", suffix: "%", kind: "personalisation" },
]

const OPENING =
  "Congrats on the Series B, Dana — as you scale the new SDR team, here’s how Solstice hit 38% more qualified pipeline without adding headcount…"
const OPENING_WORDS = OPENING.split(" ")
const LABEL = "text-[11px] uppercase tracking-widest text-faint"

export default function Dossier() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          mobile: "(max-width: 767px)",
          desktop: "(min-width: 768px)",
        },
        ({ conditions }) => {
          const reduceMotion = Boolean(conditions?.reduceMotion)
          const mobile = Boolean(conditions?.mobile)
          const root = sectionRef.current
          if (!root) return

          const select = gsap.utils.selector(root)
          const dossierShell = select("[data-dossier-shell]")[0]
          const progress = select("[data-research-progress]")[0]
          const status = select("[data-research-status]")[0]
          const time = select("[data-research-time]")[0]
          const sources = select("[data-source-count]")[0]
          const fit = select("[data-fit-score-value]")[0]
          const quality = select("[data-quality-value]")[0]
          const personalisation = select("[data-personalisation-value]")[0]
          const fitBar = select("[data-fit-score-bar]")[0]
          const qualitySegments = select("[data-quality-segment]")
          const personalisationBar = select("[data-personalisation-bar]")[0]
          const openingWords = select("[data-opening-word]")

          const setText = (target: Element | null, value: string) => {
            if (target) target.textContent = value
          }

          const showFinalState = () => {
            setText(time, "7m 20s")
            setText(sources, "14")
            setText(fit, "92")
            setText(quality, "4.8")
            setText(personalisation, "100")
            setText(status, "Research complete")
          }

          if (reduceMotion) {
            showFinalState()
            gsap.set(fitBar, { scaleX: 0.92, transformOrigin: "left center" })
            gsap.set(qualitySegments, {
              scaleX: (index) => index === qualitySegments.length - 1 ? 0.8 : 1,
              transformOrigin: "left center",
            })
            gsap.set(personalisationBar, { scaleX: 1, transformOrigin: "left center" })
            return
          }

          const distance = mobile ? 20 : 36
          const panelDistance = mobile ? 20 : 48
          const signalStagger = mobile ? 0.055 : 0.1

          gsap.set(select("[data-eyebrow]"), { autoAlpha: 0, x: -10 })
          gsap.set(select("[data-eyebrow-marker]"), { scale: 0, rotate: 45 })
          gsap.set(select("[data-dossier-heading]"), {
            autoAlpha: 0,
            y: mobile ? 18 : 28,
            scale: 0.985,
            filter: mobile ? "blur(3px)" : "blur(8px)",
          })
          gsap.set(select("[data-dossier-description]"), {
            autoAlpha: 0,
            y: mobile ? 12 : 18,
            filter: mobile ? "blur(2px)" : "blur(5px)",
          })
          gsap.set(select("[data-dossier-glow]"), { autoAlpha: 0 })
          gsap.set(select("[data-dossier-shell]"), {
            autoAlpha: 0,
            y: distance,
            scale: 0.985,
            filter: mobile ? "blur(3px)" : "blur(8px)",
            boxShadow: "0 14px 45px rgba(30, 15, 10, 0.035)",
          })
          gsap.set(progress, { scaleX: 0, transformOrigin: "left center" })
          gsap.set(fitBar, { scaleX: 0, transformOrigin: "left center" })
          gsap.set(personalisationBar, { scaleX: 0, transformOrigin: "left center" })
          gsap.set(qualitySegments, { scaleX: 0, transformOrigin: "left center" })
          gsap.set(select("[data-dossier-meta]"), { autoAlpha: 0, y: 8 })
          gsap.set(select("[data-company-info]"), { autoAlpha: 0, y: 16 })
          gsap.set(select("[data-fit-score]"), { autoAlpha: 0, scale: 0.9 })
          gsap.set(select("[data-high-fit]"), { autoAlpha: 0, scale: 0.92 })
          gsap.set(select("[data-group-label]"), { autoAlpha: 0, y: 6 })
          gsap.set(select("[data-buying-signal]"), { autoAlpha: 0, y: 10, scale: 0.96 })
          gsap.set(select("[data-signal-marker]"), { scale: 0 })
          gsap.set(select("[data-stakeholder]"), { autoAlpha: 0, y: 12, x: (index) => mobile ? 0 : index % 2 === 0 ? -6 : 6 })
          gsap.set(select("[data-avatar]"), { autoAlpha: 0, scale: 0.9 })
          gsap.set(select("[data-role-tag]"), { autoAlpha: 0, x: 6 })
          gsap.set(select("[data-proof-card]"), { autoAlpha: 0, y: 14, scale: 0.98 })
          gsap.set(select("[data-proof-text]"), { autoAlpha: 0, x: -8 })
          gsap.set(select("[data-proof-check]"), { strokeDasharray: 18, strokeDashoffset: 18 })
          gsap.set(select("[data-right-panel]"), { autoAlpha: 0, x: panelDistance })
          gsap.set(select("[data-panel-divider]"), { scaleY: 0, transformOrigin: "top" })
          gsap.set(select("[data-panel-bridge]"), { scaleX: 0, transformOrigin: "left center" })
          gsap.set(select("[data-opening-label]"), { autoAlpha: 0, y: 6 })
          gsap.set(openingWords, { autoAlpha: 0, y: mobile ? 3 : 5 })
          gsap.set(select("[data-opening-cursor]"), { autoAlpha: 0 })
          gsap.set(select("[data-score-row]"), { autoAlpha: 0, y: 8 })
          gsap.set(select("[data-complete-check]"), { autoAlpha: 0, scale: 0.7 })

          setText(time, "0m 00s")
          setText(sources, "0")
          setText(fit, "0")
          setText(quality, "0.0")
          setText(personalisation, "0")
          setText(status, "Researching account…")

          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: dossierShell ?? root,
              start: "top 72%",
              once: true,
              toggleActions: "play none none none",
            },
            onComplete: showFinalState,
          })

          const animateNumber = (
            target: Element | null,
            from: number,
            to: number,
            duration: number,
            formatter: (value: number) => string,
            position: number,
          ) => {
            const counter = { value: from }
            timeline.to(counter, {
              value: to,
              duration,
              ease: "power3.out",
              onUpdate: () => setText(target, formatter(counter.value)),
            }, position)
          }

          timeline
            .to(select("[data-eyebrow]"), { autoAlpha: 1, x: 0, duration: 0.35 }, 0)
            .to(select("[data-eyebrow-marker]"), { scale: 1, rotate: 0, duration: 0.3 }, 0.03)
            .to(select("[data-dossier-heading]"), {
              autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: mobile ? 0.5 : 0.7,
            }, 0.1)
            .to(select("[data-dossier-description]"), {
              autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.5,
            }, 0.34)
            .to(select("[data-dossier-glow]"), { autoAlpha: 1, duration: 0.75 }, 0.46)
            .to(select("[data-dossier-shell]"), {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              boxShadow: "0 24px 70px rgba(30, 15, 10, 0.08)",
              duration: mobile ? 0.58 : 0.75,
              ease: "power4.out",
            }, 0.5)
            .to(progress, { scaleX: 1, duration: mobile ? 1.75 : 2.35, ease: "none" }, 0.78)
            .to(select("[data-dossier-meta]"), { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.82)
            .call(() => setText(status, "Collecting buying signals…"), [], 1.16)
            .to(select("[data-company-info]"), { autoAlpha: 1, y: 0, duration: 0.45 }, 1.04)
            .to(select("[data-fit-score]"), { autoAlpha: 1, scale: 1, duration: 0.48 }, 1.1)
            .to(select('[data-group-label="signals"]'), { autoAlpha: 1, y: 0, duration: 0.3 }, 1.25)
            .to(select("[data-buying-signal]"), {
              autoAlpha: 1, y: 0, scale: 1, duration: 0.38, stagger: signalStagger,
            }, 1.34)
            .to(select("[data-signal-marker]"), { scale: 1, duration: 0.2, stagger: signalStagger }, 1.39)
            .call(() => setText(status, "Mapping stakeholders…"), [], 1.68)
            .to(select('[data-group-label="committee"]'), { autoAlpha: 1, y: 0, duration: 0.3 }, 1.62)
            .to(select("[data-stakeholder]"), {
              autoAlpha: 1, x: 0, y: 0, duration: 0.4, stagger: mobile ? 0.055 : 0.1,
            }, 1.7)
            .to(select("[data-avatar]"), { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.08 }, 1.72)
            .to(select("[data-role-tag]"), { autoAlpha: 1, x: 0, duration: 0.28, stagger: 0.08 }, 1.88)
            .call(() => setText(status, "Matching proof…"), [], 2.02)
            .to(select('[data-group-label="proof"]'), { autoAlpha: 1, y: 0, duration: 0.3 }, 1.94)
            .to(select("[data-proof-card]"), { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, 2)
            .to(select("[data-proof-check]"), {
              strokeDashoffset: 0, duration: 0.35, ease: "power2.out",
            }, 2.14)
            .to(select("[data-proof-text]"), { autoAlpha: 1, x: 0, duration: 0.4 }, 2.18)
            .call(() => setText(status, "Generating opening…"), [], 2.28)
            .to(select("[data-panel-divider]"), { scaleY: 1, duration: 0.5 }, 2.06)
            .to(select("[data-panel-bridge]"), { scaleX: 1, duration: 0.45, ease: "power3.inOut" }, 2.02)
            .to(select("[data-right-panel]"), {
              autoAlpha: 1, x: 0, duration: mobile ? 0.55 : 0.72, ease: "power4.out",
            }, 2.08)
            .to(select("[data-opening-label]"), { autoAlpha: 1, y: 0, duration: 0.3 }, 2.3)
            .to(openingWords, {
              autoAlpha: 1,
              y: 0,
              duration: mobile ? 0.2 : 0.28,
              stagger: mobile ? 0.018 : 0.035,
              ease: "power2.out",
            }, 2.38)
            .to(select("[data-opening-cursor]"), { autoAlpha: 1, duration: 0.12, repeat: 5, yoyo: true, ease: "none" }, 2.36)
            .to(select("[data-score-row]"), { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.09 }, 2.42)
            .to(fitBar, { scaleX: 0.92, duration: 1.2, ease: "power3.out" }, 2.35)
            .to(qualitySegments, {
              scaleX: (index) => index === qualitySegments.length - 1 ? 0.8 : 1,
              duration: 0.32,
              stagger: 0.1,
              ease: "power2.out",
            }, 2.62)
            .to(personalisationBar, { scaleX: 1, duration: 1.1, ease: "power3.out" }, 2.9)
            .to(select("[data-opening-cursor]"), { autoAlpha: 0, duration: 0.2 }, 3.25)
            .to(select("[data-high-fit]"), { autoAlpha: 1, scale: 1, duration: 0.25 }, 3.5)
            .to(select("[data-fit-pulse]"), { autoAlpha: 0.08, scale: 1.02, duration: 0.16 }, 3.5)
            .to(select("[data-fit-pulse]"), { autoAlpha: 0, scale: 1, duration: 0.18 }, 3.66)
            .to(select("[data-personalisation-pulse]"), {
              autoAlpha: 0.08, scale: 1.02, duration: 0.16,
            }, 4)
            .to(select("[data-personalisation-pulse]"), {
              autoAlpha: 0, scale: 1, duration: 0.18,
            }, 4.16)
            .call(() => setText(status, "Research complete"), [], 4.2)
            .to(select("[data-complete-check]"), { autoAlpha: 1, scale: 1, duration: 0.25 }, 4.2)

          animateNumber(time, 0, 440, mobile ? 1.05 : 1.5, (value) => {
            const seconds = Math.round(value)
            return Math.floor(seconds / 60) + "m " + String(seconds % 60).padStart(2, "0") + "s"
          }, 0.88)
          animateNumber(sources, 0, 14, 1, (value) => String(Math.round(value)), 0.9)
          animateNumber(fit, 0, 92, 1.2, (value) => String(Math.round(value)), 2.35)
          animateNumber(quality, 0, 4.8, 1, (value) => value.toFixed(1), 2.62)
          animateNumber(personalisation, 0, 100, 1.1, (value) => String(Math.round(value)), 2.9)

          const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh())

          return () => {
            cancelAnimationFrame(refreshFrame)
            timeline.kill()
          }
        },
      )
    }, sectionRef)

    return () => {
      context.revert()
      media.revert()
    }
  }, [])

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--mouse-x", event.clientX - bounds.left + "px")
    event.currentTarget.style.setProperty("--mouse-y", event.clientY - bounds.top + "px")
  }

  return (
    <section id="lead-dossier" ref={sectionRef} className="relative w-full overflow-hidden border-b border-black/10 bg-canvas-alt text-ink">
      <div className="site-container py-24 sm:py-28 lg:py-36">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="max-w-[740px]">
            <div data-eyebrow className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-faint">
              <span data-eyebrow-marker className="h-2 w-2 bg-brand" aria-hidden="true" />
              The output
            </div>
            <h2 data-dossier-heading className="mt-5 text-[38px] font-medium leading-[0.98] tracking-[-0.045em] text-heading sm:text-[48px] lg:text-[56px]">
              Anatomy of a <span className="relative whitespace-nowrap">researched<span className="absolute inset-x-0 -bottom-1 h-px bg-brand/55" aria-hidden="true" /></span> lead
            </h2>
            <p data-dossier-description className="mt-6 max-w-[610px] text-[16px] leading-[1.7] text-muted sm:text-[17px]">
              Before a single email goes out, Oraami compiles a complete dossier on every account — the signals, the people, the proof and the opening.
            </p>
          </div>
          <div data-dossier-description className="hidden border-l border-black/10 pl-6 lg:block">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-faint">From research to relevance</p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">Every claim is grounded in live account intelligence and matched proof.</p>
          </div>
        </div>

        <div className="relative mt-12 sm:mt-14 lg:mt-16">
          <div data-dossier-glow className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_76%_48%,rgba(255,79,0,0.055),transparent_42%)]" aria-hidden="true" />
          <div
            data-dossier-shell
            onPointerMove={handlePointerMove}
            className="group/dossier relative isolate overflow-hidden rounded-[16px] border border-[#d9d0c8] bg-[#fbf8f5] shadow-[0_24px_80px_rgba(34,20,18,0.08)] transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_28px_84px_rgba(34,20,18,0.11)]"
          >
            <div className="pointer-events-none absolute inset-0 z-10 hidden bg-[radial-gradient(280px_circle_at_var(--mouse-x,72%)_var(--mouse-y,50%),rgba(255,65,25,0.04),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover/dossier:opacity-100 motion-reduce:hidden md:block" aria-hidden="true" />
            <div className="relative z-20">
              <div className="grid min-h-[72px] items-center gap-4 border-b border-black/[0.09] bg-white/50 px-5 py-4 sm:px-7 md:grid-cols-[auto_minmax(120px,1fr)_auto] md:gap-7 md:py-0">
                <div data-dossier-meta className="flex min-w-max items-center gap-3">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full bg-brand/20" />
                    <span className="relative inline-flex h-2 w-2 bg-brand" />
                  </span>
                  <div>
                    <p className="text-[12px] font-medium tracking-[-0.01em] text-ink">Lead dossier</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">ID #A-2471</p>
                  </div>
                </div>
                <div data-dossier-meta className="order-3 md:order-none">
                  <div className="mb-2 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.16em] text-faint">
                    <span>Research progress</span>
                    <span>100%</span>
                  </div>
                  <div className="h-1 overflow-hidden bg-black/[0.07]" aria-hidden="true">
                    <div data-research-progress className="h-full w-full bg-brand" />
                  </div>
                </div>
                <div data-dossier-meta className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-faint">Duration</p>
                    <p data-research-time className="mt-0.5 text-[12px] font-medium tabular-nums text-ink">7m 20s</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-faint">Sources</p>
                    <p data-source-count className="mt-0.5 text-[12px] font-medium tabular-nums text-ink">14</p>
                  </div>
                  <div className="inline-flex h-7 items-center gap-1.5 border border-[#d9d0c8] bg-[#f3eee8] px-2.5 text-[10px] font-medium text-ink-soft">
                    <CircleCheck data-complete-check className="h-3 w-3 text-[#49815e]" strokeWidth={2} aria-hidden="true" />
                    <span data-research-status aria-hidden="true">Research complete</span>
                    <span className="sr-only">Research complete</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-[minmax(0,1.72fr)_minmax(320px,1fr)]">
                <div className="p-5 sm:p-8 lg:p-10 xl:p-12">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div data-company-info>
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-faint">Account intelligence</p>
                      <h3 className="mt-2.5 text-[27px] font-medium tracking-[-0.035em] text-ink sm:text-[30px]">Northwind Robotics</h3>
                      <p className="mt-2 flex flex-wrap items-center gap-x-2 text-[13px] text-faint">
                        <span>Industrial automation</span><span aria-hidden="true">·</span><span>320 employees</span><span aria-hidden="true">·</span><span>San Francisco</span>
                      </p>
                    </div>
                    <div data-fit-score data-fit-metric className="group/fit relative min-w-[148px] overflow-hidden border border-brand/25 bg-[#fff7f2] px-4 py-3.5 transition-colors duration-200 hover:border-brand/45">
                      <span data-fit-pulse className="pointer-events-none absolute inset-0 bg-brand opacity-0" aria-hidden="true" />
                      <div className="relative flex items-end justify-between gap-4">
                        <span aria-hidden="true" className="text-[30px] font-medium leading-none tracking-[-0.04em] text-brand tabular-nums"><span data-fit-score-value>92</span><span className="ml-0.5 text-[13px] tracking-normal text-brand-faded">/100</span></span>
                        <span className="sr-only">Fit score 92 out of 100</span>
                        <span data-high-fit className="mb-0.5 border border-brand/20 bg-white/80 px-1.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-ink">High fit</span>
                      </div>
                      <div className="relative mt-3 h-1 overflow-hidden bg-brand/10" aria-hidden="true"><div data-fit-score-bar className="h-full w-full origin-left bg-brand" /></div>
                    </div>
                  </div>

                  <div className="mt-10 border-t border-black/[0.07] pt-8">
                    <p data-group-label="signals" className={LABEL}>Buying signals</p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {SIGNALS.map((signal) => (
                        <span
                          key={signal.label}
                          data-buying-signal
                          className="group/signal inline-flex min-h-9 items-center gap-2 border border-[#ded6cf] bg-white/70 px-3 text-[12px] font-medium text-ink-soft transition-[transform,border-color,background-color] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-brand/30 hover:bg-[#fff8f4]"
                        >
                          <span data-signal-marker className="flex h-5 w-5 items-center justify-center bg-brand/[0.08] text-brand transition-colors duration-200 group-hover/signal:bg-brand/[0.13]" aria-hidden="true"><signal.icon className="h-3 w-3" strokeWidth={1.8} /></span>
                          {signal.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-9">
                    <p data-group-label="committee" className={LABEL}>Buying committee</p>
                    <div className="relative mt-4 grid gap-2 sm:grid-cols-2">
                      {COMMITTEE.map((person) => (
                        <div key={person.initials} data-stakeholder className="group/person flex min-h-[66px] items-center gap-3 border border-black/[0.07] bg-white/45 p-2.5 transition-[background-color,border-color] duration-200 hover:border-black/[0.13] hover:bg-white/90">
                          <span data-avatar className={`flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 text-[11px] font-medium text-ink ${person.tone}`}>
                            {person.initials}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-medium text-ink transition-transform duration-200 group-hover/person:translate-x-0.5">{person.name}</p>
                            <p className="mt-0.5 truncate text-[11px] text-faint">{person.role}</p>
                          </div>
                          {person.tag && <span data-role-tag className="hidden shrink-0 border border-brand/20 bg-brand/[0.055] px-1.5 py-1 text-[8px] font-medium uppercase tracking-[0.1em] text-brand transition-colors duration-200 group-hover/person:bg-brand/[0.09] xl:inline-block">{person.tag}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-9">
                    <p data-group-label="proof" className={LABEL}>Matched proof</p>
                    <div data-proof-card className="group/proof relative mt-4 flex items-center gap-3 overflow-hidden border border-brand/20 bg-[#fff8f3] p-4 transition-[transform,border-color,background-color] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-brand/40 hover:bg-[#fff5ee]">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand">
                        <Check data-proof-check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      <div data-proof-text className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-ink">Solstice Cloud</p>
                        <p className="mt-0.5 text-[12px] text-muted">+38% qualified pipeline in 90 days</p>
                      </div>
                      <span className="hidden text-[9px] font-medium uppercase tracking-[0.13em] text-faint sm:block">View proof</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform duration-200 group-hover/proof:translate-x-1" aria-hidden="true" />
                      <span data-panel-bridge className="absolute -right-10 top-1/2 z-30 hidden h-px w-10 bg-brand/60 lg:block" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden border-t border-black/10 lg:border-l lg:border-t-0">
                  <span data-panel-divider className="absolute left-0 top-0 z-30 hidden h-full w-px bg-brand/45 lg:block" aria-hidden="true" />
                  <div data-right-panel className="group/panel relative flex h-full min-h-[430px] flex-col overflow-hidden bg-ink p-6 text-white sm:p-8 lg:p-9 xl:p-10">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" aria-hidden="true" />
                    <div className="flex items-center justify-between gap-4">
                      <p data-opening-label className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/48">Suggested opening</p>
                      <span className="flex h-7 w-7 items-center justify-center border border-white/10 bg-white/[0.045] text-brand"><Sparkles className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden="true" /></span>
                    </div>
                    <div className="mt-5 border border-white/[0.09] bg-white/[0.035] p-5 transition-[background-color,border-color] duration-200 group-hover/panel:border-white/[0.13] group-hover/panel:bg-white/[0.05]">
                      <span className="block text-[34px] font-light leading-[0.65] text-brand/70" aria-hidden="true">“</span>
                      <p data-opening-text aria-label={`“${OPENING}”`} className="mt-3 text-[16px] leading-[1.75] text-white/85">
                        {OPENING_WORDS.map((word, index) => (
                          <span key={word + "-" + index} data-opening-word aria-hidden="true" className="inline-block">{word}{index < OPENING_WORDS.length - 1 ? "\u00a0" : ""}</span>
                        ))}
                        <span aria-hidden="true">”</span>
                        <span data-opening-cursor className="ml-1 inline-block h-[1em] w-px translate-y-[2px] bg-brand/75" aria-hidden="true" />
                      </p>
                    </div>

                    <div className="mt-auto grid gap-3 pt-7">
                      {SCORES.map((score) => (
                        <div
                          key={score.label}
                          data-score-row
                          data-quality-metric={score.kind === "quality" ? "" : undefined}
                          data-personalisation-metric={score.kind === "personalisation" ? "" : undefined}
                          className="relative border-t border-white/10 pt-4"
                        >
                          {score.kind === "personalisation" && (
                            <span data-personalisation-pulse className="pointer-events-none absolute inset-0 bg-brand opacity-0" aria-hidden="true" />
                          )}
                          <div className="relative flex items-end justify-between gap-4">
                            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/45">{score.label}</span>
                            <span aria-hidden="true" className={"text-[22px] font-medium leading-none tabular-nums " + (score.kind === "personalisation" ? "text-brand" : "text-white/90")}><span data-quality-value={score.kind === "quality" ? "" : undefined} data-personalisation-value={score.kind === "personalisation" ? "" : undefined}>{score.value}</span><span className={score.kind === "quality" ? "text-[12px] text-white/35" : ""}>{score.suffix}</span></span>
                            <span className="sr-only">{score.kind === "quality" ? "Quality score 4.8 out of 5" : "Personalisation 100 percent"}</span>
                          </div>
                          {score.kind === "quality" ? (
                            <div className="relative mt-3 flex h-1 gap-1" aria-hidden="true">
                              {[0, 1, 2, 3, 4].map((segment) => (
                                <span key={segment} className="relative h-full w-full overflow-hidden bg-white/10">
                                  <span
                                    data-quality-segment
                                    className={`absolute inset-0 origin-left ${segment === 4 ? "bg-brand" : "bg-brand/45"}`}
                                    style={{ transform: `scaleX(${segment === 4 ? 0.8 : 1})` }}
                                  />
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="relative mt-3 h-1 overflow-hidden bg-white/10" aria-hidden="true"><div data-personalisation-bar className="h-full w-full origin-left bg-brand" /></div>
                          )}
                        </div>
                      ))}
                      <div data-score-row className="flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-medium uppercase tracking-[0.15em] text-white/45">
                        <span>Evidence used</span><span className="text-white/85"><span data-source-count>14</span> sources</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
