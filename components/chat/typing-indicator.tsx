"use client"

export function TypingIndicator() {
  return (
    <div className="flex w-full gap-3">
      <div className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
        I
      </div>
      <div className="bg-muted flex items-center gap-1.5 rounded-2xl rounded-bl-md px-4 py-3">
        <span className="bg-foreground/40 h-2 w-2 animate-[typing_1.4s_ease-in-out_infinite] rounded-full" />
        <span className="bg-foreground/40 h-2 w-2 animate-[typing_1.4s_ease-in-out_0.2s_infinite] rounded-full" />
        <span className="bg-foreground/40 h-2 w-2 animate-[typing_1.4s_ease-in-out_0.4s_infinite] rounded-full" />
      </div>
    </div>
  )
}
