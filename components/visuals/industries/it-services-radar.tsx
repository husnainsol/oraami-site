import { motion } from "framer-motion"
import type { IndustryVisualProps } from "../types"
import { INDUSTRY_COLORS, IndustryVisualFrame } from "./shared"

const NODES = [
  { label: "Server", x: 195, y: 35 },
  { label: "Database", x: 274, y: 63 },
  { label: "Cloud", x: 274, y: 124 },
  { label: "Firewall", x: 195, y: 150 },
  { label: "Endpoint", x: 116, y: 124 },
  { label: "Network", x: 116, y: 63 },
] as const

export function ItServicesRadarVisual({ reduceMotion }: IndustryVisualProps) {
  const { orange, orangeSoft, white, muted, border } = INDUSTRY_COLORS

  return (
    <IndustryVisualFrame reduceMotion={reduceMotion}>
      <svg viewBox="0 0 420 180" className="h-full w-full" role="img" aria-label="IT infrastructure signal radar">
        <text x="18" y="18" fill={muted} fontSize="12" fontWeight="400" letterSpacing="1.1">INFRASTRUCTURE SIGNAL RADAR</text>
        {[{ rx: 40, ry: 25 }, { rx: 70, ry: 44 }, { rx: 101, ry: 65 }].map(({ rx, ry }) => <ellipse key={rx} cx="195" cy="94" rx={rx} ry={ry} fill="none" stroke="rgba(255,255,255,0.1)" />)}
        <path d="M94 94H296M195 29V159" stroke="rgba(255,255,255,0.07)" />
        <motion.g style={{ transformOrigin: "195px 94px" }} animate={reduceMotion ? { rotate: 42 } : { rotate: [0, 360] }} transition={reduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: "linear" }}>
          <path d="M195 94 L195 29 L252 52 Z" fill="rgba(255,79,0,0.14)" />
          <path d="M195 94 L195 29" fill="none" stroke={orange} strokeWidth="1.4" strokeLinecap="round" opacity="0.72" />
        </motion.g>
        <circle cx="195" cy="94" r="4" fill={orange} />
        {NODES.map((node, index) => {
          const start = index / NODES.length
          const end = Math.min(0.98, start + 0.08)
          return (
            <motion.g key={node.label} style={{ transformOrigin: `${node.x}px ${node.y}px` }} animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: [1, 1, 1.18, 1, 1], opacity: [0.65, 0.65, 1, 0.8, 0.65] }} transition={reduceMotion ? { duration: 0 } : { duration: 6, times: [0, start, end, Math.min(0.99, end + 0.08), 1], repeat: Infinity, ease: "easeOut" }}>
              <circle cx={node.x} cy={node.y} r="13" fill={orangeSoft} stroke={orange} strokeWidth="1.4" />
              <circle cx={node.x} cy={node.y} r="4" fill={white} />
              <text x={node.x} y={node.y + 22} fill={muted} fontSize="11" fontWeight="400" textAnchor="middle">{node.label}</text>
            </motion.g>
          )
        })}
        <rect x="315" y="76" width="90" height="42" rx="11" fill="rgba(255,255,255,0.04)" stroke={border} />
        <text x="360" y="93" fill={white} fontSize="11" fontWeight="400" textAnchor="middle">Continuous signal</text>
        <text x="360" y="106" fill={muted} fontSize="11" textAnchor="middle">detection</text>
      </svg>
    </IndustryVisualFrame>
  )
}
