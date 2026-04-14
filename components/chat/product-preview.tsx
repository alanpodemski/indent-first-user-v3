"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type ProductPreviewProps = {
  activeProduct: string | null
}

function CodePreview() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    { label: "Planning", icon: "01", desc: "Analyzing codebase and creating implementation plan..." },
    { label: "Implementing", icon: "02", desc: "Writing code across 3 files, running type checks..." },
    { label: "Testing", icon: "03", desc: "Running test suite — 47/47 tests passing" },
    { label: "Shipping", icon: "04", desc: "Opening PR #284: Add user invite flow" },
  ]

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Working on feature
        </div>
        <p className="text-sm font-semibold text-foreground">Add user invitation flow with email verification</p>
        <p className="text-xs text-muted-foreground mt-1">Assigned by Sarah K. · 12 min ago</p>
      </div>

      <div className="space-y-2">
        {steps.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "rounded-lg border px-4 py-3 transition-all duration-500",
              i <= step ? "bg-card border-border" : "bg-muted/30 border-transparent opacity-40",
              i === step && "ring-2 ring-violet-500/30",
            )}
          >
            <div className="flex items-center gap-3">
              <span className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-colors",
                i < step ? "bg-emerald-500 text-white" : i === step ? "bg-violet-500 text-white" : "bg-muted text-muted-foreground",
              )}>
                {i < step ? "✓" : s.icon}
              </span>
              <div>
                <p className={cn("text-sm font-medium", i <= step ? "text-foreground" : "text-muted-foreground")}>{s.label}</p>
                {i === step && (
                  <p className="text-xs text-muted-foreground animate-message-in mt-0.5">{s.desc}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border p-4">
        <p className="text-xs font-mono text-muted-foreground mb-2">Recent activity</p>
        <div className="space-y-2 text-xs">
          <div className="flex gap-2"><span className="text-emerald-500">+</span><span className="text-foreground">app/invite/page.tsx</span></div>
          <div className="flex gap-2"><span className="text-emerald-500">+</span><span className="text-foreground">lib/email/send-invite.ts</span></div>
          <div className="flex gap-2"><span className="text-amber-500">~</span><span className="text-foreground">app/api/users/route.ts</span></div>
          <div className="flex gap-2"><span className="text-emerald-500">+</span><span className="text-foreground">tests/invite.test.ts</span></div>
        </div>
      </div>
    </div>
  )
}

