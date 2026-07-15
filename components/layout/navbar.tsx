"use client"

import { useEffect, useState, type ComponentProps } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

function NavLink({ href, children, ...rest }: ComponentProps<"a">) {
  if (href && href.startsWith("#")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href ?? "#"} {...rest}>
      {children}
    </Link>
  )
}

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#platform", label: "Platform" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const onHome = pathname === "/"

  const to = (href: string) => (href.startsWith("#") ? (onHome ? href : `/${href}`) : href)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-black/10 bg-canvas/95 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="relative flex items-center justify-between py-4 pl-6 pr-4 sm:pl-10 sm:pr-6 lg:pl-12 lg:pr-12">

        <NavLink
          href={onHome ? "#hero" : "/"}
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <Image src="/O.svg" alt="Oraami" width={28} height={28} className="h-7 w-7" />
          <span className="text-[17px] font-bold uppercase tracking-[0.14em] text-ink">Oraami</span>
        </NavLink>

        <div className="flex items-center gap-3">

          <Button href="/contact" variant="primary" size="md" icon={ArrowRight} className="hidden sm:inline-flex">
            Book a call
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50 ${
              open ? "bg-brand" : "bg-ink"
            }`}
          >
            <span
              aria-hidden
              className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                open ? "bg-brand-hover" : "bg-brand"
              }`}
            />
            <span className="relative z-10 flex items-center justify-center">
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="nav-menu"
          aria-label="Primary"
          className="absolute right-4 top-full w-[300px] max-w-[calc(100vw-2rem)] bg-ink p-6 shadow-2xl lg:right-12"
        >
          <div className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.href}
                href={to(link.href)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-3.5 text-sm uppercase tracking-widest text-white/75 transition-colors first:pt-0 hover:text-white"
              >
                {link.label}
                <span className="text-[10px] text-white/30">0{i + 1}</span>
              </NavLink>
            ))}
          </div>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-brand-hover"
          >
            Book a Call
          </Link>
        </nav>
      )}
    </header>
  )
}
