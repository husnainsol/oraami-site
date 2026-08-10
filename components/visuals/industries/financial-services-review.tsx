import { motion } from "framer-motion"
import type { IndustryVisualProps } from "../types"
import { INDUSTRY_COLORS, INDUSTRY_SVG_CLASS, IndustryVisualFrame, SceneOverline } from "./shared"

const DURATION = 8

export function FinancialServicesReviewVisual({ reduceMotion }: IndustryVisualProps) {
  const { orange, orangeSoft, white, muted, border, panel } = INDUSTRY_COLORS

  return (
    <IndustryVisualFrame reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 200" preserveAspectRatio="xMidYMid meet" className={INDUSTRY_SVG_CLASS} role="img" aria-label="Compliance review from profile research to clean handoff">
        <SceneOverline>COMPLIANCE REVIEW</SceneOverline>

        {/* Connecting rail */}
        <path d="M132 96H176M244 96H288" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeLinecap="round" />

        {/* Station 1 — researched profile */}
        <rect x="42" y="48" width="90" height="96" rx="10" fill={panel} stroke={border} strokeWidth="1.5" />
        <circle cx="87" cy="74" r="10" fill="none" stroke={white} strokeWidth="1.6" />
        <path d="M73 96c2-8 26-8 28 0" fill="none" stroke={white} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M60 110h54M60 121h40M60 132h46" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" />
        <text x="87" y="166" fill={muted} fontSize="9.5" textAnchor="middle">Profile research</text>

        {/* Station 2 — risk review shield */}
        <path d="M210 52 L244 64 V90 C244 111 231 124 210 133 C189 124 176 111 176 90 V64 Z" fill={orangeSoft} stroke="rgba(245,73,0,0.5)" strokeWidth="1.6" />
        <motion.path
          d="M196 92 l9 9 19-22"
          fill="none"
          stroke={orange}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: [0, 0, 1, 1, 1], opacity: [0, 0, 1, 1, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, 0.38, 0.52, 0.95, 1], repeat: Infinity, ease: "easeOut" }}
        />
        <text x="210" y="166" fill={muted} fontSize="9.5" textAnchor="middle">Risk review</text>

        {/* Station 3 — clean handoff */}
        <path d="M288 76h26l8 10h48a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8h-74a8 8 0 0 1-8-8V84a8 8 0 0 1 8-8Z" fill={panel} stroke={border} strokeWidth="1.5" />
        <path d="M306 112h44M306 122h30" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" />
        <motion.g
          animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, 0.76, 0.84, 0.95, 1], repeat: Infinity }}
        >
          <rect x="296" y="42" width="66" height="18" rx="9" fill={orangeSoft} stroke={orange} strokeWidth="1" />
          <circle cx="307" cy="51" r="2.5" fill={orange} />
          <text x="315" y="54.5" fill={white} fontSize="9" fontWeight="500">Verified</text>
        </motion.g>
        <text x="330" y="166" fill={muted} fontSize="9.5" textAnchor="middle">Clean handoff</text>

        {/* Traveling document dot */}
        <motion.circle
          cx="136"
          cy="96"
          r="4"
          fill={orange}
          animate={reduceMotion ? { x: 0, opacity: 0 } : { x: [0, 0, 74, 74, 168, 168], opacity: [0, 1, 1, 1, 0, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, 0.06, 0.36, 0.55, 0.78, 1], repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </IndustryVisualFrame>
  )
}
