"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AnimatedButtonProps = React.ComponentProps<typeof Button> & {
  hoverScale?: number
}

export function AnimatedButton({ children, className, hoverScale = 1.05, ...props }: AnimatedButtonProps) {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: hoverScale }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button className={cn(className)} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

