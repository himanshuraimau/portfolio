"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AnimatedButtonProps = React.ComponentProps<typeof Button> & {
  className?: string
}

export function AnimatedButton({ children, className, ...props }: AnimatedButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "tween", duration: 0.1 }}
    >
      <Button 
        className={cn(
            "relative overflow-hidden font-mono font-bold tracking-wide transition-all", 
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "border border-primary/50 shadow-sm hover:shadow-primary/20 hover:shadow-lg",
            className
        )} 
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}