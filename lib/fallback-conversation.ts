type FallbackResponse = {
  text: string
  quickReplies?: string[]
  productCard?: {
    name: string
    tagline: string
    description: string
  }
}

const PRODUCT_CARDS = {
  code: {
    name: "Indent Code",
    tagline: "Your AI pair programmer",
    description:
      "Ship features faster with an AI that writes, tests, and deploys code alongside your team.",
  },
  data: {
    name: "Indent Data",
    tagline: "Your AI data expert",
    description:
      "Query your data warehouse in plain English. Get answers in minutes, not weeks.",
  },
  review: {
    name: "Indent Review",
    tagline: "Your AI code reviewer",
    description:
      "Catch bugs, enforce standards, and auto-fix issues before they hit main.",
  },
  oncall: {
    name: "Indent Oncall",
    tagline: "Your AI incident responder",
    description:
      "Investigate alerts automatically and resolve incidents before your team wakes up.",
  },
}

function matchKeywords(input: string, keywords: string[]): boolean {
  const lower = input.toLowerCase()
  return keywords.some((k) => lower.includes(k))
}

export function getFallbackResponse(
  input: string,
  messageCount: number,
): FallbackResponse {
  const lower = input.toLowerCase()

  // Product-specific questions
  if (matchKeywords(lower, ["what is indent", "what does indent", "tell me what", "what do you"])) {
    return {
      text: "Indent is an AI-powered platform that acts as an infinitely scaling software engineer for your team. We have four products that cover the full engineering workflow:\n\nCode — writes, tests, and ships features for you\nData — queries your data warehouse in plain English\nReview — catches bugs and enforces code standards automatically\nOncall — investigates and resolves incidents 24/7\n\nWhat sounds most interesting to you?",
      quickReplies: [
        "Tell me about Code",
        "Tell me about Data",
        "Tell me about Review",
        "Tell me about Oncall",
      ],
    }
  }

  if (matchKeywords(lower, ["code", "coding", "features", "ship", "backlog", "pair program"])) {
    return {
      text: "Indent Code is like having a brilliant pair programmer that never sleeps. You give it instructions, it asks clarifying questions, then handles everything — writing code, running tests, managing rebases, and opening production-ready PRs.\n\nThe coolest part? Each feature gets its own isolated dev environment, so you can work on multiple things in parallel without conflicts.",
      quickReplies: [
        "How does it handle complex tasks?",
        "What else do you have?",
        "Let's get this set up",
      ],
      productCard: PRODUCT_CARDS.code,
    }
  }

  if (matchKeywords(lower, ["data", "query", "sql", "warehouse", "analytics", "dashboard", "logs"])) {
    return {
      text: "Indent Data is a game-changer — anyone on your team can query your data warehouse using plain English. No SQL needed. It explores your schemas, writes the queries, creates visualizations, and explains the findings.\n\nIt plugs right into Slack and Notion, so your team can get answers where they already work. No more waiting in a weeks-long data queue.",
      quickReplies: [
        "That sounds amazing",
        "What else do you have?",
        "Let's set this up",
      ],
      productCard: PRODUCT_CARDS.data,
    }
  }

  if (matchKeywords(lower, ["review", "pr", "pull request", "code quality", "standards", "lint"])) {
    return {
      text: "Indent Review catches the stuff humans miss — security issues, race conditions, logical errors, edge cases. And it learns from your team's feedback, so it gets smarter over time.\n\nIt can auto-fix lint errors, merge conflicts, and minor test failures. Your engineers spend time on the hard problems, not nitpicky review comments.",
      quickReplies: [
        "Can it learn our style guide?",
        "What else do you have?",
        "Let's get this set up",
      ],
      productCard: PRODUCT_CARDS.review,
    }
  }

  if (matchKeywords(lower, ["oncall", "on-call", "incident", "alert", "pager", "monitor", "datadog", "sentry"])) {
    return {
      text: "Indent Oncall is like having a senior SRE watching your systems 24/7. When an alert fires, it automatically investigates — correlating errors with recent deployments, checking logs, and tracing the root cause.\n\nIt proposes fixes with actual PRs, and after incidents, it hardens your system to prevent the same issue from happening again.",
      quickReplies: [
        "That would save us so much time",
        "What integrations does it support?",
        "Let's set this up",
      ],
      productCard: PRODUCT_CARDS.oncall,
    }
  }

  if (matchKeywords(lower, ["everything", "all", "show me", "all of them"])) {
    return {
      text: "Love the enthusiasm! Here's the full lineup:\n\nCode — your AI pair programmer that ships features end-to-end\nData — query your warehouse in plain English, get answers in minutes\nReview — automated code review that catches bugs and learns your standards\nOncall — 24/7 incident response that resolves issues before you wake up\n\nWhich one would make the biggest impact on your team right now?",
      quickReplies: [
        "Code sounds perfect",
        "We need Data",
        "Review for sure",
        "Oncall would be huge",
      ],
    }
  }

  if (matchKeywords(lower, ["engineer", "lead", "manager", "developer", "cto", "vp"])) {
    return {
      text: "Awesome! What's the biggest challenge your team is facing right now? Are you dealing with a growing backlog, slow PR reviews, data bottlenecks, or on-call fatigue?\n\nKnowing your pain points helps me recommend exactly the right setup.",
      quickReplies: [
        "We can't ship fast enough",
        "Code reviews are slow",
        "Data requests pile up",
        "On-call is burning us out",
      ],
    }
  }

  if (matchKeywords(lower, ["set up", "setup", "get started", "activate", "connect", "integrate"])) {
    return {
      text: "Great, let's get you going! The first step is connecting your GitHub organization. From there, we can set up whichever products make sense for your team.\n\nWant to start with the integration setup, or would you like to explore more products first?",
      quickReplies: [
        "Let's connect GitHub",
        "Tell me more first",
        "What integrations do you support?",
      ],
    }
  }

  if (matchKeywords(lower, ["integration", "github", "slack", "linear", "connect"])) {
    return {
      text: "We integrate with all the tools your team already uses — GitHub, Slack, Linear, Datadog, PagerDuty, Sentry, Notion, and your data warehouses.\n\nEverything works right where you already work, no context switching needed.",
      quickReplies: [
        "Let's connect GitHub",
        "Tell me about a specific product",
        "How does pricing work?",
      ],
    }
  }

  if (matchKeywords(lower, ["price", "pricing", "cost", "how much"])) {
    return {
      text: "I'd love to get you the right pricing info! Our team can walk you through options based on your team size and which products you're interested in.\n\nWant me to help you book a quick call with the team?",
      quickReplies: [
        "Sure, let's book a call",
        "Tell me more about the products first",
        "How big is your typical customer?",
      ],
    }
  }

  // Default / catch-all based on message count
  if (messageCount <= 2) {
    return {
      text: "That's interesting! I'd love to help you find the right Indent setup. Can you tell me a bit about your team — what's the biggest engineering challenge you're facing right now?",
      quickReplies: [
        "We need to ship faster",
        "Code quality is slipping",
        "Data access is a bottleneck",
        "On-call is painful",
      ],
    }
  }

  return {
    text: "I want to make sure I'm pointing you in the right direction. Would you like to dive deeper into any of our products, or are you ready to get started with the setup?",
    quickReplies: [
      "Tell me about Code",
      "Tell me about Data",
      "Tell me about Review",
      "Tell me about Oncall",
    ],
  }
}
