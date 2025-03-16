"use client"

import React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type StaggerChildrenProps = {
  children: React.ReactNode
  className?: string
  delayIncrement?: number
  staggerTime?: number
  as?: React.ElementType
}

export function StaggerChildren({
  children,
  className,
  delayIncrement = 0.1,
  staggerTime = 0.05,
  as: Component = "div",
}: StaggerChildrenProps) {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerTime,
        delayChildren: delayIncrement,
      },
    },
  }

  const item = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween" } },
  }

  return (
    <Component className={cn(className)}>
      <motion.div variants={container} initial="hidden" animate="show">
        {React.Children.map(children, (child) => (
          <motion.div variants={item}>{child}</motion.div>
        ))}
      </motion.div>
    </Component>
  )
}

