import Link from "next/link"
import type { ComponentType, ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Button — the site-wide CTA primitive. Token-driven, 12px rounded (never a pill).
 * Renders a <button>, an internal <Link>, or an external <a> depending on props.
 * Change a variant here and every button on the site updates.
 */
const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 rounded-xl font-medium leading-none whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        primary: "bg-brand text-on-primary hover:bg-brand-hover",
        secondary: "bg-ink text-on-primary hover:bg-brand",
        outline: "border border-ink/25 bg-canvas text-ink hover:border-ink hover:bg-canvas-soft",
        ghost: "bg-transparent text-ink hover:bg-canvas-soft hover:text-brand",
      },
      size: {
        sm: "h-9 px-4 text-[14px]",
        md: "h-11 px-5 text-[15px]",
        lg: "h-12 px-6 text-[16px]",
      },
      fullWidth: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
)

type IconComp = ComponentType<{ className?: string; "aria-hidden"?: boolean }>

export interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    Omit<HTMLAttributes<HTMLElement>, "color"> {
  href?: string
  external?: boolean
  target?: string
  rel?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  icon?: IconComp
  iconPlacement?: "left" | "right"
  children?: ReactNode
}

export function Button({
  variant,
  size,
  fullWidth,
  href,
  external,
  target,
  rel,
  type = "button",
  disabled,
  icon: Icon,
  iconPlacement = "right",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, fullWidth }), className)

  const content = (
    <>
      {Icon && iconPlacement === "left" && <Icon className="h-4 w-4 shrink-0" aria-hidden={true} />}
      {children != null && <span>{children}</span>}
      {Icon && iconPlacement === "right" && (
        <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden={true} />
      )}
    </>
  )

  if (href && !disabled) {
    const isInternal = (href.startsWith("/") || href.startsWith("#")) && !external
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </Link>
      )
    }
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  )
}

export { buttonVariants }
