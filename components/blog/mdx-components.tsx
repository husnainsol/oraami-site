import Link from "next/link"
import type { ComponentProps } from "react"

const CustomLink = ({ href = "", ...props }: ComponentProps<"a">) => {
  const internal = href.startsWith("/") || href.startsWith("#")
  const className =
    "font-medium text-ink underline decoration-brand decoration-1 underline-offset-4 transition-colors hover:text-brand"
  if (internal) {
    return <Link href={href} className={className} {...props} />
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props} />
}

export const MDXComponents = {
  a: CustomLink,
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mt-12 flex scroll-mt-28 items-baseline gap-3 text-[24px] font-medium tracking-tight text-heading" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-9 scroll-mt-28 text-[19px] font-medium tracking-tight text-ink" {...props} />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4 className="mt-7 text-[16px] font-medium text-ink" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-4 text-[17px] leading-relaxed text-muted" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-4 flex flex-col gap-2.5 pl-1 text-[17px] leading-relaxed text-muted [&_li]:flex [&_li]:gap-2.5 [&_li]:before:mt-2.5 [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:shrink-0 [&_li]:before:bg-brand [&_li]:before:content-['']" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[17px] leading-relaxed text-muted marker:font-mono marker:text-brand" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="my-8 border-l-2 border-brand bg-canvas-alt py-4 pl-6 pr-5 text-[17px] italic leading-relaxed text-ink-mute [&>p]:mt-0" {...props} />
  ),
  hr: () => <hr className="my-10 border-t border-dashed border-black/15" />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-semibold text-ink" {...props} />,
  code: (props: ComponentProps<"code">) => (
    <code className="border border-black/10 bg-canvas-alt px-1.5 py-0.5 font-mono text-[14px] text-ink" {...props} />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre className="mt-6 overflow-x-auto border border-black/10 bg-surface-dark p-5 font-mono text-[13px] leading-relaxed text-white/90 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit" {...props} />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="mt-6 overflow-x-auto border border-black/10">
      <table className="w-full border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th className="border-b border-black/10 bg-canvas-alt p-3.5 font-mono text-[11px] uppercase tracking-widest text-faint" {...props} />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border-b border-black/[0.06] p-3.5 text-muted" {...props} />
  ),
}
