"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useReducedMotionPreference } from "@/components/ui/use-reduced-motion-preference"

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
  const reduceMotion = useReducedMotionPreference()

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-oraami-accent-secondary px-0 pt-3 text-white md:pt-4">
      <div className="landing-container">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={containerVariants}
          className="relative w-full overflow-hidden rounded-t-[14px] bg-oraami-accent-secondary"
        >
          <div className="relative min-w-0 pb-0 pt-5 sm:pt-7 lg:pt-9">
            <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.54fr)_minmax(0,0.46fr)] lg:items-center lg:gap-12">
              <motion.div variants={itemVariants} className="min-w-0 max-w-[570px]">
                <h1 className="mt-4 max-w-[565px] text-balance text-[clamp(2.1rem,7.8vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#f4efe9]">
                  <span className="block">
                    Identify Customers <span className="text-[#ff4f00]">Most</span>
                  </span>
                  <span className="block">
                    <span className="text-[#ff4f00]">Likely</span> to Convert
                  </span>
                </h1>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    className="w-full border border-[#ff4f00] bg-[#ff4f00] text-white shadow-[0_16px_34px_-20px_rgba(255,79,0,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-[#ff5b12] active:translate-y-0 sm:w-auto"
                  >
                    Get Started
                  </Button>
                  <Button
                    href="#features"
                    variant="outline"
                    size="lg"
                    icon={ArrowRight}
                    className="w-full border border-[#ff4f00]/60 bg-transparent text-white transition-transform hover:-translate-y-0.5 hover:border-[#ff4f00] hover:bg-white/[0.04] active:translate-y-0 sm:w-auto"
                  >
                    Explore Features
                  </Button>
                </div>

                <p className="mt-5 max-w-[31rem] text-[15px] leading-[1.6] text-white/72 lg:hidden sm:text-[16px]">
                  {HERO_COPY}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="hidden min-w-0 max-w-[540px] lg:block lg:justify-self-end lg:self-center">
                <p className="max-w-[487px] text-left text-[16px] leading-[1.6] text-white/72">
                  {HERO_COPY}
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="relative mx-auto mt-7 w-full max-w-[1180px] px-0 pb-0 sm:mt-8 lg:mt-9">
            <div className="relative w-full overflow-hidden rounded-t-[12px] bg-oraami-accent-secondary">
              <Image
                src="/h1.svg"
                alt="Oraami product dashboard preview"
                width={1368}
                height={643}
                priority
                unoptimized
                sizes="(max-width: 1280px) calc(100vw - 2rem), 1180px"
                className="block h-auto w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
