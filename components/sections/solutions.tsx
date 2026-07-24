"use client"

import { useRef, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
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
type Industry = { name: string; description: string; items: Feature[] }

const INDUSTRIES: Industry[] = [
  {
    name: "SaaS",
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

const STORY_DURATION = 7.2
const WHITE = "rgba(255,255,255,0.82)"
const MUTED = "rgba(255,255,255,0.38)"
const BORDER = "rgba(255,255,255,0.16)"
const PANEL = "rgba(255,255,255,0.055)"
const ORANGE = "rgba(255,79,0,0.96)"
const ORANGE_SOFT = "rgba(255,79,0,0.12)"

function SceneCard({ x, y, width, height, accent = false, children }: { x: number; y: number; width: number; height: number; accent?: boolean; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={10} fill={accent ? ORANGE_SOFT : PANEL} stroke={accent ? "rgba(255,79,0,0.42)" : BORDER} strokeWidth="1.5" />
      {children}
    </g>
  )
}

function SceneConnector({ d, reduceMotion, start = 0.08, end = 0.34, accent = false, dashed = false }: { d: string; reduceMotion: boolean; start?: number; end?: number; accent?: boolean; dashed?: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={accent ? ORANGE : "rgba(255,255,255,0.28)"}
      strokeWidth={accent ? 2.2 : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "4 6" : undefined}
      animate={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: [0, 0, 1, 1], opacity: [0, 0.3, 1, 1] }}
      transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, start, end, 1], ease: "easeInOut" }}
    />
  )
}

function SceneNode({ x, y, label, active = false, muted = false }: { x: number; y: number; label?: string; active?: boolean; muted?: boolean }) {
  return (
    <g opacity={muted ? 0.48 : 1}>
      <circle cx={x} cy={y} r="13" fill={active ? ORANGE_SOFT : PANEL} stroke={active ? ORANGE : BORDER} strokeWidth="1.5" />
      <circle cx={x} cy={y} r="4" fill={active ? ORANGE : WHITE} />
      {label && <text x={x} y={y + 27} fill={active ? ORANGE : MUTED} fontSize="8" textAnchor="middle">{label}</text>}
    </g>
  )
}

function CheckMark({ x, y, color = ORANGE }: { x: number; y: number; color?: string }) {
  return <path d={"M" + x + " " + y + " l4 4 8-9"} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
}

function DocumentGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={"M" + x + " " + y + " h24 l8 8 v35 h-32 Z"} fill={PANEL} stroke={BORDER} strokeWidth="1.5" />
      <path d={"M" + (x + 24) + " " + y + " v8 h8"} fill="none" stroke={BORDER} strokeWidth="1.5" />
      <path d={"M" + (x + 7) + " " + (y + 18) + " h18 M" + (x + 7) + " " + (y + 25) + " h15 M" + (x + 7) + " " + (y + 32) + " h11"} stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

