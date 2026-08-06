"use client"

import Image from "next/image"
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { useRef } from "react"

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
    image: "/p1.1.svg",
    alt: "Quality illustration",
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
    image: "/p3.svg",
    alt: "Research illustration",
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
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand sm:text-[12px]">
        {n} {label}
      </p>

      <h3
        className={[
          "mt-3 text-[16px] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[17px]",
          dark ? "text-white" : "text-[#101828]",
        ].join(" ")}
      >
        {title}
      </h3>

      <p
        className={[
          "mt-3 text-[12px] leading-[1.65] sm:text-[13px]",
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
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_24px_-18px_rgba(15,23,42,0.16)] sm:p-6">
      <div className="relative aspect-[334/185] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#f8f8f6]">
        <Image
          src={principle.image}
          alt={principle.alt}
          fill
          unoptimized
          sizes="(min-width: 1280px) 480px, (min-width: 768px) 50vw, 100vw"
          className="object-contain object-center"
        />
      </div>

      <div className="mt-5 min-w-0 flex-1">
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
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_22px_-18px_rgba(15,23,42,0.14)] sm:flex-row sm:items-stretch">
      <div className="min-w-0 flex-1 pr-0 sm:pr-4">
        <CopyBlock
          n={principle.n}
          label={principle.label}
          title={principle.title}
          desc={principle.desc}
        />
      </div>

      <div className="relative mt-5 aspect-[334/185] w-full shrink-0 overflow-hidden rounded-[8px] bg-[#fbfbf8] sm:mt-0 sm:aspect-auto sm:w-[132px] sm:self-stretch xl:w-[144px]">
        <Image
          src={principle.image}
          alt={principle.alt}
          fill
          unoptimized
          sizes="(min-width: 1280px) 144px, (min-width: 640px) 132px, 100vw"
          className="object-contain object-center"
        />
      </div>
    </article>
  )
}

function TrustCard({ principle }: { principle: Principle }) {
  return (
    <article className="h-full w-full overflow-hidden rounded-[12px] border border-[#ff5702] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
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
      className="hidden grid-cols-3 items-start gap-[18px] lg:grid"
    >
      <motion.div
        variants={itemVariants}
        className="h-[450px] min-w-0"
      >
        <WhiteImageCard principle={PRINCIPLES[0]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="h-[470px] min-w-0"
      >
        <NotchCard principle={PRINCIPLES[1]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid h-[450px] min-w-0 grid-rows-2 gap-[18px]"
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
      className="grid gap-[18px] sm:grid-cols-2 lg:hidden"
    >
      <motion.div variants={itemVariants} className="min-w-0">
        <WhiteImageCard principle={PRINCIPLES[0]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="relative aspect-[433/431] min-w-0 overflow-hidden"
      >
        <NotchCard principle={PRINCIPLES[1]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="min-h-[220px] min-w-0"
      >
        <ResearchCard principle={PRINCIPLES[2]} />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="min-h-[220px] min-w-0"
      >
        <TrustCard principle={PRINCIPLES[3]} />
      </motion.div>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  const reduceMotion = Boolean(useReducedMotion())
  const sectionRef = useRef<HTMLElement>(null)

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.22,
  })

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F6F6F6] text-ink"
    >
      <div className="mx-auto max-w-[1540px] px-5 pb-16 pt-10 sm:px-6 sm:pb-20 lg:pb-[106px] min-[1604px]:px-0">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          <h2 className="text-[24px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#101828]">
            Why Choose Oraami
          </h2>
        </motion.div>

        <div className="mt-[30px]">
          <WhyChooseUsDesktop active={inView} />
          <WhyChooseUsResponsive active={inView} />
        </div>
      </div>
    </section>
  )
}