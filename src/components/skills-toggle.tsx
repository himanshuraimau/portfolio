"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Skill data organized by category
const skillsData = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "React Native", "Expo"],
  backend: ["Node.js", "Express", "Nginx", "RabbitMQ", "Prisma"],
  tools: ["Git", "Docker", "Kubernetes", "Linux", "AWS (Basic)", "CI/CD"],
  languages: ["Python", "C++", "C", "Go", "Java"],
  ai_ml: ["LangChain", "OpenAI", "PyTorch (Basic)", "TensorFlow (Basic)", "Scikit-learn"],
  databases: ["MongoDB", "PostgreSQL", "Redis"]
}

type SkillCategory = "frontend" | "backend" | "tools" | "languages" | "ai_ml" | "databases"

export function SkillsToggle() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("frontend")
  const [isMobileView, setIsMobileView] = useState(false)

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    // Check for mobile view
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 640)
    }
    
    // Initial check
    checkMobileView()
    
    // Add resize listener
    window.addEventListener("resize", checkMobileView)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      window.removeEventListener("resize", checkMobileView)
    }
  }, [])

  return (
    <div>
      {/* Category Toggle */}
      <div className="flex flex-wrap overflow-x-auto border-b border-border mb-6 sm:mb-10">
        {[
          { id: "frontend", label: "Frontend" },
          { id: "backend", label: "Backend" },
          { id: "tools", label: "Tools" },
          { id: "languages", label: "Languages" },
          { id: "ai_ml", label: "AI/ML" },
          { id: "databases", label: "Databases" },
        ].map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id as SkillCategory)}
            className={cn(
              "px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-medium relative transition-colors whitespace-nowrap",
              activeCategory === category.id ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {category.label}
            {activeCategory === category.id && (
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 md:gap-x-16 gap-y-4 sm:gap-y-8"
        >
          {skillsData[activeCategory].map((skill, index) => (
            <motion.div
              key={skill}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group border-b border-border pb-2 sm:pb-4"
            >
              <div className="flex items-baseline gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-warm-500 font-mono">{(index + 1).toString().padStart(2, "0")}</span>
                <span className="text-lg sm:text-xl md:text-2xl font-medium group-hover:text-primary transition-colors">{skill}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

