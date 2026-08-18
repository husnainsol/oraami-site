import type { Metadata } from "next"
import type { ComponentProps } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPostBySlug, getPostSlugs, mdxOptions } from "@/lib/blog/mdx"
import { formatDate } from "@/lib/blog/blog"
import { createMeta, SITE_URL, SITE_NAME } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

const CustomLink = ({ href = "", ...props }: ComponentProps<"a">) => {
  const internal = href.startsWith("/") || href.startsWith("#")
  const className =
    "font-medium text-ink underline decoration-brand decoration-1 underline-offset-4 transition-colors hover:text-brand"
  if (internal) {
    return <Link href={href} className={className} {...props} />
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props} />
}

const MDXComponents = {
  a: CustomLink,
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mt-12 flex scroll-mt-28 items-baseline gap-3 text-[24px] font-medium tracking-tight text-heading" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-9 scroll-mt-28 text-[19px] font-medium tracking-tight text-ink" {...props} />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4 className="mt-7 text-[16px] font-medium text-ink" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-4 text-[17px] leading-relaxed text-muted" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-4 flex flex-col gap-2.5 pl-1 text-[17px] leading-relaxed text-muted [&_li]:flex [&_li]:gap-2.5 [&_li]:before:mt-2.5 [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:shrink-0 [&_li]:before:bg-brand [&_li]:before:content-['']" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[17px] leading-relaxed text-muted marker:font-mono marker:text-brand" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="my-8 border-l-2 border-brand bg-canvas-alt py-4 pl-6 pr-5 text-[17px] italic leading-relaxed text-ink-mute [&>p]:mt-0" {...props} />
  ),
  hr: () => <hr className="my-10 border-t border-dashed border-black/15" />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-semibold text-ink" {...props} />,
  code: (props: ComponentProps<"code">) => (
    <code className="border border-black/10 bg-canvas-alt px-1.5 py-0.5 font-mono text-[14px] text-ink" {...props} />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre className="mt-6 overflow-x-auto border border-black/10 bg-surface-dark p-5 font-mono text-[13px] leading-relaxed text-white/90 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit" {...props} />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="mt-6 overflow-x-auto border border-black/10">
      <table className="w-full border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th className="border-b border-black/10 bg-canvas-alt p-3.5 font-mono text-[11px] uppercase tracking-widest text-faint" {...props} />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border-b border-black/[0.06] p-3.5 text-muted" {...props} />
  ),
}

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
        images: frontMatter.image ? [{ url: frontMatter.image, alt: frontMatter.imageAlt }] : undefined,
      },
      twitter: {
        ...metadata.twitter,
        images: frontMatter.image ? [frontMatter.image] : undefined,
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
    image: frontMatter.image ? `${SITE_URL}${frontMatter.image}` : undefined,
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
          {frontMatter.image && (
            <div className="mt-10">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-canvas-soft shadow-[0_24px_60px_-44px_rgba(32,21,21,0.3)]">
                <Image
                  src={frontMatter.image}
                  alt={frontMatter.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 820px) 820px, 100vw"
                  className="object-cover"
                />
              </div>
              {frontMatter.imageCreditUrl && (
                <a href={frontMatter.imageCreditUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block text-right text-[11px] text-faint transition-colors hover:text-brand">
                  Photo on Unsplash
                </a>
              )}
            </div>
          )}
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
