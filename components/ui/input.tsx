import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const base =
  "w-full rounded-md border border-ink/15 bg-canvas px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-hint focus:border-brand"

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(base, "h-11", className)} {...props} />
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(base, "resize-none py-3", className)} {...props} />
}
