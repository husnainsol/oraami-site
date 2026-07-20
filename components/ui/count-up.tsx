"use client"

import { useEffect, useRef, useState } from "react"

type CountUpProps = {
  end: number
  suffix?: string
  duration?: number
  startOnView?: boolean
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

export default function CountUp({
  end,
  suffix = "",
  duration = 7000,
  startOnView = false,
}: CountUpProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(!startOnView)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!startOnView || started) return

    const element = rootRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setStarted(true)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [startOnView, started])

  useEffect(() => {
    if (!started) return

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

      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [duration, end, started])

  return (
    <span ref={rootRef}>
      {value}
      {suffix}
    </span>
  )
}
