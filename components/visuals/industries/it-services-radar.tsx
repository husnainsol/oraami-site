import { motion } from "framer-motion"
import type { IndustryVisualProps } from "../types"
import { INDUSTRY_COLORS, INDUSTRY_SVG_CLASS, IndustryVisualFrame, SceneOverline } from "./shared"

const DURATION = 8

const CHIPS = ["Cloud infra", "Databases", "APIs"] as const

export function ItServicesRadarVisual({ reduceMotion }: IndustryVisualProps) {
  const { orange, orangeSoft, white, muted, border, panel } = INDUSTRY_COLORS

  return (
    <IndustryVisualFrame reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 200" preserveAspectRatio="xMidYMid meet" className={INDUSTRY_SVG_CLASS} role="img" aria-label="Technical qualification from stack scan to fit score">
        <SceneOverline>TECHNICAL QUALIFICATION</SceneOverline>

        {/* Station 1 — tech stack card being scanned */}
        <rect x="40" y="58" width="110" height="84" rx="12" fill={panel} stroke={border} strokeWidth="1.5" />
        {CHIPS.map((chip, index) => (
          <g key={chip}>
            <rect x="52" y={70 + index * 24} width="86" height="18" rx="6" fill="rgba(255,255,255,0.04)" stroke={border} />
            <circle cx="63" cy={79 + index * 24} r="2.5" fill={orange} opacity="0.8" />
            <text x="72" y={82.5 + index * 24} fill={muted} fontSize="9" fontWeight="400">{chip}</text>
          </g>
        ))}
        <motion.rect
          x="46"
          width="98"
          height="1.6"
          rx="0.8"
          fill={orange}
          animate={reduceMotion ? { y: 99, opacity: 0 } : { y: [65, 65, 135, 135], opacity: [0, 0.9, 0.9, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, 0.03, 0.27, 0.3], repeat: Infinity, ease: "linear" }}
        />
        <text x="95" y="164" fill={muted} fontSize="9.5" textAnchor="middle">Stack scan</text>

        {/* Connector 1 */}
        <path d="M156 100H196" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeLinecap="round" />
        <motion.path
          d="M156 100H196"
          fill="none"
          stroke={orange}
          strokeWidth="1.7"
          strokeLinecap="round"
          animate={reduceMotion ? { pathLength: 1, opacity: 0.55 } : { pathLength: [0, 0, 1, 1, 1], opacity: [0, 0, 0.9, 0, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, 0.3, 0.38, 0.5, 1], repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Station 2 — pain-point detection */}
        <circle cx="222" cy="100" r="20" fill={orangeSoft} stroke={orange} strokeWidth="1.4" />
        <path d="M222 90v12" stroke={white} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="222" cy="109" r="1.6" fill={white} />
        <motion.circle
          cx="222"
          cy="100"
          r="27"
          fill="none"
          stroke={orange}
          strokeWidth="1.3"
          style={{ transformOrigin: "222px 100px" }}
          animate={reduceMotion ? { opacity: 0.35, scale: 1 } : { opacity: [0, 0, 0.7, 0, 0], scale: [0.8, 0.8, 1.25, 1.45, 1.45] }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, 0.38, 0.46, 0.58, 1], repeat: Infinity, ease: "easeOut" }}
        />
        <motion.text
          x="222"
          y="164"
          fill={muted}
          fontSize="9.5"
          textAnchor="middle"
          animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, 0.4, 0.48, 0.9, 1], repeat: Infinity }}
        >
          Pain-point detected
        </motion.text>

        {/* Connector 2 */}
        <path d="M248 100H294" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" strokeLinecap="round" />
        <motion.path
          d="M248 100H294"
          fill="none"
          stroke={orange}
          strokeWidth="1.7"
          strokeLinecap="round"
          animate={reduceMotion ? { pathLength: 1, opacity: 0.55 } : { pathLength: [0, 0, 1, 1, 1], opacity: [0, 0, 0.9, 0, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, 0.55, 0.63, 0.75, 1], repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Station 3 — fit score */}
        <rect x="300" y="64" width="90" height="72" rx="10" fill={panel} stroke={border} strokeWidth="1.5" />
        <text x="345" y="82" fill={muted} fontSize="8.5" letterSpacing="1" textAnchor="middle">FIT SCORE</text>
        <text x="345" y="104" fill={white} fontSize="19" fontWeight="600" textAnchor="middle">
          92<tspan fill={muted} fontSize="10">/100</tspan>
        </text>
        <motion.g
          animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0] }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION, times: [0, 0.65, 0.73, 0.94, 1], repeat: Infinity }}
        >
          <rect x="316" y="112" width="58" height="16" rx="8" fill={orangeSoft} stroke={orange} strokeWidth="1" />
          <text x="345" y="123" fill={white} fontSize="9" fontWeight="500" textAnchor="middle">Qualified</text>
        </motion.g>
        <text x="345" y="164" fill={muted} fontSize="9.5" textAnchor="middle">Delivery-ready fit</text>
      </svg>
    </IndustryVisualFrame>
  )
}
