"use client"

import { useEffect, useState } from "react"

type CountUpProps = {
  end: number
  suffix?: string
  duration?: number
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

export default function CountUp({ end, suffix = "", duration = 7000 }: CountUpProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      const frame = requestAnimationFrame(() => setValue(end))
      return () => cancelAnimationFrame(frame)
    }

    let frame = 0
    let startTime = 0

    const animate = (time: number) => {
      if (!startTime) startTime = time

      const progress = Math.min((time - startTime) / duration, 1)
      setValue(Math.round(end * easeOutCubic(progress)))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [duration, end])

  return (
    <>
      {value}
      {suffix}
    </>
  )
}
