"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Progress({ className, value = 0, max = 100, ...props }) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div data-slot="progress" className={cn("bg-muted relative h-2 w-full overflow-hidden rounded-full", className)} {...props}>
      <div className="bg-primary absolute left-0 top-0 h-full" style={{ width: `${percentage}%` }} />
    </div>
  )
}

export { Progress }


