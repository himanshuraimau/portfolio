"use client"

import { motion, AnimatePresence } from "framer-motion"
import { SocialIcons } from "./social-icons"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

export function FloatingSocial() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    // Show the floating social after scrolling down a bit
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 300)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed left-4 bottom-4 z-50 md:left-6 md:bottom-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 text-white border border-amber-400 shadow-md",
                isOpen && "bg-amber-600",
              )}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              aria-label="Toggle social media links"
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronRight className="h-5 w-5" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute left-12 bottom-0 bg-background border border-border rounded-lg p-3 shadow-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <SocialIcons direction="vertical" showLabels />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

