"use client"

import { useEffect, useRef } from "react"

type Particle = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  glow: number
  tone: "orange" | "blue" | "neutral"
}

type Pointer = {
  x: number
  y: number
  active: boolean
}

const ORANGE = { r: 255, g: 90, b: 31 }
const BLUE = { r: 59, g: 130, b: 246 }
const NEUTRAL = { r: 210, g: 220, b: 235 }

function getParticleCount(width: number) {
  if (width < 520) return 62
  if (width < 900) return 92
  if (width < 1280) return 126
  return 154
}

function getConnectionDistance(width: number) {
  if (width < 520) return 125
  if (width < 900) return 150
  return 180
}

function randomSpeed() {
  const speed = 0.05 + Math.random() * 0.2
  const angle = Math.random() * Math.PI * 2

  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  }
}

function getTone(index: number): Particle["tone"] {
  if (index % 4 === 0) return "orange"
  if (index % 5 === 0) return "blue"
  return "neutral"
}

function toneColor(tone: Particle["tone"]) {
  if (tone === "orange") return ORANGE
  if (tone === "blue") return BLUE
  return NEUTRAL
}

export default function PlexusBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pointerRef = useRef<Pointer>({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d", { alpha: true })
    const parent = canvas?.parentElement

    if (!canvas || !ctx || !parent) return

    let width = 0
    let height = 0
    let dpr = 1
    let frame = 0
    let visible = true
    let particles: Particle[] = []

    const createParticles = () => {
      const count = getParticleCount(width)

      particles = Array.from({ length: count }, (_, index) => {
        const { vx, vy } = randomSpeed()
        const important = index % 13 === 0

        return {
          id: index,
          x: Math.random() * width,
          y: Math.random() * height,
          vx,
          vy,
          radius: important ? 3 + Math.random() * 1.1 : 1.65 + Math.random() * 1.35,
          alpha: important ? 0.56 + Math.random() * 0.2 : 0.3 + Math.random() * 0.22,
          glow: important ? 0.66 : 0.34,
          tone: getTone(index),
        }
      })
    }

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createParticles()
    }

    const moveParticles = () => {
      const pointer = pointerRef.current

      particles.forEach((particle) => {
        let pullX = 0
        let pullY = 0

        if (pointer.active) {
          const dx = pointer.x - particle.x
          const dy = pointer.y - particle.y
          const distanceSquared = dx * dx + dy * dy
          const radius = 120

          if (distanceSquared < radius * radius && distanceSquared > 1) {
            const distance = Math.sqrt(distanceSquared)
            const strength = (1 - distance / radius) * 0.045
            pullX = (dx / distance) * strength
            pullY = (dy / distance) * strength
          }
        }

        particle.x += particle.vx + pullX
        particle.y += particle.vy + pullY

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1
          particle.x = Math.min(Math.max(particle.x, 0), width)
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1
          particle.y = Math.min(Math.max(particle.y, 0), height)
        }
      })
    }

    const drawConnections = () => {
      const maxDistance = getConnectionDistance(width)
      const cellSize = maxDistance
      const grid = new Map<string, Particle[]>()

      particles.forEach((particle) => {
        const cellX = Math.floor(particle.x / cellSize)
        const cellY = Math.floor(particle.y / cellSize)
        const key = `${cellX}:${cellY}`
        const bucket = grid.get(key)

        if (bucket) {
          bucket.push(particle)
        } else {
          grid.set(key, [particle])
        }
      })

      particles.forEach((particle) => {
        const cellX = Math.floor(particle.x / cellSize)
        const cellY = Math.floor(particle.y / cellSize)

        for (let y = cellY - 1; y <= cellY + 1; y += 1) {
          for (let x = cellX - 1; x <= cellX + 1; x += 1) {
            const bucket = grid.get(`${x}:${y}`)
            if (!bucket) continue

            bucket.forEach((other) => {
              if (other.id <= particle.id) return

              const dx = particle.x - other.x
              const dy = particle.y - other.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance > maxDistance) return

              const opacity = (1 - distance / maxDistance) * 0.24
              const color = particle.tone !== "neutral" ? toneColor(particle.tone) : toneColor(other.tone)

              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(other.x, other.y)
              ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity.toFixed(3)})`
              ctx.lineWidth = 1
              ctx.stroke()
            })
          }
        }
      })
    }

    const drawParticles = () => {
      particles.forEach((particle) => {
        const color = toneColor(particle.tone)

        ctx.beginPath()
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.alpha})`
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.glow})`
        ctx.shadowBlur = particle.tone === "neutral" ? 7 : 16
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.shadowBlur = 0
    }

    const render = () => {
      if (!visible) return

      ctx.clearRect(0, 0, width, height)
      moveParticles()
      drawConnections()
      drawParticles()
      frame = requestAnimationFrame(render)
    }

    const start = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      }
    }

    const handlePointerLeave = () => {
      pointerRef.current.active = false
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting

        if (visible) {
          start()
        } else {
          cancelAnimationFrame(frame)
        }
      },
      { threshold: 0.05 }
    )

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (visible) start()
    })

    resize()
    start()
    observer.observe(parent)
    resizeObserver.observe(parent)
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  )
}
