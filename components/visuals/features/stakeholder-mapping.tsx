import { motion } from "framer-motion"
import type { FeatureVisualProps } from "../types"
import { AnimatedLine, ChartTooltip, FeatureVisualFrame, VISUAL_EASE } from "./shared"

const NODES = [
  { role: "Champion", name: "RevOps Lead", team: "Ops", x: 86, y: 70, color: "var(--color-purple)", score: "92" },
  { role: "Decision", name: "VP Revenue", team: "Exec", x: 334, y: 62, color: "var(--color-orange-deep)", score: "96" },
  { role: "Finance", name: "CFO", team: "Budget", x: 360, y: 126, color: "var(--color-amber)", score: "84" },
  { role: "Security", name: "IT Director", team: "Risk", x: 320, y: 194, color: "var(--color-blue)", score: "76" },
  { role: "User", name: "Sales Manager", team: "Team", x: 108, y: 190, color: "var(--color-teal)", score: "79" },
] as const

export function StakeholderMappingVisual({ play, reduceMotion }: FeatureVisualProps) {
  const loop = play && !reduceMotion

  return (
    <FeatureVisualFrame>
      <div className="relative h-full overflow-hidden rounded-[20px] border border-black/8 bg-[radial-gradient(circle_at_50%_44%,rgba(245,73,0,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,242,238,0.94))]">
        <svg viewBox="0 0 420 250" className="absolute inset-0 h-full w-full" role="img" aria-label="Buying committee stakeholder map">
          <defs>
            <linearGradient id="stakeholder-route" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-purple)" />
              <stop offset="55%" stopColor="var(--color-orange-deep)" />
              <stop offset="100%" stopColor="var(--color-amber)" />
            </linearGradient>
          </defs>
          {[56, 84, 112].map((radius, index) => (
            <motion.circle key={radius} cx="210" cy="126" r={radius} fill="none" stroke="rgba(32,21,21,0.06)" strokeDasharray={index === 1 ? "3 8" : "2 10"} animate={loop ? { opacity: [0.16, 0.38, 0.16], scale: [0.985, 1.02, 0.985] } : { opacity: 0.24, scale: 1 }} style={{ transformOrigin: "210px 126px" }} transition={loop ? { duration: 4.8 + index * 0.5, delay: index * 0.16, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }} />
          ))}
          {NODES.map((node, index) => {
            const controlX = 210 + (node.x > 210 ? 34 : -34)
            const controlY = node.y > 126 ? node.y - 34 : node.y + 34
            return <motion.path key={node.role} d={`M210 126 Q${controlX} ${controlY} ${node.x} ${node.y}`} fill="none" stroke={node.color} strokeWidth={index < 2 ? 2.2 : 1.7} strokeOpacity={index < 2 ? 0.34 : 0.18} strokeDasharray={index < 2 ? undefined : "4 7"} animate={loop ? { pathLength: [0.18, 1, 1], opacity: [0.12, index < 2 ? 0.6 : 0.34, 0.12] } : { pathLength: 1, opacity: index < 2 ? 0.32 : 0.18 }} transition={loop ? { duration: 6.8, delay: index * 0.1, times: [0, 0.62, 1], repeat: Infinity, repeatDelay: 0.8, ease: VISUAL_EASE } : { duration: 0 }} />
          })}
          <AnimatedLine d="M86 70 C128 88 166 104 210 126 S294 90 334 62 S350 94 360 126" color="url(#stakeholder-route)" loop={loop} width={3.2} />
          {NODES.map((node, index) => (
            <motion.g key={`${node.name}-dot`} animate={loop ? { opacity: [0.42, 1, 0.42], scale: [0.92, 1.06, 0.92] } : { opacity: 1, scale: 1 }} style={{ transformOrigin: `${node.x}px ${node.y}px` }} transition={loop ? { duration: 3.6 + index * 0.24, delay: index * 0.14, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}>
              <circle cx={node.x} cy={node.y} r="11" fill="white" stroke={node.color} strokeWidth="2" />
              <circle cx={node.x} cy={node.y} r="4" fill={node.color} />
            </motion.g>
          ))}
        </svg>
        {NODES.map((node, index) => (
          <motion.div key={node.role} className="absolute z-10 w-[92px] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white/96 px-2 py-1.5 shadow-[0_10px_24px_-20px_rgba(32,21,21,0.38)] backdrop-blur-sm sm:w-[104px] sm:rounded-xl sm:px-2.5 sm:py-2" style={{ left: `clamp(48px, ${(node.x / 420) * 100}%, calc(100% - 48px))`, top: `${(node.y / 250) * 100}%`, borderColor: `${node.color}30` }} animate={loop ? { opacity: [0.72, 1, 0.92], y: [4, 0, 1], scale: [0.98, 1.025, 0.99] } : { opacity: 1, y: 0, scale: 1 }} transition={loop ? { duration: 4.8, delay: index * 0.12, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}>
            <div className="flex items-center justify-between gap-1"><p className="truncate text-[9px] uppercase tracking-[0.04em]" style={{ color: node.color }}>{node.role}</p><span className="hidden rounded-full px-1 py-0.5 text-[9px] font-medium sm:inline" style={{ backgroundColor: `${node.color}14`, color: node.color }}>{node.score}</span></div>
            <p className="mt-1 truncate text-[11px] font-medium text-ink">{node.name}</p>
            <p className="mt-0.5 text-[9px] text-muted">{node.team}</p>
          </motion.div>
        ))}
        <motion.div className="absolute right-4 top-4 z-20 hidden sm:block" animate={loop ? { opacity: [0, 0.2, 1, 1, 0], y: [4, 4, 0, 0, -2] } : { opacity: 1, y: 0 }} transition={loop ? { duration: 6.8, times: [0, 0.22, 0.42, 0.82, 1], repeat: Infinity, repeatDelay: 0.8 } : { duration: 0 }}><ChartTooltip title="Best path" value="RevOps -> VP Revenue -> CFO" /></motion.div>
        <motion.div className="absolute bottom-4 left-4 z-20 hidden sm:block" animate={loop ? { opacity: [0, 0, 1, 1, 0], x: [-2, -2, 0, 0, 2] } : { opacity: 1, x: 0 }} transition={loop ? { duration: 6.8, times: [0, 0.48, 0.64, 0.82, 1], repeat: Infinity, repeatDelay: 0.8 } : { duration: 0 }}><ChartTooltip title="Committee" value="5 active roles qualified" /></motion.div>
      </div>
    </FeatureVisualFrame>
  )
}
