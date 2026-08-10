import type { ReactNode } from "react"
import { motion } from "framer-motion"
import type { IndustryVisualProps } from "../types"

export const INDUSTRY_DURATION = 7.2
export const INDUSTRY_COLORS = {
  white: "rgba(255,255,255,0.92)",
  muted: "rgba(255,255,255,0.55)",
  border: "rgba(255,255,255,0.14)",
  panel: "rgba(255,255,255,0.055)",
  orange: "rgba(245,73,0,0.96)",
  orangeSoft: "rgba(245,73,0,0.12)",
} as const

export const INDUSTRY_SVG_CLASS = "h-full max-h-[225px] w-full max-w-[540px]"

export function SceneOverline({ children }: { children: string }) {
  return (
    <text x="20" y="22" fill={INDUSTRY_COLORS.muted} fontSize="9.5" fontWeight="500" letterSpacing="1.6">
      {children}
    </text>
  )
}

export function IndustryVisualFrame({ children, reduceMotion }: { children: ReactNode } & IndustryVisualProps) {
  return (
    <div className="relative flex h-full min-h-[190px] w-full items-center overflow-hidden bg-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(245,73,0,0.09),transparent_30%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.055)_1px,transparent_1.1px)] [background-size:22px_22px] [mask-image:radial-gradient(circle_at_50%_45%,black_30%,transparent_78%)]"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
        animate={reduceMotion ? { opacity: 0.18 } : { opacity: [0.14, 0.26, 0.14], x: [0, -12, 0], y: [0, 8, 0] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#7C6CF0]/15 blur-3xl"
        animate={reduceMotion ? { opacity: 0.14 } : { opacity: [0.1, 0.2, 0.1], x: [0, 10, 0], y: [0, -8, 0] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-4 sm:p-5">{children}</div>
    </div>
  )
}

export function SceneCard({ x, y, width, height, accent = false, children }: { x: number; y: number; width: number; height: number; accent?: boolean; children?: ReactNode }) {
  const { orangeSoft, panel, border } = INDUSTRY_COLORS
  return <g><rect x={x} y={y} width={width} height={height} rx={10} fill={accent ? orangeSoft : panel} stroke={accent ? "rgba(245,73,0,0.42)" : border} strokeWidth="1.5" />{children}</g>
}

export function SceneConnector({ d, reduceMotion, start = 0.08, end = 0.34, accent = false, dashed = false }: { d: string; start?: number; end?: number; accent?: boolean; dashed?: boolean } & IndustryVisualProps) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={accent ? INDUSTRY_COLORS.orange : "rgba(255,255,255,0.28)"}
      strokeWidth={accent ? 2 : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "4 6" : undefined}
      animate={reduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: [0, 0, 1, 1, 1], opacity: [0, 0.35, 1, 1, 0] }}
      transition={reduceMotion ? { duration: 0 } : { duration: INDUSTRY_DURATION, repeat: Infinity, times: [0, start, end, 0.94, 1], ease: "easeInOut" }}
    />
  )
}

export function MiniArrow({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotate})`}><path d="M-6 0 h8" fill="none" stroke="rgba(245,73,0,0.9)" strokeWidth="1.6" strokeLinecap="round" /><path d="M0 -4 l6 4 -6 4" fill="none" stroke="rgba(245,73,0,0.9)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></g>
}

export function SceneNode({ x, y, label, active = false, muted = false }: { x: number; y: number; label?: string; active?: boolean; muted?: boolean }) {
  const { orangeSoft, orange, panel, border, white, muted: mutedColor } = INDUSTRY_COLORS
  return <g opacity={muted ? 0.58 : 1}><circle cx={x} cy={y} r="13" fill={active ? orangeSoft : panel} stroke={active ? orange : border} strokeWidth="1.5" /><circle cx={x} cy={y} r="4" fill={active ? orange : white} />{label && <text x={x} y={y + 27} fill={active ? orange : mutedColor} fontSize="10" fontWeight="400" textAnchor="middle">{label}</text>}</g>
}

