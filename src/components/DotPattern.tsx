"use client"

import React from 'react'
import { cn } from "@/lib/utils"
import { DotPattern } from "@/components/ui/dot-pattern"

export function DotPatternLinearGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "text-foreground/[0.05] dark:text-foreground/[0.1]",
          "[mask-image:linear-gradient(to_bottom_right,transparent,white,transparent)]",
        )}
      />
    </div>
  )
}