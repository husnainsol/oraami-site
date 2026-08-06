"use client"

import { useEffect, useState, type ComponentProps } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
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
  { href: "/about", label: "About" },
  { href: "#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

const fadeInDown = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const },
  },
}

export default function Navbar() {
  const pathname = usePathname()
  return <NavbarShell key={pathname} pathname={pathname} />
}

function NavbarShell({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const onHome = pathname === "/"

  const to = (href: string) => (href.startsWith("#") ? (onHome ? href : "/" + href) : href)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <motion.header
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={fadeInDown}
      className="fixed inset-x-[20px] top-[12px] z-50 lg:inset-x-auto lg:left-1/2 lg:top-[30px] lg:w-[2000px] lg:max-w-[1770px] lg:-translate-x-1/2"
    >
      <div className="rounded-none bg-white shadow-none backdrop-blur-0">
        <div className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center px-6 lg:h-[40px] lg:px-4">
          <div className="flex items-center justify-start">
            <NavLink
              href={onHome ? "#hero" : "/"}
              className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              <Image src="/icon1.svg" alt="Oraami" width={99} height={38} className="h-[42px] w-auto ml-23" />
            </NavLink>
          </div>

          <nav className="hidden items-center justify-center gap-7 lg:flex gap-8" aria-label="Primary" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, \"SF Pro Display\", \"SF Pro Text\", system-ui, sans-serif" }}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={to(link.href)}
                className="text-[16px] font-normal text-ink/80 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              icon={ArrowRight}
              className="hidden h-10 px-[18px] text-[14px] shadow-none transition-transform hover:-translate-y-px lg:inline-flex mr-22"
            >
              Book a Call
            </Button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="nav-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white text-ink transition-colors hover:border-black/20 hover:bg-canvas-soft lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="nav-menu"
              aria-label="Primary"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] as const }}
              className="absolute left-0 top-full w-full pt-3 lg:hidden"
            >
              <div className="rounded-[20px] border border-black/[0.08] bg-white p-3 shadow-[0_12px_28px_-22px_rgba(32,21,21,0.24)]">
                <nav className="flex flex-col" aria-label="Primary mobile">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.href}
                      href={to(link.href)}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-canvas-soft hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                    >
                      {link.label}
                    </NavLink>
                  ))}
                  <Button
                    href="/contact"
                    variant="primary"
                    fullWidth
                    icon={ArrowRight}
                    className="mt-2 h-11 px-5 text-[14px]"
                    onClick={() => setOpen(false)}
                  >
                    Book a Call
                  </Button>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
