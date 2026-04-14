"use client"

type QuickRepliesProps = {
  replies: string[]
  onSelect: (reply: string) => void
  disabled?: boolean
}

export function QuickReplies({ replies, onSelect, disabled }: QuickRepliesProps) {
  if (replies.length === 0) return null

  return (
    <div className="animate-message-in flex flex-wrap gap-2 pl-10">
      {replies.map((reply) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          disabled={disabled}
          className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-foreground/60 ring-1 ring-black/[0.06] shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-all hover:ring-black/[0.1] hover:shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] disabled:opacity-50 dark:bg-white/[0.04] dark:ring-white/[0.08] dark:hover:ring-white/[0.12]"
        >
          {reply}
        </button>
      ))}
    </div>
  )
}
