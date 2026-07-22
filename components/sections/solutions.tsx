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
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/8 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_40px_-28px_rgba(255,79,0,0.55)] transition-transform duration-300 ease-out group-hover:scale-[1.02]">
      <span aria-hidden="true" className="absolute left-0 top-0 h-full w-[3px] bg-brand" />
      <Icon className="relative h-6 w-6 text-brand transition-colors duration-300 ease-out group-hover:text-on-primary" strokeWidth={1.5} aria-hidden="true" />
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
      <div className="relative flex h-full items-center justify-center rounded-[18px] border border-white/8 bg-[#140f38]/88 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-5">
        {children}
      </div>
    </div>
  )
}

function TinyLabel({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/8 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white/58">{children}</span>
}

function AnimatedConnector({ d, reduceMotion, color = "rgba(255,255,255,0.28)", width = 2 }: { d: string; reduceMotion: boolean; color?: string; width?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray="6 8"
      animate={reduceMotion ? { pathLength: 1, opacity: 0.7 } : { pathLength: [0, 1, 1], opacity: [0.14, 0.9, 0.14] }}
      transition={reduceMotion ? { duration: 0 } : { duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

function StageNode({ active, reduceMotion, label, x, y }: { active?: boolean; reduceMotion: boolean; label?: string; x: number; y: number }) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r={active ? 18 : 14}
        fill={active ? "rgba(255,79,0,0.16)" : "rgba(255,255,255,0.05)"}
        stroke={active ? "rgba(255,79,0,0.45)" : "rgba(255,255,255,0.16)"}
        animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: active ? [0.65, 1, 0.65] : [0.36, 0.74, 0.36], scale: active ? [0.96, 1.04, 0.96] : 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {label ? <text x={x} y={y + 34} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.54)">{label}</text> : null}
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
      <div className="relative w-full max-w-[420px]">
        <div className="mb-4 flex justify-center">
          <TinyLabel>Journey</TinyLabel>
        </div>
        <svg viewBox="0 0 420 170" className="mx-auto h-[170px] w-full max-w-[420px]" aria-hidden="true">
          <AnimatedConnector d="M34 92 C86 92 102 44 156 44 S238 44 284 92 S344 138 388 138" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.5} />
          <StageNode x={44} y={92} label="Research" reduceMotion={reduceMotion} />
          <StageNode x={156} y={44} label="Match" reduceMotion={reduceMotion} />
          <StageNode x={284} y={92} label="Qualified" active reduceMotion={reduceMotion} />
          <StageNode x={388} y={138} label="Outreach" reduceMotion={reduceMotion} />
          <motion.circle
            r="7"
            fill="#FF4F00"
            animate={reduceMotion ? { cx: 388, cy: 138, opacity: 1 } : { cx: [44, 156, 284, 388], cy: [92, 44, 92, 138], opacity: [0, 1, 1, 1] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </VizShell>
  )
}

function AgenciesVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <div className="relative w-full max-w-[420px]">
        <div className="mb-4 flex flex-col items-center gap-2 text-center">
          <TinyLabel>Best Fit</TinyLabel>
          <p className="text-[12px] text-white/58">Prospect aligns to proof, then moves to proposal.</p>
        </div>
        <svg viewBox="0 0 420 170" className="mx-auto h-[170px] w-full max-w-[420px]" aria-hidden="true">
          <AnimatedConnector d="M50 112 C118 112 126 54 210 54 S302 54 370 112" reduceMotion={reduceMotion} color="rgba(113,87,168,0.64)" width={2.2} />
          <AnimatedConnector d="M210 54 C244 74 278 92 330 120" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.2} />
          <rect x="26" y="88" width="48" height="48" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)" />
          <text x="50" y="117" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.62)">Lead</text>
          <rect x="186" y="30" width="48" height="48" rx="16" fill="rgba(255,79,0,0.12)" stroke="rgba(255,79,0,0.28)" />
          <text x="210" y="59" textAnchor="middle" fontSize="9" fill="rgba(255,79,0,0.86)">Proof</text>
          <rect x="324" y="96" width="48" height="48" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)" />
          <text x="348" y="125" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.62)">Scope</text>
          <motion.circle
            r="6"
            fill="#FF4F00"
            animate={reduceMotion ? { cx: 348, cy: 120, opacity: 1 } : { cx: [50, 210, 348], cy: [112, 54, 120], opacity: [0, 1, 1] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </VizShell>
  )
}

function ConsultingVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <div className="relative w-full max-w-[420px]">
        <div className="mb-4 flex flex-col items-center gap-2 text-center">
          <TinyLabel>Priority</TinyLabel>
          <p className="text-[12px] text-white/58">One account links to the strongest stakeholder path.</p>
        </div>
        <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
          <AnimatedConnector d="M210 90 C170 72 126 56 78 40" reduceMotion={reduceMotion} color="rgba(113,87,168,0.58)" />
          <AnimatedConnector d="M210 90 C256 70 300 56 342 40" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.4} />
          <AnimatedConnector d="M210 90 C170 112 128 132 90 154" reduceMotion={reduceMotion} color="rgba(15,118,110,0.56)" />
          <AnimatedConnector d="M210 90 C258 112 296 132 330 154" reduceMotion={reduceMotion} color="rgba(37,99,235,0.56)" />
          <StageNode x={210} y={90} active reduceMotion={reduceMotion} label="Account" />
          <StageNode x={70} y={36} reduceMotion={reduceMotion} label="Ops" />
          <StageNode x={350} y={36} active reduceMotion={reduceMotion} label="Partner" />
          <StageNode x={82} y={158} reduceMotion={reduceMotion} label="CFO" />
          <StageNode x={338} y={158} reduceMotion={reduceMotion} label="Lead" />
        </svg>
      </div>
    </VizShell>
  )
}

function ITServicesVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <div className="relative w-full max-w-[420px]">
        <div className="mb-4 flex flex-col items-center gap-2 text-center">
          <TinyLabel>Signal</TinyLabel>
          <p className="text-[12px] text-white/58">Technical signals collapse into one qualified opportunity.</p>
        </div>
        <svg viewBox="0 0 420 170" className="mx-auto h-[170px] w-full max-w-[420px]" aria-hidden="true">
          <rect x="132" y="26" width="156" height="54" rx="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)" />
          <text x="210" y="58" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.64)">System</text>
          <rect x="62" y="112" width="70" height="36" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
          <text x="97" y="134" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.6)">Stack</text>
          <rect x="176" y="112" width="70" height="36" rx="14" fill="rgba(255,79,0,0.1)" stroke="rgba(255,79,0,0.28)" />
          <text x="211" y="134" textAnchor="middle" fontSize="9" fill="rgba(255,79,0,0.84)">Signal</text>
          <rect x="290" y="112" width="70" height="36" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
          <text x="325" y="134" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.6)">Route</text>
          <AnimatedConnector d="M210 80 C172 96 148 106 98 112" reduceMotion={reduceMotion} />
          <AnimatedConnector d="M210 80 C210 96 210 104 210 112" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.4} />
          <AnimatedConnector d="M210 80 C248 96 272 106 324 112" reduceMotion={reduceMotion} />
          <motion.circle
            r="6"
            fill="#FF4F00"
            animate={reduceMotion ? { cx: 210, cy: 112, opacity: 1 } : { cx: [210, 210], cy: [80, 112], opacity: [0, 1] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </VizShell>
  )
}

function FinancialServicesVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <div className="relative w-full max-w-[420px]">
        <div className="mb-4 flex flex-col items-center gap-2 text-center">
          <TinyLabel>Approved</TinyLabel>
          <p className="text-[12px] text-white/58">The profile clears review and moves into approval.</p>
        </div>
        <svg viewBox="0 0 420 170" className="mx-auto h-[170px] w-full max-w-[420px]" aria-hidden="true">
          <AnimatedConnector d="M54 86 C108 86 124 86 176 86" reduceMotion={reduceMotion} />
          <AnimatedConnector d="M214 86 C262 86 276 86 332 86" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.4} />
          <StageNode x={44} y={86} label="Profile" reduceMotion={reduceMotion} />
          <StageNode x={186} y={86} label="Review" active reduceMotion={reduceMotion} />
          <StageNode x={346} y={86} label="Approve" reduceMotion={reduceMotion} />
          <motion.circle
            r="6"
            fill="#FF4F00"
            animate={reduceMotion ? { cx: 346, cy: 86, opacity: 1 } : { cx: [44, 186, 346], cy: [86, 86, 86], opacity: [0, 1, 1] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 6.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </VizShell>
  )
}

function HealthcareVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <div className="relative w-full max-w-[420px]">
        <div className="mb-4 flex flex-col items-center gap-2 text-center">
          <TinyLabel>Booked</TinyLabel>
          <p className="text-[12px] text-white/58">A reviewed message flows into a booked meeting.</p>
        </div>
        <svg viewBox="0 0 420 170" className="mx-auto h-[170px] w-full max-w-[420px]" aria-hidden="true">
          <rect x="40" y="58" width="74" height="54" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)" />
          <text x="77" y="89" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.62)">Org</text>
          <rect x="176" y="38" width="68" height="44" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.16)" />
          <text x="210" y="64" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.62)">Review</text>
          <rect x="310" y="98" width="70" height="42" rx="16" fill="rgba(255,79,0,0.1)" stroke="rgba(255,79,0,0.28)" />
          <text x="345" y="123" textAnchor="middle" fontSize="9" fill="rgba(255,79,0,0.84)">Meet</text>
          <AnimatedConnector d="M114 86 C148 86 158 60 176 60" reduceMotion={reduceMotion} />
          <AnimatedConnector d="M244 60 C274 70 292 90 310 118" reduceMotion={reduceMotion} color="rgba(255,79,0,0.72)" width={2.3} />
          <motion.circle
            r="6"
            fill="#FF4F00"
            animate={reduceMotion ? { cx: 344, cy: 118, opacity: 1 } : { cx: [114, 176, 344], cy: [86, 60, 118], opacity: [0, 1, 1] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
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
            <h3 className="mt-3 text-[18px] font-semibold uppercase leading-snug tracking-[0.08em] text-[#FCFCFA] sm:text-[20px]">
              {industry.name}
            </h3>
          </div>
        </div>

        <div className="mt-6 hidden h-px w-14 bg-white/12 lg:block" aria-hidden="true" />

        <p className="mt-5 max-w-sm text-[15px] leading-[1.7] text-[#FCFCFA]/72 sm:text-[15.5px] lg:mt-0">
          {industry.description}
        </p>
      </div>

      <div className="h-px w-full bg-white/12 lg:h-auto lg:w-px lg:self-stretch" aria-hidden="true" />

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
          className="pointer-events-none absolute inset-0 z-20 rounded-[22px] bg-[#1E1A4D]"
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
      className="group relative flex min-h-[240px] w-full flex-col overflow-hidden rounded-[22px] border border-white/14 bg-[#1E1A4D] p-8 shadow-[0_24px_70px_-42px_rgba(8,8,27,0.42)] ring-1 ring-white/5 transition-all duration-300 ease-out hover:border-brand/30 hover:shadow-[0_30px_80px_-46px_rgba(8,8,27,0.48)] sm:p-9 lg:min-h-[248px] lg:p-10"
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
                  className="group relative flex min-h-[240px] w-full flex-col overflow-hidden rounded-[22px] border border-white/14 bg-[#1E1A4D] p-8 shadow-[0_24px_70px_-42px_rgba(8,8,27,0.42)] ring-1 ring-white/5 transition-all duration-300 ease-out hover:border-brand/30 hover:shadow-[0_30px_80px_-46px_rgba(8,8,27,0.48)] sm:p-9 lg:min-h-[248px] lg:p-10"
                >
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,79,0,0.10),transparent_28%)] opacity-70" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
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
