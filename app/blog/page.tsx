import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getAllPosts, formatDate } from "@/lib/blog/blog"
import { createMeta, SITE_URL } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

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
    <main className="text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}
      <JsonLd schema={itemListJsonLd} />

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
        <div className="site-container relative pb-16 pt-28 lg:pb-16 lg:pt-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
              <span className="h-1.5 w-1.5 bg-brand" />
              Blog
            </div>
            <h1 className="mt-5 text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[44px] lg:text-[52px]">
              Notes on quality-first prospecting
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              Research, ICP targeting, and trust-building outreach — the thinking behind fewer, better-matched leads.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-canvas">
        <div className="site-container py-20">
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group flex flex-col justify-between gap-8 border border-black/10 bg-canvas-alt p-8 transition-colors hover:border-brand/30 sm:p-12 lg:flex-row lg:items-end"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-faint">
                  <span className="text-brand">{featured.category}</span>
                  <span>·</span>
                  <span>{featured.readingTime}</span>
                </div>
                <h2 className="mt-5 text-[30px] font-medium leading-tight tracking-[-0.02em] text-heading sm:text-[40px]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{featured.excerpt}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 text-[12px] uppercase tracking-widest text-ink">
                Read article
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden="true" />
              </span>
            </Link>
          )}

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-xl border border-black/10 bg-canvas-soft p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-28px_rgba(20,10,0,0.4)]"
              >
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-faint">
                  <span className="text-brand">{p.category}</span>
                  <span>·</span>
                  <span>{p.readingTime}</span>
                </div>
                <h3 className="mt-5 flex-1 text-[21px] font-medium leading-snug tracking-tight text-ink">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 border-t border-dashed border-black/15 pt-5 text-[11px] uppercase tracking-widest text-ink">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-faint transition-colors group-hover:text-brand" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
