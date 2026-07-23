"use client"

import { useRef, type ReactNode } from "react"
import { ArrowRight, Briefcase, Building2, Landmark, LineChart, Monitor, Server } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  motion,
  type MotionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion"

import { Button } from "@/components/ui/button"

type Feature = { title: string; description: string }
type Industry = { name: string; Icon: LucideIcon; description: string; items: Feature[] }

const INDUSTRIES: Industry[] = [
  {
    name: "SaaS",
    Icon: Monitor,
    description:
      "Help SaaS teams identify the right accounts faster, sharpen outreach around product fit, and move qualified pipeline with stronger buying signals.",
    items: [
      { title: "ICP definition", description: "Define the ideal customer profile using firmographic and behavioral signals." },
      { title: "Lead scoring", description: "Prioritize high-intent accounts with clearer qualification and routing." },
      { title: "Trust sequences", description: "Send paced, relevant outreach that supports long sales cycles." },
      { title: "Meeting booking", description: "Convert qualified interest into booked conversations with less friction." },
    ],
  },
  {
    name: "Agencies",
    Icon: LineChart,
    description:
      "Give agency teams a clearer prospecting workspace that connects research, proof, warm introductions, and active proposals in one motion.",
    items: [
      { title: "Prospect research", description: "Discover the right opportunities and pain points before outreach starts." },
      { title: "Case-study matching", description: "Match case studies to prospect context to build immediate proof." },
      { title: "Warm intros", description: "Leverage network paths and relationships to open more doors." },
      { title: "Pipeline reporting", description: "Track outreach, meetings, and pipeline in one clear view." },
    ],
  },
  {
    name: "Consulting",
    Icon: Briefcase,
    description:
      "Map complex buying groups, time outreach around initiatives, and keep multi-stakeholder follow-up moving with a more deliberate consulting motion.",
    items: [
      { title: "Account mapping", description: "Map key accounts and identify relevant stakeholders with context." },
      { title: "Stakeholder outreach", description: "Personalize outreach to engage the right people at the right time." },
      { title: "Nurture sequences", description: "Keep conversations warm with thoughtful follow-up and timing." },
      { title: "Follow-ups", description: "Move stalled opportunities forward with timely, relevant touchpoints." },
    ],
  },
  {
    name: "IT Services",
    Icon: Server,
    description:
      "Reach IT decision-makers with technical context, infrastructure pain-point detection, and qualification that reflects real delivery constraints.",
    items: [
      { title: "Lead qualification", description: "Qualify leads based on tech stack, initiative, and budget fit." },
      { title: "Deep research", description: "Uncover technical needs, pain points, and current constraints." },
      { title: "Personalised email", description: "Reference technical details that make the outreach feel informed." },
      { title: "Enrichment", description: "Enrich leads with verified data and useful technology insights." },
    ],
  },
  {
    name: "Financial Services",
    Icon: Landmark,
    description:
      "Support regulated sales cycles with profile research, compliance-aware outreach, risk review, and cleaner handoffs between teams.",
    items: [
      { title: "Account research", description: "Research financial context, stack, and business triggers." },
      { title: "Compliant outreach", description: "Reach out with messages aligned to industry expectations." },
      { title: "Sequenced touches", description: "Use coordinated follow-up to maintain momentum without pressure." },
      { title: "Clean handoffs", description: "Move sales conversations forward with clear, structured context." },
    ],
  },
  {
    name: "Healthcare",
    Icon: Building2,
    description:
      "Coordinate outreach to healthcare organizations with the right decision-makers, compliance context, and patient-safe communication workflows.",
    items: [
      { title: "Org research", description: "Research care delivery models, service lines, and strategic priorities." },
      { title: "Decision mapping", description: "Identify administrators, department leads, and buying stakeholders." },
      { title: "Compliant messaging", description: "Keep communication structured for regulated healthcare environments." },
      { title: "Meeting follow-up", description: "Move from first contact to scheduled conversation with clear next steps." },
    ],
  },
]

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index < 3 ? index * 0.09 : 0.15 + (index - 3) * 0.09,
      ease,
    },
  }),
}

function IndustryIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-oraami-accent-secondary/12 bg-oraami-accent-secondary/[0.04] shadow-[0_18px_40px_-28px_rgba(255,79,0,0.24)] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out group-hover:scale-[1.02] group-hover:border-brand/25 group-hover:bg-brand/[0.06] group-hover:shadow-[0_24px_48px_-30px_rgba(255,79,0,0.28)]">
      <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-brand" />
      <Icon className="relative h-6 w-6 text-brand" strokeWidth={1.5} aria-hidden="true" />
    </div>
  )
}

