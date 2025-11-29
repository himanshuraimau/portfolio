"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Check } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-9 w-9 rounded-md border-border/50 bg-background hover:bg-muted hover:border-primary/50 transition-all relative overflow-hidden"
        >
          {/* Sun Icon */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          
          {/* Moon Icon */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          
          <span className="sr-only">Toggle theme</span>
          
          {/* Corner accent for tech feel */}
          <span className="absolute top-0 right-0 w-[3px] h-[3px] bg-primary/50" />
          <span className="absolute bottom-0 left-0 w-[3px] h-[3px] bg-primary/50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border/50 bg-background/95 backdrop-blur-sm min-w-[140px]">
        
        <div className="px-2 py-1.5 text-[10px] font-mono uppercase text-muted-foreground opacity-70">
          Display_Mode
        </div>

        <DropdownMenuItem onClick={() => setTheme("light")} className="group flex items-center justify-between font-mono text-xs cursor-pointer">
          <div className="flex items-center">
            <Sun className="mr-2 h-3.5 w-3.5 group-hover:text-primary transition-colors" />
            <span>Light</span>
          </div>
          {theme === 'light' && <Check className="h-3 w-3 text-primary" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => setTheme("dark")} className="group flex items-center justify-between font-mono text-xs cursor-pointer">
          <div className="flex items-center">
            <Moon className="mr-2 h-3.5 w-3.5 group-hover:text-primary transition-colors" />
            <span>Dark</span>
          </div>
          {theme === 'dark' && <Check className="h-3 w-3 text-primary" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => setTheme("system")} className="group flex items-center justify-between font-mono text-xs cursor-pointer">
          <div className="flex items-center">
            <Monitor className="mr-2 h-3.5 w-3.5 group-hover:text-primary transition-colors" />
            <span>System</span>
          </div>
          {theme === 'system' && <Check className="h-3 w-3 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}