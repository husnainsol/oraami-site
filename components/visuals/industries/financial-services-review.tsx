import { motion } from "framer-motion"
import type { IndustryVisualProps } from "../types"
import { CheckMark, INDUSTRY_COLORS, INDUSTRY_DURATION, IndustryVisualFrame, MiniArrow, SceneCard, SceneConnector } from "./shared"

function DocumentGlyph({ x, y }: { x: number; y: number }) {
  const { panel, border, muted } = INDUSTRY_COLORS
  return <g><path d={`M${x} ${y} h24 l8 8 v35 h-32 Z`} fill={panel} stroke={border} strokeWidth="1.5" /><path d={`M${x + 24} ${y} v8 h8`} fill="none" stroke={border} strokeWidth="1.5" /><path d={`M${x + 7} ${y + 18} h18 M${x + 7} ${y + 25} h15 M${x + 7} ${y + 32} h11`} stroke={muted} strokeWidth="2" strokeLinecap="round" /></g>
}

function StatusPill({ x, y, label }: { x: number; y: number; label: string }) {
  const { orangeSoft, orange, white } = INDUSTRY_COLORS
  return <g><rect x={x} y={y} width="66" height="18" rx="9" fill={orangeSoft} stroke="rgba(255,79,0,0.34)" /><circle cx={x + 10} cy={y + 9} r="3" fill={orange} /><text x={x + 18} y={y + 13} fill={white} fontSize="10" fontWeight="400">{label}</text></g>
}

export function FinancialServicesReviewVisual({ reduceMotion }: IndustryVisualProps) {
  const { orange, orangeSoft, white, muted, border, panel } = INDUSTRY_COLORS

  return (
    <IndustryVisualFrame reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="h-auto w-full" role="img" aria-label="Secure financial services review and handoff">
        <text x="28" y="23" fill={muted} fontSize="10" fontWeight="400" letterSpacing="1.2">SECURE REVIEW</text>
        <DocumentGlyph x={38} y={53} />
        <circle cx="54" cy="48" r="9" fill={panel} stroke={border} /><circle cx="54" cy="45" r="3" fill={white} /><path d="M48 52 C49 47 59 47 60 52" fill="none" stroke={white} strokeWidth="1.4" />
        <path d="M151 44 L190 58 V87 C190 111 175 126 151 136 C127 126 112 111 112 87 V58 Z" fill={orangeSoft} stroke="rgba(255,79,0,0.46)" strokeWidth="1.7" />
        <path d="M140 84 l8 8 17-21" fill="none" stroke={orange} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><text x="151" y="111" fill={white} fontSize="10" fontWeight="400" textAnchor="middle">Review</text>
        <SceneConnector d="M70 80 C88 80 95 80 112 80" reduceMotion={reduceMotion} start={0.05} end={0.2} /><MiniArrow x={108} y={80} />
        <SceneCard x={216} y={42} width={102} height={88}><text x="230" y="58" fill={white} fontSize="10" fontWeight="400">Checklist</text>{[63, 84, 105].map((y, index) => <g key={y}><rect x="230" y={y} width="10" height="10" rx="3" fill={orangeSoft} stroke="rgba(255,79,0,0.4)" /><path d={`M248 ${y + 3} h52 M248 ${y + 8} h36`} stroke={muted} strokeWidth="1.6" strokeLinecap="round" /><motion.g animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: INDUSTRY_DURATION, repeat: Infinity, times: [0, 0.22 + index * 0.1, 0.3 + index * 0.1, 1] }}><path d={`M232 ${y + 5} l2 2 4-5`} fill="none" stroke={orange} strokeWidth="1.5" strokeLinecap="round" /></motion.g></g>)}</SceneCard>
        <path d="M341 68 v55 h54 V68" fill="none" stroke={border} strokeWidth="1.7" strokeLinecap="round" /><MiniArrow x={341} y={95} /><path d="M347 115 h42" stroke={muted} strokeWidth="2" strokeLinecap="round" /><text x="368" y="137" fill={muted} fontSize="10" fontWeight="400" textAnchor="middle">Handoff</text>
        <motion.g animate={reduceMotion ? { x: 70, y: 36, opacity: 1 } : { x: [0, 0, 70, 70], y: [0, 0, 36, 36], opacity: [0, 1, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: INDUSTRY_DURATION, repeat: Infinity, times: [0, 0.58, 0.76, 1], ease: "easeInOut" }}><rect x="274" y="53" width="42" height="29" rx="6" fill={orangeSoft} stroke={orange} /><path d="M284 64 h22 M284 70 h14" stroke={white} strokeWidth="1.8" strokeLinecap="round" /></motion.g>
        <text x="295" y="92" fill="rgba(255,255,255,0.78)" fontSize="10" fontWeight="400" textAnchor="middle">Send</text>
        <motion.g animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: INDUSTRY_DURATION, repeat: Infinity, times: [0, 0.77, 0.85, 1] }}><StatusPill x={337} y={36} label="Verified" /><MiniArrow x={333} y={45} /></motion.g>
        <CheckMark x={350} y={149} color={orange} />
      </svg>
    </IndustryVisualFrame>
  )
}
