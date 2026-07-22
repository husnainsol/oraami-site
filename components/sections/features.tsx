"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react"
import { AnimatePresence, motion, useAnimationControls, useInView, useReducedMotion, type Variants } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Mail,
  Network,
  Search,
  Target,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type Feature = {
  id: string
  Icon: LucideIcon
  title: string
  desc: string
  metric: string
  metricLabel: string
  tags: string[]
}

const FEATURES: Feature[] = [
  {
    id: "icp",
    Icon: Target,
    title: "ICP Research & Targeting",
    desc:
      "Every ICP is capped at 50 high-fit leads, so your team works a laser-focused list built around the accounts most likely to convert.",
    metric: "50",
    metricLabel: "accounts per ICP",
    tags: ["50 leads / ICP", "High-fit", "Focused list"],
  },
  {
    id: "research",
    Icon: Search,
    title: "Deep Lead Research",
    desc: "5-10 minutes of autonomous AI research on every prospect before you reach out.",
    metric: "5-10",
    metricLabel: "minutes per lead",
    tags: ["Autonomous", "Enrichment", "Pre-outreach"],
  },
  {
    id: "stakeholders",
    Icon: Network,
    title: "Multi-Stakeholder Mapping",
    desc: "Map 6-10 decision-makers per account, not just a single point of contact.",
    metric: "6-10",
    metricLabel: "people per account",
    tags: ["Buying committee", "Roles", "Coverage"],
  },
  {
    id: "sequences",
    Icon: Mail,
    title: "Trust-Building Sequences",
    desc: "8-12 personalised emails over 6-12 weeks that build genuine relationships.",
    metric: "6-12",
    metricLabel: "week window",
    tags: ["8-12 touches", "Trust", "Follow-up"],
  },
  {
    id: "analytics",
    Icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Track replies, meetings, and pipeline performance across every ICP in real time.",
    metric: "Live",
    metricLabel: "reporting view",
    tags: ["Real-Time", "Reporting", "Pipeline"],
  },
]

const ease = [0.22, 1, 0.36, 1] as const
const FEATURE_AUTOPLAY_SECONDS = 7
const FEATURE_AUTOPLAY_MS = FEATURE_AUTOPLAY_SECONDS * 1000

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
}

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease,
      when: "beforeChildren",
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.24,
      ease,
    },
  },
}

const detailVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease },
  },
}

const demoEase = [0.22, 1, 0.36, 1] as const

function VisualizationFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-[28px] border border-black/10 bg-[#FAF8F6] p-4 shadow-[0_24px_60px_-38px_rgba(32,21,21,0.5)] sm:h-[540px] sm:p-5 lg:h-[560px] lg:p-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(32,21,21,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(32,21,21,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative h-full overflow-hidden rounded-[22px] border border-black/10 bg-white p-3 sm:p-4">{children}</div>
    </div>
  )
}

function ChartGrid({ width = 420, height = 220 }: { width?: number; height?: number }) {
  return (
    <g aria-hidden="true">
      {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
        <line key={"h" + ratio} x1="28" x2={width - 12} y1={height * ratio} y2={height * ratio} stroke="rgba(32,21,21,0.075)" />
      ))}
      {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
        <line key={"v" + ratio} y1="12" y2={height - 24} x1={width * ratio} x2={width * ratio} stroke="rgba(32,21,21,0.055)" />
      ))}
    </g>
  )
}

function AnimatedLine({
  d,
  color,
  loop,
  delay = 0,
  dashed = false,
  width = 2.5,
}: {
  d: string
  color: string
  loop: boolean
  delay?: number
  dashed?: boolean
  width?: number
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "6 6" : undefined}
      initial={false}
      animate={{ pathLength: loop ? [0, 1, 1, 0] : 1, opacity: loop ? [0.15, 1, 1, 0.15] : 1 }}
      transition={loop ? { duration: 7.2, delay, times: [0, 0.64, 0.92, 1], repeat: Infinity, repeatDelay: 1, ease: demoEase } : { duration: 0 }}
    />
  )
}

