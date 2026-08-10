"use client"

const COLS = 15
const ROWS = 8
const TOTAL = COLS * ROWS
const KEEP_COUNT = 50

// Seeded PRNG so the server and client always agree on which dots are "kept".
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(50)
const KEEP = new Set<number>()
while (KEEP.size < KEEP_COUNT) KEEP.add(Math.floor(rand() * TOTAL))

const DOTS = Array.from({ length: TOTAL }, (_, i) => ({ i, keep: KEEP.has(i) }))

export function QualityDotsVisual() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid w-[300px] grid-cols-[repeat(15,minmax(0,1fr))] gap-[7px]">
          {DOTS.map(({ i, keep }) => (
            <span
              key={i}
              className={`qd-dot ${keep ? "qd-keep" : ""}`}
              style={{ animationDelay: `${i * 18}ms` }}
            />
          ))}
        </div>
      </div>

      <span className="qd-badge absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-heading px-3.5 py-[7px] text-[11px] font-bold tracking-[0.03em] text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-deep" />
        Capped at 50 high-fit accounts
      </span>
    </div>
  )
}
