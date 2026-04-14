"use client"

import { cn } from "@/lib/utils"
import { ProductCard } from "./product-card"
import { IndentLogo } from "@/components/indent-logo"

type ProductCardData = {
  name: string
  tagline: string
  description: string
}

type MessageBubbleProps = {
  role: "user" | "assistant"
  content: string
  isLatest?: boolean
}

function parseProductCards(text: string): {
  cleanText: string
  cards: ProductCardData[]
} {
  const cards: ProductCardData[] = []
  const cleanText = text.replace(
    /\[PRODUCT_CARD:\s*name="([^"]+)",\s*tagline="([^"]+)",\s*description="([^"]+)"\]/g,
    (_, name, tagline, description) => {
      cards.push({ name, tagline, description })
      return ""
    },
  )
  return { cleanText: cleanText.trim(), cards }
}

function parseQuickReplies(text: string): {
  cleanText: string
} {
  const cleanText = text.replace(/\[QUICK_REPLIES:.*?\]/g, "").trim()
  return { cleanText }
}

export function MessageBubble({
  role,
  content,
  isLatest,
}: MessageBubbleProps) {
  const isUser = role === "user"

  const { cleanText: textWithoutCards, cards } = parseProductCards(content)
  const { cleanText } = parseQuickReplies(textWithoutCards)

  if (isUser) {
    return (
      <div className="animate-message-in flex items-start gap-3">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06]">
          <span className="text-[9px] font-bold text-foreground/40">You</span>
        </div>
        <p className="pt-0.5 text-[15px] leading-relaxed text-foreground/70">
          {cleanText}
        </p>
      </div>
    )
  }

  return (
    <div className="animate-message-in flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/20">
          <IndentLogo className="size-3.5 text-blue-500" />
        </div>
        <div className="flex flex-col gap-3 pt-0.5">
          <p className="text-[15px] leading-relaxed text-muted-foreground whitespace-pre-wrap">
            {cleanText}
          </p>
          {cards.map((card, i) => (
            <ProductCard key={i} {...card} />
          ))}
        </div>
      </div>
    </div>
  )
}
