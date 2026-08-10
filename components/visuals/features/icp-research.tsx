import { motion } from "framer-motion"
import type { FeatureVisualProps } from "../types"
import { ChartGrid, ChartTooltip, FeatureVisualFrame, VISUAL_DURATION, VISUAL_EASE } from "./shared"

const POINTS = [
  [58, 182, 330, 58, true], [84, 150, 354, 82, true], [112, 196, 376, 48, true],
  [136, 126, 312, 92, true], [164, 172, 390, 112, true], [188, 106, 342, 122, true],
  [72, 92, 212, 158, false], [102, 72, 178, 188, false], [130, 220, 236, 206, false],
  [154, 52, 252, 174, false], [184, 232, 274, 220, false], [214, 144, 290, 194, false],
  [242, 88, 286, 142, false], [266, 214, 302, 224, false], [292, 162, 318, 186, false],
  [316, 116, 362, 72, true], [338, 138, 382, 96, true], [362, 178, 398, 132, true],
] as const

export function IcpResearchVisual({ play, reduceMotion }: FeatureVisualProps) {
  const loop = play && !reduceMotion

  return (
    <FeatureVisualFrame>
      <svg viewBox="0 0 420 250" className="h-full w-full" role="img" aria-label="Buying intent versus ICP fit scatter plot">
        <ChartGrid width={420} height={250} />
        <motion.rect
          x="302" y="24" width="104" height="100" rx="14"
          fill="rgba(245,73,0,0.055)" stroke="var(--color-oraami-accent-1)" strokeDasharray="5 5"
          animate={loop ? { opacity: [0, 1, 1, 0] } : { opacity: 1 }}
          transition={loop ? { duration: VISUAL_DURATION, times: [0, 0.2, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}
        />
        <text x="354" y="42" textAnchor="middle" fontSize="13" fontWeight="500" fill="var(--color-oraami-accent-1)">TARGET ZONE</text>
        <text x="214" y="244" textAnchor="middle" fontSize="12" fontWeight="500" fill="rgba(32,21,21,0.58)">BUYING INTENT</text>
        <text x="11" y="132" textAnchor="middle" fontSize="12" fontWeight="500" fill="rgba(32,21,21,0.58)" transform="rotate(-90 11 132)">ICP FIT</text>
        {POINTS.map(([x, y, targetX, targetY, qualified], index) => (
          <motion.circle
            key={`${x}-${y}`}
            r={qualified ? 4.5 : 3.5}
            fill={qualified ? "var(--color-oraami-accent-1)" : index % 2 ? "var(--color-oraami-accent-26)" : "var(--color-oraami-accent-27)"}
            animate={loop ? { cx: [x, x, targetX], cy: [y, y, targetY], opacity: qualified ? [0.25, 0.75, 1, 1, 0.25] : [0.25, 0.7, 0.12, 0, 0.25] } : { cx: qualified ? targetX : x, cy: qualified ? targetY : y, opacity: qualified ? 1 : 0.14 }}
            transition={loop ? { duration: VISUAL_DURATION, delay: index * 0.035, times: [0, 0.2, 0.72, 0.92, 1], repeat: Infinity, repeatDelay: 1, ease: VISUAL_EASE } : { duration: 0 }}
          />
        ))}
      </svg>
      <motion.div
        className="absolute right-2 top-2 z-20 sm:right-5 sm:top-5"
        animate={loop ? { opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, -3] } : { opacity: 1, y: 0 }}
        transition={loop ? { duration: VISUAL_DURATION, times: [0, 0.55, 0.68, 0.92, 1], repeat: Infinity, repeatDelay: 1 } : { duration: 0 }}
      >
        <ChartTooltip title="Northfield" value="Fit 94 · Intent high" />
      </motion.div>
    </FeatureVisualFrame>
  )
}
