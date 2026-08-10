import { motion } from "framer-motion"
import type { IndustryVisualProps } from "../types"
import { INDUSTRY_COLORS, IndustryVisualFrame } from "./shared"

const STEPS = ["Visit", "Capture", "Score", "Qualify", "CRM", "Automate", "Grow"] as const
const DURATION = 7.7

const ICON_PATHS = [
  "M-8 0a8 8 0 1 0 16 0A8 8 0 1 0-8 0M-8 0H8M0-8c4 4 4 12 0 16M0-8c-4 4-4 12 0 16",
  "M-9-6H9V7H-9ZM-9-5 0 2 9-5",
  "M0-9 2-3l6 2-6 2-2 6-2-6-6-2 6-2Z",
  "M-8-8H3l5 5V9H-8ZM-3 1l2 2 5-6",
  "M-8-5c0-2 16-2 16 0v10c0 2-16 2-16 0ZM-8 0c0 2 16 2 16 0",
  "M1-9-7 2h6l-1 7L7-3H1Z",
  "M-9 7H9M-6 6V1M-1 6V-3M4 6V0M9 6V-7M3-5l6-4",
] as const

export function SaasCustomerJourneyVisual({ reduceMotion }: IndustryVisualProps) {
  const { orange, orangeSoft, white, muted, border } = INDUSTRY_COLORS

  return (
    <IndustryVisualFrame reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 190" className="h-auto w-full" role="img" aria-label="SaaS customer journey from visit to growth">
        <text x="18" y="20" fill={muted} fontSize="12" fontWeight="400" letterSpacing="1.3">CUSTOMER JOURNEY</text>
        {STEPS.map((step, index) => {
          const x = 32 + index * 59.3
          const start = index / STEPS.length
          const activeEnd = Math.min(0.98, start + 0.12)
          return (
            <g key={step}>
              {index < STEPS.length - 1 && <motion.path d={`M${x + 19} 91 H${x + 40}`} fill="none" stroke={orange} strokeWidth="1.7" strokeLinecap="round" animate={reduceMotion ? { pathLength: 1, opacity: 0.72 } : { pathLength: [0, 0, 1, 1], opacity: [0.14, 0.14, 0.78, 0.24] }} transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, Math.min(0.98, start + 0.08), Math.min(0.99, start + 0.16), 1], repeat: Infinity, ease: "easeInOut" }} />}
              <motion.g style={{ transformOrigin: `${x}px 91px` }} animate={reduceMotion ? { scale: 1 } : { scale: [1, 1, 1.1, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, start, activeEnd, Math.min(0.99, activeEnd + 0.06), 1], repeat: Infinity, ease: "easeOut" }}>
                <motion.circle cx={x} cy="91" r="18" fill={orangeSoft} stroke={orange} strokeWidth="1.5" animate={reduceMotion ? { opacity: 0.85 } : { opacity: [0.28, 0.28, 0.95, 0.48, 0.28] }} transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, start, activeEnd, Math.min(0.99, activeEnd + 0.08), 1], repeat: Infinity }} />
                <circle cx={x} cy="91" r="13" fill="rgba(255,255,255,0.04)" stroke={border} />
                <path d={ICON_PATHS[index]} transform={`translate(${x} 91) scale(.72)`} fill="none" stroke={white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>
              <text x={x} y="124" fill={muted} fontSize="12" fontWeight="400" textAnchor="middle">{step}</text>
            </g>
          )
        })}
        <text x="210" y="164" fill={white} fontSize="12" fontWeight="400" textAnchor="middle">Signals become qualified pipeline automatically</text>
      </svg>
    </IndustryVisualFrame>
  )
}
