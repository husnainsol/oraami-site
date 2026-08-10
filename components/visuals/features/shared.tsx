import type { ReactNode } from "react"
import { motion } from "framer-motion"

export const VISUAL_EASE = [0.22, 1, 0.36, 1] as const
export const VISUAL_DURATION = 7.2

export function FeatureVisualFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto h-[280px] w-full max-w-[420px] overflow-hidden rounded-[20px] bg-oraami-accent-secondary p-2 shadow-[0_10px_24px_-20px_rgba(32,21,21,0.24)] sm:h-[300px] sm:rounded-[22px] sm:p-2.5 lg:mx-0 lg:h-[320px] lg:rounded-[24px] lg:p-3">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(32,21,21,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(32,21,21,0.12)_1px,transparent_1px)] [background-size:72px_72px]"
      />
      <div className="relative h-full overflow-hidden rounded-[14px] bg-white p-3 sm:rounded-[16px] sm:p-3.5 lg:rounded-[18px] lg:p-4">{children}</div>
    </div>
  )
}

export function ChartGrid({ width = 420, height = 220 }: { width?: number; height?: number }) {
  return (
    <g aria-hidden="true">
      {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
        <line key={`h${ratio}`} x1="28" x2={width - 12} y1={height * ratio} y2={height * ratio} stroke="rgba(32,21,21,0.075)" />
      ))}
      {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
        <line key={`v${ratio}`} y1="12" y2={height - 24} x1={width * ratio} x2={width * ratio} stroke="rgba(32,21,21,0.055)" />
      ))}
    </g>
  )
}

export function AnimatedLine({
  d,
  color,
  loop,
  delay = 0,
  dashed = false,
  width = 2.5,
}: {
  d: string
  color: string
  loop: boolean
  delay?: number
  dashed?: boolean
  width?: number
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "6 6" : undefined}
      initial={false}
      animate={{ pathLength: loop ? [0, 1, 1, 0] : 1, opacity: loop ? [0.15, 1, 1, 0.15] : 1 }}
      transition={loop ? { duration: VISUAL_DURATION, delay, times: [0, 0.64, 0.92, 1], repeat: Infinity, repeatDelay: 1, ease: VISUAL_EASE } : { duration: 0 }}
    />
  )
}

export function ChartTooltip({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white/95 px-2.5 py-2 shadow-[0_12px_28px_-22px_rgba(32,21,21,0.5)]">
      <p className="text-[9px] uppercase tracking-[0.1em] text-faint">{title}</p>
      <p className="mt-0.5 text-[11px] font-medium text-ink">{value}</p>
    </div>
  )
}
