import { motion } from "framer-motion"
import type { IndustryVisualProps } from "../types"
import { INDUSTRY_COLORS, INDUSTRY_SVG_CLASS, IndustryVisualFrame, SceneOverline } from "./shared"

const STEPS = ["Visit", "Capture", "Score", "Qualify", "CRM", "Automate", "Grow"] as const
const DURATION = 8.4
const NODE_R = 16
const NODE_Y = 91

const ICON_PATHS = [
  "M-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0M-8 0H8M0 -8C3.2 -4.8 3.2 4.8 0 8M0 -8C-3.2 -4.8 -3.2 4.8 0 8",
  "M-8.5 -6H8.5V6H-8.5ZM-8.5 -6L0 2L8.5 -6",
  "M0 -8.5L1.9 -1.9L8.5 0L1.9 1.9L0 8.5L-1.9 1.9L-8.5 0L-1.9 -1.9Z",
  "M-6.5 -8.5H3L6.5 -5V8.5H-6.5ZM3 -8.5V-5H6.5M-3.2 0.8L-0.8 3.2L3.8 -2.2",
  "M-7.5 -5.5C-7.5 -7.6 7.5 -7.6 7.5 -5.5C7.5 -3.4 -7.5 -3.4 -7.5 -5.5M-7.5 -5.5V5.5C-7.5 7.6 7.5 7.6 7.5 5.5V-5.5M-7.5 0.5C-7.5 2.6 7.5 2.6 7.5 0.5",
  "M1.5 -8.5L-6.5 1.5H-0.5L-1.5 8.5L6.5 -1.5H0.5Z",
  "M-8.5 8H8.5M-6 8V3.5M-1.5 8V0M3 8V-3.5M7.5 8V-7.5",
] as const

export function SaasCustomerJourneyVisual({ reduceMotion }: IndustryVisualProps) {
  const { orange, orangeSoft, white, muted, border } = INDUSTRY_COLORS

  return (
    <IndustryVisualFrame reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 190" preserveAspectRatio="xMidYMid meet" className={INDUSTRY_SVG_CLASS} role="img" aria-label="SaaS customer journey from visit to growth">
        <SceneOverline>CUSTOMER JOURNEY</SceneOverline>
        {STEPS.map((step, index) => {
          const x = 32 + index * 59.3
          const start = index / STEPS.length
          const peak = Math.min(0.97, start + 0.07)
          const settle = Math.min(0.98, start + 0.13)
          return (
            <g key={step}>
              {index < STEPS.length - 1 && (
                <>
                  <path d={`M${x + 20} ${NODE_Y}H${x + 39.3}`} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeLinecap="round" />
                  <motion.path
                    d={`M${x + 20} ${NODE_Y}H${x + 39.3}`}
                    fill="none"
                    stroke={orange}
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    animate={reduceMotion ? { pathLength: 1, opacity: 0.55 } : { pathLength: [0, 0, 1, 1, 1], opacity: [0, 0, 0.9, 0, 0] }}
                    transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, Math.min(0.96, start + 0.05), Math.min(0.97, start + 0.125), Math.min(0.99, start + 0.3), 1], repeat: Infinity, ease: "easeInOut" }}
                  />
                </>
              )}
              <motion.g
                style={{ transformOrigin: `${x}px ${NODE_Y}px` }}
                animate={reduceMotion ? { scale: 1 } : { scale: [1, 1, 1.09, 1, 1] }}
                transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, start, peak, settle, 1], repeat: Infinity, ease: "easeOut" }}
              >
                <motion.circle
                  cx={x}
                  cy={NODE_Y}
                  r={NODE_R}
                  fill={orangeSoft}
                  stroke={orange}
                  strokeWidth="1.4"
                  animate={reduceMotion ? { opacity: 0.85 } : { opacity: [0.3, 0.3, 0.95, 0.3, 0.3] }}
                  transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, start, peak, Math.min(0.99, settle + 0.05), 1], repeat: Infinity }}
                />
                <circle cx={x} cy={NODE_Y} r="12" fill="rgba(255,255,255,0.04)" stroke={border} />
                <path d={ICON_PATHS[index]} transform={`translate(${x} ${NODE_Y}) scale(.68)`} fill="none" stroke={white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>
              <text x={x} y="122" fill={muted} fontSize="10.5" fontWeight="400" textAnchor="middle">{step}</text>
            </g>
          )
        })}
        <text x="210" y="163" fill={white} fontSize="10.5" fontWeight="400" textAnchor="middle">Signals become qualified pipeline automatically</text>
      </svg>
    </IndustryVisualFrame>
  )
}