function VizShell({ children, reduceMotion }: { children: ReactNode; reduceMotion: boolean }) {
  return (
    <div className="relative min-h-[224px] overflow-hidden rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,79,0,0.14),transparent_24%),radial-gradient(circle_at_80%_12%,rgba(113,87,168,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_50px_-38px_rgba(8,8,27,0.9)] sm:min-h-[236px] sm:p-4">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-5 h-24 w-24 rounded-full bg-brand/18 blur-3xl"
        animate={reduceMotion ? { opacity: 0.28 } : { opacity: [0.18, 0.34, 0.18], scale: [0.94, 1.06, 0.94] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex h-full items-center justify-center rounded-[18px] border border-white/8 bg-oraami-accent-secondary/92 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5">
        {children}
      </div>
    </div>
  )
}

function AnimatedConnector({ d, reduceMotion, color = "rgba(255,255,255,0.28)", width = 2, dash = "6 8" }: { d: string; reduceMotion: boolean; color?: string; width?: number; dash?: string }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dash}
      animate={reduceMotion ? { pathLength: 1, opacity: 0.7 } : { pathLength: [0.08, 1, 1], opacity: [0.18, 0.92, 0.18] }}
      transition={reduceMotion ? { duration: 0 } : { duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

function MovingPulse({ reduceMotion, values, duration = 6, fill = "var(--color-oraami-accent-1)", radius = 6 }: { reduceMotion: boolean; values: { cx: number[]; cy: number[] }; duration?: number; fill?: string; radius?: number }) {
  return (
    <motion.circle
      r={radius}
      fill={fill}
      animate={reduceMotion ? { cx: values.cx.at(-1), cy: values.cy.at(-1), opacity: 1 } : { cx: values.cx, cy: values.cy, opacity: [0, 1, 1, 0.15] }}
      transition={reduceMotion ? { duration: 0 } : { duration, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

function PulseNode({ x, y, reduceMotion, active = false, size = 14 }: { x: number; y: number; reduceMotion: boolean; active?: boolean; size?: number }) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r={size}
        fill={active ? "rgba(255,79,0,0.14)" : "rgba(255,255,255,0.06)"}
        stroke={active ? "rgba(255,79,0,0.44)" : "rgba(255,255,255,0.18)"}
        animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: active ? [0.95, 1.08, 0.95] : [1, 1.05, 1], opacity: active ? [0.66, 1, 0.66] : [0.42, 0.82, 0.42] }}
        transition={reduceMotion ? { duration: 0 } : { duration: active ? 4.8 : 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx={x} cy={y} r={active ? 4.5 : 3.5} fill={active ? "rgba(255,79,0,0.96)" : "rgba(255,255,255,0.72)"} />
    </g>
  )
}

function GlassPanel({ x, y, width, height, accent = false, children }: { x: number; y: number; width: number; height: number; accent?: boolean; children?: ReactNode }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={16}
        fill={accent ? "rgba(255,79,0,0.08)" : "rgba(255,255,255,0.04)"}
        stroke={accent ? "rgba(255,79,0,0.26)" : "rgba(255,255,255,0.14)"}
      />
      {children}
    </g>
  )
}

function IndustryVisualization({ industry, reduceMotion }: { industry: Industry; reduceMotion: boolean }) {
  if (industry.name === "SaaS") return <SaaSVisualization reduceMotion={reduceMotion} />
  if (industry.name === "Agencies") return <AgenciesVisualization reduceMotion={reduceMotion} />
  if (industry.name === "Consulting") return <ConsultingVisualization reduceMotion={reduceMotion} />
  if (industry.name === "IT Services") return <ITServicesVisualization reduceMotion={reduceMotion} />
  if (industry.name === "Financial Services") return <FinancialServicesVisualization reduceMotion={reduceMotion} />
  return <HealthcareVisualization reduceMotion={reduceMotion} />
}

function SaaSVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <GlassPanel x={46} y={34} width={132} height={56}>
          <motion.rect x="62" y="52" width="58" height="8" rx="4" fill="rgba(255,255,255,0.16)" animate={reduceMotion ? { width: 58 } : { width: [36, 58, 44, 58] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="62" y="68" width="94" height="6" rx="3" fill="rgba(255,255,255,0.1)" animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <GlassPanel x={242} y={34} width={132} height={56}>
          <motion.rect x="258" y="50" width="90" height="10" rx="5" fill="rgba(255,79,0,0.22)" animate={reduceMotion ? { scaleX: 1 } : { scaleX: [0.48, 1, 0.7, 1] }} style={{ originX: 0 }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.circle cx="336" cy="69" r="10" fill="rgba(255,255,255,0.08)" animate={reduceMotion ? { r: 10 } : { r: [7, 10, 8, 10] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <GlassPanel x={106} y={112} width={208} height={42} accent>
          <motion.rect x="126" y="126" width="40" height="8" rx="4" fill="rgba(255,255,255,0.16)" animate={reduceMotion ? { x: 126 } : { x: [126, 140, 126] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="182" y="126" width="56" height="8" rx="4" fill="rgba(255,79,0,0.84)" animate={reduceMotion ? { width: 56 } : { width: [28, 56, 42, 56] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="254" y="126" width="34" height="8" rx="4" fill="rgba(255,255,255,0.16)" animate={reduceMotion ? { x: 254 } : { x: [254, 240, 254] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <AnimatedConnector d="M178 62 C212 62 212 62 242 62" reduceMotion={reduceMotion} color="rgba(255,255,255,0.34)" width={2.2} dash="4 7" />
        <AnimatedConnector d="M112 90 C134 112 158 124 200 132" reduceMotion={reduceMotion} color="rgba(255,79,0,0.66)" width={2.3} dash="5 6" />
        <AnimatedConnector d="M308 90 C286 112 262 124 220 132" reduceMotion={reduceMotion} color="rgba(113,87,168,0.62)" width={2.3} dash="5 6" />
        <MovingPulse reduceMotion={reduceMotion} values={{ cx: [112, 178, 242, 308, 286, 220], cy: [62, 62, 62, 62, 104, 132] }} duration={6.4} />
      </svg>
    </VizShell>
  )
}

function AgenciesVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <GlassPanel x={34} y={44} width={72} height={96}>
          <motion.rect x="50" y="60" width="40" height="8" rx="4" fill="rgba(255,255,255,0.16)" animate={reduceMotion ? { y: 60 } : { y: [60, 72, 60] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="50" y="84" width="40" height="8" rx="4" fill="rgba(255,79,0,0.74)" animate={reduceMotion ? { width: 40 } : { width: [18, 40, 28, 40] }} transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="50" y="108" width="40" height="8" rx="4" fill="rgba(255,255,255,0.16)" animate={reduceMotion ? { y: 108 } : { y: [108, 96, 108] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <GlassPanel x={174} y={30} width={72} height={120} accent>
          <motion.rect x="190" y="48" width="40" height="10" rx="5" fill="rgba(255,79,0,0.82)" animate={reduceMotion ? { y: 48 } : { y: [48, 72, 96, 48] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="190" y="72" width="40" height="10" rx="5" fill="rgba(255,255,255,0.12)" animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.25, 0.8, 0.25] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="190" y="96" width="40" height="10" rx="5" fill="rgba(255,255,255,0.12)" animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.7, 0.25, 0.7] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <GlassPanel x={314} y={54} width={72} height={86}>
          <motion.circle cx="350" cy="84" r="15" fill="rgba(255,255,255,0.08)" animate={reduceMotion ? { scale: 1 } : { scale: [0.92, 1.08, 0.92] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path d="M334 110 C346 120 360 120 370 106" fill="none" stroke="rgba(255,79,0,0.78)" strokeWidth="3" strokeLinecap="round" animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.2, 1, 1] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <AnimatedConnector d="M106 92 C130 92 146 92 174 92" reduceMotion={reduceMotion} color="rgba(255,255,255,0.3)" width={2.1} dash="4 8" />
        <AnimatedConnector d="M246 92 C272 92 288 92 314 92" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.3} dash="4 7" />
        <MovingPulse reduceMotion={reduceMotion} values={{ cx: [106, 174, 246, 314, 350], cy: [92, 92, 92, 92, 92] }} duration={6.1} />
      </svg>
    </VizShell>
  )
}

function ConsultingVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <motion.circle cx="210" cy="90" r="42" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" animate={reduceMotion ? { scale: 1 } : { scale: [0.96, 1.04, 0.96] }} transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }} />
        <motion.circle cx="210" cy="90" r="26" fill="rgba(255,79,0,0.12)" stroke="rgba(255,79,0,0.34)" animate={reduceMotion ? { scale: 1 } : { scale: [0.92, 1.08, 0.92] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }} />
        <PulseNode x={210} y={90} active reduceMotion={reduceMotion} size={16} />
        <PulseNode x={90} y={48} reduceMotion={reduceMotion} />
        <PulseNode x={330} y={44} reduceMotion={reduceMotion} active />
        <PulseNode x={78} y={140} reduceMotion={reduceMotion} />
        <PulseNode x={332} y={138} reduceMotion={reduceMotion} />
        <AnimatedConnector d="M210 90 C182 80 138 62 90 48" reduceMotion={reduceMotion} color="rgba(113,87,168,0.62)" width={2.2} dash="4 7" />
        <AnimatedConnector d="M210 90 C242 78 286 58 330 44" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.4} dash="4 7" />
        <AnimatedConnector d="M210 90 C174 110 130 126 78 140" reduceMotion={reduceMotion} color="rgba(15,118,110,0.58)" width={2.1} dash="4 8" />
        <AnimatedConnector d="M210 90 C246 108 286 124 332 138" reduceMotion={reduceMotion} color="rgba(59,130,246,0.56)" width={2.1} dash="4 8" />
        <motion.circle
          cx="210"
          cy="90"
          r="72"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeDasharray="2 10"
          animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
          style={{ originX: "210px", originY: "90px" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <MovingPulse reduceMotion={reduceMotion} values={{ cx: [210, 330, 210, 78, 210], cy: [90, 44, 90, 140, 90] }} duration={7} />
      </svg>
    </VizShell>
  )
}

function ITServicesVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <GlassPanel x={44} y={92} width={84} height={56}>
          <motion.rect x="62" y="108" width="48" height="6" rx="3" fill="rgba(255,255,255,0.16)" animate={reduceMotion ? { opacity: 0.8 } : { opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="62" y="122" width="48" height="6" rx="3" fill="rgba(255,255,255,0.12)" animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.7, 0.25, 0.7] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <GlassPanel x={292} y={92} width={84} height={56}>
          <motion.rect x="310" y="108" width="48" height="6" rx="3" fill="rgba(255,255,255,0.16)" animate={reduceMotion ? { opacity: 0.8 } : { opacity: [0.35, 0.9, 0.35] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="310" y="122" width="48" height="6" rx="3" fill="rgba(255,255,255,0.12)" animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.7, 0.2, 0.7] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <motion.path d="M142 74 C170 44 252 44 278 74" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        <motion.path d="M150 74 H270" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        <motion.path d="M320 52 l14 16 h-8 v18 h-12 V68 h-8 Z" fill="rgba(255,79,0,0.12)" stroke="rgba(255,79,0,0.3)" strokeWidth="2" animate={reduceMotion ? { scale: 1 } : { scale: [0.94, 1.06, 0.94] }} style={{ originX: '320px', originY: '52px' }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} />
        <AnimatedConnector d="M128 118 C168 118 176 118 210 84" reduceMotion={reduceMotion} color="rgba(255,255,255,0.28)" width={2.2} dash="4 7" />
        <AnimatedConnector d="M210 84 C246 118 258 118 292 118" reduceMotion={reduceMotion} color="rgba(113,87,168,0.56)" width={2.2} dash="4 7" />
        <AnimatedConnector d="M210 84 C252 84 286 74 320 68" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.4} dash="4 7" />
        <MovingPulse reduceMotion={reduceMotion} values={{ cx: [86, 210, 334, 210, 334], cy: [118, 84, 68, 84, 118] }} duration={6.6} />
      </svg>
    </VizShell>
  )
}

function FinancialServicesVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <GlassPanel x={42} y={62} width={82} height={58}>
          <motion.rect x="58" y="80" width="50" height="8" rx="4" fill="rgba(255,255,255,0.16)" animate={reduceMotion ? { x: 58 } : { x: [58, 64, 58] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <GlassPanel x={168} y={44} width={92} height={94} accent>
          <motion.path d="M190 112 L208 92 L224 104 L240 74" fill="none" stroke="rgba(255,79,0,0.86)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.2, 1, 1] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="188" y="64" width="52" height="8" rx="4" fill="rgba(255,255,255,0.16)" animate={reduceMotion ? { width: 52 } : { width: [24, 52, 40, 52] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <GlassPanel x={296} y={62} width={82} height={58}>
          <motion.path d="M320 88 l10 10 18-22" fill="none" stroke="rgba(255,255,255,0.82)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.2, 1, 1] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <motion.path d="M308 32 l16 18 h-10 v20 h-12 V50 h-10 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="2" animate={reduceMotion ? { y: 0 } : { y: [0, -4, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }} />
        <AnimatedConnector d="M124 92 C144 92 150 92 168 92" reduceMotion={reduceMotion} color="rgba(255,255,255,0.3)" width={2.1} dash="4 7" />
        <AnimatedConnector d="M260 92 C278 92 282 92 296 92" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.4} dash="4 7" />
        <MovingPulse reduceMotion={reduceMotion} values={{ cx: [84, 214, 336], cy: [92, 92, 92] }} duration={5.8} />
      </svg>
    </VizShell>
  )
}

function HealthcareVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <GlassPanel x={40} y={58} width={92} height={72}>
          <motion.rect x="58" y="76" width="56" height="8" rx="4" fill="rgba(255,255,255,0.16)" animate={reduceMotion ? { width: 56 } : { width: [24, 56, 40, 56] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="58" y="94" width="42" height="6" rx="3" fill="rgba(255,255,255,0.12)" animate={reduceMotion ? { opacity: 0.8 } : { opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <GlassPanel x={164} y={40} width={100} height={104} accent>
          <motion.path d="M214 62 v58 M185 91 h58" fill="none" stroke="rgba(255,79,0,0.78)" strokeWidth="5" strokeLinecap="round" animate={reduceMotion ? { scale: 1 } : { scale: [0.92, 1.04, 0.92] }} style={{ originX: '214px', originY: '91px' }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
          <motion.circle cx="214" cy="91" r="30" fill="none" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 8" animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }} style={{ originX: '214px', originY: '91px' }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} />
        </GlassPanel>
        <GlassPanel x={296} y={72} width={84} height={52}>
          <motion.circle cx="322" cy="98" r="4" fill="rgba(255,79,0,0.9)" animate={reduceMotion ? { cx: 322 } : { cx: [322, 354, 322] }} transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }} />
          <motion.rect x="314" y="108" width="48" height="6" rx="3" fill="rgba(255,255,255,0.14)" animate={reduceMotion ? { opacity: 0.8 } : { opacity: [0.25, 0.8, 0.25] }} transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }} />
        </GlassPanel>
        <AnimatedConnector d="M132 94 C148 94 154 92 164 92" reduceMotion={reduceMotion} color="rgba(255,255,255,0.32)" width={2.1} dash="4 7" />
        <AnimatedConnector d="M264 92 C278 92 284 96 296 98" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.3} dash="4 7" />
        <MovingPulse reduceMotion={reduceMotion} values={{ cx: [132, 214, 296, 338], cy: [94, 92, 98, 98] }} duration={6.2} />
      </svg>
    </VizShell>
  )
}

function IndustryCardBody({ industry, reduceMotion }: { industry: Industry; reduceMotion: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between gap-7 lg:flex-row lg:items-stretch lg:gap-8">
      <div className="flex min-w-0 flex-col justify-between lg:w-[34%]">
        <div className="flex items-start gap-4">
          <IndustryIcon Icon={industry.Icon} />
          <div className="min-w-0 pt-0.5">
            <div className="h-1 w-8 rounded-full bg-brand/80" aria-hidden="true" />
            <h3 className="mt-3 text-[18px] font-semibold uppercase leading-snug tracking-[0.08em] text-heading sm:text-[20px]">
              {industry.name}
            </h3>
          </div>
        </div>

        <div className="mt-6 hidden h-px w-14 bg-brand/14 lg:block" aria-hidden="true" />

        <p className="mt-5 max-w-sm text-[15px] leading-[1.7] text-muted sm:text-[15.5px] lg:mt-0">
          {industry.description}
        </p>
      </div>

      <div className="h-px w-full bg-black/10 lg:h-auto lg:w-px lg:self-stretch" aria-hidden="true" />

      <div className="flex-1 lg:min-h-[224px]">
        <IndustryVisualization industry={industry} reduceMotion={reduceMotion} />
      </div>
    </div>
  )
}

function StackCard({
  index,
  total,
  stackProgress,
  children,
}: {
  index: number
  total: number
  stackProgress: MotionValue<number>
  children: ReactNode
}) {
  const reduceMotion = useReducedMotion() ?? false
  const isLast = index === total - 1
  const transitionStart = (index + 0.08) / total
  const transitionEnd = (index + 1) / total
  const springConfig = { stiffness: 180, damping: 28, mass: 0.6 }
  const scale = useSpring(useTransform(stackProgress, [transitionStart, transitionEnd], [1, 0.9]), springConfig)
  const coverOpacity = useSpring(useTransform(stackProgress, [transitionStart, transitionEnd], [0, 1]), springConfig)
  const filter = useTransform(
    stackProgress,
    [transitionStart, transitionEnd],
    ["brightness(1) blur(0px)", "brightness(0.84) blur(0.8px)"]
  )
  return (
    <motion.div
      className="sticky top-[96px] sm:top-[104px] lg:top-[112px] will-change-transform"
      style={
        reduceMotion || isLast
          ? { zIndex: index + 1, transformOrigin: "50% 0%" }
          : {
              zIndex: index + 1,
              scale,
              filter,
              transformOrigin: "50% 0%",
              willChange: "transform",
            }
      }
    >
      {children}
      {!isLast && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[22px] bg-canvas-soft"
          style={{ opacity: coverOpacity }}
        />
      )}
    </motion.div>
  )
}

function StaticIndustryCard({ industry }: { industry: Industry }) {
  const reduceMotion = useReducedMotion() ?? false

  return (
    <motion.div
      custom={0}
      initial="visible"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.27, ease }}
      className="group relative flex min-h-[240px] w-full flex-col overflow-hidden rounded-[22px] border border-black/10 bg-white p-8 shadow-[0_24px_70px_-42px_rgba(32,21,21,0.18)] ring-1 ring-black/5 transition-all duration-300 ease-out hover:border-brand/30 hover:shadow-[0_30px_80px_-46px_rgba(255,79,0,0.18)] sm:p-9 lg:min-h-[248px] lg:p-10"
    >
      <IndustryCardBody industry={industry} reduceMotion={reduceMotion} />
    </motion.div>
  )
}

export default function Solutions() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const entered = useInView(sectionRef, { once: true, margin: "0px 0px -20% 0px" })
  const animationState = reduceMotion || entered ? "visible" : "hidden"
  const { scrollYProgress: stackProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"],
  })

  return (
    <section ref={sectionRef} className="relative w-full overflow-clip border-b border-black/10 bg-canvas text-ink">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_58%,rgba(255,79,0,0.025),transparent_42%)]" />

      <div className="site-container relative py-20">
        <motion.div initial={reduceMotion ? false : "hidden"} animate={animationState} variants={fadeUp} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
            <span className="h-1.5 w-1.5 bg-brand" />
            Industries
          </div>
          <h2 className="mt-5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[40px] lg:text-[44px]">
            Solutions by industry
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            Industry-specific prospecting plays for every B2B service team — tuned to how each market actually buys.
          </p>
        </motion.div>

        {reduceMotion ? (
          <div className="mt-16 space-y-4">
            {INDUSTRIES.map((industry) => (
              <StaticIndustryCard key={industry.name} industry={industry} />
            ))}
          </div>
        ) : (
          <div ref={trackRef} className="relative mx-auto mt-16 flex w-full max-w-[1120px] flex-col gap-6 pb-6">
            {INDUSTRIES.map((industry, index) => (
              <StackCard
                key={industry.name}
                index={index}
                total={INDUSTRIES.length}
                stackProgress={stackProgress}
              >
                <motion.div
                  custom={index}
                  initial={reduceMotion ? false : "hidden"}
                  animate={animationState}
                  variants={cardVariants}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  className="group relative flex min-h-[240px] w-full flex-col overflow-hidden rounded-[22px] border border-black/10 bg-white p-8 shadow-[0_24px_70px_-42px_rgba(32,21,21,0.18)] ring-1 ring-black/5 transition-all duration-300 ease-out hover:border-brand/30 hover:shadow-[0_30px_80px_-46px_rgba(255,79,0,0.18)] sm:p-9 lg:min-h-[248px] lg:p-10"
                >
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,79,0,0.08),transparent_28%)] opacity-80" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand/14" />
                  <div className="relative h-full">
                    <IndustryCardBody industry={industry} reduceMotion={reduceMotion} />
                  </div>
                </motion.div>
              </StackCard>
            ))}
          </div>
        )}

        <div className="relative mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[15px] leading-relaxed text-muted">Not listed? We adapt to any B2B motion.</p>
          <Button href="/contact" variant="secondary" icon={ArrowRight} className="shrink-0">
            Book a call
          </Button>
        </div>
      </div>
    </section>
  )
}
