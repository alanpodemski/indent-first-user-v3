"use client"

import { useChat } from "@ai-sdk/react"
import type { UIMessage } from "ai"
import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { QuickReplies } from "./quick-replies"
import { ChatInput } from "./chat-input"
import { ProductPreview } from "./product-preview"
import { WELCOME_MESSAGE, WELCOME_QUICK_REPLIES } from "@/lib/system-prompt"
import { getFallbackResponse } from "@/lib/fallback-conversation"

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

function createMessage(
  id: string,
  role: "user" | "assistant",
  text: string,
): UIMessage {
  return {
    id,
    role,
    parts: [{ type: "text", text }],
  }
}

function extractQuickReplies(text: string): string[] {
  const match = text.match(/\[QUICK_REPLIES:\s*(.+?)\]/)
  if (!match) return []
  return match[1]
    .split(",")
    .map((s) => s.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean)
}

function detectActiveProduct(messages: UIMessage[]): string | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const text = getMessageText(messages[i]).toLowerCase()
    if (text.includes("indent code") || text.includes("pair programmer") || text.includes("coding agent")) return "code"
    if (text.includes("indent data") || text.includes("data expert") || text.includes("data warehouse")) return "data"
    if (text.includes("indent review") || text.includes("code review") || text.includes("code standards")) return "review"
    if (text.includes("indent oncall") || text.includes("incident response") || text.includes("on-call") || text.includes("oncall")) return "oncall"
    if (messages[i].role === "user") {
      if (/\bcode\b/i.test(text) && !text.includes("code quality") && !text.includes("code standard")) return "code"
      if (/\bdata\b/i.test(text)) return "data"
      if (/\breview\b/i.test(text)) return "review"
      if (/\boncall\b/i.test(text) || /\bon-call\b/i.test(text)) return "oncall"
    }
  }
  return null
}

const welcomeText =
  WELCOME_MESSAGE +
  `\n\n[QUICK_REPLIES: ${WELCOME_QUICK_REPLIES.map((r) => `"${r}"`).join(", ")}]`

const welcomeMessage = createMessage("welcome", "assistant", welcomeText)

export function ChatContainer() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null)
  const [messages, setMessages] = useState<UIMessage[]>([welcomeMessage])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch("/api/chat")
      .then((r) => r.json())
      .then((data) => setAiAvailable(data.available === true))
      .catch(() => setAiAvailable(false))
  }, [])

  const aiChat = useChat({
    messages: [welcomeMessage],
    onError: () => {
      setAiAvailable(false)
      setMessages(aiChat.messages.length > 0 ? aiChat.messages : [welcomeMessage])
    },
  })

  useEffect(() => {
    if (aiAvailable === true) {
      setMessages(aiChat.messages)
      setIsLoading(aiChat.isLoading)
    }
  }, [aiAvailable, aiChat.messages, aiChat.isLoading])

  useEffect(() => {
    if (aiAvailable === true) {
      setInput(aiChat.input)
    }
  }, [aiAvailable, aiChat.input])

  const handleFallbackSubmit = useCallback(
    (text?: string) => {
      const msg = text || input.trim()
      if (!msg) return

      const userMsg = createMessage(`user-${Date.now()}`, "user", msg)
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsLoading(true)

      setTimeout(() => {
        const userMessageCount = messages.filter(
          (m) => m.role === "user",
        ).length
        const response = getFallbackResponse(msg, userMessageCount + 1)

        let responseText = response.text
        if (response.productCard) {
          const c = response.productCard
          responseText += `\n\n[PRODUCT_CARD: name="${c.name}", tagline="${c.tagline}", description="${c.description}"]`
        }
        if (response.quickReplies) {
          responseText += `\n\n[QUICK_REPLIES: ${response.quickReplies.map((r) => `"${r}"`).join(", ")}]`
        }

        const assistantMsg = createMessage(
          `assistant-${Date.now()}`,
          "assistant",
          responseText,
        )

        setMessages((prev) => [...prev, assistantMsg])
        setIsLoading(false)
      }, 800 + Math.random() * 600)
    },
    [input, messages],
  )

  function handleSubmit() {
    if (aiAvailable) {
      aiChat.handleSubmit()
    } else {
      handleFallbackSubmit()
    }
  }

  function handleInputChange(value: string) {
    if (aiAvailable) {
      aiChat.setInput(value)
    } else {
      setInput(value)
    }
  }

  function handleQuickReply(reply: string) {
    if (aiAvailable) {
      aiChat.sendMessage({ text: reply })
    } else {
      handleFallbackSubmit(reply)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    }
  }, [messages, isLoading])

  const lastMessage = messages[messages.length - 1]
  const lastMessageText = lastMessage ? getMessageText(lastMessage) : ""
  const quickReplies =
    lastMessage?.role === "assistant" && !isLoading
      ? extractQuickReplies(lastMessageText)
      : []

  const activeProduct = useMemo(() => detectActiveProduct(messages), [messages])

  return (
    <div className="flex h-dvh">
      {/* Chat panel — v2 style: clean, no borders */}
      <div className="relative flex h-full w-full shrink-0 flex-col lg:w-[45%]">
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-5 px-10 py-8">
            {messages.map((message, i) => (
              <MessageBubble
                key={message.id}
                role={message.role as "user" | "assistant"}
                content={getMessageText(message)}
                isLatest={i === messages.length - 1}
              />
            ))}
            {isLoading && <TypingIndicator />}
            {quickReplies.length > 0 && (
              <QuickReplies
                replies={quickReplies}
                onSelect={handleQuickReply}
                disabled={isLoading}
              />
            )}
          </div>
        </div>

        {/* Input */}
        <ChatInput
          value={input}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          disabled={isLoading}
        />
      </div>

      {/* Preview panel — v2 style: rounded-2xl, subtle bg, no border */}
      <div
        className="relative hidden max-h-[640px] self-center overflow-hidden rounded-2xl bg-foreground/[0.02] lg:block"
        style={{ width: "55%", margin: "12px" }}
      >
        <ProductPreview activeProduct={activeProduct} />
      </div>
    </div>
  )
}
