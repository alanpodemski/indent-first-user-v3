"use client"

type ProductCardProps = {
  name: string
  tagline: string
  description: string
}

const PRODUCT_ICONS: Record<string, string> = {
  "Indent Code": "{}",
  "Indent Data": "DB",
  "Indent Review": "CR",
  "Indent Oncall": "IC",
}

const PRODUCT_COLORS: Record<string, string> = {
  "Indent Code":
    "from-violet-500/20 to-indigo-500/20 border-violet-500/30 dark:from-violet-500/10 dark:to-indigo-500/10",
  "Indent Data":
    "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 dark:from-emerald-500/10 dark:to-teal-500/10",
  "Indent Review":
    "from-amber-500/20 to-orange-500/20 border-amber-500/30 dark:from-amber-500/10 dark:to-orange-500/10",
  "Indent Oncall":
    "from-rose-500/20 to-pink-500/20 border-rose-500/30 dark:from-rose-500/10 dark:to-pink-500/10",
}

export function ProductCard({ name, tagline, description }: ProductCardProps) {
  const icon = PRODUCT_ICONS[name] || "?"
  const colors =
    PRODUCT_COLORS[name] ||
    "from-gray-500/20 to-gray-500/20 border-gray-500/30"

  return (
    <div
      className={`animate-message-in rounded-xl border bg-gradient-to-br p-4 ${colors}`}
    >
      <div className="flex items-start gap-3">
        <div className="bg-background/80 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-foreground text-sm font-semibold">{name}</h3>
          <p className="text-muted-foreground text-xs">{tagline}</p>
          <p className="text-foreground/80 mt-1.5 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
