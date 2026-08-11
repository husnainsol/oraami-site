import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { getAllPosts, formatDate } from "@/lib/blog/blog"
import { createMeta, SITE_URL } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import styles from "./blog.module.css"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Blog",
  description: "Insights on quality-first prospecting — research, ICP targeting, and trust-building outreach from the Oraami team.",
  path: "/blog",
  breadcrumbs: [{ label: "Blog", href: "/blog" }],
})
export const metadata = metadataExport

export default function BlogPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/blog#postlist`,
    name: "Oraami Blog",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  }

  return (
    <main className="bg-white text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}
      <JsonLd schema={itemListJsonLd} />

      <section className="overflow-hidden bg-white">
        <div className="site-container pb-14 pt-12 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
          <div className="grid gap-7 pb-9 sm:pb-11 lg:grid-cols-[minmax(0,1.3fr)_minmax(290px,0.5fr)] lg:items-end lg:gap-16">
            <h1 className="max-w-[980px] text-balance text-[40px] font-medium leading-[0.99] tracking-[-0.048em] text-heading sm:text-[clamp(3.25rem,5.5vw,4.8rem)]">
              Field notes for
              <span className="block text-brand">better B2B conversations.</span>
            </h1>
            <div className="border-l border-brand/35 pl-5 sm:pl-7 lg:mb-1">
              <p className="text-[15px] leading-[1.75] text-muted sm:text-[17px]">
                Clear thinking on account research, sharper ICPs, buying committees, and outreach that earns attention.
              </p>
            </div>
          </div>

          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className={`${styles.featuredStory} group mt-8 grid overflow-hidden rounded-[20px] border border-heading/10 bg-white sm:mt-10 sm:rounded-[24px] lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)]`}
            >
              {featured.image && (
                <div className={`${styles.featuredMedia} relative min-h-[280px] overflow-hidden bg-[#f5f2ee] sm:min-h-[390px] lg:min-h-[470px]`}>
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className={`${styles.storyImage} object-cover`}
                  />
                </div>
              )}

              <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-heading/42">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span aria-hidden="true">/</span>
                  <span>{featured.readingTime}</span>
                </div>
                <h2 className="mt-5 text-balance text-[29px] font-medium leading-[1.08] tracking-[-0.035em] text-heading sm:text-[38px] lg:text-[42px]">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-muted sm:text-[16px]">
                  {featured.excerpt}
                </p>
                <span className="mt-8 inline-flex w-fit items-center gap-3 text-[13px] font-medium text-heading">
                  Read the story
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="bg-white pb-20 sm:pb-24 lg:pb-28">
        <div className="site-container">
          <div className="flex items-end justify-between gap-6 border-b border-heading/12 pb-5">
            <h2 className="text-[28px] font-medium tracking-[-0.035em] text-heading sm:text-[34px]">
              More from Oraami
            </h2>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-heading/35 sm:block">
              {String(rest.length).padStart(2, "0")} stories
            </span>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:gap-6">
            {rest.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`${styles.storyCard} group flex min-w-0 flex-col overflow-hidden rounded-[18px] border border-heading/10 bg-white sm:rounded-[20px]`}
              >
                {post.image && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#f5f2ee] sm:aspect-[16/8.7]">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={`${styles.storyImage} object-cover`}
                    />
                    <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-white/88 font-mono text-[10px] text-heading shadow-sm backdrop-blur-sm sm:left-5 sm:top-5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.13em] text-heading/40">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">/</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="mt-4 text-balance text-[23px] font-medium leading-[1.16] tracking-[-0.025em] text-heading sm:text-[26px]">
                    {post.title}
                  </h3>
                  <p className={`${styles.cardExcerpt} mt-3 text-[14px] leading-[1.7] text-muted sm:text-[15px]`}>
                    {post.excerpt}
                  </p>
                  <span className="mt-6 flex items-center border-t border-heading/10 pt-5 text-[12px] font-medium text-heading">
                    Read article
                    <ArrowUpRight className="ml-auto h-4 w-4 text-heading/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
