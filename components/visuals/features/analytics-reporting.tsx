import { motion } from "framer-motion"
import type { FeatureVisualProps } from "../types"
import { AnimatedLine, ChartGrid, FeatureVisualFrame, VISUAL_DURATION } from "./shared"

const CURRENT = "M18 142 C58 134 78 110 112 118 S166 84 198 94 S250 58 286 72 S340 32 386 42"
const PREVIOUS = "M18 156 C62 148 86 132 122 138 S174 112 210 120 S262 92 302 104 S348 76 386 84"

export function AnalyticsReportingVisual({ play, reduceMotion }: FeatureVisualProps) {
  const loop = play && !reduceMotion

  return (
    <FeatureVisualFrame>
      <svg viewBox="0 0 404 180" className="h-full w-full" role="img" aria-label="Meeting rate current and previous period">
        <defs><linearGradient id="analytics-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-oraami-accent-1)" stopOpacity="0.22" /><stop offset="100%" stopColor="var(--color-oraami-accent-1)" stopOpacity="0" /></linearGradient></defs>
        <ChartGrid width={404} height={180} />
        <motion.path d={`${CURRENT} L386 172 L18 172 Z`} fill="url(#analytics-area)" animate={{ opacity: loop ? [0, 1, 1, 0] : 1 }} transition={loop ? { duration: VISUAL_DURATION, times: [0, 0.66, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }} />
        <AnimatedLine d={PREVIOUS} color="rgba(113,87,168,0.55)" loop={loop} dashed width={1.8} />
        <AnimatedLine d={CURRENT} color="var(--color-oraami-accent-1)" loop={loop} delay={0.12} width={3} />
        {[[112, 118], [198, 94], [286, 72], [386, 42]].map(([x, y], index) => <motion.circle key={x} cx={x} cy={y} r="4" fill="var(--color-oraami-accent-1)" stroke="white" strokeWidth="2" animate={loop ? { opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] } : { opacity: 1, scale: 1 }} transition={loop ? { duration: VISUAL_DURATION, delay: index * 0.11, times: [0, 0.55, 0.68, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }} />)}
        <motion.text x="202" y="84" fontSize="12" fontWeight="500" fill="var(--color-oraami-accent-1)" animate={loop ? { opacity: [0, 0.2, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: VISUAL_DURATION, times: [0, 0.34, 0.48, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Growth</motion.text>
        <motion.text x="328" y="34" fontSize="12" fontWeight="500" fill="var(--color-oraami-accent-25)" animate={loop ? { opacity: [0, 0, 1, 1, 0], y: [3, 3, 0, 0, -2] } : { opacity: 1, y: 0 }} transition={loop ? { duration: VISUAL_DURATION, times: [0, 0.58, 0.7, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Top Account</motion.text>
      </svg>
    </FeatureVisualFrame>
  )
}
