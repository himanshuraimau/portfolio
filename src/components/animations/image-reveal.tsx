"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ImageRevealProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  imgClassName?: string
  priority?: boolean
}

export function ImageReveal({ src, alt, width, height, className, imgClassName, priority = false }: ImageRevealProps) {
  const [isLoaded, setIsLoaded] = useState(false)

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
    <div className={cn("relative overflow-hidden", className)}>
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-muted z-10"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ originX: 1 }}
        />
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn("w-full h-full object-cover", imgClassName)}
        onLoad={() => setIsLoaded(true)}
        priority={priority}
      />
    </div>
  )
}

