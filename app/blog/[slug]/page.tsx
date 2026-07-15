import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPostBySlug, getPostSlugs, mdxOptions } from "@/lib/blog/mdx"
import { formatDate } from "@/lib/blog/blog"
import { MDXComponents } from "@/components/blog/mdx-components"
import { createMeta, SITE_URL, SITE_NAME } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

export function generateStaticParams() {
  return getPostSlugs().map((file) => ({ slug: file.replace(/\.mdx?$/, "") }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const { frontMatter } = await getPostBySlug(slug)
    const { metadata } = createMeta({
      title: frontMatter.title,
      description: frontMatter.description,
      path: `/blog/${frontMatter.slug}`,
      breadcrumbs: [
        { label: "Blog", href: "/blog" },
        { label: frontMatter.title, href: `/blog/${frontMatter.slug}` },
      ],
    })
    return {
      ...metadata,
      title: { absolute: frontMatter.title },
      openGraph: {
        ...metadata.openGraph,
        type: "article",
        publishedTime: frontMatter.date,
        authors: [SITE_NAME],
      },
    }
  } catch {
    return { title: "Article not found" }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  const { frontMatter, content } = post

  const { jsonLd: pageJsonLd } = createMeta({
    title: frontMatter.title,
    description: frontMatter.description,
    path: `/blog/${frontMatter.slug}`,
    breadcrumbs: [
      { label: "Blog", href: "/blog" },
      { label: frontMatter.title, href: `/blog/${frontMatter.slug}` },
    ],
  })

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontMatter.title,
    description: frontMatter.description,
    datePublished: frontMatter.date,
    dateModified: frontMatter.date,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${frontMatter.slug}` },
    wordCount: content.split(/\s+/).length,
  }

  return (
    <main className="text-ink">
      {pageJsonLd && <JsonLd schema={pageJsonLd} />}
      <JsonLd schema={articleSchema} />

      <section className="relative w-full overflow-hidden border-b border-black/10 bg-canvas">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(20,20,20,0.10) 1px, transparent 1.7px)",
            backgroundSize: "9px 9px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          }}
        />
        <div className="relative mx-auto max-w-[820px] px-6 pb-14 pt-28 sm:px-10 lg:px-0 lg:pb-20 lg:pt-32">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-widest text-faint transition-colors hover:text-brand">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All articles
          </Link>
          <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-widest text-faint">
            <span className="text-brand">{frontMatter.category}</span>
            <span>·</span>
            <time dateTime={frontMatter.date}>{formatDate(frontMatter.date)}</time>
            <span>·</span>
            <span>{frontMatter.readingTime}</span>
          </div>
          <h1 className="mt-5 text-[30px] font-medium leading-[1.1] tracking-[-0.02em] text-heading sm:text-[38px] lg:text-[42px]">
            {frontMatter.title}
          </h1>
        </div>
      </section>

      <section className="w-full bg-canvas">
        <article className="mx-auto max-w-[820px] px-6 py-16 sm:px-10 lg:px-0 lg:py-24">
          <p className="text-[19px] leading-relaxed text-ink-mute">{frontMatter.description}</p>

          <div className="mt-6">
            <MDXRemote source={content} components={MDXComponents} options={mdxOptions} />
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-dashed border-black/15 pt-10 sm:flex-row sm:items-center">
            <p className="max-w-md text-[17px] leading-relaxed text-ink">
              Want fewer, better-matched leads? See what Oraami researches for you.
            </p>
            <Button href="/contact" variant="secondary" icon={ArrowRight} className="shrink-0">
              Book a call
            </Button>
          </div>
        </article>
      </section>
    </main>
  )
}
