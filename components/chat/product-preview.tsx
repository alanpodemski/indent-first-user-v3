"use client"

import { cn } from "@/lib/utils"
import { IndentLogo } from "@/components/indent-logo"

type ProductPreviewProps = {
  activeProduct: string | null
}

// ── v2 Mockup Shell (sidebar + content) ─────────────────────────
function MockupShell({
  children,
  activeNav = "Code",
  workspaceName,
}: {
  children: React.ReactNode
  activeNav?: string
  workspaceName?: string
}) {
  const navItems = ["Home", "Code", "Local", "Data", "Code Review", "Memory"]
  return (
    <div className="flex h-full gap-0 overflow-hidden rounded-xl bg-white/80 ring-1 ring-black/[0.04] dark:bg-white/[0.04] dark:ring-white/[0.06]">
      {/* Sidebar */}
      <div className="flex w-[110px] shrink-0 flex-col border-r border-black/[0.04] bg-stone-50/80 px-1.5 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]">
        <div className="mb-2 flex items-center gap-1 px-1.5 py-0.5">
          <div className="flex size-3 shrink-0 items-center justify-center rounded bg-foreground/[0.08]">
            <IndentLogo className="size-2 text-foreground/40" />
          </div>
          <span className="text-[8px] font-semibold text-foreground/35">
            {workspaceName || "Indent"}
          </span>
        </div>
        <div className="mb-2 flex items-center gap-1 rounded border border-black/[0.04] bg-white px-1.5 py-0.5 dark:border-white/[0.06] dark:bg-white/[0.04]">
          <div className="size-1.5 rounded-sm bg-foreground/[0.08]" />
          <span className="text-[7px] text-foreground/25">New session</span>
        </div>
        <div className="flex flex-col">
          {navItems.map((label) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-1 rounded px-1.5 py-[3px]",
                label === activeNav && "bg-foreground/[0.05]",
              )}
            >
              <div className={cn("size-1.5 rounded-sm", label === activeNav ? "bg-foreground/15" : "bg-foreground/[0.05]")} />
              <span className={cn("text-[7px]", label === activeNav ? "font-medium text-foreground/40" : "text-foreground/20")}>{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <span className="px-1.5 text-[6px] font-medium text-foreground/15">This Week</span>
          <div className="mt-0.5 flex flex-col">
            {["Settings UI Update", "API refactor"].map((s) => (
              <div key={s} className="flex items-center gap-1 px-1.5 py-[2px]">
                <span className="size-[3px] rounded-full bg-emerald-300/70" />
                <span className="truncate text-[6px] text-foreground/20">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  )
}

// ── Code (Ship) mockup ──────────────────────────────────────────
function CodeMockup() {
  return (
    <MockupShell activeNav="Code">
      <div className="flex flex-1 flex-col px-4 py-3">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <span className="text-[9px] font-medium text-foreground/40">Implementing user settings page</span>
        </div>
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex gap-2">
            <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-foreground/[0.06]">
              <span className="text-[6px] font-bold text-foreground/30">AP</span>
            </div>
            <div className="rounded-lg bg-foreground/[0.03] px-2.5 py-1.5">
              <div className="h-1 w-32 rounded bg-foreground/[0.06]" />
              <div className="mt-1 h-1 w-24 rounded bg-foreground/[0.04]" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/20">
              <IndentLogo className="size-2 text-blue-500" />
            </div>
            <div className="flex-1 rounded-lg bg-foreground/[0.02] px-2.5 py-1.5">
              <div className="h-1 w-full rounded bg-foreground/[0.05]" />
              <div className="mt-1 h-1 w-3/4 rounded bg-foreground/[0.04]" />
              <div className="mt-2 flex flex-col gap-1">
                {["settings.tsx", "settings.test.ts", "useSettings.ts"].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 rounded border border-black/[0.04] bg-stone-50/80 px-2 py-1 dark:border-white/[0.06] dark:bg-white/[0.03]">
                    <div className="size-2 rounded-sm bg-blue-200 dark:bg-blue-400/40" />
                    <span className="text-[7px] text-foreground/40">{f}</span>
                    <span className="ml-auto text-[7px] text-emerald-400">created</span>
                  </div>
                ))}
              </div>
              <div className="mt-1.5 h-1 w-2/3 rounded bg-foreground/[0.03]" />
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-lg px-2.5 py-1.5 ring-1 ring-black/[0.06] dark:ring-white/[0.08]">
          <span className="text-[8px] text-foreground/15">Ask anything...</span>
          <div className="ml-auto flex size-4 items-center justify-center rounded-full bg-blue-400">
            <svg width="6" height="6" viewBox="0 0 16 16" fill="white"><path d="M3 13V3L14 8L3 13Z" /></svg>
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

// ── Data mockup ──────────────────────────────────────────────────
function DataMockup() {
  return (
    <MockupShell activeNav="Data">
      <div className="flex flex-1 flex-col px-4 py-3">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="text-[10px] font-medium text-foreground/50">Query Results</span>
          <span className="ml-auto rounded-full bg-foreground/[0.04] px-2 py-0.5 text-[7px] text-foreground/30">3.2s</span>
        </div>
        <div className="mb-3 rounded-md border border-black/[0.04] bg-stone-50/80 px-2.5 py-2 dark:border-white/[0.06] dark:bg-white/[0.03]">
          <div className="h-1 w-28 rounded bg-purple-200/50 dark:bg-purple-400/30" />
          <div className="mt-1 h-1 w-36 rounded bg-foreground/[0.06]" />
          <div className="mt-1 h-1 w-20 rounded bg-purple-200/40 dark:bg-purple-400/20" />
        </div>
        <div className="flex-1 overflow-hidden rounded-md border border-black/[0.04] dark:border-white/[0.06]">
          <div className="flex border-b border-black/[0.04] bg-stone-50 px-2.5 py-1 dark:border-white/[0.06] dark:bg-white/[0.03]">
            {["User", "Revenue", "Plan", "Status"].map((h) => (
              <span key={h} className="flex-1 text-[7px] font-medium text-foreground/30">{h}</span>
            ))}
          </div>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={cn("flex px-2.5 py-1 border-b border-black/[0.02] dark:border-white/[0.02]", i % 2 === 0 && "bg-stone-50/30 dark:bg-white/[0.01]")}>
              <div className="flex-1"><div className="h-1 w-12 rounded bg-foreground/[0.06]" /></div>
              <div className="flex-1"><div className="h-1 w-8 rounded bg-emerald-200/40 dark:bg-emerald-400/30" /></div>
              <div className="flex-1"><div className="h-1 w-10 rounded bg-foreground/[0.05]" /></div>
              <div className="flex-1"><div className={cn("h-3 w-10 rounded-full", i < 3 ? "bg-emerald-50 ring-1 ring-emerald-200/40 dark:bg-emerald-500/10 dark:ring-emerald-500/20" : "bg-amber-50 ring-1 ring-amber-200/40 dark:bg-amber-500/10 dark:ring-amber-500/20")} /></div>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-md border border-blue-100 bg-blue-50/40 px-2.5 py-1.5 dark:border-blue-500/20 dark:bg-blue-500/10">
          <div className="flex items-center gap-1.5">
            <IndentLogo className="size-2.5 text-blue-500" />
            <span className="text-[8px] font-medium text-blue-600 dark:text-blue-400">Insight</span>
          </div>
          <div className="mt-1 h-1 w-full rounded bg-blue-200/30 dark:bg-blue-400/20" />
          <div className="mt-0.5 h-1 w-3/4 rounded bg-blue-200/20 dark:bg-blue-400/10" />
        </div>
      </div>
    </MockupShell>
  )
}

// ── Review (Code Review) mockup ──────────────────────────────────
function ReviewMockup() {
  return (
    <MockupShell activeNav="Code Review">
      <div className="flex flex-1 flex-col px-4 py-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="size-3 rounded-full bg-emerald-300" />
          <span className="text-[10px] font-medium text-foreground/50">Fix null check in checkout</span>
          <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-medium text-emerald-600 ring-1 ring-emerald-200/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30">Approved</span>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[8px] text-foreground/25">2 files changed</span>
          <span className="text-[8px] text-emerald-400">+12</span>
          <span className="text-[8px] text-red-300">-3</span>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-black/[0.04] dark:border-white/[0.06]">
          <div className="border-b border-black/[0.04] bg-stone-50 px-3 py-1 dark:border-white/[0.06] dark:bg-white/[0.03]">
            <span className="text-[8px] text-foreground/30">src/checkout.ts</span>
          </div>
          {[
            { type: "context", w: "w-32" },
            { type: "context", w: "w-24" },
            { type: "removed", w: "w-28" },
            { type: "added", w: "w-36" },
            { type: "added", w: "w-24" },
            { type: "context", w: "w-20" },
          ].map((line, i) => (
            <div key={i} className={cn("flex items-center gap-1.5 border-b border-black/[0.02] px-3 py-0.5 dark:border-white/[0.02]", line.type === "removed" && "bg-red-50/60 dark:bg-red-500/[0.06]", line.type === "added" && "bg-emerald-50/60 dark:bg-emerald-500/[0.06]")}>
              <span className="w-4 text-right text-[7px] text-foreground/15">{i + 14}</span>
              {line.type === "removed" && <span className="text-[8px] text-red-300">-</span>}
              {line.type === "added" && <span className="text-[8px] text-emerald-400">+</span>}
              {line.type === "context" && <span className="w-2" />}
              <div className={cn("h-1 rounded", line.w, line.type === "removed" ? "bg-red-200/60 dark:bg-red-400/30" : line.type === "added" ? "bg-emerald-200/60 dark:bg-emerald-400/30" : "bg-foreground/[0.04]")} />
            </div>
          ))}
          <div className="m-2 rounded-md border border-blue-100 bg-blue-50/40 px-2.5 py-2 dark:border-blue-500/20 dark:bg-blue-500/10">
            <div className="mb-1 flex items-center gap-1.5">
              <IndentLogo className="size-2.5 text-blue-500" />
              <span className="text-[8px] font-medium text-blue-600 dark:text-blue-400">Indent</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-1 w-full rounded bg-blue-200/40 dark:bg-blue-400/20" />
              <div className="h-1 w-3/4 rounded bg-blue-200/30 dark:bg-blue-400/15" />
            </div>
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

// ── Oncall (Debug) mockup ────────────────────────────────────────
function OncallMockup() {
  return (
    <MockupShell activeNav="Home">
      <div className="flex flex-1 flex-col px-4 py-3">
        <div className="mb-3 flex items-center gap-2 rounded-md border border-red-100 bg-red-50/50 px-2.5 py-1.5 dark:border-red-500/20 dark:bg-red-500/10">
          <div className="size-2.5 rounded-full bg-red-400" />
          <span className="text-[9px] font-medium text-red-600 dark:text-red-400">500 error on /api/checkout</span>
          <span className="ml-auto text-[7px] text-red-400">2 min ago</span>
        </div>
        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex gap-2">
            <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/20">
              <IndentLogo className="size-2 text-blue-500" />
            </div>
            <div className="flex-1 rounded-lg bg-foreground/[0.02] px-2.5 py-1.5">
              <div className="h-1 w-full rounded bg-foreground/[0.05]" />
              <div className="mt-1 h-1 w-4/5 rounded bg-foreground/[0.04]" />
              <div className="mt-2 rounded border border-red-100/60 bg-red-50/30 px-2 py-1.5 dark:border-red-500/20 dark:bg-red-500/[0.06]">
                <div className="h-1 w-36 rounded bg-red-200/40 dark:bg-red-400/30" />
                <div className="mt-1 h-1 w-28 rounded bg-red-200/30 dark:bg-red-400/20" />
                <div className="mt-1 h-1 w-32 rounded bg-red-200/20 dark:bg-red-400/10" />
              </div>
              <div className="mt-1.5 h-1 w-3/5 rounded bg-foreground/[0.04]" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/20">
              <IndentLogo className="size-2 text-blue-500" />
            </div>
            <div className="flex-1 rounded-lg bg-foreground/[0.02] px-2.5 py-1.5">
              <div className="h-1 w-full rounded bg-foreground/[0.05]" />
              <div className="mt-1 h-1 w-2/3 rounded bg-foreground/[0.04]" />
              <div className="mt-2 rounded border border-emerald-100 bg-emerald-50/30 px-2 py-1.5 dark:border-emerald-500/20 dark:bg-emerald-500/[0.06]">
                <div className="h-1 w-24 rounded bg-emerald-200/50 dark:bg-emerald-400/30" />
                <div className="mt-1 h-1 w-32 rounded bg-emerald-200/40 dark:bg-emerald-400/20" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-lg px-2.5 py-1.5 ring-1 ring-black/[0.06] dark:ring-white/[0.08]">
          <span className="text-[8px] text-foreground/15">Investigate further...</span>
          <div className="ml-auto flex size-4 items-center justify-center rounded-full bg-blue-400">
            <svg width="6" height="6" viewBox="0 0 16 16" fill="white"><path d="M3 13V3L14 8L3 13Z" /></svg>
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

// ── Default welcome state ────────────────────────────────────────
function DefaultMockup() {
  return (
    <MockupShell>
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
            <path d="M5 4L1 8L5 12M11 4L15 8L11 12" />
          </svg>
          <span className="text-[12px] font-semibold text-foreground/50">Code</span>
        </div>
        <span className="mt-1 text-center text-[8px] leading-relaxed text-foreground/25">
          Pick a repo, start coding instantly.
        </span>
        <div className="mt-4 w-full max-w-[240px] overflow-hidden rounded-lg ring-1 ring-black/[0.06] dark:ring-white/[0.08]">
          <div className="px-3 py-2">
            <span className="text-[9px] text-foreground/15">Ask anything...</span>
          </div>
          <div className="flex items-center gap-1.5 border-t border-black/[0.04] px-2.5 py-1.5 dark:border-white/[0.06]">
            <div className="h-4 w-16 rounded-full bg-foreground/[0.04] ring-1 ring-black/[0.04] dark:ring-white/[0.06]" />
            <div className="h-4 w-12 rounded-full bg-foreground/[0.04] ring-1 ring-black/[0.04] dark:ring-white/[0.06]" />
            <div className="ml-auto flex size-4 items-center justify-center rounded-full bg-blue-400">
              <svg width="6" height="6" viewBox="0 0 16 16" fill="white"><path d="M3 13V3L14 8L3 13Z" /></svg>
            </div>
          </div>
        </div>
      </div>
    </MockupShell>
  )
}

// ── Product mapping + transition wrapper ─────────────────────────
const PRODUCT_NAV: Record<string, string> = {
  code: "Code",
  data: "Data",
  review: "Code Review",
  oncall: "Home",
}

export function ProductPreview({ activeProduct }: ProductPreviewProps) {
  const productLabels: Record<string, string> = {
    code: "Indent Code",
    data: "Indent Data",
    review: "Indent Review",
    oncall: "Indent Oncall",
  }

  const panels: Record<string, React.ReactNode> = {
    code: <CodeMockup />,
    data: <DataMockup />,
    review: <ReviewMockup />,
    oncall: <OncallMockup />,
  }

  return (
    <div className="relative h-full overflow-hidden p-4">
        {/* Default state */}
        <div
          className="absolute inset-4"
          style={{
            opacity: !activeProduct ? 1 : 0,
            transform: !activeProduct ? "scale(1)" : "scale(0.98)",
            transition: "opacity 350ms ease, transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: !activeProduct ? "auto" : "none",
          }}
        >
          <DefaultMockup />
        </div>
        {/* Product panels with crossfade */}
        {Object.entries(panels).map(([id, panel]) => (
          <div
            key={id}
            className="absolute inset-4"
            style={{
              opacity: id === activeProduct ? 1 : 0,
              transform: id === activeProduct ? "scale(1)" : "scale(0.98)",
              transition: id === activeProduct
                ? "opacity 500ms ease 200ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms"
                : "opacity 200ms ease, transform 350ms cubic-bezier(0.4, 0, 1, 1)",
              pointerEvents: id === activeProduct ? "auto" : "none",
            }}
          >
            {panel}
          </div>
        ))}
    </div>
  )
}
