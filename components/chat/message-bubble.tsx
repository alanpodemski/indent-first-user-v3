"use client"

import { cn } from "@/lib/utils"
import { ProductCard } from "./product-card"

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

  // Parse out product cards and quick replies from AI text
  const { cleanText: textWithoutCards, cards } = parseProductCards(content)
  const { cleanText } = parseQuickReplies(textWithoutCards)

  return (
    <div
      className={cn(
        "animate-message-in flex w-full gap-3",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
          I
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] space-y-3",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-muted text-foreground rounded-bl-md",
          )}
        >
          <p className="whitespace-pre-wrap">{cleanText}</p>
        </div>
        {cards.map((card, i) => (
          <ProductCard key={i} {...card} />
        ))}
      </div>
    </div>
  )
}
