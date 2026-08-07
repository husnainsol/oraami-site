"use client"

import Image from "next/image"
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion"
import { useRef } from "react"

const easeOut = [0.22, 1, 0.36, 1] as const
const TESTIMONIAL_SRC = "/t2.svg"
const TESTIMONIAL_ALT = "Client testimonial"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: easeOut,
    },
  },
}

export default function Testimonials() {
  const reduceMotion = Boolean(useReducedMotion())
  const sectionRef = useRef<HTMLElement>(null)

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.22,
  })

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="w-full bg-white text-[#101828]"
    >
      <div className="mx-auto w-full max-w-[1540px] px-4 sm:px-6 xl:px-0 pb-[40px] pt-[48px] sm:pb-[48px] sm:pt-[52px] lg:pb-[56px] lg:pt-[56px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: reduceMotion ? 0 : 0.4,
            delay: 0.02,
            ease: easeOut,
          }}
        >
          <h2 className="text-[28px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#101828] sm:text-[30px] lg:text-[32px]">
            What clients say
          </h2>

          <p className="mt-3 max-w-[540px] text-[15px] leading-[1.55] text-[#667085] sm:text-[16px]">
            Revenue teams that traded spray-and-pray for quality-first
            prospecting and the results that followed.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-4"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div key={index} variants={itemVariants} className="min-w-0">
              <Image
                src={TESTIMONIAL_SRC}
                alt={TESTIMONIAL_ALT}
                width={433}
                height={222}
                unoptimized
                className="block h-auto w-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
