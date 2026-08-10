"use client"

import Image from "next/image"
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion"
import { useRef } from "react"
import { useReducedMotionPreference } from "@/components/ui/use-reduced-motion-preference"

type Principle = {
  n: string
  label: string
  title: string
  desc: string
  image: string
  alt: string
}

const PRINCIPLES: Principle[] = [
  {
    n: "01",
    label: "QUALITY",
    title: "Quality over volume",
    desc: "We cap every ICP at 50 high-fit accounts, so your team works the leads that convert — never a bloated list.",
    image: "/images/principles/quality-over-volume-v2.png",
    alt: "One carefully selected high-value account isolated from a larger prospect pool",
  },
  {
    n: "02",
    label: "ICP",
    title: "Built around your ICP",
    desc: "Oraami learns exactly who you sell to and shapes every play around your ideal customer, not a generic template.",
    image: "/p2.svg",
    alt: "Built around your ICP",
  },
  {
    n: "03",
    label: "RESEARCH",
    title: "Deep research, every lead",
    desc: "5–10 minutes of autonomous AI research on each prospect and their full buying committee before a word is sent.",
    image: "/images/principles/deep-lead-research-v2.png",
    alt: "A precision research lens revealing layered evidence around a selected account",
  },
  {
    n: "04",
    label: "TRUST",
    title: "Trust that compounds",
    desc: "8–12 personalised touches over 6–12 weeks turn cold accounts into warm relationships that keep paying off.",
    image: "/p4.svg",
    alt: "Trust illustration",
  },
]

const sectionVariants: Variants = {
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
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

function CopyBlock({
  n,
  label,
  title,
  desc,
  dark = false,
}: Pick<Principle, "n" | "label" | "title" | "desc"> & {
  dark?: boolean
}) {
  return (
    <div className={dark ? "text-white" : "text-[#101828]"}>
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand">
        {n} {label}
      </p>

      <h3
        className={[
          "landing-card-title mt-2.5",
          dark ? "text-white" : "text-[#101828]",
        ].join(" ")}
      >
        {title}
      </h3>

      <p
        className={[
          "landing-card-description mt-2.5",
          dark ? "text-white/72" : "text-[#667085]",
        ].join(" ")}
      >
        {desc}
      </p>
    </div>
  )
}

function WhiteImageCard({ principle }: { principle: Principle }) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[15px] border border-black/[0.05] bg-white p-4 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.26)]">
      <div className="relative aspect-[16/8] w-full shrink-0 overflow-hidden rounded-[11px] bg-[#f8f8f6]">
        <Image
          src={principle.image}
          alt={principle.alt}
          fill
          sizes="(min-width: 1280px) 480px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="mt-4 min-w-0 flex-1">
        <CopyBlock
          n={principle.n}
          label={principle.label}
          title={principle.title}
          desc={principle.desc}
        />
      </div>
    </article>
  )
}

function NotchCard({ principle }: { principle: Principle }) {
  return (
    <article className="relative h-full w-full overflow-hidden">
      <Image
        src="/p2.svg"
        alt={principle.alt}
        fill
        unoptimized
        sizes="(min-width: 1280px) 500px, (min-width: 640px) 50vw, 100vw"
        className="block object-contain object-center"
      />
    </article>
  )
}

function ResearchCard({ principle }: { principle: Principle }) {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[15px] border border-black/[0.05] bg-white p-4 shadow-[0_14px_36px_-34px_rgba(15,23,42,0.24)] sm:flex-row sm:items-stretch">
      <div className="min-w-0 flex-1 pr-0 sm:pr-4">
        <CopyBlock
          n={principle.n}
          label={principle.label}
          title={principle.title}
          desc={principle.desc}
        />
      </div>

      <div className="relative mt-4 aspect-[16/8] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#fbfbf8] sm:mt-0 sm:aspect-auto sm:w-[124px] sm:self-stretch xl:w-[136px]">
        <Image
          src={principle.image}
          alt={principle.alt}
          fill
          sizes="(min-width: 1280px) 152px, (min-width: 640px) 138px, 100vw"
          className="object-cover object-center"
        />
      </div>
    </article>
  )
}

function TrustCard({ principle }: { principle: Principle }) {
  return (
    <article className="h-full w-full overflow-hidden rounded-[15px] border border-brand/35 bg-white p-4 shadow-[0_12px_30px_-30px_rgba(255,79,0,0.3)]">
      <div className="max-w-[270px]">
        <CopyBlock
          n={principle.n}
          label={principle.label}
          title={principle.title}
          desc={principle.desc}
        />
      </div>
    </article>
  )
}

function WhyChooseUsDesktop({ active }: { active: boolean }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      className="hidden grid-cols-3 items-start gap-3 lg:grid"
    >
      <motion.div
        variants={itemVariants}
        className="h-[340px] min-w-0"
      >
        <WhiteImageCard principle={PRINCIPLES[0]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="h-[350px] min-w-0"
      >
        <NotchCard principle={PRINCIPLES[1]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid h-[340px] min-w-0 grid-rows-2 gap-3"
      >
        <ResearchCard principle={PRINCIPLES[2]} />
        <TrustCard principle={PRINCIPLES[3]} />
      </motion.div>
    </motion.div>
  )
}

function WhyChooseUsResponsive({ active }: { active: boolean }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      className="grid gap-3 sm:grid-cols-2 lg:hidden"
    >
      <motion.div variants={itemVariants} className="min-w-0">
        <WhiteImageCard principle={PRINCIPLES[0]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="relative aspect-[433/360] min-w-0 overflow-hidden"
      >
        <NotchCard principle={PRINCIPLES[1]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="min-h-[180px] min-w-0"
      >
        <ResearchCard principle={PRINCIPLES[2]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="min-h-[180px] min-w-0"
      >
        <TrustCard principle={PRINCIPLES[3]} />
      </motion.div>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotionPreference()
  const sectionRef = useRef<HTMLElement>(null)

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.22,
  })

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white text-ink"
    >
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          <h2 className="landing-section-title">
            Why Choose Oraami
          </h2>
        </motion.div>

        <div className="mt-8">
          <WhyChooseUsDesktop active={inView} />
          <WhyChooseUsResponsive active={inView} />
        </div>
      </div>
    </section>
  )
}
