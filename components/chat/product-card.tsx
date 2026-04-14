"use client"

import { cn } from "@/lib/utils"

type ProductCardProps = {
  name: string
  tagline: string
  description: string
}

const PRODUCT_COLORS: Record<string, string> = {
  "Indent Code": "bg-blue-50/40 ring-blue-400/30 shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_1px_3px_0_rgba(59,130,246,0.08)] dark:bg-blue-500/10 dark:ring-blue-500/20",
  "Indent Data": "bg-purple-50/40 ring-purple-400/30 shadow-[0_0_0_1px_rgba(147,51,234,0.15),0_1px_3px_0_rgba(147,51,234,0.08)] dark:bg-purple-500/10 dark:ring-purple-500/20",
  "Indent Review": "bg-emerald-50/40 ring-emerald-400/30 shadow-[0_0_0_1px_rgba(16,185,129,0.15),0_1px_3px_0_rgba(16,185,129,0.08)] dark:bg-emerald-500/10 dark:ring-emerald-500/20",
  "Indent Oncall": "bg-red-50/40 ring-red-400/30 shadow-[0_0_0_1px_rgba(239,68,68,0.15),0_1px_3px_0_rgba(239,68,68,0.08)] dark:bg-red-500/10 dark:ring-red-500/20",
}

export function ProductCard({ name, tagline, description }: ProductCardProps) {
  const colors = PRODUCT_COLORS[name] || "bg-foreground/[0.02] ring-black/[0.06]"

  return (
    <div className={cn("animate-message-in rounded-lg px-3.5 py-2.5 ring-1", colors)}>
      <span className="text-[13px] font-medium text-foreground">{name}</span>
      <span className="ml-1.5 text-[12px] text-muted-foreground/70">{tagline}</span>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
