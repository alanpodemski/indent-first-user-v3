"use client"

import { Button } from "@/components/ui/button"

type QuickRepliesProps = {
  replies: string[]
  onSelect: (reply: string) => void
  disabled?: boolean
}

export function QuickReplies({ replies, onSelect, disabled }: QuickRepliesProps) {
  if (replies.length === 0) return null

  return (
    <div className="animate-message-in flex flex-wrap gap-2 pl-11">
      {replies.map((reply) => (
        <Button
          key={reply}
          variant="outline"
          size="sm"
          onClick={() => onSelect(reply)}
          disabled={disabled}
          className="h-auto rounded-full px-4 py-2 text-[13px] font-normal whitespace-normal text-left"
        >
          {reply}
        </Button>
      ))}
    </div>
  )
}
