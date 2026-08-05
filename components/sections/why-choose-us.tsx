"use client"

import Image from "next/image"
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion"
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
    alt: "ICP illustration",
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function CopyBlock({
  n,
  label,
  title,
  desc,
  dark = false,
}: Pick<Principle, "n" | "label" | "title" | "desc"> & { dark?: boolean }) {
  return (
    <div className={dark ? "text-white" : "text-[#101828]"}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand sm:text-[11px]">
        {n} {label}
      </p>
      <h3 className={"mt-3 text-[14px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[15px] " + (dark ? "text-white" : "text-[#101828]")}>
        {title}
      </h3>
      <p className={"mt-3 text-[11px] leading-[1.6] sm:text-[12px] " + (dark ? "text-white/72" : "text-[#667085]")}>
        {desc}
      </p>
    </div>
  )
}

function WhiteImageCard({ principle }: { principle: Principle }) {
  return (
    <article className="flex h-full min-h-[360px] flex-col overflow-hidden rounded-[12px] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_24px_-18px_rgba(15,23,42,0.16)]">
      <div className="relative h-[136px] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#f8f8f6]">
        <Image src={principle.image} alt={principle.alt} fill sizes="(min-width: 1024px) 286px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="mt-5 flex-1">
        <CopyBlock n={principle.n} label={principle.label} title={principle.title} desc={principle.desc} />
      </div>
    </article>
  )
}

function NotchCard({ principle }: { principle: Principle }) {
  return (
    <article className="relative h-full min-h-[360px] overflow-hidden rounded-[12px] bg-oraami-secondary p-6 text-white shadow-[0_14px_28px_-22px_rgba(30,26,77,0.42)]">
      <span aria-hidden className="absolute right-0 top-0 h-[58px] w-[70px] rounded-bl-[26px] bg-canvas" />
      <div aria-hidden className="absolute right-[2px] top-[-20px] h-[75px] w-[70px] overflow-hidden rounded-full">
        <Image
          src={principle.image}
          alt={principle.alt}
          width={433}
          height={431}
          className="absolute left-[-324px] top-[-12px] h-[431px] w-[420px] max-w-none"
        />
      </div>
      <div className="mt-auto max-w-[230px] pt-[112px]">
        <CopyBlock n={principle.n} label={principle.label} title={principle.title} desc={principle.desc} dark />
      </div>
    </article>
  )
}

function ResearchCard({ principle }: { principle: Principle }) {
  return (
    <article className="flex min-h-[160px] items-stretch overflow-hidden rounded-[12px] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_22px_-18px_rgba(15,23,42,0.14)]">
      <div className="flex min-w-0 flex-1 flex-col justify-between pr-4">
        <CopyBlock n={principle.n} label={principle.label} title={principle.title} desc={principle.desc} />
      </div>
      <div className="relative w-[108px] shrink-0 self-stretch overflow-hidden rounded-[8px] bg-[#fbfbf8] sm:w-[120px]">
        <Image src={principle.image} alt={principle.alt} fill sizes="(min-width: 1024px) 120px, 108px" className="object-contain object-right" />
      </div>
    </article>
  )
}

function TrustCard({ principle }: { principle: Principle }) {
  return (
    <article className="relative min-h-[190px] overflow-hidden rounded-[12px] border border-[#ff5702] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="max-w-[225px]">
        <CopyBlock n={principle.n} label={principle.label} title={principle.title} desc={principle.desc} />
      </div>
    </article>
  )
}

function WhyChooseUsDesktop({ active }: { active: boolean }) {
  return (
    <motion.div variants={sectionVariants} initial="hidden" animate={active ? "visible" : "hidden"} className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
      <motion.div variants={itemVariants}>
        <WhiteImageCard principle={PRINCIPLES[0]} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <NotchCard principle={PRINCIPLES[1]} />
      </motion.div>
      <motion.div variants={itemVariants} className="grid h-[320px] grid-rows-2 gap-4">
        <ResearchCard principle={PRINCIPLES[2]} />
        <TrustCard principle={PRINCIPLES[3]} />
      </motion.div>
    </motion.div>
  )
}

function WhyChooseUsResponsive({ active }: { active: boolean }) {
  return (
    <motion.div variants={sectionVariants} initial="hidden" animate={active ? "visible" : "hidden"} className="grid gap-4 md:grid-cols-2 lg:hidden">
      <motion.div variants={itemVariants}>
        <WhiteImageCard principle={PRINCIPLES[0]} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <NotchCard principle={PRINCIPLES[1]} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <ResearchCard principle={PRINCIPLES[2]} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <TrustCard principle={PRINCIPLES[3]} />
      </motion.div>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  const reduceMotion = Boolean(useReducedMotion())
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.22 })

  return (
    <section ref={sectionRef} className="w-full bg-canvas text-ink">
      <div className="mx-auto max-w-[1600px] px-5 pt-10 pb-[58px] sm:px-6">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const }}>
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
