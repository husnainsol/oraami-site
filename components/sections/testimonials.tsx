"use client"

import Image from "next/image"
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { useRef } from "react"

const easeOut = [0.22, 1, 0.36, 1] as const

const FEATURED_TESTIMONIAL_SRC = "/t1.svg"
const WHITE_TESTIMONIAL_SRC = "/t2.svg"

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
}

type TestimonialSvgCardProps = {
  src: string
  alt: string
  sizes: string
  imageClassName?: string
}

function TestimonialSvgCard({
  src,
  alt,
  sizes,
  imageClassName = "",
}: TestimonialSvgCardProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      sizes={sizes}
      className={`block origin-center object-contain ${imageClassName}`}
    />
  )
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
      <div className="mx-auto max-w-[1540px] px-5 pb-[64px] pt-[48px] sm:px-6 xl:px-0">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: reduceMotion ? 0 : 0.4,
            delay: 0.02,
            ease: easeOut,
          }}
        >
          <h2 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-[#101828] sm:text-[34px] lg:text-[40px]">
            What clients say
          </h2>

          <p className="mt-4 max-w-[560px] text-[15px] leading-[1.55] text-[#667085] sm:text-[16px]">
            Revenue teams that traded spray-and-pray for quality-first
            prospecting and the results that followed.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
          className="mt-[38px] hidden grid-cols-3 gap-[18px] lg:grid"
        >
          <motion.div
            variants={itemVariants}
            className="relative col-span-2 aspect-[821/305] min-w-0 overflow-hidden rounded-[16px] lg:h-[340px] lg:aspect-auto"
          >
            <TestimonialSvgCard
              src={FEATURED_TESTIMONIAL_SRC}
              alt="Featured client testimonial"
              sizes="(min-width: 1540px) 1021px, 66vw"
              imageClassName=""
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative aspect-[433/431] min-w-0 overflow-hidden rounded-[16px]  lg:h-[340px] lg:aspect-auto"
          >
            <TestimonialSvgCard
              src={WHITE_TESTIMONIAL_SRC}
              alt="Client testimonial one"
              sizes="(min-width: 1540px) 501px, 33vw"
              imageClassName=""
            />
          </motion.div>

          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative aspect-[433/431] overflow-hidden rounded-[16px] "
            >
              <TestimonialSvgCard
                src={WHITE_TESTIMONIAL_SRC}
                alt={`Client testimonial ${index + 2}`}
                sizes="(min-width: 1540px) 501px, 33vw"
                imageClassName=""
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
          className="mt-[38px] grid gap-4 md:grid-cols-2 lg:hidden"
        >
          <motion.div
            variants={itemVariants}
            className="relative aspect-[821/305] overflow-hidden rounded-[16px] md:col-span-2"
          >
            <TestimonialSvgCard
              src={FEATURED_TESTIMONIAL_SRC}
              alt="Featured client testimonial"
              sizes="100vw"
              imageClassName=""
            />
          </motion.div>

          {Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative aspect-[433/431] overflow-hidden rounded-[16px] border border-brand/25"
            >
              <TestimonialSvgCard
                src={WHITE_TESTIMONIAL_SRC}
                alt={`Client testimonial ${index + 1}`}
                sizes="(min-width: 768px) 50vw, 100vw"
                imageClassName=""
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
