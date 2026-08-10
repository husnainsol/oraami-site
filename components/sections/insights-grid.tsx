"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { motion, useInView, type Variants } from "framer-motion"
import { useRef } from "react"

import { useReducedMotionPreference } from "@/components/ui/use-reduced-motion-preference"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog/blog"
import { formatDate } from "@/lib/blog/format-date"

const easeOut = [0.22, 1, 0.36, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

function InsightCard({ post, priority }: { post: BlogPost; priority: boolean }) {
  return (
    <motion.article variants={itemVariants} className="min-w-0">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[15px] border border-black/[0.06] bg-white shadow-[0_16px_44px_-40px_rgba(32,21,21,0.28)] transition duration-300 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-[0_20px_48px_-40px_rgba(255,79,0,0.18)]"
      >
        <div className="relative aspect-[16/8] overflow-hidden bg-canvas-soft">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 500px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/45 bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-heading backdrop-blur">
            {post.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-faint">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h3 className="landing-card-title mt-3 line-clamp-2">
            {post.title}
          </h3>
          <p className="landing-card-description mt-2 line-clamp-2">{post.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-2 pt-2 text-[12px] font-medium text-heading">
            Read article
            <ArrowUpRight className="h-4 w-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export default function InsightsGrid({ posts }: { posts: BlogPost[] }) {
  const reduceMotion = useReducedMotionPreference()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.18 })

  return (
    <section ref={sectionRef} className="w-full bg-canvas text-heading">
      <div className="landing-container py-12 sm:py-14 lg:py-16">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 className="landing-section-title">Latest insights</h2>
            <p className="landing-section-description mt-4 max-w-xl">
              Practical guidance for building a focused, research-led B2B pipeline.
            </p>
          </div>
          <Button href="/blog" variant="outline" size="sm" icon={ArrowRight} className="w-full sm:w-auto">
            View all articles
          </Button>
        </div>

        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
          className="mt-8 grid gap-3 md:grid-cols-3"
        >
          {posts.map((post, index) => (
            <InsightCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
