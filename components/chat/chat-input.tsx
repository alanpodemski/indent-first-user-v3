"use client"

import { useRef, useEffect } from "react"

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
    <div className="px-10 pb-6 pt-2">
      <div className="overflow-hidden rounded-xl ring-1 ring-black/[0.08] shadow-[0_2px_8px_0_rgba(0,0,0,0.06)] dark:ring-white/[0.08] dark:shadow-none">
        <div className="px-4 py-3">
          <textarea
            ref={textareaRef}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            disabled={disabled}
            rows={1}
            className="w-full resize-none bg-transparent text-[14px] text-foreground placeholder:text-foreground/25 focus:outline-none disabled:opacity-50"
          />
        </div>
        <div className="flex items-center gap-2 border-t border-black/[0.04] px-3 py-2 dark:border-white/[0.06]">
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-black/[0.06] bg-white px-2.5 py-1 text-[11px] font-medium text-foreground/50 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] dark:border-white/[0.08] dark:bg-white/[0.04]">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40"><path d="M3 5H13M3 8H13M3 11H10" strokeLinecap="round" /></svg>
              Plan off
            </span>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <button
              onClick={onSubmit}
              disabled={disabled || !value?.trim()}
              className="flex size-7 items-center justify-center rounded-full bg-blue-500 transition-opacity hover:opacity-90 disabled:opacity-30"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="white"><path d="M3 13V3L14 8L3 13Z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
