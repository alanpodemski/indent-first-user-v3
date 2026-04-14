"use client"

import { IndentLogo } from "@/components/indent-logo"

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/20">
        <IndentLogo className="size-3.5 text-blue-500" />
      </div>
      <div className="flex items-center gap-1.5 pt-2">
        <span className="bg-foreground/20 h-1.5 w-1.5 animate-[typing_1.4s_ease-in-out_infinite] rounded-full" />
        <span className="bg-foreground/20 h-1.5 w-1.5 animate-[typing_1.4s_ease-in-out_0.2s_infinite] rounded-full" />
        <span className="bg-foreground/20 h-1.5 w-1.5 animate-[typing_1.4s_ease-in-out_0.4s_infinite] rounded-full" />
      </div>
    </div>
  )
}
