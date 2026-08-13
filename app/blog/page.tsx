import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { getAllPosts, formatDate } from "@/lib/blog/blog"
import { createMeta, SITE_URL } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"

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
    <main className="font-sf-pro overflow-hidden bg-white text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}
      <JsonLd schema={itemListJsonLd} />

      <section className="bg-white px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5">
        <div className="relative isolate min-h-[70svh] overflow-hidden rounded-[20px] bg-oraami-accent-secondary text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_45%,color-mix(in_srgb,var(--color-brand)_8%,transparent),transparent_36%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[18%] top-1/2 h-[80%] w-[48%] -translate-y-1/2 rounded-full bg-brand/[0.04] blur-[110px]"
          />

          <div className="landing-container relative flex min-h-[70svh] items-center py-10 sm:py-12 lg:py-14">
            <div className="mx-auto max-w-[880px] text-center">
              <h1 className="mx-auto max-w-[760px] text-balance text-[clamp(2.1rem,7.8vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-indigo-soft">
                Notes on finding the right <span className="text-brand-deep">buyer</span>
              </h1>

              <p className="mx-auto mt-7 max-w-[650px] text-[17px] leading-[1.62] text-white/65 sm:text-[18px]">
                How we think about matching, outreach, and what actually gets a reply — from the team building Oraami.
              </p>

              <div className="mt-9 flex items-center justify-center">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  className="px-5 transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Get Started for Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-canvas">
        <div className="site-container py-20">
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-6 rounded-[20px] border border-black/[0.06] bg-white p-4 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.26)] transition-colors hover:border-brand/30 sm:p-5 lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:p-6"
            >
              <div className="relative min-h-[280px] overflow-hidden rounded-[16px] bg-oraami-accent-secondary lg:min-h-[340px]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,color-mix(in_srgb,var(--color-brand)_55%,transparent),transparent_65%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.22) 1px, transparent 1.7px)",
                    backgroundSize: "9px 9px",
                    maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
                  }}
                />
                <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
                  {featured.category}
                </span>
              </div>
              <div className="flex max-w-2xl flex-col justify-center py-2 sm:py-4 lg:py-6">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-faint">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span>·</span>
                  <span>{featured.readingTime}</span>
                </div>
                <h2 className="mt-5 text-[30px] font-medium leading-tight tracking-[-0.02em] text-heading sm:text-[40px]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{featured.excerpt}</p>
                <span className="mt-7 inline-flex shrink-0 items-center gap-2 text-[13px] font-medium text-brand">
                  Read the post
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          )}

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-[18px] border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-28px_rgba(20,10,0,0.4)]"
              >
                {p.image && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-canvas-soft">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
