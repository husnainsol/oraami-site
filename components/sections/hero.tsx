"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"

const HERO_COPY =
  "Oraami analyzes your website, understands your product and audience, and surfaces the leads that match your ideal customer profile — automatically."

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const },
  },
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="hero" className="relative w-full overflow-x-clip bg-canvas px-[20px] pt-[82px] text-white sm:pt-[90px] lg:pt-[98px]">
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={containerVariants}
        className="relative overflow-hidden rounded-[30px] bg-oraami-accent-secondary"
      >
        <div className="relative px-5 pb-0 pt-7 sm:px-7 sm:pt-9 lg:px-16 lg:pt-16 xl:px-20 xl:pt-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)] lg:items-center lg:gap-16">
            <motion.div variants={itemVariants} className="max-w-[570px] lg:ml-20">
              <span className="inline-flex h-8 items-center rounded-full border border-[#ff4f00]/30 bg-white/[0.03] px-3.5 text-[12px] font-medium uppercase tracking-[0.17em] text-[#ff9a73]">
                ✦ AI-Powered Lead Intelligence Platform
              </span>

              <h1 className="mt-8 max-w-[565px] text-balance text-[clamp(3.35rem,4.4vw,3.75rem)] font-bold leading-[1] tracking-[-0.03em] text-[#f4efe9]">
                <span className="block lg:whitespace-nowrap">
                  Identify Customers <span className="text-[#ff4f00]">Most</span>
                </span>
                <span className="block lg:whitespace-nowrap">
                  <span className="text-[#ff4f00]">Likely</span> to Convert
                </span>
              </h1>

              <div className="mt-11 flex flex-wrap gap-3 sm:flex-nowrap">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  className="h-12 border border-[#ff4f00] bg-[#ff4f00] px-5 text-[15px] text-white shadow-[0_16px_34px_-20px_rgba(255,79,0,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-[#ff5b12] active:translate-y-0"
                >
                  Get Started for Free
                </Button>
                <Button
                  href="#features"
                  variant="outline"
                  size="lg"
                  icon={ArrowRight}
                  className="h-12 border border-[#ff4f00]/60 bg-transparent px-5 text-[15px] text-white transition-transform hover:-translate-y-0.5 hover:border-[#ff4f00] hover:bg-white/[0.04] active:translate-y-0"
                >
                  Explore Features
                </Button>
              </div>

              <p className="mt-6 max-w-[31rem] text-[17px] leading-[1.55] text-white/72 lg:hidden">
                {HERO_COPY}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="hidden max-w-[420px] lg:flex lg:justify-self-end lg:self-center">
              <p className="max-w-[420px] text-left text-[17px] leading-[1.5] text-white/72">
                {HERO_COPY}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div variants={itemVariants} className="relative mt-16 px-5 pb-0 sm:px-7 lg:px-16 xl:px-20">
          <div className="pointer-events-none absolute inset-x-[36%] top-[-10px] h-20 rounded-full bg-[#ff4f00]/8 blur-2xl sm:inset-x-[40%]" />
          <div className="relative w-full overflow-hidden rounded-t-[30px] bg-oraami-accent-secondary">
            <Image
              src="/h1.svg"
              alt="Oraami product dashboard preview"
              width={1368}
              height={643}
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 1368px"
              className="block h-[800px] w-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
