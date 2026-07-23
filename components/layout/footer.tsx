import Image from "next/image"
import Link from "next/link"
import { Mail } from "lucide-react"
import type { ComponentProps } from "react"

const footerLinks = {
  Product: [
    { name: "Features", href: "/features" },
    { name: "Platform", href: "/platform" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Security", href: "/#security" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

function IconX(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function IconLinkedIn(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const socials = [
  { Icon: IconX, label: "X", href: "https://x.com/oraami" },
  { Icon: IconLinkedIn, label: "LinkedIn", href: "https://www.linkedin.com/company/oraami" },
  { Icon: Mail, label: "Email", href: "mailto:hello@oraami.com" },
]

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-oraami-accent-secondary px-4 py-4 text-white sm:px-5 sm:py-5 lg:px-6 lg:py-6">
      
          <div className="border border-brand/40 bg-brand px-6 py-7 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:px-7 sm:py-8 lg:flex lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-[28px] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[34px] lg:text-[38px]">
                Ready to book more meetings with quality-first outreach?
              </h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/78 sm:text-[15px]">
                Oraami combines deep lead research, buying-committee mapping, and trust-building sequences to help revenue teams find customers ready to buy.
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-none border border-white/15 bg-oraami-accent-secondary px-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#140f38] lg:mt-0"
            >
              Book a call
            </Link>
          </div>

          <div className="grid gap-10 pb-14 pt-8 lg:grid-cols-[1.15fr_0.95fr_0.95fr_1fr] lg:gap-8">
            <div>
              <Link href="/" aria-label="Oraami home" className="inline-flex items-center gap-3">
                <Image src="/O.svg" alt="" width={28} height={28} className="h-7 w-7" />
                <span className="text-[16px] font-bold uppercase tracking-[0.08em] text-white">Oraami</span>
              </Link>
              <p className="mt-5 max-w-[18rem] text-[14px] leading-[1.9] text-white/42">
                The quality-first AI BDR for teams that want better-fit accounts, stronger outreach, and more booked meetings.
              </p>
              <div className="mt-7 flex items-center gap-4 text-white/85">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="transition-colors hover:text-brand"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-[12px] text-white/35">Write to us</p>
                <a href="mailto:hello@oraami.com" className="mt-1 block text-[14px] font-medium text-white transition-colors hover:text-brand">
                  hello@oraami.com
                </a>
              </div>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-white">Useful Links</p>
              <ul className="mt-5 space-y-3.5 text-[14px] text-white/42">
                {[...footerLinks.Product, ...footerLinks.Company].slice(0, 6).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-white">Our Services</p>
              <ul className="mt-5 space-y-3.5 text-[14px] text-white/42">
                <li>ICP research and targeting</li>
                <li>Deep lead research</li>
                <li>Buying committee mapping</li>
                <li>Trust-building sequences</li>
                <li>Quality scoring and routing</li>
                <li>Pipeline reporting</li>
              </ul>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-white">Newsletter</p>
              <p className="mt-5 max-w-[18rem] text-[14px] leading-[1.8] text-white/42">
                Subscribe for product updates, outreach insights, and new ideas on quality-first prospecting.
              </p>
              <form className="mt-6" action="mailto:hello@oraami.com" method="post" encType="text/plain">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="h-11 w-full border border-white/20 bg-transparent px-4 text-[14px] text-white outline-none placeholder:text-white/30"
                />
                <button
                  type="submit"
                  className="mt-3 inline-flex h-11 w-full items-center justify-center border border-brand/60 bg-brand text-[13px] font-medium text-white transition-colors hover:bg-brand-hover"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>


          <div className="mt-8 pt-10 pb-5 text-[12px] text-white/32 sm:flex sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Oraami. All rights reserved.</p>
            <div className="mt-3 flex items-center gap-4 sm:mt-0">
              <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
              <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
            </div>
          </div>
      
    </footer>
  )
}
