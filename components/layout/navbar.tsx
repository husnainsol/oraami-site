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
  { href: "/features", label: "Features" },
  { href: "/platform", label: "Platform" },
  { href: "#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const onHome = pathname === "/"

  const to = (href: string) => (href.startsWith("#") ? (onHome ? href : `/${href}`) : href)
  const isActive = (href: string) =>
    href.startsWith("/") && (pathname === href || pathname.startsWith(`${href}/`))

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
        scrolled || open ? "border-b border-black/[0.07] bg-canvas/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <NavLink
          href={onHome ? "#hero" : "/"}
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          <Image src="/O.svg" alt="Oraami" width={28} height={28} className="h-7 w-7" />
          <span className="text-[17px] font-bold uppercase tracking-[0.14em] text-ink">Oraami</span>
        </NavLink>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={to(link.href)}
              className={`text-[14px] font-medium transition-colors hover:text-ink ${
                isActive(link.href) ? "text-ink" : "text-muted"
              }`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" variant="primary" size="md" icon={ArrowRight} className="hidden lg:inline-flex">
            Book a call
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-canvas-soft text-ink transition-colors hover:border-black/20 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="nav-menu"
          aria-label="Primary"
          className="mx-auto max-w-[1240px] px-6 pb-5 sm:px-10 lg:hidden"
        >
          <div className="flex flex-col rounded-2xl border border-black/[0.08] bg-canvas-soft p-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={to(link.href)}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-black/[0.04]"
              >
                {link.label}
              </NavLink>
            ))}
            <Button href="/contact" variant="primary" fullWidth icon={ArrowRight} className="mt-2" onClick={() => setOpen(false)}>
              Book a call
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
