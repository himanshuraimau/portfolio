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
    <div>
      {/* Category Toggle */}
      <div className="flex border-b border-border mb-10">
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
              "px-6 py-3 text-lg font-medium relative transition-colors",
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
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8"
        >
          {skillsData[activeCategory].map((skill, index) => (
            <motion.div
              key={skill}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group border-b border-border pb-4"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-sm text-warm-500 font-mono">{(index + 1).toString().padStart(2, "0")}</span>
                <span className="text-2xl font-medium group-hover:text-primary transition-colors">{skill}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

