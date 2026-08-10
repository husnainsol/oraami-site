import { motion } from "framer-motion"
import type { FeatureVisualProps } from "../types"
import { AnimatedLine, ChartGrid, ChartTooltip, FeatureVisualFrame } from "./shared"

const CHANNELS = [
  { label: "Email opens", color: "var(--color-oraami-accent-27)", d: "M22 196 C58 192 82 172 118 178 S166 142 202 150 S250 112 286 122 S342 80 396 92" },
  { label: "LinkedIn", color: "var(--color-oraami-accent-26)", d: "M22 208 C74 204 88 186 130 192 S182 168 222 174 S276 146 316 154 S360 128 396 134" },
  { label: "Content", color: "var(--color-oraami-accent-28)", d: "M22 216 C84 212 106 198 146 202 S202 186 240 190 S288 166 326 170 S370 142 396 148" },
  { label: "Replies", color: "var(--color-oraami-accent-1)", d: "M22 224 C120 222 158 214 210 212 S280 194 320 174 S366 126 396 116" },
]

export function TrustBuildingSequencesVisual({ play, reduceMotion }: FeatureVisualProps) {
  const loop = play && !reduceMotion

  return (
    <FeatureVisualFrame>
      <div className="flex h-full flex-col">
        <div className="relative min-h-0 flex-1">
          <svg viewBox="0 0 420 240" className="h-full w-full" role="img" aria-label="Multi-channel engagement rising over time">
            <ChartGrid width={420} height={240} />
            {CHANNELS.map((channel, index) => <AnimatedLine key={channel.label} d={channel.d} color={channel.color} loop={loop} delay={index * 0.14} width={index === 3 ? 3 : 2} />)}
            {[82, 146, 210, 276, 326, 396].map((x, index) => (
              <motion.g key={x} animate={loop ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: 7.8, delay: index * 0.22, times: [0, 0.35, 0.55, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>
                <line x1={x} x2={x} y1="34" y2="222" stroke="rgba(255,79,0,0.16)" strokeDasharray="3 4" />
                <circle cx={x} cy={index === 5 ? 116 : 178 - index * 10} r="4" fill={index === 5 ? "var(--color-oraami-accent-1)" : "var(--color-oraami-accent-24)"} stroke="var(--color-oraami-accent-1)" />
              </motion.g>
            ))}
            <motion.text x="168" y="144" fontSize="12" fontWeight="500" fill="var(--color-oraami-accent-26)" animate={loop ? { opacity: [0, 0.2, 1, 1, 0] } : { opacity: 1 }} transition={loop ? { duration: 7.8, times: [0, 0.3, 0.46, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Active</motion.text>
            <motion.text x="352" y="106" fontSize="12" fontWeight="500" fill="var(--color-oraami-accent-1)" animate={loop ? { opacity: [0, 0, 1, 1, 0], y: [3, 3, 0, 0, -2] } : { opacity: 1, y: 0 }} transition={loop ? { duration: 7.8, times: [0, 0.62, 0.76, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}>Reply</motion.text>
          </svg>
          <motion.div className="absolute right-2 top-2 sm:right-4 sm:top-4" animate={loop ? { opacity: [0, 0, 1, 1, 0], scale: [0.95, 0.95, 1, 1, 0.95] } : { opacity: 1, scale: 1 }} transition={loop ? { duration: 7.8, times: [0, 0.68, 0.78, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}><ChartTooltip title="Outcome" value="Meeting booked" /></motion.div>
        </div>
        <div className="relative h-[82px] shrink-0 border-t border-black/5 pt-5">
          <div className="absolute left-[5%] right-[5%] top-[29px] h-px bg-black/10" />
          <motion.div className="absolute left-[5%] top-7 h-0.5 w-[90%] origin-left bg-brand" animate={{ scaleX: loop ? [0, 1, 1, 0] : 1 }} transition={loop ? { duration: 7.8, times: [0, 0.82, 0.94, 1], repeat: Infinity, repeatDelay: 1, ease: "linear" } : { duration: 0 }} />
          <div className="relative grid grid-cols-6">
            {["Email", "LinkedIn", "Follow-up", "Case study", "Insight", "Meeting"].map((label, index) => <motion.div key={label} className="min-w-0 text-center" animate={loop ? { opacity: [0.3, 1, 1, 0.3] } : { opacity: 1 }} transition={loop ? { duration: 7.8, delay: index * 0.28, times: [0, 0.35, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}><span className="mx-auto block h-3 w-3 rounded-full border-2 border-brand bg-white" /><p className="mt-3 truncate text-[9px] leading-none text-muted">{label}</p></motion.div>)}
          </div>
        </div>
      </div>
    </FeatureVisualFrame>
  )
}
