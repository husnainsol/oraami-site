import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import type { ComponentProps } from "react"
import { Button } from "@/components/ui/button"

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
    { name: "Clients", href: "/#testimonials" },
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
    <footer id="contact" className="w-full border-t border-black/10 bg-canvas">
      <div className="site-container pb-10 pt-16">
        <div className="flex gap-16 max-lg:flex-col max-lg:gap-12">
          <div className="flex w-[260px] shrink-0 flex-col max-lg:w-auto">
            <Link href="/" aria-label="Oraami home" className="inline-flex w-fit items-center gap-2.5">
              <Image src="/O.svg" alt="" width={26} height={26} className="h-6 w-6" />
              <span className="text-[16px] font-bold uppercase tracking-[0.14em] text-ink">Oraami</span>
            </Link>
            <p className="mt-5 max-w-[260px] text-[15px] leading-relaxed text-muted">
              The quality-first AI BDR — deep research and trust-building outreach that books meetings, not spam.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/12 text-muted transition-colors duration-200 hover:border-ink hover:text-ink"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="grid flex-1 grid-cols-3 gap-7 max-sm:grid-cols-2 max-sm:gap-y-10" aria-label="Footer navigation">
            {Object.entries(footerLinks).map(([title, columnLinks]) => (
              <div key={title}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-faint">{title}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {columnLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-[14px] text-muted transition-colors hover:text-ink">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-black/10 pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Oraami. All rights reserved.</p>
          <Button href="/contact" variant="secondary" size="sm" icon={ArrowRight} className="w-fit">
            Book a call
          </Button>
        </div>
      </div>
    </footer>
  )
}