function ChartTooltip({ title, value, className = "" }: { title: string; value: string; className?: string }) {
  return (
    <div className={"rounded-lg border border-black/10 bg-white/95 px-2.5 py-2 shadow-[0_12px_28px_-22px_rgba(32,21,21,0.5)] " + className}>
      <p className="text-[7px] uppercase tracking-[0.1em] text-faint">{title}</p>
      <p className="mt-0.5 text-[9px] font-medium text-ink">{value}</p>
    </div>
  )
}

const ICP_POINTS = [
  [58, 182, 330, 58, true], [84, 150, 354, 82, true], [112, 196, 376, 48, true],
  [136, 126, 312, 92, true], [164, 172, 390, 112, true], [188, 106, 342, 122, true],
  [72, 92, 212, 158, false], [102, 72, 178, 188, false], [130, 220, 236, 206, false],
  [154, 52, 252, 174, false], [184, 232, 274, 220, false], [214, 144, 290, 194, false],
  [242, 88, 286, 142, false], [266, 214, 302, 224, false], [292, 162, 318, 186, false],
  [316, 116, 362, 72, true], [338, 138, 382, 96, true], [362, 178, 398, 132, true],
] as const

function IcpTargetingChart({ play, reduce }: { play: boolean; reduce: boolean }) {
  const loop = play && !reduce
  return (
    <VisualizationFrame>
      <svg viewBox="0 0 420 250" className="h-full w-full" role="img" aria-label="Buying intent versus ICP fit scatter plot">
        <ChartGrid width={420} height={250} />
        <motion.rect x="302" y="24" width="104" height="100" rx="14" fill="rgba(255,79,0,0.055)" stroke="#FF4F00" strokeDasharray="5 5" animate={loop ? { opacity: [0, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: 7.2, times: [0, 0.2, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }} />
        <text x="354" y="40" textAnchor="middle" fontSize="8" fill="#FF4F00">TARGET ZONE</text>
        <text x="214" y="246" textAnchor="middle" fontSize="8" fill="rgba(32,21,21,0.48)">BUYING INTENT</text>
        <text x="9" y="132" textAnchor="middle" fontSize="8" fill="rgba(32,21,21,0.48)" transform="rotate(-90 9 132)">ICP FIT</text>
        {ICP_POINTS.map((point, index) => {
          const [x, y, tx, ty, qualified] = point
          return (
            <motion.circle
              key={index}
              r={qualified ? 4.5 : 3.5}
              fill={qualified ? "#FF4F00" : index % 2 ? "#7157A8" : "#2563EB"}
              animate={loop ? { cx: [x, x, tx], cy: [y, y, ty], opacity: qualified ? [0.25, 0.75, 1, 1, 0.25] : [0.25, 0.7, 0.12, 0, 0.25] } : { cx: qualified ? tx : x, cy: qualified ? ty : y, opacity: qualified ? 1 : 0.14 }}
              transition={loop ? { duration: 7.2, delay: index * 0.035, times: [0, 0.2, 0.72, 0.92, 1], repeat: Infinity, repeatDelay: 1, ease: demoEase } : { duration: 0 }}
            />
          )
        })}
      </svg>
      <motion.div className="absolute right-5 top-5 z-20" animate={loop ? { opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, -3] } : { opacity: 1, y: 0 }} transition={loop ? { duration: 7.2, times: [0, 0.55, 0.68, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>
        <ChartTooltip title="Northfield" value="Fit 94 · Intent high" />
      </motion.div>
    </VisualizationFrame>
  )
}

const RESEARCH_LINES = [
  { label: "Hiring", color: "#2563EB", d: "M22 180 C60 174 72 148 106 154 S150 120 182 128 S230 86 264 104 S310 52 394 68" },
  { label: "Technology", color: "#7157A8", d: "M22 192 C70 186 84 166 124 170 S174 142 210 150 S258 110 296 122 S344 90 394 98" },
  { label: "Growth", color: "#0F766E", d: "M22 202 C60 190 92 196 126 178 S182 170 218 142 S264 154 304 112 S350 120 394 86" },
  { label: "News", color: "#D97706", d: "M22 212 C66 204 92 184 132 194 S184 154 226 176 S270 126 316 144 S360 106 394 118" },
  { label: "Intent", color: "#FF4F00", d: "M22 220 C70 216 98 200 138 202 S192 188 232 166 S284 140 320 96 S360 72 394 42" },
]

function DeepResearchChart({ play, reduce }: { play: boolean; reduce: boolean }) {
  const loop = play && !reduce
  return (
    <VisualizationFrame>
      <svg viewBox="0 0 420 250" className="h-full w-full" role="img" aria-label="Research signal intensity over time">
        <ChartGrid width={420} height={250} />
        {RESEARCH_LINES.map((line, index) => <AnimatedLine key={line.label} d={line.d} color={line.color} loop={loop} delay={index * 0.12} width={index === 4 ? 3 : 1.8} />)}
        <motion.line x1="320" x2="320" y1="30" y2="224" stroke="#FF4F00" strokeWidth="1.5" strokeDasharray="4 4" animate={loop ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: 7.2, times: [0, 0.54, 0.64, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }} />
        <motion.circle cx="320" cy="96" r="5" fill="#FF4F00" animate={loop ? { r: [3, 3, 7, 5, 3], opacity: [0, 0, 1, 1, 0] } : { r: 5, opacity: 1 }} transition={loop ? { duration: 7.2, times: [0, 0.54, 0.66, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }} />
        <motion.text x="244" y="118" fontSize="8" fill="#0F766E" animate={loop ? { opacity: [0, 0.25, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: 7.2, times: [0, 0.34, 0.5, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Growth</motion.text>
        <motion.text x="330" y="86" fontSize="8" fill="#FF4F00" animate={loop ? { opacity: [0, 0, 1, 1, 0], y: [4, 4, 0, 0, -2] } : { opacity: 1, y: 0 }} transition={loop ? { duration: 7.2, times: [0, 0.56, 0.68, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Buying Signal</motion.text>
      </svg>
      <motion.div className="absolute right-5 top-5" animate={loop ? { opacity: [0, 0, 1, 1, 0], y: [5, 5, 0, 0, -3] } : { opacity: 1, y: 0 }} transition={loop ? { duration: 7.2, times: [0, 0.56, 0.68, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>
        <ChartTooltip title="Buying trigger" value="CRM migration detected" />
      </motion.div>
    </VisualizationFrame>
  )
}

const MAP_NODES = [
  { role: "Champion", name: "Sales Director", x: 76, y: 64, color: "#0F766E" },
  { role: "Decision maker", name: "VP Revenue", x: 344, y: 62, color: "#FF4F00" },
  { role: "Influencer", name: "RevOps Lead", x: 62, y: 196, color: "#7157A8" },
  { role: "Technical", name: "IT Director", x: 344, y: 196, color: "#2563EB" },
  { role: "Finance", name: "CFO", x: 372, y: 128, color: "#D97706" },
]

function StakeholderMapChart({ play, reduce }: { play: boolean; reduce: boolean }) {
  const loop = play && !reduce
  return (
    <VisualizationFrame>
      <svg viewBox="0 0 420 250" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {MAP_NODES.map((node, index) => (
          <motion.path key={node.role} d={"M210 128 Q" + (210 + (node.x - 210) * 0.35) + " " + (node.y + 18) + " " + node.x + " " + node.y} fill="none" stroke={node.color} strokeOpacity={index < 2 ? 0.82 : 0.28} strokeWidth={index < 2 ? 2.5 : 1.2 + index * 0.22} animate={{ pathLength: loop ? [0, 1, 1, 0] : 1 }} transition={loop ? { duration: 7.2, delay: index * 0.13, times: [0, 0.58, 0.92, 1], repeat: Infinity, repeatDelay: 1, ease: demoEase } : { duration: 0 }} />
        ))}
        <AnimatedLine d="M76 64 Q210 18 344 62" color="#FF4F00" loop={loop} delay={0.7} dashed width={2.8} />
        <motion.circle r="4" fill="#FF4F00" animate={loop ? { cx: [76, 210, 344, 344, 76], cy: [64, 30, 62, 62, 64], opacity: [0, 1, 1, 0, 0] } : { cx: 344, cy: 62, opacity: 1 }} transition={loop ? { duration: 7.2, times: [0, 0.45, 0.72, 0.92, 1], repeat: Infinity, repeatDelay: 1, ease: "linear" } : { duration: 0 }} />
      </svg>
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-brand/20 bg-brand/5 px-3 py-2 text-center"><p className="text-[7px] uppercase tracking-[0.1em] text-brand">Account</p><p className="mt-0.5 text-[11px] font-medium text-ink">Northfield</p></div>
      {MAP_NODES.map((node, index) => (
        <motion.div key={node.role} className="absolute z-10 w-[90px] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white px-2 py-1.5 shadow-[0_10px_24px_-22px_rgba(32,21,21,0.48)]" style={{ left: (node.x / 420) * 100 + "%", top: (node.y / 250) * 100 + "%", borderColor: node.color + "33" }} animate={loop ? { opacity: [0, 1, 1, 0], scale: [0.86, 1, 1.03, 0.9] } : { opacity: 1, scale: 1 }} transition={loop ? { duration: 7.2, delay: index * 0.13, times: [0, 0.22, 0.84, 1], repeat: Infinity, repeatDelay: 1, ease: demoEase } : { duration: 0 }}><p className="truncate text-[7px] uppercase tracking-[0.08em]" style={{ color: node.color }}>{node.role}</p><p className="truncate text-[9px] font-medium text-ink">{node.name}</p></motion.div>
      ))}
      <motion.div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-brand/20 bg-white px-3 py-1 text-[8px] font-medium text-brand" animate={loop ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: 7.2, times: [0, 0.58, 0.7, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Best path: Champion -&gt; VP Revenue</motion.div>
    </VisualizationFrame>
  )
}

const ENGAGEMENT_LINES = [
  { label: "Email opens", color: "#2563EB", d: "M22 196 C58 192 82 172 118 178 S166 142 202 150 S250 112 286 122 S342 80 396 92" },
  { label: "LinkedIn", color: "#7157A8", d: "M22 208 C74 204 88 186 130 192 S182 168 222 174 S276 146 316 154 S360 128 396 134" },
  { label: "Content", color: "#D97706", d: "M22 216 C84 212 106 198 146 202 S202 186 240 190 S288 166 326 170 S370 142 396 148" },
  { label: "Replies", color: "#FF4F00", d: "M22 224 C120 222 158 214 210 212 S280 194 320 174 S366 126 396 116" },
]

function SequenceTimelineChart({ play, reduce }: { play: boolean; reduce: boolean }) {
  const loop = play && !reduce
  return (
    <VisualizationFrame>
      <div className="flex h-full flex-col">
        <div className="relative min-h-0 flex-1">
          <svg viewBox="0 0 420 240" className="h-full w-full" role="img" aria-label="Multi-channel engagement rising over time">
            <ChartGrid width={420} height={240} />
            {ENGAGEMENT_LINES.map((line, index) => <AnimatedLine key={line.label} d={line.d} color={line.color} loop={loop} delay={index * 0.14} width={index === 3 ? 3 : 2} />)}
            {[82, 146, 210, 276, 326, 396].map((x, index) => (
              <motion.g key={x} animate={loop ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: 7.8, delay: index * 0.22, times: [0, 0.35, 0.55, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>
                <line x1={x} x2={x} y1="34" y2="222" stroke="rgba(255,79,0,0.16)" strokeDasharray="3 4" />
                <circle cx={x} cy={index === 5 ? 116 : 178 - index * 10} r="4" fill={index === 5 ? "#FF4F00" : "#FAF8F6"} stroke="#FF4F00" />
              </motion.g>
            ))}
            <motion.text x="168" y="144" fontSize="8" fill="#7157A8" animate={loop ? { opacity: [0, 0.2, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: 7.8, times: [0, 0.3, 0.46, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Active</motion.text>
            <motion.text x="356" y="108" fontSize="8" fill="#FF4F00" animate={loop ? { opacity: [0, 0, 1, 1, 0], y: [3, 3, 0, 0, -2] } : { opacity: 1, y: 0 }} transition={loop ? { duration: 7.8, times: [0, 0.62, 0.76, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Reply</motion.text>
          </svg>
          <motion.div className="absolute right-4 top-4" animate={loop ? { opacity: [0, 0, 1, 1, 0], scale: [0.95, 0.95, 1, 1, 0.95] } : { opacity: 1, scale: 1 }} transition={loop ? { duration: 7.8, times: [0, 0.68, 0.78, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}><ChartTooltip title="Outcome" value="Meeting booked" /></motion.div>
        </div>
        <div className="relative h-[82px] shrink-0 border-t border-black/5 pt-5">
          <div className="absolute left-[5%] right-[5%] top-[29px] h-px bg-black/10" />
          <motion.div className="absolute left-[5%] top-7 h-0.5 w-[90%] origin-left bg-brand" animate={{ scaleX: loop ? [0, 1, 1, 0] : 1 }} transition={loop ? { duration: 7.8, times: [0, 0.82, 0.94, 1], repeat: Infinity, repeatDelay: 1, ease: "linear" } : { duration: 0 }} />
          <div className="relative grid grid-cols-6">
            {["Email", "LinkedIn", "Follow-up", "Case study", "Insight", "Meeting"].map((label, index) => <motion.div key={label} className="text-center" animate={loop ? { opacity: [0.3, 1, 1, 0.3] } : { opacity: 1 }} transition={loop ? { duration: 7.8, delay: index * 0.28, times: [0, 0.35, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}><span className="mx-auto block h-3 w-3 rounded-full border-2 border-brand bg-white" /><p className="mt-3 truncate text-[7px] text-muted">{label}</p></motion.div>)}
          </div>
        </div>
      </div>
    </VisualizationFrame>
  )
}

function AnalyticsDashboardChart({ play, reduce }: { play: boolean; reduce: boolean }) {
  const loop = play && !reduce
  const current = "M18 142 C58 134 78 110 112 118 S166 84 198 94 S250 58 286 72 S340 32 386 42"
  const previous = "M18 156 C62 148 86 132 122 138 S174 112 210 120 S262 92 302 104 S348 76 386 84"
  return (
    <VisualizationFrame>
      <svg viewBox="0 0 404 180" className="h-full w-full" role="img" aria-label="Meeting rate current and previous period">
        <defs><linearGradient id="analyticsAreaPro" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF4F00" stopOpacity="0.22" /><stop offset="100%" stopColor="#FF4F00" stopOpacity="0" /></linearGradient></defs>
        <ChartGrid width={404} height={180} />
        <motion.path d={current + " L386 172 L18 172 Z"} fill="url(#analyticsAreaPro)" animate={{ opacity: loop ? [0, 1, 1, 0] : 1 }} transition={loop ? { duration: 7.2, times: [0, 0.66, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }} />
        <AnimatedLine d={previous} color="rgba(113,87,168,0.55)" loop={loop} dashed width={1.8} />
        <AnimatedLine d={current} color="#FF4F00" loop={loop} delay={0.12} width={3} />
        {[[112,118],[198,94],[286,72],[386,42]].map(([x,y], index) => <motion.circle key={x} cx={x} cy={y} r="4" fill="#FF4F00" stroke="white" strokeWidth="2" animate={loop ? { opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] } : { opacity: 1, scale: 1 }} transition={loop ? { duration: 7.2, delay: index * 0.11, times: [0, 0.55, 0.68, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }} />)}
        <motion.text x="202" y="84" fontSize="8" fill="#FF4F00" animate={loop ? { opacity: [0, 0.2, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: 7.2, times: [0, 0.34, 0.48, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Growth</motion.text>
        <motion.text x="338" y="36" fontSize="8" fill="#0F766E" animate={loop ? { opacity: [0, 0, 1, 1, 0], y: [3, 3, 0, 0, -2] } : { opacity: 1, y: 0 }} transition={loop ? { duration: 7.2, times: [0, 0.58, 0.7, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Top Account</motion.text>
      </svg>
    </VisualizationFrame>
  )
}

function FeatureVisualization({ featureId, play, reduce }: { featureId: Feature["id"]; play: boolean; reduce: boolean }) {
  if (featureId === "icp") return <IcpTargetingChart play={play} reduce={reduce} />
  if (featureId === "research") return <DeepResearchChart play={play} reduce={reduce} />
  if (featureId === "stakeholders") return <StakeholderMapChart play={play} reduce={reduce} />
  if (featureId === "sequences") return <SequenceTimelineChart play={play} reduce={reduce} />
  return <AnalyticsDashboardChart play={play} reduce={reduce} />
}

function FeatureVisual({ feature, reduce }: { feature: Feature; reduce: boolean }) {
  const visualRef = useRef<HTMLDivElement>(null)
  const inView = useInView(visualRef, { margin: "0px 0px -12% 0px" })
  return (
    <div ref={visualRef}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={feature.id} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reduce ? 0 : 0.32, ease }}>
          <FeatureVisualization featureId={feature.id} play={inView} reduce={reduce} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function AutoplayProgress({ paused }: { paused: boolean }) {
  const controls = useAnimationControls()

  useEffect(() => {
    if (paused) {
      controls.stop()
      return
    }

    controls.set({ scaleX: 0 })
    void controls.start({
      scaleX: 1,
      transition: { duration: FEATURE_AUTOPLAY_SECONDS, ease: "linear" },
    })

    return () => controls.stop()
  }, [controls, paused])

  return (
    <motion.span
      aria-hidden="true"
      className="absolute inset-0 origin-left rounded-full bg-brand"
      initial={{ scaleX: 0 }}
      animate={controls}
    />
  )
}

function FeatureTab({
  feature,
  index,
  active,
  onSelect,
  reduce,
  autoplayPaused,
  autoplayCycle,
  registerTabRef,
}: {
  feature: Feature
  index: number
  active: boolean
  onSelect: (index: number) => void
  reduce: boolean
  autoplayPaused: boolean
  autoplayCycle: number
  registerTabRef: (index: number, node: HTMLButtonElement | null) => void
}) {
  return (
    <motion.button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`feature-panel-${feature.id}`}
      id={`feature-tab-${feature.id}`}
      tabIndex={active ? 0 : -1}
      onClick={() => onSelect(index)}
      ref={(node) => {
        registerTabRef(index, node)
      }}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      className="group relative flex h-[140px] w-full flex-col justify-between overflow-hidden rounded-2xl border px-4 py-4 text-left transition-[transform,box-shadow,border-color,background-color] duration-200"
      animate={
        active
          ? {
              borderColor: "rgba(255,79,0,0.26)",
              boxShadow: "0 18px 36px -28px rgba(32,21,21,0.42)",
            }
          : {
              borderColor: "rgba(32,21,21,0.10)",
              boxShadow: "0 10px 22px -24px rgba(32,21,21,0.26)",
            }
      }
      style={{ backgroundColor: active ? "#1E1A4D" : "#FAF8F6" }}
    >
      {active ? (
        <motion.span
          layoutId="features-active-tab"
          className="absolute inset-0 rounded-2xl border border-brand/15 bg-[#1E1A4D]"
          transition={{ duration: reduce ? 0 : 0.42, ease }}
        />
      ) : null}

      <span className="relative z-10 flex h-full min-w-0 flex-col items-start justify-center gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-brand shadow-[0_10px_22px_-20px_rgba(32,21,21,0.42)] ${
            active ? "border-white/10 bg-white/10" : "border-black/10 bg-white"
          }`}
        >
          <feature.Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span
          className={`block text-[14px] font-medium leading-[1.35] ${active ? "text-[#FAF8F6]" : "text-ink"}`}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {feature.title}
        </span>
      </span>

      <motion.span
        aria-hidden="true"
        className={`absolute inset-x-4 bottom-0 h-0.5 overflow-hidden rounded-full ${active ? "bg-brand/20" : "bg-transparent"}`}
        layoutId="features-active-underline"
        transition={{ duration: reduce ? 0 : 0.32, ease }}
      >
        {active ? (
          reduce ? (
            <span className="absolute inset-0 bg-brand" />
          ) : (
            <AutoplayProgress key={autoplayCycle} paused={autoplayPaused} />
          )
        ) : null}
      </motion.span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-2xl border transition-opacity duration-200 ${
          active ? "border-white/5 opacity-100" : "border-black/5 opacity-0 group-hover:opacity-100"
        }`}
      />
    </motion.button>
  )
}

function FeatureDetails({ feature, reduce }: { feature: Feature; reduce: boolean }) {
  return (
    <motion.div
      key={feature.id}
      role="tabpanel"
      id={`feature-panel-${feature.id}`}
      aria-labelledby={`feature-tab-${feature.id}`}
      className="grid gap-8 lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:gap-9"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex h-full flex-col justify-center py-4 lg:min-h-[560px] lg:py-8" variants={detailVariants}>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/15 bg-brand/5 text-brand">
          <feature.Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div className="mt-8 space-y-6">
          <h3 className="max-w-[15ch] text-[32px] font-medium leading-[1.06] tracking-[-0.03em] text-heading sm:text-[38px] lg:text-[42px]">
            {feature.title}
          </h3>
          <p className="max-w-[36rem] text-[16px] leading-[1.78] text-muted sm:text-[17px]">{feature.desc}</p>
        </div>

        <motion.div
          className="mt-12 rounded-[24px] border border-black/10 bg-white px-5 py-5 shadow-[0_14px_32px_-30px_rgba(32,21,21,0.45)]"
          variants={detailVariants}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.34, delay: 0.18, ease }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-faint">Outcome</p>
              <p className="mt-2 text-[22px] font-medium tracking-[-0.02em] text-ink">{feature.metric} {feature.metricLabel}</p>
            </div>
            <div className="inline-flex rounded-full border border-brand/15 bg-brand/5 px-3 py-1.5 text-[12px] font-medium text-brand">
              Quality-first motion
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="lg:pt-1"
        variants={detailVariants}
        initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.48, delay: 0.08, ease }}
      >
        <FeatureVisual feature={feature} reduce={reduce} />
      </motion.div>
    </motion.div>
  )
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const tabListRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const entered = useInView(sectionRef, { once: true, amount: 0.18 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  const [autoplayCycle, setAutoplayCycle] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeFeature = FEATURES[activeIndex]

  const registerTabRef = (index: number, node: HTMLButtonElement | null) => {
    tabRefs.current[index] = node
  }

  const handleSelect = (nextIndex: number, options?: { focusTab?: boolean }) => {
    setActiveIndex(nextIndex)
    setAutoplayCycle((cycle) => cycle + 1)

    if (options?.focusTab) {
      tabRefs.current[nextIndex]?.focus({ preventScroll: true })
    }
  }

  const handleAutoplayResume = () => {
    setAutoplayPaused(false)
    setAutoplayCycle((cycle) => cycle + 1)
  }

  useEffect(() => {
    if (reduce || autoplayPaused || !entered) return

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % FEATURES.length)
      setAutoplayCycle((cycle) => cycle + 1)
    }, FEATURE_AUTOPLAY_MS)

    return () => window.clearTimeout(timer)
  }, [autoplayCycle, autoplayPaused, entered, reduce])

  useEffect(() => {
    const tabList = tabListRef.current
    const activeTab = tabRefs.current[activeIndex]

    if (!tabList || !activeTab) return

    const tabLeft = activeTab.offsetLeft
    const tabRight = tabLeft + activeTab.offsetWidth
    const visibleLeft = tabList.scrollLeft
    const visibleRight = visibleLeft + tabList.clientWidth

    if (tabLeft >= visibleLeft && tabRight <= visibleRight) return

    const nextLeft = tabLeft - (tabList.clientWidth - activeTab.offsetWidth) / 2
    tabList.scrollTo({
      left: Math.max(0, nextLeft),
      behavior: reduce ? "auto" : "smooth",
    })
  }, [activeIndex, reduce])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const lastIndex = FEATURES.length - 1
    let nextIndex = activeIndex

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1
        break
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = lastIndex
        break
      default:
        return
    }

    event.preventDefault()
    handleSelect(nextIndex, { focusTab: true })
  }

  return (
    <section ref={sectionRef} id="features" className="relative w-full overflow-hidden border-b border-black/10 bg-canvas text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,79,0,0.04),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,79,0,0.03),transparent_28%)]"
      />

      <div className="site-container relative py-20 sm:py-24">
        <motion.div initial={reduce ? false : "hidden"} animate={entered ? "visible" : "hidden"} variants={listVariants} className="max-w-2xl">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            What we automate
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-[32px] font-medium leading-[1.05] tracking-[-0.02em] text-heading sm:text-[40px] lg:text-[44px]">
            What Oraami automates
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            From ICP definition to trust-building sequences, the full quality-first BDR motion is handled end to end.
          </motion.p>
        </motion.div>

        <motion.div
          role="tablist"
          aria-label="Oraami features"
          initial={false}
          animate={entered ? "visible" : "hidden"}
          variants={listVariants}
          className="relative mt-12 rounded-[28px] border border-black/10 bg-[#FAF8F6] p-3 shadow-[0_20px_55px_-40px_rgba(32,21,21,0.45)]"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setAutoplayPaused(true)}
          onMouseLeave={handleAutoplayResume}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 rounded-l-[28px] bg-gradient-to-r from-[#FAF8F6] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 rounded-r-[28px] bg-gradient-to-l from-[#FAF8F6] to-transparent"
          />
          <div ref={tabListRef} className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-2 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
            {FEATURES.map((feature, index) => (
              <motion.div key={feature.id} variants={fadeUp} className="shrink-0 w-[220px] lg:flex-1 lg:w-auto lg:min-w-0">
                <FeatureTab
                  feature={feature}
                  index={index}
                  active={index === activeIndex}
                  onSelect={handleSelect}
                  reduce={reduce}
                  autoplayPaused={autoplayPaused || !entered}
                  autoplayCycle={autoplayCycle}
                  registerTabRef={registerTabRef}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 rounded-[32px] border border-black/10 bg-[#FAF8F6] p-4 shadow-[0_22px_60px_-42px_rgba(32,21,21,0.55)] sm:p-5 lg:p-6"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={entered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduce ? 0 : 0.55, ease }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <FeatureDetails key={activeFeature.id} feature={activeFeature} reduce={reduce} />
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={entered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reduce ? 0 : 0.48, delay: 0.18, ease }}
          className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <p className="text-[15px] leading-relaxed text-muted">
            Multi-tenant security and more, built into the same quality-first motion.
          </p>
          <Button href="#platform" variant="secondary" icon={ArrowRight} className="shrink-0">
            Explore all features
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