function DataPreview() {
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setTyping(false), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Query</p>
        <p className="text-sm text-foreground font-mono">
          {typing ? (
            <span className="animate-pulse">Show me weekly active users for the last 3 months, broken down by plan type...</span>
          ) : (
            "Show me weekly active users for the last 3 months, broken down by plan type"
          )}
        </p>
      </div>

      <div className="bg-card rounded-xl border p-4">
        <p className="text-xs font-medium text-muted-foreground mb-3">Results</p>
        <div className="space-y-3">
          <div className="flex items-end gap-1 h-24">
            {[35, 42, 38, 55, 60, 58, 72, 68, 75, 82, 78, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col gap-0.5">
                <div
                  className="bg-violet-500/80 rounded-t transition-all duration-700"
                  style={{ height: `${h * 0.4}%`, animationDelay: `${i * 100}ms` }}
                />
                <div
                  className="bg-emerald-500/80 rounded-b"
                  style={{ height: `${(100 - h) * 0.3}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Jan</span><span>Feb</span><span>Mar</span>
          </div>
          <div className="flex gap-4 text-[10px]">
            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-violet-500" /> Pro</div>
            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-emerald-500" /> Free</div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Insight</p>
        <p className="text-sm text-foreground">Pro plan WAU grew 157% this quarter. Free-to-pro conversion rate is trending up since the onboarding change in Feb.</p>
      </div>
    </div>
  )
}

function ReviewPreview() {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-bold text-amber-600">PR</div>
            <span className="text-sm font-medium text-foreground">#281 — Refactor auth middleware</span>
          </div>
          <span className="text-xs text-muted-foreground">2 min ago</span>
        </div>
        <div className="space-y-2">
          <div className="rounded-lg bg-rose-500/5 border border-rose-500/20 px-3 py-2">
            <p className="text-xs font-medium text-rose-600 dark:text-rose-400">Security issue detected</p>
            <p className="text-xs text-muted-foreground mt-1">Line 42: Session token stored in localStorage — vulnerable to XSS. Use httpOnly cookies instead.</p>
          </div>
          <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 px-3 py-2">
            <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Race condition</p>
            <p className="text-xs text-muted-foreground mt-1">Line 78: Concurrent session refresh calls may overwrite tokens. Add a mutex or debounce.</p>
          </div>
          <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Auto-fixed</p>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-full">lint</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">3 unused imports removed, 1 type annotation added.</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Review summary</p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-muted p-2">
            <p className="text-lg font-bold text-foreground">1</p>
            <p className="text-[10px] text-muted-foreground">Critical</p>
          </div>
          <div className="rounded-lg bg-muted p-2">
            <p className="text-lg font-bold text-foreground">1</p>
            <p className="text-[10px] text-muted-foreground">Warning</p>
          </div>
          <div className="rounded-lg bg-muted p-2">
            <p className="text-lg font-bold text-foreground">3</p>
            <p className="text-[10px] text-muted-foreground">Auto-fixed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function OncallPreview() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => Math.min(s + 1, 3))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          <p className="text-xs font-medium text-rose-600 dark:text-rose-400">Active incident</p>
        </div>
        <p className="text-sm font-semibold text-foreground">API latency spike — p99 at 4.2s</p>
        <p className="text-xs text-muted-foreground mt-1">Triggered by Datadog alert · 3 min ago</p>
      </div>

      <div className="space-y-2">
        {[
          { label: "Detected alert", desc: "API latency p99 > 2s for 5 minutes", done: step >= 0 },
          { label: "Investigating", desc: "Correlating with deploy #1847 — new N+1 query in /api/users", done: step >= 1 },
          { label: "Root cause found", desc: "PR #279 introduced eager loading without pagination", done: step >= 2 },
          { label: "Fix proposed", desc: "PR #282: Add cursor pagination to user query", done: step >= 3 },
        ].map((s, i) => (
          <div key={s.label} className={cn(
            "rounded-lg border px-3 py-2 transition-all duration-500",
            s.done ? "bg-card border-border" : "bg-muted/30 border-transparent opacity-30",
          )}>
            <div className="flex items-center gap-2">
              <div className={cn(
                "h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold",
                s.done ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground",
              )}>
                {s.done ? "✓" : i + 1}
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">{s.label}</p>
                {s.done && <p className="text-[11px] text-muted-foreground">{s.desc}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">Latency (p99)</p>
          <p className="text-xs text-emerald-500 font-medium">{step >= 3 ? "↓ Resolving" : "↑ Elevated"}</p>
        </div>
        <div className="flex items-end gap-0.5 h-16 mt-2">
          {[20, 22, 25, 30, 45, 80, 95, 90, 70, 50, 35, 25].map((h, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-t transition-all duration-500",
                i < 5 ? "bg-emerald-500/60" : i < 8 ? "bg-rose-500/60" : "bg-amber-500/60",
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function DefaultPreview() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center max-w-xs">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl font-bold">
          I
        </div>
        <h2 className="text-lg font-semibold text-foreground">Welcome to Indent</h2>
        <p className="text-sm text-muted-foreground mt-2">
          As you explore our products in the chat, you'll see a live preview of each one right here.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {["Code", "Data", "Review", "Oncall"].map((p) => (
            <span key={p} className="text-xs bg-muted px-3 py-1.5 rounded-full text-muted-foreground">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProductPreview({ activeProduct }: ProductPreviewProps) {
  const productLabels: Record<string, string> = {
    code: "Indent Code",
    data: "Indent Data",
    review: "Indent Review",
    oncall: "Indent Oncall",
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {activeProduct && (
        <div className="shrink-0 border-b border-border px-6 py-4">
          <p className="text-xs text-muted-foreground">Live preview</p>
          <h2 className="text-sm font-semibold text-foreground">
            {productLabels[activeProduct] || "Indent"}
          </h2>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-6">
        {activeProduct === "code" && <CodePreview />}
        {activeProduct === "data" && <DataPreview />}
        {activeProduct === "review" && <ReviewPreview />}
        {activeProduct === "oncall" && <OncallPreview />}
        {!activeProduct && <DefaultPreview />}
      </div>
    </div>
  )
}