function StatusPill({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width="58" height="18" rx="9" fill={ORANGE_SOFT} stroke="rgba(255,79,0,0.34)" />
      <circle cx={x + 10} cy={y + 9} r="3" fill={ORANGE} />
      <text x={x + 18} y={y + 12} fill={WHITE} fontSize="7.5">{label}</text>
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
  const accountDots = [
    { y: 54, exitY: 38 },
    { y: 78, exitY: 78 },
    { y: 102, exitY: 118 },
    { y: 126, exitY: 142 },
  ]

  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <text x="28" y="28" fill={MUTED} fontSize="8" letterSpacing="1.2">TARGET ACCOUNTS</text>
        <path d="M130 43 h78 l-22 34 v32 l-34 16 V77 Z" fill={PANEL} stroke={BORDER} strokeWidth="1.5" />
        <text x="169" y="65" fill={WHITE} fontSize="9" textAnchor="middle">Product Fit</text>
        <path d="M158 83 h22 M161 91 h16 M165 99 h8" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" />
        <SceneCard x={282} y={50} width={108} height={78} accent>
          <text x="298" y="70" fill={MUTED} fontSize="8">QUALIFIED PIPELINE</text>
          <rect x="298" y="82" width="75" height="29" rx="7" fill={PANEL} stroke={BORDER} />
          <circle cx="311" cy="96.5" r="6" fill={ORANGE_SOFT} stroke={ORANGE} />
          <path d="M308 96 l2.5 2.5 5-6" fill="none" stroke={ORANGE} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M323 92 h35 M323 100 h24" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
        </SceneCard>
        <SceneConnector d="M186 93 C230 93 248 89 282 89" reduceMotion={reduceMotion} start={0.38} end={0.58} accent />
        {accountDots.map((dot, index) => {
          const qualified = index === 1
          return (
            <motion.circle
              key={dot.y}
              cx="34"
              cy={dot.y}
              r={qualified ? 6 : 5}
              fill={qualified ? ORANGE : WHITE}
              animate={
                reduceMotion
                  ? qualified
                    ? { cx: 311, cy: 96.5, opacity: 1 }
                    : { cx: 150, cy: dot.exitY, opacity: 0.16 }
                  : qualified
                    ? { cx: [34, 34, 166, 166, 311, 311], cy: [dot.y, dot.y, 91, 91, 96.5, 96.5], opacity: [0, 1, 1, 1, 1, 1] }
                    : { cx: [34, 34, 154, 154, 154], cy: [dot.y, dot.y, 91, 91, dot.exitY], opacity: [0, 0.8, 0.8, 0.8, 0.12] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: STORY_DURATION,
                      repeat: Infinity,
                      times: qualified ? [0, 0.11, 0.3, 0.42, 0.68, 1] : [0, 0.08 + index * 0.03, 0.3, 0.4, 1],
                      ease: "easeInOut",
                    }
              }
            />
          )
        })}
        <motion.g animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.66, 0.75, 1] }}>
          <CheckMark x={365} y={116} />
        </motion.g>
      </svg>
    </VizShell>
  )
}

function AgenciesVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <text x="30" y="24" fill={MUTED} fontSize="8" letterSpacing="1.2">CAMPAIGN WORKSPACE</text>
        <DocumentGlyph x={42} y={55} />
        <text x="58" y="112" fill={WHITE} fontSize="8" textAnchor="middle">Client brief</text>
        <path d="M58 121 h42" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" />
        {[44, 82, 120].map((y, index) => (
          <g key={y}>
            <SceneCard x={155 + (index === 1 ? 8 : 0)} y={y} width={100} height={28} accent={index === 1}>
              <circle cx={168 + (index === 1 ? 8 : 0)} cy={y + 14} r="6" fill={index === 1 ? ORANGE_SOFT : PANEL} stroke={index === 1 ? ORANGE : BORDER} />
              <path d={"M" + (180 + (index === 1 ? 8 : 0)) + " " + (y + 10) + " h44 M" + (180 + (index === 1 ? 8 : 0)) + " " + (y + 17) + " h29"} stroke={index === 1 ? WHITE : MUTED} strokeWidth="2" strokeLinecap="round" />
            </SceneCard>
            <SceneConnector d={"M74 77 C112 " + (77 + index * 9) + " 125 " + (y + 14) + " " + (155 + (index === 1 ? 8 : 0)) + " " + (y + 14)} reduceMotion={reduceMotion} start={0.08 + index * 0.08} end={0.26 + index * 0.08} accent={index === 1} dashed />
          </g>
        ))}
        <SceneCard x={315} y={54} width={76} height={78}>
          <path d="M330 72 h46 M330 82 h32" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
          <rect x="330" y="95" width="46" height="21" rx="6" fill={ORANGE_SOFT} stroke="rgba(255,79,0,0.38)" />
          <path d="M340 101 v9 M335.5 105.5 h9" stroke={ORANGE} strokeWidth="1.6" strokeLinecap="round" />
          <text x="351" y="109" fill={WHITE} fontSize="7.5">Proposal</text>
        </SceneCard>
        <motion.g
          animate={reduceMotion ? { x: 152, y: -3, opacity: 1 } : { x: [0, 0, 18, 152, 152], y: [0, 0, -3, -3, -3], opacity: [0, 1, 1, 1, 1] }}
          transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.43, 0.52, 0.72, 1], ease: "easeInOut" }}
        >
          <rect x="163" y="82" width="54" height="28" rx="8" fill={ORANGE_SOFT} stroke={ORANGE} strokeWidth="1.5" />
          <circle cx="176" cy="96" r="5" fill={ORANGE} />
          <path d="M187 92 h20 M187 99 h14" stroke={WHITE} strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </svg>
    </VizShell>
  )
}

function ConsultingVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  const stakeholders = [
    { x: 88, y: 46, role: "Operations", start: 0.08, end: 0.23, active: [0, 0.2, 0.3, 1] },
    { x: 332, y: 43, role: "Executive", start: 0.17, end: 0.32, active: [0, 0.34, 0.44, 1] },
    { x: 66, y: 132, role: "Finance", start: 0.26, end: 0.41, active: [0, 0.48, 0.58, 1] },
    { x: 347, y: 132, role: "Technology", start: 0.35, end: 0.5, active: [0, 0.62, 0.72, 1] },
  ]

  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <text x="210" y="17" fill={MUTED} fontSize="8" letterSpacing="1.2" textAnchor="middle">STAKEHOLDER MAP</text>
        {stakeholders.map((stakeholder) => (
          <SceneConnector key={stakeholder.role} d={"M210 90 L" + stakeholder.x + " " + stakeholder.y} reduceMotion={reduceMotion} start={stakeholder.start} end={stakeholder.end} />
        ))}
        <circle cx="210" cy="90" r="34" fill={PANEL} stroke="rgba(255,79,0,0.44)" strokeWidth="1.5" />
        <circle cx="210" cy="90" r="23" fill={ORANGE_SOFT} stroke="rgba(255,79,0,0.28)" />
        <path d="M199 92 h22 M202 85 h16 M204 99 h12" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" />
        <text x="210" y="136" fill={WHITE} fontSize="8" textAnchor="middle">Growth initiative</text>
        {stakeholders.map((stakeholder) => (
          <motion.g
            key={stakeholder.role}
            animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: [0.45, 0.45, 1, 0.62], scale: [1, 1, 1.09, 1] }}
            transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: stakeholder.active, ease: "easeInOut" }}
            style={{ transformOrigin: stakeholder.x + "px " + stakeholder.y + "px" }}
          >
            <SceneNode x={stakeholder.x} y={stakeholder.y} label={stakeholder.role} active />
          </motion.g>
        ))}
        <motion.circle
          cx="210"
          cy="90"
          r="40"
          fill="none"
          stroke={ORANGE}
          strokeWidth="1.5"
          animate={reduceMotion ? { opacity: 0.5, scale: 1 } : { opacity: [0, 0, 0.65, 0], scale: [0.82, 0.82, 1.15, 1.15] }}
          transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.68, 0.82, 1], ease: "easeOut" }}
          style={{ transformOrigin: "210px 90px" }}
        />
      </svg>
    </VizShell>
  )
}

function ITServicesVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <text x="28" y="24" fill={MUTED} fontSize="8" letterSpacing="1.2">SYSTEM DIAGNOSIS</text>
        {[52, 278].map((x, serverIndex) => (
          <g key={x}>
            {[50, 78, 106].map((y, rowIndex) => (
              <g key={y}>
                <rect x={x} y={y} width="90" height="22" rx="6" fill={PANEL} stroke={BORDER} strokeWidth="1.5" />
                <circle cx={x + 13} cy={y + 11} r="3" fill={serverIndex === 1 && rowIndex === 1 ? ORANGE : WHITE} />
                <path d={"M" + (x + 24) + " " + (y + 8) + " h45 M" + (x + 24) + " " + (y + 14) + " h30"} stroke={MUTED} strokeWidth="1.7" strokeLinecap="round" />
              </g>
            ))}
          </g>
        ))}
        <motion.path
          d="M142 90 h44 l10-9 12 18 12-18 12 18 10-9 h36"
          fill="none"
          stroke={ORANGE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={reduceMotion ? { opacity: 0 } : { opacity: [1, 1, 1, 0, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.38, 0.55, 0.66, 1] }}
        />
        <motion.g
          animate={reduceMotion ? { x: 320, opacity: 0.38 } : { x: [0, 0, 320, 320], opacity: [0, 0.75, 0.75, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.1, 0.5, 0.64], ease: "easeInOut" }}
        >
          <rect x="38" y="37" width="2" height="105" rx="1" fill={WHITE} />
          <rect x="42" y="43" width="5" height="93" rx="2.5" fill="rgba(255,255,255,0.1)" />
        </motion.g>
        <motion.g animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.43, 0.54, 1] }}>
          <circle cx="323" cy="89" r="14" fill={ORANGE_SOFT} stroke={ORANGE} strokeWidth="1.5" />
          <path d="M323 81 v9 M323 96 v1" stroke={ORANGE} strokeWidth="2.4" strokeLinecap="round" />
        </motion.g>
        <SceneConnector d="M142 90 H278" reduceMotion={reduceMotion} start={0.58} end={0.75} accent />
        <motion.g animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.72, 0.82, 1] }}>
          <circle cx="210" cy="116" r="13" fill={ORANGE_SOFT} stroke={ORANGE} />
          <CheckMark x={204} y={116} />
        </motion.g>
      </svg>
    </VizShell>
  )
}

function FinancialServicesVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  const reviewRows = [63, 84, 105]

  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <text x="28" y="23" fill={MUTED} fontSize="8" letterSpacing="1.2">SECURE REVIEW</text>
        <DocumentGlyph x={38} y={53} />
        <circle cx="54" cy="48" r="9" fill={PANEL} stroke={BORDER} />
        <circle cx="54" cy="45" r="3" fill={WHITE} />
        <path d="M48 52 C49 47 59 47 60 52" fill="none" stroke={WHITE} strokeWidth="1.4" />
        <path d="M151 44 L190 58 V87 C190 111 175 126 151 136 C127 126 112 111 112 87 V58 Z" fill={ORANGE_SOFT} stroke="rgba(255,79,0,0.46)" strokeWidth="1.7" />
        <path d="M140 84 l8 8 17-21" fill="none" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="151" y="111" fill={WHITE} fontSize="8" textAnchor="middle">Compliance</text>
        <SceneConnector d="M70 80 C88 80 95 80 112 80" reduceMotion={reduceMotion} start={0.05} end={0.2} />
        <SceneCard x={216} y={42} width={102} height={88}>
          <text x="230" y="58" fill={WHITE} fontSize="8">REVIEW CHECKLIST</text>
          {reviewRows.map((y, index) => (
            <g key={y}>
              <rect x="230" y={y} width="10" height="10" rx="3" fill={ORANGE_SOFT} stroke="rgba(255,79,0,0.4)" />
              <path d={"M248 " + (y + 3) + " h52 M248 " + (y + 8) + " h36"} stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
              <motion.g animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.22 + index * 0.1, 0.3 + index * 0.1, 1] }}>
                <path d={"M232 " + (y + 5) + " l2 2 4-5"} fill="none" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
              </motion.g>
            </g>
          ))}
        </SceneCard>
        <path d="M341 68 v55 h54 V68" fill="none" stroke={BORDER} strokeWidth="1.7" strokeLinecap="round" />
        <path d="M347 115 h42" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
        <text x="368" y="137" fill={MUTED} fontSize="8" textAnchor="middle">Handoff</text>
        <motion.g
          animate={reduceMotion ? { x: 70, y: 36, opacity: 1 } : { x: [0, 0, 70, 70], y: [0, 0, 36, 36], opacity: [0, 1, 1, 1] }}
          transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.58, 0.76, 1], ease: "easeInOut" }}
        >
          <rect x="274" y="53" width="42" height="29" rx="6" fill={ORANGE_SOFT} stroke={ORANGE} />
          <path d="M284 64 h22 M284 70 h14" stroke={WHITE} strokeWidth="1.8" strokeLinecap="round" />
        </motion.g>
        <motion.g animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.77, 0.85, 1] }}>
          <StatusPill x={337} y={36} label="Verified" />
        </motion.g>
      </svg>
    </VizShell>
  )
}

