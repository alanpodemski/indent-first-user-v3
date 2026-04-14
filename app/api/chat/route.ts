import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { SYSTEM_PROMPT } from "@/lib/system-prompt"

export const maxDuration = 30

export async function GET() {
  const hasKey = !!process.env.OPENAI_API_KEY
  return Response.json({ available: hasKey })
}

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "No API key configured" }, { status: 503 })
  }

  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages,
  })

  return result.toDataStreamResponse()
}
