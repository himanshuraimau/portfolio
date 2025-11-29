"use client"

import { motion, AnimatePresence } from "framer-motion"
import { SocialIcons } from "./social-icons"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { MoreHorizontal, X } from "lucide-react"

export function FloatingSocial() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (approx 500px)
      setIsVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed left-6 bottom-6 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Expanded Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="absolute bottom-full left-0 mb-4 bg-background/90 backdrop-blur-md border border-border rounded-lg p-4 shadow-xl min-w-[150px]"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                >
                  <div className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                    Connect
                  </div>
                  <SocialIcons direction="vertical" showLabels iconSize={18} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300",
                isOpen 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background text-foreground border-border hover:border-primary/50 shadow-lg"
              )}
              aria-label="Toggle social menu"
            >
              <motion.div 
                animate={{ rotate: isOpen ? 90 : 0 }} 
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-5 h-5" /> : <MoreHorizontal className="w-5 h-5" />}
              </motion.div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}