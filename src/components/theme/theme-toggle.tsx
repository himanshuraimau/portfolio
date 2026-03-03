"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useHaptics } from "@/hooks/use-haptics"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const { triggerSelection } = useHaptics()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    triggerSelection()
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <button
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border border-border/50 bg-muted/30 opacity-50 cursor-wait"
        aria-label="Toggle theme"
      >
        <div className="h-3.5 w-3.5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border border-border/50 bg-muted/30 hover:bg-muted hover:border-primary/50 transition-all"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-3.5 w-3.5 transition-all" />
      ) : (
        <Moon className="h-3.5 w-3.5 transition-all" />
      )}
    </button>
  )
}