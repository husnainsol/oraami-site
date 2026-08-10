"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion, useInView, type Variants } from "framer-motion"
import { useRef } from "react"

import { useReducedMotionPreference } from "@/components/ui/use-reduced-motion-preference"
import type { BlogPost } from "@/lib/blog/blog"

const easeOut = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

function InsightCard({ post, tall = false, priority = false }: { post: BlogPost; tall?: boolean; priority?: boolean }) {
  return (
    <motion.article variants={itemVariants} className="min-w-0">
      <Link
        href={`/blog/${post.slug}`}
        className={`group flex flex-col overflow-hidden rounded-[12px] border border-brand bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-36px_rgba(0,0,0,0.5)] ${
          tall ? "lg:h-[517px]" : "lg:h-[388px]"
        }`}
      >
        <div className={`relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-canvas-soft lg:aspect-auto ${tall ? "lg:h-[305px]" : "lg:h-[176px]"}`}>
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-5">
          <h3 className="text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink line-clamp-2">{post.title}</h3>
          <p className="mt-2 text-[13px] leading-[1.55] text-muted line-clamp-3">{post.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[13px] font-semibold text-brand">
            Read Article
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export default function InsightsGrid({ posts }: { posts: BlogPost[] }) {
  const reduceMotion = useReducedMotionPreference()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })
  const [p1, p2, p3, p4, p5] = posts

  return (
    <section ref={sectionRef} className="w-full bg-heading text-white">
      <div className="landing-container py-16 sm:py-20 lg:py-[100px]">
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          <div className="order-2 flex min-w-0 flex-col gap-5 lg:order-none">
            {p1 && <InsightCard post={p1} priority />}
            {p2 && <InsightCard post={p2} />}
          </div>

          <div className="order-1 flex min-w-0 flex-col gap-5 lg:order-none">
            <motion.div
              variants={itemVariants}
              className="flex min-w-0 flex-col justify-center rounded-[12px] border border-brand bg-white p-6 lg:h-[259px]"
            >
              <h2 className="text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-heading">Our Insights</h2>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted">
                Stay informed with expert perspectives, industry trends, practical tips, and the latest updates to help
                you make smarter decisions.
              </p>
              <Link
                href="/blog"
                className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand transition-colors hover:text-brand-hover"
              >
                View all articles
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
            {p3 && <InsightCard post={p3} tall />}
          </div>

          <div className="order-3 flex min-w-0 flex-col gap-5 lg:order-none">
            {p4 && <InsightCard post={p4} />}
            {p5 && <InsightCard post={p5} />}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
