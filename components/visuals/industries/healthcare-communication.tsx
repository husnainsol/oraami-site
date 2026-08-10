import { motion } from "framer-motion"
import type { IndustryVisualProps } from "../types"
import { INDUSTRY_COLORS, INDUSTRY_DURATION, IndustryVisualFrame, MiniArrow, SceneCard, SceneConnector, SceneNode } from "./shared"

export function HealthcareCommunicationVisual({ reduceMotion }: IndustryVisualProps) {
  const { orange, white, muted, border, panel } = INDUSTRY_COLORS

  return (
    <IndustryVisualFrame reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="h-auto w-full" role="img" aria-label="Healthcare communication route">
        <text x="28" y="23" fill={muted} fontSize="10" fontWeight="400" letterSpacing="1.2">CARE COMMUNICATION ROUTE</text>
        <SceneCard x={34} y={52} width={92} height={78}><path d="M50 82 h60 v32 H50 Z M60 82 V68 h40 v14" fill={panel} stroke={border} strokeWidth="1.4" /><path d="M72 68 V55 h16 v13 M80 58 v8 M76 62 h8" fill="none" stroke={orange} strokeWidth="2" strokeLinecap="round" /><text x="80" y="124" fill={white} fontSize="10" fontWeight="400" textAnchor="middle">Care network</text></SceneCard>
        <path d="M126 91 C154 91 164 55 194 55 M126 91 H202 M126 91 C154 91 164 127 194 127" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" strokeLinecap="round" />
        <SceneNode x={202} y={91} label="Lead" active /><SceneNode x={194} y={55} label="Admin" muted /><SceneNode x={194} y={127} label="Buyer" muted />
        <motion.circle cx="202" cy="91" r="19" fill="none" stroke={orange} strokeWidth="1.4" animate={reduceMotion ? { opacity: 0.5, scale: 1 } : { opacity: [0.18, 0.62, 0.18], scale: [0.9, 1.12, 0.9] }} transition={reduceMotion ? { duration: 0 } : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "202px 91px" }} />
        <SceneConnector d="M215 91 H306" reduceMotion={reduceMotion} start={0.32} end={0.62} accent /><MiniArrow x={298} y={91} />
        <motion.circle cx="257" cy="91" r="4" fill={orange} animate={reduceMotion ? { x: 34, opacity: 1 } : { x: [0, 0, 42, 42], opacity: [0, 1, 1, 0] }} transition={reduceMotion ? { duration: 0 } : { duration: INDUSTRY_DURATION, repeat: Infinity, times: [0, 0.38, 0.68, 1], ease: "easeInOut" }} />
        <SceneCard x={306} y={58} width={82} height={66} accent><circle cx="347" cy="79" r="11" fill={panel} stroke={border} /><path d="M341 81 C342 74 352 74 353 81 M347 70 a4 4 0 1 1 0 8" fill="none" stroke={white} strokeWidth="1.5" /><text x="347" y="108" fill={white} fontSize="10" fontWeight="400" textAnchor="middle">Decision</text></SceneCard>
      </svg>
    </IndustryVisualFrame>
  )
}