function HealthcareVisualization({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <VizShell reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="mx-auto h-[180px] w-full max-w-[420px]" aria-hidden="true">
        <text x="28" y="23" fill={MUTED} fontSize="8" letterSpacing="1.2">CARE COMMUNICATION ROUTE</text>
        <path d="M38 69 h79 v65 H38 Z M51 69 V52 h53 v17" fill={PANEL} stroke={BORDER} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M69 52 V39 h17 v13 M77.5 42 v7 M74 45.5 h7" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" />
        {[50, 68, 86, 104].map((x) => <rect key={x} x={x} y="82" width="10" height="11" rx="2" fill="rgba(255,255,255,0.11)" />)}
        <text x="77" y="119" fill={WHITE} fontSize="8" textAnchor="middle">Care network</text>
        <path d="M117 102 C147 102 150 50 186 50 M117 102 C150 102 154 90 199 90 M117 102 C150 102 156 134 186 134" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />
        <SceneNode x={199} y={90} label="Clinical lead" active />
        <SceneNode x={186} y={50} label="Admin" muted />
        <SceneNode x={186} y={134} label="Procurement" muted />
        <motion.circle
          cx="199"
          cy="90"
          r="19"
          fill="none"
          stroke={ORANGE}
          strokeWidth="1.5"
          animate={reduceMotion ? { opacity: 0.55, scale: 1 } : { opacity: [0, 0, 0.7, 0.25, 0.25], scale: [0.82, 0.82, 1.15, 1, 1] }}
          transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.24, 0.4, 0.52, 1], ease: "easeOut" }}
          style={{ transformOrigin: "199px 90px" }}
        />
        <SceneConnector d="M212 90 C246 90 270 90 302 90" reduceMotion={reduceMotion} start={0.42} end={0.66} accent />
        <motion.g
          animate={reduceMotion ? { x: 103, opacity: 1 } : { x: [0, 0, 103, 103], opacity: [0, 1, 1, 1] }}
          transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.44, 0.67, 1], ease: "easeInOut" }}
        >
          <path d="M205 82 h26 v17 h-26 Z M205 83 l13 9 13-9" fill={ORANGE_SOFT} stroke={ORANGE} strokeWidth="1.5" strokeLinejoin="round" />
        </motion.g>
        <SceneCard x={302} y={58} width={84} height={66} accent>
          <circle cx="344" cy="79" r="12" fill={PANEL} stroke={BORDER} />
          <path d="M338 81 C339 74 349 74 350 81 M344 70 a4 4 0 1 1 0 8" fill="none" stroke={WHITE} strokeWidth="1.5" />
          <text x="344" y="108" fill={WHITE} fontSize="8" textAnchor="middle">Decision-maker</text>
        </SceneCard>
        <motion.g animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: STORY_DURATION, repeat: Infinity, times: [0, 0.62, 0.72, 1] }}>
          <rect x="252" y="108" width="28" height="24" rx="7" fill={ORANGE_SOFT} stroke={ORANGE} />
          <path d="M260 116 v-4 a6 6 0 0 1 12 0 v4 M258 116 h16 v12 h-16 Z" fill="none" stroke={ORANGE} strokeWidth="1.6" />
          <CheckMark x={263} y={122} color={WHITE} />
        </motion.g>
      </svg>
    </VizShell>
  )
}

function IndustryCardBody({ industry, reduceMotion }: { industry: Industry; reduceMotion: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between gap-7 lg:flex-row lg:items-stretch lg:gap-8">
      <div className="flex min-w-0 flex-col justify-between lg:w-[34%]">
        <div className="min-w-0">
          <h3 className="text-[18px] font-semibold uppercase leading-snug tracking-[0.08em] text-heading sm:text-[20px]">
            {industry.name}
          </h3>
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
