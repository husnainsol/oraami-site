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
    <section id="hero" className="relative mx-[15px] w-[calc(100%-30px)] overflow-hidden rounded-t-[30px] bg-oraami-accent-secondary px-0 pt-4 text-white md:pt-6">
      <div className="site-container">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={containerVariants}
          className="relative overflow-hidden rounded-t-[14px] bg-oraami-accent-secondary"
        >
          <div className="relative min-w-0 px-3 pb-0 pt-6 sm:px-5 sm:pt-8 lg:px-4 lg:pt-12 xl:px-0 xl:pt-12">
            <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.54fr)_minmax(0,0.46fr)] lg:items-center lg:gap-12">
              <motion.div variants={itemVariants} className="min-w-0 max-w-[570px]">
                <span
                  className="inline-flex h-8 items-center gap-2 rounded-full px-3.5 text-[12px] font-medium tracking-[0.17em] text-white"
                  style={{
                    border: "1px solid transparent",
                    backgroundImage:
                      "linear-gradient(rgba(30,20,50,0.6), rgba(30,20,50,0.6)), linear-gradient(to right, #bb4003, #0740aa)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  <Image src="/star.svg" alt="" aria-hidden="true" width={16} height={16} className="h-4 w-4" />
                  AI-Powered Lead Intelligence Platform
                </span>

                <h1 className="mt-6 max-w-[565px] text-balance text-[clamp(2.25rem,8.5vw,3.75rem)] font-bold leading-[1] tracking-[-0.03em] text-[#f4efe9] sm:text-[clamp(2.8rem,6vw,3.75rem)]">
                  <span className="block lg:whitespace-nowrap">
                    Identify Customers <span className="text-[#ff4f00]">Most</span>
                  </span>
                  <span className="block lg:whitespace-nowrap">
                    <span className="text-[#ff4f00]">Likely</span> to Convert
                  </span>
                </h1>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    className="h-12 w-full border border-[#ff4f00] bg-[#ff4f00] px-5 text-[15px] text-white shadow-[0_16px_34px_-20px_rgba(255,79,0,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-[#ff5b12] active:translate-y-0 sm:w-auto"
                  >
                    Get Started for Free
                  </Button>
                  <Button
                    href="#features"
                    variant="outline"
                    size="lg"
                    icon={ArrowRight}
                    className="h-12 w-full border border-[#ff4f00]/60 bg-transparent px-5 text-[15px] text-white transition-transform hover:-translate-y-0.5 hover:border-[#ff4f00] hover:bg-white/[0.04] active:translate-y-0 sm:w-auto"
                  >
                    Explore Features
                  </Button>
                </div>

                <p className="mt-6 max-w-[31rem] text-[16px] leading-[1.6] text-white/72 lg:hidden sm:text-[17px]">
                  {HERO_COPY}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="hidden min-w-0 max-w-[540px] lg:block lg:justify-self-end lg:self-center">
                <p className="max-w-[487px] text-left text-[16px] leading-[1.6] text-white/72 sm:text-[17px]">
                  {HERO_COPY}
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div variants={itemVariants} className="relative -mx-[4px] mt-8 px-0 pb-0 sm:-mx-[6px] sm:mt-10 lg:-mx-0 lg:mt-12">
            <div className="pointer-events-none absolute inset-x-[30%] top-[-10px] h-20 rounded-full bg-[#ff4f00]/8 blur-2xl sm:inset-x-[36%]" />
            <div className="relative w-full overflow-hidden rounded-t-[14px] bg-oraami-accent-secondary">
              <Image
                src="/h1.svg"
                alt="Oraami product dashboard preview"
                width={1368}
                height={643}
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 1368px"
                className="block h-auto w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
