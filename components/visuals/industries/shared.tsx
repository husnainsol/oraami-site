import type { ReactNode } from "react"
import { motion } from "framer-motion"
import type { IndustryVisualProps } from "../types"

export const INDUSTRY_DURATION = 7.2
export const INDUSTRY_COLORS = {
  white: "rgba(255,255,255,0.9)",
  muted: "rgba(255,255,255,0.58)",
  border: "rgba(255,255,255,0.14)",
  panel: "rgba(255,255,255,0.055)",
  orange: "rgba(255,79,0,0.96)",
  orangeSoft: "rgba(255,79,0,0.12)",
} as const

export function IndustryVisualFrame({ children, reduceMotion }: { children: ReactNode } & IndustryVisualProps) {
  return (
    <div className="relative flex h-full min-h-[178px] w-full items-center overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(255,79,0,0.1),transparent_26%),linear-gradient(160deg,#29225D_0%,#1C1840_100%)]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand/12 blur-3xl"
        animate={reduceMotion ? { opacity: 0.2 } : { opacity: [0.14, 0.26, 0.14], scale: [0.96, 1.04, 0.96] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">{children}</div>
    </div>
  )
}

export function SceneCard({ x, y, width, height, accent = false, children }: { x: number; y: number; width: number; height: number; accent?: boolean; children?: ReactNode }) {
  const { orangeSoft, panel, border } = INDUSTRY_COLORS
  return <g><rect x={x} y={y} width={width} height={height} rx={10} fill={accent ? orangeSoft : panel} stroke={accent ? "rgba(255,79,0,0.42)" : border} strokeWidth="1.5" />{children}</g>
}

export function SceneConnector({ d, reduceMotion, start = 0.08, end = 0.34, accent = false, dashed = false }: { d: string; start?: number; end?: number; accent?: boolean; dashed?: boolean } & IndustryVisualProps) {
  return <motion.path d={d} fill="none" stroke={accent ? INDUSTRY_COLORS.orange : "rgba(255,255,255,0.28)"} strokeWidth={accent ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed ? "4 6" : undefined} animate={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: [0, 0, 1, 1], opacity: [0, 0.3, 1, 1] }} transition={reduceMotion ? { duration: 0 } : { duration: INDUSTRY_DURATION, repeat: Infinity, times: [0, start, end, 1], ease: "easeInOut" }} />
}

export function MiniArrow({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotate})`}><path d="M-6 0 h8" fill="none" stroke="rgba(255,79,0,0.9)" strokeWidth="1.6" strokeLinecap="round" /><path d="M0 -4 l6 4 -6 4" fill="none" stroke="rgba(255,79,0,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></g>
}

export function SceneNode({ x, y, label, active = false, muted = false }: { x: number; y: number; label?: string; active?: boolean; muted?: boolean }) {
  const { orangeSoft, orange, panel, border, white, muted: mutedColor } = INDUSTRY_COLORS
  return <g opacity={muted ? 0.58 : 1}><circle cx={x} cy={y} r="13" fill={active ? orangeSoft : panel} stroke={active ? orange : border} strokeWidth="1.5" /><circle cx={x} cy={y} r="4" fill={active ? orange : white} />{label && <text x={x} y={y + 27} fill={active ? orange : mutedColor} fontSize="10" fontWeight="400" textAnchor="middle">{label}</text>}</g>
}

export function CheckMark({ x, y, color = INDUSTRY_COLORS.orange }: { x: number; y: number; color?: string }) {
  return <path d={`M${x} ${y} l4 4 8-9`} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
}
