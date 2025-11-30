"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Cpu, Database, Layout, Server, Terminal, Wrench } from "lucide-react"

// Skill data organized by category
const skillsData = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "React Native", "Expo"],
  backend: ["Node.js", "Express", "Nginx", "RabbitMQ", "Prisma"],
  tools: ["Git", "Docker", "Kubernetes", "Linux", "AWS (Basic)", "CI/CD"],
  languages: ["Python", "C++", "C", "Go", "Java"],
  ai_ml: ["LangChain", "OpenAI", "PyTorch", "TensorFlow", "Scikit-learn"],
  databases: ["MongoDB", "PostgreSQL", "Redis"]
}

type SkillCategory = "frontend" | "backend" | "tools" | "languages" | "ai_ml" | "databases"

const categoryIcons = {
  frontend: Layout,
  backend: Server,
  tools: Wrench,
  languages: Terminal,
  ai_ml: Cpu,
  databases: Database
}

export function SkillsToggle() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("frontend")
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto border border-border rounded-xl bg-card overflow-hidden shadow-sm">
      
      {/* Category Toggle Bar - Fully Responsive */}
      <div className="w-full overflow-x-auto border-b border-border bg-muted/20 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="flex min-w-max">
          {[
            { id: "frontend", label: "Frontend", shortLabel: "FE" },
            { id: "backend", label: "Backend", shortLabel: "BE" },
            { id: "ai_ml", label: "AI / ML", shortLabel: "AI" },
            { id: "tools", label: "DevOps", shortLabel: "Ops" },
            { id: "languages", label: "Langs", shortLabel: "Lng" },
            { id: "databases", label: "Data", shortLabel: "DB" },
          ].map((category) => {
            const Icon = categoryIcons[category.id as SkillCategory] || Terminal
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as SkillCategory)}
                className={cn(
                  "flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-mono transition-all border-r border-border last:border-r-0 whitespace-nowrap min-w-fit",
                  activeCategory === category.id
                    ? "bg-background text-primary border-b-2 border-b-primary -mb-[1px]"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                {/* Desktop: full label, Mobile: short label */}
                <span className="hidden md:inline">{category.label}</span>
                <span className="md:hidden">{category.shortLabel}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Skills Grid Area - Fully Responsive */}
      <div className="p-3 sm:p-6 md:p-8 bg-background/50 min-h-[250px] sm:min-h-[280px] md:min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
          >
            {skillsData[activeCategory].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="group relative border border-border bg-card/50 hover:bg-muted/30 p-2.5 sm:p-3 rounded-lg flex items-center justify-between transition-colors overflow-hidden"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-[10px] sm:text-xs font-mono text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="font-medium font-mono text-xs sm:text-sm truncate">{skill}</span>
                </div>

                <div className="w-1.5 h-1.5 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-500 group-hover:shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all shrink-0" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}