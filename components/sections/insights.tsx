"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { useRef } from "react"

const easeOut = [0.22, 1, 0.36, 1] as const

const INSIGHTS = [
  {
    title: "Heading 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    image: "/o1.svg",
    alt: "Insight article card featuring a team meeting",
    href: "/blog",
    tall: false,
  },
  {
    title: "Heading 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    image: "/o1.svg",
    alt: "Insight article card featuring a team meeting",
    href: "/blog",
    tall: false,
  },
  {
    title: "Heading 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    image: "/o4.svg",
    alt: "Insight article card featuring a laptop and workspace",
    href: "/blog",
    tall: true,
  },
  {
    title: "Heading 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    image: "/o1.svg",
    alt: "Insight article card featuring a team meeting",
    href: "/blog",
    tall: false,
  },
  {
    title: "Heading 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    image: "/o1.svg",
    alt: "Insight article card featuring a team meeting",
    href: "/blog",
    tall: false,
  },
] as const

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
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
      duration: 0.5,
      ease: easeOut,
    },
  },
}

type Article = (typeof INSIGHTS)[number]

function ArticleVisual({ article }: { article: Article }) {
  return (
    <div
      className={`relative w-full shrink-0 overflow-hidden rounded-t-[10px] ${
        article.tall
          ? "aspect-[400/335] md:aspect-auto md:h-[335px]"
          : "aspect-[400/206] md:aspect-auto md:h-[206px]"
      }`}
    >
      <Image
        src={article.image}
        alt={article.alt}
        fill
        unoptimized
        sizes="(min-width: 1540px) 33vw, (min-width: 1024px) 500px, 100vw"
        className="object-cover object-top"
      />
    </div>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:border lg:border-brand">
      <ArticleVisual article={article} />

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <h3 className="text-[17px] font-semibold leading-[1.3] tracking-[-0.02em] text-[#101828]">
          {article.title}
        </h3>

        <p className="mt-2 text-[12px] leading-[1.55] text-[#667085]">
          {article.description}
        </p>

        <Link
          href={article.href}
          className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-medium text-brand transition-colors hover:text-brand/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          Read Article
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}

function InsightsIntroCard() {
  return (
    <article className="flex h-full min-w-0 flex-col justify-center rounded-[10px] border border-brand bg-white px-4 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] lg:min-h-[204px]">
      <h3 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#101828]">
        Our Insights
      </h3>

      <p className="mt-4 max-w-[280px] text-[14px] leading-[1.55] text-[#667085]">
        Stay informed with expert perspectives, industry trends, practical
        tips, and the latest updates to help you make smarter decisions.
      </p>
    </article>
  )
}

export default function Insights() {
  const reduceMotion = Boolean(useReducedMotion())
  const sectionRef = useRef<HTMLElement>(null)

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  })

  return (
    <section
      ref={sectionRef}
      className="w-full bg-oraami-secondary text-[#101828]"
    >
      <div className="mx-auto w-full max-w-[1540px] px-4 sm:px-6 xl:px-0 py-[72px] sm:py-[80px] lg:py-[96px]">
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
          className="hidden lg:block"
        >
          <div className="grid min-h-[660px] grid-cols-3 gap-[16px]">
            <div className="grid grid-rows-2 gap-[16px] min-w-0">
              <motion.div variants={itemVariants} className="min-w-0">
                <ArticleCard article={INSIGHTS[0]} />
              </motion.div>

              <motion.div variants={itemVariants} className="min-w-0">
                <ArticleCard article={INSIGHTS[1]} />
              </motion.div>
            </div>

            <div className="grid grid-rows-[204px_1fr] gap-[16px] min-w-0">
              <motion.div variants={itemVariants} className="min-w-0">
                <InsightsIntroCard />
              </motion.div>

              <motion.div variants={itemVariants} className="min-w-0">
                <ArticleCard article={INSIGHTS[2]} />
              </motion.div>
            </div>

            <div className="grid grid-rows-2 gap-[16px] min-w-0">
              <motion.div variants={itemVariants} className="min-w-0">
                <ArticleCard article={INSIGHTS[3]} />
              </motion.div>

              <motion.div variants={itemVariants} className="min-w-0">
                <ArticleCard article={INSIGHTS[4]} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
          className="grid gap-4 md:grid-cols-2 lg:hidden"
        >
          <motion.div variants={itemVariants} className="md:col-span-2">
            <InsightsIntroCard />
          </motion.div>

          {INSIGHTS.map((article, index) => (
            <motion.div key={`${article.title}-${index}`} variants={itemVariants}>
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
