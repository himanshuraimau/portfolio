"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type SocialPlatform = {
  name: string
  icon: React.ReactNode
  url: string
  color: string
}

type SocialIconsProps = {
  className?: string
  iconSize?: number
  showLabels?: boolean
  direction?: "horizontal" | "vertical"
}

export function SocialIcons({
  className,
  iconSize = 24,
  showLabels = false,
  direction = "horizontal",
}: SocialIconsProps) {
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const socialPlatforms: SocialPlatform[] = [
    {
      name: "GitHub",
      icon: <Github size={iconSize} />,
      url: "https://github.com/johndoe",
      color: "hover:text-gray-800",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={iconSize} />,
      url: "https://linkedin.com/in/johndoe",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: <Twitter size={iconSize} />,
      url: "https://twitter.com/johndoe",
      color: "hover:text-sky-500",
    },
    {
      name: "Email",
      icon: <Mail size={iconSize} />,
      url: "mailto:john.doe@example.com",
      color: "hover:text-amber-700",
    },
  ]

  return (
    <div className={cn(direction === "horizontal" ? "flex space-x-4" : "flex flex-col space-y-4", className)}>
      {socialPlatforms.map((platform, index) => (
        <motion.a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 text-muted-foreground transition-colors",
            platform.color,
            "dark:hover:text-white",
          )}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            type: "spring",
            stiffness: 300,
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          aria-label={platform.name}
        >
          {platform.icon}
          {showLabels && <span className="text-sm font-medium">{platform.name}</span>}
        </motion.a>
      ))}
    </div>
  )
}

