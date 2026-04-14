"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

type ChatInputProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = "auto"
      el.style.height = Math.min(el.scrollHeight, 160) + "px"
    }
  }, [value])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value?.trim() && !disabled) {
        onSubmit()
      }
    }
  }

  return (
    <div className="border-border bg-background/80 border-t p-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <textarea
          ref={textareaRef}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled}
          rows={1}
          className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring min-h-[44px] flex-1 resize-none rounded-2xl border px-4 py-3 text-[15px] focus:ring-2 focus:outline-none disabled:opacity-50"
        />
        <Button
          onClick={onSubmit}
          disabled={disabled || !value?.trim()}
          size="icon"
          className="h-[44px] w-[44px] shrink-0 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
