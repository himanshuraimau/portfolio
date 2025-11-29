"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type SocialPlatform = {
  name: string
  icon: React.ReactNode
  url: string
}

type SocialIconsProps = {
  className?: string
  iconSize?: number
  showLabels?: boolean
  direction?: "horizontal" | "vertical"
}

export function SocialIcons({
  className,
  iconSize = 20,
  showLabels = false,
  direction = "horizontal",
}: SocialIconsProps) {
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
      url: "https://github.com/himanshuraimau",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={iconSize} />,
      url: "https://www.linkedin.com/in/himanshu-rai-246121278/",
    },
    {
      name: "Twitter",
      icon: <Twitter size={iconSize} />,
      url: "https://x.com/himanshura_i",
    },
    {
      name: "Email",
      icon: <Mail size={iconSize} />,
      url: "mailto:himanshuraimau9@gmail.com",
    },
  ]

  return (
    <div className={cn(direction === "horizontal" ? "flex gap-4" : "flex flex-col gap-4", className)}>
      {socialPlatforms.map((platform, index) => (
        <motion.a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center gap-3 text-muted-foreground transition-all duration-300 hover:text-primary",
          )}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="relative flex items-center justify-center p-2 rounded-md border border-transparent group-hover:border-border group-hover:bg-muted/50 transition-all">
             {platform.icon}
             {/* Tech decoration on hover */}
             <ArrowUpRight className="absolute top-0 right-0 w-2 h-2 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-primary" />
          </div>
          
          {showLabels && (
            <span className="text-sm font-mono group-hover:translate-x-1 transition-transform">
                {platform.name}
            </span>
          )}
        </motion.a>
      ))}
    </div>
  )
}