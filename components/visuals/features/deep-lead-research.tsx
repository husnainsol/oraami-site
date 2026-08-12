import { motion } from "framer-motion"
import type { FeatureVisualProps } from "../types"
import { AnimatedLine, ChartGrid, ChartTooltip, FeatureVisualFrame, VISUAL_DURATION } from "./shared"

const SIGNALS = [
  { label: "Hiring", color: "var(--color-blue)", d: "M22 180 C60 174 72 148 106 154 S150 120 182 128 S230 86 264 104 S310 52 394 68" },
  { label: "Technology", color: "var(--color-purple)", d: "M22 192 C70 186 84 166 124 170 S174 142 210 150 S258 110 296 122 S344 90 394 98" },
  { label: "Growth", color: "var(--color-teal)", d: "M22 202 C60 190 92 196 126 178 S182 170 218 142 S264 154 304 112 S350 120 394 86" },
  { label: "News", color: "var(--color-amber)", d: "M22 212 C66 204 92 184 132 194 S184 154 226 176 S270 126 316 144 S360 106 394 118" },
  { label: "Intent", color: "var(--color-orange-deep)", d: "M22 220 C70 216 98 200 138 202 S192 188 232 166 S284 140 320 96 S360 72 394 42" },
]

export function DeepLeadResearchVisual({ play, reduceMotion }: FeatureVisualProps) {
  const loop = play && !reduceMotion

  return (
    <FeatureVisualFrame>
      <svg viewBox="0 0 420 250" className="h-full w-full" role="img" aria-label="Research signal intensity over time">
        <ChartGrid width={420} height={250} />
        {SIGNALS.map((signal, index) => <AnimatedLine key={signal.label} d={signal.d} color={signal.color} loop={loop} delay={index * 0.12} width={index === 4 ? 3 : 1.8} />)}
        <motion.line x1="320" x2="320" y1="30" y2="224" stroke="var(--color-orange-deep)" strokeWidth="1.5" strokeDasharray="4 4" animate={loop ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: VISUAL_DURATION, times: [0, 0.54, 0.64, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }} />
        <motion.circle cx="320" cy="96" r="5" fill="var(--color-orange-deep)" animate={loop ? { r: [3, 3, 7, 5, 3], opacity: [0, 0, 1, 1, 0] } : { r: 5, opacity: 1 }} transition={loop ? { duration: VISUAL_DURATION, times: [0, 0.54, 0.66, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }} />
        <motion.text x="244" y="118" fontSize="12" fontWeight="500" fill="var(--color-teal)" animate={loop ? { opacity: [0, 0.25, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: VISUAL_DURATION, times: [0, 0.34, 0.5, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Growth</motion.text>
        <motion.text x="326" y="84" fontSize="12" fontWeight="500" fill="var(--color-orange-deep)" animate={loop ? { opacity: [0, 0, 1, 1, 0], y: [4, 4, 0, 0, -2] } : { opacity: 1, y: 0 }} transition={loop ? { duration: VISUAL_DURATION, times: [0, 0.56, 0.68, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Buying Signal</motion.text>
      </svg>
      <motion.div className="absolute right-2 top-2 sm:right-5 sm:top-5" animate={loop ? { opacity: [0, 0, 1, 1, 0], y: [5, 5, 0, 0, -3] } : { opacity: 1, y: 0 }} transition={loop ? { duration: VISUAL_DURATION, times: [0, 0.56, 0.68, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>
        <ChartTooltip title="Buying trigger" value="CRM migration detected" />
      </motion.div>
    </FeatureVisualFrame>
  )
}
