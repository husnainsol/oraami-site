import { ArrowRight } from "lucide-react"
import { createMeta } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"

const { metadata: metadataExport, jsonLd } = createMeta({
  title: "Contact",
  description:
    "Book a call with Oraami and see your first 50 deeply-researched, ready-to-buy leads — mapped to your exact ICP.",
  path: "/contact",
  breadcrumbs: [{ label: "Contact", href: "/contact" }],
})
export const metadata = metadataExport

const STEPS = [
  { n: "01", title: "We review your ICP", desc: "Tell us who you sell to. We map your ideal customer and the accounts worth pursuing." },
  { n: "02", title: "Book a 20-min call", desc: "A quick walkthrough of how Oraami researches and builds trust-building sequences for you." },
  { n: "03", title: "See your first 50 leads", desc: "Get a sample of deeply-researched, high-fit accounts before you commit to anything." },
]

const SOCIALS = [
  { href: "https://x.com/oraami", label: "X" },
  { href: "https://www.linkedin.com/company/oraami", label: "LinkedIn" },
]

const LABEL = "text-[11px] uppercase tracking-widest text-faint"

export default function ContactPage() {
  return (
    <main className="text-ink">
      {jsonLd && <JsonLd schema={jsonLd} />}

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
        <div className="relative mx-auto max-w-[1240px] px-6 pb-16 pt-28 sm:px-10 lg:px-12 lg:pb-16 lg:pt-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-faint">
              <span className="h-1.5 w-1.5 bg-brand" />
              Contact
            </div>
            <h1 className="mt-5 text-[34px] font-medium leading-[1.05] tracking-[-0.03em] text-heading sm:text-[44px] lg:text-[52px]">
              Let&apos;s talk.
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
              Tell us who you sell to and we&apos;ll show you your first 50 deeply-researched, ready-to-buy leads — no spam, no pressure.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-canvas">
        <div className="mx-auto max-w-[1240px] px-6 py-20 sm:px-10 lg:px-12 lg:py-20">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">

            <div>
              <p className={LABEL}>Send us a message</p>
              <form className="mt-6 flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className={LABEL}>Name</span>
                    <Input type="text" placeholder="Your name" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className={LABEL}>Work email</span>
                    <Input type="email" placeholder="email@company.com" />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className={LABEL}>Company</span>
                  <Input type="text" placeholder="Company name" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={LABEL}>What are you selling?</span>
                  <Textarea rows={5} placeholder="Tell us about your product and ideal customer…" />
                </label>
                <Button type="submit" variant="secondary" size="lg" icon={ArrowRight} className="sm:self-start">
                  Send message
                </Button>
              </form>
            </div>

            <div className="lg:border-l lg:border-dashed lg:border-black/15 lg:pl-20">
              <div className="flex flex-col gap-10">
                <div>
                  <p className={LABEL}>Email us</p>
                  <a href="mailto:hello@oraami.com" className="mt-3 inline-block text-[22px] font-medium tracking-tight text-ink transition-colors hover:text-brand">
                    hello@oraami.com
                  </a>
                  <p className="mt-2 text-[14px] text-faint">We reply within 1 business day · Remote · Worldwide</p>
                </div>

                <div>
                  <p className={LABEL}>What happens next</p>
                  <div className="mt-5 flex flex-col">
                    {STEPS.map((s, i) => (
                      <div
                        key={s.n}
                        className={`flex gap-5 py-5 ${i < STEPS.length - 1 ? "border-b border-dashed border-black/15" : ""}`}
                      >
                        <span className="text-[13px] text-brand">.{s.n}</span>
                        <div>
                          <h3 className="text-[16px] font-medium text-ink">{s.title}</h3>
                          <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={LABEL}>Follow along</p>
                  <div className="mt-4 flex gap-6 text-[13px] uppercase tracking-wider text-ink">
                    {SOCIALS.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
